// @ts-nocheck
import {Q} from "../runtime.ts";
import {LI} from "./m3796.ts";
import {$$t} from "./m3800.ts";
var a2n=Q((ULa,$La)=>{(function(){var e,t,n;e=LI(),t=$$t(),$La.exports=n=class extends t{constructor(o,s,i){super(o);if(s==null)throw Error("Missing instruction target. "+this.debugInfo());if(this.type=e.ProcessingInstruction,this.target=this.stringify.insTarget(s),this.name=this.target,i)this.value=this.stringify.insValue(i)}clone(){return Object.create(this)}toString(o){return this.options.writer.processingInstruction(this,this.options.writer.filterOptions(o))}isEqualNode(o){if(!super.isEqualNode(o))return!1;if(o.target!==this.target)return!1;return!0}}}).call(ULa)});
export {a2n};
