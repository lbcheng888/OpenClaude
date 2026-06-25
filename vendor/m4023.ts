// @ts-nocheck
import {Ne} from "./m583.ts";
import {iI,qoe} from "./m1290.ts";
import {isOverageProvisioningAllowed,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {b} from "../runtime.ts";
import {lt,getIsNonInteractiveSession} from "../src/session/0132_sent.ts";
import {Ir} from "./m584.ts";
import {z3t,Ipo} from "./m4020.ts";
import {Dpo,xpo} from "./m4021.ts";
import {Opo,Ppo} from "./m4022.ts";
function vdt(){if(Ne.DISABLE_EXTRA_USAGE_COMMAND)return!1;if(iI()!==null)return!0;return isOverageProvisioningAllowed()}
var xte,Lpo,Mpo,Npo;
var wdt=b(()=>{lt();qoe();lo();Ir();xte={type:"local-jsx",name:"usage-credits",description:"Configure usage credits to keep working when you hit a limit",isEnabled:()=>vdt()&&!getIsNonInteractiveSession(),requires:{ink:!0},load:()=>Promise.resolve().then(() => (z3t(),Ipo))},Lpo={type:"local",name:"usage-credits",supportsNonInteractive:!0,description:"Configure usage credits to keep working when you hit a limit",isEnabled:()=>vdt()&&getIsNonInteractiveSession(),get isHidden(){return!getIsNonInteractiveSession()},load:()=>Promise.resolve().then(() => (Dpo(),xpo))},Mpo={type:"local-jsx",name:"extra-usage",description:"Renamed to /usage-credits",isHidden:!0,isEnabled:()=>vdt()&&!getIsNonInteractiveSession(),requires:{ink:!0},load:()=>Promise.resolve().then(() => (Opo(),Ppo))},Npo={type:"local",name:"extra-usage",supportsNonInteractive:!0,description:"Renamed to /usage-credits",isHidden:!0,isEnabled:()=>vdt()&&getIsNonInteractiveSession(),load:()=>Promise.resolve().then(() => (Opo(),Ppo)).then((e)=>({call:e.callNonInteractive}))}});
export {vdt,xte,Lpo,Mpo,Npo,wdt};
