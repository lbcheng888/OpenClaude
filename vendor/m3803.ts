// @ts-nocheck
import {Q} from "../runtime.ts";
import {zle} from "./m3791.ts";
import {ZW} from "./m3815.ts";
import {LI} from "./m3796.ts";
var ZUn=Q((ALa,RLa)=>{(function(){var e,t,n,r;({isObject:r}=zle()),n=ZW(),e=LI(),RLa.exports=t=class extends n{constructor(s,i,a,l){super(s);if(r(i))({version:i,encoding:a,standalone:l}=i);if(!i)i="1.0";if(this.type=e.Declaration,this.version=this.stringify.xmlVersion(i),a!=null)this.encoding=this.stringify.xmlEncoding(a);if(l!=null)this.standalone=this.stringify.xmlStandalone(l)}toString(s){return this.options.writer.declaration(this,this.options.writer.filterOptions(s))}}}).call(ALa)});
export {ZUn};
