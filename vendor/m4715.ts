// @ts-nocheck
import {X} from "../runtime.ts";
import {ODe} from "./m4710.ts";
var wAl=X((l5y,vAl)=>{var hXp=ODe();function xmt(e){if(this.mode=hXp.BYTE,typeof e==="string")this.data=new TextEncoder().encode(e);else this.data=new Uint8Array(e)}xmt.getBitsLength=function(t){return t*8};xmt.prototype.getLength=function(){return this.data.length};xmt.prototype.getBitsLength=function(){return xmt.getBitsLength(this.data.length)};xmt.prototype.write=function(e){for(let t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)};vAl.exports=xmt});
export {wAl};
