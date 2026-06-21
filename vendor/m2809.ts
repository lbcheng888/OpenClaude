// @ts-nocheck
import {b} from "../runtime.ts";
var gHd=(e)=>({name:"Cedar",aliases:["cedarpolicy"],keywords:{keyword:"permit forbid when unless if then else in has like is",built_in:"principal action resource context decimal ip contains containsAll containsAny",literal:"true false"},contains:[e.QUOTE_STRING_MODE,e.C_NUMBER_MODE,e.C_LINE_COMMENT_MODE,{className:"meta",begin:/@\w+/},{className:"type",begin:/\b[A-Z]\w*(::[A-Z]\w*)*/}]}),a3i;
var l3i=b(()=>{a3i=gHd});
export {gHd,a3i,l3i};
