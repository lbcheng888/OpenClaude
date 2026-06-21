// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {collectFlagValueIndexes} from "../src/mcp/0728_serverName.ts";
import {qt,Le,Xt} from "../src/config/0228_encoding.ts";
import {on,Rn} from "../src/session/0615_length.ts";
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
function Sta(){return Wae.join(tr(),HKr)}
function jMt(e){return yta.createHash("sha256").update(e).digest("hex")}
function bta(e,t,n){let r=jMt(`${e}\x00${n}`).slice(0,8),o=t.replace(/[^A-Za-z0-9._-]/g,"-");return`${collectFlagValueIndexes(e)}--${o}--${r}`}
function z$e(e){if(!e)return;let t=/^(?:sha256:)?([0-9a-fA-F]{64})$/.exec(e.trim());return t?t[1].toLowerCase():void 0}
async function IKr(e){try{let t=await Ohe.readFile(Wae.join(e,Tta),"utf8"),n=g3d().safeParse(qt(t));return n.success?n.data:null}catch{return null}}
async function _3d(e,t){await Ohe.mkdir(e,{recursive:!0}),await Ohe.writeFile(Wae.join(e,Tta),Le(t))}
async function WMt(e,t){let n=bta(e,t.name,t.url),r=Wae.join(Sta(),n),o={hit:!1,slugDir:r},s,i=z$e(t.digest??void 0);if(i)s=i;else{let l=await IKr(r);if(!l||Date.now()-l.fetchedAt>=h3d)return o;s=l.cacheKey}let a=Wae.join(r,s);try{let l=await Ohe.readFile(Wae.join(a,"SKILL.md"),"utf8");return{hit:!0,dir:a,cacheKey:s,skillMd:l}}catch{return o}}
async function LHn(e,t,n){let r=bta(e,t.name,t.url),o=Wae.join(Sta(),r),s=Wae.join(o,n),i=await Ohe.stat(Wae.join(s,"SKILL.md")).then((a)=>a.isFile()).catch(()=>!1);if(i)on(e,`Skill '${t.name}' content unchanged \u2014 reusing extraction at ${s}`);return{slugDir:o,keyDir:s,alreadyExtracted:i}}
async function MHn(e,t,n){await _3d(e,{url:t.url,cacheKey:n,declaredDigest:z$e(t.digest??void 0),fetchedAt:Date.now()})}
var yta,Ohe,Wae,HKr="mcp-skill-archives",Tta="meta.json",h3d=86400000,g3d;
var NHn=b(()=>{Xr();sn();Rn();Xt();yta=require("crypto"),Ohe=require("fs/promises"),Wae=require("path"),g3d=we(()=>E.object({url:E.string(),cacheKey:E.string(),declaredDigest:E.string().optional(),fetchedAt:E.number()}))});
export {Sta,jMt,bta,z$e,IKr,_3d,WMt,LHn,MHn,yta,Ohe,Wae,HKr,Tta,h3d,g3d,NHn};
