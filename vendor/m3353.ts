// @ts-nocheck
import {getInitialSettings,getSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {FRn,che} from "./m2776.ts";
import {Cve,L1} from "./m2232.ts";
import {clearCommandMemoizationCaches,Sf} from "../src/tools/5142_toSlashCommands.ts";
import {syncPermissionRulesFromDisk,ay} from "../src/tools/5184_toolAlwaysAllowedRule.ts";
import {isBypassPermissionsModeDisabled} from "../src/telemetry/2224_kFe.ts";
import {createDisabledBypassPermissionsContext,transitionPlanAutoMode,ly} from "../src/permissions/5185_verifyAutoModeGateAccess.ts";
import {Tw,mf} from "./m702.ts";
import {zot,m9e} from "../src/permissions/3296_recap.ts";
import {m$,Om} from "../src/config/2215_level.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {Dts,iEt} from "./m712.ts";
import {SDn,OXr} from "./m3352.ts";
import {Yg,lx} from "./m2777.ts";
import {Ds,Iu} from "./m643.ts";
import {b} from "../runtime.ts";
import {a5} from "../src/config/2187_terminal.ts";
import {sn} from "../src/config/0047_namespace.ts";
function bDn(e,t){let n=getInitialSettings();logForDebugging(`Settings changed from ${e}, updating app state`);let r=FRn();Cve(),clearCommandMemoizationCaches(),t((o)=>{let s=syncPermissionRulesFromDisk(o.toolPermissionContext,r);if(s=TGd(s,o.settings.permissions?.additionalDirectories,n.permissions?.additionalDirectories,e),s.isBypassPermissionsModeAvailable&&isBypassPermissionsModeDisabled())s=createDisabledBypassPermissionsContext(s);if(s.strippedDangerousRules!==void 0){let c=new Set(Tw),u={};for(let[d,p]of Object.entries(s.strippedDangerousRules))if(p&&!c.has(d))u[d]=[...p];s={...s,strippedDangerousRules:u}}s=transitionPlanAutoMode(s);let i=zot();if(o.settings.effortLevel!==n.effortLevel)m$();let l=e==="policySettings"&&(Le(o.settings.allowedMcpServers)!==Le(n.allowedMcpServers)||Le(o.settings.deniedMcpServers)!==Le(n.deniedMcpServers)||o.settings.disableClaudeAiConnectors!==n.disableClaudeAiConnectors);return{...o,settings:n,toolPermissionContext:s,...l&&{policyVersion:o.policyVersion+1},...o.awaySummaryEnabled!==i&&{awaySummaryEnabled:i}}})}
function EDn(e){if(Dts())e()}
function TGd(e,t,n,r){let o=new Set((t??[]).map(LXr)),s=new Set((n??[]).map(LXr)),i=e.additionalWorkingDirectories,a=[...o].filter((u)=>!s.has(u)&&!Aua(i.get(u)?.source)),l=[...s].filter((u)=>!o.has(u)&&!Aua(i.get(u)?.source));if(a.length===0&&l.length===0&&r!=="flagSettings")return e;let c=e;if(r==="flagSettings"){let u=new Set((getSettingsForSource("flagSettings")?.permissions?.additionalDirectories??[]).map(LXr)),d=new Map(c.trustedNetworkDirectories??[]),p=!1;for(let m of[...d.keys()])if(!u.has(m)&&i.get(m)?.source!=="cliArg"){for(let f of d.get(m)??[])if(f!==m)a.push(f);d.delete(m),p=!0}for(let m of u)if(!d.has(m)){let f=SDn(m);if(f.length>0){d.set(m,f);for(let A of f)if(A!==m)l.push(A);p=!0}}if(p)c={...c,trustedNetworkDirectories:d}}if(a.length>0)c=Yg(c,{type:"removeDirectories",directories:a,destination:"localSettings"});if(l.length>0)c=Yg(c,{type:"addDirectories",directories:l,destination:"localSettings"});return c}
function Aua(e){return e==="cliArg"||e==="command"||e==="session"}
function LXr(e){return hua.resolve(Ds(e))}
var hua;
var MXr=b(()=>{Sf();m9e();iEt();qe();Om();a5();sn();L1();Iu();lx();ly();ay();che();OXr();Xt();mf();yr();hua=require("path")});
export {bDn,EDn,TGd,Aua,LXr,hua,MXr};
