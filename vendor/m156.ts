// @ts-nocheck
import {ylr,obt,uMe,Tlr,JKe} from "./m155.ts";
import {b} from "../runtime.ts";
async function cXt(e,t,n){if(ylr(),e=await e,t||(t=obt(e,!0)),Dvc(e)){if(e instanceof File&&t==null&&n==null)return e;return uMe([await e.arrayBuffer()],t??e.name,{type:e.type,lastModified:e.lastModified,...n})}if(Pvc(e)){let o=await e.blob();return t||(t=new URL(e.url).pathname.split(/[\\/]/).pop()),uMe(await Slr(o),t,n)}let r=await Slr(e);if(!n?.type){let o=r.find((s)=>typeof s==="object"&&("type"in s)&&s.type);if(typeof o==="string")n={...n,type:o}}return uMe(r,t,n)}
async function Slr(e){let t=[];if(typeof e==="string"||ArrayBuffer.isView(e)||e instanceof ArrayBuffer)t.push(e);else if(_5o(e))t.push(e instanceof Blob?e:await e.arrayBuffer());else if(Tlr(e))for await(let n of e)t.push(...await Slr(n));else{let n=e?.constructor?.name;throw Error(`Unexpected data type: ${typeof e}${n?`; constructor: ${n}`:""}${Ovc(e)}`)}return t}
function Ovc(e){if(typeof e!=="object"||e===null)return"";return`; props: [${Object.getOwnPropertyNames(e).map((n)=>`"${n}"`).join(", ")}]`}
var _5o=(e)=>e!=null&&typeof e==="object"&&typeof e.size==="number"&&typeof e.type==="string"&&typeof e.text==="function"&&typeof e.slice==="function"&&typeof e.arrayBuffer==="function",Dvc=(e)=>e!=null&&typeof e==="object"&&typeof e.name==="string"&&typeof e.lastModified==="number"&&_5o(e),Pvc=(e)=>e!=null&&typeof e==="object"&&typeof e.url==="string"&&typeof e.blob==="function";
var y5o=b(()=>{JKe();JKe()});
export {cXt,Slr,Ovc,_5o,Dvc,Pvc,y5o};
