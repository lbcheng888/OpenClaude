// @ts-nocheck
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {Gn,sc} from "./m2455.ts";
import {Pt,Go} from "./m632.ts";
import {Di,dr} from "./m231.ts";
import {Uq,r9e} from "./m3222.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function P1a(e){let t=I1a.c(13),{attachment:n,verbose:r,isTranscriptMode:o}=e;if(n.files.length===0)return null;let s;if(t[0]!==n.files)s=n.files.reduce(oEp,0),t[0]=n.files,t[1]=s;else s=t[1];let i=s,a=n.files.length;if(r||o){let l;if(t[2]!==n.files)l=n.files.map(nEp),t[2]=n.files,t[3]=l;else l=t[3];let c;if(t[4]!==l)c=YW.default.createElement(Box,{flexDirection:"column"},l),t[4]=l,t[5]=c;else c=t[5];return c}else{let l;if(t[6]!==i)l=YW.default.createElement(Text,{bold:!0},i),t[6]=i,t[7]=l;else l=t[7];let c=i===1?"issue":"issues",u=a===1?"file":"files",d;if(t[8]!==a||t[9]!==l||t[10]!==c||t[11]!==u)d=YW.default.createElement(Gn,null,YW.default.createElement(Text,{dimColor:!0,wrap:"wrap"},"Found ",l," new diagnostic"," ",c," in ",a," ",u," (ctrl+o to expand)")),t[8]=a,t[9]=l,t[10]=c,t[11]=u,t[12]=d;else d=t[12];return d}}
function nEp(e,t){return YW.default.createElement(YW.default.Fragment,{key:t},YW.default.createElement(Gn,null,YW.default.createElement(Text,{dimColor:!0,wrap:"wrap"},YW.default.createElement(Text,{bold:!0},D1a.relative(Pt(),e.uri.replace("file://","").replace("_claude_fs_right:","")))," ",YW.default.createElement(Text,{dimColor:!0},e.uri.startsWith("file://")?"(file://)":e.uri.startsWith("_claude_fs_right:")?"(claude_fs_right)":`(${Di(e.uri,":")})`),":")),e.diagnostics.map(rEp))}
function rEp(e,t){return YW.default.createElement(Gn,{key:t},YW.default.createElement(Text,{dimColor:!0,wrap:"wrap"},"  ",Uq.getSeveritySymbol(e.severity)," [Line ",e.range.start.line+1,":",e.range.start.character+1,"] ",e.message,e.code?` [${e.code}]`:"",e.source?` (${e.source})`:""))}
function oEp(e,t){return e+t.diagnostics.length}
var I1a,D1a,YW;
var O1a=b(()=>{ze();r9e();Go();dr();sc();I1a=M(rt(),1),D1a=require("path"),YW=M(Te(),1)});
export {P1a,nEp,rEp,oEp,I1a,D1a,YW,O1a};
