// @ts-nocheck
import {Q} from "../runtime.ts";
var hko=Q((ErS,GCl)=>{var mko=[];(function(){for(let e=0;e<256;e++){let t=e;for(let n=0;n<8;n++)if(t&1)t=3988292384^t>>>1;else t=t>>>1;mko[e]=t}})();var fko=GCl.exports=function(){this._crc=-1};fko.prototype.write=function(e){for(let t=0;t<e.length;t++)this._crc=mko[(this._crc^e[t])&255]^this._crc>>>8;return!0};fko.prototype.crc32=function(){return this._crc^-1};fko.crc32=function(e){let t=-1;for(let n=0;n<e.length;n++)t=mko[(t^e[n])&255]^t>>>8;return t^-1}});
export {hko};
