// @ts-nocheck
import {sRr,oRr} from "./m949.ts";
import {GCs,VCs} from "./m964.ts";
import {fCs,mCs} from "./m957.ts";
import {b,x} from "../runtime.ts";
import {n7} from "./m954.ts";
import {iC} from "./m885.ts";
import {fme} from "./m904.ts";
import {yk} from "./m613.ts";
import {hme} from "./m907.ts";
import {TM} from "./m899.ts";
import {$N} from "./m607.ts";
import {T3} from "./m755.ts";
import {gme} from "./m908.ts";
import {Doe} from "./m894.ts";
import {Sme} from "./m918.ts";
var $an,qan,jCe,KCs,Wan,zCe,Gan,zCs,jCs,YCs,JCs=(e)=>{sRr(process.version);let t=YCs.resolveDefaultsModeConfig(e),n=()=>t().then(oRr),r=GCs(e);$an.emitWarningIfUnsupportedVersion(process.version);let o={profile:e?.profile,logger:r.logger};return{...r,...e,runtime:"node",defaultsMode:t,authSchemePreference:e?.authSchemePreference??zCe.loadConfig($an.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS,o),bodyLengthChecker:e?.bodyLengthChecker??zCs.calculateBodyLength,defaultUserAgentProvider:e?.defaultUserAgentProvider??qan.createDefaultUserAgentProvider({serviceId:r.serviceId,clientVersion:fCs.version}),maxAttempts:e?.maxAttempts??zCe.loadConfig(Wan.NODE_MAX_ATTEMPT_CONFIG_OPTIONS,e),region:e?.region??zCe.loadConfig(jCe.NODE_REGION_CONFIG_OPTIONS,{...jCe.NODE_REGION_CONFIG_FILE_OPTIONS,...o}),requestHandler:Gan.NodeHttpHandler.create(e?.requestHandler??n),retryMode:e?.retryMode??zCe.loadConfig({...Wan.NODE_RETRY_MODE_CONFIG_OPTIONS,default:async()=>(await n()).retryMode||jCs.DEFAULT_RETRY_MODE},e),sha256:e?.sha256??KCs.Hash.bind(null,"sha256"),streamCollector:e?.streamCollector??Gan.streamCollector,useDualstackEndpoint:e?.useDualstackEndpoint??zCe.loadConfig(jCe.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS,o),useFipsEndpoint:e?.useFipsEndpoint??zCe.loadConfig(jCe.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS,o),userAgentAppId:e?.userAgentAppId??zCe.loadConfig(qan.NODE_APP_ID_CONFIG_OPTIONS,o)}};
var XCs=b(()=>{mCs();VCs();n7();n7();$an=x(iC(),1),qan=x(fme(),1),jCe=x(yk(),1),KCs=x(hme(),1),Wan=x(TM(),1),zCe=x($N(),1),Gan=x(T3(),1),zCs=x(gme(),1),jCs=x(Doe(),1),YCs=x(Sme(),1)});
export {$an,qan,jCe,KCs,Wan,zCe,Gan,zCs,jCs,YCs,JCs,XCs};
