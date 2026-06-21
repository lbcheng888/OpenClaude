// @ts-nocheck
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {b} from "../runtime.ts";
function Jsc(){let e=getGlobalConfig();if(e.seenNotifications!==void 0)return;let t={};for(let[n,r]of Object.entries(M3m)){let o=e[r];if(typeof o==="number"&&o>0)t[n]=o;else if(o===!0)t[n]=1}saveGlobalConfig((n)=>n.seenNotifications!==void 0?n:{...n,seenNotifications:t}),Ie("migration_notification_dismissals")}
var M3m;
var Xsc=b(()=>{ln();Qn();M3m={"subscription-switch":"subscriptionNoticeCount"}});
export {Jsc,M3m,Xsc};
