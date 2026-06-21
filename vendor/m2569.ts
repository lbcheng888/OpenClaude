// @ts-nocheck
import {BaseBox} from "./m2387.ts";
import {getSettingsSchema,k$} from "./m2541.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {IZ,HZ,rAe} from "./m2372.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function VIi(e){let t=b3r.c(17),{scope:n,bindings:r,active:o,preemptive:s,swallowAll:i,claimFocus:a,ref:l,flexGrow:c,flexDirection:u,flexShrink:d,children:p}=e,m=o===void 0?!0:o,f=s===void 0?!1:s,A=i===void 0?!1:i,h=a===void 0?!1:a,g=c===void 0?0:c,_=ez.useRef(null),y;if(t[0]!==m||t[1]!==r||t[2]!==f||t[3]!==n||t[4]!==A)y={scope:n,bindings:r,active:m,preemptive:f,swallowAll:A},t[0]=m,t[1]=r,t[2]=f,t[3]=n,t[4]=A,t[5]=y;else y=t[5];let T=wAd(_,y);xAd(_,h),kAd(_,n,h);let S;if(t[6]!==l)S=(x)=>{if(_.current=x,typeof l==="function")l(x);else if(l)l.current=x},t[6]=l,t[7]=S;else S=t[7];let v=S,R=h?-1:void 0,k;if(t[8]!==p||t[9]!==u||t[10]!==g||t[11]!==d||t[12]!==T||t[13]!==n||t[14]!==v||t[15]!==R)k=ez.default.createElement(BaseBox,{ref:v,keybindingScope:n,onAction:T,tabIndex:R,flexGrow:g,flexDirection:u,flexShrink:d},p),t[8]=p,t[9]=u,t[10]=g,t[11]=d,t[12]=T,t[13]=n,t[14]=v,t[15]=R,t[16]=k;else k=t[16];return k}
function vAd(e,t){for(let n of t){if(n.action!==e.action)continue;if(n.chordOnly&&!e.isChordCompletion)continue;if(n.run()===!1)continue;e.consume();return}}
function wAd(e,{scope:t,bindings:n,active:r=!0,preemptive:o=!1,swallowAll:s=!1}){let i=getSettingsSchema(),a=ez.useRef([]);a.current=r?n:[];let l=ez.useCallback((p)=>vAd(p,a.current),[]),c=RAd(t,r,o,s,a.current),u=r&&o&&Boolean(t),d=u&&s;return ez.useLayoutEffect(()=>{if(!i)return;let p=e.current;if(!p)return;let{decls:m,scopesChanged:f,preemptiveScopes:A,swallowAll:h}=i.keyHandlerRegistry,g={scope:t,active:r,preemptive:o,swallowAll:s,entriesRef:a};if(m.set(p,g),u&&t){if(WIi(A,t),d)WIi(h,t)}return f.emit(),()=>{if(m.delete(p),u&&t){if(GIi(A,t),d)GIi(h,t)}f.emit()}},[i,e,t,u,d,c]),l}
function WIi(e,t){e.set(t,(e.get(t)??0)+1)}
function GIi(e,t){let n=(e.get(t)??0)-1;if(n<=0)e.delete(t);else e.set(t,n)}
function RAd(e,t,n,r,o){return Le([e??"",t,n,r,o.map((s)=>[s.action??"",s.hint??"",Boolean(s.chordOnly)])])}
function xAd(e,t){ez.useLayoutEffect(()=>{if(!t)return;let n=e.current;if(!n)return;let r=IZ(n),o=!1,s=()=>{if(o)return;let i=e.current;if(!i)return;let a=r.activeElement;if(a&&HZ(a,i))return;o=!0;try{r.focus(i)}finally{o=!1}};return r.pushAutoFocusFallback(n),s(),r.subscribe(s)},[e,t])}
function kAd(e,t,n){let r=b3r.c(6),o=getSettingsSchema(),s=ez.useRef(!1),i,a;if(r[0]!==n||r[1]!==o||r[2]!==e||r[3]!==t)i=()=>{return},a=[e,t,n,o],r[0]=n,r[1]=o,r[2]=e,r[3]=t,r[4]=i,r[5]=a;else i=r[4],a=r[5];ez.useLayoutEffect(i,a)}
var b3r,ez;
var KIi=b(()=>{rAe();ze();qe();Xt();k$();b3r=M(rt(),1),ez=M(Te(),1)});
export {VIi,vAd,wAd,WIi,GIi,RAd,xAd,kAd,b3r,ez,KIi};
