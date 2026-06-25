// @ts-nocheck
import {Q} from "../runtime.ts";
import {ZW} from "./m3815.ts";
import {LI} from "./m3796.ts";
var n2n=Q((ILa,xLa)=>{(function(){var e,t,n;n=ZW(),e=LI(),xLa.exports=t=class extends n{constructor(o,s,i){super(o);if(s==null)throw Error("Missing DTD element name. "+this.debugInfo());if(!i)i="(#PCDATA)";if(Array.isArray(i))i="("+i.join(",")+")";this.name=this.stringify.name(s),this.type=e.ElementDeclaration,this.value=this.stringify.dtdElementValue(i)}toString(o){return this.options.writer.dtdElement(this,this.options.writer.filterOptions(o))}}}).call(ILa)});
export {n2n};
