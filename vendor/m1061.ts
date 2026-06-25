// @ts-nocheck
import {ZHs} from "./m1056.ts";
import {nIs} from "./m1057.ts";
import {yIs,TIs} from "./m1060.ts";
import {VHs,kvr} from "./m1052.ts";
import {Fln} from "./m1050.ts";
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {oIs} from "./m1058.ts";
import {iC} from "./m885.ts";
import {yme} from "./m909.ts";
import {Zu} from "./m855.ts";
import {jK} from "./m763.ts";
import {BS} from "./m793.ts";
var SIs,bIs,EIs,CIs,Uln,AIs=(e)=>({apiVersion:"2023-04-20",base64Decoder:e?.base64Decoder??ZHs,base64Encoder:e?.base64Encoder??nIs,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??yIs,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??VHs,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new SIs.AwsSdkSigV4Signer},{schemeId:"smithy.api#httpBearerAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#httpBearerAuth"),signer:new EIs.HttpBearerAuthSigner}],logger:e?.logger??new Fln,protocol:e?.protocol??new bIs.AwsRestJsonProtocol({defaultNamespace:"com.amazonaws.bedrock"}),serviceId:e?.serviceId??"Bedrock",urlParser:e?.urlParser??CIs.parseUrl,utf8Decoder:e?.utf8Decoder??Uln.fromUtf8,utf8Encoder:e?.utf8Encoder??Uln.toUtf8});
var RIs=b(()=>{$s();oIs();kvr();TIs();SIs=x(iC(),1),bIs=x(yme(),1),EIs=x(Zu(),1),CIs=x(jK(),1),Uln=x(BS(),1)});
export {SIs,bIs,EIs,CIs,Uln,AIs,RIs};
