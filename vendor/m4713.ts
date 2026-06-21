// @ts-nocheck
import {X} from "../runtime.ts";
import {ODe} from "./m4710.ts";
var bAl=X((i5y,SAl)=>{var fXp=ODe();function wmt(e){this.mode=fXp.NUMERIC,this.data=e.toString()}wmt.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)};wmt.prototype.getLength=function(){return this.data.length};wmt.prototype.getBitsLength=function(){return wmt.getBitsLength(this.data.length)};wmt.prototype.write=function(t){let n,r,o;for(n=0;n+3<=this.data.length;n+=3)r=this.data.substr(n,3),o=parseInt(r,10),t.put(o,10);let s=this.data.length-n;if(s>0)r=this.data.substr(n),o=parseInt(r,10),t.put(o,s*3+1)};SAl.exports=wmt});
export {bAl};
