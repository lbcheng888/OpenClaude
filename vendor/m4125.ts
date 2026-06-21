// @ts-nocheck
import {X} from "../runtime.ts";
import {DN} from "./m4106.ts";
import {d9t} from "./m4121.ts";
var euo=X((Kd_,i3a)=>{i3a.exports=Zco;var nkp=DN(),s3a=d9t();function Zco(e,t,n){s3a.call(this),this.nodeType=nkp.PROCESSING_INSTRUCTION_NODE,this.ownerDocument=e,this.target=t,this._data=n}var f9t={get:function(){return this._data},set:function(e){if(e===null||e===void 0)e="";else e=String(e);if(this._data=e,this.rooted)this.ownerDocument.mutateValue(this)}};Zco.prototype=Object.create(s3a.prototype,{nodeName:{get:function(){return this.target}},nodeValue:f9t,textContent:f9t,innerText:f9t,data:{get:f9t.get,set:function(e){f9t.set.call(this,e===null?"":String(e))}},clone:{value:function(){return new Zco(this.ownerDocument,this.target,this._data)}},isEqual:{value:function(t){return this.target===t.target&&this._data===t._data}}})});
export {euo};
