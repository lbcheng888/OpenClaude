// @ts-nocheck
import {getDynamicConfig_BLOCKS_ON_INIT,jn} from "../src/api/2204_stopPeriodicGrowthBookRefresh.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function wzt(e,t){let[n,r]=inr.useState(t);return inr.useEffect(()=>{getDynamicConfig_BLOCKS_ON_INIT(e,t).then(r)},[e,t]),n}
var inr;
var slc=b(()=>{jn();inr=x(et(),1)});
export {wzt,inr,slc};
