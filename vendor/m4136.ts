// @ts-nocheck
import {Q} from "../runtime.ts";
import {Y1} from "./m4119.ts";
import {w4t} from "./m4134.ts";
var Ffo=Q((bAy,uWa)=>{uWa.exports=Nfo;var hMp=Y1(),cWa=w4t();function Nfo(e,t){cWa.call(this),this.nodeType=hMp.COMMENT_NODE,this.ownerDocument=e,this._data=t}var H4t={get:function(){return this._data},set:function(e){if(e===null||e===void 0)e="";else e=String(e);if(this._data=e,this.rooted)this.ownerDocument.mutateValue(this)}};Nfo.prototype=Object.create(cWa.prototype,{nodeName:{value:"#comment"},nodeValue:H4t,textContent:H4t,innerText:H4t,data:{get:H4t.get,set:function(e){H4t.set.call(this,e===null?"":String(e))}},clone:{value:function(){return new Nfo(this.ownerDocument,this._data)}}})});
export {Ffo};
