// @ts-nocheck
import {Q} from "../runtime.ts";
import {AC} from "./m3074.ts";
import {x9e} from "./m3105.ts";
var bHe=Q((SZg,xna)=>{var q8d=AC().fromPromise,Ina=x9e();function W8d(e){return Ina.access(e).then(()=>!0).catch(()=>!1)}xna.exports={pathExists:q8d(W8d),pathExistsSync:Ina.existsSync}});
export {bHe};
