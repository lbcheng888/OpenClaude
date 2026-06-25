// @ts-nocheck
import {ixe} from "../src/config/3968_maxEditDistance.ts";
import {mo,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function R1o(e,t){let n=[...t].sort(),r=ixe(e,n.map((a)=>({name:a})),{maxEditDistance:2});if(r)return`No MCP server named "${e}". Did you mean "${r}"? Run \`claude mcp list\` to see all.`;if(n.length===0)return`No MCP server named "${e}". Run \`claude mcp add\` to add one.`;let o=8,s=n.slice(0,o).join(", "),i=n.length>o?` (and ${n.length-o} more \u2014 run \`claude mcp list\` to see all)`:"";return`No MCP server named "${e}". Configured servers: ${s}${i}`}
function oZn(e,t,n){if(n&&t.length===0)return`No MCP server named "${e}". ${".mcp.json servers are awaiting approval \u2014 run `claude` in this directory to review them."}`;return R1o(e,t)+(n?` (${".mcp.json servers are awaiting approval \u2014 run `claude` in this directory to review them."})`:"")}
var v1o=()=>{};
function sWl(e){oWl.push(e)}
function w1o(e,t){let n=t;for(let r of oWl)try{let o=r(e,n);if(o)n={...n,...o}}catch(o){let s=mo(o);logForDebugging(`session rehydrator threw: ${s.stack??s.message}`,{level:"error"})}return n}
var oWl;
var k1o=b(()=>{qe();Ct();oWl=[]});
export {R1o,oZn,v1o,sWl,w1o,oWl,k1o};
