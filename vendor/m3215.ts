// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {_K,wfe} from "../src/computer-use/2193_iTerm_app.ts";
import {createCliExecutor,mzr} from "../src/computer-use/3215_unhideComputerUseApps.ts";
import {eIn,ZHn,uot} from "../src/telemetry/3213_enabled.ts";
import {u9} from "../src/computer-use/3211_level.ts";
import {b} from "../runtime.ts";
class Xna{silly(e,...t){logForDebugging(pot.format(e,...t),{level:"debug"})}debug(e,...t){logForDebugging(pot.format(e,...t),{level:"debug"})}info(e,...t){logForDebugging(pot.format(e,...t),{level:"info"})}warn(e,...t){logForDebugging(pot.format(e,...t),{level:"warn"})}error(e,...t){logForDebugging(pot.format(e,...t),{level:"error"})}}
function nIn(){if(tIn)return tIn;return tIn={serverName:_K,logger:new Xna,executor:createCliExecutor({getMouseAnimationEnabled:()=>eIn().mouseAnimation,getHideBeforeActionEnabled:()=>eIn().hideBeforeAction}),ensureOsPermissions:async()=>{let e=u9(),t=e.tcc.checkAccessibility(),n=e.tcc.checkScreenRecording();return t&&n?{granted:!0}:{granted:!1,accessibility:t,screenRecording:n}},isDisabled:()=>!ZHn(),getSubGates:eIn,getAutoUnhideEnabled:()=>!0,cropRawPatch:()=>null},tIn}
var pot,tIn;
var fzr=b(()=>{qe();wfe();mzr();uot();pot=require("util")});
export {Xna,nIn,pot,tIn,fzr};
