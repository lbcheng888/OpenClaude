// @ts-nocheck
import {Nht,ezn,tzn} from "./m4721.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {hcl,Y5t} from "./m4462.ts";
import {Sre} from "./m127.ts";
import {findGitRoot,ia} from "./m698.ts";
import {execFileNoThrow,Ii} from "./m690.ts";
import {In,Ce,Ct} from "./m197.ts";
import {qt,tn} from "../src/config/0230_encoding.ts";
import {GK,bk} from "../src/agent/0731_level.ts";
import {b,x} from "../runtime.ts";
import {bre} from "./m129.ts";
import {t4} from "./m2347.ts";
async function nzn(e,t={}){let n=[],r=await wsm(e);if(!r.ok)return{ok:!1,error:r.error,warnings:n};let{pluginRoot:o,manifestPath:s,manifest:i}=r,a=await Nht(s),l=[a];if(a.success)l.push(...await ezn(o));for(let _ of l)for(let T of _.warnings)n.push(`${Gw.relative(isTmuxControlMode(),_.filePath)}: ${T.message}`);let c=l.find((_)=>!_.success);if(c){let _=c.errors.map((T)=>`  ${T.path}: ${T.message}`).join(`
`);return{ok:!1,error:`Plugin validation failed for ${c.filePath}:
${_}`,warnings:n}}let u=i.name;if(typeof u!=="string"||u.length===0)return{ok:!1,error:`plugin.json at ${s} has no "name" field`,warnings:n};let d=await ksm(o,u),p=typeof i.version==="string"&&i.version.length>0?i.version:void 0,m,f;if(p!==void 0)m=p,f="plugin.json";else if(d?.entry.version)m=d.entry.version,f="marketplace entry";else return{ok:!1,error:`No version to tag. Set "version" in ${Gw.relative(isTmuxControlMode(),s)}`+(d?` or in the marketplace entry at ${Gw.relative(isTmuxControlMode(),d.path)} plugins[${d.entryIndex}].`:".")+" Tags are only used for dependency version constraints, which require an explicit semver \u2014 the git-SHA fallback does not need a tag.",warnings:n};if(d?.entry.version&&p!==void 0&&d.entry.version!==p)return{ok:!1,error:`Version mismatch: plugin.json says "${p}" but ${Gw.relative(isTmuxControlMode(),d.path)} plugins[${d.entryIndex}].version says "${d.entry.version}". plugin.json wins at install time, so update the marketplace entry to "${p}" (or remove it) before tagging.`,warnings:n};if(IEl.valid(m)===null)return{ok:!1,error:`Version "${m}" is not valid semver. Dependency resolution (resolveVersionRange) ignores tags whose suffix doesn't parse as semver, so this tag would never be selected.`,warnings:n};let h=hcl(u,m);if(!Sre(h))return{ok:!1,error:`Computed tag name "${h}" is not a valid git ref. Check the plugin name for characters git rejects (spaces, ~, ^, :, ?, *, [, \\, or sequences like .., @{, //).`,warnings:n};let g=findGitRoot(o);if(g===null)return{ok:!1,error:`${o} is not inside a git repository. Dependency tags are resolved via git ls-remote, so the plugin must live in a git repo.`,warnings:n};if(!t.force){let _=await Dsm(g,d?[o,d.path]:[o]);if(_.length>0){let T=_.slice(0,5).join(`
  `),y=_.length>5?`
  \u2026and ${_.length-5} more`:"";return{ok:!1,error:`Uncommitted changes affecting this release \u2014 commit them first so the tag points at the version you intend to release (or use --force):
  ${T}${y}`,warnings:n}}}if(!t.force){if(await Psm(g,h))return{ok:!1,error:`Tag "${h}" already exists locally. Bump the version in ${f}, or re-run with --force to move the tag.`,warnings:n}}return{ok:!0,warnings:n,plan:{pluginName:u,version:m,versionFrom:f,tag:h,pluginRoot:o,gitRoot:g,marketplace:d?{path:d.path,entryIndex:d.entryIndex,entryVersion:d.entry.version}:void 0,validation:l}}}
async function rzn(e,t){let n=["-C",e.gitRoot,"tag"];if(t.force)n.push("-f");n.push("-a",e.tag,"-m",OWt(e,t.message),"HEAD");let r=await execFileNoThrow("git",n);if(r.code!==0)return{ok:!1,error:`git tag failed (exit ${r.code}): ${r.stderr.trim()||r.stdout.trim()}`};if(!t.push)return{ok:!0,pushed:!1};if(!/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(t.remote))return{ok:!1,error:`Tag created locally but not pushed: "${t.remote}" is not a valid remote name.`};let o=["-C",e.gitRoot,"push"];if(t.force)o.push("--force");o.push(t.remote,`refs/tags/${e.tag}`);let s=await execFileNoThrow("git",o);if(s.code!==0)return{ok:!1,error:`Tag created locally but push failed (exit ${s.code}): ${s.stderr.trim()||s.stdout.trim()}`};return{ok:!0,pushed:!0}}
function OWt(e,t){return t===void 0?`${e.pluginName} ${e.version}`:t.replaceAll("%s",e.version)}
async function wsm(e){let t=Gw.resolve(e),n;try{n=await PWt.stat(t)}catch(o){return{ok:!1,error:In(o)?`Path not found: ${t}`:`Cannot stat ${t}: ${Ce(o)}`}}let r=n.isFile()?[[Gw.dirname(Gw.dirname(t)),t]]:[[t,Gw.join(t,".claude-plugin","plugin.json")],[Gw.dirname(t),Gw.join(t,"plugin.json")]];for(let[o,s]of r){let i;try{i=await PWt.readFile(s,{encoding:"utf-8"})}catch(l){if(In(l))continue;return{ok:!1,error:`Cannot read ${s}: ${Ce(l)}`}}let a;try{a=qt(i)}catch(l){return{ok:!1,error:`Invalid JSON in ${s}: ${Ce(l)}`}}return{ok:!0,pluginRoot:o,manifestPath:s,manifest:typeof a==="object"&&a!==null?a:{}}}return{ok:!1,error:`No plugin manifest found. Expected ${Gw.join(t,".claude-plugin","plugin.json")}.`}}
async function ksm(e,t){let n=findGitRoot(e)??void 0,r=e;for(;;){let o=Gw.join(r,".claude-plugin","marketplace.json"),s=await Hsm(o);if(s){for(let[a,l]of s.plugins.entries())if(Ism(l,r,e,t))return{path:o,entryIndex:a,entry:l}}if(r===n)return;let i=Gw.dirname(r);if(i===r)return;r=i}}
async function Hsm(e){let t;try{t=await PWt.readFile(e,{encoding:"utf-8"})}catch(o){if(In(o))return;return}let n;try{n=qt(t)}catch{return}let r=GK().safeParse(n);return r.success?r.data:void 0}
function Ism(e,t,n,r){if(typeof e.source==="string"){let o=Gw.resolve(t,e.source);return xsm(o,n)}return e.name===r}
function xsm(e,t){let n=(r)=>{let o=Gw.resolve(r);return o.endsWith(Gw.sep)?o.slice(0,-Gw.sep.length):o};return n(e)===n(t)}
async function Dsm(e,t){let n=t.map((o)=>Gw.relative(e,o)||"."),r=await execFileNoThrow("git",["-C",e,"status","--porcelain","--",...n]);if(r.code!==0)return[];return r.stdout.split(`
`).map((o)=>o.slice(3).trim()).filter((o)=>o.length>0)}
async function Psm(e,t){let n=await execFileNoThrow("git",["-C",e,"tag","-l","--",t]);return n.code===0&&n.stdout.trim()===t}
var PWt,Gw,IEl;
var Nwo=b(()=>{bre();Po();Ct();Ii();ia();tn();Y5t();bk();tzn();PWt=require("fs/promises"),Gw=require("path"),IEl=x(t4(),1)});
export {nzn,rzn,OWt,wsm,ksm,Hsm,Ism,xsm,Dsm,Psm,PWt,Gw,IEl,Nwo};
