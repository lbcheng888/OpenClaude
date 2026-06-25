// @ts-nocheck
import {mi,lr} from "./m233.ts";
import {b} from "../runtime.ts";
function q3l(e){let t=qOo.isIP(e);if(t===4)return V3l(e);if(t===6)return gkm(e);return!1}
function V3l(e){let t=e.split(".").map(Number),[n,r]=t;if(t.length!==4||n===void 0||r===void 0||t.some((o)=>Number.isNaN(o)))return!1;if(n===127)return!1;if(n===0)return!0;if(n===10)return!0;if(n===169&&r===254)return!0;if(n===172&&r>=16&&r<=31)return!0;if(n===100&&r>=64&&r<=127)return!0;if(n===192&&r===168)return!0;return!1}
function gkm(e){let t=e.toLowerCase();if(t==="::1")return!1;if(t==="::")return!0;let n=ykm(t);if(n!==null)return V3l(n);if(t.startsWith("fc")||t.startsWith("fd"))return!0;let r=mi(t,":");if(r&&r.length===4&&r>="fe80"&&r<="febf")return!0;return!1}
function _km(e){let t=[];if(e.includes(".")){let c=e.lastIndexOf(":"),u=e.slice(c+1);e=e.slice(0,c);let d=u.split(".").map(Number);if(d.length!==4||d.some((p)=>!Number.isInteger(p)||p<0||p>255))return null;t=[d[0]<<8|d[1],d[2]<<8|d[3]]}let n=e.indexOf("::"),r,o;if(n===-1)r=e.split(":"),o=[];else{let c=e.slice(0,n),u=e.slice(n+2);r=c===""?[]:c.split(":"),o=u===""?[]:u.split(":")}let i=8-t.length-r.length-o.length;if(i<0)return null;let l=[...r,...Array(i).fill("0"),...o].map((c)=>parseInt(c,16));if(l.some((c)=>Number.isNaN(c)||c<0||c>65535))return null;return l.push(...t),l.length===8?l:null}
function ykm(e){let t=_km(e);if(!t)return null;if(t[0]===0&&t[1]===0&&t[2]===0&&t[3]===0&&t[4]===0&&t[5]===65535){let n=t[6],r=t[7];return`${n>>8}.${n&255}.${r>>8}.${r&255}`}return null}
function K3l(e,t,n){let r="all"in t&&t.all===!0,o=qOo.isIP(e);if(o!==0){if(q3l(e)){n(W3l(e,e),"");return}let s=o===6?6:4;if(r)n(null,[{address:e,family:s}]);else n(null,e,s);return}G3l.lookup(e,{all:!0},(s,i)=>{if(s){n(s,"");return}for(let{address:c}of i)if(q3l(c)){n(W3l(e,c),"");return}let a=i[0];if(!a){n(Object.assign(Error(`ENOTFOUND ${e}`),{code:"ENOTFOUND",hostname:e}),"");return}let l=a.family===6?6:4;if(r)n(null,i.map((c)=>({address:c.address,family:c.family===6?6:4})));else n(null,a.address,l)})}
function W3l(e,t){let n=Error(`HTTP hook blocked: ${e} resolves to ${t} (private/link-local address). Loopback (127.0.0.1, ::1) is allowed for local dev.`);return Object.assign(n,{code:"ERR_HTTP_HOOK_BLOCKED_ADDRESS",hostname:e,address:t})}
var G3l,qOo;
var z3l=b(()=>{lr();G3l=require("dns"),qOo=require("net")});
export {q3l,V3l,gkm,_km,ykm,K3l,W3l,G3l,qOo,z3l};
