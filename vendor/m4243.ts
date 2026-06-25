// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {getBridgeBaseUrlOverride,getBridgeAccessToken,BY} from "./m4242.ts";
import {getOauthConfig,Sc} from "../src/api/0465_getOauthConfig.ts";
import {ho} from "./m572.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {ap} from "./m573.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var Rja={};
ft(Rja,{uploadBriefAttachment:()=>uploadBriefAttachment,escapeContentDispositionFilename:()=>escapeContentDispositionFilename});
function RUp(e){let t=N6n.extname(e).toLowerCase();return AUp[t]??"application/octet-stream"}
function escapeContentDispositionFilename(e){return e.replace(/[\r\n]/g,"").replaceAll("\\","\\\\").replaceAll('"',"\\\"")}
function I5e(e){logForDebugging(`[brief:upload] ${e}`)}
function vUp(){return getBridgeBaseUrlOverride()??process.env.ANTHROPIC_BASE_URL??getOauthConfig().BASE_API_URL}
async function uploadBriefAttachment(e,t,n){if(!n.replBridgeEnabled)return;if(t>bja){I5e(`skip ${e}: ${t} bytes exceeds ${bja} limit`);return}let r=getBridgeAccessToken();if(!r){I5e("skip: no oauth token");return}let o;try{o=await Cja.readFile(e)}catch(d){I5e(`read failed for ${e}: ${d}`);return}let i=`${vUp()}/api/oauth/file_upload`,a=N6n.basename(e),l=RUp(a),c=`----FormBoundary${Eja.randomUUID()}`,u=Buffer.concat([Buffer.from(`--${c}\r
Content-Disposition: form-data; name="file"; filename="${escapeContentDispositionFilename(a)}"\r
Content-Type: ${l}\r
\r
`),o,Buffer.from(`\r
--${c}--\r
`)]);try{let d=await ho.post(i,u,{headers:{Authorization:`Bearer ${r}`,"Content-Type":`multipart/form-data; boundary=${c}`,"Content-Length":u.length.toString()},timeout:CUp,signal:n.signal,validateStatus:()=>!0});if(d.status!==201){I5e(`upload failed for ${e}: status=${d.status} body=${TeamDeleteToolName(d.data).slice(0,200)}`);return}let p=wUp().safeParse(d.data);if(!p.success){I5e(`unexpected response shape for ${e}: ${p.error.message}`);return}return I5e(`uploaded ${e} \u2192 ${p.data.file_uuid} (${t} bytes)`),p.data.file_uuid}catch(d){I5e(`upload threw for ${e}: ${d}`);return}}
var Eja,Cja,N6n,bja=31457280,CUp=30000,AUp,wUp;
var vja=b(()=>{ap();Qr();BY();Sc();qe();tn();Eja=require("crypto"),Cja=require("fs/promises"),N6n=require("path"),AUp={".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".gif":"image/gif",".webp":"image/webp"};wUp=ve(()=>C.object({file_uuid:C.string()}))});
export {Rja,RUp,escapeContentDispositionFilename,I5e,vUp,uploadBriefAttachment,Eja,Cja,N6n,bja,CUp,AUp,wUp,vja};
