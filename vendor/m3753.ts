// @ts-nocheck
import {sleep} from "../src/telemetry/1483_withTimeout.ts";
import {tr,sn} from "../src/config/0047_namespace.ts";
import {dn,bt} from "./m195.ts";
import {jt,ws} from "./m228.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Oe,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {execFileNoThrowWithCwd,oa} from "./m684.ts";
import {saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b} from "../runtime.ts";
async function fNn(e,t){let n;for(let r=1;r<=t.attempts;r++)try{return await e(AbortSignal.timeout(t.timeoutMs))}catch(o){if(n=o,r>=t.attempts)break;t.onRetry?.(r,o);let s=500*3**(r-1);await sleep(s*(0.75+Math.random()*0.5))}throw n}
var Jno=()=>{};
function ANn(){return gat.join(tr(),"local")}
function Rwa(){return gat.join(ANn(),"claude")}
function xwa(){return(process.argv[1]||"").includes("/.claude/local/node_modules/")}
async function wwa(e,t,n){try{return await _at.writeFile(e,t,{encoding:"utf8",flag:"wx",mode:n}),!0}catch(r){if(dn(r)==="EEXIST")return!1;throw r}}
async function edp(){try{let e=ANn();await jt().mkdir(e),await wwa(gat.join(e,"package.json"),Le({name:"claude-local",version:"0.0.1",private:!0},null,2));let t=gat.join(e,"claude");if(await wwa(t,`#!/bin/sh
exec "${e}/node_modules/.bin/claude" "$@"`,493))await _at.chmod(t,493);return!0}catch(e){return logForDebugging(`Failed to set up local package environment: ${e}`,{level:"error"}),!1}}
async function OFt(e,t){try{if(!await edp())return Oe("update_apply","update_apply_env_setup_failed"),"install_failed";let n=t?t:e==="stable"?"stable":"latest",r=await execFileNoThrowWithCwd("npm",["install",`${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.185",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-20T06:38:30Z",GIT_SHA:"9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"}.PACKAGE_URL}@${n}`],{cwd:ANn(),maxBuffer:1e6});if(r.code!==0)return Oe("update_apply","update_apply_local_npm_failed"),logForDebugging(`Failed to install Claude CLI package: ${r.stderr}`,{level:"error"}),r.code===190?"in_progress":"install_failed";return saveGlobalConfig((o)=>({...o,installMethod:"local"})),Ie("update_apply"),"success"}catch(n){return Oe("update_apply","update_apply_local_exception"),De(n),"install_failed"}}
async function N3e(){try{return await _at.access(gat.join(ANn(),"node_modules",".bin","claude")),!0}catch{return!1}}
function yat(){let e=process.env.SHELL||"";if(e.includes("zsh"))return"zsh";if(e.includes("bash"))return"bash";if(e.includes("fish"))return"fish";return"unknown"}
var _at,gat;
var B3e=b(()=>{ln();Qn();qe();sn();bt();oa();ws();Rn();Xt();_at=require("fs/promises"),gat=require("path")});
export {fNn,Jno,ANn,Rwa,xwa,wwa,edp,OFt,N3e,yat,_at,gat,B3e};
