// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {getRemoteUrl,gitExe,redactGitRemoteCredentials,ia} from "./m698.ts";
import {execFileNoThrowWithCwd,Ii} from "./m690.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {mi,lr} from "./m233.ts";
var yRt={};
ft(yRt,{parseGitRemote:()=>parseGitRemote,parseGitHubRepository:()=>parseGitHubRepository,isCachedGitHubRepo:()=>isCachedGitHubRepo,getCachedRepositoryHost:()=>getCachedRepositoryHost,getCachedRepository:()=>getCachedRepository,detectCurrentRepositoryWithHost:()=>detectCurrentRepositoryWithHost,detectCurrentRepository:()=>detectCurrentRepository,clearRepositoryCaches:()=>clearRepositoryCaches});
function clearRepositoryCaches(){YEe.clear()}
async function detectCurrentRepository(){let e=await detectCurrentRepositoryWithHost();if(!e)return null;if(e.host!=="github.com")return null;return`${e.owner}/${e.name}`}
async function detectCurrentRepositoryWithHost(e){let t=e??isTmuxControlMode();if(YEe.has(t))return YEe.get(t)??null;try{let n=e===void 0?await getRemoteUrl():null;if(!n){let{stdout:o,code:s}=await execFileNoThrowWithCwd(gitExe(),["config","--get","remote.origin.url"],{cwd:t,preserveOutputOnError:!1});n=s===0?o.trim()||null:null}if(logForDebugging(`Git remote URL: ${redactGitRemoteCredentials(n)}`),!n)return logForDebugging("No git remote URL found"),null;let r=parseGitRemote(n);if(logForDebugging(`Parsed repository: ${r?`${r.host}/${r.owner}/${r.name}`:null} from URL: ${redactGitRemoteCredentials(n)}`),r)YEe.set(t,r);return r}catch(n){return logForDebugging(`Error detecting repository: ${n}`),null}}
function getCachedRepository(){let e=YEe.get(isTmuxControlMode());if(!e||e.host!=="github.com")return null;return`${e.owner}/${e.name}`}
function getCachedRepositoryHost(){return YEe.get(isTmuxControlMode())?.host??null}
function isCachedGitHubRepo(){let e=isTmuxControlMode();if(!YEe.has(e))return;return YEe.get(e)?.host==="github.com"}
function parseGitRemote(e){let t=e.trim(),n=t.match(/^git@([^:]+):([^/]+)\/([^/]+?)(?:\.git)?$/);if(n?.[1]&&n[2]&&n[3]){if(!His(n[1]))return null;if(!Nje(n[2])||!Nje(n[3]))return null;return{host:n[1],owner:n[2],name:n[3]}}let r=t.match(/^(https?|ssh|git):\/\/(?:[^@]+@)?([^/:]+(?::\d+)?)\/([^/]+)\/([^/]+?)(?:\.git)?$/);if(r?.[1]&&r[2]&&r[3]&&r[4]){let o=r[1],s=r[2],i=mi(s,":");if(!His(i))return null;let a=o==="https"||o==="http"?s:i;if(!Nje(r[3])||!Nje(r[4]))return null;return{host:a,owner:r[3],name:r[4]}}return null}
function parseGitHubRepository(e){let t=e.trim(),n=parseGitRemote(t);if(n){if(n.host!=="github.com")return null;return`${n.owner}/${n.name}`}if(!t.includes("://")&&!t.includes("@")&&t.includes("/")){let r=t.split("/");if(r.length===2&&r[0]&&r[1]){let o=r[1].replace(/\.git$/,"");if(!Nje(r[0])||!Nje(o))return null;return`${r[0]}/${o}`}}return logForDebugging(`Could not parse repository from: ${t}`),null}
function Nje(e){return eau.test(e)&&!e.startsWith("-")&&e!=="."&&e!==".."}
function His(e){if(!e.includes("."))return!1;let t=e.split(".").pop();if(!t)return!1;return/^[a-zA-Z]+$/.test(t)}
var YEe,eau;
var _0=b(()=>{Po();qe();Ii();ia();lr();YEe=new Map;eau=/^[A-Za-z0-9._-]+$/});
export {yRt,clearRepositoryCaches,detectCurrentRepository,detectCurrentRepositoryWithHost,getCachedRepository,getCachedRepositoryHost,isCachedGitHubRepo,parseGitRemote,parseGitHubRepository,Nje,His,YEe,eau,_0};
