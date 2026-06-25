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
import {ESs} from "./m917.ts";
import {m2} from "./m901.ts";
import {Sme} from "./m918.ts";
var xSs=Q((kan)=>{Object.defineProperty(kan,"__esModule",{value:!0});kan.getRuntimeConfig=void 0;var QSu=bYe(),ZSu=QSu.__importDefault(_an()),wSs=iC(),kSs=fme(),wan=yk(),ebu=hme(),HSs=TM(),fNe=$N(),ISs=T3(),tbu=gme(),nbu=Doe(),rbu=ESs(),obu=m2(),sbu=Sme(),ibu=m2(),abu=(e)=>{(0,ibu.emitWarningIfUnsupportedVersion)(process.version);let t=(0,sbu.resolveDefaultsModeConfig)(e),n=()=>t().then(obu.loadConfigsForDefaultMode),r=(0,rbu.getRuntimeConfig)(e);(0,wSs.emitWarningIfUnsupportedVersion)(process.version);let o={profile:e?.profile,logger:r.logger};return{...r,...e,runtime:"node",defaultsMode:t,authSchemePreference:e?.authSchemePreference??(0,fNe.loadConfig)(wSs.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS,o),bodyLengthChecker:e?.bodyLengthChecker??tbu.calculateBodyLength,defaultUserAgentProvider:e?.defaultUserAgentProvider??(0,kSs.createDefaultUserAgentProvider)({serviceId:r.serviceId,clientVersion:ZSu.default.version}),maxAttempts:e?.maxAttempts??(0,fNe.loadConfig)(HSs.NODE_MAX_ATTEMPT_CONFIG_OPTIONS,e),region:e?.region??(0,fNe.loadConfig)(wan.NODE_REGION_CONFIG_OPTIONS,{...wan.NODE_REGION_CONFIG_FILE_OPTIONS,...o}),requestHandler:ISs.NodeHttpHandler.create(e?.requestHandler??n),retryMode:e?.retryMode??(0,fNe.loadConfig)({...HSs.NODE_RETRY_MODE_CONFIG_OPTIONS,default:async()=>(await n()).retryMode||nbu.DEFAULT_RETRY_MODE},e),sha256:e?.sha256??ebu.Hash.bind(null,"sha256"),streamCollector:e?.streamCollector??ISs.streamCollector,useDualstackEndpoint:e?.useDualstackEndpoint??(0,fNe.loadConfig)(wan.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS,o),useFipsEndpoint:e?.useFipsEndpoint??(0,fNe.loadConfig)(wan.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS,o),userAgentAppId:e?.userAgentAppId??(0,fNe.loadConfig)(kSs.NODE_APP_ID_CONFIG_OPTIONS,o)}};kan.getRuntimeConfig=abu});
export {xSs};
