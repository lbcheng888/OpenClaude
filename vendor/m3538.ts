// @ts-nocheck
import {X} from "../runtime.ts";
import {HQr} from "./m3440.ts";
import {mga} from "./m3537.ts";
var Aga=X((kTg,fga)=>{fga.exports=yBt;var qQd=HQr(),jQd=mga(),WZr=jQd("fs");function yBt(e,t,n){if(typeof t==="function")n=t,t={};else if(!t)t={};if(!n)return qQd(yBt,this,e,t);if(!t.xhr&&WZr&&WZr.readFile)return WZr.readFile(e,function(o,s){return o&&typeof XMLHttpRequest<"u"?yBt.xhr(e,t,n):o?n(o):n(null,t.binary?s:s.toString("utf8"))});return yBt.xhr(e,t,n)}yBt.xhr=function(t,n,r){var o=new XMLHttpRequest;if(o.onreadystatechange=function(){if(o.readyState!==4)return;if(o.status!==0&&o.status!==200)return r(Error("status "+o.status));if(n.binary){var i=o.response;if(!i){i=[];for(var a=0;a<o.responseText.length;++a)i.push(o.responseText.charCodeAt(a)&255)}return r(null,typeof Uint8Array<"u"?new Uint8Array(i):i)}return r(null,o.responseText)},n.binary){if("overrideMimeType"in o)o.overrideMimeType("text/plain; charset=x-user-defined");o.responseType="arraybuffer"}o.open("GET",t),o.send()}});
export {Aga};
