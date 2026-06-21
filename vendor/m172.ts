// @ts-nocheck
import {mi,SH} from "./m135.ts";
import {b} from "../runtime.ts";
function P$o(e){return e?.output_format??e?.output_config?.format}
function ior(e,t,n){let r=P$o(t);if(!t||!("parse"in(r??{})))return{...e,content:e.content.map((o)=>{if(o.type==="text"){let s=Object.defineProperty({...o},"parsed_output",{value:null,enumerable:!1});return Object.defineProperty(s,"parsed",{get(){return n.logger.warn("The `parsed` property on `text` blocks is deprecated, please use `parsed_output` instead."),null},enumerable:!1})}return o}),parsed_output:null};return aor(e,t,n)}
function aor(e,t,n){let r=null,o=e.content.map((s)=>{if(s.type==="text"){let i=Whc(t,s.text);if(r===null)r=i;let a=Object.defineProperty({...s},"parsed_output",{value:i,enumerable:!1});return Object.defineProperty(a,"parsed",{get(){return n.logger.warn("The `parsed` property on `text` blocks is deprecated, please use `parsed_output` instead."),i},enumerable:!1})}return s});return{...e,content:o,parsed_output:r}}
function Whc(e,t){let n=P$o(e);if(n?.type!=="json_schema")return null;try{if("parse"in n)return n.parse(t);return JSON.parse(t)}catch(r){throw new mi(`Failed to parse structured output: ${r}`)}}
var lor=b(()=>{SH()});
export {P$o,ior,aor,Whc,lor};
