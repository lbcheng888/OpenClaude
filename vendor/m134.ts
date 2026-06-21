// @ts-nocheck
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
function rhc(e){let t=[],n=e.match(/^MCP server ["']([^"']+)["']/);if(n&&n[1])t.push("mcp"),t.push(n[1].toLowerCase());else{let s=e.match(/^([^:[]+):/);if(s&&s[1])t.push(s[1].trim().toLowerCase())}let r=e.match(/^\[([^\]]+)]/);if(r&&r[1])t.push(r[1].trim().toLowerCase());if(e.toLowerCase().includes("1p event:"))t.push("1p");let o=e.match(/:\s*([^:]+?)(?:\s+(?:type|mode|status|event))?:/);if(o&&o[1]){let s=o[1].trim().toLowerCase();if(s.length<30&&!s.includes(" "))t.push(s)}return Array.from(new Set(t))}
function ohc(e,t){if(!t)return!0;if(e.length===0)return!1;if(t.isExclusive)return!e.some((n)=>t.exclude.includes(n));else return e.some((n)=>t.include.includes(n))}
function j2o(e,t){if(!t)return!0;let n=rhc(e);return ohc(n,t)}
var q2o;
var W2o=b(()=>{ta();q2o=wn((e)=>{if(!e||e.trim()==="")return null;let t=e.split(",").map((s)=>s.trim()).filter(Boolean);if(t.length===0)return null;let n=t.some((s)=>s.startsWith("!")),r=t.some((s)=>!s.startsWith("!"));if(n&&r)return null;let o=t.map((s)=>s.replace(/^!/,"").toLowerCase());return{include:n?[]:o,exclude:n?o:[],isExclusive:n}})});
export {rhc,ohc,j2o,q2o,W2o};
