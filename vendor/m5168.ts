// @ts-nocheck
import {createBaseHookInput,executeHooksOutsideREPL,yp} from "../src/tools/5171_shouldSkipHookDueToTrust.ts";
import {Ep} from "./m4028.ts";
import {Fl,bt} from "./m195.ts";
import {Ec} from "./m2449.ts";
import {f5,uE,L1} from "./m2232.ts";
import {getRegisteredHooks,getMainThreadAgentHooks,lt} from "../src/session/0131_sent.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function executeWorktreeCreateHook(e){let t={...createBaseHookInput(void 0),hook_event_name:"WorktreeCreate",name:e},n=await executeHooksOutsideREPL({hookInput:t,timeoutMs:Ep}),r=n.filter((o)=>o.succeeded).map((o)=>tym(o.output)).find((o)=>o.length>0);if(r===void 0){if(n.length===0)throw Error("WorktreeCreate hook failed: hook is configured but did not run (workspace not trusted, disableAllHooks set, or matcher mismatch)");let o=n.filter((s)=>!s.succeeded).map((s)=>`${s.command}: ${s.output.trim()||"no output"}`);if(o.length===0)throw Error("WorktreeCreate hook failed: hook succeeded but returned no worktree path (command: echo the path to stdout; http/callback: return hookSpecificOutput.worktreePath)");throw new Fl(`WorktreeCreate hook failed: ${o.join("; ")}`,"WorktreeCreate hook failed (stderr redacted)")}return{worktreePath:r}}
function tym(e){return Ec(e).split(`
`).map((t)=>t.trim()).filter(Boolean).at(-1)??""}
async function executeWorktreeRemoveHook(e){let t=f5()?.WorktreeRemove,n=getRegisteredHooks()?.WorktreeRemove,r=uE()?void 0:getMainThreadAgentHooks()?.WorktreeRemove,o=t&&t.length>0,s=n&&n.length>0,i=r&&r.length>0;if(!o&&!s&&!i)return!1;let a={...createBaseHookInput(void 0),hook_event_name:"WorktreeRemove",worktree_path:e},l=await executeHooksOutsideREPL({hookInput:a,timeoutMs:Ep}),c=!1;for(let u of l)if(u.succeeded)c=!0;else logForDebugging(`WorktreeRemove hook failed [${u.command}]: ${u.output.trim()}`,{level:"error"});return c}
var I1l=b(()=>{lt();qe();bt();yp();L1()});
export {executeWorktreeCreateHook,tym,executeWorktreeRemoveHook,I1l};
