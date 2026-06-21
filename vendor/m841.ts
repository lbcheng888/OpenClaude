// @ts-nocheck
import {YEt,Xss} from "./m780.ts";
import {uv,Kls} from "./m840.ts";
import {b,M} from "../runtime.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
import {Dgr} from "./m815.ts";
function Yls(e){return new YEt({protocol:e.protocol,hostname:e.hostname,port:Number(e.port),path:e.pathname,query:Array.from(e.searchParams.entries()).reduce((t,[n,r])=>(t[n]=r,t),{}),fragment:e.hash})}
async function Jls(e,t){let r=await zls.sdkStreamMixin(e.body).transformToString();if(e.statusCode===200){let o=JSON.parse(r);if(typeof o.AccessKeyId!=="string"||typeof o.SecretAccessKey!=="string"||typeof o.Token!=="string"||typeof o.Expiration!=="string")throw new qrn.CredentialsProviderError("HTTP credential provider response not of the required format, an object matching: { AccessKeyId: string, SecretAccessKey: string, Token: string, Expiration: string(rfc3339) }",{logger:t});return{accessKeyId:o.AccessKeyId,secretAccessKey:o.SecretAccessKey,sessionToken:o.Token,expiration:uv.parseRfc3339DateTime(o.Expiration)}}if(e.statusCode>=400&&e.statusCode<500){let o={};try{o=JSON.parse(r)}catch(s){}throw Object.assign(new qrn.CredentialsProviderError(`Server responded with status: ${e.statusCode}`,{logger:t}),{Code:o.Code,Message:o.Message})}throw new qrn.CredentialsProviderError(`Server responded with status: ${e.statusCode}`,{logger:t})}
var qrn,zls;
var Xls=b(()=>{Xss();Kls();qrn=M(createDefaultGlobalConfig(),1),zls=M(Dgr(),1)});
export {Yls,Jls,qrn,zls,Xls};
