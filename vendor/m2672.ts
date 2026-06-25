// @ts-nocheck
import {drt,m$e} from "../src/config/2669_recursive.ts";
import {Lo} from "./m2612.ts";
import {b,x} from "../runtime.ts";
function M0d(){let e=Xhe.dirname(b2i.fileURLToPath("file:///home/runner/work/claude-cli-internal/claude-cli-internal/node_modules/@anthropic-ai/sandbox-runtime/dist/sandbox/windows-sandbox-utils.js"));return Xhe.resolve(e,"..","..")}
function Ywn(){let e=process.env.SRT_WIN_PATH;if(e&&uGr.existsSync(e))return e;let t=M0d(),n=[Xhe.join(t,"vendor","srt-win","target","release","srt-win.exe"),Xhe.join(t,"dist","vendor","srt-win","target","release","srt-win.exe")];for(let r of n)if(uGr.existsSync(r))return r;throw Error(`srt-win.exe not found. Set SRT_WIN_PATH or build with \`cargo build --release --manifest-path vendor/srt-win/Cargo.toml\`. Looked in: ${[e,...n].filter(Boolean).join(", ")}`)}
function E2i(e){if(e.groupSid)return["--group-sid",e.groupSid];return["--name",e.groupName??ELt]}
function N0d(e){let t=Ywn(),n=S2i.spawnSync(t,e,{encoding:"utf8",timeout:15000});if(n.error)throw Error(`srt-win ${e[0]}: spawn failed: ${n.error.message}`);return{status:n.status,stdout:(n.stdout??"").trim(),stderr:(n.stderr??"").trim()}}
function C2i(e){let t=N0d(e);if(t.status!==0)throw Error(`srt-win ${e.join(" ")} exited ${t.status}: ${t.stderr||t.stdout}`);try{return JSON.parse(t.stdout)}catch(n){throw Error(`srt-win ${e.join(" ")}: unparseable JSON output ${JSON.stringify(t.stdout)}: ${n.message}`)}}
function A2i(e){return C2i(["group","status",...E2i(e)])}
function R2i(e={}){let t=["wfp","status"];if(e.sublayerGuid)t.push("--sublayer-guid",e.sublayerGuid);let n=C2i(t);return{state:n.state,filters:n.filters,...n.port_range&&{portRange:n.port_range}}}
function v2i(e){let n=[Ywn(),"exec",...E2i(e.group)];n.push("--");let r=process.env.SystemRoot??"C:\\Windows",o=(e.binShell??"cmd").toLowerCase();if(o==="pwsh"||o.includes("powershell")){let a=o==="pwsh"?"pwsh.exe":Xhe.join(r,"System32","WindowsPowerShell","v1.0","powershell.exe");n.push(a,"-NoProfile","-Command",e.command)}else n.push(Xhe.join(r,"System32","cmd.exe"),"/d","/s","/c",e.command);let s=F0d(drt(e.httpProxyPort,e.socksProxyPort,void 0,e.proxyAuthToken));delete s.TMPDIR;let i={...process.env,...s};return{argv:n,env:i}}
function F0d(e){let t={};for(let n of e){let r=n.indexOf("=");if(r===-1)continue;t[n.slice(0,r)]=n.slice(r+1)}return t}
function dGr(e,t,n){if(n==="created-not-on-token")return"The discriminator group exists but is not yet in this session's token. LOG OUT and back in to pick up the new group membership (it enters TokenGroups at logon). Network is not disrupted "+"meanwhile \u2014 WFP filter-0 PERMITs traffic while the group is absent "+"from your token.";let r=e.groupSid?`--group-sid ${e.groupSid}`:`--name ${e.groupName??ELt}`,o=t?` --sublayer-guid ${t}`:"";return`Windows sandbox needs a one-time install (one UAC prompt):
  npx sandbox-runtime windows-install
`+"  \u2014 or call installWindowsSandbox(), or run "+`\`srt-win.exe install ${r}${o}\` directly \u2014
`+`then LOG OUT and back in (the group SID enters TokenGroups at logon).
Network is not disrupted before the logout: while the group is absent from your token, WFP filter-0 PERMITs all traffic.`}
function w2i(e,t){let n=[],r=[],o;try{o=Ywn()}catch(a){return{errors:[a.message],warnings:r}}Lo(`[Sandbox Windows] using srt-win at ${o}`);let s;try{s=A2i(e)}catch(a){return n.push(`srt-win group status failed: ${a.message}`),{errors:n,warnings:r}}if(s.state!=="ready")n.push(`Discriminator group is ${s.state}`+(s.sid?` (sid=${s.sid})`:"")+". "+dGr(e,t,s.state));if(s.warning)r.push(s.warning);let i;try{i=R2i({sublayerGuid:t})}catch(a){return n.push(`srt-win wfp status failed: ${a.message}`),{errors:n,warnings:r}}if(i.state!=="installed"){if(s.state==="ready")n.push(`WFP filters not installed under sublayer ${t??"(default)"}. `+dGr(e,t,"absent"))}else if(i.portRange)Lo(`[Sandbox Windows] WFP installed: ${i.filters} filters, proxy port range ${i.portRange[0]}-${i.portRange[1]}`);return{errors:n,warnings:r}}
var uGr,Xhe,S2i,b2i,ELt="sandbox-runtime-net",pGr;
var mGr=b(()=>{m$e();uGr=x(require("fs")),Xhe=x(require("path")),S2i=require("child_process"),b2i=require("url"),pGr=[60080,60089]});
export {M0d,Ywn,E2i,N0d,C2i,A2i,R2i,v2i,F0d,dGr,w2i,uGr,Xhe,S2i,b2i,ELt,pGr,mGr};
