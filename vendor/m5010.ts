// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {performHeapDump,D0o} from "../src/session/5010_performHeapDump.ts";
var ILl={};
ft(ILl,{call:()=>M_m});
async function M_m(){let e=await performHeapDump();if(!e.success)return{type:"text",value:`Failed to create heap dump: ${e.error}`};let t=[e.heapPath,e.diagPath,"",N_m(e.diagnostics)];return t.push("","Open the .heapsnapshot in Chrome DevTools \u2192 Memory \u2192 Load to inspect retainers."),{type:"text",value:t.join(`
`)}}
function N_m(e){let{memoryUsage:t,resourceUsage:n,analysis:r}=e,o=t.external-t.arrayBuffers,s=Math.max(0,t.rss-t.heapTotal-t.external),i=t.heapTotal>t.external+s?"\u2014 most memory is JS heap (inspect the .heapsnapshot)":"\u2014 most memory is native (NOT in the .heapsnapshot)",a=r.potentialLeaks.length?r.potentialLeaks.map((l)=>`  \u26A0 ${l}`).join(`
`):"  (no obvious leak indicators)";return[`RSS ${Ogt(t.rss)} (peak ${Ogt(n.maxRSS)}) ${i}`,`  JS heap        ${Ogt(t.heapTotal).padStart(8)}  in snapshot`,`  array buffers  ${Ogt(t.arrayBuffers).padStart(8)}  not in snapshot`,`  other external ${Ogt(o).padStart(8)}  not in snapshot`,`  unaccounted    ${Ogt(s).padStart(8)}  not in snapshot (code/JIT/stacks/allocator)`,a].join(`
`)}
function Ogt(e){return`${(e/1073741824).toFixed(2)} GB`}
var xLl=b(()=>{D0o()});
export {ILl,M_m,N_m,Ogt,xLl};
