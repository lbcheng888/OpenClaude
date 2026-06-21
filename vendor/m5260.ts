// @ts-nocheck
import {getInitialSettings,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {Su,tN,oA} from "../src/config/2697_oA.ts";
import {b} from "../runtime.ts";
function CYn(){let e=getInitialSettings().defaultShell;if(e==="bash"&&!Su())return"powershell";if(e==="powershell"&&!tN())return"bash";return e??(Su()?"bash":"powershell")}
var MDo=b(()=>{yr();oA()});
export {CYn,MDo};
