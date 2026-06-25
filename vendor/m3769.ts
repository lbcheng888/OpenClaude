// @ts-nocheck
import {sleep} from "../src/telemetry/1488_withTimeout.ts";
import {or,dn} from "../src/config/0137_namespace.ts";
import {cn,Ct} from "./m197.ts";
import {Wt,ps} from "./m230.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {xe,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {execFileNoThrowWithCwd,Ii} from "./m690.ts";
import {saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b} from "../runtime.ts";
async function iUn(e,t){let n;for(let r=1;r<=t.attempts;r++)try{return await e(AbortSignal.timeout(t.timeoutMs))}catch(o){if(n=o,r>=t.attempts)break;t.onRetry?.(r,o);let s=500*3**(r-1);await sleep(s*(0.75+Math.random()*0.5))}throw n}
var Oao=()=>{};
function aUn(){return hct.join(or(),"local")}
function GDa(){return hct.join(aUn(),"claude")}
function VDa(){return(process.argv[1]||"").includes("/.claude/local/node_modules/")}
async function WDa(e,t,n){try{return await gct.writeFile(e,t,{encoding:"utf8",flag:"wx",mode:n}),!0}catch(r){if(cn(r)==="EEXIST")return!1;throw r}}
async function $bp(){try{let e=aUn();await Wt().mkdir(e),await WDa(hct.join(e,"package.json"),TeamDeleteToolName({name:"claude-local",version:"0.0.1",private:!0},null,2));let t=hct.join(e,"claude");if(await WDa(t,`#!/bin/sh
exec "${e}/node_modules/.bin/claude" "$@"`,493))await gct.chmod(t,493);return!0}catch(e){return logForDebugging(`Failed to set up local package environment: ${e}`,{level:"error"}),!1}}
async function u$t(e,t){try{if(!await $bp())return xe("update_apply","update_apply_env_setup_failed"),"install_failed";let n=t?t:e==="stable"?"stable":"latest",r=await execFileNoThrowWithCwd("npm",["install",`${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.190",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-24T02:21:52Z",GIT_SHA:"c1e566ee5380a4c29ddd0fd0a742361e013cebd0"}.PACKAGE_URL}@${n}`],{cwd:aUn(),maxBuffer:1e6});if(r.code!==0)return xe("update_apply","update_apply_local_npm_failed"),logForDebugging(`Failed to install Claude CLI package: ${r.stderr}`,{level:"error"}),r.code===190?"in_progress":"install_failed";return saveGlobalConfig((o)=>({...o,installMethod:"local"})),He("update_apply"),"success"}catch(n){return xe("update_apply","update_apply_local_exception"),Ie(n),"install_failed"}}
async function X4e(){try{return await gct.access(hct.join(aUn(),"node_modules",".bin","claude")),!0}catch{return!1}}
function _ct(){let e=process.env.SHELL||"";if(e.includes("zsh"))return"zsh";if(e.includes("bash"))return"bash";if(e.includes("fish"))return"fish";return"unknown"}
var gct,hct;
var Q4e=b(()=>{mn();tr();qe();dn();Ct();Ii();ps();vn();tn();gct=require("fs/promises"),hct=require("path")});
export {iUn,Oao,aUn,GDa,VDa,WDa,$bp,u$t,X4e,_ct,gct,hct,Q4e};
