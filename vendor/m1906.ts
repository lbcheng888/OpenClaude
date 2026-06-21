// @ts-nocheck
import {rRt} from "./m1713.ts";
import {Ome} from "./m1693.ts";
import {b} from "../runtime.ts";
import {use} from "./m1698.ts";
import {fCe,Npn} from "./m1674.ts";
import {GS,hm} from "./m1631.ts";
import {S1,isKeybindingCustomizationEnabled} from "./m1712.ts";
import {$8} from "./m1694.ts";
function Vqu(e){var t;if(!rRt(e))throw Error(`${tfe}: Multiple scopes are not supported.`);let r=new URL(Gqu,(t=process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST)!==null&&t!==void 0?t:Wqu),o={Accept:"application/json"};return{url:`${r}`,method:"GET",headers:Ome(o)}}
var tfe="ManagedIdentityCredential - IMDS",HBe,Wqu="http://169.254.169.254",Gqu="/metadata/identity/oauth2/token",zDr;
var AXs=b(()=>{use();fCe();GS();S1();HBe=hm(tfe);zDr={name:"imdsMsi",async isAvailable(e){let{scopes:t,identityClient:n,getTokenOptions:r}=e,o=rRt(t);if(!o)return HBe.info(`${tfe}: Unavailable. Multiple scopes are not supported.`),!1;if(process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST)return!0;if(!n)throw Error("Missing IdentityClient");let s=Vqu(o);return isKeybindingCustomizationEnabled.withSpan("ManagedIdentityCredential-pingImdsEndpoint",r!==null&&r!==void 0?r:{},async(i)=>{var a,l;s.tracingOptions=i.tracingOptions;let c=$8(s);c.timeout=((a=i.requestOptions)===null||a===void 0?void 0:a.timeout)||1000,c.allowInsecureConnection=!0;let u;try{HBe.info(`${tfe}: Pinging the Azure IMDS endpoint`),u=await n.sendRequest(c)}catch(d){if(Npn(d))HBe.verbose(`${tfe}: Caught error ${d.name}: ${d.message}`);return HBe.info(`${tfe}: The Azure IMDS endpoint is unavailable`),!1}if(u.status===403){if((l=u.bodyAsText)===null||l===void 0?void 0:l.includes("unreachable"))return HBe.info(`${tfe}: The Azure IMDS endpoint is unavailable`),HBe.info(`${tfe}: ${u.bodyAsText}`),!1}return HBe.info(`${tfe}: The Azure IMDS endpoint is available`),!0})}}});
export {Vqu,tfe,HBe,Wqu,Gqu,zDr,AXs};
