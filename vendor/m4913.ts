// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {uc,Woe,gYe,tE} from "../src/api/1448_month.ts";
import {AVn,$vo} from "../src/session/4912_cacheBreakerPhrase.ts";
var mvl={};
isFullscreenWithTTY(mvl,{call:()=>xim});
async function xim(e,t){if(!uc())return{type:"text",value:Woe()??"Fast mode is not available"};await gYe();let n=e.trim().toLowerCase(),r;if(n==="on")r=!0;else if(n==="off")r=!1;else if(n==="")r=!t.options.fastMode;else return{type:"text",value:`Unknown argument "${n}". Use: /fast [on|off]`};return{type:"text",value:await AVn(r,t.getAppState,t.setAppState,"bridge",t.onQueryEvent)}}
var fvl=b(()=>{tE();$vo()});
export {mvl,xim,fvl};
