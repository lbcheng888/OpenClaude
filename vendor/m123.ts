// @ts-nocheck
import {Nqo,xS} from "./m122.ts";
import {b} from "../runtime.ts";
function JTt(e,t){let n=Buffer.from(t.replace(/-/g,""),"hex"),r=jYt.createHash("sha1").update(n).update(Buffer.from(e,"utf8")).digest();r[6]=r[6]&15|80,r[8]=r[8]&63|128;let o=r.subarray(0,16).toString("hex");return`${o.slice(0,8)}-${o.slice(8,12)}-${o.slice(12,16)}-${o.slice(16,20)}-${o.slice(20,32)}`}
function PP(e){if(typeof e!=="string")return null;return LRc.test(e)?e:null}
function OP(e){if(e&&!Nqo.test(e))e=e.replace(/[^\w-]/g,"").slice(0,63);let t=jYt.randomBytes(8).toString("hex");return e?`a${e}-${t}`:`a${t}`}
var jYt,LRc;
var YL=b(()=>{xS();jYt=require("crypto"),LRc=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i});
export {JTt,PP,OP,jYt,LRc,YL};
