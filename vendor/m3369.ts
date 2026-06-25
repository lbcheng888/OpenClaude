// @ts-nocheck
import {getInitialSettings,getSettingsForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {AIn,Cae} from "./m2788.ts";
import {cve,zM} from "./m2240.ts";
import {clearCommandMemoizationCaches,Mm} from "../src/tools/5174_toSlashCommands.ts";
import {syncPermissionRulesFromDisk,ly} from "../src/tools/5218_toolAlwaysAllowedRule.ts";
import {isBypassPermissionsModeDisabled} from "../src/telemetry/2232_vUe.ts";
import {createDisabledBypassPermissionsContext,transitionPlanAutoMode,cy} from "../src/permissions/5219_verifyAutoModeGateAccess.ts";
import {fA,wm} from "./m707.ts";
import {zit,A3e} from "../src/permissions/3312_recap.ts";
import {M2,Cp} from "../src/config/2223_level.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {kas,PRt} from "./m717.ts";
import {fLn,gno} from "./m3368.ts";
import {i_,Sw} from "./m2789.ts";
import {hs,Tu} from "./m649.ts";
import {b} from "../runtime.ts";
import {E8} from "../src/config/2192_terminal.ts";
import {dn} from "../src/config/0137_namespace.ts";
function hLn(e,t){let n=getInitialSettings();logForDebugging(`Settings changed from ${e}, updating app state`);let r=AIn();cve(),clearCommandMemoizationCaches(),t((o)=>{let s=syncPermissionRulesFromDisk(o.toolPermissionContext,r);if(s=atp(s,o.settings.permissions?.additionalDirectories,n.permissions?.additionalDirectories,e),s.isBypassPermissionsModeAvailable&&isBypassPermissionsModeDisabled())s=createDisabledBypassPermissionsContext(s);if(s.strippedDangerousRules!==void 0){let c=new Set(fA),u={};for(let[d,p]of Object.entries(s.strippedDangerousRules))if(p&&!c.has(d))u[d]=[...p];s={...s,strippedDangerousRules:u}}s=transitionPlanAutoMode(s);let i=zit();if(o.settings.effortLevel!==n.effortLevel)M2();let l=e==="policySettings"&&(TeamDeleteToolName(o.settings.allowedMcpServers)!==TeamDeleteToolName(n.allowedMcpServers)||TeamDeleteToolName(o.settings.deniedMcpServers)!==TeamDeleteToolName(n.deniedMcpServers)||o.settings.disableClaudeAiConnectors!==n.disableClaudeAiConnectors);return{...o,settings:n,toolPermissionContext:s,...l&&{policyVersion:o.policyVersion+1},...o.awaySummaryEnabled!==i&&{awaySummaryEnabled:i}}})}
function gLn(e){if(kas())e()}
function atp(e,t,n,r){let o=new Set((t??[]).map(_no)),s=new Set((n??[]).map(_no)),i=e.additionalWorkingDirectories,a=[...o].filter((u)=>!s.has(u)&&!H_a(i.get(u)?.source)),l=[...s].filter((u)=>!o.has(u)&&!H_a(i.get(u)?.source));if(a.length===0&&l.length===0&&r!=="flagSettings")return e;let c=e;if(r==="flagSettings"){let u=new Set((getSettingsForSource("flagSettings")?.permissions?.additionalDirectories??[]).map(_no)),d=new Map(c.trustedNetworkDirectories??[]),p=!1;for(let m of[...d.keys()])if(!u.has(m)&&i.get(m)?.source!=="cliArg"){for(let f of d.get(m)??[])if(f!==m)a.push(f);d.delete(m),p=!0}for(let m of u)if(!d.has(m)){let f=fLn(m);if(f.length>0){d.set(m,f);for(let h of f)if(h!==m)l.push(h);p=!0}}if(p)c={...c,trustedNetworkDirectories:d}}if(a.length>0)c=i_(c,{type:"removeDirectories",directories:a,destination:"localSettings"});if(l.length>0)c=i_(c,{type:"addDirectories",directories:l,destination:"localSettings"});return c}
function H_a(e){return e==="cliArg"||e==="command"||e==="session"}
function _no(e){return I_a.resolve(hs(e))}
var I_a;
var yno=b(()=>{Mm();A3e();PRt();qe();Cp();E8();dn();zM();Tu();Sw();cy();ly();Cae();gno();tn();wm();br();I_a=require("path")});
export {hLn,gLn,atp,H_a,_no,I_a,yno};
