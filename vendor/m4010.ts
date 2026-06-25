// @ts-nocheck
import {resetModelStrings,lt} from "../src/session/0132_sent.ts";
import {isUltraReviewAvailable,MR} from "../src/config/2033_allowed.ts";
import {s3a,t3n} from "./m4009.ts";
import {NNe,yAe,$oe} from "../src/config/1285_BedrockClient.ts";
import {m8,G0t} from "./m2029.ts";
import {clearAwsCredentialsCache,clearGcpCredentialsCache,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {r3a,fpo} from "../src/config/4009_method.ts";
import {resetDatadogInit,Q7} from "../src/permissions/5229_trackDatadogEvent.ts";
import {refreshGrowthBookFeatures,jn} from "../src/api/2204_stopPeriodicGrowthBookRefresh.ts";
import {b} from "../runtime.ts";
import {qe} from "../src/config/0236_setHasFormattedOutput.ts";
function n3n(e){if(resetModelStrings(),isUltraReviewAvailable(),s3a(),NNe.cache?.clear?.(),yAe.cache?.clear?.(),m8.cache?.clear?.(),clearAwsCredentialsCache(),clearGcpCredentialsCache(),r3a(),resetDatadogInit(),e==="firstParty")refreshGrowthBookFeatures()}
var gpo=b(()=>{lt();Q7();jn();fpo();lo();MR();qe();$oe();G0t();t3n()});
export {n3n,gpo};
