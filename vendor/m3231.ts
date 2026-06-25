// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {q7,Mfe} from "../src/computer-use/2198_iTerm_app.ts";
import {createCliExecutor,YQr} from "../src/computer-use/3231_unhideComputerUseApps.ts";
import {VDn,GDn,uit} from "../src/telemetry/3229_enabled.ts";
import {L$} from "../src/computer-use/3227_level.ts";
import {b} from "../runtime.ts";
class nua{silly(e,...t){logForDebugging(pit.format(e,...t),{level:"debug"})}debug(e,...t){logForDebugging(pit.format(e,...t),{level:"debug"})}info(e,...t){logForDebugging(pit.format(e,...t),{level:"info"})}warn(e,...t){logForDebugging(pit.format(e,...t),{level:"warn"})}error(e,...t){logForDebugging(pit.format(e,...t),{level:"error"})}}
function zDn(){if(KDn)return KDn;return KDn={serverName:q7,logger:new nua,executor:createCliExecutor({getMouseAnimationEnabled:()=>VDn().mouseAnimation,getHideBeforeActionEnabled:()=>VDn().hideBeforeAction}),ensureOsPermissions:async()=>{let e=L$(),t=e.tcc.checkAccessibility(),n=e.tcc.checkScreenRecording();return t&&n?{granted:!0}:{granted:!1,accessibility:t,screenRecording:n}},isDisabled:()=>!GDn(),getSubGates:VDn,getAutoUnhideEnabled:()=>!0,cropRawPatch:()=>null},KDn}
var pit,KDn;
var JQr=b(()=>{qe();Mfe();YQr();uit();pit=require("util")});
export {nua,zDn,pit,KDn,JQr};
