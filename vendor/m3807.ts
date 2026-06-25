// @ts-nocheck
import {Q} from "../runtime.ts";
import {ZW} from "./m3815.ts";
import {LI} from "./m3796.ts";
var r2n=Q((DLa,PLa)=>{(function(){var e,t,n;n=ZW(),e=LI(),PLa.exports=t=function(){class r extends n{constructor(o,s,i){super(o);if(s==null)throw Error("Missing DTD notation name. "+this.debugInfo(s));if(!i.pubID&&!i.sysID)throw Error("Public or system identifiers are required for an external entity. "+this.debugInfo(s));if(this.name=this.stringify.name(s),this.type=e.NotationDeclaration,i.pubID!=null)this.pubID=this.stringify.dtdPubID(i.pubID);if(i.sysID!=null)this.sysID=this.stringify.dtdSysID(i.sysID)}toString(o){return this.options.writer.dtdNotation(this,this.options.writer.filterOptions(o))}}return Object.defineProperty(r.prototype,"publicId",{get:function(){return this.pubID}}),Object.defineProperty(r.prototype,"systemId",{get:function(){return this.sysID}}),r}.call(this)}).call(DLa)});
export {r2n};
