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
import {xfs} from "./m912.ts";
import {V2} from "./m896.ts";
import {pme} from "./m913.ts";
var Nfs=X((Gon)=>{Object.defineProperty(Gon,"__esModule",{value:!0});Gon.getRuntimeConfig=void 0;var Muu=EKe(),Nuu=Muu.__importDefault(Oon()),Pfs=nC(),Ofs=ime(),Won=nk(),Buu=ame(),Lfs=i1(),S1e=yB(),Mfs=e4(),Fuu=lme(),Uuu=Ooe(),$uu=xfs(),quu=V2(),juu=pme(),Wuu=V2(),Guu=(e)=>{(0,Wuu.emitWarningIfUnsupportedVersion)(process.version);let t=(0,juu.resolveDefaultsModeConfig)(e),n=()=>t().then(quu.loadConfigsForDefaultMode),r=(0,$uu.getRuntimeConfig)(e);(0,Pfs.emitWarningIfUnsupportedVersion)(process.version);let o={profile:e?.profile,logger:r.logger};return{...r,...e,runtime:"node",defaultsMode:t,authSchemePreference:e?.authSchemePreference??(0,S1e.loadConfig)(Pfs.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS,o),bodyLengthChecker:e?.bodyLengthChecker??Fuu.calculateBodyLength,defaultUserAgentProvider:e?.defaultUserAgentProvider??(0,Ofs.createDefaultUserAgentProvider)({serviceId:r.serviceId,clientVersion:Nuu.default.version}),maxAttempts:e?.maxAttempts??(0,S1e.loadConfig)(Lfs.NODE_MAX_ATTEMPT_CONFIG_OPTIONS,e),region:e?.region??(0,S1e.loadConfig)(Won.NODE_REGION_CONFIG_OPTIONS,{...Won.NODE_REGION_CONFIG_FILE_OPTIONS,...o}),requestHandler:Mfs.NodeHttpHandler.create(e?.requestHandler??n),retryMode:e?.retryMode??(0,S1e.loadConfig)({...Lfs.NODE_RETRY_MODE_CONFIG_OPTIONS,default:async()=>(await n()).retryMode||Uuu.DEFAULT_RETRY_MODE},e),sha256:e?.sha256??Buu.Hash.bind(null,"sha256"),streamCollector:e?.streamCollector??Mfs.streamCollector,useDualstackEndpoint:e?.useDualstackEndpoint??(0,S1e.loadConfig)(Won.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS,o),useFipsEndpoint:e?.useFipsEndpoint??(0,S1e.loadConfig)(Won.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS,o),userAgentAppId:e?.userAgentAppId??(0,S1e.loadConfig)(Ofs.NODE_APP_ID_CONFIG_OPTIONS,o)}};Gon.getRuntimeConfig=Guu});
export {Nfs};
