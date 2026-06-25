// @ts-nocheck
import {Q} from "../runtime.ts";
var cZs=Q((H8h,lZs)=>{var zIt=require("buffer").Buffer,OMr=require("buffer").SlowBuffer;lZs.exports=Vgn;function Vgn(e,t){if(!zIt.isBuffer(e)||!zIt.isBuffer(t))return!1;if(e.length!==t.length)return!1;var n=0;for(var r=0;r<e.length;r++)n|=e[r]^t[r];return n===0}Vgn.install=function(){zIt.prototype.equal=OMr.prototype.equal=function(t){return Vgn(this,t)}};var rGu=zIt.prototype.equal,oGu=OMr.prototype.equal;Vgn.restore=function(){zIt.prototype.equal=rGu,OMr.prototype.equal=oGu}});
export {cZs};
