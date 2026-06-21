// @ts-nocheck
import {X} from "../runtime.ts";
import {Uf} from "./m2602.ts";
import {Wie} from "./m2610.ts";
import {w_} from "./m2604.ts";
var Get=X((Jbh,kDi)=>{var IAe=Uf();Wie();w_();var Fhd=kDi.exports=IAe.hmac=IAe.hmac||{};Fhd.create=function(){var e=null,t=null,n=null,r=null,o={};return o.start=function(s,i){if(s!==null)if(typeof s==="string")if(s=s.toLowerCase(),s in IAe.md.algorithms)t=IAe.md.algorithms[s].create();else throw Error('Unknown hash algorithm "'+s+'"');else t=s;if(i===null)i=e;else{if(typeof i==="string")i=IAe.util.createBuffer(i);else if(IAe.util.isArray(i)){var a=i;i=IAe.util.createBuffer();for(var l=0;l<a.length;++l)i.putByte(a[l])}var c=i.length();if(c>t.blockLength)t.start(),t.update(i.bytes()),i=t.digest();n=IAe.util.createBuffer(),r=IAe.util.createBuffer(),c=i.length();for(var l=0;l<c;++l){var a=i.at(l);n.putByte(54^a),r.putByte(92^a)}if(c<t.blockLength){var a=t.blockLength-c;for(var l=0;l<a;++l)n.putByte(54),r.putByte(92)}e=i,n=n.bytes(),r=r.bytes()}t.start(),t.update(n)},o.update=function(s){t.update(s)},o.getMac=function(){var s=t.digest().bytes();return t.start(),t.update(r),t.update(s),t.digest()},o.digest=o.getMac,o}});
export {Get};
