// @ts-nocheck
import {Ad,h0} from "./m349.ts";
import {lg} from "./m327.ts";
import {b} from "../runtime.ts";
function e7o(e,t){let r={type:"array",uniqueItems:!0,items:Ad(e.valueType._def,{...t,currentPath:[...t.currentPath,"items"]})};if(e.minSize)lg(r,"minItems",e.minSize.value,e.minSize.message,t);if(e.maxSize)lg(r,"maxItems",e.maxSize.value,e.maxSize.message,t);return r}
var Jmr=b(()=>{h0()});
export {e7o,Jmr};
