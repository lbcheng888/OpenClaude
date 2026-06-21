// @ts-nocheck
import {HTr,kTr} from "./m944.ts";
import {Jgs,Xgs} from "./m959.ts";
import {Tgs,ygs} from "./m952.ts";
import {b,M} from "../runtime.ts";
import {H7} from "./m949.ts";
import {nC} from "./m880.ts";
import {ime} from "./m899.ts";
import {nk} from "./m607.ts";
import {ame} from "./m902.ts";
import {i1} from "./m894.ts";
import {yB} from "./m601.ts";
import {e4} from "./m750.ts";
import {lme} from "./m903.ts";
import {Ooe} from "./m889.ts";
import {pme} from "./m913.ts";
var osn,ssn,pEe,Qgs,isn,dEe,asn,Zgs,e_s,t_s,n_s=(e)=>{HTr(process.version);let t=t_s.resolveDefaultsModeConfig(e),n=()=>t().then(kTr),r=Jgs(e);osn.emitWarningIfUnsupportedVersion(process.version);let o={profile:e?.profile,logger:r.logger};return{...r,...e,runtime:"node",defaultsMode:t,authSchemePreference:e?.authSchemePreference??dEe.loadConfig(osn.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS,o),bodyLengthChecker:e?.bodyLengthChecker??Zgs.calculateBodyLength,defaultUserAgentProvider:e?.defaultUserAgentProvider??ssn.createDefaultUserAgentProvider({serviceId:r.serviceId,clientVersion:Tgs.version}),maxAttempts:e?.maxAttempts??dEe.loadConfig(isn.NODE_MAX_ATTEMPT_CONFIG_OPTIONS,e),region:e?.region??dEe.loadConfig(pEe.NODE_REGION_CONFIG_OPTIONS,{...pEe.NODE_REGION_CONFIG_FILE_OPTIONS,...o}),requestHandler:asn.NodeHttpHandler.create(e?.requestHandler??n),retryMode:e?.retryMode??dEe.loadConfig({...isn.NODE_RETRY_MODE_CONFIG_OPTIONS,default:async()=>(await n()).retryMode||e_s.DEFAULT_RETRY_MODE},e),sha256:e?.sha256??Qgs.Hash.bind(null,"sha256"),streamCollector:e?.streamCollector??asn.streamCollector,useDualstackEndpoint:e?.useDualstackEndpoint??dEe.loadConfig(pEe.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS,o),useFipsEndpoint:e?.useFipsEndpoint??dEe.loadConfig(pEe.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS,o),userAgentAppId:e?.userAgentAppId??dEe.loadConfig(ssn.NODE_APP_ID_CONFIG_OPTIONS,o)}};
var r_s=b(()=>{ygs();Xgs();H7();H7();osn=M(nC(),1),ssn=M(ime(),1),pEe=M(nk(),1),Qgs=M(ame(),1),isn=M(i1(),1),dEe=M(yB(),1),asn=M(e4(),1),Zgs=M(lme(),1),e_s=M(Ooe(),1),t_s=M(pme(),1)});
export {osn,ssn,pEe,Qgs,isn,dEe,asn,Zgs,e_s,t_s,n_s,r_s};
