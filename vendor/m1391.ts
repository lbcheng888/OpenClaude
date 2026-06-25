// @ts-nocheck
import {A4s} from "./m1386.ts";
import {w4s} from "./m1387.ts";
import {G4s,V4s} from "./m1390.ts";
import {g4s,$Ir} from "./m1382.ts";
import {Dpn} from "./m1380.ts";
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {H4s} from "./m1388.ts";
import {iC} from "./m885.ts";
import {yme} from "./m909.ts";
import {Zu} from "./m855.ts";
import {jK} from "./m763.ts";
import {BS} from "./m793.ts";
var K4s,z4s,j4s,Y4s,Lpn,J4s=(e)=>({apiVersion:"2014-06-30",base64Decoder:e?.base64Decoder??A4s,base64Encoder:e?.base64Encoder??w4s,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??G4s,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??g4s,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new K4s.AwsSdkSigV4Signer},{schemeId:"smithy.api#noAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#noAuth")||(async()=>({})),signer:new j4s.NoAuthSigner}],logger:e?.logger??new Dpn,protocol:e?.protocol??new z4s.AwsJson1_1Protocol({defaultNamespace:"com.amazonaws.cognitoidentity",serviceTarget:"AWSCognitoIdentityService",awsQueryCompatible:!1}),serviceId:e?.serviceId??"Cognito Identity",urlParser:e?.urlParser??Y4s.parseUrl,utf8Decoder:e?.utf8Decoder??Lpn.fromUtf8,utf8Encoder:e?.utf8Encoder??Lpn.toUtf8});
var X4s=b(()=>{vy();H4s();$Ir();V4s();K4s=x(iC(),1),z4s=x(yme(),1),j4s=x(Zu(),1),Y4s=x(jK(),1),Lpn=x(BS(),1)});
export {K4s,z4s,j4s,Y4s,Lpn,J4s,X4s};
