// @ts-nocheck
import {RNo,BZn} from "./m5318.ts";
import {wI,xot} from "./m2793.ts";
import {a9e,Ozr,Lzr,Qke,ef} from "./m2794.ts";
import {b} from "../runtime.ts";
function mQl(e){if(e.skipSlashCommands&&e.origin?.kind==="peer")return!1;if(typeof e.value==="string")return e.value.trim().startsWith("/");for(let t of e.value)if(t.type==="text")return t.text.trim().startsWith("/");return!1}
function fQl({executeInput:e}){let t=RNo(wI);if(!t)return{processed:!1};if(mQl(t)||t.mode==="bash"){let s=[a9e((i)=>i===t)];return Ozr(s),e(s).finally(()=>Lzr(s)),{processed:!0}}let n=t.mode,r=Qke((o)=>wI(o)&&!mQl(o)&&o.mode===n);if(r.length===0)return{processed:!1};return Ozr(r),e(r).finally(()=>Lzr(r)),{processed:!0}}
var hQl=b(()=>{BZn();ef();xot()});
export {mQl,fQl,hQl};
