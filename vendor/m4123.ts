// @ts-nocheck
import {X} from "../runtime.ts";
import {DN} from "./m4106.ts";
import {d9t} from "./m4121.ts";
var Jco=X((Gd_,t3a)=>{t3a.exports=Yco;var Qxp=DN(),e3a=d9t();function Yco(e,t){e3a.call(this),this.nodeType=Qxp.COMMENT_NODE,this.ownerDocument=e,this._data=t}var m9t={get:function(){return this._data},set:function(e){if(e===null||e===void 0)e="";else e=String(e);if(this._data=e,this.rooted)this.ownerDocument.mutateValue(this)}};Yco.prototype=Object.create(e3a.prototype,{nodeName:{value:"#comment"},nodeValue:m9t,textContent:m9t,innerText:m9t,data:{get:m9t.get,set:function(e){m9t.set.call(this,e===null?"":String(e))}},clone:{value:function(){return new Yco(this.ownerDocument,this._data)}}})});
export {Jco};
