// @ts-nocheck
import {TDs} from "./m1250.ts";
import {EDs} from "./m1251.ts";
import {FDs,UDs} from "./m1254.ts";
import {X0s,CCr} from "./m1237.ts";
import {_ln} from "./m1235.ts";
import {b,M} from "../runtime.ts";
import {PO} from "./m1236.ts";
import {vDs} from "./m1252.ts";
import {nC} from "./m880.ts";
import {ume} from "./m904.ts";
import {Sd} from "./m850.ts";
import {b7} from "./m758.ts";
import {FS} from "./m788.ts";
var $Ds,qDs,jDs,WDs,Tln,GDs=(e)=>({apiVersion:"2023-09-30",base64Decoder:e?.base64Decoder??TDs,base64Encoder:e?.base64Encoder??EDs,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??FDs,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??X0s,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new $Ds.AwsSdkSigV4Signer},{schemeId:"smithy.api#httpBearerAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#httpBearerAuth"),signer:new jDs.HttpBearerAuthSigner}],logger:e?.logger??new _ln,protocol:e?.protocol??new qDs.AwsRestJsonProtocol({defaultNamespace:"com.amazonaws.bedrockruntime"}),serviceId:e?.serviceId??"Bedrock Runtime",urlParser:e?.urlParser??WDs.parseUrl,utf8Decoder:e?.utf8Decoder??Tln.fromUtf8,utf8Encoder:e?.utf8Encoder??Tln.toUtf8});
var VDs=b(()=>{PO();vDs();CCr();UDs();$Ds=M(nC(),1),qDs=M(ume(),1),jDs=M(Sd(),1),WDs=M(b7(),1),Tln=M(FS(),1)});
export {$Ds,qDs,jDs,WDs,Tln,GDs,VDs};
