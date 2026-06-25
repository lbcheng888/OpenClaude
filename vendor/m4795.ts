// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {fE} from "./m2214.ts";
import {Uko,ZWt,wzn,SRl,CWe} from "./m4794.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {hr,Ol} from "./m2573.ts";
import {preInitQueue,di} from "./m2583.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
var HRl={};
ft(HRl,{formatVersion:()=>formatVersion,formatAll:()=>formatAll,call:()=>zlm,ReleaseNotesPicker:()=>ReleaseNotesPicker});
function formatVersion(e,t){let n=`Version ${e}:`,r=t.map((o)=>`\xB7 ${o}`).join(`
`);return`${n}
${r}`}
function formatAll(e){return e.slice().sort(([t],[n])=>fE(t,n)?1:-1).map(([t,n])=>formatVersion(t,n)).join(`

`)}
async function zlm(e){try{let r=new Promise((o,s)=>setTimeout((i)=>i(Error("Timeout")),500,s));await Promise.race([Uko(),r])}catch{}let t=await ZWt(),n=wzn(t).slice().sort(([r],[o])=>fE(r,o)?-1:1);if(n.length===0)return e(`See the full changelog at: ${SRl}`,{display:"system"}),null;return AWe.jsx(ReleaseNotesPicker,{notes:n,onDone:e})}
function ReleaseNotesPicker(e){let t=vRl.c(20),{notes:n,onDone:r}=e,o=`${n.length} versions`,s;if(t[0]!==o)s={label:"Show all",description:o,value:RRl},t[0]=o,t[1]=s;else s=t[1];let i;if(t[2]!==n||t[3]!==s)i=[s,...n.map(jlm)],t[2]=n,t[3]=s,t[4]=i;else i=t[4];let a=i,l;if(t[5]!==n||t[6]!==r)l=function(g){if(g===RRl){r(formatAll(n),{display:"system"});return}let _=n.find((T)=>{let[y]=T;return y===g});if(!_){r(void 0,{display:"skip"});return}r(formatVersion(_[0],_[1]),{display:"system"})},t[5]=n,t[6]=r,t[7]=l;else l=t[7];let c=l,u;if(t[8]!==r)u=()=>r(void 0,{display:"skip"}),t[8]=r,t[9]=u;else u=t[9];let d;if(t[10]===Symbol.for("react.memo_cache_sentinel"))d=AWe.jsx(Box,{flexDirection:"column",marginBottom:1,children:AWe.jsx(Text,{dimColor:!0,children:"Select a version to view its notes."})}),t[10]=d;else d=t[10];let p;if(t[11]!==r)p=()=>r(void 0,{display:"skip"}),t[11]=r,t[12]=p;else p=t[12];let m;if(t[13]!==c||t[14]!==a||t[15]!==p)m=AWe.jsx(hr,{options:a,visibleOptionCount:10,onChange:c,onCancel:p}),t[13]=c,t[14]=a,t[15]=p,t[16]=m;else m=t[16];let f;if(t[17]!==u||t[18]!==m)f=AWe.jsxs(preInitQueue,{title:"Release notes",onCancel:u,children:[d,m]}),t[17]=u,t[18]=m,t[19]=f;else f=t[19];return f}
function jlm(e){let[t,n]=e;return{label:`Version ${t}`,description:`${n.length} ${n.length===1?"item":"items"}`,value:t}}
var vRl,AWe,RRl="__show_all__";
var IRl=b(()=>{Ol();di();je();CWe();vRl=x(tt(),1),AWe=x(oe(),1)});
export {HRl,formatVersion,formatAll,zlm,ReleaseNotesPicker,jlm,vRl,AWe,RRl,IRl};
