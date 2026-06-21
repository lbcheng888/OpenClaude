// @ts-nocheck
import {b} from "../runtime.ts";
function Yno(e){return e.toString("base64").replaceAll("+","-").replaceAll("/","_").replaceAll("=","")}
function _wa(){return Yno(PFt.randomBytes(32))}
function ywa(e){let t=PFt.createHash("sha256");return t.update(e),Yno(t.digest())}
function Twa(){return Yno(PFt.randomBytes(32))}
var PFt;
var Swa=b(()=>{PFt=require("crypto")});
export {Yno,_wa,ywa,Twa,PFt,Swa};
