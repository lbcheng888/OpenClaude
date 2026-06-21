// @ts-nocheck
import {getMainLoopModelOverride,lt} from "../src/session/0131_sent.ts";
import {getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {$f,HF} from "../src/core/2683_HF.ts";
import {b} from "../runtime.ts";
function T5n(){if(getMainLoopModelOverride()!==void 0)return!1;let e=getGlobalConfig(),t=[e.sonnet45To46MigrationTimestamp,e.legacyOpusMigrationTimestamp,e.opusProMigrationTimestamp],n=Date.now()-process.uptime()*1000;return t.some((r)=>r!==void 0&&r>=n-3000)}
function F6t(e){if(!e)return 0;return e.activeAgents.filter((t)=>t.source!=="built-in").reduce((t,n)=>{let r=`${n.agentType}: ${n.whenToUse}`;return t+$f(r)},0)}
var Ije=15000;
var S5n=b(()=>{lt();HF();Qn()});
export {T5n,F6t,Ije,S5n};
