// @ts-nocheck
import {b} from "../runtime.ts";
var rBd=(e)=>({name:"Cedar",aliases:["cedarpolicy"],keywords:{keyword:"permit forbid when unless if then else in has like is",built_in:"principal action resource context decimal ip contains containsAll containsAny",literal:"true false"},contains:[e.QUOTE_STRING_MODE,e.C_NUMBER_MODE,e.C_LINE_COMMENT_MODE,{className:"meta",begin:/@\w+/},{className:"type",begin:/\b[A-Z]\w*(::[A-Z]\w*)*/}]}),tGi;
var nGi=b(()=>{tGi=rBd});
export {rBd,tGi,nGi};
