// @ts-nocheck
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
function UFo(){if(FFo===void 0)FFo=(getGlobalConfig().seenNotifications?.[BFo]??0)<hBm;return FFo}
function dYl(){if(uYl)return;if(!UFo())return;uYl=!0,saveGlobalConfig((e)=>{let t=e.seenNotifications??{};return{...e,seenNotifications:{...t,[BFo]:(t[BFo]??0)+1}}})}
var BFo="rc-active-badge",hBm=5,uYl=!1,FFo;
var pYl=b(()=>{tr()});
export {UFo,dYl,BFo,hBm,uYl,FFo,pYl};
