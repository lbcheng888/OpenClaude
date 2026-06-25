// @ts-nocheck
import {cn,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
async function vf(e,t,n){let r=`${e}.tmp.${kyr.randomBytes(4).toString("hex")}`;try{await OK.writeFile(r,t,{encoding:"utf8",mode:n});try{await OK.rename(r,e)}catch(o){let s=cn(o);if(s!==void 0&&P1e.has(s)){try{if(await OK.copyFile(r,e),n!==void 0)await OK.chmod(e,n).catch(()=>{})}catch(i){if(vrs.has(cn(i)??""))await OK.unlink(e).catch(()=>{});throw i}await OK.unlink(r).catch(()=>{})}else throw o}}catch(o){throw await OK.unlink(r).catch(()=>{}),o}}
function R5(e,t,n){let r=`${e}.tmp.${kyr.randomBytes(4).toString("hex")}`;try{PK.writeFileSync(r,t,{encoding:"utf8",mode:n});try{PK.renameSync(r,e)}catch(o){let s=cn(o);if(s!==void 0&&P1e.has(s)){try{if(PK.copyFileSync(r,e),n!==void 0)try{PK.chmodSync(e,n)}catch{}}catch(i){if(vrs.has(cn(i)??""))try{PK.unlinkSync(e)}catch{}throw i}try{PK.unlinkSync(r)}catch{}}else throw o}}catch(o){try{PK.unlinkSync(r)}catch{}throw o}}
var kyr,PK,OK,P1e,vrs;
var Pv=b(()=>{Ct();kyr=require("crypto"),PK=require("fs"),OK=require("fs/promises"),P1e=new Set(["EXDEV","EPERM","EEXIST","EBUSY"]),vrs=new Set(["ENOSPC","EIO","EDQUOT","EFBIG"])});
export {vf,R5,kyr,PK,OK,P1e,vrs,Pv};
