// @ts-nocheck
import {BaseBox} from "./m2397.ts";
import {QS,Q2} from "./m2552.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {vZ,RZ,mhe} from "./m2382.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function S1i(e){let t=X5r.c(17),{scope:n,bindings:r,active:o,preemptive:s,swallowAll:i,claimFocus:a,ref:l,flexGrow:c,flexDirection:u,flexShrink:d,children:p}=e,m=o===void 0?!0:o,f=s===void 0?!1:s,h=i===void 0?!1:i,g=a===void 0?!1:a,_=c===void 0?0:c,T=Oie.useRef(null),y;if(t[0]!==m||t[1]!==r||t[2]!==f||t[3]!==n||t[4]!==h)y={scope:n,bindings:r,active:m,preemptive:f,swallowAll:h},t[0]=m,t[1]=r,t[2]=f,t[3]=n,t[4]=h,t[5]=y;else y=t[5];let S=QRd(T,y);evd(T,g),tvd(T,n,g);let E;if(t[6]!==l)E=(k)=>{if(T.current=k,typeof l==="function")l(k);else if(l)l.current=k},t[6]=l,t[7]=E;else E=t[7];let R=E,w=g?-1:void 0,H;if(t[8]!==p||t[9]!==u||t[10]!==_||t[11]!==d||t[12]!==S||t[13]!==n||t[14]!==R||t[15]!==w)H=b1i.jsx(BaseBox,{ref:R,keybindingScope:n,onAction:S,tabIndex:w,flexGrow:_,flexDirection:u,flexShrink:d,children:p}),t[8]=p,t[9]=u,t[10]=_,t[11]=d,t[12]=S,t[13]=n,t[14]=R,t[15]=w,t[16]=H;else H=t[16];return H}
function XRd(e,t){for(let n of t){if(n.action!==e.action)continue;if(n.chordOnly&&!e.isChordCompletion)continue;if(n.run()===!1)continue;e.consume();return}}
function QRd(e,{scope:t,bindings:n,active:r=!0,preemptive:o=!1,swallowAll:s=!1}){let i=QS(),a=Oie.useRef([]);a.current=r?n:[];let l=Oie.useCallback((p)=>XRd(p,a.current),[]),c=ZRd(t,r,o,s,a.current),u=r&&o&&Boolean(t),d=u&&s;return Oie.useLayoutEffect(()=>{if(!i)return;let p=e.current;if(!p)return;let{decls:m,scopesChanged:f,preemptiveScopes:h,swallowAll:g}=i.keyHandlerRegistry,_={scope:t,active:r,preemptive:o,swallowAll:s,entriesRef:a};if(m.set(p,_),u&&t){if(y1i(h,t),d)y1i(g,t)}return f.emit(),()=>{if(m.delete(p),u&&t){if(T1i(h,t),d)T1i(g,t)}f.emit()}},[i,e,t,u,d,c]),l}
function y1i(e,t){e.set(t,(e.get(t)??0)+1)}
function T1i(e,t){let n=(e.get(t)??0)-1;if(n<=0)e.delete(t);else e.set(t,n)}
function ZRd(e,t,n,r,o){return TeamDeleteToolName([e??"",t,n,r,o.map((s)=>[s.action??"",s.hint??"",Boolean(s.chordOnly)])])}
function evd(e,t){Oie.useLayoutEffect(()=>{if(!t)return;let n=e.current;if(!n)return;let r=vZ(n),o=!1,s=()=>{if(o)return;let i=e.current;if(!i)return;let a=r.activeElement;if(a&&RZ(a,i))return;o=!0;try{r.focus(i)}finally{o=!1}};return r.pushAutoFocusFallback(n),s(),r.subscribe(s)},[e,t])}
function tvd(e,t,n){let r=X5r.c(6),o=QS(),s=Oie.useRef(!1),i,a;if(r[0]!==n||r[1]!==o||r[2]!==e||r[3]!==t)i=()=>{return},a=[e,t,n,o],r[0]=n,r[1]=o,r[2]=e,r[3]=t,r[4]=i,r[5]=a;else i=r[4],a=r[5];Oie.useLayoutEffect(i,a)}
var X5r,Oie,b1i;
var E1i=b(()=>{mhe();je();qe();tn();Q2();X5r=x(tt(),1),Oie=x(et(),1),b1i=x(oe(),1)});
export {S1i,XRd,QRd,y1i,T1i,ZRd,evd,tvd,X5r,Oie,b1i,E1i};
