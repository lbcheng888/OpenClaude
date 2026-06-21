// @ts-nocheck
import {_Qt,yQt} from "./m332.ts";
import {Yd,JI} from "./m347.ts";
import {fw,QV} from "./m325.ts";
import {b} from "../runtime.ts";
function K6o(e,t){if(t.mapStrategy==="record")return _Qt(e,t);let n=Yd(e.keyType._def,{...t,currentPath:[...t.currentPath,"items","items","0"]})||fw(t),r=Yd(e.valueType._def,{...t,currentPath:[...t.currentPath,"items","items","1"]})||fw(t);return{type:"array",maxItems:125,items:{type:"array",items:[n,r],minItems:2,maxItems:2}}}
var Acr=b(()=>{JI();yQt();QV()});
export {K6o,Acr};
