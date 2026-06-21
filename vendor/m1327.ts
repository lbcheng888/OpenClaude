// @ts-nocheck
import {$Ms} from "./m1322.ts";
import {WMs} from "./m1323.ts";
import {d1s,p1s} from "./m1326.ts";
import {PMs,Fvr} from "./m1318.ts";
import {Tcn} from "./m1316.ts";
import {b,M} from "../runtime.ts";
import {GD} from "./m1317.ts";
import {VMs} from "./m1324.ts";
import {nC} from "./m880.ts";
import {ume} from "./m904.ts";
import {Sd} from "./m850.ts";
import {b7} from "./m758.ts";
import {FS} from "./m788.ts";
var m1s,f1s,A1s,h1s,bcn,g1s=(e)=>({apiVersion:"2011-06-15",base64Decoder:e?.base64Decoder??$Ms,base64Encoder:e?.base64Encoder??WMs,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??d1s,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??PMs,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new m1s.AwsSdkSigV4Signer},{schemeId:"smithy.api#noAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#noAuth")||(async()=>({})),signer:new A1s.NoAuthSigner}],logger:e?.logger??new Tcn,protocol:e?.protocol??new f1s.AwsQueryProtocol({defaultNamespace:"com.amazonaws.sts",xmlNamespace:"https://sts.amazonaws.com/doc/2011-06-15/",version:"2011-06-15"}),serviceId:e?.serviceId??"STS",urlParser:e?.urlParser??h1s.parseUrl,utf8Decoder:e?.utf8Decoder??bcn.fromUtf8,utf8Encoder:e?.utf8Encoder??bcn.toUtf8});
var _1s=b(()=>{GD();VMs();Fvr();p1s();m1s=M(nC(),1),f1s=M(ume(),1),A1s=M(Sd(),1),h1s=M(b7(),1),bcn=M(FS(),1)});
export {m1s,f1s,A1s,h1s,bcn,g1s,_1s};
