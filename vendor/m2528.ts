// @ts-nocheck
import {nUe,E5} from "../src/config/2288_level.ts";
import {_t,cu} from "./m582.ts";
import {b} from "../runtime.ts";
function OHi({placeholder:e,value:t,showCursor:n,focus:r,terminalFocus:o=!0,invert:s=nUe,hidePlaceholderText:i=!1}){let a=void 0;if(e){if(i)a=n&&r&&o?s(" "):"";else if(a=_t.dim(e),n&&r&&o)a=e.length>0?s(e[0])+_t.dim(e.slice(1)):s(" ")}let l=t.length===0&&Boolean(e);return{renderedPlaceholder:a,showPlaceholder:l}}
var LHi=b(()=>{cu();E5()});
export {OHi,LHi};
