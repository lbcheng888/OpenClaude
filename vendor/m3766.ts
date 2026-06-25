// @ts-nocheck
import {b} from "../runtime.ts";
function Pao(e){return e.toString("base64").replaceAll("+","-").replaceAll("/","_").replaceAll("=","")}
function LDa(){return Pao(c$t.randomBytes(32))}
function MDa(e){let t=c$t.createHash("sha256");return t.update(e),Pao(t.digest())}
function NDa(){return Pao(c$t.randomBytes(32))}
var c$t;
var FDa=b(()=>{c$t=require("crypto")});
export {Pao,LDa,MDa,NDa,c$t,FDa};
