// @ts-nocheck
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function iBa(e){return(e.teamMemorySearchCount??0)>0||(e.teamMemoryReadCount??0)>0||(e.teamMemoryWriteCount??0)>0}
function aBa(e){let t=sBa.c(23),{message:n,isActiveGroup:r,hasPrecedingParts:o}=e,s=n.teamMemoryReadCount??0,i=n.teamMemorySearchCount??0,a=n.teamMemoryWriteCount??0;if(s===0&&i===0&&a===0)return null;let l;if(t[0]!==o||t[1]!==r||t[2]!==s||t[3]!==i||t[4]!==a){let c=[],u=o?1:0;if(s>0){let d=r?u===0?"Recalling":"recalling":u===0?"Recalled":"recalled";if(u>0){let A;if(t[6]===Symbol.for("react.memo_cache_sentinel"))A=Nte.default.createElement(Text,{key:"comma-tmr"},", "),t[6]=A;else A=t[6];c.push(A)}let p;if(t[7]!==s)p=Nte.default.createElement(Text,{bold:!0},s),t[7]=s,t[8]=p;else p=t[8];let m=s===1?"memory":"memories",f;if(t[9]!==p||t[10]!==m||t[11]!==d)f=Nte.default.createElement(Text,{key:"team-mem-read"},d," ",p," team"," ",m),t[9]=p,t[10]=m,t[11]=d,t[12]=f;else f=t[12];c.push(f),u++}if(i>0){let d=r?u===0?"Searching":"searching":u===0?"Searched":"searched";if(u>0){let f;if(t[13]===Symbol.for("react.memo_cache_sentinel"))f=Nte.default.createElement(Text,{key:"comma-tms"},", "),t[13]=f;else f=t[13];c.push(f)}let p=`${d} team memories`,m;if(t[14]!==p)m=Nte.default.createElement(Text,{key:"team-mem-search"},p),t[14]=p,t[15]=m;else m=t[15];c.push(m),u++}if(a>0){let d=r?u===0?"Writing":"writing":u===0?"Wrote":"wrote";if(u>0){let A;if(t[16]===Symbol.for("react.memo_cache_sentinel"))A=Nte.default.createElement(Text,{key:"comma-tmw"},", "),t[16]=A;else A=t[16];c.push(A)}let p;if(t[17]!==a)p=Nte.default.createElement(Text,{bold:!0},a),t[17]=a,t[18]=p;else p=t[18];let m=a===1?"memory":"memories",f;if(t[19]!==p||t[20]!==m||t[21]!==d)f=Nte.default.createElement(Text,{key:"team-mem-write"},d," ",p," team"," ",m),t[19]=p,t[20]=m,t[21]=d,t[22]=f;else f=t[22];c.push(f)}l=Nte.default.createElement(Nte.default.Fragment,null,c),t[0]=o,t[1]=r,t[2]=s,t[3]=i,t[4]=a,t[5]=l}else l=t[5];return l}
var sBa,Nte;
var lBa=b(()=>{ze();sBa=M(rt(),1),Nte=M(Te(),1)});
export {iBa,aBa,sBa,Nte,lBa};
