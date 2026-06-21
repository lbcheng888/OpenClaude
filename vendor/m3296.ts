// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {bc,Ug} from "./m2264.ts";
import {De,Rn} from "../src/session/0615_length.ts";
var nJr={};
isFullscreenWithTTY(nJr,{setCliTeammateModeOverride:()=>setCliTeammateModeOverride,hasTeammateModeSnapshot:()=>hasTeammateModeSnapshot,getTeammateModeFromSnapshot:()=>getTeammateModeFromSnapshot,getCliTeammateModeOverride:()=>getCliTeammateModeOverride,clearCliTeammateModeOverride:()=>clearCliTeammateModeOverride,captureTeammateModeSnapshot:()=>captureTeammateModeSnapshot,DEFAULT_TEAMMATE_MODE:()=>DEFAULT_TEAMMATE_MODE});
function setCliTeammateModeOverride(e){U1t=e}
function getCliTeammateModeOverride(){return U1t}
function clearCliTeammateModeOverride(e){U1t=null,Cke=e,logForDebugging(`[TeammateModeSnapshot] CLI override cleared, new mode: ${e}`)}
function hasTeammateModeSnapshot(){return Cke!==null}
function captureTeammateModeSnapshot(){if(U1t)Cke=U1t,logForDebugging(`[TeammateModeSnapshot] Captured from CLI override: ${Cke}`);else Cke=bc("teammateMode",DEFAULT_TEAMMATE_MODE).value,logForDebugging(`[TeammateModeSnapshot] Captured from config: ${Cke}`)}
function getTeammateModeFromSnapshot(){if(Cke===null)De(Error("getTeammateModeFromSnapshot called before capture - this indicates an initialization bug")),captureTeammateModeSnapshot();return Cke??DEFAULT_TEAMMATE_MODE}
var DEFAULT_TEAMMATE_MODE="in-process",Cke=null,U1t=null;
var vke=b(()=>{qe();Rn();Ug()});
export {nJr,setCliTeammateModeOverride,getCliTeammateModeOverride,clearCliTeammateModeOverride,hasTeammateModeSnapshot,captureTeammateModeSnapshot,getTeammateModeFromSnapshot,DEFAULT_TEAMMATE_MODE,Cke,U1t,vke};
