// @ts-nocheck
import {X} from "../runtime.ts";
import {nC} from "./m880.ts";
import {ume} from "./m904.ts";
import {Sd} from "./m850.ts";
import {V2} from "./m896.ts";
import {b7} from "./m758.ts";
import {Uon} from "./m909.ts";
import {FS} from "./m788.ts";
import {dSr} from "./m995.ts";
import {xTs} from "./m997.ts";
var ITs=X((Lsn)=>{Object.defineProperty(Lsn,"__esModule",{value:!0});Lsn.getRuntimeConfig=void 0;var yAu=nC(),TAu=ume(),SAu=Sd(),bAu=V2(),EAu=b7(),kTs=Uon(),HTs=FS(),CAu=dSr(),vAu=xTs(),wAu=(e)=>({apiVersion:"2023-01-01",base64Decoder:e?.base64Decoder??kTs.fromBase64,base64Encoder:e?.base64Encoder??kTs.toBase64,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??vAu.defaultEndpointResolver,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??CAu.defaultSigninHttpAuthSchemeProvider,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new yAu.AwsSdkSigV4Signer},{schemeId:"smithy.api#noAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#noAuth")||(async()=>({})),signer:new SAu.NoAuthSigner}],logger:e?.logger??new bAu.NoOpLogger,protocol:e?.protocol??new TAu.AwsRestJsonProtocol({defaultNamespace:"com.amazonaws.signin"}),serviceId:e?.serviceId??"Signin",urlParser:e?.urlParser??EAu.parseUrl,utf8Decoder:e?.utf8Decoder??HTs.fromUtf8,utf8Encoder:e?.utf8Encoder??HTs.toUtf8});Lsn.getRuntimeConfig=wAu});
export {ITs};
