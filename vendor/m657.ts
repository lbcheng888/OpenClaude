// @ts-nocheck
import {Q} from "../runtime.ts";
var wos=Q((rxf,Wyr)=>{var qyr=/([()\][%!^"`<>&|;, *?])/g;function psu(e){return e=e.replace(qyr,"^$1"),e}function msu(e,t){if(e=`${e}`,e=e.replace(/(?=(\\+?)?)\1"/g,"$1$1\\\""),e=e.replace(/(?=(\\+?)?)\1$/,"$1$1"),e=`"${e}"`,e=e.replace(qyr,"^$1"),t)e=e.replace(qyr,"^$1");return e}Wyr.exports.command=psu;Wyr.exports.argument=msu});
export {wos};
