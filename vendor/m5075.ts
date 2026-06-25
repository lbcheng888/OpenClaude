// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {i3,Ud} from "./m615.ts";
import {getEffortHelpText,showCurrentEffort,executeEffort,Axo} from "../src/tui/5075_showCurrentEffort.ts";
import {parseUserSpecifiedModel,getDefaultMainLoopModelSetting,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {Kh,xl} from "./m4427.ts";
import {j3,Cp} from "../src/config/2223_level.ts";
var SNl={};
ft(SNl,{call:()=>mSm});
async function mSm(e,t){let n=e.trim();if(i3.includes(n))return{type:"text",value:getEffortHelpText()};if(n==="current"||n==="status"){let o=t.getAppState(),s=parseUserSpecifiedModel(o.mainLoopModelForSession??o.mainLoopModel??getDefaultMainLoopModelSetting()),{message:i}=showCurrentEffort(Kh(t),s,o.ultracode);return{type:"text",value:i}}if(!n)return{type:"text",value:`Usage: /effort <low|medium|high|xhigh|max${j3()?"|ultracode":""}|auto>`};let r=executeEffort(n);if(r.effortUpdate){let o=r.effortUpdate.value,s=r.effortUpdate.ultracode??!1;t.setAppState((i)=>i.effortValue===o&&(i.ultracode??!1)===s?i:{...i,effortValue:o,ultracode:s})}return{type:"text",value:r.message}}
var bNl=b(()=>{Ud();xl();Cp();Ro();Axo()});
export {SNl,mSm,bNl};
