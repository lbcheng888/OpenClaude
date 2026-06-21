// @ts-nocheck
import {X} from "../runtime.ts";
import {Ebo} from "./m4696.ts";
import {qbo} from "./m4719.ts";
import {Lhl} from "./m4743.ts";
import {Mhl} from "./m4744.ts";
import {Whl} from "./m4747.ts";
import {Khl} from "./m4749.ts";
import {Jhl} from "./m4751.ts";
var egl=X((BDe)=>{var Xhl=Ebo(),uEo=qbo(),iZp=Lhl(),Qhl=Mhl(),aZp=Whl(),Zhl=Khl();function kjt(e,t,n){if(typeof e>"u")throw Error("String required as first argument");if(typeof n>"u")n=t,t={};if(typeof n!=="function")if(!Xhl())throw Error("Callback required as last argument");else t=n||{},n=null;return{opts:t,cb:n}}function lZp(e){return e.slice((e.lastIndexOf(".")-1>>>0)+2).toLowerCase()}function OWn(e){switch(e){case"svg":return Zhl;case"txt":case"utf8":return Qhl;case"png":case"image/png":default:return iZp}}function cZp(e){switch(e){case"svg":return Zhl;case"terminal":return aZp;case"utf8":default:return Qhl}}function Hjt(e,t,n){if(!n.cb)return new Promise(function(r,o){try{let s=uEo.create(t,n.opts);return e(s,n.opts,function(i,a){return i?o(i):r(a)})}catch(s){o(s)}});try{let r=uEo.create(t,n.opts);return e(r,n.opts,n.cb)}catch(r){n.cb(r)}}BDe.create=uEo.create;BDe.toCanvas=Jhl().toCanvas;BDe.toString=function(t,n,r){let o=kjt(t,n,r),s=o.opts?o.opts.type:void 0,i=cZp(s);return Hjt(i.render,t,o)};BDe.toDataURL=function(t,n,r){let o=kjt(t,n,r),s=OWn(o.opts.type);return Hjt(s.renderToDataURL,t,o)};BDe.toBuffer=function(t,n,r){let o=kjt(t,n,r),s=OWn(o.opts.type);return Hjt(s.renderToBuffer,t,o)};BDe.toFile=function(t,n,r,o){if(typeof t!=="string"||!(typeof n==="string"||typeof n==="object"))throw Error("Invalid argument");if(arguments.length<3&&!Xhl())throw Error("Too few arguments provided");let s=kjt(n,r,o),i=s.opts.type||lZp(t),l=OWn(i).renderToFile.bind(null,t);return Hjt(l,n,s)};BDe.toFileStream=function(t,n,r){if(arguments.length<2)throw Error("Too few arguments provided");let o=kjt(n,r,t.emit.bind(t,"error")),i=OWn("png").renderToFileStream.bind(null,t);Hjt(i,n,o)}});
export {egl};
