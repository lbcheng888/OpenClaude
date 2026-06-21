// @ts-nocheck
import {b} from "../runtime.ts";
import {Vfn,WorkloadIdentityCredential} from "./m1920.ts";
import {GS,hm} from "./m1631.ts";
var zXs="ManagedIdentityCredential - Token Exchange",d6u,APr;
var YXs=b(()=>{Vfn();GS();d6u=hm(zXs),APr={name:"tokenExchangeMsi",async isAvailable(e){let t=process.env,n=Boolean((e||t.AZURE_CLIENT_ID)&&t.AZURE_TENANT_ID&&process.env.AZURE_FEDERATED_TOKEN_FILE);if(!n)d6u.info(`${zXs}: Unavailable. The environment variables needed are: AZURE_CLIENT_ID (or the client ID sent through the parameters), AZURE_TENANT_ID and AZURE_FEDERATED_TOKEN_FILE`);return n},async getToken(e,t={}){let{scopes:n,clientId:r}=e,o={};return new WorkloadIdentityCredential(Object.assign(Object.assign({clientId:r,tenantId:process.env.AZURE_TENANT_ID,tokenFilePath:process.env.AZURE_FEDERATED_TOKEN_FILE},o),{disableInstanceDiscovery:!0})).getToken(n,t)}}});
export {zXs,d6u,APr,YXs};
