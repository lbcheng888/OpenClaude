// @ts-nocheck
import {ft,b,x,oo} from "../runtime.ts";
import {W3t,Cdt,s3n} from "../src/telemetry/4016_openInBrowser.ts";
import {getSubscriptionType,getOauthAccountInfo,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {Login,runPostLoginHooks,$3t} from "../src/tui/4014_runPostLoginHooks.ts";
import {REMOTE_CONTROL_DISCONNECTED_MSG} from "../src/core/4006_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {oe} from "./m2275.ts";
import {kpo,I3a} from "../src/tui/4020_PlainAwait.ts";
var Ipo={};
ft(Ipo,{call:()=>K3t});
async function K3t(e,t){if(x3a&&W3t())return Hpo.jsx(x3a,{onDone:e});let n=await Cdt();if(n.type==="message")return e(n.value),null;let r=getSubscriptionType();if(r==="team"||r==="enterprise")return e(n.opened?`Opened ${n.url} in your browser to manage usage credits for your organization.`:`Visit ${n.url} to manage usage credits for your organization.`),null;let o=getOauthAccountInfo(),s=o&&{accountUuid:o.accountUuid,organizationUuid:o.organizationUuid};return Hpo.jsx(Login,{startingMessage:"Starting new login following /usage-credits. Exit with Ctrl-C to use existing account.",onDone:async(i)=>{let{bridgeDisconnected:a}=await runPostLoginHooks(t,i,{previousAccount:s});e(i?a?`Login successful. ${REMOTE_CONTROL_DISCONNECTED_MSG}`:"Login successful":"Login interrupted")}})}
var Hpo,x3a;
var z3t=b(()=>{lo();$3t();s3n();Hpo=x(oe(),1),x3a=(kpo(),oo(I3a)).ExtraUsageDialog});
export {Ipo,K3t,Hpo,x3a,z3t};
