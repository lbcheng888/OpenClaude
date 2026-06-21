// @ts-nocheck
import {Eu} from "./m3812.ts";
import {Or,Ts} from "./m2542.ts";
import {iM,q9} from "./m4604.ts";
import {Tn,zs} from "./m2554.ts";
import {Text} from "./m2423.ts";
import {at,rs} from "./m2546.ts";
import {lr,readRoster} from "./m2547.ts";
import {Box} from "./m2422.ts";
import {Pa,rh} from "./m2539.ts";
import {nl,v_} from "./m2573.ts";
import {React,CE} from "./m3813.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {$y} from "./m3814.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function nRl(){let e=tRl.c(18),{goNext:t,goBack:n,updateWizardData:r,wizardData:o}=Eu(),[s,i]=KN.useState(o.whenToUse||""),[a,l]=KN.useState(s.length),[c,u]=KN.useState(null),d;if(e[0]===Symbol.for("react.memo_cache_sentinel"))d={context:"Settings"},e[0]=d;else d=e[0];Or("confirm:no",n,d);let p;if(e[1]!==s)p=async()=>{let v=await iM(s);if(v.content!==null)i(v.content),l(v.content.length)},e[1]=s,e[2]=p;else p=e[2];let m=p,f;if(e[3]===Symbol.for("react.memo_cache_sentinel"))f={context:"Chat"},e[3]=f;else f=e[3];Or("chat:externalEditor",m,f);let A;if(e[4]!==t||e[5]!==r)A=(v)=>{let R=v.trim();if(!R){u("Description is required");return}u(null),r({whenToUse:R}),t()},e[4]=t,e[5]=r,e[6]=A;else A=e[6];let h=A,g;if(e[7]===Symbol.for("react.memo_cache_sentinel"))g=KN.default.createElement(Tn,null,KN.default.createElement(Text,null,"Type to enter text"),KN.default.createElement(at,{chord:"enter",action:"continue"}),KN.default.createElement(lr,{action:"chat:externalEditor",context:"Chat",fallback:"ctrl+g",description:"open in editor"}),KN.default.createElement(lr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"})),e[7]=g;else g=e[7];let _;if(e[8]===Symbol.for("react.memo_cache_sentinel"))_=KN.default.createElement(Text,null,"When should Claude use this agent?"),e[8]=_;else _=e[8];let y;if(e[9]!==a||e[10]!==h||e[11]!==s)y=KN.default.createElement(Box,{marginTop:1},KN.default.createElement(Pa,{value:s,onChange:i,onSubmit:h,placeholder:"e.g., use this agent after you're done writing code...",columns:80,cursorOffset:a,onChangeCursorOffset:l,focus:!0,showCursor:!0})),e[9]=a,e[10]=h,e[11]=s,e[12]=y;else y=e[12];let T;if(e[13]!==c)T=c&&KN.default.createElement(Box,{marginTop:1},KN.default.createElement(nl,{error:c})),e[13]=c,e[14]=T;else T=e[14];let S;if(e[15]!==y||e[16]!==T)S=KN.default.createElement(React,{subtitle:"Description (tell Claude when to use this agent)",footerText:g},KN.default.createElement(Box,{flexDirection:"column"},_,y,T)),e[15]=y,e[16]=T,e[17]=S;else S=e[17];return S}
var tRl,KN;
var rRl=b(()=>{ze();Ts();q9();readRoster();zs();v_();rs();rh();$y();CE();tRl=M(rt(),1),KN=M(Te(),1)});
export {nRl,tRl,KN,rRl};
