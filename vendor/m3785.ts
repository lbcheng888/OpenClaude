// @ts-nocheck
import {X} from "../runtime.ts";
import {aI} from "./m3780.ts";
import {dUt} from "./m3784.ts";
var iBn=X((tka,nka)=>{(function(){var e,t,n;e=aI(),n=dUt(),nka.exports=t=class extends n{constructor(o,s){super(o);if(s==null)throw Error("Missing CDATA text. "+this.debugInfo());this.name="#cdata-section",this.type=e.CData,this.value=this.stringify.cdata(s)}clone(){return Object.create(this)}toString(o){return this.options.writer.cdata(this,this.options.writer.filterOptions(o))}}}).call(tka)});
export {iBn};
