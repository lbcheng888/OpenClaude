// @ts-nocheck
import {getDynamicConfig_BLOCKS_ON_INIT,zn} from "../src/api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function oQn(e,t){let[n,r]=rQn.useState(t);return rQn.useEffect(()=>{getDynamicConfig_BLOCKS_ON_INIT(e,t).then(r)},[e,t]),n}
var rQn;
var gZl=b(()=>{zn();rQn=M(Te(),1)});
export {oQn,rQn,gZl};
