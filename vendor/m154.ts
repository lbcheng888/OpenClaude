// @ts-nocheck
import {jrr,H_t,hLe,Wrr,eGe} from "./m153.ts";
import {b} from "../runtime.ts";
async function Hzt(e,t,n){if(jrr(),e=await e,t||(t=H_t(e,!0)),xhc(e)){if(e instanceof File&&t==null&&n==null)return e;return hLe([await e.arrayBuffer()],t??e.name,{type:e.type,lastModified:e.lastModified,...n})}if(khc(e)){let o=await e.blob();return t||(t=new URL(e.url).pathname.split(/[\\/]/).pop()),hLe(await Grr(o),t,n)}let r=await Grr(e);if(!n?.type){let o=r.find((s)=>typeof s==="object"&&("type"in s)&&s.type);if(typeof o==="string")n={...n,type:o}}return hLe(r,t,n)}
async function Grr(e){let t=[];if(typeof e==="string"||ArrayBuffer.isView(e)||e instanceof ArrayBuffer)t.push(e);else if(w$o(e))t.push(e instanceof Blob?e:await e.arrayBuffer());else if(Wrr(e))for await(let n of e)t.push(...await Grr(n));else{let n=e?.constructor?.name;throw Error(`Unexpected data type: ${typeof e}${n?`; constructor: ${n}`:""}${Hhc(e)}`)}return t}
function Hhc(e){if(typeof e!=="object"||e===null)return"";return`; props: [${Object.getOwnPropertyNames(e).map((n)=>`"${n}"`).join(", ")}]`}
var w$o=(e)=>e!=null&&typeof e==="object"&&typeof e.size==="number"&&typeof e.type==="string"&&typeof e.text==="function"&&typeof e.slice==="function"&&typeof e.arrayBuffer==="function",xhc=(e)=>e!=null&&typeof e==="object"&&typeof e.name==="string"&&typeof e.lastModified==="number"&&w$o(e),khc=(e)=>e!=null&&typeof e==="object"&&typeof e.url==="string"&&typeof e.blob==="function";
var R$o=b(()=>{eGe();eGe()});
export {Hzt,Grr,Hhc,w$o,xhc,khc,R$o};
