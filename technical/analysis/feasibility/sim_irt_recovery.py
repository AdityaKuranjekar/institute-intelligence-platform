# Feasibility sim (NOT a result): 2PL/Rasch MAP difficulty recovery vs number of students. Run: python sim_irt_recovery.py (numpy+scipy only).
import numpy as np
from scipy.optimize import minimize
rng=np.random.default_rng(7)
def sig(x): return 1/(1+np.exp(-x))
def simulate(n,J=60,c_true=0.10):
    th=rng.normal(0,1,n); b=rng.normal(0,1,J); a=np.exp(rng.normal(0,0.3,J))
    p=c_true+(1-c_true)*sig(a[None]*(th[:,None]-b[None])); Y=(rng.random((n,J))<p).astype(float)
    return Y,th,b,a
def fit(Y,c=0.15,two_pl=True):
    n,J=Y.shape
    def unpack(x): return x[:n],x[n:n+J],(np.exp(x[n+J:]) if two_pl else np.ones(J)),x[n+J:]
    def f(x):
        th,b,a,la=unpack(x); z=a[None]*(th[:,None]-b[None]); s=sig(z); p=c+(1-c)*s
        ll=Y*np.log(p+1e-9)+(1-Y)*np.log(1-p+1e-9)
        nll=-ll.sum()+0.5*(th**2).sum()+0.5*((b/1.5)**2).sum()
        if two_pl: nll+=0.5*((la/0.5)**2).sum()
        dp=(Y/(p+1e-9)-(1-Y)/(1-p+1e-9))*(1-c)*s*(1-s)   # d ll / d z
        gth=-(dp*a[None]).sum(1)+th; gb=(dp*a[None]).sum(0)+b/2.25
        g=[gth,gb]
        if two_pl: g.append(-(dp*(th[:,None]-b[None])).sum(0)*a+la/0.25)
        return nll,np.concatenate(g)
    x0=np.concatenate([np.zeros(n),np.zeros(J)]+([np.zeros(J)] if two_pl else []))
    r=minimize(f,x0,jac=True,method="L-BFGS-B"); th,b,a,_=unpack(r.x); return th,b,a
print("n_students | r(b) 2PL | r(b) Rasch-fallback | (J=60 items, 12 reps, fit c=0.15 vs true 0.10 = misspecified)")
for n in (30,60,100,200,500):
    r2=[];r1=[]
    for _ in range(12):
        Y,th,b,a=simulate(n)
        r2.append(np.corrcoef(fit(Y,two_pl=True)[1],b)[0,1]); r1.append(np.corrcoef(fit(Y,two_pl=False)[1],b)[0,1])
    print(f"{n:>4} | {np.mean(r2):.3f} (min {np.min(r2):.2f}) | {np.mean(r1):.3f} (min {np.min(r1):.2f})")
