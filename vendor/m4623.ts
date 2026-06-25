// @ts-nocheck
import {getMainLoopModelOverride,lt} from "../src/session/0132_sent.ts";
import {getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {pm,l1} from "../src/core/2694_l1.ts";
import {b} from "../runtime.ts";
function t7n(){if(getMainLoopModelOverride()!==void 0)return!1;let e=getGlobalConfig(),t=[e.sonnet45To46MigrationTimestamp,e.legacyOpusMigrationTimestamp,e.opusProMigrationTimestamp],n=Date.now()-process.uptime()*1000;return t.some((r)=>r!==void 0&&r>=n-3000)}
function lWt(e){if(!e)return 0;return e.activeAgents.filter((t)=>t.source!=="built-in").reduce((t,n)=>{let r=`${n.agentType}: ${n.whenToUse}`;return t+pm(r)},0)}
var oWe=15000;
var n7n=b(()=>{lt();l1();tr()});
export {t7n,lWt,oWe,n7n};
