// @ts-nocheck
import {b} from "../runtime.ts";
import {KJo,Vmr} from "./m610.ts";
import {ws,jt} from "./m228.ts";
function abe(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n)|0;return t}
function zJo(e){return Bun.hash(e).toString()}
function YJo(e,t){return Bun.hash(t,Bun.hash(e)).toString()}
function XJo(e){let t=e.replace(/[^a-zA-Z0-9]/g,"-");if(t.length<=JJo)return t;return`${t.slice(0,JJo)}-${Math.abs(abe(e)).toString(36)}`}
function qen(e){return XJo(e)}
var wbt,$en,JJo=200,LMe;
var jen=b(()=>{KJo();ws();wbt=require("path"),$en=Vmr("claude-cli");LMe={baseLogs:()=>wbt.join($en.cache,qen(jt().cwd())),errors:()=>wbt.join($en.cache,qen(jt().cwd()),"errors"),messages:()=>wbt.join($en.cache,qen(jt().cwd()),"messages"),mcpLogs:(e)=>wbt.join($en.cache,qen(jt().cwd()),`mcp-logs-${XJo(e)}`)}});
export {abe,zJo,YJo,XJo,qen,wbt,$en,JJo,LMe,jen};
