// @ts-nocheck
import {Q} from "../runtime.ts";
var bko=Q((xrS,hAl)=>{var fAl=hAl.exports=function(e){this._buffer=e,this._reads=[]};fAl.prototype.read=function(e,t){this._reads.push({length:Math.abs(e),allowLess:e<0,func:t})};fAl.prototype.process=function(){while(this._reads.length>0&&this._buffer.length){let e=this._reads[0];if(this._buffer.length&&(this._buffer.length>=e.length||e.allowLess)){this._reads.shift();let t=this._buffer;this._buffer=t.slice(e.length),e.func.call(this,t.slice(0,e.length))}else break}if(this._reads.length>0)return Error("There are some read requests waitng on finished stream");if(this._buffer.length>0)return Error("unrecognised content at end of stream")}});
export {bko};
