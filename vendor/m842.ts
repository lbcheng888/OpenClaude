// @ts-nocheck
import {kos,Hos} from "./m766.ts";
import {Yls,Jls,Xls} from "./m841.ts";
import {b,M} from "../runtime.ts";
import {r0} from "./m751.ts";
import {e4} from "./m750.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
var Qls=(e,t,n)=>async()=>{for(let r=0;r<t;++r)try{return await e()}catch(o){await new Promise((s)=>setTimeout(s,n))}return await e()};
var Zls,ecs,u_r,tcs,xru="AWS_CONTAINER_CREDENTIALS_RELATIVE_URI",kru="http://169.254.170.2",Hru="AWS_CONTAINER_CREDENTIALS_FULL_URI",Iru="AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE",Dru="AWS_CONTAINER_AUTHORIZATION_TOKEN",fromHttp=(e={})=>{e.logger?.debug("@aws-sdk/credential-provider-http - fromHttp");let t,n=e.awsContainerCredentialsRelativeUri??process.env[xru],r=e.awsContainerCredentialsFullUri??process.env[Hru],o=e.awsContainerAuthorizationToken??process.env[Dru],s=e.awsContainerAuthorizationTokenFile??process.env[Iru],i=e.logger?.constructor?.name==="NoOpLogger"||!e.logger?.warn?console.warn:e.logger.warn.bind(e.logger);if(n&&r)i("@aws-sdk/credential-provider-http: you have set both awsContainerCredentialsRelativeUri and awsContainerCredentialsFullUri."),i("awsContainerCredentialsFullUri will take precedence.");if(o&&s)i("@aws-sdk/credential-provider-http: you have set both awsContainerAuthorizationToken and awsContainerAuthorizationTokenFile."),i("awsContainerAuthorizationToken will take precedence.");if(r)t=r;else if(n)t=`${kru}${n}`;else throw new u_r.CredentialsProviderError(`No HTTP credential provider host provided.
Set AWS_CONTAINER_CREDENTIALS_FULL_URI or AWS_CONTAINER_CREDENTIALS_RELATIVE_URI.`,{logger:e.logger});let a=new URL(t);kos(a,e.logger);let l=ecs.NodeHttpHandler.create({requestTimeout:e.timeout??1000,connectionTimeout:e.timeout??1000});return Qls(async()=>{let c=Yls(a);if(o)c.headers.Authorization=o;else if(s)c.headers.Authorization=(await tcs.default.readFile(s)).toString();try{let u=await l.handle(c);return Jls(u.response).then((d)=>Zls.setCredentialFeature(d,"CREDENTIALS_HTTP","z"))}catch(u){throw new u_r.CredentialsProviderError(String(u),{logger:e.logger})}},e.maxRetries??3,e.timeout??1000)};
var ncs=b(()=>{Hos();Xls();Zls=M(r0(),1),ecs=M(e4(),1),u_r=M(createDefaultGlobalConfig(),1),tcs=M(require("fs/promises"))});
export {Qls,Zls,ecs,u_r,tcs,xru,kru,Hru,Iru,Dru,fromHttp,ncs};
