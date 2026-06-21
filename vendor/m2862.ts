// @ts-nocheck
import {X} from "../runtime.ts";
var dqi=X((t$h,uqi)=>{function QId(e){let t=e.COMMENT(/\(\*/,/\*\)/),n={className:"attribute",begin:/^[ ]*[a-zA-Z]+([\s_-]+[a-zA-Z]+)*/},o={begin:/=/,end:/[.;]/,contains:[t,{className:"meta",begin:/\?.*\?/},{className:"string",variants:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,{begin:"`",end:"`"}]}]};return{name:"Extended Backus-Naur Form",illegal:/\S/,contains:[t,n,o]}}uqi.exports=QId});
export {dqi};
