// @ts-nocheck
import {X} from "../runtime.ts";
import {Yle} from "./m3775.ts";
import {BW} from "./m3799.ts";
import {aI} from "./m3780.ts";
var lBn=X((ska,ika)=>{(function(){var e,t,n,r;({isObject:r}=Yle()),n=BW(),e=aI(),ika.exports=t=class extends n{constructor(s,i,a,l){super(s);if(r(i))({version:i,encoding:a,standalone:l}=i);if(!i)i="1.0";if(this.type=e.Declaration,this.version=this.stringify.xmlVersion(i),a!=null)this.encoding=this.stringify.xmlEncoding(a);if(l!=null)this.standalone=this.stringify.xmlStandalone(l)}toString(s){return this.options.writer.declaration(this,this.options.writer.filterOptions(s))}}}).call(ska)});
export {lBn};
