// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {lc,mg} from "./m2209.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
var Beo={};
ft(Beo,{setCliTeammateModeOverride:()=>setCliTeammateModeOverride,hasTeammateModeSnapshot:()=>hasTeammateModeSnapshot,getTeammateModeFromSnapshot:()=>getTeammateModeFromSnapshot,getCliTeammateModeOverride:()=>getCliTeammateModeOverride,clearCliTeammateModeOverride:()=>clearCliTeammateModeOverride,captureTeammateModeSnapshot:()=>captureTeammateModeSnapshot,DEFAULT_TEAMMATE_MODE:()=>DEFAULT_TEAMMATE_MODE});
function setCliTeammateModeOverride(e){_Bt=e}
function getCliTeammateModeOverride(){return _Bt}
function clearCliTeammateModeOverride(e){_Bt=null,uIe=e,logForDebugging(`[TeammateModeSnapshot] CLI override cleared, new mode: ${e}`)}
function hasTeammateModeSnapshot(){return uIe!==null}
function captureTeammateModeSnapshot(){if(_Bt)uIe=_Bt,logForDebugging(`[TeammateModeSnapshot] Captured from CLI override: ${uIe}`);else uIe=lc("teammateMode",DEFAULT_TEAMMATE_MODE).value,logForDebugging(`[TeammateModeSnapshot] Captured from config: ${uIe}`)}
function getTeammateModeFromSnapshot(){if(uIe===null)Ie(Error("getTeammateModeFromSnapshot called before capture - this indicates an initialization bug")),captureTeammateModeSnapshot();return uIe??DEFAULT_TEAMMATE_MODE}
var DEFAULT_TEAMMATE_MODE="in-process",uIe=null,_Bt=null;
var pIe=b(()=>{qe();vn();mg()});
export {Beo,setCliTeammateModeOverride,getCliTeammateModeOverride,clearCliTeammateModeOverride,hasTeammateModeSnapshot,captureTeammateModeSnapshot,getTeammateModeFromSnapshot,DEFAULT_TEAMMATE_MODE,uIe,_Bt,pIe};
