// @ts-nocheck
import {M2s} from "./m1327.ts";
import {B2s} from "./m1328.ts";
import {i$s,a$s} from "./m1331.ts";
import {k2s,fIr} from "./m1323.ts";
import {opn} from "./m1321.ts";
import {b,x} from "../runtime.ts";
import {rD} from "./m1322.ts";
import {$2s} from "./m1329.ts";
import {iC} from "./m885.ts";
import {yme} from "./m909.ts";
import {Zu} from "./m855.ts";
import {jK} from "./m763.ts";
import {BS} from "./m793.ts";
var l$s,c$s,u$s,d$s,ipn,p$s=(e)=>({apiVersion:"2011-06-15",base64Decoder:e?.base64Decoder??M2s,base64Encoder:e?.base64Encoder??B2s,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??i$s,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??k2s,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new l$s.AwsSdkSigV4Signer},{schemeId:"smithy.api#noAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#noAuth")||(async()=>({})),signer:new u$s.NoAuthSigner}],logger:e?.logger??new opn,protocol:e?.protocol??new c$s.AwsQueryProtocol({defaultNamespace:"com.amazonaws.sts",xmlNamespace:"https://sts.amazonaws.com/doc/2011-06-15/",version:"2011-06-15"}),serviceId:e?.serviceId??"STS",urlParser:e?.urlParser??d$s.parseUrl,utf8Decoder:e?.utf8Decoder??ipn.fromUtf8,utf8Encoder:e?.utf8Encoder??ipn.toUtf8});
var m$s=b(()=>{rD();$2s();fIr();a$s();l$s=x(iC(),1),c$s=x(yme(),1),u$s=x(Zu(),1),d$s=x(jK(),1),ipn=x(BS(),1)});
export {l$s,c$s,u$s,d$s,ipn,p$s,m$s};
