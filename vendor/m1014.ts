// @ts-nocheck
import {Hln,evr} from "./m1013.ts";
import {b,x} from "../runtime.ts";
import {b0} from "./m756.ts";
var Ews,Cws=(e)=>Boolean(e)&&typeof e==="object"&&typeof e.credential_process==="string",Aws=async(e,t)=>Promise.resolve().then(() => (Hln(),evr)).then(({fromProcess:n})=>n({...e,profile:t})().then((r)=>Ews.setCredentialFeature(r,"CREDENTIALS_PROFILE_PROCESS","v")));
var Rws=b(()=>{Ews=x(b0(),1)});
export {Ews,Cws,Aws,Rws};
