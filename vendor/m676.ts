// @ts-nocheck
import {X} from "../runtime.ts";
var UZo=X((BTf,FZo)=>{var{PassThrough:nJc}=require("stream");FZo.exports=function(){var e=[],t=new nJc({objectMode:!0});return t.setMaxListeners(0),t.add=n,t.isEmpty=r,t.on("unpipe",o),Array.prototype.slice.call(arguments).forEach(n),t;function n(s){if(Array.isArray(s))return s.forEach(n),this;return e.push(s),s.once("end",o.bind(null,s)),s.once("error",t.emit.bind(t,"error")),s.pipe(t,{end:!1}),this}function r(){return e.length==0}function o(s){if(e=e.filter(function(i){return i!==s}),!e.length&&t.readable)t.end()}}});
export {UZo};
