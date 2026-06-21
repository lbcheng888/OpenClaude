// @ts-nocheck
import {ns} from "../src/mcp/2194_mcpServerName.ts";
import {Iqa,kqa,Hqa,R9t,f9n} from "./m4158.ts";
import {Js} from "../src/config/2697_oA.ts";
import {n0,Sw} from "../src/mcp/0728_serverName.ts";
import {Cs,Ph} from "./m2224.ts";
import {b} from "../runtime.ts";
import {zn} from "../src/api/2198_stopPeriodicGrowthBookRefresh.ts";
function isDangerousBashPermission(e,t){if(e!==ns)return!1;if(t===void 0||t==="")return!0;if(/^[\s*]+$/.test(t))return!0;return k9t(t,Iqa)}
function k9t(e,t){let n=e.trim().toLowerCase();if(n==="*")return!0;for(let r of t){let o=r.toLowerCase();if(n===o)return!0;if(n===`${o}:*`||n===`${o} *`)return!0;if(n===`${o}*`)return!0;if(n.startsWith(`${o} `)&&n.endsWith("*")){let s=n.slice(o.length+1);if(kqa.has(o)){if(/[$`]/.test(s))return!0;let i=Hqa[o];if(i==="all")return!0;let a=s.replace(/[\s:*]+$/,"").split(/\s+/).filter(Boolean),l=0;for(;l<a.length;l++){let u=a[l];if(!u.startsWith("-"))break;if(!u.includes("=")&&l+1<a.length&&!a[l+1].startsWith("-"))l++}let c=a[l];if(c===void 0){if((o==="curl"||o==="wget")&&a.some((u)=>u.includes("://")))continue;return!0}if(i?.has(c))return!0;continue}if(s.startsWith("-")){let i=s.slice(0,-1);if(!(/^python[\d.]*$/.test(o)&&/^-m\s+\w+\.[\w.]+(\s*:|\s+)$/.test(i)))return!0}}}return!1}
function isDangerousPowerShellPermission(e,t){if(e!==Js)return!1;if(t===void 0||t==="")return!0;if(/^[\s*]+$/.test(t))return!0;let n=t.trim().toLowerCase();if(n==="*")return!0;let r=[...R9t,"pwsh","powershell","cmd","wsl","iex","invoke-expression","icm","invoke-command","start-process","saps","start","start-job","sajb","start-threadjob","register-objectevent","register-engineevent","register-wmievent","register-scheduledjob","new-pssession","nsn","enter-pssession","etsn","add-type","new-object"];for(let o of r){if(n===o)return!0;if(n===`${o}:*`)return!0;if(n===`${o}*`)return!0;if(n===`${o} *`)return!0;if(n.startsWith(`${o} -`)&&n.endsWith("*"))return!0;let s=o.indexOf(" "),i=s===-1?`${o}.exe`:`${o.slice(0,s)}.exe${o.slice(s)}`;if(n===i)return!0;if(n===`${i}:*`)return!0;if(n===`${i}*`)return!0;if(n===`${i} *`)return!0;if(n.startsWith(`${i} -`)&&n.endsWith("*"))return!0}return!1}
function isDangerousTaskPermission(e,t){return n0(e)===Cs}
function isDangerousClassifierPermission(e,t){let n=`${e}\x00${t??""}`,r=Dqa.get(n);if(r!==void 0)return r;let o=isDangerousBashPermission(e,t)||isDangerousPowerShellPermission(e,t)||isDangerousTaskPermission(e,t);return Dqa.set(n,o),o}
var Dqa;
var A9n=b(()=>{zn();Ph();f9n();Sw();Dqa=new Map});
export {isDangerousBashPermission,k9t,isDangerousPowerShellPermission,isDangerousTaskPermission,isDangerousClassifierPermission,Dqa,A9n};
