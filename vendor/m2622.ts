// @ts-nocheck
import {Q} from "../runtime.ts";
import {Qm} from "./m2613.ts";
import {$ie} from "./m2621.ts";
import {x_} from "./m2615.ts";
var Ynt=Q((MOg,aFi)=>{var Ghe=Qm();$ie();x_();var uwd=aFi.exports=Ghe.hmac=Ghe.hmac||{};uwd.create=function(){var e=null,t=null,n=null,r=null,o={};return o.start=function(s,i){if(s!==null)if(typeof s==="string")if(s=s.toLowerCase(),s in Ghe.md.algorithms)t=Ghe.md.algorithms[s].create();else throw Error('Unknown hash algorithm "'+s+'"');else t=s;if(i===null)i=e;else{if(typeof i==="string")i=Ghe.util.createBuffer(i);else if(Ghe.util.isArray(i)){var a=i;i=Ghe.util.createBuffer();for(var l=0;l<a.length;++l)i.putByte(a[l])}var c=i.length();if(c>t.blockLength)t.start(),t.update(i.bytes()),i=t.digest();n=Ghe.util.createBuffer(),r=Ghe.util.createBuffer(),c=i.length();for(var l=0;l<c;++l){var a=i.at(l);n.putByte(54^a),r.putByte(92^a)}if(c<t.blockLength){var a=t.blockLength-c;for(var l=0;l<a;++l)n.putByte(54),r.putByte(92)}e=i,n=n.bytes(),r=r.bytes()}t.start(),t.update(n)},o.update=function(s){t.update(s)},o.getMac=function(){var s=t.digest().bytes();return t.start(),t.update(r),t.update(s),t.digest()},o.digest=o.getMac,o}});
export {Ynt};
