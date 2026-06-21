// @ts-nocheck
import {hn} from "./m251.ts";
import {b} from "../runtime.ts";
import {iv} from "./m454.ts";
import {sn} from "../src/config/0047_namespace.ts";
import {st,_l} from "./m5.ts";
function we(e){let t;return()=>t??=e()}
function o1c(e){let t=e?.trim();return t?t:void 0}
function jSt(e){return e===void 0?void 0:String(e)}
function IGo(e){if(typeof e==="boolean")return e?"1":"0";return String(e)}
function DGo(e){return hn.preprocess(jSt,hn.string().optional().transform((t)=>{if(t===void 0)return;let n=parseInt(t.trim(),10);if(Number.isNaN(n))return;if(e?.min!==void 0&&n<e.min)return;if(e?.max!==void 0&&n>e.max)return;return n}))}
var s1c,i1c,a1c,l1c,Ne;
var ooe=b(()=>{iv();sn();s1c=we(()=>hn.preprocess(jSt,hn.string().optional().transform(o1c))),i1c=we(()=>hn.preprocess(jSt,hn.string().optional().transform((e)=>st(e)))),a1c=we(()=>hn.preprocess(jSt,hn.string().optional().transform((e)=>{if(st(e))return!0;if(_l(e))return!1;return}))),l1c=we(()=>DGo());Ne={str:()=>s1c(),bool:()=>i1c(),triBool:()=>a1c(),int:(e)=>e?DGo(e):l1c(),enum:(e)=>hn.preprocess(jSt,hn.string().optional().transform((t)=>t!==void 0&&e.includes(t.trim())?t.trim():void 0))}});
export {we,o1c,jSt,IGo,DGo,s1c,i1c,a1c,l1c,Ne,ooe};
