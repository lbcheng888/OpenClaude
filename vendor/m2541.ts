// @ts-nocheck
import {ca} from "./m5.ts";
import {dbn,T0t,gwe} from "./m2466.ts";
import {XHi,l3r} from "./m2540.ts";
import {b,M} from "../runtime.ts";
import {kg} from "./m129.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function yEn(){return{decls:new WeakMap,scopesChanged:ca(),preemptiveScopes:new Map,swallowAll:new Map,keyDispatchTrace:ca()}}
function TEn(e){let t=c3r.c(24),{bindings:n,pendingChordRef:r,pendingChord:o,setPendingChord:s,activeContexts:i,registerActiveContext:a,unregisterActiveContext:l,handlerRegistryRef:c,preDispatchRef:u,keyHandlerRegistry:d,children:p}=e,m;if(t[0]!==n)m=(R,k)=>dbn(R,k,n),t[0]=n,t[1]=m;else m=t[1];let f=m,A;if(t[2]!==u)A=(R)=>(u.current.add(R),()=>u.current.delete(R)),t[2]=u,t[3]=A;else A=t[3];let h=A,g;if(t[4]!==c)g=(R)=>{let k=c.current;if(!k)return wfd;if(!k.has(R.action))k.set(R.action,new Set);return k.get(R.action).add(R),()=>{let x=k.get(R.action);if(x){if(x.delete(R),x.size===0)k.delete(R.action)}}},t[4]=c,t[5]=g;else g=t[5];let _=g,y;if(t[6]!==n||t[7]!==r)y=(R,k,x)=>T0t(XHi(R,k),x,n,r.current),t[6]=n,t[7]=r,t[8]=y;else y=t[8];let T;if(t[9]!==i||t[10]!==n||t[11]!==f||t[12]!==d||t[13]!==o||t[14]!==a||t[15]!==_||t[16]!==h||t[17]!==s||t[18]!==y||t[19]!==l)T={resolve:y,setPendingChord:s,getDisplayText:f,bindings:n,pendingChord:o,activeContexts:i,registerActiveContext:a,unregisterActiveContext:l,registerHandler:_,registerPreDispatch:h,keyHandlerRegistry:d},t[9]=i,t[10]=n,t[11]=f,t[12]=d,t[13]=o,t[14]=a,t[15]=_,t[16]=h,t[17]=s,t[18]=y,t[19]=l,t[20]=T;else T=t[20];let S=T,v;if(t[21]!==p||t[22]!==S)v=kwe.default.createElement(QHi.Provider,{value:S},p),t[21]=p,t[22]=S,t[23]=v;else v=t[23];return v}
function wfd(){}
function getSettingsSchema(){return kwe.useContext(QHi)}
function SEn(e,t){let n=c3r.c(5),r=t===void 0?!0:t,o=getSettingsSchema(),s,i;if(n[0]!==e||n[1]!==r||n[2]!==o)s=()=>{if(!o||!r)return;return o.registerActiveContext(e),()=>{o.unregisterActiveContext(e)}},i=[e,o,r],n[0]=e,n[1]=r,n[2]=o,n[3]=s,n[4]=i;else s=n[3],i=n[4];kwe.useLayoutEffect(s,i)}
var c3r,kwe,QHi;
var k$=b(()=>{kg();l3r();gwe();c3r=M(rt(),1),kwe=M(Te(),1);QHi=kwe.createContext(null)});
export {yEn,TEn,wfd,getSettingsSchema,SEn,c3r,kwe,QHi,k$};
