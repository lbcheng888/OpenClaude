// @ts-nocheck
import {Xa} from "./m2509.ts";
import {b} from "../runtime.ts";
function r0n(e,t){let n=e.lastIndexOf(" -");if(n>0){let r=e.substring(0,n),o=e.substring(n+1);return`${Xa([r])} ${o} ${Xa([t])}`}else return`${Xa([e])} ${Xa([t])}`}
var UYr=()=>{};
function $Yr(e){if(/\d\s*<<\s*\d/.test(e)||/\[\[\s*\d+\s*<<\s*\d+\s*\]\]/.test(e)||/\$\(\(.*<<.*\)\)/.test(e))return!1;return/<<-?\s*(?:(['"]?)(\w+)\1|\\(\w+))/.test(e)}
function Qjd(e){let t=/'(?:[^'\\]|\\.)*\n(?:[^'\\]|\\.)*'/,n=/"(?:[^"\\]|\\.)*\n(?:[^"\\]|\\.)*"/;return t.test(e)||n.test(e)}
function Cia(e,t=!0){if($Yr(e)||Qjd(e)){let o=`'${e.replaceAll("'",`'"'"'`)}'`;if($Yr(e))return o;return t?`${o} < /dev/null`:o}let n=Xa([e]);return t?`${n} < /dev/null`:n}
function Zjd(e){return/(?:^|[\s;&|])<(?![<(])\s*\S+/.test(e)}
function via(e){if($Yr(e))return!1;if(Zjd(e))return!1;return!0}
function wia(e){if(e.includes("<")||e.includes("$")||e.includes("`"))return e;return e.replace(e8d,"$1/dev/null")}
var e8d;
var Ria=b(()=>{e8d=/(\d?&?>+[ \t]*)[Nn][Uu][Ll](?=\s|$|[|&;)\n])/g});
export {r0n,UYr,$Yr,Qjd,Cia,Zjd,via,wia,e8d,Ria};
