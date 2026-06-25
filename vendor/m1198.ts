// @ts-nocheck
import {b} from "../runtime.ts";
import {Xun,dLs,pLs} from "./m1190.ts";
import {Ikr,wkr,kkr} from "./m1197.ts";
import {Zun,INe} from "./m1199.ts";
import {vkr} from "./m1196.ts";
var yMu;
var SLs=b(()=>{Xun();Ikr();Zun();yMu=function(){function e(){this.crc32=new INe}return e.prototype.update=function(t){if(wkr(t))return;this.crc32.update(vkr(t))},e.prototype.digest=function(){return dLs(this,void 0,void 0,function(){return pLs(this,function(t){return[2,kkr(this.crc32.digest())]})})},e.prototype.reset=function(){this.crc32=new INe},e}()});
export {yMu,SLs};
