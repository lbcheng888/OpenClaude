// @ts-nocheck
import {Q} from "../runtime.ts";
import {DPe} from "./m4742.ts";
var yCl=Q((crS,_Cl)=>{var wim=DPe();function Fht(e){this.mode=wim.NUMERIC,this.data=e.toString()}Fht.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)};Fht.prototype.getLength=function(){return this.data.length};Fht.prototype.getBitsLength=function(){return Fht.getBitsLength(this.data.length)};Fht.prototype.write=function(t){let n,r,o;for(n=0;n+3<=this.data.length;n+=3)r=this.data.substr(n,3),o=parseInt(r,10),t.put(o,10);let s=this.data.length-n;if(s>0)r=this.data.substr(n),o=parseInt(r,10),t.put(o,s*3+1)};_Cl.exports=Fht});
export {yCl};
