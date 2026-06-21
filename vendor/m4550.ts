// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {logMCPError,uoe,initKp} from "./m609.ts";
import {listConfigKeys,parseConfigShorthand,applyConfigShorthand,h8n} from "../src/agent/4515_parseConfigShorthand.ts";
var ill={};
isFullscreenWithTTY(ill,{call:()=>xGp});
async function xGp(e,t){let n=e.trim(),r=n.toLowerCase();if(!r||logMCPError.includes(r)||uoe.includes(r))return{type:"text",value:`Usage: /config key=value [key=value ...]
${listConfigKeys(t)}`};let o=parseConfigShorthand(n);if(!o)return{type:"text",value:`Expected key=value, got "${n}". Run /config to see what's available.`};return{type:"text",value:applyConfigShorthand(o,t).map((i)=>i.message).join(`
`)}}
var all=b(()=>{initKp();h8n()});
export {ill,xGp,all};
