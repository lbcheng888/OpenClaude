// @ts-nocheck
import {E} from "./m319.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
function Jfi(e){Yfi=e}
function DHt(){let e;try{e=Yfi?.()?.juniper_shoal}catch{return zfi}if(typeof e!=="object"||e===null||Array.isArray(e))return zfi;let t=e,n=null,r=t.marsh_lantern;if(r===!0)n=Object.freeze({everyNTurns:Vfi,maxNames:Kfi});else if(typeof r==="object"&&r!==null&&!Array.isArray(r)){let o=r,s=typeof o.stride==="number"&&Number.isInteger(o.stride)&&o.stride>=1?o.stride:Vfi,i=typeof o.span==="number"&&Number.isInteger(o.span)&&o.span>=1?o.span:Kfi;n=Object.freeze({everyNTurns:s,maxNames:i})}return Object.freeze({toolSearchReminder:n,toolParamStrictness:t.bracken_spool===!0,emptyInputRepair:t.teasel_cove===!0,toolSearchFetchRule:t.gorse_hollow===!0,schemaDescFixes:t.thistle_skein===!0})}
function jNr(){return DHt().toolSearchReminder}
function Xfi(){return DHt().toolParamStrictness}
function Qfi(){return DHt().emptyInputRepair}
function Zfi(){return DHt().toolSearchFetchRule}
function WNr(){return DHt().schemaDescFixes}
function eAi(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)&&Object.keys(e).length===0}
function tAi(e,t){try{if(!(t instanceof E.ZodObject))return null;let n=t.shape,r=Object.entries(n).filter(([,i])=>!i.safeParse(void 0).success);if(r.length===0)return null;let o={};for(let[i,a]of r)o[i]=mXu(i,a);if(!t.safeParse(o).success)return null;let s=r.map(([i])=>`\`${i}\``).join(", ");return`The ${e} tool was called with an empty input object ({}), but it has required parameters: ${s}. Minimal valid call shape: ${Le(o)}. Re-issue the call with real values for each required parameter.`}catch{return null}}
function mXu(e,t){if(t instanceof E.ZodString)return`<${e}>`;if(t instanceof E.ZodNumber)return 0;if(t instanceof E.ZodBoolean)return!1;if(t instanceof E.ZodArray)return[];if(t instanceof E.ZodEnum){let n=t.options;if(Array.isArray(n)&&n.length>0)return n[0]}if(t instanceof E.ZodLiteral){let n=[...t.values];if(n.length>0)return n[0]}return`<${e}>`}
var Yfi=null,Vfi=15,Kfi=10,zfi;
var SFe=b(()=>{Xr();Xt();zfi=Object.freeze({toolSearchReminder:null,toolParamStrictness:!1,emptyInputRepair:!1,toolSearchFetchRule:!1,schemaDescFixes:!1})});
export {Jfi,DHt,jNr,Xfi,Qfi,Zfi,WNr,eAi,tAi,mXu,Yfi,Vfi,Kfi,zfi,SFe};
