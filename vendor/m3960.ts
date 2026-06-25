// @ts-nocheck
import {ft,b} from "../runtime.ts";
var lce={};
ft(lce,{setAutoModeFromFallback:()=>setAutoModeFromFallback,setAutoModeFlagCli:()=>setAutoModeFlagCli,setAutoModeCircuitBroken:()=>setAutoModeCircuitBroken,setAutoModeActive:()=>setAutoModeActive,isAutoModeFromFallback:()=>isAutoModeFromFallback,isAutoModeCircuitBroken:()=>isAutoModeCircuitBroken,isAutoModeActive:()=>isAutoModeActive,getAutoModeFlagCli:()=>getAutoModeFlagCli,createAutoModeState:()=>createAutoModeState,_setGlobalAutoModeStateForTesting:()=>_setGlobalAutoModeStateForTesting});
function createAutoModeState(){return{active:!1,flagCli:!1,circuitBroken:!1,fromFallback:!1}}
function setAutoModeActive(e){pye.active=e}
function isAutoModeActive(){return pye.active}
function setAutoModeFlagCli(e){pye.flagCli=e}
function getAutoModeFlagCli(){return pye.flagCli}
function setAutoModeCircuitBroken(e){pye.circuitBroken=e}
function isAutoModeCircuitBroken(){return pye.circuitBroken}
function setAutoModeFromFallback(e){pye.fromFallback=e}
function isAutoModeFromFallback(){return pye.fromFallback}
function _setGlobalAutoModeStateForTesting(e){pye=e}
var pye;
var bte=b(()=>{pye=createAutoModeState()});
export {lce,createAutoModeState,setAutoModeActive,isAutoModeActive,setAutoModeFlagCli,getAutoModeFlagCli,setAutoModeCircuitBroken,isAutoModeCircuitBroken,setAutoModeFromFallback,isAutoModeFromFallback,_setGlobalAutoModeStateForTesting,pye,bte};
