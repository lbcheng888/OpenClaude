// @ts-nocheck
import {Qs,YH} from "./m137.ts";
import {b} from "../runtime.ts";
function N5o(e){return e?.output_config?.format}
function tcr(e,t,n){let r=N5o(t);if(!t||!("parse"in(r??{})))return{...e,content:e.content.map((o)=>{if(o.type==="text")return Object.defineProperty({...o},"parsed_output",{value:null,enumerable:!1});return o}),parsed_output:null};return ncr(e,t,n)}
function ncr(e,t,n){let r=null,o=e.content.map((s)=>{if(s.type==="text"){let i=lwc(t,s.text);if(r===null)r=i;return Object.defineProperty({...s},"parsed_output",{value:i,enumerable:!1})}return s});return{...e,content:o,parsed_output:r}}
function lwc(e,t){let n=N5o(e);if(n?.type!=="json_schema")return null;try{if("parse"in n)return n.parse(t);return JSON.parse(t)}catch(r){throw new Qs(`Failed to parse structured output: ${r}`)}}
var rcr=b(()=>{YH()});
export {N5o,tcr,ncr,lwc,rcr};
