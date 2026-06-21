// @ts-nocheck
import {X} from "../runtime.ts";
import {Uf} from "./m2602.ts";
import {Zwe} from "./m2607.ts";
import {E4r} from "./m2616.ts";
import {C4r} from "./m2617.ts";
import {w_} from "./m2604.ts";
import {navigator} from "./m521.ts";
var az=X((rEh,v4r)=>{var cL=Uf();Zwe();E4r();C4r();w_();(function(){if(cL.random&&cL.random.getBytes){v4r.exports=cL.random;return}(function(e){var t={},n=[,,,,],r=cL.util.createBuffer();t.formatKey=function(d){var p=cL.util.createBuffer(d);return d=[,,,,],d[0]=p.getInt32(),d[1]=p.getInt32(),d[2]=p.getInt32(),d[3]=p.getInt32(),cL.aes._expandKey(d,!1)},t.formatSeed=function(d){var p=cL.util.createBuffer(d);return d=[,,,,],d[0]=p.getInt32(),d[1]=p.getInt32(),d[2]=p.getInt32(),d[3]=p.getInt32(),d},t.cipher=function(d,p){return cL.aes._updateBlock(d,p,n,!1),r.putInt32(n[0]),r.putInt32(n[1]),r.putInt32(n[2]),r.putInt32(n[3]),r.getBytes()},t.increment=function(d){return++d[3],d},t.md=cL.md.sha256;function o(){var d=cL.prng.create(t);return d.getBytes=function(p,m){return d.generate(p,m)},d.getBytesSync=function(p){return d.generate(p)},d}var s=o(),i=null,a=cL.util.globalScope,l=a.crypto||a.msCrypto;if(l&&l.getRandomValues)i=function(d){return l.getRandomValues(d)};if(cL.options.usePureJavaScript||!cL.util.isNodejs&&!i){if(typeof window>"u"||window.document===void 0);if(s.collectInt(+new Date,32),typeof navigator<"u"){var c="";for(var u in navigator)try{if(typeof navigator[u]=="string")c+=navigator[u]}catch(d){}s.collect(c),c=null}if(e)e().mousemove(function(d){s.collectInt(d.clientX,16),s.collectInt(d.clientY,16)}),e().keypress(function(d){s.collectInt(d.charCode,8)})}if(!cL.random)cL.random=s;else for(var u in s)cL.random[u]=s[u];cL.random.createInstance=o,v4r.exports=cL.random})(typeof jQuery<"u"?jQuery:null)})()});
export {az};
