// @ts-nocheck
import {Eu} from "./m3812.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {lr,readRoster} from "./m2547.ts";
import {React,CE} from "./m3813.ts";
import {Box} from "./m2422.ts";
import {pr,Yl} from "./m2562.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {$y} from "./m3814.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function hRl(){let e=ARl.c(11),{goNext:t,goBack:n,updateWizardData:r,goToStep:o}=Eu(),s;if(e[0]===Symbol.for("react.memo_cache_sentinel"))s=[{label:"Generate with Claude (recommended)",value:"generate"},{label:"Manual configuration",value:"manual"}],e[0]=s;else s=e[0];let i=s,a;if(e[1]===Symbol.for("react.memo_cache_sentinel"))a=rPe.default.createElement(Tn,null,rPe.default.createElement(at,{chord:["up","down"],action:"navigate"}),rPe.default.createElement(at,{chord:"enter",action:"select"}),rPe.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"go back"})),e[1]=a;else a=e[1];let l;if(e[2]!==t||e[3]!==o||e[4]!==r)l=(d)=>{let p=d;if(r({method:p,wasGenerated:p==="generate"}),p==="generate")t();else o(3)},e[2]=t,e[3]=o,e[4]=r,e[5]=l;else l=e[5];let c;if(e[6]!==n)c=()=>n(),e[6]=n,e[7]=c;else c=e[7];let u;if(e[8]!==l||e[9]!==c)u=rPe.default.createElement(React,{subtitle:"Creation method",footerText:a},rPe.default.createElement(Box,null,rPe.default.createElement(pr,{key:"method-select",options:i,onChange:l,onCancel:c}))),e[8]=l,e[9]=c,e[10]=u;else u=e[10];return u}
var ARl,rPe;
var gRl=b(()=>{ze();readRoster();Yl();zs();rs();$y();CE();ARl=M(rt(),1),rPe=M(Te(),1)});
export {hRl,ARl,rPe,gRl};
