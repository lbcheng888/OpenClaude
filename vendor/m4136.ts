// @ts-nocheck
import {X} from "../runtime.ts";
import {Ico} from "./m4112.ts";
import {E$n} from "./m4101.ts";
var duo=X((sp_,B3a)=>{var M3a=Ico(),ukp=E$n().isApiWritable;B3a.exports=function(e,t,n,r){var o=e.ctor;if(o){var s=e.props||{};if(e.attributes)for(var i in e.attributes){var a=e.attributes[i];if(typeof a!=="object"||Array.isArray(a))a={type:a};if(!a.name)a.name=i.toLowerCase();s[i]=M3a.property(a)}if(s.constructor={value:o,writable:ukp},o.prototype=Object.create((e.superclass||t).prototype,s),e.events)pkp(o,e.events);n[e.name]=o}else o=t;return(e.tags||e.tag&&[e.tag]||[]).forEach(function(l){r[l]=o}),o};function N3a(e,t,n,r){this.body=e,this.document=t,this.form=n,this.element=r}N3a.prototype.build=function(){return()=>{}};function dkp(e,t,n,r){var o=e.ownerDocument||Object.create(null),s=e.form||Object.create(null);e[t]=new N3a(r,o,s,e).build()}function pkp(e,t){var n=e.prototype;t.forEach(function(r){Object.defineProperty(n,"on"+r,{get:function(){return this._getEventHandler(r)},set:function(o){this._setEventHandler(r,o)}}),M3a.registerChangeHandler(e,"on"+r,dkp)})}});
export {duo};
