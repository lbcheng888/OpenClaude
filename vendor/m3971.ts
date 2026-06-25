// @ts-nocheck
import {d6e,p6e} from "../src/telemetry/4388_hasAttempted.ts";
import {NE,po} from "../src/tools/5224_userPromptCount.ts";
import {b} from "../runtime.ts";
function mIp(e,t,n){let r=t.compactMetadata.preservedMessages;if(!r)return null;let o=(r.allUuids??r.uuids).map((s)=>e.find((i)=>i.uuid===s)??n?.find((i)=>i.uuid===s)).filter((s)=>s!==void 0).map(d6e);return o.length>0?{preserved:o,anchorUuid:r.anchorUuid}:null}
function cce(e,t,n,r){if(NE(t)){let o=mIp(e,t,r);if(o===null)return null;let s=new Set(o.preserved.map((a)=>a.uuid)),i=e.filter((a)=>!s.has(a.uuid));if(e.length=0,e.push(...i),o.anchorUuid===t.uuid)return e.push(...o.preserved),null;return o}if(n?.anchorUuid===t.uuid)return e.push(...n.preserved),null;return n}
var E3t=b(()=>{po();p6e()});
export {mIp,cce,E3t};
