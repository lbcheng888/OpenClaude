// @ts-nocheck
import {X} from "../runtime.ts";
import {eHe} from "./m3554.ts";
import {l3e} from "./m3553.ts";
import {PL} from "./m3552.ts";
var XOn=X((PTg,Cga)=>{Cga.exports=dge;var zZr=eHe();((dge.prototype=Object.create(zZr.prototype)).constructor=dge).className="MapField";var GQd=l3e(),TBt=PL();function dge(e,t,n,r,o,s){if(zZr.call(this,e,t,r,void 0,void 0,o,s),!TBt.isString(n))throw TypeError("keyType must be a string");this.keyType=n,this.resolvedKeyType=null,this.map=!0}dge.fromJSON=function(t,n){return new dge(t,n.id,n.keyType,n.type,n.options,n.comment)};dge.prototype.toJSON=function(t){var n=t?Boolean(t.keepComments):!1;return TBt.toObject(["keyType",this.keyType,"type",this.type,"id",this.id,"extend",this.extend,"options",this.options,"comment",n?this.comment:void 0])};dge.prototype.resolve=function(){if(this.resolved)return this;if(GQd.mapKey[this.keyType]===void 0)throw Error("invalid key type: "+this.keyType);return zZr.prototype.resolve.call(this)};dge.d=function(t,n,r){if(typeof r==="function")r=TBt.decorateType(r).name;else if(r&&typeof r==="object")r=TBt.decorateEnum(r).name;return function(s,i){TBt.decorateType(s.constructor).add(new dge(i,t,n,r))}}});
export {XOn};
