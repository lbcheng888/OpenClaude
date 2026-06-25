// @ts-nocheck
import {Q} from "../runtime.ts";
import {bYe} from "./m824.ts";
import {_an} from "./m903.ts";
import {iC} from "./m885.ts";
import {fme} from "./m904.ts";
import {yk} from "./m613.ts";
import {Zu} from "./m855.ts";
import {hme} from "./m907.ts";
import {TM} from "./m899.ts";
import {$N} from "./m607.ts";
import {T3} from "./m755.ts";
import {gme} from "./m908.ts";
import {Doe} from "./m894.ts";
import {fRs} from "./m992.ts";
import {m2} from "./m901.ts";
import {Sme} from "./m918.ts";
var yRs=Q((lln)=>{Object.defineProperty(lln,"__esModule",{value:!0});lln.getRuntimeConfig=void 0;var NCu=bYe(),FCu=NCu.__importDefault(_an()),IRr=iC(),hRs=fme(),aln=yk(),BCu=Zu(),UCu=hme(),gRs=TM(),hNe=$N(),_Rs=T3(),$Cu=gme(),qCu=Doe(),WCu=fRs(),GCu=m2(),VCu=Sme(),KCu=m2(),zCu=(e)=>{(0,KCu.emitWarningIfUnsupportedVersion)(process.version);let t=(0,VCu.resolveDefaultsModeConfig)(e),n=()=>t().then(GCu.loadConfigsForDefaultMode),r=(0,WCu.getRuntimeConfig)(e);(0,IRr.emitWarningIfUnsupportedVersion)(process.version);let o={profile:e?.profile,logger:r.logger};return{...r,...e,runtime:"node",defaultsMode:t,authSchemePreference:e?.authSchemePreference??(0,hNe.loadConfig)(IRr.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS,o),bodyLengthChecker:e?.bodyLengthChecker??$Cu.calculateBodyLength,defaultUserAgentProvider:e?.defaultUserAgentProvider??(0,hRs.createDefaultUserAgentProvider)({serviceId:r.serviceId,clientVersion:FCu.default.version}),httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:(s)=>s.getIdentityProvider("aws.auth#sigv4")||(async(i)=>await e.credentialDefaultProvider(i?.__config||{})()),signer:new IRr.AwsSdkSigV4Signer},{schemeId:"smithy.api#noAuth",identityProvider:(s)=>s.getIdentityProvider("smithy.api#noAuth")||(async()=>({})),signer:new BCu.NoAuthSigner}],maxAttempts:e?.maxAttempts??(0,hNe.loadConfig)(gRs.NODE_MAX_ATTEMPT_CONFIG_OPTIONS,e),region:e?.region??(0,hNe.loadConfig)(aln.NODE_REGION_CONFIG_OPTIONS,{...aln.NODE_REGION_CONFIG_FILE_OPTIONS,...o}),requestHandler:_Rs.NodeHttpHandler.create(e?.requestHandler??n),retryMode:e?.retryMode??(0,hNe.loadConfig)({...gRs.NODE_RETRY_MODE_CONFIG_OPTIONS,default:async()=>(await n()).retryMode||qCu.DEFAULT_RETRY_MODE},e),sha256:e?.sha256??UCu.Hash.bind(null,"sha256"),streamCollector:e?.streamCollector??_Rs.streamCollector,useDualstackEndpoint:e?.useDualstackEndpoint??(0,hNe.loadConfig)(aln.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS,o),useFipsEndpoint:e?.useFipsEndpoint??(0,hNe.loadConfig)(aln.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS,o),userAgentAppId:e?.userAgentAppId??(0,hNe.loadConfig)(hRs.NODE_APP_ID_CONFIG_OPTIONS,o)}};lln.getRuntimeConfig=zCu});
export {yRs};
