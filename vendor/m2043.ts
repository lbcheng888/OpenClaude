// @ts-nocheck
import {dc,U8} from "./m1480.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {isFirstPartyAnthropicHost,li} from "../src/api/1282_usesFirstPartyModelIds.ts";
import {Ose,kXe} from "../src/config/2043_pathname.ts";
import {b} from "../runtime.ts";
async function Phn(){return(await dc().readAsync())?.mcpOAuth}
function Sv(e,t){let n=Le({type:t.type,url:t.url,headers:t.headers||{}}),r=qni.createHash("sha256").update(n).digest("hex").substring(0,16);return`${e}|${r}`}
function Ohn(e){return Object.keys(e.headers??{}).some((t)=>t.toLowerCase()==="authorization")}
function AK(e){try{let t=new URL(e);return t.protocol==="https:"&&isFirstPartyAnthropicHost(t.href)&&_Vu.some((n)=>t.pathname.startsWith(n))}catch{return!1}}
function Lhn(e){if(Ose()&&e.oauth?.xaa)return!0;if(e.headersHelper||e.headers&&Object.keys(e.headers).length>0)return!0;if(AK(e.url))return!0;return!1}
function Mhn(e,t,n){if(Lhn(t))return!1;let r=n?.[Sv(e,t)];return r!==void 0&&!r.accessToken&&!r.refreshToken&&r.discoveryState?.oauthMetadataFound===!0}
function jni(e,t,n){if(Lhn(t))return!1;let r=n?.[Sv(e,t)];return r!==void 0&&!!r.accessToken&&!r.refreshToken&&r.expiresAt!==void 0&&r.expiresAt<Date.now()}
var qni,wMr,_Vu;
var sve=b(()=>{li();U8();Xt();kXe();qni=require("crypto");wMr=["/v2/session_ingress/shttp/mcp/","/v2/session_ingress/mcp/ws/","/v2/ccr-sessions/","/v1/code/"],_Vu=["/v1/design/"]});
export {Phn,Sv,Ohn,AK,Lhn,Mhn,jni,qni,wMr,_Vu,sve};
