// @ts-nocheck
import {Q} from "../runtime.ts";
import {bYe} from "./m824.ts";
import {_an} from "./m903.ts";
import {iC} from "./m885.ts";
import {fme} from "./m904.ts";
import {yk} from "./m613.ts";
import {hme} from "./m907.ts";
import {TM} from "./m899.ts";
import {$N} from "./m607.ts";
import {T3} from "./m755.ts";
import {gme} from "./m908.ts";
import {Doe} from "./m894.ts";
import {Rvs} from "./m1003.ts";
import {m2} from "./m901.ts";
import {Sme} from "./m918.ts";
var Ivs=Q((Sln)=>{Object.defineProperty(Sln,"__esModule",{value:!0});Sln.getRuntimeConfig=void 0;var WRu=bYe(),GRu=WRu.__importDefault(_an()),vvs=iC(),wvs=fme(),Tln=yk(),VRu=hme(),kvs=TM(),ENe=$N(),Hvs=T3(),KRu=gme(),zRu=Doe(),jRu=Rvs(),YRu=m2(),JRu=Sme(),XRu=m2(),QRu=(e)=>{(0,XRu.emitWarningIfUnsupportedVersion)(process.version);let t=(0,JRu.resolveDefaultsModeConfig)(e),n=()=>t().then(YRu.loadConfigsForDefaultMode),r=(0,jRu.getRuntimeConfig)(e);(0,vvs.emitWarningIfUnsupportedVersion)(process.version);let o={profile:e?.profile,logger:r.logger};return{...r,...e,runtime:"node",defaultsMode:t,authSchemePreference:e?.authSchemePreference??(0,ENe.loadConfig)(vvs.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS,o),bodyLengthChecker:e?.bodyLengthChecker??KRu.calculateBodyLength,defaultUserAgentProvider:e?.defaultUserAgentProvider??(0,wvs.createDefaultUserAgentProvider)({serviceId:r.serviceId,clientVersion:GRu.default.version}),maxAttempts:e?.maxAttempts??(0,ENe.loadConfig)(kvs.NODE_MAX_ATTEMPT_CONFIG_OPTIONS,e),region:e?.region??(0,ENe.loadConfig)(Tln.NODE_REGION_CONFIG_OPTIONS,{...Tln.NODE_REGION_CONFIG_FILE_OPTIONS,...o}),requestHandler:Hvs.NodeHttpHandler.create(e?.requestHandler??n),retryMode:e?.retryMode??(0,ENe.loadConfig)({...kvs.NODE_RETRY_MODE_CONFIG_OPTIONS,default:async()=>(await n()).retryMode||zRu.DEFAULT_RETRY_MODE},e),sha256:e?.sha256??VRu.Hash.bind(null,"sha256"),streamCollector:e?.streamCollector??Hvs.streamCollector,useDualstackEndpoint:e?.useDualstackEndpoint??(0,ENe.loadConfig)(Tln.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS,o),useFipsEndpoint:e?.useFipsEndpoint??(0,ENe.loadConfig)(Tln.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS,o),userAgentAppId:e?.userAgentAppId??(0,ENe.loadConfig)(wvs.NODE_APP_ID_CONFIG_OPTIONS,o)}};Sln.getRuntimeConfig=QRu});
export {Ivs};
