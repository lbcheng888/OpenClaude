// @ts-nocheck
import {je} from "./m577.ts";
import {formatTokens,ps} from "./m238.ts";
import {ns} from "../src/mcp/2194_mcpServerName.ts";
import {Js} from "../src/config/2697_oA.ts";
import {Ws,ef} from "./m2248.ts";
import {$c,Vw} from "./m2695.ts";
import {nb,ree} from "../src/config/2668_ree.ts";
import {Id,mc} from "../src/config/0645_maxBytes.ts";
import {b} from "../runtime.ts";
import {Lr} from "./m578.ts";
function Tll(e){let t=[];return OGp(e,t),LGp(e,t),NGp(e,t),BGp(e,t),FGp(e,t),t.sort((n,r)=>{if(n.severity!==r.severity)return n.severity==="warning"?-1:1;return(r.savingsTokens??0)-(n.savingsTokens??0)}),t}
function OGp(e,t){if(e.percentage>=yll)t.push({severity:"warning",title:`Context is ${e.percentage}% full`,detail:e.isAutoCompactEnabled?"Autocompact will trigger soon, which discards older messages. Use /compact now to control what gets kept.":je.DISABLE_COMPACT?"Compaction is disabled.":"Autocompact is disabled. Use /compact to free space, or enable autocompact in /config."})}
function LGp(e,t){if(!e.messageBreakdown)return;for(let n of e.messageBreakdown.toolCallsByType){let r=n.callTokens+n.resultTokens,o=r/e.rawMaxTokens*100;if(o<_ll||r<dTo)continue;let s=MGp(n.name,r,o);if(s)t.push(s)}}
function MGp(e,t,n){let r=formatTokens(t);switch(e){case ns:case Js:return{severity:"warning",title:`${e} results using ${r} tokens (${n.toFixed(0)}%)`,detail:e===Js?"Pipe output through Select-Object -First/-Last or Select-String to reduce result size. Avoid Get-Content on large files \u2014 use Read with offset/limit instead.":"Pipe output through head, tail, or grep to reduce result size. Avoid cat on large files \u2014 use Read with offset/limit instead.",savingsTokens:Math.floor(t*0.5)};case Ws:return{severity:"info",title:`Read results using ${r} tokens (${n.toFixed(0)}%)`,detail:"Use offset and limit parameters to read only the sections you need. Avoid re-reading entire files when you only need a few lines.",savingsTokens:Math.floor(t*0.3)};case $c:return{severity:"info",title:`Grep results using ${r} tokens (${n.toFixed(0)}%)`,detail:"Add more specific patterns or use the glob or type parameter to narrow file types. Consider Glob for file discovery instead of Grep.",savingsTokens:Math.floor(t*0.3)};case nb:return{severity:"info",title:`WebFetch results using ${r} tokens (${n.toFixed(0)}%)`,detail:"Web page content can be very large. Consider extracting only the specific information needed.",savingsTokens:Math.floor(t*0.4)};default:if(n>=20)return{severity:"info",title:`${e} using ${r} tokens (${n.toFixed(0)}%)`,detail:"This tool is consuming a significant portion of context.",savingsTokens:Math.floor(t*0.2)};return null}}
function NGp(e,t){if(!e.messageBreakdown)return;let r=e.messageBreakdown.toolCallsByType.find((a)=>a.name===Ws);if(!r)return;let o=r.callTokens+r.resultTokens,s=o/e.rawMaxTokens*100,i=r.resultTokens/e.rawMaxTokens*100;if(s>=_ll&&o>=dTo)return;if(i>=IGp&&r.resultTokens>=dTo)t.push({severity:"info",title:`File reads using ${formatTokens(r.resultTokens)} tokens (${i.toFixed(0)}%)`,detail:"If you are re-reading files, consider referencing earlier reads. Use offset/limit for large files.",savingsTokens:Math.floor(r.resultTokens*0.3)})}
function BGp(e,t){let n=e.memoryFiles.reduce((o,s)=>o+s.tokens,0),r=n/e.rawMaxTokens*100;if(r>=DGp&&n>=PGp){let o=[...e.memoryFiles].sort((s,i)=>i.tokens-s.tokens).slice(0,3).map((s)=>`${Id(s.path)} (${formatTokens(s.tokens)})`).join(", ");t.push({severity:"info",title:`Memory files using ${formatTokens(n)} tokens (${r.toFixed(0)}%)`,detail:`Largest: ${o}. Use /memory to review and prune stale entries.`,savingsTokens:Math.floor(n*0.3)})}}
function FGp(e,t){if(!e.isAutoCompactEnabled&&!je.DISABLE_COMPACT&&e.percentage>=50&&e.percentage<yll)t.push({severity:"info",title:"Autocompact is disabled",detail:"Without autocompact, you will hit context limits and lose the conversation. Enable it in /config or use /compact manually."})}
var _ll=15,dTo=1e4,IGp=5,yll=80,DGp=5,PGp=5000;
var Sll=b(()=>{ef();Vw();ree();Lr();mc();ps()});
export {Tll,OGp,LGp,MGp,NGp,BGp,FGp,_ll,dTo,IGp,yll,DGp,PGp,Sll};
