// @ts-nocheck
import {vSs,wSs} from "./m1006.ts";
import {b,M} from "../runtime.ts";
import {I2} from "./m600.ts";
var Gsn,fromProcess=(e={})=>async({callerClientConfig:t}={})=>{e.logger?.debug("@aws-sdk/credential-provider-process - fromProcess");let n=await Gsn.parseKnownFiles(e);return vSs(Gsn.getProfileName({profile:e.profile??t?.profile}),n,e.logger)};
var RSs=b(()=>{wSs();Gsn=M(I2(),1)});
export {Gsn,fromProcess,RSs};
