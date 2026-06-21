// @ts-nocheck
import {X} from "../runtime.ts";
import {QPr} from "./m1960.ts";
var aZs=X((H4A,iZs)=>{var oZs=QPr(),sZs=iZs.exports;(function(){function e(c){return c<10?"0"+c:c}var t=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,n=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,r,o,s={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':"\\\"","\\":"\\\\"},i;function a(c){return n.lastIndex=0,n.test(c)?'"'+c.replace(n,function(u){var d=s[u];return typeof d==="string"?d:"\\u"+("0000"+u.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+c+'"'}function l(c,u){var d,p,m,f,A=r,h,g=u[c],_=g!=null&&(g instanceof oZs||oZs.isBigNumber(g));if(g&&typeof g==="object"&&typeof g.toJSON==="function")g=g.toJSON(c);if(typeof i==="function")g=i.call(u,c,g);switch(typeof g){case"string":if(_)return g;else return a(g);case"number":return isFinite(g)?String(g):"null";case"boolean":case"null":case"bigint":return String(g);case"object":if(!g)return"null";if(r+=o,h=[],Object.prototype.toString.apply(g)==="[object Array]"){f=g.length;for(d=0;d<f;d+=1)h[d]=l(d,g)||"null";return m=h.length===0?"[]":r?`[
`+r+h.join(`,
`+r)+`
`+A+"]":"["+h.join(",")+"]",r=A,m}if(i&&typeof i==="object"){f=i.length;for(d=0;d<f;d+=1)if(typeof i[d]==="string"){if(p=i[d],m=l(p,g),m)h.push(a(p)+(r?": ":":")+m)}}else Object.keys(g).forEach(function(y){var T=l(y,g);if(T)h.push(a(y)+(r?": ":":")+T)});return m=h.length===0?"{}":r?`{
`+r+h.join(`,
`+r)+`
`+A+"}":"{"+h.join(",")+"}",r=A,m}}if(typeof sZs.stringify!=="function")sZs.stringify=function(c,u,d){var p;if(r="",o="",typeof d==="number")for(p=0;p<d;p+=1)o+=" ";else if(typeof d==="string")o=d;if(i=u,u&&typeof u!=="function"&&(typeof u!=="object"||typeof u.length!=="number"))throw Error("JSON.stringify");return l("",{"":c})}})()});
export {aZs};
