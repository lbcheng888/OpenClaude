// @ts-nocheck
import {bt,Gc} from "./m588.ts";
import {Gp,gA} from "../src/mcp/0733_serverName.ts";
import {_t,uo} from "./m2468.ts";
import {Text,zve} from "./m2433.ts";
import {Ansi} from "./m2441.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function T2m(e){if(e?.startsWith("plugin"))return"plugin hooks.json";if(e?.startsWith("skill"))return"SKILL.md";return"settings.json"}
function zXl(e){if(e?.type==="rule"&&e.rule.ruleBehavior==="ask")return e.rule;if(e?.type==="subcommandResults"){for(let t of e.reasons.values())if(t.behavior==="ask"){let n=zXl(t.decisionReason);if(n)return n}}return}
function jXl(e,t,n){if(!e)return null;if(e.type==="classifier"){if(e.classifier==="auto-mode")return{reasonString:`Auto mode classifier requires confirmation for this ${t}.
${e.reason}`,configString:void 0,themeColor:"error"};return{reasonString:`Classifier ${bt.bold(e.classifier)} requires confirmation for this ${t}.
${e.reason}`,configString:void 0}}if(e.type==="subcommandResults"){let r=zXl(e);if(r)return jXl({type:"rule",rule:r},t,n)}switch(e.type){case"rule":{let r=bt.bold(Gp(e.rule.ruleValue));if(n==="auto"&&e.rule.ruleBehavior==="ask"&&e.rule.source!=="policySettings")return{reasonString:`Ask rule ${r} overrides auto mode for this ${t}.`,configString:"/permissions to let auto mode decide"};return{reasonString:`Permission rule ${r} requires confirmation for this ${t}.`,configString:e.rule.source==="policySettings"?void 0:"/permissions to update rules"}}case"hook":{let r=e.reason?`:
${e.reason}`:".",o=e.hookSource?` ${bt.dim(`[${e.hookSource}]`)}`:"";return{reasonString:`Hook ${bt.bold(e.hookName)} requires confirmation for this ${t}${r}${o}`,configString:`${T2m(e.hookSource)} to update hooks`}}case"safetyCheck":case"other":return{reasonString:e.reason,configString:void 0};case"workingDir":return{reasonString:e.reason,configString:"/permissions to update rules"};default:return null}}
function gU(e){let t=KXl.c(12),{permissionResult:n,toolType:r}=e,o=_t(S2m),s=n?.decisionReason,i;if(t[0]!==o||t[1]!==s||t[2]!==r)i=jXl(s,r,o),t[0]=o,t[1]=s,t[2]=r,t[3]=i;else i=t[3];let a=i;if(!a)return null;let l=a.themeColor??(n?.decisionReason?.type==="hook"&&o==="auto"?"warning":void 0),c;if(t[4]!==a.reasonString||t[5]!==l)c=l?tVe.jsx(Text,{color:l,children:a.reasonString}):tVe.jsx(Text,{children:tVe.jsx(Ansi,{children:a.reasonString})}),t[4]=a.reasonString,t[5]=l,t[6]=c;else c=t[6];let u;if(t[7]!==a.configString)u=a.configString&&tVe.jsx(Text,{dimColor:!0,children:a.configString}),t[7]=a.configString,t[8]=u;else u=t[8];let d;if(t[9]!==c||t[10]!==u)d=tVe.jsxs(Box,{marginBottom:1,flexDirection:"column",children:[c,u]}),t[9]=c,t[10]=u,t[11]=d;else d=t[11];return d}
function S2m(e){return e.toolPermissionContext.mode}
var KXl,tVe;
var MSe=b(()=>{Gc();je();uo();gA();zve();KXl=x(tt(),1),tVe=x(oe(),1)});
export {T2m,zXl,jXl,gU,S2m,KXl,tVe,MSe};
