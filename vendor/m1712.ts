// @ts-nocheck
import {b} from "../runtime.ts";
import {ise,fpn} from "./m1624.ts";
import {zHr} from "./m1688.ts";
import {Zwt} from "./m1687.ts";
function yVs(e){if(e==="adfs")return"oauth2/token";else return"oauth2/v2.0/token"}
var isKeybindingCustomizationEnabled;
var S1=b(()=>{ise();zHr();isKeybindingCustomizationEnabled=Zwt({namespace:"Microsoft.AAD",packageName:"@azure/identity",packageVersion:fpn})});
export {yVs,isKeybindingCustomizationEnabled,S1};
