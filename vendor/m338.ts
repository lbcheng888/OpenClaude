// @ts-nocheck
import {Yd,JI} from "./m347.ts";
import {fw,QV} from "./m325.ts";
import {b} from "../runtime.ts";
var njo=(e,t)=>{if(t.currentPath.toString()===t.propertyPath?.toString())return Yd(e.innerType._def,t);let n=Yd(e.innerType._def,{...t,currentPath:[...t.currentPath,"anyOf","1"]});return n?{anyOf:[{not:fw(t)},n]}:fw(t)};
var Tcr=b(()=>{JI();QV()});
export {njo,Tcr};
