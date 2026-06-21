// @ts-nocheck
import {X} from "../runtime.ts";
import {aI} from "./m3780.ts";
import {dUt} from "./m3784.ts";
var ABn=X((yka,Tka)=>{(function(){var e,t,n;e=aI(),t=dUt(),Tka.exports=n=function(){class r extends t{constructor(o,s){super(o);if(s==null)throw Error("Missing element text. "+this.debugInfo());this.name="#text",this.type=e.Text,this.value=this.stringify.text(s)}clone(){return Object.create(this)}toString(o){return this.options.writer.text(this,this.options.writer.filterOptions(o))}splitText(o){throw Error("This DOM method is not implemented."+this.debugInfo())}replaceWholeText(o){throw Error("This DOM method is not implemented."+this.debugInfo())}}return Object.defineProperty(r.prototype,"isElementContentWhitespace",{get:function(){throw Error("This DOM method is not implemented."+this.debugInfo())}}),Object.defineProperty(r.prototype,"wholeText",{get:function(){var o,s,i;i="",s=this.previousSibling;while(s)i=s.data+i,s=s.previousSibling;i+=this.data,o=this.nextSibling;while(o)i=i+o.data,o=o.nextSibling;return i}}),r}.call(this)}).call(yka)});
export {ABn};
