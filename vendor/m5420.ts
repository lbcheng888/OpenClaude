// @ts-nocheck
import {QDo,PYn} from "./m5281.ts";
import {P0,wnt} from "./m2781.ts";
import {Z2e,eWr,tWr,pxe,sA} from "./m2782.ts";
import {b} from "../runtime.ts";
function HWl(e){if(e.skipSlashCommands&&e.origin?.kind==="peer")return!1;if(typeof e.value==="string")return e.value.trim().startsWith("/");for(let t of e.value)if(t.type==="text")return t.text.trim().startsWith("/");return!1}
function IWl({executeInput:e}){let t=QDo(P0);if(!t)return{processed:!1};if(HWl(t)||t.mode==="bash"){let s=[Z2e((i)=>i===t)];return eWr(s),e(s).finally(()=>tWr(s)),{processed:!0}}let n=t.mode,r=pxe((o)=>P0(o)&&!HWl(o)&&o.mode===n);if(r.length===0)return{processed:!1};return eWr(r),e(r).finally(()=>tWr(r)),{processed:!0}}
var DWl=b(()=>{PYn();sA();wnt()});
export {HWl,IWl,DWl};
