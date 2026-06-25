// @ts-nocheck
import {cn,Ct} from "./m197.ts";
import {sleep} from "../src/telemetry/1488_withTimeout.ts";
import {b} from "../runtime.ts";
async function rht(e,t={}){try{process.kill(e,"SIGTERM")}catch(r){if(cn(r)==="EPERM")return"eperm";return"exited"}let n=Date.now()+(t.gracefulMs??2000);while(Date.now()<n){try{process.kill(e,0)}catch{return"exited"}await sleep(50)}return"timed-out"}
var URo=b(()=>{Ct()});
export {rht,URo};
