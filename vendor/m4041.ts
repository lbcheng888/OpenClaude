// @ts-nocheck
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Yn,Pl} from "./m2465.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {mi,lr} from "./m233.ts";
import {nq,p3e} from "./m3238.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function i4a(e){let t=r4a.c(13),{attachment:n,verbose:r,isTranscriptMode:o}=e;if(n.files.length===0)return null;let s;if(t[0]!==n.files)s=n.files.reduce(Qxp,0),t[0]=n.files,t[1]=s;else s=t[1];let i=s,a=n.files.length;if(r||o){let l;if(t[2]!==n.files)l=n.files.map(Jxp),t[2]=n.files,t[3]=l;else l=t[3];let c;if(t[4]!==l)c=yG.jsx(Box,{flexDirection:"column",children:l}),t[4]=l,t[5]=c;else c=t[5];return c}else{let l;if(t[6]!==i)l=yG.jsx(Text,{bold:!0,children:i}),t[6]=i,t[7]=l;else l=t[7];let c=i===1?"issue":"issues",u=a===1?"file":"files",d;if(t[8]!==a||t[9]!==l||t[10]!==c||t[11]!==u)d=yG.jsx(Yn,{children:yG.jsxs(Text,{dimColor:!0,wrap:"wrap",children:["Found ",l," new diagnostic"," ",c," in ",a," ",u," (ctrl+o to expand)"]})}),t[8]=a,t[9]=l,t[10]=c,t[11]=u,t[12]=d;else d=t[12];return d}}
function Jxp(e,t){return yG.jsxs(s4a.Fragment,{children:[yG.jsx(Yn,{children:yG.jsxs(Text,{dimColor:!0,wrap:"wrap",children:[yG.jsx(Text,{bold:!0,children:o4a.relative(isTmuxControlMode(),e.uri.replace("file://","").replace("_claude_fs_right:",""))})," ",yG.jsx(Text,{dimColor:!0,children:e.uri.startsWith("file://")?"(file://)":e.uri.startsWith("_claude_fs_right:")?"(claude_fs_right)":`(${mi(e.uri,":")})`}),":"]})}),e.diagnostics.map(Xxp)]},t)}
function Xxp(e,t){return yG.jsx(Yn,{children:yG.jsxs(Text,{dimColor:!0,wrap:"wrap",children:["  ",nq.getSeveritySymbol(e.severity)," [Line ",e.range.start.line+1,":",e.range.start.character+1,"] ",e.message,e.code?` [${e.code}]`:"",e.source?` (${e.source})`:""]})},t)}
function Qxp(e,t){return e+t.diagnostics.length}
var r4a,o4a,s4a,yG;
var a4a=b(()=>{je();p3e();Po();lr();Pl();r4a=x(tt(),1),o4a=require("path"),s4a=x(et(),1),yG=x(oe(),1)});
export {i4a,Jxp,Xxp,Qxp,r4a,o4a,s4a,yG,a4a};
