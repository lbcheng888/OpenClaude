// @ts-nocheck
import {J2s,X2s} from "./m1438.ts";
import {fromNodeProviderChain,dRr} from "./m1434.ts";
import {b,M} from "../runtime.ts";
import {nk} from "./m607.ts";
import {yB} from "./m601.ts";
var Q2s,Z2s,fromTemporaryCredentials=(e)=>J2s(e,fromNodeProviderChain,async({profile:t=process.env.AWS_PROFILE})=>Z2s.loadConfig({environmentVariableSelector:(n)=>n.AWS_REGION,configFileSelector:(n)=>n.region,default:()=>{return}},{...Q2s.NODE_REGION_CONFIG_FILE_OPTIONS,profile:t})());
var e$s=b(()=>{dRr();X2s();Q2s=M(nk(),1),Z2s=M(yB(),1)});
export {Q2s,Z2s,fromTemporaryCredentials,e$s};
