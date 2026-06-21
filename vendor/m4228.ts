// @ts-nocheck
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {fc,sl} from "./m715.ts";
import {l_,dU} from "./m3932.ts";
import {JUn,Hao} from "./m3994.ts";
import {NoSelect} from "./m2437.ts";
import {et,Ai} from "./m2208.ts";
import {Id,mc} from "../src/config/0645_maxBytes.ts";
import {formatFileSize,ps} from "./m238.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function d5a(){return""}
function p5a(e,t,n){let r=(e.attachments?.length??0)>0;if(!e.message&&!r)return null;if(n?.isTranscriptMode)return Yv.default.createElement(Box,{flexDirection:"row",marginTop:1},Yv.default.createElement(Box,{minWidth:2},Yv.default.createElement(Text,{color:"text"},fc)),Yv.default.createElement(Box,{flexDirection:"column"},e.message?Yv.default.createElement(l_,null,e.message):null,Yv.default.createElement(d3t,{attachments:e.attachments})));if(n?.isBriefOnly){let o=e.sentAt?JUn(e.sentAt):"";return Yv.default.createElement(Box,{flexDirection:"column",marginTop:1,paddingLeft:2},Yv.default.createElement(Box,{flexDirection:"row"},Yv.default.createElement(Text,{color:"briefLabelClaude"},"Claude"),o?Yv.default.createElement(Text,{dimColor:!0}," ",o):null),Yv.default.createElement(Box,{flexDirection:"column"},e.message?Yv.default.createElement(l_,null,e.message):null,Yv.default.createElement(d3t,{attachments:e.attachments})))}return Yv.default.createElement(Box,{flexDirection:"row",marginTop:1},Yv.default.createElement(NoSelect,{fromLeftEdge:!0,minWidth:2},Yv.default.createElement(Text,{color:"text"},fc)),Yv.default.createElement(Box,{flexDirection:"column"},e.message?Yv.default.createElement(l_,null,e.message):null,Yv.default.createElement(d3t,{attachments:e.attachments})))}
function d3t(e){let t=u5a.c(4),{attachments:n}=e;if(!n||n.length===0)return null;let r;if(t[0]!==n)r=n.map(hPp),t[0]=n,t[1]=r;else r=t[1];let o;if(t[2]!==r)o=Yv.default.createElement(Box,{flexDirection:"column",marginTop:1},r),t[2]=r,t[3]=o;else o=t[3];return o}
function hPp(e){return Yv.default.createElement(Box,{key:e.file_uuid??e.path,flexDirection:"row"},Yv.default.createElement(Text,{dimColor:!0},et.pointerSmall," ",e.isImage?"[image]":"[file]"," "),Yv.default.createElement(Text,null,Id(e.path)),Yv.default.createElement(Text,{dimColor:!0}," (",formatFileSize(e.size),")"))}
var u5a,Yv;
var ppo=b(()=>{Ai();dU();sl();ze();mc();ps();Hao();u5a=M(rt(),1),Yv=M(Te(),1)});
export {d5a,p5a,d3t,hPp,u5a,Yv,ppo};
