// @ts-nocheck
import {parseCommand,extractCommandArguments,nke} from "../src/telemetry/2685_parseCommandRaw.ts";
import {aIe,geo} from "./m3285.ts";
import {BPn,feo} from "./m3276.ts";
import {u_,H1} from "../src/telemetry/5213_commandWithoutRedirections.ts";
import {b} from "../runtime.ts";
function bXd(e,t){if(!t?.subcommands?.length)return!1;return t.subcommands.some((n)=>Array.isArray(n.name)?n.name.includes(e):n.name===e)}
async function lBt(e,t=0,n=0){if(n>2||t>10)return null;let r=await parseCommand(e);if(!r)return null;if(!r.commandNode)return{commandPrefix:null};let{envVars:o,commandNode:s}=r,i=extractCommandArguments(s),[a,...l]=i;if(!a)return{commandPrefix:null};let c=await aIe(a),u=SXd.has(a)||c?.args&&UPn(c.args).some((m)=>m?.isCommand);if(u&&l[0]&&bXd(l[0],c))u=!1;let d=u?await EXd(a,l,t,n):await BPn(a,l,c);if(d===null&&t===0&&u)return null;let p=o.length?`${o.join(" ")} `:"";return{commandPrefix:d?p+d:null}}
async function EXd(e,t,n,r){let o=await aIe(e);if(o?.args){let a=UPn(o.args).findIndex((l)=>l?.isCommand);if(a!==-1){let l=[e];for(let c=0;c<t.length&&c<=a;c++)if(c===a){let u=await lBt(t.slice(c).join(" "),n+1,r+1);if(u?.commandPrefix)return l.push(...u.commandPrefix.split(" ")),l.join(" ");break}else if(t[c]&&!t[c].startsWith("-")&&!Tma.test(t[c]))l.push(t[c])}}let s=t.find((a)=>!a.startsWith("-")&&!Sma.test(a)&&!Tma.test(a));if(!s)return e;let i=await lBt(t.slice(t.indexOf(s)).join(" "),n+1,r+1);return!i?.commandPrefix?null:`${e} ${i.commandPrefix}`}
async function bma(e,t){let n=u_(e);if(n.length<=1){let i=await lBt(e);return i?.commandPrefix?[i.commandPrefix]:[]}let r=[];for(let i of n){let a=i.trim();if(t?.(a))continue;let l=await lBt(a);if(l?.commandPrefix)r.push(l.commandPrefix)}if(r.length===0)return[];let o=new Map;for(let i of r){let a=i.split(" ")[0],l=o.get(a);if(l)l.push(i);else o.set(a,[i])}let s=[];for(let[,i]of o)s.push(CXd(i));return s}
function CXd(e){if(e.length===0)return"";if(e.length===1)return e[0];let n=e[0].split(" "),r=n.length;for(let o=1;o<e.length;o++){let s=e[o].split(" "),i=0;while(i<r&&i<s.length&&n[i]===s[i])i++;r=i}return n.slice(0,Math.max(1,r)).join(" ")}
async function Ema(e){let t=new Set;for(let n of u_(e)){let r=n.trim(),o=await lBt(r);if(!o?.commandPrefix)continue;let s=await AXd(r,o.commandPrefix),i=await RXd(s);if(i)t.add(i)}return[...t]}
async function AXd(e,t){let n=await parseCommand(e);if(n?.envVars.length){let r=`${n.envVars.join(" ")} `;if(t.startsWith(r))return t.slice(r.length)}return t}
async function RXd(e){let t=e.split(" ").filter(Boolean);if(t.length<=1)return e;let n=[t[0]],r=await aIe(t[0]);for(let o=1;o<t.length;o++){let s=t[o];if(s.startsWith("-"))break;if(r?.args&&UPn(r.args).some((a)=>a?.isCommand)){if(Sma.test(s))continue;n.push(s),r=await aIe(s);continue}let i=vXd(r,s);if(!i)break;n.push(s),r=i}return n.join(" ")}
function vXd(e,t){if(!e?.subcommands?.length)return null;let n=t.toLowerCase();return e.subcommands.find((r)=>UPn(r.name).some((o)=>o.toLowerCase()===n))??null}
var Sma,Tma,SXd,UPn=(e)=>Array.isArray(e)?e:[e];
var _eo=b(()=>{feo();H1();nke();geo();Sma=/^\d+$/,Tma=/^[A-Za-z_][A-Za-z0-9_]*=/,SXd=new Set(["nice"])});
export {bXd,lBt,EXd,bma,CXd,Ema,AXd,RXd,vXd,Sma,Tma,SXd,UPn,_eo};
