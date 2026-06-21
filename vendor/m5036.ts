// @ts-nocheck
import {b} from "../runtime.ts";
import {Ao,getSubscriptionType} from "../src/config/2031_withOAuthRefreshLock.ts";
import {Lr} from "./m578.ts";
import {M2e,kz} from "../src/telemetry/2737_M2e.ts";
import {je} from "./m577.ts";
import {k8t,iRo} from "../src/core/5036_call.ts";
var yum,iPe;
var aRo=b(()=>{Ao();Lr();M2e();yum={type:"local-jsx",name:"upgrade",description:"Upgrade to Max for higher rate limits and more Opus",availability:["claude-ai"],isEnabled:()=>!kz()&&!je.DISABLE_UPGRADE_COMMAND&&getSubscriptionType()!=="enterprise",load:()=>Promise.resolve().then(() => (k8t(),iRo))},iPe=yum});
export {yum,iPe,aRo};
