// @ts-nocheck
import {ns} from "../src/mcp/2194_mcpServerName.ts";
import {Js} from "../src/config/2697_oA.ts";
import {K5} from "./m2693.ts";
import {b} from "../runtime.ts";
function s0e(e=process.env){let t=e.BASH_DEFAULT_TIMEOUT_MS;if(t){let n=parseInt(t,10);if(!isNaN(n)&&n>0)return n}return 120000}
function j3n(e=process.env){let t=e.BASH_MAX_TIMEOUT_MS;if(t){let n=parseInt(t,10);if(!isNaN(n)&&n>0)return Math.max(n,s0e(e))}return Math.max(600000,s0e(e))}
function H5a(e,t){let n=e.timeout;return typeof n==="number"&&n>0?n:t}
function I5a(e,t){if(e.name===ns||e.name===Js)return H5a(t,s0e());if(e.name===K5)return H5a(t,30000);if(IPp.has(e.name))return 1e4;return}
var IPp;
var D5a=b(()=>{IPp=new Set(["Read","Write","Edit","Glob","Grep","NotebookEdit","TodoWrite","TaskCreate","TaskGet","TaskList","TaskStop","TaskUpdate"])});
export {s0e,j3n,H5a,I5a,IPp,D5a};
