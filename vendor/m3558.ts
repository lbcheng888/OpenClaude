// @ts-nocheck
import {Q} from "../runtime.ts";
import {$Ie} from "./m3570.ts";
import {E4e} from "./m3569.ts";
import {XO} from "./m3568.ts";
var G1n=Q((_P_,BAa)=>{BAa.exports=R_e;var Ioo=$Ie();((R_e.prototype=Object.create(Ioo.prototype)).constructor=R_e).className="MapField";var Pcp=E4e(),JUt=XO();function R_e(e,t,n,r,o,s){if(Ioo.call(this,e,t,r,void 0,void 0,o,s),!JUt.isString(n))throw TypeError("keyType must be a string");this.keyType=n,this.resolvedKeyType=null,this.map=!0}R_e.fromJSON=function(t,n){return new R_e(t,n.id,n.keyType,n.type,n.options,n.comment)};R_e.prototype.toJSON=function(t){var n=t?Boolean(t.keepComments):!1;return JUt.toObject(["keyType",this.keyType,"type",this.type,"id",this.id,"extend",this.extend,"options",this.options,"comment",n?this.comment:void 0])};R_e.prototype.resolve=function(){if(this.resolved)return this;if(Pcp.mapKey[this.keyType]===void 0)throw Error("invalid key type: "+this.keyType);return Ioo.prototype.resolve.call(this)};R_e.d=function(t,n,r){if(typeof r==="function")r=JUt.decorateType(r).name;else if(r&&typeof r==="object")r=JUt.decorateEnum(r).name;return function(s,i){JUt.decorateType(s.constructor).add(new R_e(i,t,n,r))}}});
export {G1n};
