// @ts-nocheck
import {n2o,zE} from "./m125.ts";
import {b} from "../runtime.ts";
function bgt(e,t){let n=Buffer.from(t.replace(/-/g,""),"hex"),r=TKt.createHash("sha1").update(n).update(Buffer.from(e,"utf8")).digest();r[6]=r[6]&15|80,r[8]=r[8]&63|128;let o=r.subarray(0,16).toString("hex");return`${o.slice(0,8)}-${o.slice(8,12)}-${o.slice(12,16)}-${o.slice(16,20)}-${o.slice(20,32)}`}
function pO(e){if(typeof e!=="string")return null;return DAc.test(e)?e:null}
function mO(e){if(e&&!n2o.test(e))e=e.replace(/[^\w-]/g,"").slice(0,63);let t=TKt.randomBytes(8).toString("hex");return e?`a${e}-${t}`:`a${t}`}
var TKt,DAc;
var MM=b(()=>{zE();TKt=require("crypto"),DAc=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i});
export {bgt,pO,mO,TKt,DAc,MM};
