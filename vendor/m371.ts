// @ts-nocheck
import {X} from "../runtime.ts";
import {mSt} from "./m368.ts";
var gSt=X((uur)=>{Object.defineProperty(uur,"__esModule",{value:!0});var cur=mSt();class C8o extends Error{constructor(e,t,n,r){super(r||`can't resolve reference ${n} from id ${t}`);this.missingRef=(0,cur.resolveUrl)(e,t,n),this.missingSchema=(0,cur.normalizeId)((0,cur.getFullPath)(e,this.missingRef))}}uur.default=C8o});
export {gSt};
