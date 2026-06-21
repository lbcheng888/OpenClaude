// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {getBridgeBaseUrlOverride,getBridgeAccessToken,tJ} from "./m4224.ts";
import {getOauthConfig,Dc} from "../src/api/0459_getOauthConfig.ts";
import {fo} from "./m566.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {Gp} from "./m567.ts";
import {Xr} from "./m321.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var i5a={};
isFullscreenWithTTY(i5a,{uploadBriefAttachment:()=>uploadBriefAttachment,escapeContentDispositionFilename:()=>escapeContentDispositionFilename});
function iPp(e){let t=H3n.extname(e).toLowerCase();return sPp[t]??"application/octet-stream"}
function escapeContentDispositionFilename(e){return e.replace(/[\r\n]/g,"").replaceAll("\\","\\\\").replaceAll('"',"\\\"")}
function i6e(e){logForDebugging(`[brief:upload] ${e}`)}
function aPp(){return getBridgeBaseUrlOverride()??process.env.ANTHROPIC_BASE_URL??getOauthConfig().BASE_API_URL}
async function uploadBriefAttachment(e,t,n){if(!n.replBridgeEnabled)return;if(t>n5a){i6e(`skip ${e}: ${t} bytes exceeds ${n5a} limit`);return}let r=getBridgeAccessToken();if(!r){i6e("skip: no oauth token");return}let o;try{o=await o5a.readFile(e)}catch(d){i6e(`read failed for ${e}: ${d}`);return}let i=`${aPp()}/api/oauth/file_upload`,a=H3n.basename(e),l=iPp(a),c=`----FormBoundary${r5a.randomUUID()}`,u=Buffer.concat([Buffer.from(`--${c}\r
Content-Disposition: form-data; name="file"; filename="${escapeContentDispositionFilename(a)}"\r
Content-Type: ${l}\r
\r
`),o,Buffer.from(`\r
--${c}--\r
`)]);try{let d=await fo.post(i,u,{headers:{Authorization:`Bearer ${r}`,"Content-Type":`multipart/form-data; boundary=${c}`,"Content-Length":u.length.toString()},timeout:oPp,signal:n.signal,validateStatus:()=>!0});if(d.status!==201){i6e(`upload failed for ${e}: status=${d.status} body=${Le(d.data).slice(0,200)}`);return}let p=lPp().safeParse(d.data);if(!p.success){i6e(`unexpected response shape for ${e}: ${p.error.message}`);return}return i6e(`uploaded ${e} \u2192 ${p.data.file_uuid} (${t} bytes)`),p.data.file_uuid}catch(d){i6e(`upload threw for ${e}: ${d}`);return}}
var r5a,o5a,H3n,n5a=31457280,oPp=30000,sPp,lPp;
var a5a=b(()=>{Gp();Xr();tJ();Dc();qe();Xt();r5a=require("crypto"),o5a=require("fs/promises"),H3n=require("path"),sPp={".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".gif":"image/gif",".webp":"image/webp"};lPp=we(()=>E.object({file_uuid:E.string()}))});
export {i5a,iPp,escapeContentDispositionFilename,i6e,aPp,uploadBriefAttachment,r5a,o5a,H3n,n5a,oPp,sPp,lPp,a5a};
