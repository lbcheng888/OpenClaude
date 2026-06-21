// @ts-nocheck
import {X} from "../runtime.ts";
import {EKe} from "./m819.ts";
import {Oon} from "./m898.ts";
import {nC} from "./m880.ts";
import {ime} from "./m899.ts";
import {nk} from "./m607.ts";
import {Sd} from "./m850.ts";
import {ame} from "./m902.ts";
import {i1} from "./m894.ts";
import {yB} from "./m601.ts";
import {e4} from "./m750.ts";
import {lme} from "./m903.ts";
import {Ooe} from "./m889.ts";
import {Tys} from "./m987.ts";
import {V2} from "./m896.ts";
import {pme} from "./m913.ts";
var Cys=X((vsn)=>{Object.defineProperty(vsn,"__esModule",{value:!0});vsn.getRuntimeConfig=void 0;var Smu=EKe(),bmu=Smu.__importDefault(Oon()),tSr=nC(),Sys=ime(),Csn=nk(),Emu=Sd(),Cmu=ame(),bys=i1(),b1e=yB(),Eys=e4(),vmu=lme(),wmu=Ooe(),Rmu=Tys(),xmu=V2(),kmu=pme(),Hmu=V2(),Imu=(e)=>{(0,Hmu.emitWarningIfUnsupportedVersion)(process.version);let t=(0,kmu.resolveDefaultsModeConfig)(e),n=()=>t().then(xmu.loadConfigsForDefaultMode),r=(0,Rmu.getRuntimeConfig)(e);(0,tSr.emitWarningIfUnsupportedVersion)(process.version);let o={profile:e?.profile,logger:r.logger};return{...r,...e,runtime:"node",defaultsMode:t,authSchemePreference:e?.authSchemePreference??(0,b1e.loadConfig)(tSr.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS,o),bodyLengthChecker:e?.bodyLengthChecker??vmu.calculateBodyLength,defaultUserAgentProvider:e?.defaultUserAgentProvider??(0,Sys.createDefaultUserAgentProvider)({serviceId:r.serviceId,clientVersion:bmu.default.version}),httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(s)=>s.getIdentityProvider("aws.auth#sigv4")||(async(i)=>await e.credentialDefaultProvider(i?.__config||{})()),signer:new tSr.AwsSdkSigV4Signer},{schemeId:"smithy.api#noAuth",identityProvider:(s)=>s.getIdentityProvider("smithy.api#noAuth")||(async()=>({})),signer:new Emu.NoAuthSigner}],maxAttempts:e?.maxAttempts??(0,b1e.loadConfig)(bys.NODE_MAX_ATTEMPT_CONFIG_OPTIONS,e),region:e?.region??(0,b1e.loadConfig)(Csn.NODE_REGION_CONFIG_OPTIONS,{...Csn.NODE_REGION_CONFIG_FILE_OPTIONS,...o}),requestHandler:Eys.NodeHttpHandler.create(e?.requestHandler??n),retryMode:e?.retryMode??(0,b1e.loadConfig)({...bys.NODE_RETRY_MODE_CONFIG_OPTIONS,default:async()=>(await n()).retryMode||wmu.DEFAULT_RETRY_MODE},e),sha256:e?.sha256??Cmu.Hash.bind(null,"sha256"),streamCollector:e?.streamCollector??Eys.streamCollector,useDualstackEndpoint:e?.useDualstackEndpoint??(0,b1e.loadConfig)(Csn.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS,o),useFipsEndpoint:e?.useFipsEndpoint??(0,b1e.loadConfig)(Csn.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS,o),userAgentAppId:e?.userAgentAppId??(0,b1e.loadConfig)(Sys.NODE_APP_ID_CONFIG_OPTIONS,o)}};vsn.getRuntimeConfig=Imu});
export {Cys};
