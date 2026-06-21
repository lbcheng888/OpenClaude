// @ts-nocheck
import {X} from "../runtime.ts";
import {nC} from "./m880.ts";
import {ume} from "./m904.ts";
import {Sd} from "./m850.ts";
import {V2} from "./m896.ts";
import {b7} from "./m758.ts";
import {Uon} from "./m909.ts";
import {FS} from "./m788.ts";
import {Qyr} from "./m897.ts";
import {vfs} from "./m911.ts";
var xfs=X((jon)=>{Object.defineProperty(jon,"__esModule",{value:!0});jon.getRuntimeConfig=void 0;var huu=nC(),guu=ume(),_uu=Sd(),yuu=V2(),Tuu=b7(),wfs=Uon(),Rfs=FS(),Suu=Qyr(),buu=vfs(),Euu=(e)=>({apiVersion:"2019-06-10",base64Decoder:e?.base64Decoder??wfs.fromBase64,base64Encoder:e?.base64Encoder??wfs.toBase64,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??buu.defaultEndpointResolver,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??Suu.defaultSSOOIDCHttpAuthSchemeProvider,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new huu.AwsSdkSigV4Signer},{schemeId:"smithy.api#noAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#noAuth")||(async()=>({})),signer:new _uu.NoAuthSigner}],logger:e?.logger??new yuu.NoOpLogger,protocol:e?.protocol??new guu.AwsRestJsonProtocol({defaultNamespace:"com.amazonaws.ssooidc"}),serviceId:e?.serviceId??"SSO OIDC",urlParser:e?.urlParser??Tuu.parseUrl,utf8Decoder:e?.utf8Decoder??Rfs.fromUtf8,utf8Encoder:e?.utf8Encoder??Rfs.toUtf8});jon.getRuntimeConfig=Euu});
export {xfs};
