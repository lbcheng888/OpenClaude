// @ts-nocheck
import {Ma} from "./m2519.ts";
import {b} from "../runtime.ts";
function zPn(e,t){let n=e.lastIndexOf(" -");if(n>0){let r=e.substring(0,n),o=e.substring(n+1);return`${Ma([r])} ${o} ${Ma([t])}`}else return`${Ma([e])} ${Ma([t])}`}
var Ceo=()=>{};
function Aeo(e){if(/\d\s*<<\s*\d/.test(e)||/\[\[\s*\d+\s*<<\s*\d+\s*\]\]/.test(e)||/\$\(\(.*<<.*\)\)/.test(e))return!1;return/<<-?\s*(?:(['"]?)(\w+)\1|\\(\w+))/.test(e)}
function BXd(e){let t=/'(?:[^'\\]|\\.)*\n(?:[^'\\]|\\.)*'/,n=/"(?:[^"\\]|\\.)*\n(?:[^"\\]|\\.)*"/;return t.test(e)||n.test(e)}
function Ima(e,t=!0){if(Aeo(e)||BXd(e)){let o=`'${e.replaceAll("'",`'"'"'`)}'`;if(Aeo(e))return o;return t?`${o} < /dev/null`:o}let n=Ma([e]);return t?`${n} < /dev/null`:n}
function UXd(e){return/(?:^|[\s;&|])<(?![<(])\s*\S+/.test(e)}
function xma(e){if(Aeo(e))return!1;if(UXd(e))return!1;return!0}
function Dma(e){if(e.includes("<")||e.includes("$")||e.includes("`"))return e;return e.replace($Xd,"$1/dev/null")}
var $Xd;
var Pma=b(()=>{$Xd=/(\d?&?>+[ \t]*)[Nn][Uu][Ll](?=\s|$|[|&;)\n])/g});
export {zPn,Ceo,Aeo,BXd,Ima,UXd,xma,Dma,$Xd,Pma};
