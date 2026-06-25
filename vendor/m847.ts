// @ts-nocheck
import {Cus,Aus} from "./m771.ts";
import {Wfs,Gfs,Vfs} from "./m846.ts";
import {b,x} from "../runtime.ts";
import {b0} from "./m756.ts";
import {T3} from "./m755.ts";
import {Vg} from "./m600.ts";
var Kfs=(e,t,n)=>async()=>{for(let r=0;r<t;++r)try{return await e()}catch(o){await new Promise((s)=>setTimeout(s,n))}return await e()};
var zfs,jfs,BEr,Yfs,Gmu="AWS_CONTAINER_CREDENTIALS_RELATIVE_URI",Vmu="http://169.254.170.2",Kmu="AWS_CONTAINER_CREDENTIALS_FULL_URI",zmu="AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE",jmu="AWS_CONTAINER_AUTHORIZATION_TOKEN",fromHttp=(e={})=>{e.logger?.debug("@aws-sdk/credential-provider-http - fromHttp");let t,n=e.awsContainerCredentialsRelativeUri??process.env[Gmu],r=e.awsContainerCredentialsFullUri??process.env[Kmu],o=e.awsContainerAuthorizationToken??process.env[jmu],s=e.awsContainerAuthorizationTokenFile??process.env[zmu],i=e.logger?.constructor?.name==="NoOpLogger"||!e.logger?.warn?console.warn:e.logger.warn.bind(e.logger);if(n&&r)i("@aws-sdk/credential-provider-http: you have set both awsContainerCredentialsRelativeUri and awsContainerCredentialsFullUri."),i("awsContainerCredentialsFullUri will take precedence.");if(o&&s)i("@aws-sdk/credential-provider-http: you have set both awsContainerAuthorizationToken and awsContainerAuthorizationTokenFile."),i("awsContainerAuthorizationToken will take precedence.");if(r)t=r;else if(n)t=`${Vmu}${n}`;else throw new BEr.CredentialsProviderError(`No HTTP credential provider host provided.
Set AWS_CONTAINER_CREDENTIALS_FULL_URI or AWS_CONTAINER_CREDENTIALS_RELATIVE_URI.`,{logger:e.logger});let a=new URL(t);Cus(a,e.logger);let l=jfs.NodeHttpHandler.create({requestTimeout:e.timeout??1000,connectionTimeout:e.timeout??1000});return Kfs(async()=>{let c=Wfs(a);if(o)c.headers.Authorization=o;else if(s)c.headers.Authorization=(await Yfs.default.readFile(s)).toString();try{let u=await l.handle(c);return Gfs(u.response).then((d)=>zfs.setCredentialFeature(d,"CREDENTIALS_HTTP","z"))}catch(u){throw new BEr.CredentialsProviderError(String(u),{logger:e.logger})}},e.maxRetries??3,e.timeout??1000)};
var Jfs=b(()=>{Aus();Vfs();zfs=x(b0(),1),jfs=x(T3(),1),BEr=x(Vg(),1),Yfs=x(require("fs/promises"))});
export {Kfs,zfs,jfs,BEr,Yfs,Gmu,Vmu,Kmu,zmu,jmu,fromHttp,Jfs};
