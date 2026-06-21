// @ts-nocheck
import {kFs} from "./m1381.ts";
import {DFs} from "./m1382.ts";
import {YFs,JFs} from "./m1385.ts";
import {SFs,pwr} from "./m1377.ts";
import {zcn} from "./m1375.ts";
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {OFs} from "./m1383.ts";
import {nC} from "./m880.ts";
import {ume} from "./m904.ts";
import {Sd} from "./m850.ts";
import {b7} from "./m758.ts";
import {FS} from "./m788.ts";
var XFs,QFs,ZFs,eUs,Xcn,tUs=(e)=>({apiVersion:"2014-06-30",base64Decoder:e?.base64Decoder??kFs,base64Encoder:e?.base64Encoder??DFs,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??YFs,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??SFs,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new XFs.AwsSdkSigV4Signer},{schemeId:"smithy.api#noAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#noAuth")||(async()=>({})),signer:new ZFs.NoAuthSigner}],logger:e?.logger??new zcn,protocol:e?.protocol??new QFs.AwsJson1_1Protocol({defaultNamespace:"com.amazonaws.cognitoidentity",serviceTarget:"AWSCognitoIdentityService",awsQueryCompatible:!1}),serviceId:e?.serviceId??"Cognito Identity",urlParser:e?.urlParser??eUs.parseUrl,utf8Decoder:e?.utf8Decoder??Xcn.fromUtf8,utf8Encoder:e?.utf8Encoder??Xcn.toUtf8});
var nUs=b(()=>{Ry();OFs();pwr();JFs();XFs=M(nC(),1),QFs=M(ume(),1),ZFs=M(Sd(),1),eUs=M(b7(),1),Xcn=M(FS(),1)});
export {XFs,QFs,ZFs,eUs,Xcn,tUs,nUs};
