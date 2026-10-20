# Preview (NOT a result): logistic-regression stand-in on data/clean from `python -m datagen --seed 42 --preset full`. Train 2024-25, test 2026. Shows how much a simple model beats the institute rule at fixed top-k. Run from technical/. numpy/scipy/pandas only.
import pandas as pd, numpy as np
from scipy.optimize import minimize
D="data/clean/"; T="data/truth/"
st=pd.read_parquet(D+"students.parquet"); at=pd.read_parquet(D+"attendance.parquet"); tt=pd.read_parquet(D+"test_totals.parquet"); tests=pd.read_parquet(D+"tests.parquet")
de=pd.read_parquet(T+"dropout_events.parquet")
at["d"]=pd.to_datetime(at.attendance_date); at["wk"]=at.d.dt.to_period("W-SUN").dt.start_time
W=at.groupby(["student_id","wk"]).present_flag.mean().rename("att").reset_index()
st["join_date"]=pd.to_datetime(st.join_date); de["dropout_date"]=pd.to_datetime(de.dropout_date)
S=st[["id","batch_id","institute_id","academic_year","join_date"]].rename(columns={"id":"student_id"}).merge(de[["student_id","dropout_date","dropout_type","dropped_out"]],on="student_id",how="left")
tests["test_date"]=pd.to_datetime(tests.test_date)
T2=tt.merge(tests[["id","test_date","max_marks"]],left_on="test_id",right_on="id"); T2=T2[~T2.absent_flag & T2.raw_score.notna()].copy()
T2["pct"]=T2.raw_score/T2.max_marks; T2["z"]=T2.groupby("test_id").raw_score.transform(lambda x:(x-x.mean())/(x.std()+1e-9))
rows=[]
Wp=W.pivot(index="student_id",columns="wk",values="att"); weeks=list(Wp.columns)
for i,wk in enumerate(weeks):
    if i<8: continue
    a4=Wp.iloc[:,i-4:i].mean(axis=1); a4p=Wp.iloc[:,i-8:i-4].mean(axis=1)
    f=pd.DataFrame({"a4":a4,"a4p":a4p}).dropna(); f["wk"]=wk; rows.append(f.reset_index())
F=pd.concat(rows); F=F.merge(S,on="student_id")
F=F[(F.join_date<F.wk)&(F.dropout_date.isna()|(F.dropout_date>=F.wk))].copy()
F["bm"]=F.groupby(["batch_id","wk"]).a4.transform("mean"); F["a4rel"]=F.a4-F.bm; F["slope"]=F.a4-F.a4p
# last test as of wk
T2["test_date"]=T2.test_date.astype("datetime64[ns]"); F["wk"]=F.wk.astype("datetime64[ns]"); T2=T2.sort_values("test_date"); F=F.sort_values("wk")
last=pd.merge_asof(F[["student_id","wk"]].reset_index().sort_values("wk"),T2[["student_id","test_date","pct","z"]].rename(columns={"test_date":"wk"}).sort_values("wk"),on="wk",by="student_id",direction="backward",allow_exact_matches=False).set_index("index")
F["lastpct"]=last.pct; F["lastz"]=last.z
F["y"]=((F.dropout_date>=F.wk)&(F.dropout_date<F.wk+pd.Timedelta(days=30))).astype(int)
F["grad"]=((F.y==1)&(F.dropout_type=="gradual"))
F=F.dropna(subset=["lastz"]); F["ten"]=((F.wk-F.join_date).dt.days/30.0); F["ten34"]=np.exp(-0.5*((F.ten-3.5)/1.2)**2); X=F[["a4rel","slope","lastz","a4","ten","ten34"]].fillna(0).values
tr=(F.academic_year<=2025).values; te=~tr
print("train rows %d events %d | test rows %d events %d (gradual %d)"%(tr.sum(),F.y[tr].sum(),te.sum(),F.y[te].sum(),F.grad[te].sum()))
mu,sd=X[tr].mean(0),X[tr].std(0)+1e-9; Z=(X-mu)/sd
sig=lambda x:1/(1+np.exp(-x))
def f(w): p=sig(Z[tr]@w[:-1]+w[-1]); y=F.y.values[tr]; return -(y*np.log(p+1e-9)+(1-y)*np.log(1-p+1e-9)).mean()+1e-3*(w**2).sum()
w=minimize(f,np.zeros(Z.shape[1]+1),method="L-BFGS-B").x
F["s_model"]=sig(Z@w[:-1]+w[-1]); F["s_rule"]=((F.a4<0.75)|(F.lastpct<0.40)).astype(float)+(1-F.a4)*1e-3   # rule + tie-break by low attendance
def aucpr(y,s):
    o=np.argsort(-s); y=y[o]; tp=np.cumsum(y); return ((tp/np.arange(1,len(y)+1))*y).sum()/max(y.sum(),1)
Ft=F[te]; y=Ft.y.values
print("test prevalence %.4f | AUC-PR model %.4f  rule %.4f  -> rel gain %+.0f%%"%(y.mean(),aucpr(y,Ft.s_model.values),aucpr(y,Ft.s_rule.values),100*(aucpr(y,Ft.s_model.values)/aucpr(y,Ft.s_rule.values)-1)))
print("coef (a4rel, slope, lastz, a4, tenure, tenure_peak):",np.round(w[:-1]/1,2))
for k in (0.02,0.04,0.08):
    out=[]
    for name in ("s_model","s_rule"):
        first={}
        for wk,g in Ft.groupby("wk"):
            kk=max(1,int(k*len(g))); top=g.nlargest(kk,name)
            for sid,t,gr in zip(top.student_id,top.wk,top.grad): first.setdefault(sid,t)
        dd=de[de.dropped_out & de.student_id.isin(Ft.student_id.unique())]
        gdd=dd[dd.dropout_type=="gradual"]; sdd=dd[dd.dropout_type=="sudden"]
        cg=[sid for sid,d in zip(gdd.student_id,gdd.dropout_date) if sid in first and first[sid]<d]
        cs=[sid for sid,d in zip(sdd.student_id,sdd.dropout_date) if sid in first and first[sid]<d]
        lead=[(d-first[sid]).days for sid,d in zip(gdd.student_id,gdd.dropout_date) if sid in first and first[sid]<d]
        out.append("%s gradual recall %.2f sudden recall %.2f median lead %.0fd flagged-ever %.2f"%(name[2:],len(cg)/max(len(gdd),1),len(cs)/max(len(sdd),1),np.median(lead) if lead else np.nan,len(first)/Ft.student_id.nunique()))
    print(f"top {k:.0%}/week:","  ||  ".join(out))
print("\n--- weekly-snapshot metrics (precision@k / recall@k over student-weeks, next-30-day label) ---")
base=Ft.y.mean()
for k in (0.02,0.04,0.08):
    res=[]
    for name in ("s_model","s_rule"):
        tp=n=0
        for wk,g in Ft.groupby("wk"):
            kk=max(1,int(k*len(g))); top=g.nlargest(kk,name); tp+=top.y.sum(); n+=len(top)
        res.append((name[2:],tp/n,tp/Ft.y.sum()))
    (m,pm,rm),(r,pr,rr)=res
    print(f"top {k:.0%}: precision model {pm:.3f} rule {pr:.3f} (lift vs base {pm/base:.1f}x / {pr/base:.1f}x, rel gain {pm/pr-1:+.0%}) | recall model {rm:.3f} rule {rr:.3f} (rel gain {rm/rr-1:+.0%})")
# student-level: of students who will drop in test cohort, share in model top 4% in at least one of last 4 weeks before dropout
