// @ts-nocheck
import {Mo} from "../src/mcp/2200_mcpServerName.ts";
import {ws} from "../src/config/2709_Zm.ts";
import {lW} from "./m2705.ts";
import {b} from "../runtime.ts";
function Qxe(e=process.env){let t=e.BASH_DEFAULT_TIMEOUT_MS;if(t){let n=parseInt(t,10);if(!isNaN(n)&&n>0)return n}return 120000}
function X6n(e=process.env){let t=e.BASH_MAX_TIMEOUT_MS;if(t){let n=parseInt(t,10);if(!isNaN(n)&&n>0)return Math.max(n,Qxe(e))}return Math.max(600000,Qxe(e))}
function Yja(e,t){let n=e.timeout;return typeof n==="number"&&n>0?n:t}
function Jja(e,t){if(e.name===Mo||e.name===ws)return Yja(t,Qxe());if(e.name===lW)return Yja(t,30000);if(XUp.has(e.name))return 1e4;return}
var XUp;
var Xja=b(()=>{XUp=new Set(["Read","Write","Edit","Glob","Grep","NotebookEdit","TodoWrite","TaskCreate","TaskGet","TaskList","TaskStop","TaskUpdate"])});
export {Qxe,X6n,Yja,Jja,XUp,Xja};
