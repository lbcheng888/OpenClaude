// @ts-nocheck
import {X} from "../runtime.ts";
import {Xk} from "./m4102.ts";
import {DN} from "./m4106.ts";
import {d9t} from "./m4121.ts";
var zco=X((Wd_,Z9a)=>{Z9a.exports=Kco;var J9a=Xk(),X9a=DN(),Q9a=d9t();function Kco(e,t){Q9a.call(this),this.nodeType=X9a.TEXT_NODE,this.ownerDocument=e,this._data=t,this._index=void 0}var p9t={get:function(){return this._data},set:function(e){if(e===null||e===void 0)e="";else e=String(e);if(e===this._data)return;if(this._data=e,this.rooted)this.ownerDocument.mutateValue(this);if(this.parentNode&&this.parentNode._textchangehook)this.parentNode._textchangehook(this)}};Kco.prototype=Object.create(Q9a.prototype,{nodeName:{value:"#text"},nodeValue:p9t,textContent:p9t,innerText:p9t,data:{get:p9t.get,set:function(e){p9t.set.call(this,e===null?"":String(e))}},splitText:{value:function(t){if(t>this._data.length||t<0)J9a.IndexSizeError();var n=this._data.substring(t),r=this.ownerDocument.createTextNode(n);this.data=this.data.substring(0,t);var o=this.parentNode;if(o!==null)o.insertBefore(r,this.nextSibling);return r}},wholeText:{get:function(){var t=this.textContent;for(var n=this.nextSibling;n;n=n.nextSibling){if(n.nodeType!==X9a.TEXT_NODE)break;t+=n.textContent}return t}},replaceWholeText:{value:J9a.nyi},clone:{value:function(){return new Kco(this.ownerDocument,this._data)}}})});
export {zco};
