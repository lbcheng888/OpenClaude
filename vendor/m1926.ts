// @ts-nocheck
import {b} from "../runtime.ts";
import {k_n,WorkloadIdentityCredential} from "./m1925.ts";
import {VS,Lp} from "./m1636.ts";
var Wri="ManagedIdentityCredential - Token Exchange",IYu,V1r;
var Gri=b(()=>{k_n();VS();IYu=Lp(Wri),V1r={name:"tokenExchangeMsi",async isAvailable(e){let t=process.env,n=Boolean((e||t.AZURE_CLIENT_ID)&&t.AZURE_TENANT_ID&&process.env.AZURE_FEDERATED_TOKEN_FILE);if(!n)IYu.info(`${Wri}: Unavailable. The environment variables needed are: AZURE_CLIENT_ID (or the client ID sent through the parameters), AZURE_TENANT_ID and AZURE_FEDERATED_TOKEN_FILE`);return n},async getToken(e,t={}){let{scopes:n,clientId:r}=e,o={};return new WorkloadIdentityCredential(Object.assign(Object.assign({clientId:r,tenantId:process.env.AZURE_TENANT_ID,tokenFilePath:process.env.AZURE_FEDERATED_TOKEN_FILE},o),{disableInstanceDiscovery:!0})).getToken(n,t)}}});
export {Wri,IYu,V1r,Gri};
