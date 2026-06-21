// @ts-nocheck
import {$Te,agt} from "./m30.ts";
import {b} from "../runtime.ts";
function Hpc(e,t){var n=this.__data__,r=$Te(n,e);if(r<0)++this.size,n.push([e,t]);else n[r][1]=t;return this}
var nFo;
var rFo=b(()=>{agt();nFo=Hpc});
export {Hpc,nFo,rFo};
