// @ts-nocheck
import {b} from "../runtime.ts";
function r_r(e){if(typeof e!=="string")return!1;return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}
function o_r(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}
function u1e(e,t,n){let r=!r_r(t);if(e&&(r||n===!1))return o_r(e,t);return t}
var qnn=()=>{};
function oGc(e){try{return new URL(e)}catch{return null}}
function hZo(e){var t=(typeof e==="string"?oGc(e):e)||{},n=t.protocol,r=t.host,o=t.port;if(typeof r!=="string"||!r||typeof n!=="string")return"";if(n=n.split(":",1)[0],r=r.replace(/:\d*$/,""),o=parseInt(o)||rGc[n]||0,!sGc(r,o))return"";var s=s_r(n+"_proxy")||s_r("all_proxy");if(s&&s.indexOf("://")===-1)s=n+"://"+s;return s}
function sGc(e,t){var n=s_r("no_proxy").toLowerCase();if(!n)return!0;if(n==="*")return!1;return n.split(/[,\s]/).every(function(r){if(!r)return!0;var o=r.match(/^(.+):(\d+)$/),s=o?o[1]:r,i=o?parseInt(o[2]):0;if(i&&i!==t)return!0;if(!/^[.*]/.test(s))return e!==s;if(s.charAt(0)==="*")s=s.slice(1);return!e.endsWith(s)})}
function s_r(e){return process.env[e.toLowerCase()]||process.env[e.toUpperCase()]||""}
var rGc;
var gZo=b(()=>{rGc={ftp:21,gopher:70,http:80,https:443,ws:80,wss:443}});
export {r_r,o_r,u1e,qnn,oGc,hZo,sGc,s_r,rGc,gZo};
