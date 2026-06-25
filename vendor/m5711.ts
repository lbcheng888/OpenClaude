// @ts-nocheck
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {He,mn} from "../src/telemetry/0600_feature_name.ts";
import {b} from "../runtime.ts";
function Bfc(){let e=getGlobalConfig();if(e.seenNotifications!==void 0)return;let t={};for(let[n,r]of Object.entries(c7m)){let o=e[r];if(typeof o==="number"&&o>0)t[n]=o;else if(o===!0)t[n]=1}saveGlobalConfig((n)=>n.seenNotifications!==void 0?n:{...n,seenNotifications:t}),He("migration_notification_dismissals")}
var c7m;
var Ufc=b(()=>{mn();tr();c7m={"subscription-switch":"subscriptionNoticeCount"}});
export {Bfc,c7m,Ufc};
