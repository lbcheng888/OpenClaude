// @ts-nocheck
import {X} from "../runtime.ts";
var Jbo=X((y5y,zAl)=>{var zbo=[];(function(){for(let e=0;e<256;e++){let t=e;for(let n=0;n<8;n++)if(t&1)t=3988292384^t>>>1;else t=t>>>1;zbo[e]=t}})();var Ybo=zAl.exports=function(){this._crc=-1};Ybo.prototype.write=function(e){for(let t=0;t<e.length;t++)this._crc=zbo[(this._crc^e[t])&255]^this._crc>>>8;return!0};Ybo.prototype.crc32=function(){return this._crc^-1};Ybo.crc32=function(e){let t=-1;for(let n=0;n<e.length;n++)t=zbo[(t^e[n])&255]^t>>>8;return t^-1}});
export {Jbo};
