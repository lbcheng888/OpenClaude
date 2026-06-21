// @ts-nocheck
import {X} from "../runtime.ts";
import {nC} from "./m880.ts";
import {ume} from "./m904.ts";
import {Sd} from "./m850.ts";
import {V2} from "./m896.ts";
import {b7} from "./m758.ts";
import {Uon} from "./m909.ts";
import {FS} from "./m788.ts";
import {zTr} from "./m983.ts";
import {gys} from "./m986.ts";
var Tys=X((Esn)=>{Object.defineProperty(Esn,"__esModule",{value:!0});Esn.getRuntimeConfig=void 0;var mmu=nC(),fmu=ume(),Amu=Sd(),hmu=V2(),gmu=b7(),_ys=Uon(),yys=FS(),_mu=zTr(),ymu=gys(),Tmu=(e)=>({apiVersion:"2011-06-15",base64Decoder:e?.base64Decoder??_ys.fromBase64,base64Encoder:e?.base64Encoder??_ys.toBase64,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??ymu.defaultEndpointResolver,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??_mu.defaultSTSHttpAuthSchemeProvider,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(t)=>t.getIdentityProvider("aws.auth#sigv4"),signer:new mmu.AwsSdkSigV4Signer},{schemeId:"smithy.api#noAuth",identityProvider:(t)=>t.getIdentityProvider("smithy.api#noAuth")||(async()=>({})),signer:new Amu.NoAuthSigner}],logger:e?.logger??new hmu.NoOpLogger,protocol:e?.protocol??new fmu.AwsQueryProtocol({defaultNamespace:"com.amazonaws.sts",xmlNamespace:"https://sts.amazonaws.com/doc/2011-06-15/",version:"2011-06-15"}),serviceId:e?.serviceId??"STS",urlParser:e?.urlParser??gmu.parseUrl,utf8Decoder:e?.utf8Decoder??yys.fromUtf8,utf8Encoder:e?.utf8Encoder??yys.toUtf8});Esn.getRuntimeConfig=Tmu});
export {Tys};
