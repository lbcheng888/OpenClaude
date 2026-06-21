// @ts-nocheck
import {X} from "../runtime.ts";
import {lkr} from "./m1547.ts";
import {ckr} from "./m1552.ts";
import {epn} from "./m1554.ts";
var mjs=X((Zdn)=>{Object.defineProperty(Zdn,"__esModule",{value:!0});Zdn.AwsCrc32=void 0;var djs=lkr(),ukr=ckr(),pjs=epn(),tMu=function(){function e(){this.crc32=new pjs.Crc32}return e.prototype.update=function(t){if((0,ukr.isEmptyData)(t))return;this.crc32.update((0,ukr.convertToBuffer)(t))},e.prototype.digest=function(){return djs.__awaiter(this,void 0,void 0,function(){return djs.__generator(this,function(t){return[2,(0,ukr.numToUint8)(this.crc32.digest())]})})},e.prototype.reset=function(){this.crc32=new pjs.Crc32},e}();Zdn.AwsCrc32=tMu});
export {mjs};
