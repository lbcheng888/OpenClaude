// @ts-nocheck
import {Q} from "../runtime.ts";
import {Y1} from "./m4119.ts";
import {w4t} from "./m4134.ts";
var qfo=Q((CAy,hWa)=>{hWa.exports=$fo;var TMp=Y1(),fWa=w4t();function $fo(e,t,n){fWa.call(this),this.nodeType=TMp.PROCESSING_INSTRUCTION_NODE,this.ownerDocument=e,this.target=t,this._data=n}var I4t={get:function(){return this._data},set:function(e){if(e===null||e===void 0)e="";else e=String(e);if(this._data=e,this.rooted)this.ownerDocument.mutateValue(this)}};$fo.prototype=Object.create(fWa.prototype,{nodeName:{get:function(){return this.target}},nodeValue:I4t,textContent:I4t,innerText:I4t,data:{get:I4t.get,set:function(e){I4t.set.call(this,e===null?"":String(e))}},clone:{value:function(){return new $fo(this.ownerDocument,this.target,this._data)}},isEqual:{value:function(t){return this.target===t.target&&this._data===t._data}}})});
export {qfo};
