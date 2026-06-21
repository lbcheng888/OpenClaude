// @ts-nocheck
import {S8,AKe} from "../src/config/0745_level.ts";
import {j2,S7} from "../src/config/0746_bytes.ts";
import {getProxyUrl,O7,Z_} from "../src/config/1021_shouldBypassProxyWithCidr.ts";
import {Se,bt} from "./m195.ts";
import {b} from "../runtime.ts";
import {U8} from "./m1480.ts";
async function ILr(e,t=1e4){let n=new URL(e),r=n.hostname.replace(/^\[|\]$/g,"");if(n.protocol!=="https:")return{hostname:r,fingerprint:"http-loopback"};let o=n.port?Number(n.port):443,s=S8(),i=j2(),a=getProxyUrl(),l=a&&!O7(e)?await zWu(a,r,o,t):void 0;return new Promise((c,u)=>{let d=Fti.connect({host:r,port:o,servername:r,socket:l,timeout:t,...s&&{ca:s},...i},()=>{try{let p=d.getPeerCertificate(),m=typeof p?.fingerprint256==="string"?p.fingerprint256.replaceAll(":","").toLowerCase():"";if(d.destroy(),!m)u(Error("could not read TLS certificate fingerprint"));else c({hostname:r,fingerprint:m})}catch(p){d.destroy(),u(Error(Se(p)))}});d.setTimeout(t),d.once("error",(p)=>u(Error(Se(p)))),d.once("timeout",()=>{d.destroy(),l?.destroy(),u(Error("TLS connection timed out"))})})}
function zWu(e,t,n,r=1e4){let o=new URL(e),s=o.protocol==="https:",i=s?Bti.request:Nti.request,a=t.includes(":")?`[${t}]`:t,l={Host:`${a}:${n}`};if(o.username){let u=`${decodeURIComponent(o.username)}:${decodeURIComponent(o.password)}`;l["Proxy-Authorization"]="Basic "+Buffer.from(u).toString("base64")}let c=S8();return new Promise((u,d)=>{let p=i({host:o.hostname,port:o.port||(s?443:80),method:"CONNECT",path:`${a}:${n}`,timeout:r,headers:l,...s&&{...c&&{ca:c},...j2()}});p.once("connect",(m,f)=>{if(m.statusCode!==200)f.destroy(),d(Error(`proxy CONNECT failed: ${m.statusCode}`));else u(f)}),p.once("error",(m)=>d(Error(Se(m)))),p.once("timeout",()=>{p.destroy(),d(Error("proxy CONNECT timed out"))}),p.end()})}
var Nti,Bti,Fti;
var DLr=b(()=>{AKe();bt();S7();Z_();U8();Nti=require("http"),Bti=require("https"),Fti=require("tls")});
export {ILr,zWu,Nti,Bti,Fti,DLr};
