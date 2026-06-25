// @ts-nocheck
import {ql,e8} from "./m1485.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {isFirstPartyAnthropicHost,Ps} from "../src/api/1287_usesFirstPartyModelIds.ts";
import {Ose,wZe} from "../src/config/2048_pathname.ts";
import {b} from "../runtime.ts";
async function mTn(){return(await ql().readAsync())?.mcpOAuth}
function kA(e,t){let n=TeamDeleteToolName({type:t.type,url:t.url,headers:t.headers||{}}),r=Nli.createHash("sha256").update(n).digest("hex").substring(0,16);return`${e}|${r}`}
function kZe(e){return Object.keys(e.headers??{}).some((t)=>t.toLowerCase()==="authorization")}
function $3(e){try{let t=new URL(e);return t.protocol==="https:"&&isFirstPartyAnthropicHost(t.href)&&Ntd.some((n)=>t.pathname.startsWith(n))}catch{return!1}}
function fTn(e){if(Ose()&&e.oauth?.xaa)return!0;if(e.headersHelper||e.headers&&Object.keys(e.headers).length>0)return!0;if($3(e.url))return!0;return!1}
function hTn(e,t,n){if(fTn(t))return!1;let r=n?.[kA(e,t)];return r!==void 0&&!r.accessToken&&!r.refreshToken&&r.discoveryState?.oauthMetadataFound===!0}
function Fli(e,t,n){if(fTn(t))return!1;let r=n?.[kA(e,t)];return r!==void 0&&!!r.accessToken&&!r.refreshToken&&r.expiresAt!==void 0&&r.expiresAt<Date.now()}
var Nli,Ntd;
var vfe=b(()=>{Ps();e8();tn();wZe();Nli=require("crypto");Ntd=["/v1/design/"]});
export {mTn,kA,kZe,$3,fTn,hTn,Fli,Nli,Ntd,vfe};
