// @ts-nocheck
import {b} from "../runtime.ts";
import {Gns,byr} from "./m616.ts";
import {ps,Wt} from "./m230.ts";
function qEe(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n)|0;return t}
function Vns(e){return Bun.hash(e).toString()}
function Kns(e,t){return Bun.hash(t,Bun.hash(e)).toString()}
function jns(e){let t=e.replace(/[^a-zA-Z0-9]/g,"-");if(t.length<=zns)return t;return`${t.slice(0,zns)}-${Math.abs(qEe(e)).toString(36)}`}
function Crn(e){return jns(e)}
var QAt,Ern,zns=200,k1e;
var Arn=b(()=>{Gns();ps();QAt=require("path"),Ern=byr("claude-cli");k1e={baseLogs:()=>QAt.join(Ern.cache,Crn(Wt().cwd())),errors:()=>QAt.join(Ern.cache,Crn(Wt().cwd()),"errors"),messages:()=>QAt.join(Ern.cache,Crn(Wt().cwd()),"messages"),mcpLogs:(e)=>QAt.join(Ern.cache,Crn(Wt().cwd()),`mcp-logs-${jns(e)}`)}});
export {qEe,Vns,Kns,jns,Crn,QAt,Ern,zns,k1e,Arn};
