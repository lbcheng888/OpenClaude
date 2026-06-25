// @ts-nocheck
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {gS,vte} from "./m3991.ts";
import {tL,ix,__} from "./m3842.ts";
import {fk,lr} from "./m233.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function uYn(e){let t=XPl.c(17),{agentName:n,currentColor:r,onConfirm:o}=e,s=r===void 0?"automatic":r,i;if(t[0]!==s)i=vgt.findIndex((_)=>_===s),t[0]=s,t[1]=i;else i=t[1];let[a,l]=QPl.useState(Math.max(0,i)),c;if(t[2]!==o||t[3]!==a)c=(_)=>{if(_.key==="up")_.preventDefault(),l(Cgm);else if(_.key==="down")_.preventDefault(),l(Egm);else if(_.key==="return"){_.preventDefault();let T=vgt[a];o(T==="automatic"?void 0:T)}},t[2]=o,t[3]=a,t[4]=c;else c=t[4];let u=c,d=vgt[a],p;if(t[5]!==a)p=vgt.map((_,T)=>{let y=T===a;return I6.jsxs(Box,{flexDirection:"row",gap:1,children:[I6.jsx(Text,{color:y?"suggestion":void 0,children:y?Xe.pointer:" "}),_==="automatic"?I6.jsx(Text,{bold:y,children:"Automatic color"}):I6.jsxs(Box,{gap:1,children:[I6.jsx(gS,{color:tL[_],children:" "}),I6.jsx(Text,{bold:y,children:fk(_)})]})]},_)}),t[5]=a,t[6]=p;else p=t[6];let m;if(t[7]!==p)m=I6.jsx(Box,{flexDirection:"column",children:p}),t[7]=p,t[8]=m;else m=t[8];let f;if(t[9]===Symbol.for("react.memo_cache_sentinel"))f=I6.jsx(Text,{children:"Preview: "}),t[9]=f;else f=t[9];let h;if(t[10]!==n||t[11]!==d)h=I6.jsxs(Box,{marginTop:1,children:[f,d===void 0||d==="automatic"?I6.jsxs(Text,{inverse:!0,bold:!0,children:[" ","@",n," "]}):I6.jsxs(gS,{color:tL[d],bold:!0,padded:!0,children:["@",n]})]}),t[10]=n,t[11]=d,t[12]=h;else h=t[12];let g;if(t[13]!==u||t[14]!==m||t[15]!==h)g=I6.jsxs(Box,{flexDirection:"column",gap:1,tabIndex:0,autoFocus:!0,onKeyDown:u,children:[m,h]}),t[13]=u,t[14]=m,t[15]=h,t[16]=g;else g=t[16];return g}
function Egm(e){return e<vgt.length-1?e+1:0}
function Cgm(e){return e>0?e-1:vgt.length-1}
var XPl,QPl,I6,vgt;
var b0o=b(()=>{Zs();je();ix();lr();vte();XPl=x(tt(),1),QPl=x(et(),1),I6=x(oe(),1),vgt=["automatic",...__]});
export {uYn,Egm,Cgm,XPl,QPl,I6,vgt,b0o};
