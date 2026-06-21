// @ts-nocheck
import {dn,bt} from "./m195.ts";
import {b} from "../runtime.ts";
async function Rh(e,t,n){let r=`${e}.tmp.${Zmr.randomBytes(4).toString("hex")}`;try{await a7.writeFile(r,t,{encoding:"utf8",mode:n});try{await a7.rename(r,e)}catch(o){let s=dn(o);if(s!==void 0&&UMe.has(s)){try{if(await a7.copyFile(r,e),n!==void 0)await a7.chmod(e,n).catch(()=>{})}catch(i){if(kXo.has(dn(i)??""))await a7.unlink(e).catch(()=>{});throw i}await a7.unlink(r).catch(()=>{})}else throw o}}catch(o){throw await a7.unlink(r).catch(()=>{}),o}}
function c8(e,t,n){let r=`${e}.tmp.${Zmr.randomBytes(4).toString("hex")}`;try{i7.writeFileSync(r,t,{encoding:"utf8",mode:n});try{i7.renameSync(r,e)}catch(o){let s=dn(o);if(s!==void 0&&UMe.has(s)){try{if(i7.copyFileSync(r,e),n!==void 0)try{i7.chmodSync(e,n)}catch{}}catch(i){if(kXo.has(dn(i)??""))try{i7.unlinkSync(e)}catch{}throw i}try{i7.unlinkSync(r)}catch{}}else throw o}}catch(o){try{i7.unlinkSync(r)}catch{}throw o}}
var Zmr,i7,a7,UMe,kXo;
var ok=b(()=>{bt();Zmr=require("crypto"),i7=require("fs"),a7=require("fs/promises"),UMe=new Set(["EXDEV","EPERM","EEXIST","EBUSY"]),kXo=new Set(["ENOSPC","EIO","EDQUOT","EFBIG"])});
export {Rh,c8,Zmr,i7,a7,UMe,kXo,ok};
