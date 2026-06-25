// @ts-nocheck
import {ivr,qws} from "./m1020.ts";
import {b,x} from "../runtime.ts";
import {ZU} from "./m606.ts";
var Iln,fromIni=(e={})=>async({callerClientConfig:t}={})=>{let n={...e,parentClientConfig:{...t,...e.parentClientConfig}};n.logger?.debug("@aws-sdk/credential-provider-ini - fromIni");let r=await Iln.parseKnownFiles(n);return ivr(Iln.getProfileName({profile:e.profile??t?.profile}),r,n)};
var Wws=b(()=>{qws();Iln=x(ZU(),1)});
export {Iln,fromIni,Wws};
