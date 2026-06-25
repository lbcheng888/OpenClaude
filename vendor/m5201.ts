// @ts-nocheck
import {createBaseHookInput,executeHooksOutsideREPL,Wd} from "../src/tools/5204_shouldSkipHookDueToTrust.ts";
import {Kd} from "./m4092.ts";
import {Ta,Ct} from "./m197.ts";
import {cc} from "./m2459.ts";
import {Y3,eS,zM} from "./m2240.ts";
import {getRegisteredHooks,getMainThreadAgentHooks,lt} from "../src/session/0132_sent.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function executeWorktreeCreateHook(e){let t={...createBaseHookInput(void 0),hook_event_name:"WorktreeCreate",name:e},n=await executeHooksOutsideREPL({hookInput:t,timeoutMs:Kd}),r=n.filter((o)=>o.succeeded).map((o)=>Akm(o.output)).find((o)=>o.length>0);if(r===void 0){if(n.length===0)throw Error("WorktreeCreate hook failed: hook is configured but did not run (workspace not trusted, disableAllHooks set, or matcher mismatch)");let o=n.filter((s)=>!s.succeeded).map((s)=>`${s.command}: ${s.output.trim()||"no output"}`);if(o.length===0)throw Error("WorktreeCreate hook failed: hook succeeded but returned no worktree path (command: echo the path to stdout; http/callback: return hookSpecificOutput.worktreePath)");throw new Ta(`WorktreeCreate hook failed: ${o.join("; ")}`,"WorktreeCreate hook failed (stderr redacted)")}return{worktreePath:r}}
function Akm(e){return cc(e).split(`
`).map((t)=>t.trim()).filter(Boolean).at(-1)??""}
async function executeWorktreeRemoveHook(e){let t=Y3()?.WorktreeRemove,n=getRegisteredHooks()?.WorktreeRemove,r=eS()?void 0:getMainThreadAgentHooks()?.WorktreeRemove,o=t&&t.length>0,s=n&&n.length>0,i=r&&r.length>0;if(!o&&!s&&!i)return!1;let a={...createBaseHookInput(void 0),hook_event_name:"WorktreeRemove",worktree_path:e},l=await executeHooksOutsideREPL({hookInput:a,timeoutMs:Kd}),c=!1;for(let u of l)if(u.succeeded)c=!0;else logForDebugging(`WorktreeRemove hook failed [${u.command}]: ${u.output.trim()}`,{level:"error"});return c}
var h4l=b(()=>{lt();qe();Ct();Wd();zM()});
export {executeWorktreeCreateHook,Akm,executeWorktreeRemoveHook,h4l};
