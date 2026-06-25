// @ts-nocheck
import {Ne} from "./m583.ts";
import {formatTokens,Xo} from "./m240.ts";
import {Mo} from "../src/mcp/2200_mcpServerName.ts";
import {ws} from "../src/config/2709_Zm.ts";
import {vs,dm} from "./m2256.ts";
import {readRoster,XR} from "./m2707.ts";
import {nb,eee} from "../src/config/2679_eee.ts";
import {dd,Xl} from "../src/config/0651_maxBytes.ts";
import {b} from "../runtime.ts";
import {Ir} from "./m584.ts";
function Xhl(e){let t=[];return FZp(e,t),BZp(e,t),$Zp(e,t),qZp(e,t),WZp(e,t),t.sort((n,r)=>{if(n.severity!==r.severity)return n.severity==="warning"?-1:1;return(r.savingsTokens??0)-(n.savingsTokens??0)}),t}
function FZp(e,t){if(e.percentage>=Jhl)t.push({severity:"warning",title:`Context is ${e.percentage}% full`,detail:e.isAutoCompactEnabled?"Autocompact will trigger soon, which discards older messages. Use /compact now to control what gets kept.":Ne.DISABLE_COMPACT?"Compaction is disabled.":"Autocompact is disabled. Use /compact to free space, or enable autocompact in /config."})}
function BZp(e,t){if(!e.messageBreakdown)return;for(let n of e.messageBreakdown.toolCallsByType){let r=n.callTokens+n.resultTokens,o=r/e.rawMaxTokens*100;if(o<Yhl||r<ARo)continue;let s=UZp(n.name,r,o);if(s)t.push(s)}}
function UZp(e,t,n){let r=formatTokens(t);switch(e){case Mo:case ws:return{severity:"warning",title:`${e} results using ${r} tokens (${n.toFixed(0)}%)`,detail:e===ws?"Pipe output through Select-Object -First/-Last or Select-String to reduce result size. Avoid Get-Content on large files \u2014 use Read with offset/limit instead.":"Pipe output through head, tail, or grep to reduce result size. Avoid cat on large files \u2014 use Read with offset/limit instead.",savingsTokens:Math.floor(t*0.5)};case vs:return{severity:"info",title:`Read results using ${r} tokens (${n.toFixed(0)}%)`,detail:"Use offset and limit parameters to read only the sections you need. Avoid re-reading entire files when you only need a few lines.",savingsTokens:Math.floor(t*0.3)};case readRoster:return{severity:"info",title:`Grep results using ${r} tokens (${n.toFixed(0)}%)`,detail:"Add more specific patterns or use the glob or type parameter to narrow file types. Consider Glob for file discovery instead of Grep.",savingsTokens:Math.floor(t*0.3)};case nb:return{severity:"info",title:`WebFetch results using ${r} tokens (${n.toFixed(0)}%)`,detail:"Web page content can be very large. Consider extracting only the specific information needed.",savingsTokens:Math.floor(t*0.4)};default:if(n>=20)return{severity:"info",title:`${e} using ${r} tokens (${n.toFixed(0)}%)`,detail:"This tool is consuming a significant portion of context.",savingsTokens:Math.floor(t*0.2)};return null}}
function $Zp(e,t){if(!e.messageBreakdown)return;let r=e.messageBreakdown.toolCallsByType.find((a)=>a.name===vs);if(!r)return;let o=r.callTokens+r.resultTokens,s=o/e.rawMaxTokens*100,i=r.resultTokens/e.rawMaxTokens*100;if(s>=Yhl&&o>=ARo)return;if(i>=LZp&&r.resultTokens>=ARo)t.push({severity:"info",title:`File reads using ${formatTokens(r.resultTokens)} tokens (${i.toFixed(0)}%)`,detail:"If you are re-reading files, consider referencing earlier reads. Use offset/limit for large files.",savingsTokens:Math.floor(r.resultTokens*0.3)})}
function qZp(e,t){let n=e.memoryFiles.reduce((o,s)=>o+s.tokens,0),r=n/e.rawMaxTokens*100;if(r>=MZp&&n>=NZp){let o=[...e.memoryFiles].sort((s,i)=>i.tokens-s.tokens).slice(0,3).map((s)=>`${dd(s.path)} (${formatTokens(s.tokens)})`).join(", ");t.push({severity:"info",title:`Memory files using ${formatTokens(n)} tokens (${r.toFixed(0)}%)`,detail:`Largest: ${o}. Use /memory to review and prune stale entries.`,savingsTokens:Math.floor(n*0.3)})}}
function WZp(e,t){if(!e.isAutoCompactEnabled&&!Ne.DISABLE_COMPACT&&e.percentage>=50&&e.percentage<Jhl)t.push({severity:"info",title:"Autocompact is disabled",detail:"Without autocompact, you will hit context limits and lose the conversation. Enable it in /config or use /compact manually."})}
var Yhl=15,ARo=1e4,LZp=5,Jhl=80,MZp=5,NZp=5000;
var Qhl=b(()=>{dm();XR();eee();Ir();Xl();Xo()});
export {Xhl,FZp,BZp,UZp,$Zp,qZp,WZp,Yhl,ARo,LZp,Jhl,MZp,NZp,Qhl};
