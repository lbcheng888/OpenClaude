// @ts-nocheck
import {Aln,ows} from "./m1006.ts";
import {b,x} from "../runtime.ts";
import {b0} from "./m756.ts";
import {Vg} from "./m600.ts";
import {ZU} from "./m606.ts";
var sws,iws,Rln,vln=(e)=>async({callerClientConfig:t}={})=>{e?.logger?.debug?.("@aws-sdk/credential-providers - fromLoginCredentials");let n=await Rln.parseKnownFiles(e||{}),r=Rln.getProfileName({profile:e?.profile??t?.profile}),o=n[r];if(!o?.login_session)throw new iws.CredentialsProviderError(`Profile ${r} does not contain login_session.`,{tryNextLink:!0,logger:e?.logger});let i=await new Aln(o,e,t).loadCredentials();return sws.setCredentialFeature(i,"CREDENTIALS_LOGIN","AD")};
var aws=b(()=>{ows();sws=x(b0(),1),iws=x(Vg(),1),Rln=x(ZU(),1)});
export {sws,iws,Rln,vln,aws};
