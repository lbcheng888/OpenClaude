// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {Cdt,s3n} from "../src/telemetry/4016_openInBrowser.ts";
import {getIsNonInteractiveSession,lt} from "../src/session/0132_sent.ts";
var xpo={};
ft(xpo,{call:()=>bxp});
async function bxp(){let e=await Cdt({openInBrowser:getIsNonInteractiveSession()});if(e.type==="message")return{type:"text",value:e.value};return{type:"text",value:e.opened?`Browser opened to manage usage credits. If it didn't open, visit: ${e.url}`:`Visit ${e.url} to manage usage credits.`}}
var Dpo=b(()=>{lt();s3n()});
export {xpo,bxp,Dpo};
