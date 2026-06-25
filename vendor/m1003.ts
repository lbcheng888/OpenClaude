// @ts-nocheck
import {Q} from "../runtime.ts";
import {iC} from "./m885.ts";
import {yme} from "./m909.ts";
import {Zu} from "./m855.ts";
import {m2} from "./m901.ts";
import {jK} from "./m763.ts";
import {Can} from "./m914.ts";
import {BS} from "./m793.ts";
import {URr} from "./m1000.ts";
import {Evs} from "./m1002.ts";
var Rvs=Q((yln)=>{Object.defineProperty(yln,"__esModule",{value:!0});yln.getRuntimeConfig=void 0;var LRu=iC(),MRu=yme(),NRu=Zu(),FRu=m2(),BRu=jK(),Cvs=Can(),Avs=BS(),URu=URr(),$Ru=Evs(),qRu=(e)=>({apiVersion:"2023-01-01",base64Decoder:e?.base64Decoder??Cvs.fromBase64,base64Encoder:e?.base64Encoder??Cvs.toBase64,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??$Ru.defaultEndpointResolver,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??URu.defaultSigninHttpAuthSchemeProvider,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new LRu.AwsSdkSigV4Signer},{schemeId:"smithy.api#noAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#noAuth")||(async()=>({})),signer:new NRu.NoAuthSigner}],logger:e?.logger??new FRu.NoOpLogger,protocol:e?.protocol??new MRu.AwsRestJsonProtocol({defaultNamespace:"com.amazonaws.signin"}),serviceId:e?.serviceId??"Signin",urlParser:e?.urlParser??BRu.parseUrl,utf8Decoder:e?.utf8Decoder??Avs.fromUtf8,utf8Encoder:e?.utf8Encoder??Avs.toUtf8});yln.getRuntimeConfig=qRu});
export {Rvs};
