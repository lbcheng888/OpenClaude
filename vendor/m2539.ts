// @ts-nocheck
import {ZUe,N8} from "../src/config/2299_level.ts";
import {bt,Gc} from "./m588.ts";
import {b} from "../runtime.ts";
function tMi({placeholder:e,value:t,showCursor:n,focus:r,terminalFocus:o=!0,invert:s=ZUe,hidePlaceholderText:i=!1}){let a=void 0;if(e){if(i)a=n&&r&&o?s(" "):"";else if(a=bt.dim(e),n&&r&&o)a=e.length>0?s(e[0])+bt.dim(e.slice(1)):s(" ")}let l=t.length===0&&Boolean(e);return{renderedPlaceholder:a,showPlaceholder:l}}
var nMi=b(()=>{Gc();N8()});
export {tMi,nMi};
