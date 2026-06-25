// @ts-nocheck
import {Q} from "../runtime.ts";
import {ZW} from "./m3815.ts";
import {LI} from "./m3796.ts";
var e2n=Q((vLa,wLa)=>{(function(){var e,t,n;n=ZW(),e=LI(),wLa.exports=t=class extends n{constructor(o,s,i,a,l,c){super(o);if(s==null)throw Error("Missing DTD element name. "+this.debugInfo());if(i==null)throw Error("Missing DTD attribute name. "+this.debugInfo(s));if(!a)throw Error("Missing DTD attribute type. "+this.debugInfo(s));if(!l)throw Error("Missing DTD attribute default. "+this.debugInfo(s));if(l.indexOf("#")!==0)l="#"+l;if(!l.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/))throw Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. "+this.debugInfo(s));if(c&&!l.match(/^(#FIXED|#DEFAULT)$/))throw Error("Default value only applies to #FIXED or #DEFAULT. "+this.debugInfo(s));if(this.elementName=this.stringify.name(s),this.type=e.AttributeDeclaration,this.attributeName=this.stringify.name(i),this.attributeType=this.stringify.dtdAttType(a),c)this.defaultValue=this.stringify.dtdAttDefault(c);this.defaultValueType=l}toString(o){return this.options.writer.dtdAttList(this,this.options.writer.filterOptions(o))}}}).call(vLa)});
export {e2n};
