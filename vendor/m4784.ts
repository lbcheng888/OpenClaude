// @ts-nocheck
import {Q} from "../runtime.ts";
import {qwo} from "./m4728.ts";
import {ako} from "./m4751.ts";
import {xAl} from "./m4775.ts";
import {DAl} from "./m4776.ts";
import {UAl} from "./m4779.ts";
import {WAl} from "./m4781.ts";
import {KAl} from "./m4783.ts";
var JAl=Q((MPe)=>{var zAl=qwo(),Hko=ako(),Tlm=xAl(),jAl=DAl(),Slm=UAl(),YAl=WAl();function zWt(e,t,n){if(typeof e>"u")throw Error("String required as first argument");if(typeof n>"u")n=t,t={};if(typeof n!=="function")if(!zAl())throw Error("Callback required as last argument");else t=n||{},n=null;return{opts:t,cb:n}}function blm(e){return e.slice((e.lastIndexOf(".")-1>>>0)+2).toLowerCase()}function Szn(e){switch(e){case"svg":return YAl;case"txt":case"utf8":return jAl;case"png":case"image/png":default:return Tlm}}function Elm(e){switch(e){case"svg":return YAl;case"terminal":return Slm;case"utf8":default:return jAl}}function jWt(e,t,n){if(!n.cb)return new Promise(function(r,o){try{let s=Hko.create(t,n.opts);return e(s,n.opts,function(i,a){return i?o(i):r(a)})}catch(s){o(s)}});try{let r=Hko.create(t,n.opts);return e(r,n.opts,n.cb)}catch(r){n.cb(r)}}MPe.create=Hko.create;MPe.toCanvas=KAl().toCanvas;MPe.toString=function(t,n,r){let o=zWt(t,n,r),s=o.opts?o.opts.type:void 0,i=Elm(s);return jWt(i.render,t,o)};MPe.toDataURL=function(t,n,r){let o=zWt(t,n,r),s=Szn(o.opts.type);return jWt(s.renderToDataURL,t,o)};MPe.toBuffer=function(t,n,r){let o=zWt(t,n,r),s=Szn(o.opts.type);return jWt(s.renderToBuffer,t,o)};MPe.toFile=function(t,n,r,o){if(typeof t!=="string"||!(typeof n==="string"||typeof n==="object"))throw Error("Invalid argument");if(arguments.length<3&&!zAl())throw Error("Too few arguments provided");let s=zWt(n,r,o),i=s.opts.type||blm(t),l=Szn(i).renderToFile.bind(null,t);return jWt(l,n,s)};MPe.toFileStream=function(t,n,r){if(arguments.length<2)throw Error("Too few arguments provided");let o=zWt(n,r,t.emit.bind(t,"error")),i=Szn("png").renderToFileStream.bind(null,t);jWt(i,n,o)}});
export {JAl};
