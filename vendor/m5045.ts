// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {logMCPError,initKp} from "./m609.ts";
import {getEffortHelpText,showCurrentEffort,executeEffort,hRo} from "../src/tui/5045_showCurrentEffort.ts";
import {parseUserSpecifiedModel,getDefaultMainLoopModelSetting,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {Fh,Ql} from "./m4405.ts";
import {x4,Om} from "../src/config/2215_level.ts";
var YHl={};
isFullscreenWithTTY(YHl,{call:()=>tdm});
async function tdm(e,t){let n=e.trim();if(logMCPError.includes(n))return{type:"text",value:getEffortHelpText()};if(n==="current"||n==="status"){let o=t.getAppState(),s=parseUserSpecifiedModel(o.mainLoopModelForSession??o.mainLoopModel??getDefaultMainLoopModelSetting()),{message:i}=showCurrentEffort(Fh(t),s,o.ultracode);return{type:"text",value:i}}if(!n)return{type:"text",value:`Usage: /effort <low|medium|high|xhigh|max${x4()?"|ultracode":""}|auto>`};let r=executeEffort(n);if(r.effortUpdate){let o=r.effortUpdate.value,s=r.effortUpdate.ultracode??!1;t.setAppState((i)=>i.effortValue===o&&(i.ultracode??!1)===s?i:{...i,effortValue:o,ultracode:s})}return{type:"text",value:r.message}}
var JHl=b(()=>{initKp();Ql();Om();Mo();hRo()});
export {YHl,tdm,JHl};
