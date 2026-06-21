// @ts-nocheck
import {vmt,AWn,hWn} from "./m4689.ts";
import {Pt,Go} from "./m632.ts";
import {knl,Eqt} from "./m4440.ts";
import {gre} from "./m5.ts";
import {findGitRoot,Ba} from "./m693.ts";
import {execFileNoThrow,oa} from "./m684.ts";
import {Pn,Se,bt} from "./m195.ts";
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {_7,ik} from "../src/agent/0726_level.ts";
import {b,M} from "../runtime.ts";
import {Rde} from "./m6.ts";
import {O4} from "./m2337.ts";
async function gWn(e,t={}){let n=[],r=await AJp(e);if(!r.ok)return{ok:!1,error:r.error,warnings:n};let{pluginRoot:o,manifestPath:s,manifest:i}=r,a=await vmt(s),l=[a];if(a.success)l.push(...await AWn(o));for(let g of l)for(let _ of g.warnings)n.push(`${Dx.relative(Pt(),g.filePath)}: ${_.message}`);let c=l.find((g)=>!g.success);if(c){let g=c.errors.map((_)=>`  ${_.path}: ${_.message}`).join(`
`);return{ok:!1,error:`Plugin validation failed for ${c.filePath}:
${g}`,warnings:n}}let u=i.name;if(typeof u!=="string"||u.length===0)return{ok:!1,error:`plugin.json at ${s} has no "name" field`,warnings:n};let d=await hJp(o,u),p=typeof i.version==="string"&&i.version.length>0?i.version:void 0,m,f;if(p!==void 0)m=p,f="plugin.json";else if(d?.entry.version)m=d.entry.version,f="marketplace entry";else return{ok:!1,error:`No version to tag. Set "version" in ${Dx.relative(Pt(),s)}`+(d?` or in the marketplace entry at ${Dx.relative(Pt(),d.path)} plugins[${d.entryIndex}].`:".")+" Tags are only used for dependency version constraints, which require an explicit semver \u2014 the git-SHA fallback does not need a tag.",warnings:n};if(d?.entry.version&&p!==void 0&&d.entry.version!==p)return{ok:!1,error:`Version mismatch: plugin.json says "${p}" but ${Dx.relative(Pt(),d.path)} plugins[${d.entryIndex}].version says "${d.entry.version}". plugin.json wins at install time, so update the marketplace entry to "${p}" (or remove it) before tagging.`,warnings:n};if(Ofl.valid(m)===null)return{ok:!1,error:`Version "${m}" is not valid semver. Dependency resolution (resolveVersionRange) ignores tags whose suffix doesn't parse as semver, so this tag would never be selected.`,warnings:n};let A=knl(u,m);if(!gre(A))return{ok:!1,error:`Computed tag name "${A}" is not a valid git ref. Check the plugin name for characters git rejects (spaces, ~, ^, :, ?, *, [, \\, or sequences like .., @{, //).`,warnings:n};let h=findGitRoot(o);if(h===null)return{ok:!1,error:`${o} is not inside a git repository. Dependency tags are resolved via git ls-remote, so the plugin must live in a git repo.`,warnings:n};if(!t.force){let g=await TJp(h,d?[o,d.path]:[o]);if(g.length>0){let _=g.slice(0,5).join(`
  `),y=g.length>5?`
  \u2026and ${g.length-5} more`:"";return{ok:!1,error:`Uncommitted changes affecting this release \u2014 commit them first so the tag points at the version you intend to release (or use --force):
  ${_}${y}`,warnings:n}}}if(!t.force){if(await SJp(h,A))return{ok:!1,error:`Tag "${A}" already exists locally. Bump the version in ${f}, or re-run with --force to move the tag.`,warnings:n}}return{ok:!0,warnings:n,plan:{pluginName:u,version:m,versionFrom:f,tag:A,pluginRoot:o,gitRoot:h,marketplace:d?{path:d.path,entryIndex:d.entryIndex,entryVersion:d.entry.version}:void 0,validation:l}}}
async function _Wn(e,t){let n=["-C",e.gitRoot,"tag"];if(t.force)n.push("-f");n.push("-a",e.tag,"-m",hjt(e,t.message),"HEAD");let r=await execFileNoThrow("git",n);if(r.code!==0)return{ok:!1,error:`git tag failed (exit ${r.code}): ${r.stderr.trim()||r.stdout.trim()}`};if(!t.push)return{ok:!0,pushed:!1};if(!/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(t.remote))return{ok:!1,error:`Tag created locally but not pushed: "${t.remote}" is not a valid remote name.`};let o=["-C",e.gitRoot,"push"];if(t.force)o.push("--force");o.push(t.remote,`refs/tags/${e.tag}`);let s=await execFileNoThrow("git",o);if(s.code!==0)return{ok:!1,error:`Tag created locally but push failed (exit ${s.code}): ${s.stderr.trim()||s.stdout.trim()}`};return{ok:!0,pushed:!0}}
function hjt(e,t){return t===void 0?`${e.pluginName} ${e.version}`:t.replaceAll("%s",e.version)}
async function AJp(e){let t=Dx.resolve(e),n;try{n=await Ajt.stat(t)}catch(o){return{ok:!1,error:Pn(o)?`Path not found: ${t}`:`Cannot stat ${t}: ${Se(o)}`}}let r=n.isFile()?[[Dx.dirname(Dx.dirname(t)),t]]:[[t,Dx.join(t,".claude-plugin","plugin.json")],[Dx.dirname(t),Dx.join(t,"plugin.json")]];for(let[o,s]of r){let i;try{i=await Ajt.readFile(s,{encoding:"utf-8"})}catch(l){if(Pn(l))continue;return{ok:!1,error:`Cannot read ${s}: ${Se(l)}`}}let a;try{a=qt(i)}catch(l){return{ok:!1,error:`Invalid JSON in ${s}: ${Se(l)}`}}return{ok:!0,pluginRoot:o,manifestPath:s,manifest:typeof a==="object"&&a!==null?a:{}}}return{ok:!1,error:`No plugin manifest found. Expected ${Dx.join(t,".claude-plugin","plugin.json")}.`}}
async function hJp(e,t){let n=findGitRoot(e)??void 0,r=e;for(;;){let o=Dx.join(r,".claude-plugin","marketplace.json"),s=await gJp(o);if(s){for(let[a,l]of s.plugins.entries())if(_Jp(l,r,e,t))return{path:o,entryIndex:a,entry:l}}if(r===n)return;let i=Dx.dirname(r);if(i===r)return;r=i}}
async function gJp(e){let t;try{t=await Ajt.readFile(e,{encoding:"utf-8"})}catch(o){if(Pn(o))return;return}let n;try{n=qt(t)}catch{return}let r=_7().safeParse(n);return r.success?r.data:void 0}
function _Jp(e,t,n,r){if(typeof e.source==="string"){let o=Dx.resolve(t,e.source);return yJp(o,n)}return e.name===r}
function yJp(e,t){let n=(r)=>{let o=Dx.resolve(r);return o.endsWith(Dx.sep)?o.slice(0,-Dx.sep.length):o};return n(e)===n(t)}
async function TJp(e,t){let n=t.map((o)=>Dx.relative(e,o)||"."),r=await execFileNoThrow("git",["-C",e,"status","--porcelain","--",...n]);if(r.code!==0)return[];return r.stdout.split(`
`).map((o)=>o.slice(3).trim()).filter((o)=>o.length>0)}
async function SJp(e,t){let n=await execFileNoThrow("git",["-C",e,"tag","-l","--",t]);return n.code===0&&n.stdout.trim()===t}
var Ajt,Dx,Ofl;
var ybo=b(()=>{Rde();Go();bt();oa();Ba();Xt();Eqt();ik();hWn();Ajt=require("fs/promises"),Dx=require("path"),Ofl=M(O4(),1)});
export {gWn,_Wn,hjt,AJp,hJp,gJp,_Jp,yJp,TJp,SJp,Ajt,Dx,Ofl,ybo};
