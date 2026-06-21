// @ts-nocheck
import {Eu} from "./m3812.ts";
import {Or,Ts} from "./m2542.ts";
import {uwo,dwo} from "../src/agent/4950_isValid.ts";
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
function xRl(e){let t=RRl.c(15),{goNext:n,goBack:r,updateWizardData:o,wizardData:s}=Eu(),[i,a]=BU.useState(s.agentType||""),[l,c]=BU.useState(null),[u,d]=BU.useState(i.length),p;if(t[0]===Symbol.for("react.memo_cache_sentinel"))p={context:"Settings"},t[0]=p;else p=t[0];Or("confirm:no",r,p);let m;if(t[1]!==n||t[2]!==o)m=(T)=>{let S=T.trim(),v=uwo(S);if(v){c(v);return}c(null),o({agentType:S}),n()},t[1]=n,t[2]=o,t[3]=m;else m=t[3];let f=m,A;if(t[4]===Symbol.for("react.memo_cache_sentinel"))A=BU.default.createElement(Tn,null,BU.default.createElement(Text,null,"Type to enter text"),BU.default.createElement(at,{chord:"enter",action:"continue"}),BU.default.createElement(lr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"})),t[4]=A;else A=t[4];let h;if(t[5]===Symbol.for("react.memo_cache_sentinel"))h=BU.default.createElement(Text,null,"Enter a unique identifier for your agent:"),t[5]=h;else h=t[5];let g;if(t[6]!==i||t[7]!==u||t[8]!==f)g=BU.default.createElement(Box,{marginTop:1},BU.default.createElement(Pa,{value:i,onChange:a,onSubmit:f,placeholder:"e.g., test-runner, tech-lead, etc",columns:60,cursorOffset:u,onChangeCursorOffset:d,focus:!0,showCursor:!0})),t[6]=i,t[7]=u,t[8]=f,t[9]=g;else g=t[9];let _;if(t[10]!==l)_=l&&BU.default.createElement(Box,{marginTop:1},BU.default.createElement(nl,{error:l})),t[10]=l,t[11]=_;else _=t[11];let y;if(t[12]!==g||t[13]!==_)y=BU.default.createElement(React,{subtitle:"Agent type (identifier)",footerText:A},BU.default.createElement(Box,{flexDirection:"column"},h,g,_)),t[12]=g,t[13]=_,t[14]=y;else y=t[14];return y}
var RRl,BU;
var kRl=b(()=>{ze();Ts();readRoster();zs();v_();rs();rh();$y();CE();dwo();RRl=M(rt(),1),BU=M(Te(),1)});
export {xRl,RRl,BU,kRl};
