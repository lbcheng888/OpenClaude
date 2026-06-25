// @ts-nocheck
import {b} from "../runtime.ts";
function j2r(e){let t=zid;if(!t)return!1;let n,r;try{n=new URL(e),r=new URL(t)}catch{return!1}if((n.protocol==="wss:"?`https://${n.host}`:n.protocol==="ws:"?`http://${n.host}`:n.origin)!==r.origin)return!1;return z2r.some((s)=>n.pathname.includes(s))}
function aSi(e){if(!j2r(e))return!1;let t;try{t=new URL(e)}catch{return!1}let n=t.searchParams.get("mcp_url");if(!n)return!1;try{let r=new URL(n);return jid.has(r.hostname)&&r.pathname==="/devices/mcp"}catch{return!1}}
function ZZe(e){if(!("url"in e)||typeof e.url!=="string")return;try{let t=new URL(e.url);return t.search="",t.username="",t.password="",t.hash="",t.toString().replace(/\/$/,"")}catch{return}}
var z2r,zid,jid;
var eet=b(()=>{z2r=["/v2/session_ingress/shttp/mcp/","/v2/session_ingress/mcp/ws/","/v2/ccr-sessions/","/v1/code/"],zid=process.env.SESSION_INGRESS_URL??process.env.ANTHROPIC_BASE_URL;jid=new Set(["bridge.claudeusercontent.com","bridge-staging.claudeusercontent.com"])});
export {j2r,aSi,ZZe,z2r,zid,jid,eet};
