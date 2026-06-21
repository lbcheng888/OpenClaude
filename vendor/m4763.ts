// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {cE} from "./m2206.ts";
import {bEo,Ljt,$Wn,Egl,Vje} from "./m4762.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {pr,Yl} from "./m2562.ts";
import {Kn,Li} from "./m2572.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var Dgl={};
isFullscreenWithTTY(Dgl,{formatVersion:()=>formatVersion,formatAll:()=>formatAll,call:()=>OZp,ReleaseNotesPicker:()=>ReleaseNotesPicker});
function formatVersion(e,t){let n=`Version ${e}:`,r=t.map((o)=>`\xB7 ${o}`).join(`
`);return`${n}
${r}`}
function formatAll(e){return e.slice().sort(([t],[n])=>cE(t,n)?1:-1).map(([t,n])=>formatVersion(t,n)).join(`

`)}
async function OZp(e){try{let r=new Promise((o,s)=>setTimeout((i)=>i(Error("Timeout")),500,s));await Promise.race([bEo(),r])}catch{}let t=await Ljt(),n=$Wn(t).slice().sort(([r],[o])=>cE(r,o)?-1:1);if(n.length===0)return e(`See the full changelog at: ${Egl}`,{display:"system"}),null;return Nmt.default.createElement(ReleaseNotesPicker,{notes:n,onDone:e})}
function ReleaseNotesPicker(e){let t=kgl.c(20),{notes:n,onDone:r}=e,o=`${n.length} versions`,s;if(t[0]!==o)s={label:"Show all",description:o,value:xgl},t[0]=o,t[1]=s;else s=t[1];let i;if(t[2]!==n||t[3]!==s)i=[s,...n.map(LZp)],t[2]=n,t[3]=s,t[4]=i;else i=t[4];let a=i,l;if(t[5]!==n||t[6]!==r)l=function(h){if(h===xgl){r(formatAll(n),{display:"system"});return}let g=n.find((_)=>{let[y]=_;return y===h});if(!g){r(void 0,{display:"skip"});return}r(formatVersion(g[0],g[1]),{display:"system"})},t[5]=n,t[6]=r,t[7]=l;else l=t[7];let c=l,u;if(t[8]!==r)u=()=>r(void 0,{display:"skip"}),t[8]=r,t[9]=u;else u=t[9];let d;if(t[10]===Symbol.for("react.memo_cache_sentinel"))d=Nmt.default.createElement(Box,{flexDirection:"column",marginBottom:1},Nmt.default.createElement(Text,{dimColor:!0},"Select a version to view its notes.")),t[10]=d;else d=t[10];let p;if(t[11]!==r)p=()=>r(void 0,{display:"skip"}),t[11]=r,t[12]=p;else p=t[12];let m;if(t[13]!==c||t[14]!==a||t[15]!==p)m=Nmt.default.createElement(pr,{options:a,visibleOptionCount:10,onChange:c,onCancel:p}),t[13]=c,t[14]=a,t[15]=p,t[16]=m;else m=t[16];let f;if(t[17]!==u||t[18]!==m)f=Nmt.default.createElement(Kn,{title:"Release notes",onCancel:u},d,m),t[17]=u,t[18]=m,t[19]=f;else f=t[19];return f}
function LZp(e){let[t,n]=e;return{label:`Version ${t}`,description:`${n.length} ${n.length===1?"item":"items"}`,value:t}}
var kgl,Nmt,xgl="__show_all__";
var Pgl=b(()=>{Yl();Li();ze();Vje();kgl=M(rt(),1),Nmt=M(Te(),1)});
export {Dgl,formatVersion,formatAll,OZp,ReleaseNotesPicker,LZp,kgl,Nmt,xgl,Pgl};
