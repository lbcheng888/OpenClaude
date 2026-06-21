// @ts-nocheck
import {PERMISSION_MODES,U2,EXTERNAL_PERMISSION_MODES} from "./m716.ts";
import {b} from "../runtime.ts";
import {Xr,cl} from "./m321.ts";
import {sl,onn} from "./m715.ts";
import {we} from "./m455.ts";
function eKe(e){return e!=="bubble"}
function lnn(e){return Zts[e]??Zts.default}
function xO(e){return lnn(e).external}
function t1(e){return PERMISSION_MODES.includes(e)?e:"default"}
function oQ(e){return lnn(e).title}
function nns(e){return e==="default"||e===void 0}
function tKe(e,t){if(e==="auto")return"classify";if(e==="bypassPermissions"||e==="plan"&&t)return"allow";if(e==="dontAsk")return"deny";return"ask"}
function nKe(e){return lnn(e).symbol}
function wB(e){return lnn(e).color}
var ens,tns,Zts;
var eC=b(()=>{Xr();sl();U2();ens=we(()=>cl.enum(PERMISSION_MODES)),tns=we(()=>cl.enum(EXTERNAL_PERMISSION_MODES)),Zts={default:{title:"Default",shortTitle:"Default",symbol:"",color:"text",external:"default"},plan:{title:"Plan Mode",shortTitle:"Plan",symbol:onn,color:"planMode",external:"plan"},acceptEdits:{title:"Accept edits",shortTitle:"Accept",symbol:"\u23F5\u23F5",color:"autoAccept",external:"acceptEdits"},bypassPermissions:{title:"Bypass Permissions",shortTitle:"Bypass",symbol:"\u23F5\u23F5",color:"error",external:"bypassPermissions"},dontAsk:{title:"Don't Ask",shortTitle:"DontAsk",symbol:"\u23F5\u23F5",color:"error",external:"dontAsk"},auto:{title:"Auto mode",shortTitle:"Auto",symbol:"\u23F5\u23F5",color:"warning",external:"auto"}}});
export {eKe,lnn,xO,t1,oQ,nns,tKe,nKe,wB,ens,tns,Zts,eC};
