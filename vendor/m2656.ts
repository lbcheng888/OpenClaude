// @ts-nocheck
import {Lo} from "./m2612.ts";
import {b} from "../runtime.ts";
function zWr(e){let t=e?.http??process.env.HTTP_PROXY??process.env.http_proxy??void 0,n=e?.https??process.env.HTTPS_PROXY??process.env.https_proxy??t,r=e?.noProxy??process.env.NO_PROXY??process.env.no_proxy??"";if(!t&&!n)return;let o=(a)=>{if(!a)return;let c=/^[a-z][a-z0-9+.-]*:\/\//i.test(a)?a:`http://${a}`;try{let u=new Dwn.URL(c);if(u.protocol!=="http:"&&u.protocol!=="https:"||!u.hostname)throw Error("unsupported scheme or empty host");return u}catch{Lo(`Invalid parent proxy URL, ignoring: ${JId(a)}`,{level:"error"});return}},s=o(t),i=o(n);if(!s&&!i)return;return{httpUrl:s,httpsUrl:i,noProxy:jId(r)}}
function jId(e){let t={all:!1,suffixes:[],cidr:new E4.BlockList};for(let n of e.split(",")){if(n=n.trim(),!n)continue;if(n==="*"){t.all=!0;continue}let r=n.indexOf("/");if(r!==-1){let a=n.slice(0,r),l=n.slice(r+1),c=E4.isIP(a);if(c&&l!==""&&/^\d+$/.test(l)){let u=Number(l),d=c===6?128:32;if(u>=0&&u<=d){try{t.cidr.addSubnet(a,u,c===6?"ipv6":"ipv4")}catch{}continue}}continue}let o=n.toLowerCase(),s=/^\[([^\]]+)\](?::\d+)?$/.exec(o);if(s)o=s[1];if(o.startsWith("*."))o=o.slice(1);let i=E4.isIP(o);if(!i){let a=o.lastIndexOf(":");if(a!==-1&&/^\d+$/.test(o.slice(a+1)))o=o.slice(0,a)}else try{t.cidr.addAddress(o,i===6?"ipv6":"ipv4");continue}catch{}t.suffixes.push(o)}return t}
function fLt(e,t){let n=QZ(t.toLowerCase().replace(/\.$/,""));if(n==="localhost")return!0;let r=E4.isIP(n);if(r){if(YId.check(n,r===6?"ipv6":"ipv4"))return!0}if(e.noProxy.all)return!0;if(r){if(e.noProxy.cidr.check(n,r===6?"ipv6":"ipv4"))return!0}for(let o of e.noProxy.suffixes)if(o.startsWith(".")){if(n===o.slice(1)||n.endsWith(o))return!0}else if(n===o||n.endsWith("."+o))return!0;return!1}
function hLt(e,t){if(t.isHttps)return e.httpsUrl??e.httpUrl;return e.httpUrl}
function jWr(e){let{destHost:t,destPort:n}=e,r=QZ(t);if(!gLt(r))return Promise.reject(Error(`Invalid destination host for CONNECT: ${JSON.stringify(t)}`));if(!Number.isInteger(n)||n<1||n>65535)return Promise.reject(Error(`Invalid destination port: ${n}`));let o=E4.isIP(r)===6?`[${r}]:${n}`:`${r}:${n}`;return new Promise((s,i)=>{let a=e.dial(),l=!1,c=(d)=>{if(l)return;l=!0,a.destroy(),i(d)},u=()=>c(Error("Proxy closed during CONNECT handshake"));a.setTimeout(e.timeoutMs??iUi,()=>c(Error("CONNECT handshake timed out"))),a.once("error",c),a.once("close",u),a.once(e.readyEvent,()=>{a.write(`CONNECT ${o} HTTP/1.1\r
Host: ${o}\r
`+(e.authHeader?`Proxy-Authorization: ${e.authHeader}\r
`:"")+`\r
`);let d="",p=(m)=>{d+=m.toString("latin1");let f=d.indexOf(`\r
\r
`);if(f===-1){if(d.length>16384)c(Error("CONNECT response header too large"));return}a.pause(),a.removeListener("data",p);let h=d.slice(0,d.indexOf(`\r
`));if(!/^HTTP\/1\.[01] 2\d\d(?:\s|$)/.test(h))return c(Error(`Proxy refused CONNECT: ${h.trim()}`));let g=d.slice(f+4);if(g.length)a.unshift(Buffer.from(g,"latin1"));l=!0,a.setTimeout(0),a.removeListener("error",c),a.removeListener("close",u),s(a)};a.on("data",p)})})}
function Pwn(e,t,n){let r=QZ(e.hostname),o=Number(e.port)||(e.protocol==="https:"?443:80),s=e.protocol==="https:";return jWr({destHost:t,destPort:n,authHeader:YWr(e),readyEvent:s?"secureConnect":"connect",dial:()=>s?sUi.connect({host:r,port:o,...E4.isIP(r)?{}:{servername:r}}):E4.connect(o,r)})}
function YWr(e){if(!e.username&&!e.password)return;try{let t=`${decodeURIComponent(e.username)}:${decodeURIComponent(e.password)}`;return`Basic ${Buffer.from(t).toString("base64")}`}catch{let t=`${e.username}:${e.password}`;return`Basic ${Buffer.from(t).toString("base64")}`}}
function Vwe(e){let t=new Set,n=e.connection;if(n)for(let o of String(n).split(","))t.add(o.trim().toLowerCase());let r={};for(let[o,s]of Object.entries(e)){let i=o.toLowerCase();if(!zId.has(i)&&!t.has(i))r[o]=s}return r}
function QZ(e){return e.startsWith("[")&&e.endsWith("]")?e.slice(1,-1):e}
function JWr(e){if(!e)return"-";if(!e.username&&!e.password)return e.href;let t=new Dwn.URL(e.href);return t.username="***",t.password="***",t.href}
function JId(e){return e.replace(/\/\/[^@/]*@/,"//***:***@")}
function gLt(e){if(!e||e.length>255)return!1;let t=QZ(e);if(t.includes("%"))return!1;if(E4.isIP(t))return!0;return/^[A-Za-z0-9._-]+$/.test(t)}
function aUi(e){try{let t=QZ(e),n=E4.isIP(t)===6?`[${t}]`:t,r=new Dwn.URL(`http://${n}/`).hostname;return QZ(r).replace(/\.$/,"")}catch{return}}
function Own(e,t,n=iUi){return new Promise((r,o)=>{let s=E4.connect(t,e),i=!1,a=(l)=>{if(i)return;if(i=!0,s.setTimeout(0),l)s.destroy(),o(l);else r(s)};s.setTimeout(n,()=>a(Error("connect timed out"))),s.once("connect",()=>a()),s.once("error",a),s.once("close",()=>a(Error("socket closed before connect")))})}
var E4,sUi,Dwn,iUi=30000,zId,YId;
var _Lt=b(()=>{E4=require("net"),sUi=require("tls"),Dwn=require("url"),zId=new Set(["connection","keep-alive","proxy-authenticate","proxy-authorization","proxy-connection","te","trailer","transfer-encoding","upgrade"]);YId=(()=>{let e=new E4.BlockList;return e.addSubnet("127.0.0.0",8,"ipv4"),e.addAddress("::1","ipv6"),e.addSubnet("::ffff:127.0.0.0",104,"ipv6"),e})()});
export {zWr,jId,fLt,hLt,jWr,Pwn,YWr,Vwe,QZ,JWr,JId,gLt,aUi,Own,E4,sUi,Dwn,iUi,zId,YId,_Lt};
