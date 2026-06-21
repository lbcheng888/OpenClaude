// @ts-nocheck
import {X} from "../runtime.ts";
import {BW} from "./m3799.ts";
import {aI} from "./m3780.ts";
var pBn=X((mka,fka)=>{(function(){var e,t,n;n=BW(),e=aI(),fka.exports=t=function(){class r extends n{constructor(o,s,i){super(o);if(s==null)throw Error("Missing DTD notation name. "+this.debugInfo(s));if(!i.pubID&&!i.sysID)throw Error("Public or system identifiers are required for an external entity. "+this.debugInfo(s));if(this.name=this.stringify.name(s),this.type=e.NotationDeclaration,i.pubID!=null)this.pubID=this.stringify.dtdPubID(i.pubID);if(i.sysID!=null)this.sysID=this.stringify.dtdSysID(i.sysID)}toString(o){return this.options.writer.dtdNotation(this,this.options.writer.filterOptions(o))}}return Object.defineProperty(r.prototype,"publicId",{get:function(){return this.pubID}}),Object.defineProperty(r.prototype,"systemId",{get:function(){return this.sysID}}),r}.call(this)}).call(mka)});
export {pBn};
