// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {ac} from "../src/mcp/0733_serverName.ts";
import {qt,TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {ln,vn} from "../src/session/0621_length.ts";
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
function vla(){return Wae.join(or(),dQr)}
function SFt(e){return Ala.createHash("sha256").update(e).digest("hex")}
function wla(e,t,n){let r=SFt(`${e}\x00${n}`).slice(0,8),o=t.replace(/[^A-Za-z0-9._-]/g,"-");return`${ac(e)}--${o}--${r}`}
function t3e(e){if(!e)return;let t=/^(?:sha256:)?([0-9a-fA-F]{64})$/.exec(e.trim());return t?t[1].toLowerCase():void 0}
async function pQr(e){try{let t=await Kge.readFile(Wae.join(e,Rla),"utf8"),n=tzd().safeParse(qt(t));return n.success?n.data:null}catch{return null}}
async function nzd(e,t){await Kge.mkdir(e,{recursive:!0}),await Kge.writeFile(Wae.join(e,Rla),TeamDeleteToolName(t))}
async function bFt(e,t){let n=wla(e,t.name,t.url),r=Wae.join(vla(),n),o={hit:!1,slugDir:r},s,i=t3e(t.digest??void 0);if(i)s=i;else{let l=await pQr(r);if(!l||Date.now()-l.fetchedAt>=ezd)return o;s=l.cacheKey}let a=Wae.join(r,s);try{let l=await Kge.readFile(Wae.join(a,"SKILL.md"),"utf8");return{hit:!0,dir:a,cacheKey:s,skillMd:l}}catch{return o}}
async function vDn(e,t,n){let r=wla(e,t.name,t.url),o=Wae.join(vla(),r),s=Wae.join(o,n),i=await Kge.stat(Wae.join(s,"SKILL.md")).then((a)=>a.isFile()).catch(()=>!1);if(i)ln(e,`Skill '${t.name}' content unchanged \u2014 reusing extraction at ${s}`);return{slugDir:o,keyDir:s,alreadyExtracted:i}}
async function wDn(e,t,n){await nzd(e,{url:t.url,cacheKey:n,declaredDigest:t3e(t.digest??void 0),fetchedAt:Date.now()})}
var Ala,Kge,Wae,dQr="mcp-skill-archives",Rla="meta.json",ezd=86400000,tzd;
var kDn=b(()=>{Qr();dn();vn();tn();Ala=require("crypto"),Kge=require("fs/promises"),Wae=require("path"),tzd=ve(()=>C.object({url:C.string(),cacheKey:C.string(),declaredDigest:C.string().optional(),fetchedAt:C.number()}))});
export {vla,SFt,wla,t3e,pQr,nzd,bFt,vDn,wDn,Ala,Kge,Wae,dQr,Rla,ezd,tzd,kDn};
