// @ts-nocheck
import {Q} from "../runtime.ts";
import {FDr} from "./m1552.ts";
import {BDr} from "./m1557.ts";
import {Mfn} from "./m1559.ts";
var l7s=Q((Lfn)=>{Object.defineProperty(Lfn,"__esModule",{value:!0});Lfn.AwsCrc32=void 0;var i7s=FDr(),UDr=BDr(),a7s=Mfn(),S4u=function(){function e(){this.crc32=new a7s.Crc32}return e.prototype.update=function(t){if((0,UDr.isEmptyData)(t))return;this.crc32.update((0,UDr.convertToBuffer)(t))},e.prototype.digest=function(){return i7s.__awaiter(this,void 0,void 0,function(){return i7s.__generator(this,function(t){return[2,(0,UDr.numToUint8)(this.crc32.digest())]})})},e.prototype.reset=function(){this.crc32=new a7s.Crc32},e}();Lfn.AwsCrc32=S4u});
export {l7s};
