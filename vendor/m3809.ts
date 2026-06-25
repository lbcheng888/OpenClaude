// @ts-nocheck
import {Q} from "../runtime.ts";
import {LI} from "./m3796.ts";
import {ZW} from "./m3815.ts";
var s2n=Q((MLa,NLa)=>{(function(){var e,t,n;e=LI(),t=ZW(),NLa.exports=n=class extends t{constructor(o,s){super(o);if(s==null)throw Error("Missing raw text. "+this.debugInfo());this.type=e.Raw,this.value=this.stringify.raw(s)}clone(){return Object.create(this)}toString(o){return this.options.writer.raw(this,this.options.writer.filterOptions(o))}}}).call(MLa)});
export {s2n};
