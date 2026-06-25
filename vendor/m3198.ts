// @ts-nocheck
import {Yhr,Vtn} from "./m432.ts";
import {b} from "../runtime.ts";
import {ejr,Zzr} from "./m2802.ts";
class ela{capBytes;onOverflow;chunks=[];byteLength=0;overflowed=!1;overflowThrown=!1;constructor(e,t){this.capBytes=e;this.onOverflow=t}append(e){if(this.overflowed)return;if(this.byteLength+e.length>this.capBytes){this.chunks=[],this.byteLength=0,this.overflowed=!0,this.onOverflow(new dFt(this.capBytes));return}this.chunks.push(e),this.byteLength+=e.length}readMessage(){if(this.overflowed){if(this.overflowThrown)return null;throw this.overflowThrown=!0,new dFt(this.capBytes)}if(this.chunks.length===0)return null;let e=this.chunks.at(-1),t=e.indexOf(10);if(t===-1)return null;let n=this.chunks.length===1?e:Buffer.concat(this.chunks),r=n.length-e.length+t,o=n.toString("utf8",0,r).replace(/\r$/,""),s=n.subarray(r+1);return this.chunks=s.length>0?[s]:[],this.byteLength=s.length,Yhr(o)}clear(){this.chunks=[],this.byteLength=0}}
var JXr=16777216,dFt,pFt;
var XXr=b(()=>{ejr();Vtn();dFt=class dFt extends Error{constructor(e){super(`wrote >${Math.round(e/1024/1024)}MB to stdout without a JSON-RPC message boundary. The server is likely writing logs or other non-protocol data to stdout instead of stderr. Disconnecting to prevent unbounded memory growth.`);this.name="StdoutOverflowError"}};pFt=class pFt extends Zzr{overflowError;constructor(e){super(e);this._readBuffer=new ela(JXr,(t)=>{this.overflowError=t,queueMicrotask(()=>void this.close())})}}});
export {ela,JXr,dFt,pFt,XXr};
