// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Di,dr} from "./m231.ts";
import {execFileNoThrow,oa} from "./m684.ts";
import {qW,aU} from "../src/config/3875_aU.ts";
import {je} from "./m577.ts";
import {Lr} from "./m578.ts";
var tso={};
isFullscreenWithTTY(tso,{resetDetectionCache:()=>resetDetectionCache,listUserTmuxSessions:()=>listUserTmuxSessions,isTmuxAvailable:()=>isTmuxAvailable,isIt2CliAvailable:()=>isIt2CliAvailable,isInsideTmuxSync:()=>isInsideTmuxSync,isInsideTmux:()=>isInsideTmux,isInITerm2:()=>isInITerm2,getUserTmuxSocket:()=>getUserTmuxSocket,getLeaderPaneId:()=>getLeaderPaneId,IT2_COMMAND:()=>IT2_COMMAND});
function isInsideTmuxSync(){return!!ylt}
async function listUserTmuxSessions(){if(!ylt)return;let e=Di(ylt,",");if(!e)return;let{code:t,stdout:n}=await execFileNoThrow(qW,["-S",e,"list-sessions","-F","#{session_name}"],{useCwd:!1,timeout:2000});if(t!==0)return;return n.split(`
`).filter(Boolean)}
async function isInsideTmux(){if(KUt!==null)return KUt;return KUt=!!ylt,KUt}
function getLeaderPaneId(){return $hp||null}
function getUserTmuxSocket(){if(!ylt)return null;return Di(ylt,",")||null}
async function isTmuxAvailable(){return(await execFileNoThrow(qW,["-V"])).code===0}
function isInITerm2(){if(zUt!==null)return zUt;let e=process.env.TERM_PROGRAM,t=!!process.env.ITERM_SESSION_ID,n=je.terminal==="iTerm.app";return zUt=e==="iTerm.app"||t||n,zUt}
async function isIt2CliAvailable(){return(await execFileNoThrow(IT2_COMMAND,["session","list"])).code===0}
function resetDetectionCache(){KUt=null,zUt=null}
var ylt,$hp,KUt=null,zUt=null,IT2_COMMAND="it2";
var Tte=b(()=>{Lr();oa();dr();aU();ylt=process.env.TMUX,$hp=process.env.TMUX_PANE});
export {tso,isInsideTmuxSync,listUserTmuxSessions,isInsideTmux,getLeaderPaneId,getUserTmuxSocket,isTmuxAvailable,isInITerm2,isIt2CliAvailable,resetDetectionCache,ylt,$hp,KUt,zUt,IT2_COMMAND,Tte};
