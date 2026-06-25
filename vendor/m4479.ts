// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {at,Wo} from "./m2557.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {hr,Ol} from "./m2573.ts";
import {preInitQueue,di} from "./m2583.ts";
import {kl,lh} from "./m2739.ts";
import {yul,_ul,Tul} from "../src/session/4479_freeformPrompt.ts";
import {Oo,ss} from "./m2553.ts";
import {Ba,I_} from "./m2584.ts";
import {Hc,OE} from "./m3855.ts";
import {Link,yie} from "./m2437.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
var Sul={};
ft(Sul,{call:()=>njp});
function rjp(e){let t=lCo.c(16),{onDone:n,context:r,args:o}=e,s=!1,i;if(t[0]!==!1)i=()=>!getGlobalConfig().hasSeenAutofixPrChatOpsNotice,t[0]=!1,t[1]=i;else i=t[1];let[a,l]=jY.useState(i);if(!a){let h;if(t[2]!==o||t[3]!==r||t[4]!==n)h=WI.jsx(sjp,{onDone:n,context:r,args:o}),t[2]=o,t[3]=r,t[4]=n,t[5]=h;else h=t[5];return h}let c;if(t[6]!==n)c=()=>n("Autofix PR cancelled",{display:"system"}),t[6]=n,t[7]=c;else c=t[7];let u;if(t[8]===Symbol.for("react.memo_cache_sentinel"))u=WI.jsx(at,{chord:"escape",action:"cancel"}),t[8]=u;else u=t[8];let d;if(t[9]===Symbol.for("react.memo_cache_sentinel"))d=WI.jsx(Text,{children:"Auto-fix monitors the PR and can post comments on your behalf using your GitHub identity."}),t[9]=d;else d=t[9];let p;if(t[10]===Symbol.for("react.memo_cache_sentinel"))p=[{value:"continue",label:"Continue",description:"start monitoring this PR"},{value:"cancel",label:"Not now"}],t[10]=p;else p=t[10];let m;if(t[11]!==n)m=WI.jsxs(Box,{flexDirection:"column",gap:1,children:[d,WI.jsx(hr,{options:p,onChange:(h)=>{if(h==="continue")saveGlobalConfig(ojp),l(!1);else n("Autofix PR cancelled",{display:"system"})},onCancel:()=>n("Autofix PR cancelled",{display:"system"})})]}),t[11]=n,t[12]=m;else m=t[12];let f;if(t[13]!==c||t[14]!==m)f=WI.jsx(preInitQueue,{title:"Autofix PR",subtitle:"Before you start",onCancel:c,inputGuide:u,children:m}),t[13]=c,t[14]=m,t[15]=f;else f=t[15];return f}
function ojp(e){return e.hasSeenAutofixPrChatOpsNotice?e:{...e,hasSeenAutofixPrChatOpsNotice:!0}}
function sjp(e){let t=lCo.c(30),{onDone:n,context:r,args:o}=e,[s,i]=jY.useState("checking"),[a,l]=jY.useState(null),[c,u]=jY.useState(null),[d,p]=jY.useState(!1),m=jY.useRef(null),f=jY.useRef(!1),h=jY.useRef(!1),g;if(t[0]!==n)g=function(...L){let P=L;if(h.current)return;h.current=!0,n(...P)},t[0]=n,t[1]=g;else g=t[1];let _=g,T;if(t[2]!==o||t[3]!==r||t[4]!==_)T=()=>{let O=kl();return m.current=O,yul(o,r,{signal:O.signal,onProgress:(L)=>{if(i(L.step),L.prInfo)l(L.prInfo)}}).then((L)=>{if(O.signal.aborted&&!f.current)return;switch(L.kind){case"ok":{_(L.message,{display:L.display});return}case"error":{if(f.current)_("Autofix PR cancelled");else u(L.message);return}case"cancelled":{_("Autofix PR cancelled");return}}}).catch((L)=>{_(`Autofix PR failed: ${L instanceof Error?L.message:String(L)}`)}),()=>{O.abort()}},t[2]=o,t[3]=r,t[4]=_,t[5]=T;else T=t[5];let y;if(t[6]!==o||t[7]!==r||t[8]!==n)y=[n,r,o],t[6]=o,t[7]=r,t[8]=n,t[9]=y;else y=t[9];jY.useEffect(T,y);let S;if(t[10]!==_||t[11]!==c)S=function(){if(c){_(c);return}if(f.current){_("Autofix PR cancelled");return}f.current=!0,p(!0),m.current?.abort()},t[10]=_,t[11]=c,t[12]=S;else S=t[12];let E=S,R;if(t[13]!==_||t[14]!==c)R={"confirm:yes":()=>{if(c)_(c)}},t[13]=_,t[14]=c,t[15]=R;else R=t[15];let w=c!==null,H;if(t[16]!==w)H={context:"Confirmation",isActive:w},t[16]=w,t[17]=H;else H=t[17];Oo(R,H);let k;if(t[18]!==d||t[19]!==c)k=c?WI.jsx(at,{chord:["escape","enter"],action:"close"}):d?WI.jsx(at,{chord:"escape",action:"dismiss now"}):WI.jsx(at,{chord:"escape",action:"cancel"}),t[18]=d,t[19]=c,t[20]=k;else k=t[20];let I;if(t[21]!==d||t[22]!==c||t[23]!==a||t[24]!==s)I=WI.jsx(Box,{flexDirection:"column",gap:1,children:c?WI.jsx(Ba,{error:c}):WI.jsxs(WI.Fragment,{children:[WI.jsx(Hc,{message:d?"Cancelling\u2026":_ul[s]}),a&&WI.jsxs(Text,{dimColor:!0,children:["PR: ",WI.jsx(Link,{url:a.url,children:a.ref})]})]})}),t[21]=d,t[22]=c,t[23]=a,t[24]=s,t[25]=I;else I=t[25];let D;if(t[26]!==E||t[27]!==k||t[28]!==I)D=WI.jsx(preInitQueue,{title:"Autofix PR",subtitle:"Monitor and autofix any issues with the current PR",onCancel:E,inputGuide:k,children:I}),t[26]=E,t[27]=k,t[28]=I,t[29]=D;else D=t[29];return D}
var lCo,jY,WI,njp=async(e,t,n)=>WI.jsx(rjp,{onDone:e,context:t,args:n.trim()});
var bul=b(()=>{Ol();di();I_();Wo();OE();yie();je();ss();lh();tr();Tul();lCo=x(tt(),1),jY=x(et(),1),WI=x(oe(),1)});
export {Sul,rjp,ojp,sjp,lCo,jY,WI,njp,bul};
