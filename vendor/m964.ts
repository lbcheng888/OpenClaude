// @ts-nocheck
import {yCs} from "./m959.ts";
import {bCs} from "./m960.ts";
import {FCs,BCs} from "./m963.ts";
import {uCs,lRr} from "./m955.ts";
import {Nan} from "./m953.ts";
import {b,x} from "../runtime.ts";
import {n7} from "./m954.ts";
import {CCs} from "./m961.ts";
import {iC} from "./m885.ts";
import {yme} from "./m909.ts";
import {Zu} from "./m855.ts";
import {jK} from "./m763.ts";
import {BS} from "./m793.ts";
var UCs,$Cs,qCs,WCs,Uan,GCs=(e)=>({apiVersion:"2019-06-10",base64Decoder:e?.base64Decoder??yCs,base64Encoder:e?.base64Encoder??bCs,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??FCs,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??uCs,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new UCs.AwsSdkSigV4Signer},{schemeId:"smithy.api#noAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#noAuth")||(async()=>({})),signer:new qCs.NoAuthSigner}],logger:e?.logger??new Nan,protocol:e?.protocol??new $Cs.AwsRestJsonProtocol({defaultNamespace:"com.amazonaws.sso"}),serviceId:e?.serviceId??"SSO",urlParser:e?.urlParser??WCs.parseUrl,utf8Decoder:e?.utf8Decoder??Uan.fromUtf8,utf8Encoder:e?.utf8Encoder??Uan.toUtf8});
var VCs=b(()=>{n7();CCs();lRr();BCs();UCs=x(iC(),1),$Cs=x(yme(),1),qCs=x(Zu(),1),WCs=x(jK(),1),Uan=x(BS(),1)});
export {UCs,$Cs,qCs,WCs,Uan,GCs,VCs};
