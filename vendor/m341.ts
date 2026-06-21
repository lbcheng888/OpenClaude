// @ts-nocheck
import {Yd,JI} from "./m347.ts";
import {og} from "./m325.ts";
import {b} from "../runtime.ts";
function sjo(e,t){let r={type:"array",uniqueItems:!0,items:Yd(e.valueType._def,{...t,currentPath:[...t.currentPath,"items"]})};if(e.minSize)og(r,"minItems",e.minSize.value,e.minSize.message,t);if(e.maxSize)og(r,"maxItems",e.maxSize.value,e.maxSize.message,t);return r}
var Ecr=b(()=>{JI()});
export {sjo,Ecr};
