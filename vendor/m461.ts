// @ts-nocheck
import {jt} from "./m253.ts";
import {b} from "../runtime.ts";
import {MS} from "./m460.ts";
import {dn} from "../src/config/0137_namespace.ts";
import {nt,Za} from "./m127.ts";
function ve(e){let t;return()=>t??=e()}
function dqc(e){let t=e?.trim();return t?t:void 0}
function hAt(e){return e===void 0?void 0:String(e)}
function kJo(e){if(typeof e==="boolean")return e?"1":"0";return String(e)}
function HJo(e){return jt.preprocess(hAt,jt.string().optional().transform((t)=>{if(t===void 0)return;let n=parseInt(t.trim(),10);if(Number.isNaN(n))return;if(e?.min!==void 0&&n<e.min)return;if(e?.max!==void 0&&n>e.max)return;return n}))}
var pqc,mqc,fqc,hqc,Me;
var noe=b(()=>{MS();dn();pqc=ve(()=>jt.preprocess(hAt,jt.string().optional().transform(dqc))),mqc=ve(()=>jt.preprocess(hAt,jt.string().optional().transform((e)=>nt(e)))),fqc=ve(()=>jt.preprocess(hAt,jt.string().optional().transform((e)=>{if(nt(e))return!0;if(Za(e))return!1;return}))),hqc=ve(()=>HJo());Me={str:()=>pqc(),bool:()=>mqc(),triBool:()=>fqc(),int:(e)=>e?HJo(e):hqc(),enum:(e)=>jt.preprocess(hAt,jt.string().optional().transform((t)=>t!==void 0&&e.includes(t.trim())?t.trim():void 0))}});
export {ve,dqc,hAt,kJo,HJo,pqc,mqc,fqc,hqc,Me,noe};
