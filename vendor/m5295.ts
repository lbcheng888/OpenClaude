// @ts-nocheck
import {getInitialSettings,br} from "../src/config/0745_updateSettingsForSource.ts";
import {Yc,m1,Zm} from "../src/config/2709_Zm.ts";
import {b} from "../runtime.ts";
function wZn(){let e=getInitialSettings().defaultShell;if(e==="bash"&&!Yc())return"powershell";if(e==="powershell"&&!m1())return"bash";return e??(Yc()?"bash":"powershell")}
var lNo=b(()=>{br();Zm()});
export {wZn,lNo};
