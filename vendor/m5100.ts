// @ts-nocheck
import {isAnthropicAuthEnabled,hasStoredOAuthToken,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {isPolicyAllowed,rd} from "./m2205.ts";
import {b} from "../runtime.ts";
function Z8t(){return!0}
function e5t(e){return(e.voice?.enabled??e.voiceEnabled)===!0}
function D7n(){try{if(!isAnthropicAuthEnabled())return!1;return hasStoredOAuthToken()}catch{return!1}}
function P7n(){return isPolicyAllowed("allow_voice_mode")}
function Nft(){return D7n()&&Z8t()&&P7n()}
var t5t=b(()=>{rd();Ao()});
export {Z8t,e5t,D7n,P7n,Nft,t5t};
