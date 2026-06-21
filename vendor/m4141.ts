// @ts-nocheck
import {X} from "../runtime.ts";
import {DN} from "./m4106.ts";
import {Vco} from "./m4120.ts";
import {D$n} from "./m4116.ts";
var V$n=X((up_,n4a)=>{n4a.exports=G$n;var Mkp=DN(),t4a=Vco(),Nkp=D$n();function G$n(e,t,n,r){t4a.call(this),this.nodeType=Mkp.DOCUMENT_TYPE_NODE,this.ownerDocument=e||null,this.name=t,this.publicId=n||"",this.systemId=r||""}G$n.prototype=Object.create(t4a.prototype,{nodeName:{get:function(){return this.name}},nodeValue:{get:function(){return null},set:function(){}},clone:{value:function(){return new G$n(this.ownerDocument,this.name,this.publicId,this.systemId)}},isEqual:{value:function(t){return this.name===t.name&&this.publicId===t.publicId&&this.systemId===t.systemId}}});Object.defineProperties(G$n.prototype,Nkp)});
export {V$n};
