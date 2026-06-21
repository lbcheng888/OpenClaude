// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {Pn,dn,bt} from "./m195.ts";
import {Rh,ok,c8} from "./m633.ts";
import {zt,qs} from "./m635.ts";
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
import {mg} from "../src/agent/2580_level.ts";
function Z_e(){return Gh.join(tr(),"daemon")}
function BTo(e){return`\\\\.\\pipe\\cc-daemon-${y7p()}-${e}`}
function NTo(){return Gh.join(Z_e(),"control.key")}
async function Ecl(){let e=NTo();try{let n=await Tb.lstat(e);if(n.isFile()&&n.size<=4096){let r=(await Tb.readFile(e,"utf8")).trim();if(r)return r}else await Tb.rm(e,{recursive:!0,force:!0}).catch(()=>{})}catch(n){if(!Pn(n))throw n}let t=emt.randomBytes(16).toString("hex");return await Tb.mkdir(Z_e(),{recursive:!0,mode:448}),await Rh(e,t,384),t}
async function hue(){try{let e=await Tb.lstat(NTo());if(!e.isFile()||e.size>4096)return;return(await Tb.readFile(NTo(),"utf8")).trim()||void 0}catch{return}}
async function Ccl(){let e=Z_e();if(zt()==="windows"){await Tb.mkdir(e,{recursive:!0}),await Tb.chmod(e,448).catch(()=>{});return}await Tb.mkdir(e,{recursive:!0,mode:448});let t=process.getuid?.(),n=await Tb.lstat(e);if(t!==void 0&&n.uid!==t)throw Error(`refusing to use daemon dir: ${e} is owned by uid ${n.uid}`);if((n.mode&511)!==448)await Tb.chmod(e,448)}
async function i5n(){if(zt()==="windows")return;let e=Tne();await Tb.mkdir(e,{recursive:!0,mode:448});let t=new Date;await Tb.utimes(e,t,t).catch(()=>{});let n=process.getuid?.();for(let r of[Gh.dirname(e),e]){let o=await Tb.lstat(r);if(n!==void 0&&o.uid!==n)throw Error(`refusing to bind: ${r} is owned by uid ${o.uid}`);if((o.mode&511)!==448)await Tb.chmod(r,448)}}
function vcl(){if(zt()==="windows")return;let e=Tne(),t=Gh.dirname(e),n=Gh.basename(e);Tb.readdir(t,{withFileTypes:!0}).then(async(r)=>{for(let o of r){if(!o.isDirectory()||o.name===n)continue;let s=Gh.join(t,o.name);if(!await T7p(Gh.join(s,"control.sock")))continue;let i=await Tb.lstat(s).catch(()=>null);if(!i||Date.now()-i.mtimeMs<1e4)continue;let a=await Tb.readdir(Gh.join(s,"rv")).catch(()=>[]),l=await Tb.readdir(Gh.join(s,"pty")).catch(()=>[]),c=await Tb.readdir(Gh.join(s,"spare")).catch(()=>[]);if(a.length||l.length||c.length)continue;await Tb.rm(s,{recursive:!0,force:!0}).catch(()=>{})}}).catch(()=>{})}
function T7p(e){let t,n=new Promise((o)=>{t=o}),r=bcl.connect(e);return r.setTimeout(1000,()=>{r.destroy(),t(!1)}),r.on("error",(o)=>{let s=dn(o);t(s==="ENOENT"||s==="ECONNREFUSED"||s==="ENOTSOCK")}),r.once("connect",()=>{r.destroy(),t(!1)}),n}
function kje(){return Gh.join(Z_e(),"dispatch")}
function FTo(){return Gh.join(Z_e(),"dispatch","rejected")}
function Sne(){return Gh.join(Z_e(),"roster.json")}
function UTo(){return Gh.join(Tne(),"rv")}
function P6t(){return Gh.join(Tne(),"auth")}
function O6t(e){return Gh.join(P6t(),`${e}.json`)}
function L6t(e){return Gh.join(P6t(),`${e}.tokens.json`)}
function tmt(e){if(zt()==="windows")return BTo(`rv-${e}`);return Gh.join(UTo(),`${e}.sock`)}
function nmt(){return Gh.join(Tne(),"pty")}
function $N(e){if(zt()==="windows")return BTo(`pty-${e}`);return Gh.join(nmt(),`${e}.sock`)}
function SJ(){return Gh.join(Tne(),"spare")}
function wcl(e){return Gh.join(SJ(),`${e}.pty.sock`)}
function Rcl(e){return Gh.join(SJ(),`${e}.claim.sock`)}
function Hje(){return Gh.join(Z_e(),"pty-pids")}
function eye(e){return Gh.join(Hje(),`${e}.pid`)}
function iD(e){return xcl(e,"err")}
function WP(e){return xcl(e,"late")}
function xcl(e,t){if(zt()==="windows")return Gh.join(Hje(),`${e.split("\\").pop()}.${t}`);return`${e}.${t}`}
function bJ(){if(zt()==="windows")return BTo("control");return Gh.join(Tne(),"control.sock")}
var emt,Aue,Tb,bcl,Gh,g7p,Tne,_7p,y7p;
var sM=b(()=>{ta();mg();ok();sn();bt();qs();emt=require("crypto"),Aue=require("fs"),Tb=require("fs/promises"),bcl=require("net"),Gh=require("path");g7p=wn(()=>emt.createHash("sha256").update(Gh.resolve(tr())).digest("hex").slice(0,8),()=>Gh.resolve(tr())),Tne=wn(()=>{let e=process.getuid?.()??0,t=process.env.TERMUX_VERSION&&process.env.PREFIX?Gh.join(process.env.PREFIX,"tmp"):"/tmp";return Gh.join(t,`cc-daemon-${e}`,g7p())},()=>tr()),_7p=/^[a-f0-9]{16}$/,y7p=wn(()=>{let e=Gh.join(Z_e(),"pipe.key");for(let t=0;t<8;t++){let n;try{let o=Aue.lstatSync(e);if(!o.isFile()||o.size>4096){try{Aue.rmSync(e,{recursive:!0,force:!0})}catch{}n="invalid"}else n=Aue.readFileSync(e,"utf8").trim()}catch(o){if(!Pn(o))throw o}if(n!==void 0){if(_7p.test(n))return n;if(n===""&&t<3)continue;let o=emt.randomBytes(8).toString("hex");return c8(e,o,384),o}let r=emt.randomBytes(8).toString("hex");Aue.mkdirSync(Z_e(),{recursive:!0,mode:448});try{return Aue.writeFileSync(e,r,{flag:"wx",mode:384}),r}catch(o){if(dn(o)!=="EEXIST")throw o}}throw Error("daemon pipe.key is not a valid nonce")},()=>tr())});
export {Z_e,BTo,NTo,Ecl,hue,Ccl,i5n,vcl,T7p,kje,FTo,Sne,UTo,P6t,O6t,L6t,tmt,nmt,$N,SJ,wcl,Rcl,Hje,eye,iD,WP,xcl,bJ,emt,Aue,Tb,bcl,Gh,g7p,Tne,_7p,y7p,sM};
