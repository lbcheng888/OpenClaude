// @ts-nocheck
import {Sbe,PTt} from "./m7.ts";
import {b} from "../runtime.ts";
function qbc(e,t){var n=this.__data__,r=Sbe(n,e);if(r<0)++this.size,n.push([e,t]);else n[r][1]=t;return this}
var y3o;
var T3o=b(()=>{PTt();y3o=qbc});
export {qbc,y3o,T3o};
