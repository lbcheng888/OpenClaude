// @ts-nocheck
import {Q} from "../runtime.ts";
var Nss=Q((sDf,Mss)=>{var{PassThrough:Tiu}=require("stream");Mss.exports=function(){var e=[],t=new Tiu({objectMode:!0});return t.setMaxListeners(0),t.add=n,t.isEmpty=r,t.on("unpipe",o),Array.prototype.slice.call(arguments).forEach(n),t;function n(s){if(Array.isArray(s))return s.forEach(n),this;return e.push(s),s.once("end",o.bind(null,s)),s.once("error",t.emit.bind(t,"error")),s.pipe(t,{end:!1}),this}function r(){return e.length==0}function o(s){if(e=e.filter(function(i){return i!==s}),!e.length&&t.readable)t.end()}}});
export {Nss};
