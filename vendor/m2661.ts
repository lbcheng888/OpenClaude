// @ts-nocheck
import {att,p2e} from "../src/config/2658_recursive.ts";
import {Jo} from "./m2601.ts";
import {b,M} from "../runtime.ts";
function dSd(){let e=BAe.dirname($Li.fileURLToPath("file:///home/runner/work/claude-cli-internal/claude-cli-internal/node_modules/@anthropic-ai/sandbox-runtime/dist/sandbox/windows-sandbox-utils.js"));return BAe.resolve(e,"..","..")}
function svn(){let e=process.env.SRT_WIN_PATH;if(e&&Dqr.existsSync(e))return e;let t=dSd(),n=[BAe.join(t,"vendor","srt-win","target","release","srt-win.exe"),BAe.join(t,"dist","vendor","srt-win","target","release","srt-win.exe")];for(let r of n)if(Dqr.existsSync(r))return r;throw Error(`srt-win.exe not found. Set SRT_WIN_PATH or build with \`cargo build --release --manifest-path vendor/srt-win/Cargo.toml\`. Looked in: ${[e,...n].filter(Boolean).join(", ")}`)}
function qLi(e){if(e.groupSid)return["--group-sid",e.groupSid];return["--name",e.groupName??WDt]}
function pSd(e){let t=svn(),n=ULi.spawnSync(t,e,{encoding:"utf8",timeout:15000});if(n.error)throw Error(`srt-win ${e[0]}: spawn failed: ${n.error.message}`);return{status:n.status,stdout:(n.stdout??"").trim(),stderr:(n.stderr??"").trim()}}
function jLi(e){let t=pSd(e);if(t.status!==0)throw Error(`srt-win ${e.join(" ")} exited ${t.status}: ${t.stderr||t.stdout}`);try{return JSON.parse(t.stdout)}catch(n){throw Error(`srt-win ${e.join(" ")}: unparseable JSON output ${JSON.stringify(t.stdout)}: ${n.message}`)}}
function WLi(e){return jLi(["group","status",...qLi(e)])}
function GLi(e={}){let t=["wfp","status"];if(e.sublayerGuid)t.push("--sublayer-guid",e.sublayerGuid);let n=jLi(t);return{state:n.state,filters:n.filters,...n.port_range&&{portRange:n.port_range}}}
function VLi(e){let n=[svn(),"exec",...qLi(e.group)];n.push("--");let r=process.env.SystemRoot??"C:\\Windows",o=(e.binShell??"cmd").toLowerCase();if(o==="pwsh"||o.includes("powershell")){let a=o==="pwsh"?"pwsh.exe":BAe.join(r,"System32","WindowsPowerShell","v1.0","powershell.exe");n.push(a,"-NoProfile","-Command",e.command)}else n.push(BAe.join(r,"System32","cmd.exe"),"/d","/s","/c",e.command);let s=mSd(att(e.httpProxyPort,e.socksProxyPort));delete s.TMPDIR;let i={...process.env,...s};return{argv:n,env:i}}
function mSd(e){let t={};for(let n of e){let r=n.indexOf("=");if(r===-1)continue;t[n.slice(0,r)]=n.slice(r+1)}return t}
function Pqr(e,t,n){if(n==="created-not-on-token")return"The discriminator group exists but is not yet in this session's token. LOG OUT and back in to pick up the new group membership (it enters TokenGroups at logon). Network is not disrupted "+"meanwhile \u2014 WFP filter-0 PERMITs traffic while the group is absent "+"from your token.";let r=e.groupSid?`--group-sid ${e.groupSid}`:`--name ${e.groupName??WDt}`,o=t?` --sublayer-guid ${t}`:"";return`Windows sandbox needs a one-time install (one UAC prompt):
  npx sandbox-runtime windows-install
`+"  \u2014 or call installWindowsSandbox(), or run "+`\`srt-win.exe install ${r}${o}\` directly \u2014
`+`then LOG OUT and back in (the group SID enters TokenGroups at logon).
Network is not disrupted before the logout: while the group is absent from your token, WFP filter-0 PERMITs all traffic.`}
function KLi(e,t){let n=[],r=[],o;try{o=svn()}catch(a){return{errors:[a.message],warnings:r}}Jo(`[Sandbox Windows] using srt-win at ${o}`);let s;try{s=WLi(e)}catch(a){return n.push(`srt-win group status failed: ${a.message}`),{errors:n,warnings:r}}if(s.state!=="ready")n.push(`Discriminator group is ${s.state}`+(s.sid?` (sid=${s.sid})`:"")+". "+Pqr(e,t,s.state));if(s.warning)r.push(s.warning);let i;try{i=GLi({sublayerGuid:t})}catch(a){return n.push(`srt-win wfp status failed: ${a.message}`),{errors:n,warnings:r}}if(i.state!=="installed"){if(s.state==="ready")n.push(`WFP filters not installed under sublayer ${t??"(default)"}. `+Pqr(e,t,"absent"))}else if(i.portRange)Jo(`[Sandbox Windows] WFP installed: ${i.filters} filters, proxy port range ${i.portRange[0]}-${i.portRange[1]}`);return{errors:n,warnings:r}}
var Dqr,BAe,ULi,$Li,WDt="sandbox-runtime-net",Oqr;
var Lqr=b(()=>{p2e();Dqr=M(require("fs")),BAe=M(require("path")),ULi=require("child_process"),$Li=require("url"),Oqr=[60080,60089]});
export {dSd,svn,qLi,pSd,jLi,WLi,GLi,VLi,mSd,Pqr,KLi,Dqr,BAe,ULi,$Li,WDt,Oqr,Lqr};
