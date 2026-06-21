// @ts-nocheck
import {getReplConfigArgv,lt} from "../src/session/0131_sent.ts";
import {ryn,Om} from "../src/config/2215_level.ts";
import {b} from "../runtime.ts";
function uVn(e,t){let n=Array.from(e.additionalWorkingDirectories.values()).filter((a)=>a.source==="cliArg"||a.source==="session").map((a)=>a.path),r=[],o=!1;for(let a of getReplConfigArgv())if(o)o=!1;else if(a==="--add-dir")o=!0;else r.push(a);let s=typeof t==="string"&&ryn(),i=e.isBypassPermissionsModeAvailable&&!r.includes("--allow-dangerously-skip-permissions");return[...r,...i?["--allow-dangerously-skip-permissions"]:[],...n.flatMap((a)=>["--add-dir",a]),...s?["--effort",t]:[],"--permission-mode",e.mode]}
var Ivo=b(()=>{lt();Om()});
export {uVn,Ivo};
