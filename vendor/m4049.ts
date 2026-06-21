// @ts-nocheck
import {b9,lqe} from "./m3975.ts";
import {Text} from "./m2423.ts";
import {mr,ki} from "./m2453.ts";
import {p$e,TLt} from "./m3009.ts";
import {RIe,M$t,q2n,Clo,j2n} from "./m4048.ts";
import {sG,jct,B2n,vce} from "../src/telemetry/4046_oldStart.ts";
import {zd,dr} from "./m231.ts";
import {qp,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {vIe,Wct,wIe} from "./m4047.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Rlo(e){let t=wlo.c(9),n;if(t[0]!==e.edits||t[1]!==e.file_path||t[2]!==e.remoteOldContent||t[3]!==e.skipLocalRead)n=()=>Yvp(e.file_path,e.edits,e.remoteOldContent,e.skipLocalRead??!1),t[0]=e.edits,t[1]=e.file_path,t[2]=e.remoteOldContent,t[3]=e.skipLocalRead,t[4]=n;else n=t[4];let[r]=Vct.useState(n),o;if(t[5]===Symbol.for("react.memo_cache_sentinel"))o=iG.createElement(b9,{paddingX:0},iG.createElement(Text,{dimColor:!0},"\u2026")),t[5]=o;else o=t[5];let s;if(t[6]!==r||t[7]!==e.file_path)s=iG.createElement(Vct.Suspense,{fallback:o},iG.createElement(zvp,{promise:r,file_path:e.file_path})),t[6]=r,t[7]=e.file_path,t[8]=s;else s=t[8];return s}
function zvp(e){let t=wlo.c(6),{promise:n,file_path:r}=e,{patch:o,firstLine:s,fileContent:i}=Vct.use(n),{columns:a}=mr(),l;if(t[0]!==a||t[1]!==i||t[2]!==r||t[3]!==s||t[4]!==o)l=iG.createElement(b9,{paddingX:0},iG.createElement(p$e,{hunks:o,dim:!1,width:a,filePath:r,firstLine:s,fileContent:i})),t[0]=a,t[1]=i,t[2]=r,t[3]=s,t[4]=o,t[5]=l;else l=t[5];return l}
async function Yvp(e,t,n,r){let o=t.filter((i)=>i.old_string!=null&&i.new_string!=null),s=o.length===1?o[0]:void 0;if(n===void 0&&!r){if(s&&s.old_string.length>=RIe)return Gct(e,[s])}try{if(n!==void 0){let a=o.map((l)=>vlo(n,l));return{patch:sG({filePath:e,fileContents:n,edits:a}),firstLine:zd(n),fileContent:n}}if(r)return Gct(e,o);let i=await M$t(e);if(i===null)return Gct(e,o);try{if(!s||s.old_string===""){let u=await q2n(i);if(u===null)return Gct(e,o);let d=o.map((p)=>vlo(u,p));return{patch:sG({filePath:e,fileContents:u,edits:d}),firstLine:zd(u),fileContent:u}}let a=await Clo(i,s.old_string,jct);if(a.truncated||a.content==="")return Gct(e,[s]);let l=vlo(a.content,s),c=sG({filePath:e,fileContents:a.content,edits:[l]});return{patch:B2n(c,a.lineOffset-1),firstLine:a.lineOffset===1?zd(a.content):null,fileContent:a.content}}finally{await i.close()}}catch(i){if(qp(i))logForDebugging(`FileEditToolDiff: fs error computing diff for ${e}: ${i.message}`,{level:"error"});else De(i);return Gct(e,o)}}
function Gct(e,t){return{patch:t.flatMap((n)=>sG({filePath:e,fileContents:n.old_string,edits:[n]})),firstLine:null,fileContent:void 0}}
function vlo(e,t){let n=vIe(e,t.old_string)||t.old_string,r=Wct(t.old_string,n,t.new_string);return{...t,old_string:n,new_string:r}}
var wlo,iG,Vct;
var vUa=b(()=>{ki();ze();wIe();qe();vce();bt();Rn();j2n();dr();lqe();TLt();wlo=M(rt(),1),iG=M(Te(),1),Vct=M(Te(),1)});
export {Rlo,zvp,Yvp,Gct,vlo,wlo,iG,Vct,vUa};
