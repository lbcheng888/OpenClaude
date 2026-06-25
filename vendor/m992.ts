// @ts-nocheck
import {Q} from "../runtime.ts";
import {iC} from "./m885.ts";
import {yme} from "./m909.ts";
import {Zu} from "./m855.ts";
import {m2} from "./m901.ts";
import {jK} from "./m763.ts";
import {Can} from "./m914.ts";
import {BS} from "./m793.ts";
import {CRr} from "./m988.ts";
import {dRs} from "./m991.ts";
var fRs=Q((iln)=>{Object.defineProperty(iln,"__esModule",{value:!0});iln.getRuntimeConfig=void 0;var HCu=iC(),ICu=yme(),xCu=Zu(),DCu=m2(),PCu=jK(),pRs=Can(),mRs=BS(),OCu=CRr(),LCu=dRs(),MCu=(e)=>({apiVersion:"2011-06-15",base64Decoder:e?.base64Decoder??pRs.fromBase64,base64Encoder:e?.base64Encoder??pRs.toBase64,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??LCu.defaultEndpointResolver,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??OCu.defaultSTSHttpAuthSchemeProvider,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new HCu.AwsSdkSigV4Signer},{schemeId:"smithy.api#noAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#noAuth")||(async()=>({})),signer:new xCu.NoAuthSigner}],logger:e?.logger??new DCu.NoOpLogger,protocol:e?.protocol??new ICu.AwsQueryProtocol({defaultNamespace:"com.amazonaws.sts",xmlNamespace:"https://sts.amazonaws.com/doc/2011-06-15/",version:"2011-06-15"}),serviceId:e?.serviceId??"STS",urlParser:e?.urlParser??PCu.parseUrl,utf8Decoder:e?.utf8Decoder??mRs.fromUtf8,utf8Encoder:e?.utf8Encoder??mRs.toUtf8});iln.getRuntimeConfig=MCu});
export {fRs};
