// @ts-nocheck
import {Q} from "../runtime.ts";
import {lDr} from "./m1490.ts";
import {cDr} from "./m1491.ts";
import {TWs} from "./m1492.ts";
import {kWs} from "./m1500.ts";
var IWs=Q((_fn)=>{Object.defineProperty(_fn,"__esModule",{value:!0});_fn.Sha256=void 0;var HWs=lDr(),gfn=cDr(),hfn=TWs(),dDr=kWs(),t4u=function(){function e(t){this.secret=t,this.hash=new hfn.RawSha256,this.reset()}return e.prototype.update=function(t){if((0,dDr.isEmptyData)(t)||this.error)return;try{this.hash.update((0,dDr.convertToBuffer)(t))}catch(n){this.error=n}},e.prototype.digestSync=function(){if(this.error)throw this.error;if(this.outer){if(!this.outer.finished)this.outer.update(this.hash.digest());return this.outer.digest()}return this.hash.digest()},e.prototype.digest=function(){return HWs.__awaiter(this,void 0,void 0,function(){return HWs.__generator(this,function(t){return[2,this.digestSync()]})})},e.prototype.reset=function(){if(this.hash=new hfn.RawSha256,this.secret){this.outer=new hfn.RawSha256;var t=n4u(this.secret),n=new Uint8Array(gfn.BLOCK_SIZE);n.set(t);for(var r=0;r<gfn.BLOCK_SIZE;r++)t[r]^=54,n[r]^=92;this.hash.update(t),this.outer.update(n);for(var r=0;r<t.byteLength;r++)t[r]=0}},e}();_fn.Sha256=t4u;function n4u(e){var t=(0,dDr.convertToBuffer)(e);if(t.byteLength>gfn.BLOCK_SIZE){var n=new hfn.RawSha256;n.update(t),t=n.digest()}var r=new Uint8Array(gfn.BLOCK_SIZE);return r.set(t),r}});
export {IWs};
