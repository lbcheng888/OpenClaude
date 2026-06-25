// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {i3,loe,Ud} from "./m615.ts";
import {listConfigKeys,parseConfigShorthand,applyConfigShorthand,OVn} from "../src/agent/4535_parseConfigShorthand.ts";
var Nhl={};
ft(Nhl,{call:()=>DZp});
async function DZp(e,t){let n=e.trim(),r=n.toLowerCase();if(!r||i3.includes(r)||loe.includes(r))return{type:"text",value:`Usage: /config key=value [key=value ...]
${listConfigKeys(t)}`};let o=parseConfigShorthand(n);if(!o)return{type:"text",value:`Expected key=value, got "${n}". Run /config to see what's available.`};return{type:"text",value:applyConfigShorthand(o,t).map((i)=>i.message).join(`
`)}}
var Fhl=b(()=>{Ud();OVn()});
export {Nhl,DZp,Fhl};
