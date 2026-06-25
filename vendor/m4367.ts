// @ts-nocheck
import {formatFileSize,Xo} from "./m240.ts";
import {b} from "../runtime.ts";
function S8n(e){let t=[{frac:e.sizeBytes/e.byteCap,over:e.sizeBytes>=e.byteCap,sizeDesc:formatFileSize(e.sizeBytes),capDesc:formatFileSize(e.byteCap),targetDesc:formatFileSize(Math.floor(e.byteCap*Wnl))}];if(e.lineCap!==void 0&&e.lineCount!==void 0)t.push({frac:e.lineCount/e.lineCap,over:e.lineCount>=e.lineCap,sizeDesc:`${e.lineCount} lines`,capDesc:`${e.lineCap}-line`,targetDesc:`${Math.floor(e.lineCap*Wnl)} lines`});let n=t.reduce((o,s)=>s.frac>o.frac?s:o);if(n.frac<A5p)return null;let r=n.over?`over the ${n.capDesc} read limit \u2014 content beyond that is dropped when this index is loaded`:`approaching the ${n.capDesc} read limit`;return`The ${e.label} at ${e.displayPath} is ${n.sizeDesc}, ${r}. Compact it to under ${n.targetDesc} now: keep one line per entry, move detail into topic files, and merge or drop stale entries.`}
var A5p=0.8,Wnl=0.7;
var KTo=b(()=>{Xo()});
export {S8n,A5p,Wnl,KTo};
