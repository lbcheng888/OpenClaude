// @ts-nocheck
import {gce,Idt} from "./m4028.ts";
import {B3a,Upo} from "./m4029.ts";
import {Mf,$A} from "../src/config/2711_WORKFLOW_TOOL_NAME.ts";
import {b} from "../runtime.ts";
function qpo(){$po.clear()}
function Wpo(e,t,n){if(!n||!gce())return;let r=$po.get(e);if(!r)r={raw:"",flushedAt:0},$po.set(e,r);if(r.raw.length<xxp)r.raw+=t;let o=Date.now();if(o-r.flushedAt<Ixp)return;r.flushedAt=o;let s=B3a(r.raw).slice(0,W3a);n((i)=>{let a=i.findIndex((l)=>l.index===e);if(a===-1||i[a].contentBlock.name!==Mf)return i;return i.with(a,{...i[a],contentBlock:{...i[a].contentBlock,input:{code:s}}})})}
var Ixp=100,W3a=8192,xxp,$po;
var Gpo=b(()=>{$A();Upo();Idt();xxp=W3a*2,$po=new Map});
export {qpo,Wpo,Ixp,W3a,xxp,$po,Gpo};
