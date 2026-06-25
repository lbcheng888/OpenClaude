// @ts-nocheck
import {getMarketingNameForModel,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {Lon,Pa} from "./m720.ts";
import {b} from "../runtime.ts";
function sqt(e,t,n){let r=(o)=>getMarketingNameForModel(o)??o;if(t!=null)return`${n?.compact||e==null?"":`${r(e)} `}${Lon} ${r(t)}`;return e!=null?r(e):""}
var cgo=b(()=>{Pa();Ro()});
export {sqt,cgo};
