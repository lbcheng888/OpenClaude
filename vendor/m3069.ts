// @ts-nocheck
import {X} from "../runtime.ts";
import {EC} from "./m3064.ts";
import {w$e} from "./m3065.ts";
var xxe=X((ejh,qKi)=>{var lNd=EC().fromPromise,$Ki=w$e();function cNd(e){return $Ki.access(e).then(()=>!0).catch(()=>!1)}qKi.exports={pathExists:lNd(cNd),pathExistsSync:$Ki.existsSync}});
export {xxe};
