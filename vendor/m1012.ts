// @ts-nocheck
import {Tws,Sws} from "./m1011.ts";
import {b,x} from "../runtime.ts";
import {ZU} from "./m606.ts";
var kln,fromProcess=(e={})=>async({callerClientConfig:t}={})=>{e.logger?.debug("@aws-sdk/credential-provider-process - fromProcess");let n=await kln.parseKnownFiles(e);return Tws(kln.getProfileName({profile:e.profile??t?.profile}),n,e.logger)};
var bws=b(()=>{Sws();kln=x(ZU(),1)});
export {kln,fromProcess,bws};
