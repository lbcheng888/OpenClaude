// @ts-nocheck
import {Ad,h0} from "./m349.ts";
import {bR,CK} from "./m327.ts";
import {b} from "../runtime.ts";
var XKo=(e,t)=>{if(t.currentPath.toString()===t.propertyPath?.toString())return Ad(e.innerType._def,t);let n=Ad(e.innerType._def,{...t,currentPath:[...t.currentPath,"anyOf","1"]});return n?{anyOf:[{not:bR(t)},n]}:bR(t)};
var zmr=b(()=>{h0();CK()});
export {XKo,zmr};
