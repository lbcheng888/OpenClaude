// @ts-nocheck
import {VVe,oen} from "./m525.ts";
import {SR,soe} from "./m527.ts";
import {er,ZE} from "./m460.ts";
import {b} from "../runtime.ts";
function obt(e,t){let n=this||VVe,r=t||n,o=SR.from(r.headers),s=r.data;return er.forEach(e,function(a){s=a.call(n,s,o.normalize(),t?t.status:void 0)}),o.normalize(),s}
var hKo=b(()=>{ZE();oen();soe()});
export {obt,hKo};
