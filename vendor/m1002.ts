// @ts-nocheck
import {$sn,uSs} from "./m1001.ts";
import {b,M} from "../runtime.ts";
import {r0} from "./m751.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
import {I2} from "./m600.ts";
var dSs,pSs,qsn,jsn=(e)=>async({callerClientConfig:t}={})=>{e?.logger?.debug?.("@aws-sdk/credential-providers - fromLoginCredentials");let n=await qsn.parseKnownFiles(e||{}),r=qsn.getProfileName({profile:e?.profile??t?.profile}),o=n[r];if(!o?.login_session)throw new pSs.CredentialsProviderError(`Profile ${r} does not contain login_session.`,{tryNextLink:!0,logger:e?.logger});let i=await new $sn(o,e,t).loadCredentials();return dSs.setCredentialFeature(i,"CREDENTIALS_LOGIN","AD")};
var mSs=b(()=>{uSs();dSs=M(r0(),1),pSs=M(createDefaultGlobalConfig(),1),qsn=M(I2(),1)});
export {dSs,pSs,qsn,jsn,mSs};
