// @ts-nocheck
import {X} from "../runtime.ts";
import {aI} from "./m3780.ts";
import {dUt} from "./m3784.ts";
var aBn=X((rka,oka)=>{(function(){var e,t,n;e=aI(),t=dUt(),oka.exports=n=class extends t{constructor(o,s){super(o);if(s==null)throw Error("Missing comment text. "+this.debugInfo());this.name="#comment",this.type=e.Comment,this.value=this.stringify.comment(s)}clone(){return Object.create(this)}toString(o){return this.options.writer.comment(this,this.options.writer.filterOptions(o))}}}).call(rka)});
export {aBn};
