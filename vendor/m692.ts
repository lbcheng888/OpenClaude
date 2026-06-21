// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Pt,Go} from "./m632.ts";
import {getRemoteUrl,gitExe,redactGitRemoteCredentials,Ba} from "./m693.ts";
import {execFileNoThrowWithCwd,oa} from "./m684.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Di,dr} from "./m231.ts";
var Gbt={};
isFullscreenWithTTY(Gbt,{parseGitRemote:()=>parseGitRemote,parseGitHubRepository:()=>parseGitHubRepository,isCachedGitHubRepo:()=>isCachedGitHubRepo,getCachedRepositoryHost:()=>getCachedRepositoryHost,getCachedRepository:()=>getCachedRepository,detectCurrentRepositoryWithHost:()=>detectCurrentRepositoryWithHost,detectCurrentRepository:()=>detectCurrentRepository,clearRepositoryCaches:()=>clearRepositoryCaches});
function clearRepositoryCaches(){fbe.clear()}
async function detectCurrentRepository(){let e=await detectCurrentRepositoryWithHost();if(!e)return null;if(e.host!=="github.com")return null;return`${e.owner}/${e.name}`}
async function detectCurrentRepositoryWithHost(e){let t=e??Pt();if(fbe.has(t))return fbe.get(t)??null;try{let n=e===void 0?await getRemoteUrl():null;if(!n){let{stdout:o,code:s}=await execFileNoThrowWithCwd(gitExe(),["config","--get","remote.origin.url"],{cwd:t,preserveOutputOnError:!1});n=s===0?o.trim()||null:null}if(logForDebugging(`Git remote URL: ${redactGitRemoteCredentials(n)}`),!n)return logForDebugging("No git remote URL found"),null;let r=parseGitRemote(n);if(logForDebugging(`Parsed repository: ${r?`${r.host}/${r.owner}/${r.name}`:null} from URL: ${redactGitRemoteCredentials(n)}`),r)fbe.set(t,r);return r}catch(n){return logForDebugging(`Error detecting repository: ${n}`),null}}
function getCachedRepository(){let e=fbe.get(Pt());if(!e||e.host!=="github.com")return null;return`${e.owner}/${e.name}`}
function getCachedRepositoryHost(){return fbe.get(Pt())?.host??null}
function isCachedGitHubRepo(){let e=Pt();if(!fbe.has(e))return;return fbe.get(e)?.host==="github.com"}
function parseGitRemote(e){let t=e.trim(),n=t.match(/^git@([^:]+):([^/]+)\/([^/]+?)(?:\.git)?$/);if(n?.[1]&&n[2]&&n[3]){if(!Pes(n[1]))return null;if(!F7e(n[2])||!F7e(n[3]))return null;return{host:n[1],owner:n[2],name:n[3]}}let r=t.match(/^(https?|ssh|git):\/\/(?:[^@]+@)?([^/:]+(?::\d+)?)\/([^/]+)\/([^/]+?)(?:\.git)?$/);if(r?.[1]&&r[2]&&r[3]&&r[4]){let o=r[1],s=r[2],i=Di(s,":");if(!Pes(i))return null;let a=o==="https"||o==="http"?s:i;if(!F7e(r[3])||!F7e(r[4]))return null;return{host:a,owner:r[3],name:r[4]}}return null}
function parseGitHubRepository(e){let t=e.trim(),n=parseGitRemote(t);if(n){if(n.host!=="github.com")return null;return`${n.owner}/${n.name}`}if(!t.includes("://")&&!t.includes("@")&&t.includes("/")){let r=t.split("/");if(r.length===2&&r[0]&&r[1]){let o=r[1].replace(/\.git$/,"");if(!F7e(r[0])||!F7e(o))return null;return`${r[0]}/${o}`}}return logForDebugging(`Could not parse repository from: ${t}`),null}
function F7e(e){return BJc.test(e)&&!e.startsWith("-")&&e!=="."&&e!==".."}
function Pes(e){if(!e.includes("."))return!1;let t=e.split(".").pop();if(!t)return!1;return/^[a-zA-Z]+$/.test(t)}
var fbe,BJc;
var ZI=b(()=>{Go();qe();oa();Ba();dr();fbe=new Map;BJc=/^[A-Za-z0-9._-]+$/});
export {Gbt,clearRepositoryCaches,detectCurrentRepository,detectCurrentRepositoryWithHost,getCachedRepository,getCachedRepositoryHost,isCachedGitHubRepo,parseGitRemote,parseGitHubRepository,F7e,Pes,fbe,BJc,ZI};
