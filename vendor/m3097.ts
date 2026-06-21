// @ts-nocheck
import {X} from "../runtime.ts";
import {x$e} from "./m3095.ts";
import {IYi} from "./m3096.ts";
var LYi=X((kjh,NVr)=>{var DYi=x$e(),{checkPath:PYi}=IYi(),OYi=(e)=>{let t={mode:511};if(typeof e==="number")return e;return{...t,...e}.mode};NVr.exports.makeDir=async(e,t)=>(PYi(e),DYi.mkdir(e,{mode:OYi(t),recursive:!0}));NVr.exports.makeDirSync=(e,t)=>(PYi(e),DYi.mkdirSync(e,{mode:OYi(t),recursive:!0}))});
export {LYi};
