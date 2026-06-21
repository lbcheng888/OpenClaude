// @ts-nocheck
import {X} from "../runtime.ts";
import {aI} from "./m3780.ts";
import {dUt} from "./m3784.ts";
var hBn=X((Ska,bka)=>{(function(){var e,t,n;e=aI(),t=dUt(),bka.exports=n=class extends t{constructor(o,s,i){super(o);if(s==null)throw Error("Missing instruction target. "+this.debugInfo());if(this.type=e.ProcessingInstruction,this.target=this.stringify.insTarget(s),this.name=this.target,i)this.value=this.stringify.insValue(i)}clone(){return Object.create(this)}toString(o){return this.options.writer.processingInstruction(this,this.options.writer.filterOptions(o))}isEqualNode(o){if(!super.isEqualNode(o))return!1;if(o.target!==this.target)return!1;return!0}}}).call(Ska)});
export {hBn};
