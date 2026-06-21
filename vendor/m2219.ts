// @ts-nocheck
import {getAllPolicyTierSettings,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {r8,XI} from "./m459.ts";
import {b} from "../runtime.ts";
function VHt(){return getAllPolicyTierSettings().map((e)=>e.sandbox?.bwrapPath).find((e)=>e!=null)}
function DAi(){return getAllPolicyTierSettings().map((e)=>e.sandbox?.socatPath).find((e)=>e!=null)}
function PAi(){let e=VHt();if(e)return r8(e);return r8("bwrap")}
var cBr=b(()=>{yr();XI()});
export {VHt,DAi,PAi,cBr};
