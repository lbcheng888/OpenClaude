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
function gIa(){let e=hIa.c(17),{goBack:t,goNext:n,updateWizardData:r,wizardData:o}=Eu(),[s,i]=nU.useState(o.region??"us-east-1"),[a,l]=nU.useState(s.length),[c,u]=nU.useState(null),d;if(e[0]===Symbol.for("react.memo_cache_sentinel"))d={context:"Settings"},e[0]=d;else d=e[0];Or("confirm:no",t,d);let p;if(e[1]!==n||e[2]!==r||e[3]!==s)p=()=>{let T=s.trim();if(!T){u("Region is required");return}u(null),r({region:T}),n()},e[1]=n,e[2]=r,e[3]=s,e[4]=p;else p=e[4];let m=p,f;if(e[5]===Symbol.for("react.memo_cache_sentinel"))f=nU.default.createElement(Tn,null,nU.default.createElement(at,{chord:"enter",action:"continue"}),nU.default.createElement(lr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"})),e[5]=f;else f=e[5];let A,h;if(e[6]===Symbol.for("react.memo_cache_sentinel"))A=nU.default.createElement(Text,null,"Where your Bedrock models are enabled."),h=nU.default.createElement(Text,{dimColor:!0},"Claude Code reads this from AWS_REGION, not ~/.aws/config \u2014 set it explicitly even if your profile has a region."),e[6]=A,e[7]=h;else A=e[6],h=e[7];let g;if(e[8]!==a||e[9]!==m||e[10]!==s)g=nU.default.createElement(Box,{marginTop:1},nU.default.createElement(Pa,{value:s,onChange:i,onSubmit:m,placeholder:"us-east-1",columns:40,cursorOffset:a,onChangeCursorOffset:l,focus:!0,showCursor:!0})),e[8]=a,e[9]=m,e[10]=s,e[11]=g;else g=e[11];let _;if(e[12]!==c)_=c&&nU.default.createElement(Box,{marginTop:1},nU.default.createElement(nl,{error:c})),e[12]=c,e[13]=_;else _=e[13];let y;if(e[14]!==g||e[15]!==_)y=nU.default.createElement(React,{subtitle:"AWS region",footerText:f},nU.default.createElement(Box,{flexDirection:"column"},A,h,g,_)),e[14]=g,e[15]=_,e[16]=y;else y=e[16];return y}
var hIa,nU;
var _Ia=b(()=>{ze();Ts();readRoster();zs();v_();rs();rh();$y();CE();hIa=M(rt(),1),nU=M(Te(),1)});
export {gIa,hIa,nU,_Ia};
