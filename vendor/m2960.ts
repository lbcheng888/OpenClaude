// @ts-nocheck
import {Q} from "../runtime.ts";
var Rji=Q((kjg,Aji)=>{function c9d(e){var t="[ \\t\\f]*",n="[ \\t\\f]+",r=t+"[:=]"+t,o=n,s="("+r+"|"+o+")",i="([^\\\\\\W:= \\t\\f\\n]|\\\\.)+",a="([^\\\\:= \\t\\f\\n]|\\\\.)+",l={end:s,relevance:0,starts:{className:"string",end:/$/,relevance:0,contains:[{begin:"\\\\\\\\"},{begin:"\\\\\\n"}]}};return{name:".properties",case_insensitive:!0,illegal:/\S/,contains:[e.COMMENT("^\\s*[!#]","$"),{returnBegin:!0,variants:[{begin:i+r,relevance:1},{begin:i+o,relevance:0}],contains:[{className:"attr",begin:i,endsParent:!0,relevance:0}],starts:l},{begin:a+s,returnBegin:!0,relevance:0,contains:[{className:"meta",begin:a,endsParent:!0,relevance:0}],starts:l},{className:"attr",relevance:0,begin:a+t+"$"}]}}Aji.exports=c9d});
export {Rji};
