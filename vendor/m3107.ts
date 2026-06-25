// @ts-nocheck
import {Q} from "../runtime.ts";
import {x9e} from "./m3105.ts";
import {Ana} from "./m3106.ts";
var kna=Q((yZg,yJr)=>{var Rna=x9e(),{checkPath:vna}=Ana(),wna=(e)=>{let t={mode:511};if(typeof e==="number")return e;return{...t,...e}.mode};yJr.exports.makeDir=async(e,t)=>(vna(e),Rna.mkdir(e,{mode:wna(t),recursive:!0}));yJr.exports.makeDirSync=(e,t)=>(vna(e),Rna.mkdirSync(e,{mode:wna(t),recursive:!0}))});
export {kna};
