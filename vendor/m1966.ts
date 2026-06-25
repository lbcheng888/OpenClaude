// @ts-nocheck
import {Q} from "../runtime.ts";
import {kNr} from "./m1965.ts";
var nsi=Q((QYh,tsi)=>{var Zoi=kNr(),esi=tsi.exports;(function(){function e(c){return c<10?"0"+c:c}var t=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,n=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,r,o,s={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':"\\\"","\\":"\\\\"},i;function a(c){return n.lastIndex=0,n.test(c)?'"'+c.replace(n,function(u){var d=s[u];return typeof d==="string"?d:"\\u"+("0000"+u.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+c+'"'}function l(c,u){var d,p,m,f,h=r,g,_=u[c],T=_!=null&&(_ instanceof Zoi||Zoi.isBigNumber(_));if(_&&typeof _==="object"&&typeof _.toJSON==="function")_=_.toJSON(c);if(typeof i==="function")_=i.call(u,c,_);switch(typeof _){case"string":if(T)return _;else return a(_);case"number":return isFinite(_)?String(_):"null";case"boolean":case"null":case"bigint":return String(_);case"object":if(!_)return"null";if(r+=o,g=[],Object.prototype.toString.apply(_)==="[object Array]"){f=_.length;for(d=0;d<f;d+=1)g[d]=l(d,_)||"null";return m=g.length===0?"[]":r?`[
`+r+g.join(`,
`+r)+`
`+h+"]":"["+g.join(",")+"]",r=h,m}if(i&&typeof i==="object"){f=i.length;for(d=0;d<f;d+=1)if(typeof i[d]==="string"){if(p=i[d],m=l(p,_),m)g.push(a(p)+(r?": ":":")+m)}}else Object.keys(_).forEach(function(y){var S=l(y,_);if(S)g.push(a(y)+(r?": ":":")+S)});return m=g.length===0?"{}":r?`{
`+r+g.join(`,
`+r)+`
`+h+"}":"{"+g.join(",")+"}",r=h,m}}if(typeof esi.stringify!=="function")esi.stringify=function(c,u,d){var p;if(r="",o="",typeof d==="number")for(p=0;p<d;p+=1)o+=" ";else if(typeof d==="string")o=d;if(i=u,u&&typeof u!=="function"&&(typeof u!=="object"||typeof u.length!=="number"))throw Error("JSON.stringify");return l("",{"":c})}})()});
export {nsi};
