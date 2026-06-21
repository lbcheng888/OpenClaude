// @ts-nocheck
import {dn,bt} from "./m195.ts";
import {sleep} from "../src/telemetry/1483_withTimeout.ts";
import {b} from "../runtime.ts";
async function Xpt(e,t={}){try{process.kill(e,"SIGTERM")}catch(r){if(dn(r)==="EPERM")return"eperm";return"exited"}let n=Date.now()+(t.gracefulMs??2000);while(Date.now()<n){try{process.kill(e,0)}catch{return"exited"}await sleep(50)}return"timed-out"}
var RTo=b(()=>{bt()});
export {Xpt,RTo};
