// @ts-nocheck
import {Q} from "../runtime.ts";
import {pro} from "./m3456.ts";
import {kAa} from "./m3553.ts";
var IAa=Q((mP_,HAa)=>{HAa.exports=YUt;var Icp=pro(),xcp=kAa(),voo=xcp("fs");function YUt(e,t,n){if(typeof t==="function")n=t,t={};else if(!t)t={};if(!n)return Icp(YUt,this,e,t);if(!t.xhr&&voo&&voo.readFile)return voo.readFile(e,function(o,s){return o&&typeof XMLHttpRequest<"u"?YUt.xhr(e,t,n):o?n(o):n(null,t.binary?s:s.toString("utf8"))});return YUt.xhr(e,t,n)}YUt.xhr=function(t,n,r){var o=new XMLHttpRequest;if(o.onreadystatechange=function(){if(o.readyState!==4)return;if(o.status!==0&&o.status!==200)return r(Error("status "+o.status));if(n.binary){var i=o.response;if(!i){i=[];for(var a=0;a<o.responseText.length;++a)i.push(o.responseText.charCodeAt(a)&255)}return r(null,typeof Uint8Array<"u"?new Uint8Array(i):i)}return r(null,o.responseText)},n.binary){if("overrideMimeType"in o)o.overrideMimeType("text/plain; charset=x-user-defined");o.responseType="arraybuffer"}o.open("GET",t),o.send()}});
export {IAa};
