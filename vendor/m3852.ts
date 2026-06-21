// @ts-nocheck
import {Eu} from "./m3812.ts";
import {Or,Ts} from "./m2542.ts";
import {BHe,LBn} from "./m3844.ts";
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
function VIa(){let e=jIa.c(17),{goBack:t,goToStep:n,updateWizardData:r,wizardData:o}=Eu(),[s,i]=oU.useState(o.keyFile??""),[a,l]=oU.useState(s.length),[c,u]=oU.useState(null),d;if(e[0]===Symbol.for("react.memo_cache_sentinel"))d={context:"Settings"},e[0]=d;else d=e[0];Or("confirm:no",t,d);let p;if(e[1]!==n||e[2]!==r||e[3]!==s)p=()=>{let T=s.trim();if(!T){u("Path is required");return}u(null);let S=T==="~"||T.startsWith("~/")?GIa.join(WIa.homedir(),T.slice(1)):T;r({keyFile:S}),n(BHe.PROJECT)},e[1]=n,e[2]=r,e[3]=s,e[4]=p;else p=e[4];let m=p,f;if(e[5]===Symbol.for("react.memo_cache_sentinel"))f=oU.default.createElement(Tn,null,oU.default.createElement(at,{chord:"enter",action:"continue"}),oU.default.createElement(lr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"})),e[5]=f;else f=e[5];let A,h;if(e[6]===Symbol.for("react.memo_cache_sentinel"))A=oU.default.createElement(Text,null,"Path to the service account JSON key file."),h=oU.default.createElement(Text,{dimColor:!0},"Download one from the GCP console under IAM \u2192 Service Accounts \u2192 Keys \u2192 Add key."),e[6]=A,e[7]=h;else A=e[6],h=e[7];let g;if(e[8]!==a||e[9]!==m||e[10]!==s)g=oU.default.createElement(Box,{marginTop:1},oU.default.createElement(Pa,{value:s,onChange:i,onSubmit:m,placeholder:"~/keys/my-project-vertex.json",columns:60,cursorOffset:a,onChangeCursorOffset:l,focus:!0,showCursor:!0})),e[8]=a,e[9]=m,e[10]=s,e[11]=g;else g=e[11];let _;if(e[12]!==c)_=c&&oU.default.createElement(Box,{marginTop:1},oU.default.createElement(nl,{error:c})),e[12]=c,e[13]=_;else _=e[13];let y;if(e[14]!==g||e[15]!==_)y=oU.default.createElement(React,{subtitle:"Service account key",footerText:f},oU.default.createElement(Box,{flexDirection:"column"},A,h,g,_)),e[14]=g,e[15]=_,e[16]=y;else y=e[16];return y}
var jIa,WIa,GIa,oU;
var KIa=b(()=>{ze();Ts();readRoster();zs();v_();rs();rh();$y();CE();LBn();jIa=M(rt(),1),WIa=require("os"),GIa=require("path"),oU=M(Te(),1)});
export {VIa,jIa,WIa,GIa,oU,KIa};
