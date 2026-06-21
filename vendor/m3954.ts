// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {cct,vUn} from "../src/telemetry/3949_openInBrowser.ts";
import {getIsNonInteractiveSession,lt} from "../src/session/0131_sent.ts";
var Vio={};
isFullscreenWithTTY(Vio,{call:()=>Cbp});
async function Cbp(){let e=await cct({openInBrowser:getIsNonInteractiveSession()});if(e.type==="message")return{type:"text",value:e.value};return{type:"text",value:e.opened?`Browser opened to manage usage credits. If it didn't open, visit: ${e.url}`:`Visit ${e.url} to manage usage credits.`}}
var Kio=b(()=>{lt();vUn()});
export {Vio,Cbp,Kio};
