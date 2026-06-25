// @ts-nocheck
import {Q} from "../runtime.ts";
import {LI} from "./m3796.ts";
import {$$t} from "./m3800.ts";
var QUn=Q((ELa,CLa)=>{(function(){var e,t,n;e=LI(),t=$$t(),CLa.exports=n=class extends t{constructor(o,s){super(o);if(s==null)throw Error("Missing comment text. "+this.debugInfo());this.name="#comment",this.type=e.Comment,this.value=this.stringify.comment(s)}clone(){return Object.create(this)}toString(o){return this.options.writer.comment(this,this.options.writer.filterOptions(o))}}}).call(ELa)});
export {QUn};
