// @ts-nocheck
import {isKeybindingCustomizationEnabled} from "./m5.ts";
import {b} from "../runtime.ts";
function ep(e){return isKeybindingCustomizationEnabled(Ebi.createHash("sha256").update(e).digest("hex").slice(0,12))}
var Ebi;
var Cbi=b(()=>{Ebi=require("crypto")});
export {ep,Ebi,Cbi};
