// @ts-nocheck
import {b} from "../runtime.ts";
function xpr(e){if(typeof e!=="string")return!1;return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}
function kpr(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}
function gMe(e,t,n){let r=!xpr(t);if(e&&(r||n===!1))return kpr(e,t);return t}
var aen=()=>{};
function XUc(e){try{return new URL(e)}catch{return null}}
function _Ko(e){var t=(typeof e==="string"?XUc(e):e)||{},n=t.protocol,r=t.host,o=t.port;if(typeof r!=="string"||!r||typeof n!=="string")return"";if(n=n.split(":",1)[0],r=r.replace(/:\d*$/,""),o=parseInt(o)||JUc[n]||0,!QUc(r,o))return"";var s=Hpr(n+"_proxy")||Hpr("all_proxy");if(s&&s.indexOf("://")===-1)s=n+"://"+s;return s}
function QUc(e,t){var n=Hpr("no_proxy").toLowerCase();if(!n)return!0;if(n==="*")return!1;return n.split(/[,\s]/).every(function(r){if(!r)return!0;var o=r.match(/^(.+):(\d+)$/),s=o?o[1]:r,i=o?parseInt(o[2]):0;if(i&&i!==t)return!0;if(!/^[.*]/.test(s))return e!==s;if(s.charAt(0)==="*")s=s.slice(1);return!e.endsWith(s)})}
function Hpr(e){return process.env[e.toLowerCase()]||process.env[e.toUpperCase()]||""}
var JUc;
var yKo=b(()=>{JUc={ftp:21,gopher:70,http:80,https:443,ws:80,wss:443}});
export {xpr,kpr,gMe,aen,XUc,_Ko,QUc,Hpr,JUc,yKo};
