// @ts-nocheck
import {PERMISSION_MODES,jN,EXTERNAL_PERMISSION_MODES} from "./m721.ts";
import {b} from "../runtime.ts";
import {Qr,za} from "./m323.ts";
import {Pa,Bon} from "./m720.ts";
import {ve} from "./m461.ts";
function Won(e,t){if(!e)return;if(t==="auto"&&e==="acceptEdits")return;return zas[e]<=zas[t]?e:void 0}
function Qje(e){return e!=="bubble"}
function Gon(e){return jas[e]??jas.default}
function zP(e){return Gon(e).external}
function fM(e){return PERMISSION_MODES.includes(e)?e:"default"}
function tQ(e){return Gon(e).title}
function Jas(e){return e==="default"||e===void 0}
function Zje(e,t){if(e==="auto")return"classify";if(e==="bypassPermissions"||e==="plan"&&t)return"allow";if(e==="dontAsk")return"deny";return"ask"}
function eYe(e){return Gon(e).symbol}
function YN(e){return Gon(e).color}
var Yas,qRt,zas,jas;
var FS=b(()=>{Qr();Pa();jN();Yas=ve(()=>za.enum(PERMISSION_MODES)),qRt=ve(()=>za.enum(EXTERNAL_PERMISSION_MODES)),zas={plan:0,bubble:1,default:1,dontAsk:1,acceptEdits:2,auto:3,bypassPermissions:4};jas={default:{title:"Default",shortTitle:"Default",symbol:"",color:"text",external:"default"},plan:{title:"Plan Mode",shortTitle:"Plan",symbol:Bon,color:"planMode",external:"plan"},acceptEdits:{title:"Accept edits",shortTitle:"Accept",symbol:"\u23F5\u23F5",color:"autoAccept",external:"acceptEdits"},bypassPermissions:{title:"Bypass Permissions",shortTitle:"Bypass",symbol:"\u23F5\u23F5",color:"error",external:"bypassPermissions"},dontAsk:{title:"Don't Ask",shortTitle:"DontAsk",symbol:"\u23F5\u23F5",color:"error",external:"dontAsk"},auto:{title:"Auto mode",shortTitle:"Auto",symbol:"\u23F5\u23F5",color:"warning",external:"auto"}}});
export {Won,Qje,Gon,zP,fM,tQ,Jas,Zje,eYe,YN,Yas,qRt,zas,jas,FS};
