// @ts-nocheck
import {execFileNoThrowWithCwd,oa} from "./m684.ts";
import {Pt,Go} from "./m632.ts";
import {dirIsInGitRepo,Ba} from "./m693.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {dn,bt} from "./m195.ts";
import {b} from "../runtime.ts";
async function $tn(e,t){let{code:n}=await execFileNoThrowWithCwd("git",["check-ignore","--",e],{preserveOutputOnError:!1,cwd:t});return n===0}
async function XJc(e){let{stdout:t,code:n}=await execFileNoThrowWithCwd("git",["config","--global","--get","core.excludesfile"],{preserveOutputOnError:!1,cwd:e}),r=n===0?t.trim():"";if(r){if(r==="~"||r.startsWith("~/"))return Ope.join(yAr.homedir(),r.slice(2));if(Ope.isAbsolute(r))return r}let o=process.env.XDG_CONFIG_HOME;if(o&&Ope.isAbsolute(o))return Ope.join(o,"git","ignore");return Ope.join(yAr.homedir(),".config","git","ignore")}
async function Ves(e,t=Pt()){try{if(!await dirIsInGitRepo(t))return{written:!1,effective:!1};let n=e.replaceAll("\\","/"),r=`**/${n}`,o=n.endsWith("/")?`${n}sample-file.txt`:n;if(await $tn(o,t))return{written:!1,effective:!0};let s=await XJc(t),i=Ope.dirname(s);await hbe.mkdir(i,{recursive:!0});try{if((await hbe.readFile(s,{encoding:"utf-8"})).includes(r)){let c=await Wes(o,t)?"already_tracked":"excludesfile_not_read";return logForDebugging(`[gitignore] '${r}' already present in ${s} but git check-ignore reports not-ignored \u2014 ${Ges(c,o)}`,{level:"warn"}),{written:!1,effective:!1,reason:c}}await hbe.appendFile(s,`
${r}
`)}catch(l){if(dn(l)==="ENOENT")await hbe.writeFile(s,`${r}
`,"utf-8");else throw l}if(!await $tn(o,t)){let l=await Wes(o,t)?"already_tracked":"excludesfile_not_read";return logForDebugging(`[gitignore] wrote '${r}' to ${s} but git check-ignore still reports not-ignored \u2014 ${Ges(l,o)}`,{level:"warn"}),{written:!0,effective:!1,reason:l}}return{written:!0,effective:!0}}catch(n){return logForDebugging(`Failed to add gitignore entry to global gitignore: ${n instanceof Error?n.message:String(n)}`,{level:"error"}),{written:!1,effective:!1}}}
async function Wes(e,t){let{code:n}=await execFileNoThrowWithCwd("git",["ls-files","--error-unmatch","--",e],{preserveOutputOnError:!1,cwd:t});return n===0}
function Ges(e,t){return e==="already_tracked"?`'${t}' is tracked in the index; gitignore rules do not apply to tracked files`:"core.excludesfile may point elsewhere"}
var hbe,yAr,Ope;
var TAr=b(()=>{Go();qe();bt();oa();Ba();hbe=require("fs/promises"),yAr=require("os"),Ope=require("path")});
export {$tn,XJc,Ves,Wes,Ges,hbe,yAr,Ope,TAr};
