// @ts-nocheck
import {X} from "../runtime.ts";
var HQo=X((Myf,ffr)=>{var mfr=/([()\][%!^"`<>&|;, *?])/g;function Yzc(e){return e=e.replace(mfr,"^$1"),e}function Jzc(e,t){if(e=`${e}`,e=e.replace(/(?=(\\+?)?)\1"/g,"$1$1\\\""),e=e.replace(/(?=(\\+?)?)\1$/,"$1$1"),e=`"${e}"`,e=e.replace(mfr,"^$1"),t)e=e.replace(mfr,"^$1");return e}ffr.exports.command=Yzc;ffr.exports.argument=Jzc});
export {HQo};
