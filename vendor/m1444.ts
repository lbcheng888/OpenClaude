// @ts-nocheck
import {V6s,K6s} from "./m1443.ts";
import {fromNodeProviderChain,U0r} from "./m1439.ts";
import {b,x} from "../runtime.ts";
import {yk} from "./m613.ts";
import {$N} from "./m607.ts";
var z6s,j6s,fromTemporaryCredentials=(e)=>V6s(e,fromNodeProviderChain,async({profile:t=process.env.AWS_PROFILE})=>j6s.loadConfig({environmentVariableSelector:(n)=>n.AWS_REGION,configFileSelector:(n)=>n.region,default:()=>{return}},{...z6s.NODE_REGION_CONFIG_FILE_OPTIONS,profile:t})());
var Y6s=b(()=>{U0r();K6s();z6s=x(yk(),1),j6s=x($N(),1)});
export {z6s,j6s,fromTemporaryCredentials,Y6s};
