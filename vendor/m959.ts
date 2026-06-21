// @ts-nocheck
import {Cgs} from "./m954.ts";
import {Rgs} from "./m955.ts";
import {Wgs,Ggs} from "./m958.ts";
import {hgs,PTr} from "./m950.ts";
import {esn} from "./m948.ts";
import {b,M} from "../runtime.ts";
import {H7} from "./m949.ts";
import {kgs} from "./m956.ts";
import {nC} from "./m880.ts";
import {ume} from "./m904.ts";
import {Sd} from "./m850.ts";
import {b7} from "./m758.ts";
import {FS} from "./m788.ts";
var Vgs,Kgs,zgs,Ygs,rsn,Jgs=(e)=>({apiVersion:"2019-06-10",base64Decoder:e?.base64Decoder??Cgs,base64Encoder:e?.base64Encoder??Rgs,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??Wgs,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??hgs,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new Vgs.AwsSdkSigV4Signer},{schemeId:"smithy.api#noAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#noAuth")||(async()=>({})),signer:new zgs.NoAuthSigner}],logger:e?.logger??new esn,protocol:e?.protocol??new Kgs.AwsRestJsonProtocol({defaultNamespace:"com.amazonaws.sso"}),serviceId:e?.serviceId??"SSO",urlParser:e?.urlParser??Ygs.parseUrl,utf8Decoder:e?.utf8Decoder??rsn.fromUtf8,utf8Encoder:e?.utf8Encoder??rsn.toUtf8});
var Xgs=b(()=>{H7();kgs();PTr();Ggs();Vgs=M(nC(),1),Kgs=M(ume(),1),zgs=M(Sd(),1),Ygs=M(b7(),1),rsn=M(FS(),1)});
export {Vgs,Kgs,zgs,Ygs,rsn,Jgs,Xgs};
