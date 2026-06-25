// @ts-nocheck
import {Q} from "../runtime.ts";
import {BCt} from "./m370.ts";
var WCt=Q((Nfr)=>{Object.defineProperty(Nfr,"__esModule",{value:!0});var Mfr=BCt();class Tzo extends Error{constructor(e,t,n,r){super(r||`can't resolve reference ${n} from id ${t}`);this.missingRef=(0,Mfr.resolveUrl)(e,t,n),this.missingSchema=(0,Mfr.normalizeId)((0,Mfr.getFullPath)(e,this.missingRef))}}Nfr.default=Tzo});
export {WCt};
