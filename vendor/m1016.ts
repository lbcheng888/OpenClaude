// @ts-nocheck
import {ISr,zSs} from "./m1015.ts";
import {b,M} from "../runtime.ts";
import {I2} from "./m600.ts";
var Ksn,fromIni=(e={})=>async({callerClientConfig:t}={})=>{let n={...e,parentClientConfig:{...t,...e.parentClientConfig}};n.logger?.debug("@aws-sdk/credential-provider-ini - fromIni");let r=await Ksn.parseKnownFiles(n);return ISr(Ksn.getProfileName({profile:e.profile??t?.profile}),r,n)};
var YSs=b(()=>{zSs();Ksn=M(I2(),1)});
export {Ksn,fromIni,YSs};
