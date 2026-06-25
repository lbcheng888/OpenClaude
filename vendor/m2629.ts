// @ts-nocheck
import {Q} from "../runtime.ts";
import {Qm} from "./m2613.ts";
import {Mwe} from "./m2618.ts";
import {tWr} from "./m2627.ts";
import {nWr} from "./m2628.ts";
import {x_} from "./m2615.ts";
import {navigator} from "./m527.ts";
var Pz=Q((WOg,rWr)=>{var vO=Qm();Mwe();tWr();nWr();x_();(function(){if(vO.random&&vO.random.getBytes){rWr.exports=vO.random;return}(function(e){var t={},n=[,,,,],r=vO.util.createBuffer();t.formatKey=function(d){var p=vO.util.createBuffer(d);return d=[,,,,],d[0]=p.getInt32(),d[1]=p.getInt32(),d[2]=p.getInt32(),d[3]=p.getInt32(),vO.aes._expandKey(d,!1)},t.formatSeed=function(d){var p=vO.util.createBuffer(d);return d=[,,,,],d[0]=p.getInt32(),d[1]=p.getInt32(),d[2]=p.getInt32(),d[3]=p.getInt32(),d},t.cipher=function(d,p){return vO.aes._updateBlock(d,p,n,!1),r.putInt32(n[0]),r.putInt32(n[1]),r.putInt32(n[2]),r.putInt32(n[3]),r.getBytes()},t.increment=function(d){return++d[3],d},t.md=vO.md.sha256;function o(){var d=vO.prng.create(t);return d.getBytes=function(p,m){return d.generate(p,m)},d.getBytesSync=function(p){return d.generate(p)},d}var s=o(),i=null,a=vO.util.globalScope,l=a.crypto||a.msCrypto;if(l&&l.getRandomValues)i=function(d){return l.getRandomValues(d)};if(vO.options.usePureJavaScript||!vO.util.isNodejs&&!i){if(typeof window>"u"||window.document===void 0);if(s.collectInt(+new Date,32),typeof navigator<"u"){var c="";for(var u in navigator)try{if(typeof navigator[u]=="string")c+=navigator[u]}catch(d){}s.collect(c),c=null}if(e)e().mousemove(function(d){s.collectInt(d.clientX,16),s.collectInt(d.clientY,16)}),e().keypress(function(d){s.collectInt(d.charCode,8)})}if(!vO.random)vO.random=s;else for(var u in s)vO.random[u]=s[u];vO.random.createInstance=o,rWr.exports=vO.random})(typeof jQuery<"u"?jQuery:null)})()});
export {Pz};
