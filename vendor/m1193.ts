// @ts-nocheck
import {b} from "../runtime.ts";
import {mln,gHs,_Hs} from "./m1185.ts";
import {tCr,QEr,ZEr} from "./m1192.ts";
import {Aln,N1e} from "./m1194.ts";
import {XEr} from "./m1191.ts";
var nRu;
var wHs=b(()=>{mln();tCr();Aln();nRu=function(){function e(){this.crc32=new N1e}return e.prototype.update=function(t){if(QEr(t))return;this.crc32.update(XEr(t))},e.prototype.digest=function(){return gHs(this,void 0,void 0,function(){return _Hs(this,function(t){return[2,ZEr(this.crc32.digest())]})})},e.prototype.reset=function(){this.crc32=new N1e},e}()});
export {nRu,wHs};
