// @ts-nocheck
import {Q} from "../runtime.ts";
import {Tfo} from "./m4125.ts";
import {b4n} from "./m4114.ts";
var Zfo=Q((LAy,zWa)=>{var VWa=Tfo(),wMp=b4n().isApiWritable;zWa.exports=function(e,t,n,r){var o=e.ctor;if(o){var s=e.props||{};if(e.attributes)for(var i in e.attributes){var a=e.attributes[i];if(typeof a!=="object"||Array.isArray(a))a={type:a};if(!a.name)a.name=i.toLowerCase();s[i]=VWa.property(a)}if(s.constructor={value:o,writable:wMp},o.prototype=Object.create((e.superclass||t).prototype,s),e.events)HMp(o,e.events);n[e.name]=o}else o=t;return(e.tags||e.tag&&[e.tag]||[]).forEach(function(l){r[l]=o}),o};function KWa(e,t,n,r){this.body=e,this.document=t,this.form=n,this.element=r}KWa.prototype.build=function(){return()=>{}};function kMp(e,t,n,r){var o=e.ownerDocument||Object.create(null),s=e.form||Object.create(null);e[t]=new KWa(r,o,s,e).build()}function HMp(e,t){var n=e.prototype;t.forEach(function(r){Object.defineProperty(n,"on"+r,{get:function(){return this._getEventHandler(r)},set:function(o){this._setEventHandler(r,o)}}),VWa.registerChangeHandler(e,"on"+r,kMp)})}});
export {Zfo};
