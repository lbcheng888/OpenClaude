// @ts-nocheck
import {Eu} from "./m3812.ts";
import {Or,Ts} from "./m2542.ts";
import {Ige,yBn} from "./m3817.ts";
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
function hHa(){let e=AHa.c(17),{goBack:t,goToStep:n,updateWizardData:r,wizardData:o}=Eu(),[s,i]=tU.useState(o.bearerToken??""),[a,l]=tU.useState(s.length),[c,u]=tU.useState(null),d;if(e[0]===Symbol.for("react.memo_cache_sentinel"))d={context:"Settings"},e[0]=d;else d=e[0];Or("confirm:no",t,d);let p;if(e[1]!==n||e[2]!==r||e[3]!==s)p=()=>{let T=s.trim();if(!T){u("API key is required");return}u(null),r({bearerToken:T}),n(Ige.REGION)},e[1]=n,e[2]=r,e[3]=s,e[4]=p;else p=e[4];let m=p,f;if(e[5]===Symbol.for("react.memo_cache_sentinel"))f=tU.default.createElement(Tn,null,tU.default.createElement(at,{chord:"enter",action:"continue"}),tU.default.createElement(lr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"})),e[5]=f;else f=e[5];let A,h;if(e[6]===Symbol.for("react.memo_cache_sentinel"))A=tU.default.createElement(Text,null,"Paste your Bedrock API key."),h=tU.default.createElement(Text,{dimColor:!0},"Generate one in the AWS console under Bedrock \u2192 API keys."),e[6]=A,e[7]=h;else A=e[6],h=e[7];let g;if(e[8]!==a||e[9]!==m||e[10]!==s)g=tU.default.createElement(Box,{marginTop:1},tU.default.createElement(Pa,{value:s,onChange:i,onSubmit:m,placeholder:"bedrock-api-key-\u2026",mask:"*",columns:60,cursorOffset:a,onChangeCursorOffset:l,focus:!0,showCursor:!0})),e[8]=a,e[9]=m,e[10]=s,e[11]=g;else g=e[11];let _;if(e[12]!==c)_=c&&tU.default.createElement(Box,{marginTop:1},tU.default.createElement(nl,{error:c})),e[12]=c,e[13]=_;else _=e[13];let y;if(e[14]!==g||e[15]!==_)y=tU.default.createElement(React,{subtitle:"Bedrock API key",footerText:f},tU.default.createElement(Box,{flexDirection:"column"},A,h,g,_)),e[14]=g,e[15]=_,e[16]=y;else y=e[16];return y}
var AHa,tU;
var gHa=b(()=>{ze();Ts();readRoster();zs();v_();rs();rh();$y();CE();yBn();AHa=M(rt(),1),tU=M(Te(),1)});
export {hHa,AHa,tU,gHa};
