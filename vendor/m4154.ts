// @ts-nocheck
import {Q} from "../runtime.ts";
import {Y1} from "./m4119.ts";
import {Ofo} from "./m4133.ts";
import {I4n} from "./m4129.ts";
var G4n=Q((UAy,dGa)=>{dGa.exports=W4n;var ZMp=Y1(),uGa=Ofo(),e1p=I4n();function W4n(e,t,n,r){uGa.call(this),this.nodeType=ZMp.DOCUMENT_TYPE_NODE,this.ownerDocument=e||null,this.name=t,this.publicId=n||"",this.systemId=r||""}W4n.prototype=Object.create(uGa.prototype,{nodeName:{get:function(){return this.name}},nodeValue:{get:function(){return null},set:function(){}},clone:{value:function(){return new W4n(this.ownerDocument,this.name,this.publicId,this.systemId)}},isEqual:{value:function(t){return this.name===t.name&&this.publicId===t.publicId&&this.systemId===t.systemId}}});Object.defineProperties(W4n.prototype,e1p)});
export {G4n};
