// @ts-nocheck
import {Pt,Go} from "./m632.ts";
import {k_e,XL,L6,S6e} from "./m4314.ts";
import {SW,Jae} from "../src/config/3258_errors.ts";
import {jt,Zde,jp,ws} from "./m228.ts";
import {b} from "../runtime.ts";
function mza(e){if(!e.startsWith("../"))return e;let t=Rdt(H_e.basename(Pt()));if(!t)return e;let n="../"+t+"/",r=e;while(r.startsWith(n))r=r.slice(n.length);if(r==="../"+t)return".";return r}
function fza(e){let t=e;if(t=k_e(t),t.length>0&&(SW.has(t[0])||t[0]==="/")){let r=t.indexOf(":",1);if(r>0)t=k_e(t.slice(r+1))}if(t=XL(t),t=L6(t),t=t.replace(/^(?:[A-Za-z0-9_.]+\\){0,3}FileSystem::/i,""),t=t.replace(/^[A-Za-z]:(?![/\\])/,"./"),t=t.replaceAll("\\","/"),t==="~"||t.startsWith("~/"))t=(pza.homedir()+t.slice(1)).replaceAll("\\","/");let n="";if(/^[A-Za-z]:\//.test(t))n=t.slice(0,2),t=t.slice(2);if(t=t.split("/").map((r)=>{if(r==="")return r;let o;do{if(o=r,r=r.replace(/ +$/,""),r==="."||r==="..")return r;r=r.replace(/\.+$/,"")}while(r!==o);return r||"."}).join("/"),t=H_e.posix.normalize(t),n)t=n+t;if(t.startsWith("./"))t=t.slice(2);return t}
function Rdt(e){return e.toLowerCase().replace(/\u0131/g,"i").replace(/\u017f/g,"s").normalize("NFC").replaceAll("\u03C2","\u03C3")}
function Aza(e){let t=jt(),n=Pt(),r=H_e.resolve(n,e),o=Zde(t,r)??r,s=jp(t,n).resolvedPath,i=s.endsWith(H_e.sep)?s:s+H_e.sep,a=Rdt(o),l=Rdt(s),c=Rdt(i);if(a===l)return".";if(!a.startsWith(c))return null;return a.slice(c.length).replaceAll("\\","/")}
function uza(e){if(e==="head"||e===".git")return!0;if(e.startsWith(".git/")||/^git~\d+($|\/)/.test(e))return!0;for(let t of O1p){if(t==="head")continue;if(e===t||e.startsWith(t+"/"))return!0}return!1}
function z3t(e){let t=fza(e),n=mza(Rdt(t));if(uza(n))return!0;let r=Aza(t);if(r!==null&&uza(r))return!0;return!1}
function D4n(e){let t=fza(e),n=mza(Rdt(t));if(dza(n))return!0;let r=Aza(t);if(r!==null&&dza(r))return!0;return!1}
function dza(e){if(e===".git"||e.startsWith(".git/"))return!0;return/^git~\d+($|\/)/.test(e)}
function P4n(e){if(!e.includes(","))return[e];return[e,...e.split(",")]}
var pza,H_e,O1p;
var hza=b(()=>{Go();ws();Jae();S6e();pza=require("os"),H_e=require("path");O1p=["head","objects","refs","hooks"]});
export {mza,fza,Rdt,Aza,uza,z3t,D4n,dza,P4n,pza,H_e,O1p,hza};
