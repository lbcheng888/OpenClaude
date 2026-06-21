// @ts-nocheck
import {k4e,H4e} from "../src/telemetry/4366_hasAttempted.ts";
import {xE,lo} from "../src/tools/5190_userPromptCount.ts";
import {b} from "../runtime.ts";
function uyp(e,t,n){let r=t.compactMetadata.preservedMessages;if(!r)return null;let o=(r.allUuids??r.uuids).map((s)=>e.find((i)=>i.uuid===s)??n?.find((i)=>i.uuid===s)).filter((s)=>s!==void 0).map(k4e);return o.length>0?{preserved:o,anchorUuid:r.anchorUuid}:null}
function cce(e,t,n,r){if(xE(t)){let o=uyp(e,t,r);if(o===null)return null;let s=new Set(o.preserved.map((a)=>a.uuid)),i=e.filter((a)=>!s.has(a.uuid));if(e.length=0,e.push(...i),o.anchorUuid===t.uuid)return e.push(...o.preserved),null;return o}if(n?.anchorUuid===t.uuid)return e.push(...n.preserved),null;return n}
var S2t=b(()=>{lo();H4e()});
export {uyp,cce,S2t};
