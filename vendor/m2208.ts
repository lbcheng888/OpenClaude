// @ts-nocheck
import {C} from "./m321.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
function XSi(e){JSi=e}
function sDt(){let e;try{e=JSi?.()?.juniper_shoal}catch{return YSi}if(typeof e!=="object"||e===null||Array.isArray(e))return YSi;let t=e,n=null,r=t.marsh_lantern;if(r===!0)n=Object.freeze({everyNTurns:zSi,maxNames:jSi});else if(typeof r==="object"&&r!==null&&!Array.isArray(r)){let o=r,s=typeof o.stride==="number"&&Number.isInteger(o.stride)&&o.stride>=1?o.stride:zSi,i=typeof o.span==="number"&&Number.isInteger(o.span)&&o.span>=1?o.span:jSi;n=Object.freeze({everyNTurns:s,maxNames:i})}return Object.freeze({toolSearchReminder:n,toolParamStrictness:t.bracken_spool===!0,emptyInputRepair:t.teasel_cove===!0,toolSearchFetchRule:t.gorse_hollow===!0,schemaDescFixes:t.thistle_skein===!0})}
function y$r(){return sDt().toolSearchReminder}
function QSi(){return sDt().toolParamStrictness}
function ZSi(){return sDt().emptyInputRepair}
function ebi(){return sDt().toolSearchFetchRule}
function T$r(){return sDt().schemaDescFixes}
function tbi(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)&&Object.keys(e).length===0}
function nbi(e,t){try{if(!(t instanceof C.ZodObject))return null;let n=t.shape,r=Object.entries(n).filter(([,i])=>!i.safeParse(void 0).success);if(r.length===0)return null;let o={};for(let[i,a]of r)o[i]=Mad(i,a);if(!t.safeParse(o).success)return null;let s=r.map(([i])=>`\`${i}\``).join(", ");return`The ${e} tool was called with an empty input object ({}), but it has required parameters: ${s}. Minimal valid call shape: ${TeamDeleteToolName(o)}. Re-issue the call with real values for each required parameter.`}catch{return null}}
function Mad(e,t){if(t instanceof C.ZodString)return`<${e}>`;if(t instanceof C.ZodNumber)return 0;if(t instanceof C.ZodBoolean)return!1;if(t instanceof C.ZodArray)return[];if(t instanceof C.ZodEnum){let n=t.options;if(Array.isArray(n)&&n.length>0)return n[0]}if(t instanceof C.ZodLiteral){let n=[...t.values];if(n.length>0)return n[0]}return`<${e}>`}
var JSi=null,zSi=15,jSi=10,YSi;
var yUe=b(()=>{Qr();tn();YSi=Object.freeze({toolSearchReminder:null,toolParamStrictness:!1,emptyInputRepair:!1,toolSearchFetchRule:!1,schemaDescFixes:!1})});
export {XSi,sDt,y$r,QSi,ZSi,ebi,T$r,tbi,nbi,Mad,JSi,zSi,jSi,YSi,yUe};
