// @ts-nocheck
import {b} from "../runtime.ts";
var bLh,G4u=(e)=>{if(e===null||e===void 0)return;if(Number.isInteger(e)&&!Number.isNaN(e))return e;throw TypeError(`Expected integer, got ${typeof e}: ${e}`)},dzs=(e)=>V4u(e,32),V4u=(e,t)=>{let n=G4u(e);if(n!==void 0&&K4u(n,t)!==n)throw TypeError(`Expected ${t}-bit integer, got ${e}`);return n},K4u=(e,t)=>{switch(t){case 32:return Int32Array.of(e)[0];case 16:return Int16Array.of(e)[0];case 8:return Int8Array.of(e)[0]}},qXe=(e)=>{if(e===null||e===void 0)return;if(typeof e==="string")return e;if(["boolean","number","bigint"].includes(typeof e))return j4u.warn(z4u(`Expected string, got ${typeof e}: ${e}`)),String(e);throw TypeError(`Expected string, got ${typeof e}: ${e}`)},z4u=(e)=>String(TypeError(e).stack||e).split(`
`).slice(0,5).filter((t)=>!t.includes("stackTraceWarning")).join(`
`),j4u;
var cPr=b(()=>{bLh=Math.ceil(340282346638528860000000000000000000000),j4u={warn:console.warn}});
export {bLh,G4u,dzs,V4u,K4u,qXe,z4u,j4u,cPr};
