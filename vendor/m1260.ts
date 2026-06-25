// @ts-nocheck
import {fNs} from "./m1255.ts";
import {_Ns} from "./m1256.ts";
import {PNs,ONs} from "./m1259.ts";
import {V1s,Zkr} from "./m1242.ts";
import {ndn} from "./m1240.ts";
import {b,x} from "../runtime.ts";
import {QP} from "./m1241.ts";
import {TNs} from "./m1257.ts";
import {iC} from "./m885.ts";
import {yme} from "./m909.ts";
import {Zu} from "./m855.ts";
import {jK} from "./m763.ts";
import {BS} from "./m793.ts";
var LNs,MNs,NNs,FNs,odn,BNs=(e)=>({apiVersion:"2023-09-30",base64Decoder:e?.base64Decoder??fNs,base64Encoder:e?.base64Encoder??_Ns,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??PNs,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??V1s,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new LNs.AwsSdkSigV4Signer},{schemeId:"smithy.api#httpBearerAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#httpBearerAuth"),signer:new NNs.HttpBearerAuthSigner}],logger:e?.logger??new ndn,protocol:e?.protocol??new MNs.AwsRestJsonProtocol({defaultNamespace:"com.amazonaws.bedrockruntime"}),serviceId:e?.serviceId??"Bedrock Runtime",urlParser:e?.urlParser??FNs.parseUrl,utf8Decoder:e?.utf8Decoder??odn.fromUtf8,utf8Encoder:e?.utf8Encoder??odn.toUtf8});
var UNs=b(()=>{QP();TNs();Zkr();ONs();LNs=x(iC(),1),MNs=x(yme(),1),NNs=x(Zu(),1),FNs=x(jK(),1),odn=x(BS(),1)});
export {LNs,MNs,NNs,FNs,odn,BNs,UNs};
