// @ts-nocheck
import {m1,OO,k8} from "./m1291.ts";
import {wR,vB} from "./m682.ts";
import {b} from "../runtime.ts";
async function $Os(){{let e=m1(),t=await wR(`security delete-generic-password -a ${OO()} -s "${e}"`,{reject:!1});if(t.exitCode!==0&&!t.stderr.includes(PIu))throw Error(t.stderr?`Failed to delete keychain entry: ${t.stderr}`:"Failed to delete keychain entry")}}
function MB(e){return e.slice(-20)}
var PIu="could not be found in the keychain";
var eYe=b(()=>{k8();vB()});
export {$Os,MB,PIu,eYe};
