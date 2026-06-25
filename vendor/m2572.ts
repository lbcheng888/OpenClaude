// @ts-nocheck
import {Cvn,j5r} from "./m2571.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function i1i({visibleOptionCount:e=5,options:t,defaultValue:n,onChange:r,onCancel:o,onFocus:s,focusValue:i}){let[a,l]=Avn.useState(n),c=Cvn({visibleOptionCount:e,options:t,initialFocusValue:void 0,onFocus:s,focusValue:i}),u=Avn.useCallback(()=>{l(c.focusedValue)},[c.focusedValue]);return{...c,value:a,selectFocusedOption:u,onChange:r,onCancel:o}}
var Avn;
var a1i=b(()=>{j5r();Avn=x(et(),1)});
export {i1i,Avn,a1i};
