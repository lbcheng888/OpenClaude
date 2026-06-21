// @ts-nocheck
import {uZe} from "./m2363.ts";
import {F1} from "./m2356.ts";
import {nAe} from "./m2358.ts";
import {UK} from "./m2357.ts";
import {b} from "../runtime.ts";
import {dZe} from "./m2364.ts";
function jHi(e,t){if(t.length===0)return[{text:e,start:0}];let n=[...t].sort((s,i)=>{if(s.start!==i.start)return s.start-i.start;return i.priority-s.priority}),r=[],o=[];for(let s of n){if(s.start===s.end)continue;if(!o.some((a)=>s.start>=a.start&&s.start<a.end||s.end>a.start&&s.end<=a.end||s.start<=a.start&&s.end>=a.end))r.push(s),o.push({start:s.start,end:s.end})}return new WHi(e).segment(r)}
class WHi{text;tokens;visiblePos=0;stringPos=0;tokenIdx=0;charIdx=0;codes=[];constructor(e){this.text=e;this.tokens=uZe(e)}segment(e){let t=[];for(let r of e){let o=this.segmentTo(r.start);if(o)t.push(o);let s=this.segmentTo(r.end);if(s)s.highlight=r,t.push(s)}let n=this.segmentTo(1/0);if(n)t.push(n);return t}segmentTo(e){if(this.tokenIdx>=this.tokens.length||e<=this.visiblePos)return null;let t=this.visiblePos;while(this.tokenIdx<this.tokens.length){let l=this.tokens[this.tokenIdx];if(l.type!=="ansi")break;this.codes.push(l),this.stringPos+=l.code.length,this.tokenIdx++}let n=this.stringPos,r=[...this.codes];while(this.visiblePos<e&&this.tokenIdx<this.tokens.length){let l=this.tokens[this.tokenIdx];if(l.type==="ansi")this.codes.push(l),this.stringPos+=l.code.length,this.tokenIdx++;else{let c=e-this.visiblePos,u=l.value.length-this.charIdx,d=Math.min(c,u);if(this.stringPos+=d,this.visiblePos+=d,this.charIdx+=d,this.charIdx>=l.value.length)this.tokenIdx++,this.charIdx=0}}if(this.stringPos===n)return null;let o=qHi(r),s=qHi(this.codes);this.codes=s;let i=F1(o),a=F1(nAe(s));return{text:i+this.text.substring(n,this.stringPos)+a,start:t}}}
function qHi(e){return UK(e).filter((t)=>t.code!==t.endCode)}
var GHi=b(()=>{dZe()});
export {jHi,WHi,qHi,GHi};
