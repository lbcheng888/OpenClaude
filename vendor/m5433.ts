// @ts-nocheck
import {mt,configProtoStore} from "./m2458.ts";
import {zW,aqe} from "./m3972.ts";
import {Text} from "./m2423.ts";
import {at,rs} from "./m2546.ts";
import {Box} from "./m2422.ts";
import {bP,Vhe} from "./m3282.ts";
import {O0e,tqt} from "./m4420.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function rGl(){let e=nGl.c(14),t=mt(lOm);if(!t)return null;let n;if(e[0]!==t.identity.color)n=zW(t.identity.color),e[0]=t.identity.color,e[1]=n;else n=e[1];let r=n,o;if(e[2]===Symbol.for("react.memo_cache_sentinel"))o=QN.createElement(Text,null,"Viewing "),e[2]=o;else o=e[2];let s;if(e[3]!==r||e[4]!==t.identity.agentName)s=QN.createElement(Text,{color:r,bold:!0},"@",t.identity.agentName),e[3]=r,e[4]=t.identity.agentName,e[5]=s;else s=e[5];let i;if(e[6]===Symbol.for("react.memo_cache_sentinel"))i=QN.createElement(Text,{dimColor:!0}," \xB7 ",QN.createElement(at,{chord:"escape",action:"return",format:{keyCase:"lower"}})),e[6]=i;else i=e[6];let a;if(e[7]!==s)a=QN.createElement(Box,null,o,s,i),e[7]=s,e[8]=a;else a=e[8];let l;if(e[9]!==t.prompt)l=QN.createElement(Text,{dimColor:!0},t.prompt),e[9]=t.prompt,e[10]=l;else l=e[10];let c;if(e[11]!==a||e[12]!==l)c=QN.createElement(bP,null,QN.createElement(Box,{flexDirection:"column",marginBottom:1},a,l)),e[11]=a,e[12]=l,e[13]=c;else c=e[13];return c}
function lOm(e){return O0e(e)}
var nGl,QN;
var oGl=b(()=>{ze();configProtoStore();tqt();aqe();rs();Vhe();nGl=M(rt(),1),QN=M(Te(),1)});
export {rGl,lOm,nGl,QN,oGl};
