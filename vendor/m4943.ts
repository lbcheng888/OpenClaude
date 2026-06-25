// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {$l,Goe,fXe,WS} from "../src/api/1453_month.ts";
import {rYn,o0o} from "../src/session/4942_cacheBreakerPhrase.ts";
var RDl={};
ft(RDl,{call:()=>Uhm});
async function Uhm(e,t){if(!$l())return{type:"text",value:Goe()??"Fast mode is not available"};await fXe();let n=e.trim().toLowerCase(),r;if(n==="on")r=!0;else if(n==="off")r=!1;else if(n==="")r=!t.options.fastMode;else return{type:"text",value:`Unknown argument "${n}". Use: /fast [on|off]`};return{type:"text",value:await rYn(r,t.getAppState,t.setAppState,"bridge",t.onQueryEvent)}}
var vDl=b(()=>{WS();o0o()});
export {RDl,Uhm,vDl};
