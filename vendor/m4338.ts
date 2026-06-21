// @ts-nocheck
import {xK,GO} from "../src/telemetry/2241_GO.ts";
import {zc,ex} from "./m2582.ts";
import {Ua,ty} from "./m2245.ts";
import {b} from "../runtime.ts";
function BYa(e){let t=e;if(!t)return!1;if(t.path&&xK(t.path))return!0;return!1}
function FYa(e,t){if(e!==zc&&e!==Ua)return!1;let n=t,r=n?.file_path??n?.path;return r!==void 0&&xK(r)}
function UYa(e,t,n){let r=e.teamMemoryReadCount??0,o=e.teamMemorySearchCount??0,s=e.teamMemoryWriteCount??0;if(r>0){let i=t?n.length===0?"Recalling":"recalling":n.length===0?"Recalled":"recalled";n.push(`${i} ${r} team ${r===1?"memory":"memories"}`)}if(o>0){let i=t?n.length===0?"Searching":"searching":n.length===0?"Searched":"searched";n.push(`${i} team memories`)}if(s>0){let i=t?n.length===0?"Writing":"writing":n.length===0?"Wrote":"wrote";n.push(`${i} ${s} team ${s===1?"memory":"memories"}`)}}
var $Ya=b(()=>{GO();ty();ex()});
export {BYa,FYa,UYa,$Ya};
