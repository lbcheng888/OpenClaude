// @ts-nocheck
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
function SOo(){if(yOo===void 0)yOo=(getGlobalConfig().seenNotifications?.[TOo]??0)<a0m;return yOo}
function Hjl(){if(kjl)return;if(!SOo())return;kjl=!0,saveGlobalConfig((e)=>{let t=e.seenNotifications??{};return{...e,seenNotifications:{...t,[TOo]:(t[TOo]??0)+1}}})}
var TOo="rc-active-badge",a0m=5,kjl=!1,yOo;
var Ijl=b(()=>{Qn()});
export {SOo,Hjl,TOo,a0m,kjl,yOo,Ijl};
