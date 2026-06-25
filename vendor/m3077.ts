// @ts-nocheck
import {Q} from "../runtime.ts";
import {H9e} from "./m3075.ts";
import {kea} from "./m3076.ts";
var Dea=Q(($Qg,oJr)=>{var Hea=H9e(),{checkPath:Iea}=kea(),xea=(e)=>{let t={mode:511};if(typeof e==="number")return e;return{...t,...e}.mode};oJr.exports.makeDir=async(e,t)=>(Iea(e),Hea.mkdir(e,{mode:xea(t),recursive:!0}));oJr.exports.makeDirSync=(e,t)=>(Iea(e),Hea.mkdirSync(e,{mode:xea(t),recursive:!0}))});
export {Dea};
