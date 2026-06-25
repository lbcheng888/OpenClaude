// @ts-nocheck
import {getAllPolicyTierSettings,br} from "../src/config/0745_updateSettingsForSource.ts";
import {T5,tI} from "./m465.ts";
import {b} from "../runtime.ts";
function bDt(){return getAllPolicyTierSettings().map((e)=>e.sandbox?.bwrapPath).find((e)=>e!=null)}
function Dbi(){return getAllPolicyTierSettings().map((e)=>e.sandbox?.socatPath).find((e)=>e!=null)}
function Pbi(){let e=bDt();if(e)return T5(e);return T5("bwrap")}
var B$r=b(()=>{br();tI()});
export {bDt,Dbi,Pbi,B$r};
