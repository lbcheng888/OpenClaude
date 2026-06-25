// @ts-nocheck
import {Q} from "../runtime.ts";
var Ybr=Q((Ysn)=>{Object.defineProperty(Ysn,"__esModule",{value:!0});Ysn.ByteArrayCollector=void 0;class fps{allocByteArray;byteLength=0;byteArrays=[];constructor(e){this.allocByteArray=e}push(e){this.byteArrays.push(e),this.byteLength+=e.byteLength}flush(){if(this.byteArrays.length===1){let n=this.byteArrays[0];return this.reset(),n}let e=this.allocByteArray(this.byteLength),t=0;for(let n=0;n<this.byteArrays.length;++n){let r=this.byteArrays[n];e.set(r,t),t+=r.byteLength}return this.reset(),e}reset(){this.byteArrays=[],this.byteLength=0}}Ysn.ByteArrayCollector=fps});
export {Ybr};
