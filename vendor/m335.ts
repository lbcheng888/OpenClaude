// @ts-nocheck
import {Xen,Qen} from "./m334.ts";
import {Ad,h0} from "./m349.ts";
import {bR,CK} from "./m327.ts";
import {b} from "../runtime.ts";
function qKo(e,t){if(t.mapStrategy==="record")return Xen(e,t);let n=Ad(e.keyType._def,{...t,currentPath:[...t.currentPath,"items","items","0"]})||bR(t),r=Ad(e.valueType._def,{...t,currentPath:[...t.currentPath,"items","items","1"]})||bR(t);return{type:"array",maxItems:125,items:{type:"array",items:[n,r],minItems:2,maxItems:2}}}
var qmr=b(()=>{h0();Qen();CK()});
export {qKo,qmr};
