// @ts-nocheck
import {_t,cu} from "./m582.ts";
import {Qm,Sw} from "../src/mcp/0728_serverName.ts";
import {mt,configProtoStore} from "./m2458.ts";
import {Text,cwe} from "./m2423.ts";
import {Ansi} from "./m2431.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function uPm(e){if(e?.startsWith("plugin"))return"plugin hooks.json";if(e?.startsWith("skill"))return"SKILL.md";return"settings.json"}
function dWl(e){if(e?.type==="rule"&&e.rule.ruleBehavior==="ask")return e.rule;if(e?.type==="subcommandResults"){for(let t of e.reasons.values())if(t.behavior==="ask"){let n=dWl(t.decisionReason);if(n)return n}}return}
function pWl(e,t,n){if(!e)return null;if(e.type==="classifier"){if(e.classifier==="auto-mode")return{reasonString:`Auto mode classifier requires confirmation for this ${t}.
${e.reason}`,configString:void 0,themeColor:"error"};return{reasonString:`Classifier ${_t.bold(e.classifier)} requires confirmation for this ${t}.
${e.reason}`,configString:void 0}}if(e.type==="subcommandResults"){let r=dWl(e);if(r)return pWl({type:"rule",rule:r},t,n)}switch(e.type){case"rule":{let r=_t.bold(Qm(e.rule.ruleValue));if(n==="auto"&&e.rule.ruleBehavior==="ask"&&e.rule.source!=="policySettings")return{reasonString:`Ask rule ${r} overrides auto mode for this ${t}.`,configString:"/permissions to let auto mode decide"};return{reasonString:`Permission rule ${r} requires confirmation for this ${t}.`,configString:e.rule.source==="policySettings"?void 0:"/permissions to update rules"}}case"hook":{let r=e.reason?`:
${e.reason}`:".",o=e.hookSource?` ${_t.dim(`[${e.hookSource}]`)}`:"";return{reasonString:`Hook ${_t.bold(e.hookName)} requires confirmation for this ${t}${r}${o}`,configString:`${uPm(e.hookSource)} to update hooks`}}case"safetyCheck":case"other":return{reasonString:e.reason,configString:void 0};case"workingDir":return{reasonString:e.reason,configString:"/permissions to update rules"};default:return null}}
function QU(e){let t=uWl.c(12),{permissionResult:n,toolType:r}=e,o=mt(dPm),s=n?.decisionReason,i;if(t[0]!==o||t[1]!==s||t[2]!==r)i=pWl(s,r,o),t[0]=o,t[1]=s,t[2]=r,t[3]=i;else i=t[3];let a=i;if(!a)return null;let l=a.themeColor??(n?.decisionReason?.type==="hook"&&o==="auto"?"warning":void 0),c;if(t[4]!==a.reasonString||t[5]!==l)c=l?eht.default.createElement(Text,{color:l},a.reasonString):eht.default.createElement(Text,null,eht.default.createElement(Ansi,null,a.reasonString)),t[4]=a.reasonString,t[5]=l,t[6]=c;else c=t[6];let u;if(t[7]!==a.configString)u=a.configString&&eht.default.createElement(Text,{dimColor:!0},a.configString),t[7]=a.configString,t[8]=u;else u=t[8];let d;if(t[9]!==c||t[10]!==u)d=eht.default.createElement(Box,{marginBottom:1,flexDirection:"column"},c,u),t[9]=c,t[10]=u,t[11]=d;else d=t[11];return d}
function dPm(e){return e.toolPermissionContext.mode}
var uWl,eht;
var oTe=b(()=>{cu();ze();configProtoStore();Sw();cwe();uWl=M(rt(),1),eht=M(Te(),1)});
export {uPm,dWl,pWl,QU,dPm,uWl,eht,oTe};
