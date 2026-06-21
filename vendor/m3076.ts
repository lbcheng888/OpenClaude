// @ts-nocheck
import {X} from "../runtime.ts";
import {mT} from "./m1464.ts";
import {EC} from "./m3064.ts";
import {mzi} from "./m3075.ts";
var WLt=X((ajh,Azi)=>{var ikn=mT(),QNd=EC().fromCallback,fzi=mzi();function ZNd(e,t){if(ikn.rm)return ikn.rm(e,{recursive:!0,force:!0},t);fzi(e,t)}function eBd(e){if(ikn.rmSync)return ikn.rmSync(e,{recursive:!0,force:!0});fzi.sync(e)}Azi.exports={remove:QNd(ZNd),removeSync:eBd}});
export {WLt};
