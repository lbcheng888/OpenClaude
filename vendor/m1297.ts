// @ts-nocheck
import {wM,ZP,G5} from "./m1296.ts";
import {Nv,zN} from "./m688.ts";
import {b} from "../runtime.ts";
async function MBs(){{let e=wM(),t=await Nv(`security delete-generic-password -a ${ZP()} -s "${e}"`,{reject:!1});if(t.exitCode!==0&&!t.stderr.includes(JBu))throw Error(t.stderr?`Failed to delete keychain entry: ${t.stderr}`:"Failed to delete keychain entry")}}
function sF(e){return e.slice(-20)}
var JBu="could not be found in the keychain";
var XJe=b(()=>{G5();zN()});
export {MBs,sF,JBu,XJe};
