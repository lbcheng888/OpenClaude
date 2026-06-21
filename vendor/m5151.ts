// @ts-nocheck
import {Di,dr} from "./m231.ts";
import {b} from "../runtime.ts";
function o1l(e){let t=xHo.isIP(e);if(t===4)return a1l(e);if(t===6)return K_m(e);return!1}
function a1l(e){let t=e.split(".").map(Number),[n,r]=t;if(t.length!==4||n===void 0||r===void 0||t.some((o)=>Number.isNaN(o)))return!1;if(n===127)return!1;if(n===0)return!0;if(n===10)return!0;if(n===169&&r===254)return!0;if(n===172&&r>=16&&r<=31)return!0;if(n===100&&r>=64&&r<=127)return!0;if(n===192&&r===168)return!0;return!1}
function K_m(e){let t=e.toLowerCase();if(t==="::1")return!1;if(t==="::")return!0;let n=Y_m(t);if(n!==null)return a1l(n);if(t.startsWith("fc")||t.startsWith("fd"))return!0;let r=Di(t,":");if(r&&r.length===4&&r>="fe80"&&r<="febf")return!0;return!1}
function z_m(e){let t=[];if(e.includes(".")){let c=e.lastIndexOf(":"),u=e.slice(c+1);e=e.slice(0,c);let d=u.split(".").map(Number);if(d.length!==4||d.some((p)=>!Number.isInteger(p)||p<0||p>255))return null;t=[d[0]<<8|d[1],d[2]<<8|d[3]]}let n=e.indexOf("::"),r,o;if(n===-1)r=e.split(":"),o=[];else{let c=e.slice(0,n),u=e.slice(n+2);r=c===""?[]:c.split(":"),o=u===""?[]:u.split(":")}let i=8-t.length-r.length-o.length;if(i<0)return null;let l=[...r,...Array(i).fill("0"),...o].map((c)=>parseInt(c,16));if(l.some((c)=>Number.isNaN(c)||c<0||c>65535))return null;return l.push(...t),l.length===8?l:null}
function Y_m(e){let t=z_m(e);if(!t)return null;if(t[0]===0&&t[1]===0&&t[2]===0&&t[3]===0&&t[4]===0&&t[5]===65535){let n=t[6],r=t[7];return`${n>>8}.${n&255}.${r>>8}.${r&255}`}return null}
function l1l(e,t,n){let r="all"in t&&t.all===!0,o=xHo.isIP(e);if(o!==0){if(o1l(e)){n(s1l(e,e),"");return}let s=o===6?6:4;if(r)n(null,[{address:e,family:s}]);else n(null,e,s);return}i1l.lookup(e,{all:!0},(s,i)=>{if(s){n(s,"");return}for(let{address:c}of i)if(o1l(c)){n(s1l(e,c),"");return}let a=i[0];if(!a){n(Object.assign(Error(`ENOTFOUND ${e}`),{code:"ENOTFOUND",hostname:e}),"");return}let l=a.family===6?6:4;if(r)n(null,i.map((c)=>({address:c.address,family:c.family===6?6:4})));else n(null,a.address,l)})}
function s1l(e,t){let n=Error(`HTTP hook blocked: ${e} resolves to ${t} (private/link-local address). Loopback (127.0.0.1, ::1) is allowed for local dev.`);return Object.assign(n,{code:"ERR_HTTP_HOOK_BLOCKED_ADDRESS",hostname:e,address:t})}
var i1l,xHo;
var c1l=b(()=>{dr();i1l=require("dns"),xHo=require("net")});
export {o1l,a1l,K_m,z_m,Y_m,l1l,s1l,i1l,xHo,c1l};
