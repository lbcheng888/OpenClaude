// @ts-nocheck
import {X} from "../runtime.ts";
import {cAl} from "./m4706.ts";
var pAl=X((e5y,dAl)=>{var uAl=cAl();function xbo(e){if(this.genPoly=void 0,this.degree=e,this.degree)this.initialize(this.degree)}xbo.prototype.initialize=function(t){this.degree=t,this.genPoly=uAl.generateECPolynomial(this.degree)};xbo.prototype.encode=function(t){if(!this.genPoly)throw Error("Encoder not initialized");let n=new Uint8Array(t.length+this.degree);n.set(t);let r=uAl.mod(n,this.genPoly),o=this.degree-r.length;if(o>0){let s=new Uint8Array(this.degree);return s.set(r,o),s}return r};dAl.exports=xbo});
export {pAl};
