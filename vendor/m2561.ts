// @ts-nocheck
import {OEn,y3r} from "./m2560.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function PIi({visibleOptionCount:e=5,options:t,defaultValue:n,onChange:r,onCancel:o,onFocus:s,focusValue:i}){let[a,l]=LEn.useState(n),c=OEn({visibleOptionCount:e,options:t,initialFocusValue:void 0,onFocus:s,focusValue:i}),u=LEn.useCallback(()=>{l(c.focusedValue)},[c.focusedValue]);return{...c,value:a,selectFocusedOption:u,onChange:r,onCancel:o}}
var LEn;
var OIi=b(()=>{y3r();LEn=M(Te(),1)});
export {PIi,LEn,OIi};
