// @ts-nocheck
import {Evt,Vds} from "./m785.ts";
import {yA,$fs} from "./m845.ts";
import {b,x} from "../runtime.ts";
import {Vg} from "./m600.ts";
import {aEr} from "./m820.ts";
function Wfs(e){return new Evt({protocol:e.protocol,hostname:e.hostname,port:Number(e.port),path:e.pathname,query:Array.from(e.searchParams.entries()).reduce((t,[n,r])=>(t[n]=r,t),{}),fragment:e.hash})}
async function Gfs(e,t){let r=await qfs.sdkStreamMixin(e.body).transformToString();if(e.statusCode===200){let o=JSON.parse(r);if(typeof o.AccessKeyId!=="string"||typeof o.SecretAccessKey!=="string"||typeof o.Token!=="string"||typeof o.Expiration!=="string")throw new Rin.CredentialsProviderError("HTTP credential provider response not of the required format, an object matching: { AccessKeyId: string, SecretAccessKey: string, Token: string, Expiration: string(rfc3339) }",{logger:t});return{accessKeyId:o.AccessKeyId,secretAccessKey:o.SecretAccessKey,sessionToken:o.Token,expiration:yA.parseRfc3339DateTime(o.Expiration)}}if(e.statusCode>=400&&e.statusCode<500){let o={};try{o=JSON.parse(r)}catch(s){}throw Object.assign(new Rin.CredentialsProviderError(`Server responded with status: ${e.statusCode}`,{logger:t}),{Code:o.Code,Message:o.Message})}throw new Rin.CredentialsProviderError(`Server responded with status: ${e.statusCode}`,{logger:t})}
var Rin,qfs;
var Vfs=b(()=>{Vds();$fs();Rin=x(Vg(),1),qfs=x(aEr(),1)});
export {Wfs,Gfs,Rin,qfs,Vfs};
