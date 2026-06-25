// @ts-nocheck
import {IHt} from "./m1718.ts";
import {Wme} from "./m1698.ts";
import {b} from "../runtime.ts";
import {cse} from "./m1703.ts";
import {XAe,Thn} from "./m1679.ts";
import {VS,Lp} from "./m1636.ts";
import {LM,jg} from "./m1717.ts";
import {t8} from "./m1699.ts";
function dYu(e){var t;if(!IHt(e))throw Error(`${ufe}: Multiple scopes are not supported.`);let r=new URL(uYu,(t=process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST)!==null&&t!==void 0?t:cYu),o={Accept:"application/json"};return{url:`${r}`,method:"GET",headers:Wme(o)}}
var ufe="ManagedIdentityCredential - IMDS",vBe,cYu="http://169.254.169.254",uYu="/metadata/identity/oauth2/token",A1r;
var uri=b(()=>{cse();XAe();VS();LM();vBe=Lp(ufe);A1r={name:"imdsMsi",async isAvailable(e){let{scopes:t,identityClient:n,getTokenOptions:r}=e,o=IHt(t);if(!o)return vBe.info(`${ufe}: Unavailable. Multiple scopes are not supported.`),!1;if(process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST)return!0;if(!n)throw Error("Missing IdentityClient");let s=dYu(o);return jg.withSpan("ManagedIdentityCredential-pingImdsEndpoint",r!==null&&r!==void 0?r:{},async(i)=>{var a,l;s.tracingOptions=i.tracingOptions;let c=t8(s);c.timeout=((a=i.requestOptions)===null||a===void 0?void 0:a.timeout)||1000,c.allowInsecureConnection=!0;let u;try{vBe.info(`${ufe}: Pinging the Azure IMDS endpoint`),u=await n.sendRequest(c)}catch(d){if(Thn(d))vBe.verbose(`${ufe}: Caught error ${d.name}: ${d.message}`);return vBe.info(`${ufe}: The Azure IMDS endpoint is unavailable`),!1}if(u.status===403){if((l=u.bodyAsText)===null||l===void 0?void 0:l.includes("unreachable"))return vBe.info(`${ufe}: The Azure IMDS endpoint is unavailable`),vBe.info(`${ufe}: ${u.bodyAsText}`),!1}return vBe.info(`${ufe}: The Azure IMDS endpoint is available`),!0})}}});
export {dYu,ufe,vBe,cYu,uYu,A1r,uri};
