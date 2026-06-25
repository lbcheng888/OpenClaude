// @ts-nocheck
import {execFileNoThrowWithCwd,Ii} from "./m690.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {dirIsInGitRepo,ia} from "./m698.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {cn,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
async function bon(e,t){let{code:n}=await execFileNoThrowWithCwd("git",["check-ignore","--",e],{preserveOutputOnError:!1,cwd:t});return n===0}
async function mau(e){let{stdout:t,code:n}=await execFileNoThrowWithCwd("git",["config","--global","--get","core.excludesfile"],{preserveOutputOnError:!1,cwd:e}),r=n===0?t.trim():"";if(r){if(r==="~"||r.startsWith("~/"))return $pe.join(jTr.homedir(),r.slice(2));if($pe.isAbsolute(r))return r}let o=process.env.XDG_CONFIG_HOME;if(o&&$pe.isAbsolute(o))return $pe.join(o,"git","ignore");return $pe.join(jTr.homedir(),".config","git","ignore")}
async function qis(e,t=isTmuxControlMode()){try{if(!await dirIsInGitRepo(t))return{written:!1,effective:!1};let n=e.replaceAll("\\","/"),r=`**/${n}`,o=n.endsWith("/")?`${n}sample-file.txt`:n;if(await bon(o,t))return{written:!1,effective:!0};let s=await mau(t),i=$pe.dirname(s);await XEe.mkdir(i,{recursive:!0});try{if((await XEe.readFile(s,{encoding:"utf-8"})).includes(r)){let c=await Uis(o,t)?"already_tracked":"excludesfile_not_read";return logForDebugging(`[gitignore] '${r}' already present in ${s} but git check-ignore reports not-ignored \u2014 ${$is(c,o)}`,{level:"warn"}),{written:!1,effective:!1,reason:c}}await XEe.appendFile(s,`
${r}
`)}catch(l){if(cn(l)==="ENOENT")await XEe.writeFile(s,`${r}
`,"utf-8");else throw l}if(!await bon(o,t)){let l=await Uis(o,t)?"already_tracked":"excludesfile_not_read";return logForDebugging(`[gitignore] wrote '${r}' to ${s} but git check-ignore still reports not-ignored \u2014 ${$is(l,o)}`,{level:"warn"}),{written:!0,effective:!1,reason:l}}return{written:!0,effective:!0}}catch(n){return logForDebugging(`Failed to add gitignore entry to global gitignore: ${n instanceof Error?n.message:String(n)}`,{level:"error"}),{written:!1,effective:!1}}}
async function Uis(e,t){let{code:n}=await execFileNoThrowWithCwd("git",["ls-files","--error-unmatch","--",e],{preserveOutputOnError:!1,cwd:t});return n===0}
function $is(e,t){return e==="already_tracked"?`'${t}' is tracked in the index; gitignore rules do not apply to tracked files`:"core.excludesfile may point elsewhere"}
var XEe,jTr,$pe;
var YTr=b(()=>{Po();qe();Ct();Ii();ia();XEe=require("fs/promises"),jTr=require("os"),$pe=require("path")});
export {bon,mau,qis,Uis,$is,XEe,jTr,$pe,YTr};
