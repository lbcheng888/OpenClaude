// @ts-nocheck
import {isFullscreenWithTTY,b,ro} from "../../runtime.ts";
import {isCommandEnabled,getCommandName} from "./4028_maxEditDistance.ts";
import {getDynamicSkillStateKey,Z3t,TYa,R6e,x6} from "./4332_displayName.ts";
import {qp,_o,bt} from "../../vendor/m195.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {De,Rn} from "../session/0615_length.ts";
import {Mgo,cjn,ztl,uqt,Q6e} from "./4432_encoding.ts";
import {Dwo,BE} from "../../vendor/m5006.ts";
import {I0i,Oet} from "../../vendor/m2585.ts";
import {Oe,Ie,isTmuxControlMode,ln} from "../telemetry/0594_feature_name.ts";
import {isClaudeAISubscriber,isUsing3PServices,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {isFirstPartyAnthropicBaseUrl,li,getAPIProvider} from "../api/1282_usesFirstPartyModelIds.ts";
import {aG,A$n,BIe} from "../config/4090_BIe.ts";
import {FIe,A$a,e9t} from "../config/4091_promise.ts";
import {ESo,bSo} from "../../vendor/m4648.ts";
import {getDisableSlashCommands,lt} from "../session/0131_sent.ts";
import {B0,Pee} from "../telemetry/3153_Pee.ts";
import {getInitialSettings,yr} from "../config/0740_updateSettingsForSource.ts";
import {ET} from "../../vendor/m3140.ts";
import {A7,mf} from "../../vendor/m702.ts";
import {sn} from "../config/0047_namespace.ts";
import {xrl,Rrl} from "../../vendor/m4455.ts";
import {Brl,Nrl} from "./4459_type.ts";
import {Url,Frl} from "../../vendor/m4459.ts";
import {ool,b_o} from "../../vendor/m4465.ts";
import {sol,E_o} from "../../vendor/m4466.ts";
import {vol,$_o} from "../../vendor/m4474.ts";
import {Pol,Dol} from "../../vendor/m4477.ts";
import {Xol,Zjn} from "../../vendor/m4484.ts";
import {rsl,eyo,nsl} from "../../vendor/m4488.ts";
import {hsl,nyo} from "../../vendor/m4490.ts";
import {Osl,Psl} from "../../vendor/m4498.ts";
import {Fsl,Bsl} from "../../vendor/m4499.ts";
import {Wsl,c8n} from "../../vendor/m4501.ts";
import {Xsl,gyo,Jsl} from "./4505_type.ts";
import {cll,lll,uTo} from "../../vendor/m4551.ts";
import {gll,All,hll} from "../../vendor/m4553.ts";
import {kll,ATo,hTo} from "../../vendor/m4560.ts";
import {lcl,acl} from "../../vendor/m4572.ts";
import {dul,eSo} from "../../vendor/m4599.ts";
import {Hul,kul} from "../../vendor/m4606.ts";
import {Pul,sSo} from "./4609_type.ts";
import {Yul,cSo} from "../../vendor/m4615.ts";
import {idl,sdl} from "../../vendor/m4618.ts";
import {ldl,adl} from "../computer-use/4620_type.ts";
import {udl,cdl} from "../../vendor/m4620.ts";
import {_dl,gdl} from "../../vendor/m4623.ts";
import {vdl,Cdl} from "../core/4626_type.ts";
import {Rdl,wdl} from "../core/4627_type.ts";
import {kdl,xdl} from "../core/4628_type.ts";
import {bpl,Spl} from "../../vendor/m4642.ts";
import {Rpl,wpl} from "../../vendor/m4644.ts";
import {xpl,mSo} from "../../vendor/m4645.ts";
import {Xfl,Jfl,Yfl} from "../../vendor/m4695.ts";
import {sgl,mEo} from "../../vendor/m4755.ts";
import {agl,igl} from "../../vendor/m4756.ts";
import {bgl,TEo} from "../../vendor/m4761.ts";
import {Ogl,CEo} from "../../vendor/m4764.ts";
import {Wgl,wEo,jgl} from "../../vendor/m4769.ts";
import {TSl,ySl} from "../../vendor/m4825.ts";
import {vSl,CSl} from "../config/4828_type.ts";
import {HSl,kSl} from "../config/4830_type.ts";
import {KCo,UGn,ebl} from "../../vendor/m4843.ts";
import {sbl,zCo} from "../../vendor/m4845.ts";
import {abl,ibl} from "../../vendor/m4846.ts";
import {cbl,lbl} from "../../vendor/m4847.ts";
import {_bl,gbl} from "../../vendor/m4850.ts";
import {Dbl,Ibl} from "../../vendor/m4855.ts";
import {Mbl,Lbl} from "../../vendor/m4857.ts";
import {OEl,PEl} from "../../vendor/m4876.ts";
import {zEl,KEl} from "../core/4882_type.ts";
import {XEl,JEl} from "./4883_name.ts";
import {ZEl,QEl} from "../../vendor/m4883.ts";
import {tCl,Evo} from "../../vendor/m4884.ts";
import {t8e,KSl} from "../permissions/4840_plan.ts";
import {uCl,vvo,wvo} from "../../vendor/m4887.ts";
import {yCl,kvo} from "../../vendor/m4891.ts";
import {HCl,kCl} from "../../vendor/m4896.ts";
import {bv,isAgentsFleetEnabled,isDaemonWorkerRegistryEnabled} from "../config/2204_shouldShowLaunchComposer.ts";
import {rvl,nvl} from "../../vendor/m4906.ts";
import {avl,Fvo} from "../../vendor/m4908.ts";
import {hvl,jvo,Avl} from "../../vendor/m4914.ts";
import {bvl,Gvo} from "../../vendor/m4917.ts";
import {Rvl,Yvo} from "../../vendor/m4920.ts";
import {twl,ewl} from "../../vendor/m4929.ts";
import {cwl,lwl} from "../../vendor/m4932.ts";
import {dwl,uwl} from "../../vendor/m4933.ts";
import {Awl,fwl} from "../../vendor/m4935.ts";
import {URl,FRl} from "../../vendor/m4966.ts";
import {VRl,GRl} from "../../vendor/m4969.ts";
import {exl,xVn} from "../../vendor/m4975.ts";
import {rxl,kVn} from "../../vendor/m4977.ts";
import {ixl,sxl} from "../../vendor/m4978.ts";
import {mxl,pxl} from "../../vendor/m4981.ts";
import {Axl,fxl} from "../../vendor/m4982.ts";
import {gxl,Swo,Two} from "../../vendor/m4983.ts";
import {yxl,bwo,DVn} from "../../vendor/m4984.ts";
import {Txl,Ewo} from "../../vendor/m4985.ts";
import {bxl,Sxl} from "../../vendor/m4986.ts";
import {Cxl,Exl} from "../../vendor/m4987.ts";
import {wxl,vxl} from "../../vendor/m4988.ts";
import {$xl,Uxl} from "../../vendor/m4994.ts";
import {Yxl,zxl} from "../../vendor/m4997.ts";
import {Qxl,kwo} from "../../vendor/m4999.ts";
import {tkl,Hwo} from "../telemetry/5002_type.ts";
import {lkl,akl} from "../../vendor/m5003.ts";
import {ukl,ckl} from "../telemetry/5006_type.ts";
import {tx,Ywe} from "../telemetry/2595_skill_name.ts";
import {_9,tu} from "../config/3864_entrypoint.ts";
import {ta,wn} from "../../vendor/m45.ts";
import {mkl,Pwo} from "../../vendor/m5007.ts";
import {NVn,Nwo,Rkl} from "../../vendor/m5013.ts";
import {Lkl,jwo} from "../../vendor/m5016.ts";
import {jkl,Vwo} from "../../vendor/m5021.ts";
import {cHl,nRo,lHl} from "../../vendor/m5030.ts";
import {THl,yHl} from "../../vendor/m5034.ts";
import {aRo,iPe} from "../../vendor/m5036.ts";
import {mct,Lte,Xio,Qio,Zio} from "../../vendor/m3956.ts";
import {xHl,RHl} from "../../vendor/m5039.ts";
import {MHl,LHl} from "../../vendor/m5042.ts";
import {BHl,NHl} from "../agent/5044_type.ts";
import {QHl,gRo,XHl} from "../../vendor/m5046.ts";
import {rIl,yRo} from "../../vendor/m5048.ts";
import {sIl,TRo} from "../config/5050_subtype.ts";
import {aIl,iIl} from "../../vendor/m5050.ts";
import {cIl,lIl} from "../../vendor/m5051.ts";
import {dIl,uIl} from "../../vendor/m5052.ts";
import {fIl,mIl} from "../telemetry/5054_default.ts";
import {xIl,RIl} from "../core/5059_default.ts";
import {iPl,sPl} from "../../vendor/m5099.ts";
import {bPl,SPl} from "../../vendor/m5104.ts";
import {CPl,EPl} from "../session/5106_default.ts";
import {PPl,DPl} from "../../vendor/m5109.ts";
import {FPl,BPl} from "../../vendor/m5112.ts";
import {KPl,VPl} from "../telemetry/5117_default.ts";
import {eOl,ZPl} from "./5119_default.ts";
import {cLl,lLl} from "../../vendor/m5134.ts";
import {ALl,fLl} from "../../vendor/m5138.ts";
import {wLl,vLl} from "../tui/5140_normalizeSessionMeta.ts";
import {Iko,Hko} from "../../vendor/m5140.ts";
var mvo={};
isFullscreenWithTTY(mvo,{toSlashCommands:()=>toSlashCommands,shippedCommandNames:()=>shippedCommandNames,scopedSkillName:()=>scopedSkillName,routeThinClientCommand:()=>routeThinClientCommand,meetsAvailabilityRequirement:()=>meetsAvailabilityRequirement,isThinClientSafe:()=>isThinClientSafe,isSkillToolCommand:()=>isSkillToolCommand,isSkillOff:()=>isSkillOff,isSkillExcludedFromModel:()=>isSkillExcludedFromModel,isCommandEnabled:()=>isCommandEnabled,isBridgeSafeCommand:()=>isBridgeSafeCommand,isBridgeDispatchable:()=>isBridgeDispatchable,hasCommand:()=>hasCommand,getSlashCommandToolSkills:()=>getSlashCommandToolSkills,getSkillToolCommands:()=>getSkillToolCommands,getSkillOverride:()=>getSkillOverride,getMcpSkillCommands:()=>getMcpSkillCommands,getDynamicSkillStateKey:()=>getDynamicSkillStateKey,getCommands:()=>getCommands,getCommandName:()=>getCommandName,getCommand:()=>getCommand,getBuiltinCommands:()=>getBuiltinCommands,formatDescriptionWithSource:()=>formatDescriptionWithSource,fleetHostCommands:()=>fleetHostCommands,findCommand:()=>findCommand,findBridgeFallback:()=>findBridgeFallback,filterSkillCommandsByAllowlist:()=>filterSkillCommandsByAllowlist,filterCommandsForRemoteMode:()=>filterCommandsForRemoteMode,filterCommandsForHeadless:()=>filterCommandsForHeadless,dropShadowedFallbackSkills:()=>dropShadowedFallbackSkills,dropShadowedBundledSkills:()=>dropShadowedBundledSkills,deriveRequires:()=>deriveRequires,clearCommandsCache:()=>clearCommandsCache,clearCommandMemoizationCaches:()=>clearCommandMemoizationCaches,builtInCommandNames:()=>builtInCommandNames,attributionSkillName:()=>attributionSkillName,_resetFallbackTelemetryForTesting:()=>_resetFallbackTelemetryForTesting,REMOTE_SAFE_COMMANDS:()=>REMOTE_SAFE_COMMANDS,INTERNAL_ONLY_COMMANDS:()=>INTERNAL_ONLY_COMMANDS,BRIDGE_SAFE_COMMANDS:()=>BRIDGE_SAFE_COMMANDS,ANT_GATED_COMMANDS:()=>ANT_GATED_COMMANDS});
function getBuiltinCommands(){return x5t()}
async function Cgm(e){let t=null;try{let[n,r]=await Promise.all([Z3t(e).catch((i)=>{if(qp(i))logForDebugging(`Skill directory commands failed to load (${i.code}), continuing without them`,{level:"error"});else De(_o(i)),logForDebugging("Skill directory commands failed to load, continuing without them");return t="cmd_load_skill_dir_failed",[]}),Mgo().catch((i)=>(De(_o(i)),t="cmd_load_plugin_skills_failed",logForDebugging("Plugin skills failed to load, continuing without them"),[]))]),o=Dwo(),s=I0i();if(logForDebugging(`getSkills returning: ${n.length} skill dir commands, ${r.length} plugin skills, ${o.length} bundled skills, ${s.length} builtin plugin skills`),t)Oe("cmd_load",t);else Ie("cmd_load");return{skillDirCommands:n,pluginSkills:r,bundledSkills:o,builtinPluginSkills:s}}catch(n){return De(_o(n)),isTmuxControlMode("cmd_load","cmd_load_skills_failed"),logForDebugging("Unexpected error in getSkills, returning empty"),{skillDirCommands:[],pluginSkills:[],bundledSkills:[],builtinPluginSkills:[]}}}
function meetsAvailabilityRequirement(e){if(!e.availability)return!0;for(let t of e.availability)switch(t){case"claude-ai":if(isClaudeAISubscriber())return!0;break;case"console":if(!isClaudeAISubscriber()&&!isUsing3PServices()&&isFirstPartyAnthropicBaseUrl())return!0;break;default:{let n=t;break}}return!1}
function Bko(e){return`${getDynamicSkillStateKey()}:${aG()}:${e}`}
async function getCommands(e){let t=await TKn(e),n=TYa(),r=FIe()?A$a():[],o=t.filter((A)=>meetsAvailabilityRequirement(A)&&isCommandEnabled(A));if(n.length===0&&r.length===0)return o;let s=n.filter((A)=>meetsAvailabilityRequirement(A)&&isCommandEnabled(A)),i=new Set,a=new Set;for(let A of o)if(i.add(A.name),A.type==="prompt"&&A.skillRoot)a.add(A.skillRoot);let l=new Map;for(let A of s){if(A.type==="prompt"&&A.fallback)continue;l.set(A.name,(l.get(A.name)??0)+1)}let c=[],u=new Set;for(let A of s){if(A.type==="prompt"&&A.skillRoot&&a.has(A.skillRoot))continue;let h=wgm(A,e),g=i.has(A.name);if(A.type==="prompt"&&A.fallback){if(g||(l.get(A.name)??0)>0||u.has(A.name))continue;c.push(h?NLl(A,h):A),u.add(A.name);continue}if(!(g||(l.get(A.name)??0)>1)){c.push(h?NLl(A,h):A),u.add(A.name);continue}if(!h){if(g||u.has(A.name))continue;c.push(A),u.add(A.name);continue}let y=scopedSkillName(h,A.name);if(i.has(y)||u.has(y))continue;c.push(Rgm(A,h,g||u.has(A.name))),u.add(y)}let d=r.filter((A)=>!i.has(A.name)&&!u.has(A.name)&&meetsAvailabilityRequirement(A)&&isCommandEnabled(A)),p=[...c,...d];if(p.length===0)return o;let m=new Set(x5t().map((A)=>A.name)),f=o.findIndex((A)=>m.has(A.name));if(f===-1)return dropShadowedFallbackSkills([...o,...p]);return dropShadowedFallbackSkills([...o.slice(0,f),...p,...o.slice(f)])}
function wgm(e,t){if(e.type!=="prompt"||!e.skillRoot)return null;let n=`${_Pe.sep}.claude${_Pe.sep}`,r=e.skillRoot.lastIndexOf(n);if(r===-1)return null;let o=e.skillRoot.slice(0,r),s=_Pe.relative(t,o);if(!s||s.startsWith("..")||_Pe.isAbsolute(s))return null;return s.split(_Pe.sep).join("/")}
function scopedSkillName(e,t){return`${e}:${t}`}
function attributionSkillName(e){return e.type==="prompt"&&e.unqualifiedName!=null?e.unqualifiedName:e.name}
function NLl(e,t){if(e.type!=="prompt")return e;return{...e,description:`${e.description} (from ${t}/.claude/skills \u2014 applies when working on files under ${t}/)`}}
function Rgm(e,t,n){if(e.type!=="prompt")return e;let r=scopedSkillName(t,e.name),o=n?`scoped to ${t}/ \u2014 use this instead of the unscoped "${e.name}" skill when the files being changed are under ${t}/`:`from ${t}/.claude/skills \u2014 applies when working on files under ${t}/`;return{...e,name:r,unqualifiedName:e.name,aliases:void 0,userFacingName:()=>r,description:`${e.description} (${o})`}}
function clearCommandMemoizationCaches(){TKn.cache?.clear?.(),getSkillToolCommands.cache?.clear?.(),getSlashCommandToolSkills.cache?.clear?.(),vgm?.(),Promise.resolve().then(() => (ESo(),bSo)).then((e)=>e.clearSkillIndexCache(),()=>{})}
function clearCommandsCache(){clearCommandMemoizationCaches(),cjn(),ztl(),R6e()}
function _resetFallbackTelemetryForTesting(){xgm.clear()}
function dropShadowedFallbackSkills(e){let t=new Set,n=!1;for(let r of e){if(r.type!=="prompt"||r.loadedFrom!=="plugin"&&r.loadedFrom!=="bundled"&&r.loadedFrom!=="mcp")continue;if(r.disableModelInvocation||isSkillExcludedFromModel(r))continue;if(r.loadedFrom==="mcp")n=!0;let o=r.name.lastIndexOf(":");if(o>0)t.add(r.name.slice(o+1))}if(t.size===0)return e;return e.filter((r)=>{if(r.type!=="prompt"||!r.fallback)return!0;if(!t.has(r.name))return!0;return logForDebugging(`Dropping fallback skill '${r.name}' \u2014 a plugin/MCP skill with the same suffix is loaded`),!1})}
function dropShadowedBundledSkills(e){if(Dko?.input===e)return Dko.output;let t=new Set,n=!1,r=e.filter((s)=>{if(s.type==="prompt"&&s.source==="bundled"&&t.has(s.name))return n=!0,!1;return t.add(s.name),!0}),o=n?r:e;return Dko={input:e,output:o},o}
function getMcpSkillCommands(e){if(getDisableSlashCommands())return[];if(B0())return e.filter((t)=>t.type==="prompt"&&t.loadedFrom==="mcp"&&!t.disableModelInvocation&&!isSkillExcludedFromModel(t));return[]}
function getSkillOverride(e){if(e.type!=="prompt"||e.source==="plugin")return"on";let t=getInitialSettings(),n=t.skillOverrides,r=n?.[e.name]??(e.unqualifiedName!=null?n?.[e.unqualifiedName]:void 0)??"on";if(A$n(e,t))return r==="off"?"off":"user-invocable-only";return r}
function isSkillExcludedFromModel(e){let t=getSkillOverride(e);return t==="user-invocable-only"||t==="off"}
function isSkillOff(e){return getSkillOverride(e)==="off"}
function isSkillToolCommand(e){return e.type==="prompt"&&!e.disableModelInvocation&&!isSkillExcludedFromModel(e)&&(e.source==="builtin"||e.loadedFrom==="bundled"||e.loadedFrom==="skills"||e.loadedFrom==="commands_DEPRECATED"||e.hasUserSpecifiedDescription||!!e.whenToUse)}
function isBridgeSafeCommand(e){if(e.type==="local-jsx")return!1;if(e.type==="prompt")return!0;return BRIDGE_SAFE_COMMANDS.has(e)}
function findBridgeFallback(e){if(e.type!=="local-jsx")return;for(let t of BRIDGE_SAFE_COMMANDS)if(t.name===e.name&&t.type==="local")return t;return}
function isBridgeDispatchable(e){return isBridgeSafeCommand(e)||findBridgeFallback(e)!==void 0}
function deriveRequires(e){if(e.requires)return{workspace:e.requires.workspace??!1,ink:e.requires.ink??!1};switch(e.type){case"prompt":return{workspace:!1,ink:!1};case"local":return{workspace:!0,ink:!1};case"local-jsx":return{workspace:!0,ink:!0}}}
function isThinClientSafe(e){return!deriveRequires(e).workspace||e.thinClientDispatch!==void 0}
function routeThinClientCommand(e,t){if(e.type==="prompt")return"post-text";switch(e.thinClientDispatch){case"post-text":return"post-text";case"control-request":case"local-then-rpc":return e.type==="local"&&!t?"unavailable":"local";case"twin":return"post-text";case void 0:return e.type==="local-jsx"?"local":"post-text"}}
function filterCommandsForRemoteMode(e){return e.filter((t)=>t.type==="prompt"&&(t.source==="builtin"||t.source==="bundled")&&isThinClientSafe(t)||REMOTE_SAFE_COMMANDS.has(t))}
function filterCommandsForHeadless(e){if(getDisableSlashCommands())return[];return e.filter((t)=>t.type==="prompt"&&!t.disableNonInteractive||t.type==="local"&&t.supportsNonInteractive)}
function jLl(e,t){return e.name===t||getCommandName(e)===t||(e.aliases?.includes(t)??!1)}
function findCommand(e,t){return t.find((n)=>jLl(n,e))}
function hasCommand(e,t){return findCommand(e,t)!==void 0}
function filterSkillCommandsByAllowlist(e,t){if(t===void 0)return e;return e.filter((n)=>t.some((r)=>jLl(n,r)||n.name.endsWith(`:${r}`)))}
function getCommand(e,t){let n=findCommand(e,t);if(!n)throw ReferenceError(`Command ${e} not found. Available commands: ${t.map((r)=>{let o=getCommandName(r);return r.aliases?`${o} (aliases: ${r.aliases.join(", ")})`:o}).sort((r,o)=>r.localeCompare(o)).join(", ")}`);return n}
function formatDescriptionWithSource(e){if(e.type!=="prompt")return e.description;if(e.kind==="workflow")return`${e.description} (dynamic workflow)`;if(e.source==="plugin"){let t=e.pluginInfo?.pluginManifest;if(t)return`(${ET(t)}) ${e.description}`;return`${e.description} (plugin)`}if(e.source==="builtin"||e.source==="mcp"||e.source==="bundled")return e.description;return`${e.description} (${A7(e.source)})`}
function toSlashCommands(e){return e.filter((t)=>t.userInvocable!==!1).map((t)=>({name:getCommandName(t),description:formatDescriptionWithSource(t),argumentHint:t.argumentHint||"",aliases:t.aliases?.length?t.aliases:void 0}))}
var _Pe,Pko=null,hgm,xLl,AKn,kLl,eAt,R5t=null,Oko=null,Lko=null,Mko=null,BLl,ggm,Nko,HLl,_gm,ygm,ILl,hKn=null,FLl=null,gKn,DLl,PLl,ULl,OLl,LLl,_Kn=null,yKn=null,Tgm,INTERNAL_ONLY_COMMANDS,ANT_GATED_COMMANDS,x5t,builtInCommandNames,shippedCommandNames,MLl,vgm,TKn,xgm,Dko=null,getSkillToolCommands,getSlashCommandToolSkills,REMOTE_SAFE_COMMANDS,BRIDGE_SAFE_COMMANDS,fleetHostCommands;
var Sf=b(()=>{sn();xrl();Brl();Url();ool();sol();vol();Pol();Xol();rsl();hsl();Osl();Fsl();Wsl();Xsl();cll();gll();kll();lcl();dul();Hul();Pul();Yul();idl();ldl();udl();_dl();vdl();Rdl();kdl();bpl();Rpl();xpl();Xfl();sgl();agl();bgl();Ogl();Wgl();TSl();vSl();HSl();KCo();sbl();abl();cbl();_bl();Dbl();Mbl();OEl();zEl();XEl();ZEl();tCl();t8e();uCl();yCl();HCl();bv();Pee();rvl();avl();hvl();bvl();Rvl();twl();cwl();dwl();Awl();URl();VRl();exl();rxl();ixl();mxl();Axl();gxl();yxl();Txl();bxl();Cxl();wxl();$xl();Yxl();Qxl();tkl();lkl();ukl();Rn();bt();BIe();qe();tx();ln();x6();e9t();_9();BE();Oet();uqt();ta();lt();Ao();li();mkl();NVn();Lkl();jkl();cHl();THl();aRo();mct();xHl();MHl();BHl();QHl();rIl();sIl();aIl();cIl();dIl();mf();yr();_Pe=require("path"),hgm=(fIl(),ro(mIl)).default,xLl=(xIl(),ro(RIl)).default,AKn=(iPl(),ro(sPl)).default,kLl=(bPl(),ro(SPl)).default,eAt=(CPl(),ro(EPl)).default,BLl=(PPl(),ro(DPl)),ggm=BLl.default,Nko=BLl.goalNonInteractive,HLl=(FPl(),ro(BPl)).default,_gm=(KPl(),ro(VPl)).default,ygm=[],ILl=(eOl(),ro(ZPl)).default,gKn=FLl?.default??null,DLl=FLl?.prideNonInteractive??null,PLl=(cLl(),ro(lLl)).default,ULl=(ALl(),ro(fLl)),OLl=ULl?.default??null,LLl=ULl?.stopNonInteractive??null,Tgm={type:"prompt",name:"insights",description:"Generate a report analyzing your Claude Code sessions",contentLength:0,progressMessage:"analyzing your sessions",source:"builtin",disableModelInvocation:!0,requires:{workspace:!0},async getPromptForCommand(e,t){let n=(await Promise.resolve().then(() => (wLl(),vLl))).default;if(n.type!=="prompt")throw Error("unreachable");return n.getPromptForCommand(e,t)}},INTERNAL_ONLY_COMMANDS=[gyo,Frl,mSo,QEl,Bsl,E_o,cdl,..._Kn?[_Kn]:[],fxl,...yKn?[yKn]:[],Swo,Two,bwo,DVn,Ewo,igl,lbl,ibl,Sxl,Exl,vxl,Pwo,iIl,lIl,uIl,Pko].filter(Boolean),ANT_GATED_COMMANDS=[R5t,Oko,Lko,Mko].filter(Boolean),x5t=wn(()=>[Rrl,akl,FRl,Jsl,fwl,uwl,b_o,Dol,zxl,Zjn,eyo,...gKn?[gKn]:[],c8n,lll,uTo,All,hll,nyo,Psl,ATo,hTo,acl,...PLl&&isAgentsFleetEnabled()?[PLl]:[],...OLl&&isAgentsFleetEnabled()?[OLl]:[],eSo,gRo,yRo,Nwo,jvo,TRo,pxl,cSo,sdl,adl,gdl,Spl,wpl,Jfl,kul,mEo,sSo,nRo,yHl,GRl,CEo,xVn,kVn,wEo,ySl,CSl,kSl,zCo,Ibl,Lbl,NHl,kwo,kvo,kCl,$_o,UGn,ebl,KSl,sxl,JEl,Evo,gbl,jwo,iPe,Lte,Xio,Qio,Zio,LHl,RHl,vvo,wvo,Tgm,_gm,hgm,...xLl?[xLl]:[],...AKn&&isDaemonWorkerRegistryEnabled()?[AKn]:[],...kLl?[kLl]:[],...eAt?[eAt]:[],nvl,Fvo,TEo,Yvo,ggm,Nko,ewl,lwl,Vwo,Uxl,wdl(),Cdl(),...!isUsing3PServices()||getAPIProvider()==="gateway"?[xdl]:[],Gvo,...hKn?[hKn]:[],PEl,Nrl,...[],...ygm,KEl,...HLl?[HLl]:[],...ILl?[ILl]:[],Hwo,...R5t?[R5t]:[],...Oko?[Oko]:[],...Lko?[Lko]:[],...Mko?[Mko]:[],...ckl,...[]]),builtInCommandNames=wn(()=>new Set(x5t().flatMap((e)=>[e.name,...e.aliases??[]]))),shippedCommandNames=wn(()=>new Set([...builtInCommandNames(),...Dwo().map((e)=>e.name)]));MLl=(Iko(),ro(Hko)).getWorkflowCommands,vgm=(Iko(),ro(Hko)).invalidateWorkflowCache;TKn=wn(async(e)=>{let t=performance.now(),[{skillDirCommands:n,pluginSkills:r,bundledSkills:o,builtinPluginSkills:s},i,a]=await Promise.all([Cgm(e).then((c)=>(tu("skills_load_ms",performance.now()-t,t),c)),Q6e(),MLl?MLl(e):Promise.resolve([])]),l=dropShadowedFallbackSkills([...n,...a,...i,...r,...o,...s,...x5t()]);return Ywe("command",l.map((c)=>({name:c.name,source:c.type==="prompt"?c.source:"builtin"})).reverse(),{resolves:!0}),l},Bko);if(!(TKn.cache instanceof Map))TKn.cache=new Map;xgm=new Set;getSkillToolCommands=wn(async(e)=>{if(getDisableSlashCommands())return[];return(await getCommands(e)).filter(isSkillToolCommand)},Bko);if(!(getSkillToolCommands.cache instanceof Map))getSkillToolCommands.cache=new Map;getSlashCommandToolSkills=wn(async(e)=>{if(getDisableSlashCommands())return[];try{let n=(await getCommands(e)).filter((r)=>r.type==="prompt"&&r.source!=="builtin"&&!isSkillOff(r)&&(r.hasUserSpecifiedDescription||r.whenToUse)&&(r.loadedFrom==="skills"||r.loadedFrom==="plugin"||r.loadedFrom==="bundled"||r.disableModelInvocation));return Ie("cmd_load"),n}catch(t){return De(_o(t)),isTmuxControlMode("cmd_load","cmd_load_slash_tool_skills_failed"),logForDebugging("Returning empty skills array due to load failure"),[]}},Bko);if(!(getSlashCommandToolSkills.cache instanceof Map))getSlashCommandToolSkills.cache=new Map;REMOTE_SAFE_COMMANDS=new Set([zCo,Nwo,cSo,kvo,eyo,...gKn?[gKn]:[],vvo,nyo,$_o,E_o,mEo,CEo,Vwo,eSo,Evo,Yvo,TRo,yRo,TEo,Gvo,Lte,Qio,bwo,DVn,...Pko?[Pko]:[],...AKn?[AKn]:[],wEo,b_o,ATo,Fvo,gRo,jvo,nRo,Swo,Zjn,c8n,Nko,kwo,Hwo,mSo,Pwo,sSo,kVn,xVn,..._Kn?[_Kn]:[],...eAt?[eAt]:[]]),BRIDGE_SAFE_COMMANDS=new Set([c8n,gyo,Zjn,wvo,hTo,uTo,Nko,Rkl,...LLl?[LLl]:[],Two,Xio,Zio,jgl,nsl,...DLl?[DLl]:[],...yKn?[yKn]:[],Avl,XHl,lHl,Yfl,DVn,Ewo,...eAt?[eAt]:[],...hKn?[hKn]:[],...R5t?[R5t]:[],xVn,kVn,jwo]);fleetHostCommands=wn(()=>x5t().filter((e)=>e.fleetHostCall!==void 0))});
export {mvo,getBuiltinCommands,Cgm,meetsAvailabilityRequirement,Bko,getCommands,wgm,scopedSkillName,attributionSkillName,NLl,Rgm,clearCommandMemoizationCaches,clearCommandsCache,_resetFallbackTelemetryForTesting,dropShadowedFallbackSkills,dropShadowedBundledSkills,getMcpSkillCommands,getSkillOverride,isSkillExcludedFromModel,isSkillOff,isSkillToolCommand,isBridgeSafeCommand,findBridgeFallback,isBridgeDispatchable,deriveRequires,isThinClientSafe,routeThinClientCommand,filterCommandsForRemoteMode,filterCommandsForHeadless,jLl,findCommand,hasCommand,filterSkillCommandsByAllowlist,getCommand,formatDescriptionWithSource,toSlashCommands,_Pe,Pko,hgm,xLl,AKn,kLl,eAt,R5t,Oko,Lko,Mko,BLl,ggm,Nko,HLl,_gm,ygm,ILl,hKn,FLl,gKn,DLl,PLl,ULl,OLl,LLl,_Kn,yKn,Tgm,INTERNAL_ONLY_COMMANDS,ANT_GATED_COMMANDS,x5t,builtInCommandNames,shippedCommandNames,MLl,vgm,TKn,xgm,Dko,getSkillToolCommands,getSlashCommandToolSkills,REMOTE_SAFE_COMMANDS,BRIDGE_SAFE_COMMANDS,fleetHostCommands,Sf};
