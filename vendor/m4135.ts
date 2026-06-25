// @ts-nocheck
import {Q} from "../runtime.ts";
import {agentMcpClients} from "./m4115.ts";
import {Y1} from "./m4119.ts";
import {w4t} from "./m4134.ts";
var Mfo=Q((SAy,lWa)=>{lWa.exports=Lfo;var sWa=agentMcpClients(),iWa=Y1(),aWa=w4t();function Lfo(e,t){aWa.call(this),this.nodeType=iWa.TEXT_NODE,this.ownerDocument=e,this._data=t,this._index=void 0}var k4t={get:function(){return this._data},set:function(e){if(e===null||e===void 0)e="";else e=String(e);if(e===this._data)return;if(this._data=e,this.rooted)this.ownerDocument.mutateValue(this);if(this.parentNode&&this.parentNode._textchangehook)this.parentNode._textchangehook(this)}};Lfo.prototype=Object.create(aWa.prototype,{nodeName:{value:"#text"},nodeValue:k4t,textContent:k4t,innerText:k4t,data:{get:k4t.get,set:function(e){k4t.set.call(this,e===null?"":String(e))}},splitText:{value:function(t){if(t>this._data.length||t<0)sWa.IndexSizeError();var n=this._data.substring(t),r=this.ownerDocument.createTextNode(n);this.data=this.data.substring(0,t);var o=this.parentNode;if(o!==null)o.insertBefore(r,this.nextSibling);return r}},wholeText:{get:function(){var t=this.textContent;for(var n=this.nextSibling;n;n=n.nextSibling){if(n.nodeType!==iWa.TEXT_NODE)break;t+=n.textContent}return t}},replaceWholeText:{value:sWa.nyi},clone:{value:function(){return new Lfo(this.ownerDocument,this._data)}}})});
export {Mfo};
