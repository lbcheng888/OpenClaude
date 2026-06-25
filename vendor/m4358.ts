// @ts-nocheck
import {nz,cO} from "../src/telemetry/2249_cO.ts";
import {Ec,dw} from "./m2593.ts";
import {fa,ry} from "./m2253.ts";
import {b} from "../runtime.ts";
function anl(e){let t=e;if(!t)return!1;if(t.path&&nz(t.path))return!0;return!1}
function lnl(e,t){if(e!==Ec&&e!==fa)return!1;let n=t,r=n?.file_path??n?.path;return r!==void 0&&nz(r)}
function cnl(e,t,n){let r=e.teamMemoryReadCount??0,o=e.teamMemorySearchCount??0,s=e.teamMemoryWriteCount??0;if(r>0){let i=t?n.length===0?"Recalling":"recalling":n.length===0?"Recalled":"recalled";n.push(`${i} ${r} team ${r===1?"memory":"memories"}`)}if(o>0){let i=t?n.length===0?"Searching":"searching":n.length===0?"Searched":"searched";n.push(`${i} team memories`)}if(s>0){let i=t?n.length===0?"Writing":"writing":n.length===0?"Wrote":"wrote";n.push(`${i} ${s} team ${s===1?"memory":"memories"}`)}}
var unl=b(()=>{cO();ry();dw()});
export {anl,lnl,cnl,unl};
