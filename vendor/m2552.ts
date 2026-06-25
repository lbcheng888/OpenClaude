// @ts-nocheck
import {Ni} from "./m127.ts";
import {QAn,YPt,nwe} from "./m2476.ts";
import {SMi,B5r} from "./m2551.ts";
import {b,x} from "../runtime.ts";
import {ig} from "./m130.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function avn(){return{decls:new WeakMap,scopesChanged:Ni(),preemptiveScopes:new Map,swallowAll:new Map,keyDispatchTrace:Ni()}}
function lvn(e){let t=U5r.c(24),{bindings:n,pendingChordRef:r,pendingChord:o,setPendingChord:s,activeContexts:i,registerActiveContext:a,unregisterActiveContext:l,handlerRegistryRef:c,preDispatchRef:u,keyHandlerRegistry:d,children:p}=e,m;if(t[0]!==n)m=(w,H)=>QAn(w,H,n),t[0]=n,t[1]=m;else m=t[1];let f=m,h;if(t[2]!==u)h=(w)=>(u.current.add(w),()=>u.current.delete(w)),t[2]=u,t[3]=h;else h=t[3];let g=h,_;if(t[4]!==c)_=(w)=>{let H=c.current;if(!H)return QAd;if(!H.has(w.action))H.set(w.action,new Set);return H.get(w.action).add(w),()=>{let k=H.get(w.action);if(k){if(k.delete(w),k.size===0)H.delete(w.action)}}},t[4]=c,t[5]=_;else _=t[5];let T=_,y;if(t[6]!==n||t[7]!==r)y=(w,H,k)=>YPt(SMi(w,H),k,n,r.current),t[6]=n,t[7]=r,t[8]=y;else y=t[8];let S;if(t[9]!==i||t[10]!==n||t[11]!==f||t[12]!==d||t[13]!==o||t[14]!==a||t[15]!==T||t[16]!==g||t[17]!==s||t[18]!==y||t[19]!==l)S={resolve:y,setPendingChord:s,getDisplayText:f,bindings:n,pendingChord:o,activeContexts:i,registerActiveContext:a,unregisterActiveContext:l,registerHandler:T,registerPreDispatch:g,keyHandlerRegistry:d},t[9]=i,t[10]=n,t[11]=f,t[12]=d,t[13]=o,t[14]=a,t[15]=T,t[16]=g,t[17]=s,t[18]=y,t[19]=l,t[20]=S;else S=t[20];let E=S,R;if(t[21]!==p||t[22]!==E)R=EMi.jsx(bMi.Provider,{value:E,children:p}),t[21]=p,t[22]=E,t[23]=R;else R=t[23];return R}
function QAd(){}
function QS(){return Ent.useContext(bMi)}
function cvn(e,t){let n=U5r.c(5),r=t===void 0?!0:t,o=QS(),s,i;if(n[0]!==e||n[1]!==r||n[2]!==o)s=()=>{if(!o||!r)return;return o.registerActiveContext(e),()=>{o.unregisterActiveContext(e)}},i=[e,o,r],n[0]=e,n[1]=r,n[2]=o,n[3]=s,n[4]=i;else s=n[3],i=n[4];Ent.useLayoutEffect(s,i)}
var U5r,Ent,EMi,bMi;
var Q2=b(()=>{ig();B5r();nwe();U5r=x(tt(),1),Ent=x(et(),1),EMi=x(oe(),1);bMi=Ent.createContext(null)});
export {avn,lvn,QAd,QS,cvn,U5r,Ent,EMi,bMi,Q2};
