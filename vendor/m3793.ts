// @ts-nocheck
import {X} from "../runtime.ts";
import {aI} from "./m3780.ts";
import {BW} from "./m3799.ts";
var fBn=X((gka,_ka)=>{(function(){var e,t,n;e=aI(),t=BW(),_ka.exports=n=class extends t{constructor(o,s){super(o);if(s==null)throw Error("Missing raw text. "+this.debugInfo());this.type=e.Raw,this.value=this.stringify.raw(s)}clone(){return Object.create(this)}toString(o){return this.options.writer.raw(this,this.options.writer.filterOptions(o))}}}).call(gka)});
export {fBn};
