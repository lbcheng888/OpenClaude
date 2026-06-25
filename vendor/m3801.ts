// @ts-nocheck
import {Q} from "../runtime.ts";
import {LI} from "./m3796.ts";
import {$$t} from "./m3800.ts";
var XUn=Q((SLa,bLa)=>{(function(){var e,t,n;e=LI(),n=$$t(),bLa.exports=t=class extends n{constructor(o,s){super(o);if(s==null)throw Error("Missing CDATA text. "+this.debugInfo());this.name="#cdata-section",this.type=e.CData,this.value=this.stringify.cdata(s)}clone(){return Object.create(this)}toString(o){return this.options.writer.cdata(this,this.options.writer.filterOptions(o))}}}).call(SLa)});
export {XUn};
