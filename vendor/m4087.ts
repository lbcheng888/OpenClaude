// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
var xce={};
isFullscreenWithTTY(xce,{setAutoModeFromFallback:()=>setAutoModeFromFallback,setAutoModeFlagCli:()=>setAutoModeFlagCli,setAutoModeCircuitBroken:()=>setAutoModeCircuitBroken,setAutoModeActive:()=>setAutoModeActive,isAutoModeFromFallback:()=>isAutoModeFromFallback,isAutoModeCircuitBroken:()=>isAutoModeCircuitBroken,isAutoModeActive:()=>isAutoModeActive,getAutoModeFlagCli:()=>getAutoModeFlagCli,createAutoModeState:()=>createAutoModeState,_setGlobalAutoModeStateForTesting:()=>_setGlobalAutoModeStateForTesting});
function createAutoModeState(){return{active:!1,flagCli:!1,circuitBroken:!1,fromFallback:!1}}
function setAutoModeActive(e){A_e.active=e}
function isAutoModeActive(){return A_e.active}
function setAutoModeFlagCli(e){A_e.flagCli=e}
function getAutoModeFlagCli(){return A_e.flagCli}
function setAutoModeCircuitBroken(e){A_e.circuitBroken=e}
function isAutoModeCircuitBroken(){return A_e.circuitBroken}
function setAutoModeFromFallback(e){A_e.fromFallback=e}
function isAutoModeFromFallback(){return A_e.fromFallback}
function _setGlobalAutoModeStateForTesting(e){A_e=e}
var A_e;
var Gte=b(()=>{A_e=createAutoModeState()});
export {xce,createAutoModeState,setAutoModeActive,isAutoModeActive,setAutoModeFlagCli,getAutoModeFlagCli,setAutoModeCircuitBroken,isAutoModeCircuitBroken,setAutoModeFromFallback,isAutoModeFromFallback,_setGlobalAutoModeStateForTesting,A_e,Gte};
