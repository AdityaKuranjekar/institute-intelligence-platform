# Feasibility sim (NOT a result): checks whether acceptance bars in contracts/metrics_bars.yaml are realistic. Logistic regression stand-in for LightGBM; own toy generator -> directional only.
# Run: python sim_early_warning.py  (env: SD=seed NN=students). Needs numpy+scipy only.
import numpy as np
from scipy.optimize import minimize
import os
SEED=int(os.environ.get("SD","11"))
rng=np.random.default_rng(SEED)
import sys,os
N,W=int(os.environ.get("NN","3000")),52
SEED=int(os.environ.get("SD","11"))
def sig(x): return 1/(1+np.exp(-x))
oot=rng.random(N)<0.45                       # out-of-town
base=np.clip(rng.normal(0.82,0.09,N),0.45,0.97)  # chronic low attenders exist
ability=rng.normal(0,1,N)
# dropout times
hz=np.exp(-0.5*((np.arange(W)-30)/12)**2); hz=hz/hz.sum()*0.30
drop_wk=np.full(N,10**6); sudden=np.zeros(N,bool); fade=np.zeros(N)
for i in range(N):
    h=hz*(1.25 if ability[i]<-0.5 else 0.8)*(0.85 if rng.random()<0.4 else 1)
    u=rng.random(W)<h
    if u.any():
        drop_wk[i]=np.argmax(u); sudden[i]=rng.random()<0.25; fade[i]=rng.uniform(3,8)
print("dropouts:",(drop_wk<W).mean().round(3),"| sudden share:",sudden[drop_wk<W].mean().round(2))
att=np.zeros((N,W)); sc=np.full((N,W),np.nan)
for t in range(W):
    fest=(26<=t<=30)
    p=base*np.where(oot&fest,0.6,np.where(fest,0.9,1.0))*(0.7 if (t in (37,38,39,40) and rng.random()<2) and False else 1)
    for i in range(N):
        d=drop_wk[i]-t
        if not sudden[i] and 0<d<=fade[i]:
            p_i=p[i]*(0.35+0.65*(d/fade[i]))
        else: p_i=p[i]
        att[i,t]=rng.binomial(6,np.clip(p_i,0,1))/6 if t<=drop_wk[i] else np.nan
    if t%2==0:
        for i in range(N):
            if t<=drop_wk[i]:
                d=drop_wk[i]-t; pen=0
                if not sudden[i] and 0<d<=fade[i]: pen=0.9*(1-d/fade[i])
                sc[i,t]=ability[i]+rng.normal(0,0.6)-pen
def feats(t):
    act=np.where(drop_wk>t)[0]
    a4=np.nanmean(att[act][:,max(0,t-4):t],axis=1); a8h=np.nanmean(att[act][:,max(0,t-8):max(1,t-4)],axis=1)
    bm=np.nanmean(att[act][:,max(0,t-4):t])         # batch mean same window (festival-relative)
    last=np.array([next((sc[i,k] for k in range(t-1,-1,-1) if not np.isnan(sc[i,k])),np.nan) for i in act])
    prev=np.array([next((sc[i,k] for k in range(t-3,-1,-1) if not np.isnan(sc[i,k])),np.nan) for i in act])
    zbm=np.nanmean(np.where(np.isnan(last),np.nan,last))
    consec=np.zeros(len(act))
    X=np.c_[a4-bm,(a4-a8h),last-zbm,last-prev,np.nan_to_num(a4,nan=0.8)]
    rule=(a4<0.75)|((last-last[~np.isnan(last)].mean())<-1.0)   # institute rule proxy
    y=((drop_wk[act]>t)&(drop_wk[act]<=t+4)).astype(int)
    return act,np.nan_to_num(X),rule.astype(float),y
tr=[];te=[]
for t in range(6,W-4):
    act,X,rule,y=feats(t); (tr if t<26 else te).append((t,act,X,rule,y))
Xtr=np.vstack([x[2] for x in tr]); ytr=np.concatenate([x[4] for x in tr]); mu,sd=Xtr.mean(0),Xtr.std(0)+1e-9
def f(w,X,y): z=X@w[:-1]+w[-1]; p=sig(z); return -(y*np.log(p+1e-9)+(1-y)*np.log(1-p+1e-9)).mean()+1e-3*(w**2).sum()
w=minimize(f,np.zeros(Xtr.shape[1]+1),args=((Xtr-mu)/sd,ytr),method="L-BFGS-B").x
def aucpr(y,s):
    o=np.argsort(-s); y=y[o]; tp=np.cumsum(y); prec=tp/np.arange(1,len(y)+1); return (prec*y).sum()/max(y.sum(),1)
Y=np.concatenate([x[4] for x in te]); S=np.concatenate([sig(((x[2]-mu)/sd)@w[:-1]+w[-1]) for x in te]); R=np.concatenate([x[3] for x in te])
base_rate=Y.mean()
print(f"test prevalence {base_rate:.4f} | AUC-PR  model {aucpr(Y,S):.3f}  rule {aucpr(Y,R+1e-6*np.random.rand(len(R))):.3f}  -> rel gain {aucpr(Y,S)/aucpr(Y,R+1e-6*np.random.rand(len(R)))-1:+.0%}")
# operating point: weekly top-k = 4% of active; first flag lead time & recall
for name,score in (("model",lambda x:sig(((x[2]-mu)/sd)@w[:-1]+w[-1])),("rule ",lambda x:x[3]+1e-6*np.random.rand(len(x[3])))):
    flagged_first={}; 
    for x in te:
        t,act,_,_,_=x; s=score(x); k=max(1,int(0.04*len(act))); top=act[np.argsort(-s)[:k]]
        for i in top: flagged_first.setdefault(i,t)
    dr=[i for i in np.where(drop_wk<W)[0] if drop_wk[i]>=30 and drop_wk[i]<W-1]
    grad=[i for i in dr if not sudden[i]]; caught=[i for i in grad if i in flagged_first and flagged_first[i]<drop_wk[i]]
    lead=[(drop_wk[i]-flagged_first[i])*7 for i in caught]
    print(f"{name} top-4%/wk: gradual-dropout recall {len(caught)/max(len(grad),1):.2f} | median lead {np.median(lead) if lead else float('nan'):.0f} days | all-dropout recall {len([i for i in dr if i in flagged_first and flagged_first[i]<drop_wk[i]])/max(len(dr),1):.2f} | flagged-ever share {len(flagged_first)/ (N):.2f}")
