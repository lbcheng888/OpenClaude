// @ts-nocheck
import {Q} from "../runtime.ts";
import {sCl} from "./m4738.ts";
var lCl=Q((rrS,aCl)=>{var iCl=sCl();function zwo(e){if(this.genPoly=void 0,this.degree=e,this.degree)this.initialize(this.degree)}zwo.prototype.initialize=function(t){this.degree=t,this.genPoly=iCl.generateECPolynomial(this.degree)};zwo.prototype.encode=function(t){if(!this.genPoly)throw Error("Encoder not initialized");let n=new Uint8Array(t.length+this.degree);n.set(t);let r=iCl.mod(n,this.genPoly),o=this.degree-r.length;if(o>0){let s=new Uint8Array(this.degree);return s.set(r,o),s}return r};aCl.exports=zwo});
export {lCl};
