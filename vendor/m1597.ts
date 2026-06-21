// @ts-nocheck
import {b} from "../runtime.ts";
var ZEA,vMu=(e)=>{if(e===null||e===void 0)return;if(Number.isInteger(e)&&!Number.isNaN(e))return e;throw TypeError(`Expected integer, got ${typeof e}: ${e}`)},h8s=(e)=>wMu(e,32),wMu=(e,t)=>{let n=vMu(e);if(n!==void 0&&RMu(n,t)!==n)throw TypeError(`Expected ${t}-bit integer, got ${e}`);return n},RMu=(e,t)=>{switch(t){case 32:return Int32Array.of(e)[0];case 16:return Int16Array.of(e)[0];case 8:return Int8Array.of(e)[0]}},WYe=(e)=>{if(e===null||e===void 0)return;if(typeof e==="string")return e;if(["boolean","number","bigint"].includes(typeof e))return kMu.warn(xMu(`Expected string, got ${typeof e}: ${e}`)),String(e);throw TypeError(`Expected string, got ${typeof e}: ${e}`)},xMu=(e)=>String(TypeError(e).stack||e).split(`
`).slice(0,5).filter((t)=>!t.includes("stackTraceWarning")).join(`
`),kMu;
var Pkr=b(()=>{ZEA=Math.ceil(340282346638528860000000000000000000000),kMu={warn:console.warn}});
export {ZEA,vMu,h8s,wMu,RMu,WYe,xMu,kMu,Pkr};
