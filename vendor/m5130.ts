// @ts-nocheck
import {isAnthropicAuthEnabled,hasStoredOAuthToken,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {isPolicyAllowed,Bu} from "./m2213.ts";
import {b} from "../runtime.ts";
function EVt(){return!0}
function CVt(e){return(e.voice?.enabled??e.voiceEnabled)===!0}
function RJn(){try{if(!isAnthropicAuthEnabled())return!1;return hasStoredOAuthToken()}catch{return!1}}
function vJn(){return isPolicyAllowed("allow_voice_mode")}
function t_t(){return RJn()&&EVt()&&vJn()}
var AVt=b(()=>{Bu();lo()});
export {EVt,CVt,RJn,vJn,t_t,AVt};
