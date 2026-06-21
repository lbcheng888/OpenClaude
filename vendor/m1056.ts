// @ts-nocheck
import {sCs} from "./m1051.ts";
import {lCs} from "./m1052.ts";
import {CCs,vCs} from "./m1055.ts";
import {XEs,ZSr} from "./m1047.ts";
import {tin} from "./m1045.ts";
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {uCs} from "./m1053.ts";
import {nC} from "./m880.ts";
import {ume} from "./m904.ts";
import {Sd} from "./m850.ts";
import {b7} from "./m758.ts";
import {FS} from "./m788.ts";
var wCs,RCs,xCs,kCs,rin,HCs=(e)=>({apiVersion:"2023-04-20",base64Decoder:e?.base64Decoder??sCs,base64Encoder:e?.base64Encoder??lCs,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??CCs,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??XEs,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new wCs.AwsSdkSigV4Signer},{schemeId:"smithy.api#httpBearerAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#httpBearerAuth"),signer:new xCs.HttpBearerAuthSigner}],logger:e?.logger??new tin,protocol:e?.protocol??new RCs.AwsRestJsonProtocol({defaultNamespace:"com.amazonaws.bedrock"}),serviceId:e?.serviceId??"Bedrock",urlParser:e?.urlParser??kCs.parseUrl,utf8Decoder:e?.utf8Decoder??rin.fromUtf8,utf8Encoder:e?.utf8Encoder??rin.toUtf8});
var ICs=b(()=>{ri();uCs();ZSr();vCs();wCs=M(nC(),1),RCs=M(ume(),1),xCs=M(Sd(),1),kCs=M(b7(),1),rin=M(FS(),1)});
export {wCs,RCs,xCs,kCs,rin,HCs,ICs};
