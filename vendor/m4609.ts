// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {In,cn,Ct} from "./m197.ts";
import {vf,Pv,R5} from "./m639.ts";
import {Yt,Es} from "./m641.ts";
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
import {Pf} from "../src/agent/2591_level.ts";
function ETe(){return Yh.join(or(),"daemon")}
function XRo(e){return`\\\\.\\pipe\\cc-daemon-${Ctm()}-${e}`}
function JRo(){return Yh.join(ETe(),"control.key")}
async function o_l(){let e=JRo();try{let n=await yb.lstat(e);if(n.isFile()&&n.size<=4096){let r=(await yb.readFile(e,"utf8")).trim();if(r)return r}else await yb.rm(e,{recursive:!0,force:!0}).catch(()=>{})}catch(n){if(!In(n))throw n}let t=iht.randomBytes(16).toString("hex");return await yb.mkdir(ETe(),{recursive:!0,mode:448}),await vf(e,t,384),t}
async function mue(){try{let e=await yb.lstat(JRo());if(!e.isFile()||e.size>4096)return;return(await yb.readFile(JRo(),"utf8")).trim()||void 0}catch{return}}
async function s_l(){let e=ETe();if(Yt()==="windows"){await yb.mkdir(e,{recursive:!0}),await yb.chmod(e,448).catch(()=>{});return}await yb.mkdir(e,{recursive:!0,mode:448});let t=process.getuid?.(),n=await yb.lstat(e);if(t!==void 0&&n.uid!==t)throw Error(`refusing to use daemon dir: ${e} is owned by uid ${n.uid}`);if((n.mode&511)!==448)await yb.chmod(e,448)}
async function UKn(){if(Yt()==="windows")return;let e=pne();await yb.mkdir(e,{recursive:!0,mode:448});let t=new Date;await yb.utimes(e,t,t).catch(()=>{});let n=process.getuid?.();for(let r of[Yh.dirname(e),e]){let o=await yb.lstat(r);if(n!==void 0&&o.uid!==n)throw Error(`refusing to bind: ${r} is owned by uid ${o.uid}`);if((o.mode&511)!==448)await yb.chmod(r,448)}}
function i_l(){if(Yt()==="windows")return;let e=pne(),t=Yh.dirname(e),n=Yh.basename(e);yb.readdir(t,{withFileTypes:!0}).then(async(r)=>{for(let o of r){if(!o.isDirectory()||o.name===n)continue;let s=Yh.join(t,o.name);if(!await Atm(Yh.join(s,"control.sock")))continue;let i=await yb.lstat(s).catch(()=>null);if(!i||Date.now()-i.mtimeMs<1e4)continue;let a=await yb.readdir(Yh.join(s,"rv")).catch(()=>[]),l=await yb.readdir(Yh.join(s,"pty")).catch(()=>[]),c=await yb.readdir(Yh.join(s,"spare")).catch(()=>[]);if(a.length||l.length||c.length)continue;await yb.rm(s,{recursive:!0,force:!0}).catch(()=>{})}}).catch(()=>{})}
function Atm(e){let t,n=new Promise((o)=>{t=o}),r=r_l.connect(e);return r.setTimeout(1000,()=>{r.destroy(),t(!1)}),r.on("error",(o)=>{let s=cn(o);t(s==="ENOENT"||s==="ECONNREFUSED"||s==="ENOTSOCK")}),r.once("connect",()=>{r.end(`{"op":"ping"}
`),t(!1)}),n}
function nWe(){return Yh.join(ETe(),"dispatch")}
function QRo(){return Yh.join(ETe(),"dispatch","rejected")}
function mne(){return Yh.join(ETe(),"roster.json")}
function ZRo(){return Yh.join(pne(),"rv")}
function oWt(){return Yh.join(pne(),"auth")}
function sWt(e){return Yh.join(oWt(),`${e}.json`)}
function iWt(e){return Yh.join(oWt(),`${e}.tokens.json`)}
function aht(e){if(Yt()==="windows")return XRo(`rv-${e}`);return Yh.join(ZRo(),`${e}.sock`)}
function lht(){return Yh.join(pne(),"pty")}
function uN(e){if(Yt()==="windows")return XRo(`pty-${e}`);return Yh.join(lht(),`${e}.sock`)}
function iJ(){return Yh.join(pne(),"spare")}
function a_l(e){return Yh.join(iJ(),`${e}.pty.sock`)}
function l_l(e){return Yh.join(iJ(),`${e}.claim.sock`)}
function rWe(){return Yh.join(ETe(),"pty-pids")}
function CTe(e){return Yh.join(rWe(),`${e}.pid`)}
function Tx(e){return c_l(e,"err")}
function lP(e){return c_l(e,"late")}
function c_l(e,t){if(Yt()==="windows")return Yh.join(rWe(),`${e.split("\\").pop()}.${t}`);return`${e}.${t}`}
function aJ(){if(Yt()==="windows")return XRo("control");return Yh.join(pne(),"control.sock")}
var iht,pue,yb,r_l,Yh,btm,pne,Etm,Ctm;
var CL=b(()=>{Wi();Pf();Pv();dn();Ct();Es();iht=require("crypto"),pue=require("fs"),yb=require("fs/promises"),r_l=require("net"),Yh=require("path");btm=Hn(()=>iht.createHash("sha256").update(Yh.resolve(or())).digest("hex").slice(0,8),()=>Yh.resolve(or())),pne=Hn(()=>{let e=process.getuid?.()??0,t=process.env.TERMUX_VERSION&&process.env.PREFIX?Yh.join(process.env.PREFIX,"tmp"):"/tmp";return Yh.join(t,`cc-daemon-${e}`,btm())},()=>or()),Etm=/^[a-f0-9]{16}$/,Ctm=Hn(()=>{let e=Yh.join(ETe(),"pipe.key");for(let t=0;t<8;t++){let n;try{let o=pue.lstatSync(e);if(!o.isFile()||o.size>4096){try{pue.rmSync(e,{recursive:!0,force:!0})}catch{}n="invalid"}else n=pue.readFileSync(e,"utf8").trim()}catch(o){if(!In(o))throw o}if(n!==void 0){if(Etm.test(n))return n;if(n===""&&t<3)continue;let o=iht.randomBytes(8).toString("hex");return R5(e,o,384),o}let r=iht.randomBytes(8).toString("hex");pue.mkdirSync(ETe(),{recursive:!0,mode:448});try{return pue.writeFileSync(e,r,{flag:"wx",mode:384}),r}catch(o){if(cn(o)!=="EEXIST")throw o}}throw Error("daemon pipe.key is not a valid nonce")},()=>or())});
export {ETe,XRo,JRo,o_l,mue,s_l,UKn,i_l,Atm,nWe,QRo,mne,ZRo,oWt,sWt,iWt,aht,lht,uN,iJ,a_l,l_l,rWe,CTe,Tx,lP,c_l,aJ,iht,pue,yb,r_l,Yh,btm,pne,Etm,Ctm,CL};
