// @ts-nocheck
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Pqa(e){return(e.teamMemorySearchCount??0)>0||(e.teamMemoryReadCount??0)>0||(e.teamMemoryWriteCount??0)>0}
function Oqa(e){let t=Dqa.c(23),{message:n,isActiveGroup:r,hasPrecedingParts:o}=e,s=n.teamMemoryReadCount??0,i=n.teamMemorySearchCount??0,a=n.teamMemoryWriteCount??0;if(s===0&&i===0&&a===0)return null;let l;if(t[0]!==o||t[1]!==r||t[2]!==s||t[3]!==i||t[4]!==a){let c=[],u=o?1:0;if(s>0){let d=r?u===0?"Recalling":"recalling":u===0?"Recalled":"recalled";if(u>0){let h;if(t[6]===Symbol.for("react.memo_cache_sentinel"))h=SG.jsx(Text,{children:", "},"comma-tmr"),t[6]=h;else h=t[6];c.push(h)}let p;if(t[7]!==s)p=SG.jsx(Text,{bold:!0,children:s}),t[7]=s,t[8]=p;else p=t[8];let m=s===1?"memory":"memories",f;if(t[9]!==p||t[10]!==m||t[11]!==d)f=SG.jsxs(Text,{children:[d," ",p," team"," ",m]},"team-mem-read"),t[9]=p,t[10]=m,t[11]=d,t[12]=f;else f=t[12];c.push(f),u++}if(i>0){let d=r?u===0?"Searching":"searching":u===0?"Searched":"searched";if(u>0){let f;if(t[13]===Symbol.for("react.memo_cache_sentinel"))f=SG.jsx(Text,{children:", "},"comma-tms"),t[13]=f;else f=t[13];c.push(f)}let p=`${d} team memories`,m;if(t[14]!==p)m=SG.jsx(Text,{children:p},"team-mem-search"),t[14]=p,t[15]=m;else m=t[15];c.push(m),u++}if(a>0){let d=r?u===0?"Writing":"writing":u===0?"Wrote":"wrote";if(u>0){let h;if(t[16]===Symbol.for("react.memo_cache_sentinel"))h=SG.jsx(Text,{children:", "},"comma-tmw"),t[16]=h;else h=t[16];c.push(h)}let p;if(t[17]!==a)p=SG.jsx(Text,{bold:!0,children:a}),t[17]=a,t[18]=p;else p=t[18];let m=a===1?"memory":"memories",f;if(t[19]!==p||t[20]!==m||t[21]!==d)f=SG.jsxs(Text,{children:[d," ",p," team"," ",m]},"team-mem-write"),t[19]=p,t[20]=m,t[21]=d,t[22]=f;else f=t[22];c.push(f)}l=SG.jsx(SG.Fragment,{children:c}),t[0]=o,t[1]=r,t[2]=s,t[3]=i,t[4]=a,t[5]=l}else l=t[5];return l}
var Dqa,SG;
var Lqa=b(()=>{je();Dqa=x(tt(),1),SG=x(oe(),1)});
export {Pqa,Oqa,Dqa,SG,Lqa};
