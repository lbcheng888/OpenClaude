// @ts-nocheck
import {mi,SH} from "./m135.ts";
import {b} from "../runtime.ts";
function V$o(e){return e?.output_config?.format}
function Ror(e,t,n){let r=V$o(t);if(!t||!("parse"in(r??{})))return{...e,content:e.content.map((o)=>{if(o.type==="text")return Object.defineProperty({...o},"parsed_output",{value:null,enumerable:!1});return o}),parsed_output:null};return xor(e,t,n)}
function xor(e,t,n){let r=null,o=e.content.map((s)=>{if(s.type==="text"){let i=ogc(t,s.text);if(r===null)r=i;return Object.defineProperty({...s},"parsed_output",{value:i,enumerable:!1})}return s});return{...e,content:o,parsed_output:r}}
function ogc(e,t){let n=V$o(e);if(n?.type!=="json_schema")return null;try{if("parse"in n)return n.parse(t);return JSON.parse(t)}catch(r){throw new mi(`Failed to parse structured output: ${r}`)}}
var kor=b(()=>{SH()});
export {V$o,Ror,xor,ogc,kor};
