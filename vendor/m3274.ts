// @ts-nocheck
import {_ae,Qrt} from "./m2737.ts";
import {b} from "../runtime.ts";
class ueo{capacity;buffer;head=0;size=0;constructor(e){this.capacity=e;this.buffer=Array(e)}add(e){if(this.buffer[this.head]=e,this.head=(this.head+1)%this.capacity,this.size<this.capacity)this.size++}addAll(e){for(let t of e)this.add(t)}getRecent(e){let t=[],n=this.size<this.capacity?0:this.head,r=Math.min(e,this.size);for(let o=0;o<r;o++){let s=(n+this.size-r+o)%this.capacity;t.push(this.buffer[s])}return t}toArray(){if(this.size===0)return[];let e=[],t=this.size<this.capacity?0:this.head;for(let n=0;n<this.size;n++){let r=(t+n)%this.capacity;e.push(this.buffer[r])}return e}clear(){this.buffer.length=0,this.head=0,this.size=0}length(){return this.size}}
function Nit(){return _ae("BASH_MAX_OUTPUT_LENGTH",process.env.BASH_MAX_OUTPUT_LENGTH,peo,deo).effective}
var deo=150000,peo=30000;
var aBt=b(()=>{Qrt()});
export {ueo,Nit,deo,peo,aBt};
