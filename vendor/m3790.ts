// @ts-nocheck
import {X} from "../runtime.ts";
import {BW} from "./m3799.ts";
import {aI} from "./m3780.ts";
var dBn=X((dka,pka)=>{(function(){var e,t,n;n=BW(),e=aI(),pka.exports=t=class extends n{constructor(o,s,i){super(o);if(s==null)throw Error("Missing DTD element name. "+this.debugInfo());if(!i)i="(#PCDATA)";if(Array.isArray(i))i="("+i.join(",")+")";this.name=this.stringify.name(s),this.type=e.ElementDeclaration,this.value=this.stringify.dtdElementValue(i)}toString(o){return this.options.writer.dtdElement(this,this.options.writer.filterOptions(o))}}}).call(dka)});
export {dBn};
