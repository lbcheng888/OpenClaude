// @ts-nocheck
import {b} from "../runtime.ts";
import {lo,getSubscriptionType} from "../src/config/2036_withOAuthRefreshLock.ts";
import {Ir} from "./m584.ts";
import {q$e,rj} from "../src/telemetry/2749_q$e.ts";
import {Ne} from "./m583.ts";
import {XGt,hxo} from "../src/core/5066_call.ts";
var xTm,iOe;
var gxo=b(()=>{lo();Ir();q$e();xTm={type:"local-jsx",name:"upgrade",description:"Upgrade to Max for higher rate limits and more Opus",availability:["claude-ai"],isEnabled:()=>!rj()&&!Ne.DISABLE_UPGRADE_COMMAND&&getSubscriptionType()!=="enterprise",load:()=>Promise.resolve().then(() => (XGt(),hxo))},iOe=xTm});
export {xTm,iOe,gxo};
