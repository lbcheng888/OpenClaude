// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {mi,lr} from "./m233.ts";
import {execFileNoThrow,Ii} from "./m690.ts";
import {cG,wB} from "../src/config/3893_wB.ts";
import {Ne} from "./m583.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ir} from "./m584.ts";
var Yco={};
ft(Yco,{resetDetectionCache:()=>resetDetectionCache,listUserTmuxSessions:()=>listUserTmuxSessions,isTmuxAvailable:()=>isTmuxAvailable,isIt2CliAvailable:()=>isIt2CliAvailable,isInsideTmuxSync:()=>isInsideTmuxSync,isInsideTmux:()=>isInsideTmux,isInITerm2:()=>isInITerm2,getUserTmuxSocket:()=>getUserTmuxSocket,getLeaderPaneId:()=>getLeaderPaneId,getIt2Command:()=>getIt2Command,IT2_COMMAND:()=>IT2_COMMAND});
function isInsideTmuxSync(){return!!Tut}
async function listUserTmuxSessions(){if(!Tut)return;let e=mi(Tut,",");if(!e)return;let{code:t,stdout:n}=await execFileNoThrow(cG,["-S",e,"list-sessions","-F","#{session_name}"],{useCwd:!1,timeout:2000});if(t!==0)return;return n.split(`
`).filter(Boolean)}
async function isInsideTmux(){if(S9t!==null)return S9t;return S9t=!!Tut,S9t}
function getLeaderPaneId(){return Dwp||null}
function getUserTmuxSocket(){if(!Tut)return null;return mi(Tut,",")||null}
async function isTmuxAvailable(){return(await execFileNoThrow(cG,["-V"])).code===0}
function isInITerm2(){if(b9t!==null)return b9t;let e=process.env.TERM_PROGRAM,t=!!process.env.ITERM_SESSION_ID,n=Ne.terminal==="iTerm.app";return b9t=e==="iTerm.app"||t||n,b9t}
function getIt2Command(){return zco}
async function isIt2CliAvailable(){let e=Ne.SHELL||"/bin/zsh",t=await execFileNoThrow(e,["-lc",`command -v ${IT2_COMMAND}`],{useCwd:!1,timeout:2000}),n=t.code===0?t.stdout.split(`
`).map((i)=>i.trim()).filter(Boolean).at(-1)??"":"",r=async(i)=>execFileNoThrow(i,["session","list"]),o=n||IT2_COMMAND,s=await r(o);if(n&&s.code!==0&&(s.code===127||/ENOENT/i.test(s.error??"")))o=IT2_COMMAND,s=await r(o);if(s.code!==0)return logForDebugging(`[isIt2CliAvailable] '${o} session list' failed (code=${s.code}): ${s.stderr||s.error||"no stderr"}. `+(n?"it2 was found on PATH \u2014 check that the iTerm2 Python API is enabled "+"(Preferences > General > Magic > Enable Python API).":"it2 was not found on PATH (including login-shell PATH).")),!1;return zco=o,!0}
function resetDetectionCache(){S9t=null,b9t=null,zco=IT2_COMMAND}
var Tut,Dwp,S9t=null,b9t=null,IT2_COMMAND="it2",zco;
var hte=b(()=>{qe();Ir();Ii();lr();wB();Tut=process.env.TMUX,Dwp=process.env.TMUX_PANE;zco=IT2_COMMAND});
export {Yco,isInsideTmuxSync,listUserTmuxSessions,isInsideTmux,getLeaderPaneId,getUserTmuxSocket,isTmuxAvailable,isInITerm2,getIt2Command,isIt2CliAvailable,resetDetectionCache,Tut,Dwp,S9t,b9t,IT2_COMMAND,zco,hte};
