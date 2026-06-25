// @ts-nocheck
import {N5,mYe} from "../src/config/0750_level.ts";
import {u2,zK} from "../src/config/0751_bytes.ts";
import {getProxyUrl,shouldBypassProxy,ey} from "../src/config/1026_shouldBypassProxyWithCidr.ts";
import {Ce,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
import {e8} from "./m1485.ts";
async function aBr(e,t=1e4){let n=new URL(e),r=n.hostname.replace(/^\[|\]$/g,"");if(n.protocol!=="https:")return{hostname:r,fingerprint:"http-loopback"};let o=n.port?Number(n.port):443,s=N5(),i=u2(),a=getProxyUrl(),l=a&&!shouldBypassProxy(e)?await ped(a,r,o,t):void 0;return new Promise((c,u)=>{let d=Lai.connect({host:r,port:o,servername:r,socket:l,timeout:t,...s&&{ca:s},...i},()=>{try{let p=d.getPeerCertificate(),m=typeof p?.fingerprint256==="string"?p.fingerprint256.replaceAll(":","").toLowerCase():"";if(d.destroy(),!m)u(Error("could not read TLS certificate fingerprint"));else c({hostname:r,fingerprint:m})}catch(p){d.destroy(),u(Error(Ce(p)))}});d.setTimeout(t),d.once("error",(p)=>u(Error(Ce(p)))),d.once("timeout",()=>{d.destroy(),l?.destroy(),u(Error("TLS connection timed out"))})})}
function ped(e,t,n,r=1e4){let o=new URL(e),s=o.protocol==="https:",i=s?Oai.request:Pai.request,a=t.includes(":")?`[${t}]`:t,l={Host:`${a}:${n}`};if(o.username){let u=`${decodeURIComponent(o.username)}:${decodeURIComponent(o.password)}`;l["Proxy-Authorization"]="Basic "+Buffer.from(u).toString("base64")}let c=N5();return new Promise((u,d)=>{let p=i({host:o.hostname,port:o.port||(s?443:80),method:"CONNECT",path:`${a}:${n}`,timeout:r,headers:l,...s&&{...c&&{ca:c},...u2()}});p.once("connect",(m,f)=>{if(m.statusCode!==200)f.destroy(),d(Error(`proxy CONNECT failed: ${m.statusCode}`));else u(f)}),p.once("error",(m)=>d(Error(Ce(m)))),p.once("timeout",()=>{p.destroy(),d(Error("proxy CONNECT timed out"))}),p.end()})}
var Pai,Oai,Lai;
var lBr=b(()=>{mYe();Ct();zK();ey();e8();Pai=require("http"),Oai=require("https"),Lai=require("tls")});
export {aBr,ped,Pai,Oai,Lai,lBr};
