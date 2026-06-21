// @ts-nocheck
import {Eu} from "./m3812.ts";
import {Or,Ts} from "./m2542.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {lr,readRoster} from "./m2547.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {Pa,rh} from "./m2539.ts";
import {nl,v_} from "./m2573.ts";
import {React,CE} from "./m3813.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {$y} from "./m3814.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function $Ia(){let e=UIa.c(17),{goBack:t,goNext:n,updateWizardData:r,wizardData:o}=Eu(),[s,i]=rU.useState(o.region??"global"),[a,l]=rU.useState(s.length),[c,u]=rU.useState(null),d;if(e[0]===Symbol.for("react.memo_cache_sentinel"))d={context:"Settings"},e[0]=d;else d=e[0];Or("confirm:no",t,d);let p;if(e[1]!==n||e[2]!==r||e[3]!==s)p=()=>{let T=s.trim();if(!T){u("Region is required");return}u(null),r({region:T}),n()},e[1]=n,e[2]=r,e[3]=s,e[4]=p;else p=e[4];let m=p,f;if(e[5]===Symbol.for("react.memo_cache_sentinel"))f=rU.default.createElement(Tn,null,rU.default.createElement(at,{chord:"enter",action:"continue"}),rU.default.createElement(lr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"})),e[5]=f;else f=e[5];let A,h;if(e[6]===Symbol.for("react.memo_cache_sentinel"))A=rU.default.createElement(Text,null,"Where Claude models are served from."),h=rU.default.createElement(Text,{dimColor:!0},"Use 'global', 'us', or 'eu' for a multi-region endpoint (recommended), or a specific location like us-east5 if you have regional quota."),e[6]=A,e[7]=h;else A=e[6],h=e[7];let g;if(e[8]!==a||e[9]!==m||e[10]!==s)g=rU.default.createElement(Box,{marginTop:1},rU.default.createElement(Pa,{value:s,onChange:i,onSubmit:m,placeholder:"global",columns:40,cursorOffset:a,onChangeCursorOffset:l,focus:!0,showCursor:!0})),e[8]=a,e[9]=m,e[10]=s,e[11]=g;else g=e[11];let _;if(e[12]!==c)_=c&&rU.default.createElement(Box,{marginTop:1},rU.default.createElement(nl,{error:c})),e[12]=c,e[13]=_;else _=e[13];let y;if(e[14]!==g||e[15]!==_)y=rU.default.createElement(React,{subtitle:"Vertex AI region",footerText:f},rU.default.createElement(Box,{flexDirection:"column"},A,h,g,_)),e[14]=g,e[15]=_,e[16]=y;else y=e[16];return y}
var UIa,rU;
var qIa=b(()=>{ze();Ts();readRoster();zs();v_();rs();rh();$y();CE();UIa=M(rt(),1),rU=M(Te(),1)});
export {$Ia,UIa,rU,qIa};
