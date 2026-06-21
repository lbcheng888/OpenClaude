// @ts-nocheck
import {parseCommand,extractCommandArguments,gRe} from "../src/telemetry/2674_parseCommandRaw.ts";
import {Tke,PYr} from "./m3269.ts";
import {YIn,IYr} from "./m3260.ts";
import {Zg,AN} from "../src/telemetry/5180_commandWithoutRedirections.ts";
import {b} from "../runtime.ts";
function Ojd(e,t){if(!t?.subcommands?.length)return!1;return t.subcommands.some((n)=>Array.isArray(n.name)?n.name.includes(e):n.name===e)}
async function I1t(e,t=0,n=0){if(n>2||t>10)return null;let r=await parseCommand(e);if(!r)return null;if(!r.commandNode)return{commandPrefix:null};let{envVars:o,commandNode:s}=r,i=extractCommandArguments(s),[a,...l]=i;if(!a)return{commandPrefix:null};let c=await Tke(a),u=Pjd.has(a)||c?.args&&JIn(c.args).some((m)=>m?.isCommand);if(u&&l[0]&&Ojd(l[0],c))u=!1;let d=u?await Ljd(a,l,t,n):await YIn(a,l,c);if(d===null&&t===0&&u)return null;let p=o.length?`${o.join(" ")} `:"";return{commandPrefix:d?p+d:null}}
async function Ljd(e,t,n,r){let o=await Tke(e);if(o?.args){let a=JIn(o.args).findIndex((l)=>l?.isCommand);if(a!==-1){let l=[e];for(let c=0;c<t.length&&c<=a;c++)if(c===a){let u=await I1t(t.slice(c).join(" "),n+1,r+1);if(u?.commandPrefix)return l.push(...u.commandPrefix.split(" ")),l.join(" ");break}else if(t[c]&&!t[c].startsWith("-")&&!mia.test(t[c]))l.push(t[c])}}let s=t.find((a)=>!a.startsWith("-")&&!fia.test(a)&&!mia.test(a));if(!s)return e;let i=await I1t(t.slice(t.indexOf(s)).join(" "),n+1,r+1);return!i?.commandPrefix?null:`${e} ${i.commandPrefix}`}
async function Aia(e,t){let n=Zg(e);if(n.length<=1){let i=await I1t(e);return i?.commandPrefix?[i.commandPrefix]:[]}let r=[];for(let i of n){let a=i.trim();if(t?.(a))continue;let l=await I1t(a);if(l?.commandPrefix)r.push(l.commandPrefix)}if(r.length===0)return[];let o=new Map;for(let i of r){let a=i.split(" ")[0],l=o.get(a);if(l)l.push(i);else o.set(a,[i])}let s=[];for(let[,i]of o)s.push(Mjd(i));return s}
function Mjd(e){if(e.length===0)return"";if(e.length===1)return e[0];let n=e[0].split(" "),r=n.length;for(let o=1;o<e.length;o++){let s=e[o].split(" "),i=0;while(i<r&&i<s.length&&n[i]===s[i])i++;r=i}return n.slice(0,Math.max(1,r)).join(" ")}
async function hia(e){let t=new Set;for(let n of Zg(e)){let r=n.trim(),o=await I1t(r);if(!o?.commandPrefix)continue;let s=await Njd(r,o.commandPrefix),i=await Bjd(s);if(i)t.add(i)}return[...t]}
async function Njd(e,t){let n=await parseCommand(e);if(n?.envVars.length){let r=`${n.envVars.join(" ")} `;if(t.startsWith(r))return t.slice(r.length)}return t}
async function Bjd(e){let t=e.split(" ").filter(Boolean);if(t.length<=1)return e;let n=[t[0]],r=await Tke(t[0]);for(let o=1;o<t.length;o++){let s=t[o];if(s.startsWith("-"))break;if(r?.args&&JIn(r.args).some((a)=>a?.isCommand)){if(fia.test(s))continue;n.push(s),r=await Tke(s);continue}let i=Fjd(r,s);if(!i)break;n.push(s),r=i}return n.join(" ")}
function Fjd(e,t){if(!e?.subcommands?.length)return null;let n=t.toLowerCase();return e.subcommands.find((r)=>JIn(r.name).some((o)=>o.toLowerCase()===n))??null}
var fia,mia,Pjd,JIn=(e)=>Array.isArray(e)?e:[e];
var OYr=b(()=>{IYr();AN();gRe();PYr();fia=/^\d+$/,mia=/^[A-Za-z_][A-Za-z0-9_]*=/,Pjd=new Set(["nice"])});
export {Ojd,I1t,Ljd,Aia,Mjd,hia,Njd,Bjd,Fjd,fia,mia,Pjd,JIn,OYr};
