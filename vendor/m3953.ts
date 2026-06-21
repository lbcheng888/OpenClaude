// @ts-nocheck
import {isFullscreenWithTTY,b,M,ro} from "../runtime.ts";
import {CUn,cct,vUn} from "../src/telemetry/3949_openInBrowser.ts";
import {getSubscriptionType,getOauthAccountInfo,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {Login,runPostLoginHooks,t$t} from "../src/tui/3947_runPostLoginHooks.ts";
import {REMOTE_CONTROL_DISCONNECTED_MSG} from "../src/core/3944_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {Te} from "./m2253.ts";
import {s1a,o1a} from "../src/tui/3953_ExtraUsageDialog.ts";
var Gio={};
isFullscreenWithTTY(Gio,{call:()=>s$t});
async function s$t(e,t){if(i1a&&CUn())return Wio.default.createElement(i1a,{onDone:e});let n=await cct();if(n.type==="message")return e(n.value),null;let r=getSubscriptionType();if(r==="team"||r==="enterprise")return e(n.opened?`Opened ${n.url} in your browser to manage usage credits for your organization.`:`Visit ${n.url} to manage usage credits for your organization.`),null;let o=getOauthAccountInfo(),s=o&&{accountUuid:o.accountUuid,organizationUuid:o.organizationUuid};return Wio.default.createElement(Login,{startingMessage:"Starting new login following /usage-credits. Exit with Ctrl-C to use existing account.",onDone:async(i)=>{let{bridgeDisconnected:a}=await runPostLoginHooks(t,i,{previousAccount:s});e(i?a?`Login successful. ${REMOTE_CONTROL_DISCONNECTED_MSG}`:"Login successful":"Login interrupted")}})}
var Wio,i1a;
var i$t=b(()=>{Ao();t$t();vUn();Wio=M(Te(),1),i1a=(s1a(),ro(o1a)).ExtraUsageDialog});
export {Gio,s$t,Wio,i1a,i$t};
