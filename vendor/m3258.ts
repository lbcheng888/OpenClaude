// @ts-nocheck
import {Tae,Jtt} from "./m2725.ts";
import {b} from "../runtime.ts";
class RYr{capacity;buffer;head=0;size=0;constructor(e){this.capacity=e;this.buffer=Array(e)}add(e){if(this.buffer[this.head]=e,this.head=(this.head+1)%this.capacity,this.size<this.capacity)this.size++}addAll(e){for(let t of e)this.add(t)}getRecent(e){let t=[],n=this.size<this.capacity?0:this.head,r=Math.min(e,this.size);for(let o=0;o<r;o++){let s=(n+this.size-r+o)%this.capacity;t.push(this.buffer[s])}return t}toArray(){if(this.size===0)return[];let e=[],t=this.size<this.capacity?0:this.head;for(let n=0;n<this.size;n++){let r=(t+n)%this.capacity;e.push(this.buffer[r])}return e}clear(){this.buffer.length=0,this.head=0,this.size=0}length(){return this.size}}
function Not(){return Tae("BASH_MAX_OUTPUT_LENGTH",process.env.BASH_MAX_OUTPUT_LENGTH,kYr,xYr).effective}
var xYr=150000,kYr=30000;
var H1t=b(()=>{Jtt()});
export {RYr,Not,xYr,kYr,H1t};
