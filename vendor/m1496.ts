// @ts-nocheck
import {X} from "../runtime.ts";
import {Dxr} from "./m1485.ts";
import {Pxr} from "./m1486.ts";
import {C3s} from "./m1487.ts";
import {P3s} from "./m1495.ts";
var L3s=X((Ldn)=>{Object.defineProperty(Ldn,"__esModule",{value:!0});Ldn.Sha256=void 0;var O3s=Dxr(),Odn=Pxr(),Pdn=C3s(),Lxr=P3s(),MLu=function(){function e(t){this.secret=t,this.hash=new Pdn.RawSha256,this.reset()}return e.prototype.update=function(t){if((0,Lxr.isEmptyData)(t)||this.error)return;try{this.hash.update((0,Lxr.convertToBuffer)(t))}catch(n){this.error=n}},e.prototype.digestSync=function(){if(this.error)throw this.error;if(this.outer){if(!this.outer.finished)this.outer.update(this.hash.digest());return this.outer.digest()}return this.hash.digest()},e.prototype.digest=function(){return O3s.__awaiter(this,void 0,void 0,function(){return O3s.__generator(this,function(t){return[2,this.digestSync()]})})},e.prototype.reset=function(){if(this.hash=new Pdn.RawSha256,this.secret){this.outer=new Pdn.RawSha256;var t=NLu(this.secret),n=new Uint8Array(Odn.BLOCK_SIZE);n.set(t);for(var r=0;r<Odn.BLOCK_SIZE;r++)t[r]^=54,n[r]^=92;this.hash.update(t),this.outer.update(n);for(var r=0;r<t.byteLength;r++)t[r]=0}},e}();Ldn.Sha256=MLu;function NLu(e){var t=(0,Lxr.convertToBuffer)(e);if(t.byteLength>Odn.BLOCK_SIZE){var n=new Pdn.RawSha256;n.update(t),t=n.digest()}var r=new Uint8Array(Odn.BLOCK_SIZE);return r.set(t),r}});
export {L3s};
