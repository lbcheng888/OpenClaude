// @ts-nocheck
import {Vsn,vSr} from "./m1008.ts";
import {b,M} from "../runtime.ts";
import {r0} from "./m751.ts";
var xSs,kSs=(e)=>Boolean(e)&&typeof e==="object"&&typeof e.credential_process==="string",HSs=async(e,t)=>Promise.resolve().then(() => (Vsn(),vSr)).then(({fromProcess:n})=>n({...e,profile:t})().then((r)=>xSs.setCredentialFeature(r,"CREDENTIALS_PROFILE_PROCESS","v")));
var ISs=b(()=>{xSs=M(r0(),1)});
export {xSs,kSs,HSs,ISs};
