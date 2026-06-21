// @ts-nocheck
import {X} from "../runtime.ts";
var fKs=X((aNA,mKs)=>{var Txt=require("buffer").Buffer,oDr=require("buffer").SlowBuffer;mKs.exports=cfn;function cfn(e,t){if(!Txt.isBuffer(e)||!Txt.isBuffer(t))return!1;if(e.length!==t.length)return!1;var n=0;for(var r=0;r<e.length;r++)n|=e[r]^t[r];return n===0}cfn.install=function(){Txt.prototype.equal=oDr.prototype.equal=function(t){return cfn(this,t)}};var BUu=Txt.prototype.equal,FUu=oDr.prototype.equal;cfn.restore=function(){Txt.prototype.equal=BUu,oDr.prototype.equal=FUu}});
export {fKs};
