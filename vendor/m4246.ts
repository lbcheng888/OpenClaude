// @ts-nocheck
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Ql,Pa} from "./m720.ts";
import {gh,G1} from "./m3957.ts";
import {L3n,fmo} from "./m4059.ts";
import {NoSelect} from "./m2447.ts";
import {Xe,Zs} from "./m2216.ts";
import {dd,Xl} from "../src/config/0651_maxBytes.ts";
import {formatFileSize,Xo} from "./m240.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Ija(){return""}
function xja(e,t,n){let r=(e.attachments?.length??0)>0;if(!e.message&&!r)return null;if(n?.isTranscriptMode)return FC.jsxs(Box,{flexDirection:"row",marginTop:1,children:[FC.jsx(Box,{minWidth:2,children:FC.jsx(Text,{color:"text",children:Ql})}),FC.jsxs(Box,{flexDirection:"column",children:[e.message?FC.jsx(gh,{children:e.message}):null,FC.jsx(kqt,{attachments:e.attachments})]})]});if(n?.isBriefOnly){let o=e.sentAt?L3n(e.sentAt):"";return FC.jsxs(Box,{flexDirection:"column",marginTop:1,paddingLeft:2,children:[FC.jsxs(Box,{flexDirection:"row",children:[FC.jsx(Text,{color:"briefLabelClaude",children:"Claude"}),o?FC.jsxs(Text,{dimColor:!0,children:[" ",o]}):null]}),FC.jsxs(Box,{flexDirection:"column",children:[e.message?FC.jsx(gh,{children:e.message}):null,FC.jsx(kqt,{attachments:e.attachments})]})]})}return FC.jsxs(Box,{flexDirection:"row",marginTop:1,children:[FC.jsx(NoSelect,{fromLeftEdge:!0,minWidth:2,children:FC.jsx(Text,{color:"text",children:Ql})}),FC.jsxs(Box,{flexDirection:"column",children:[e.message?FC.jsx(gh,{children:e.message}):null,FC.jsx(kqt,{attachments:e.attachments})]})]})}
function kqt(e){let t=Hja.c(4),{attachments:n}=e;if(!n||n.length===0)return null;let r;if(t[0]!==n)r=n.map(LUp),t[0]=n,t[1]=r;else r=t[1];let o;if(t[2]!==r)o=FC.jsx(Box,{flexDirection:"column",marginTop:1,children:r}),t[2]=r,t[3]=o;else o=t[3];return o}
function LUp(e){return FC.jsxs(Box,{flexDirection:"row",children:[FC.jsxs(Text,{dimColor:!0,children:[Xe.pointerSmall," ",e.isImage?"[image]":"[file]"," "]}),FC.jsx(Text,{children:dd(e.path)}),FC.jsxs(Text,{dimColor:!0,children:[" (",formatFileSize(e.size),")"]})]},e.file_uuid??e.path)}
var Hja,FC;
var a_o=b(()=>{Zs();G1();Pa();je();Xl();Xo();fmo();Hja=x(tt(),1),FC=x(oe(),1)});
export {Ija,xja,kqt,LUp,Hja,FC,a_o};
