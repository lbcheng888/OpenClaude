// @ts-nocheck
import {X} from "../runtime.ts";
import {EKe} from "./m819.ts";
import {Oon} from "./m898.ts";
import {nC} from "./m880.ts";
import {ime} from "./m899.ts";
import {nk} from "./m607.ts";
import {ame} from "./m902.ts";
import {i1} from "./m894.ts";
import {yB} from "./m601.ts";
import {e4} from "./m750.ts";
import {lme} from "./m903.ts";
import {Ooe} from "./m889.ts";
import {ITs} from "./m998.ts";
import {V2} from "./m896.ts";
import {pme} from "./m913.ts";
var MTs=X((Nsn)=>{Object.defineProperty(Nsn,"__esModule",{value:!0});Nsn.getRuntimeConfig=void 0;var RAu=EKe(),xAu=RAu.__importDefault(Oon()),DTs=nC(),PTs=ime(),Msn=nk(),kAu=ame(),OTs=i1(),k1e=yB(),LTs=e4(),HAu=lme(),IAu=Ooe(),DAu=ITs(),PAu=V2(),OAu=pme(),LAu=V2(),MAu=(e)=>{(0,LAu.emitWarningIfUnsupportedVersion)(process.version);let t=(0,OAu.resolveDefaultsModeConfig)(e),n=()=>t().then(PAu.loadConfigsForDefaultMode),r=(0,DAu.getRuntimeConfig)(e);(0,DTs.emitWarningIfUnsupportedVersion)(process.version);let o={profile:e?.profile,logger:r.logger};return{...r,...e,runtime:"node",defaultsMode:t,authSchemePreference:e?.authSchemePreference??(0,k1e.loadConfig)(DTs.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS,o),bodyLengthChecker:e?.bodyLengthChecker??HAu.calculateBodyLength,defaultUserAgentProvider:e?.defaultUserAgentProvider??(0,PTs.createDefaultUserAgentProvider)({serviceId:r.serviceId,clientVersion:xAu.default.version}),maxAttempts:e?.maxAttempts??(0,k1e.loadConfig)(OTs.NODE_MAX_ATTEMPT_CONFIG_OPTIONS,e),region:e?.region??(0,k1e.loadConfig)(Msn.NODE_REGION_CONFIG_OPTIONS,{...Msn.NODE_REGION_CONFIG_FILE_OPTIONS,...o}),requestHandler:LTs.NodeHttpHandler.create(e?.requestHandler??n),retryMode:e?.retryMode??(0,k1e.loadConfig)({...OTs.NODE_RETRY_MODE_CONFIG_OPTIONS,default:async()=>(await n()).retryMode||IAu.DEFAULT_RETRY_MODE},e),sha256:e?.sha256??kAu.Hash.bind(null,"sha256"),streamCollector:e?.streamCollector??LTs.streamCollector,useDualstackEndpoint:e?.useDualstackEndpoint??(0,k1e.loadConfig)(Msn.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS,o),useFipsEndpoint:e?.useFipsEndpoint??(0,k1e.loadConfig)(Msn.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS,o),userAgentAppId:e?.userAgentAppId??(0,k1e.loadConfig)(PTs.NODE_APP_ID_CONFIG_OPTIONS,o)}};Nsn.getRuntimeConfig=MAu});
export {MTs};
