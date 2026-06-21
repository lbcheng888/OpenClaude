// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {performHeapDump,ywo} from "../src/session/4980_performHeapDump.ts";
var uxl={};
isFullscreenWithTTY(uxl,{call:()=>Clm});
async function Clm(){let e=await performHeapDump();if(!e.success)return{type:"text",value:`Failed to create heap dump: ${e.error}`};let t=[e.heapPath,e.diagPath,"",vlm(e.diagnostics)];return t.push("","Open the .heapsnapshot in Chrome DevTools \u2192 Memory \u2192 Load to inspect retainers."),{type:"text",value:t.join(`
`)}}
function vlm(e){let{memoryUsage:t,resourceUsage:n,analysis:r}=e,o=t.external-t.arrayBuffers,s=Math.max(0,t.rss-t.heapTotal-t.external),i=t.heapTotal>t.external+s?"\u2014 most memory is JS heap (inspect the .heapsnapshot)":"\u2014 most memory is native (NOT in the .heapsnapshot)",a=r.potentialLeaks.length?r.potentialLeaks.map((l)=>`  \u26A0 ${l}`).join(`
`):"  (no obvious leak indicators)";return[`RSS ${yft(t.rss)} (peak ${yft(n.maxRSS)}) ${i}`,`  JS heap        ${yft(t.heapTotal).padStart(8)}  in snapshot`,`  array buffers  ${yft(t.arrayBuffers).padStart(8)}  not in snapshot`,`  other external ${yft(o).padStart(8)}  not in snapshot`,`  unaccounted    ${yft(s).padStart(8)}  not in snapshot (code/JIT/stacks/allocator)`,a].join(`
`)}
function yft(e){return`${(e/1073741824).toFixed(2)} GB`}
var dxl=b(()=>{ywo()});
export {uxl,Clm,vlm,yft,dxl};
