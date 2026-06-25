// @ts-nocheck
import {Q} from "../runtime.ts";
import {iC} from "./m885.ts";
import {yme} from "./m909.ts";
import {Zu} from "./m855.ts";
import {m2} from "./m901.ts";
import {jK} from "./m763.ts";
import {Can} from "./m914.ts";
import {BS} from "./m793.ts";
import {wAr} from "./m902.ts";
import {TSs} from "./m916.ts";
var ESs=Q((van)=>{Object.defineProperty(van,"__esModule",{value:!0});van.getRuntimeConfig=void 0;var DSu=iC(),PSu=yme(),OSu=Zu(),LSu=m2(),MSu=jK(),SSs=Can(),bSs=BS(),NSu=wAr(),FSu=TSs(),BSu=(e)=>({apiVersion:"2019-06-10",base64Decoder:e?.base64Decoder??SSs.fromBase64,base64Encoder:e?.base64Encoder??SSs.toBase64,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??FSu.defaultEndpointResolver,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??NSu.defaultSSOOIDCHttpAuthSchemeProvider,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new DSu.AwsSdkSigV4Signer},{schemeId:"smithy.api#noAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#noAuth")||(async()=>({})),signer:new OSu.NoAuthSigner}],logger:e?.logger??new LSu.NoOpLogger,protocol:e?.protocol??new PSu.AwsRestJsonProtocol({defaultNamespace:"com.amazonaws.ssooidc"}),serviceId:e?.serviceId??"SSO OIDC",urlParser:e?.urlParser??MSu.parseUrl,utf8Decoder:e?.utf8Decoder??bSs.fromUtf8,utf8Encoder:e?.utf8Encoder??bSs.toUtf8});van.getRuntimeConfig=BSu});
export {ESs};
