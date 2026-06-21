// @ts-nocheck
import {X} from "../runtime.ts";
import {w$e} from "./m3065.ts";
import {LKi} from "./m3066.ts";
var FKi=X((Q6h,EVr)=>{var MKi=w$e(),{checkPath:NKi}=LKi(),BKi=(e)=>{let t={mode:511};if(typeof e==="number")return e;return{...t,...e}.mode};EVr.exports.makeDir=async(e,t)=>(NKi(e),MKi.mkdir(e,{mode:BKi(t),recursive:!0}));EVr.exports.makeDirSync=(e,t)=>(NKi(e),MKi.mkdirSync(e,{mode:BKi(t),recursive:!0}))});
export {FKi};
