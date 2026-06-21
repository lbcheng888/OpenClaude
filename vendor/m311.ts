// @ts-nocheck
import {Kar} from "./m307.ts";
import {object} from "./m250.ts";
import {safeParse,safeParseAsync} from "./m256.ts";
import {b} from "../runtime.ts";
import {Uyt} from "./m252.ts";
import {zar} from "./m310.ts";
function P3(e){return!!e._zod}
function KLe(e){let t=Object.values(e);if(t.length===0)return Kar({});let n=t.every(P3),r=t.every((o)=>!P3(o));if(n)return Kar(e);if(r)return object(e);throw Error("Mixed Zod versions detected in object shape.")}
function b2(e,t){if(P3(e))return safeParse(e,t);return e.safeParse(t)}
async function wXt(e,t){if(P3(e))return await safeParseAsync(e,t);return await e.safeParseAsync(t)}
function Vre(e){if(!e)return;let t;if(P3(e))t=e._zod?.def?.shape;else t=e.shape;if(!t)return;if(typeof t==="function")try{return t()}catch{return}return t}
function iVe(e){if(!e)return;if(typeof e==="object"){let t=e,n=e;if(!t._def&&!n._zod){let r=Object.values(e);if(r.length>0&&r.every((o)=>typeof o==="object"&&o!==null&&(o._def!==void 0||o._zod!==void 0||typeof o.parse==="function")))return KLe(e)}}if(P3(e)){let n=e._zod?.def;if(n&&(n.type==="object"||n.shape!==void 0))return e}else if(e.shape!==void 0)return e;return}
function RXt(e){if(e&&typeof e==="object"){if("message"in e&&typeof e.message==="string")return e.message;if("issues"in e&&Array.isArray(e.issues)&&e.issues.length>0){let t=e.issues[0];if(t&&typeof t==="object"&&"message"in t)return String(t.message)}try{return JSON.stringify(e)}catch{return String(e)}}return String(e)}
function wqo(e){return e.description}
function Rqo(e){if(P3(e))return e._zod?.def?.type==="optional";let t=e;if(typeof e.isOptional==="function")return e.isOptional();return t._def?.typeName==="ZodOptional"}
function xXt(e){if(P3(e)){let s=e._zod?.def;if(s){if(s.value!==void 0)return s.value;if(Array.isArray(s.values)&&s.values.length>0)return s.values[0]}}let n=e._def;if(n){if(n.value!==void 0)return n.value;if(Array.isArray(n.values)&&n.values.length>0)return n.values[0]}let r=e.value;if(r!==void 0)return r;return}
var aVe=b(()=>{Uyt();zar()});
export {P3,KLe,b2,wXt,Vre,iVe,RXt,wqo,Rqo,xXt,aVe};
