// @ts-nocheck
import {Eu} from "./m3812.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {lr,readRoster} from "./m2547.ts";
import {React,CE} from "./m3813.ts";
import {EVn,awo} from "./m4943.ts";
import {b,M} from "../runtime.ts";
import {$y} from "./m3814.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function yRl(){let e=_Rl.c(8),{goNext:t,goBack:n,updateWizardData:r,wizardData:o}=Eu(),s;if(e[0]!==t||e[1]!==r)s=(c)=>{r({selectedModel:c}),t()},e[0]=t,e[1]=r,e[2]=s;else s=e[2];let i=s,a;if(e[3]===Symbol.for("react.memo_cache_sentinel"))a=a8e.default.createElement(Tn,null,a8e.default.createElement(at,{chord:["up","down"],action:"navigate"}),a8e.default.createElement(at,{chord:"enter",action:"select"}),a8e.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"go back"})),e[3]=a;else a=e[3];let l;if(e[4]!==n||e[5]!==i||e[6]!==o.selectedModel)l=a8e.default.createElement(React,{subtitle:"Select model",footerText:a},a8e.default.createElement(EVn,{initialModel:o.selectedModel,onComplete:i,onCancel:n})),e[4]=n,e[5]=i,e[6]=o.selectedModel,e[7]=l;else l=e[7];return l}
var _Rl,a8e;
var TRl=b(()=>{readRoster();zs();rs();$y();CE();awo();_Rl=M(rt(),1),a8e=M(Te(),1)});
export {yRl,_Rl,a8e,TRl};
