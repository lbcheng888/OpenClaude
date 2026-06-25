// @ts-nocheck
import {yh,hy,Nxe} from "../src/agent/4175_state.ts";
import {b} from "../runtime.ts";
import {ig} from "./m130.ts";
import {Ni} from "./m127.ts";
function _qn(e){let t=typeof e==="object"&&e!==null?e:void 0,n=Array.isArray(t?.questions)?t.questions:[],r=[],o="";for(let a of n){let l=a;if(typeof l?.question!=="string")continue;o||=l.question;let c=Array.isArray(l.options)?l.options.flatMap((u)=>{let d=u;return typeof d?.label==="string"?[{label:d.label,description:typeof d.description==="string"?d.description:""}]:[]}):[];if(c.length>0)r.push({question:l.question,options:c})}let s=r[0]?.options.map((a)=>a.label).join(" \xB7 ");return{text:o?j4t(`answer: ${o}${s?` (${s})`:""}`):"answer question",questions:r.length>0?r:void 0}}
function j4t(e){return yh(e.replace(/\s+/g," ").trim(),hy)}
var rFp,LY;
var Rpt=b(()=>{Nxe();ig();rFp=["sandbox","permission","worker-sandbox","elicitation","dialog"],LY=(()=>{let e=Ni(),t={sandbox:null,permission:null,"worker-sandbox":null,elicitation:null,dialog:null},n=null;function r(){let o=null;for(let s of rFp){let i=t[s];if(i){o=i;break}}if(o?.text===n?.text)return;n=o,e.emit(o)}return{subscribe:e.subscribe,emit(o,s="permission"){let i=o===null?null:typeof o==="string"?{text:o}:o;if(t[s]?.text===i?.text)return;t[s]=i,r()}}})()});
export {_qn,j4t,rFp,LY,Rpt};
