// @ts-nocheck
import {Q} from "../runtime.ts";
import {AC} from "./m3074.ts";
import {H9e} from "./m3075.ts";
var gHe=Q((WQg,Lea)=>{var W6d=AC().fromPromise,Oea=H9e();function G6d(e){return Oea.access(e).then(()=>!0).catch(()=>!1)}Lea.exports={pathExists:W6d(G6d),pathExistsSync:Oea.existsSync}});
export {gHe};
