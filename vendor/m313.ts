// @ts-nocheck
import {Spr} from "./m309.ts";
import {object} from "./m252.ts";
import {safeParse,safeParseAsync} from "./m258.ts";
import {b} from "../runtime.ts";
import {mEt} from "./m254.ts";
import {bpr} from "./m312.ts";
function Q9(e){return!!e._zod}
function UMe(e){let t=Object.values(e);if(t.length===0)return Spr({});let n=t.every(Q9),r=t.every((o)=>!Q9(o));if(n)return Spr(e);if(r)return object(e);throw Error("Mixed Zod versions detected in object shape.")}
function WU(e,t){if(Q9(e))return safeParse(e,t);return e.safeParse(t)}
async function sen(e,t){if(Q9(e))return await safeParseAsync(e,t);return await e.safeParseAsync(t)}
function Gre(e){if(!e)return;let t;if(Q9(e))t=e._zod?.def?.shape;else t=e.shape;if(!t)return;if(typeof t==="function")try{return t()}catch{return}return t}
function rze(e){if(!e)return;if(typeof e==="object"){let t=e,n=e;if(!t._def&&!n._zod){let r=Object.values(e);if(r.length>0&&r.every((o)=>typeof o==="object"&&o!==null&&(o._def!==void 0||o._zod!==void 0||typeof o.parse==="function")))return UMe(e)}}if(Q9(e)){let n=e._zod?.def;if(n&&(n.type==="object"||n.shape!==void 0))return e}else if(e.shape!==void 0)return e;return}
function ien(e){if(e&&typeof e==="object"){if("message"in e&&typeof e.message==="string")return e.message;if("issues"in e&&Array.isArray(e.issues)&&e.issues.length>0){let t=e.issues[0];if(t&&typeof t==="object"&&"message"in t)return String(t.message)}try{return JSON.stringify(e)}catch{return String(e)}}return String(e)}
function bVo(e){return e.description}
function EVo(e){if(Q9(e))return e._zod?.def?.type==="optional";let t=e;if(typeof e.isOptional==="function")return e.isOptional();return t._def?.typeName==="ZodOptional"}
function aen(e){if(Q9(e)){let s=e._zod?.def;if(s){if(s.value!==void 0)return s.value;if(Array.isArray(s.values)&&s.values.length>0)return s.values[0]}}let n=e._def;if(n){if(n.value!==void 0)return n.value;if(Array.isArray(n.values)&&n.values.length>0)return n.values[0]}let r=e.value;if(r!==void 0)return r;return}
var oze=b(()=>{mEt();bpr()});
export {Q9,UMe,WU,sen,Gre,rze,ien,bVo,EVo,aen,oze};
