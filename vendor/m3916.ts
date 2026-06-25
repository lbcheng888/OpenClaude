// @ts-nocheck
import {K$,Jqe} from "./m3915.ts";
import {Text} from "./m2433.ts";
import {_r,ui} from "./m2463.ts";
import {h9e,j1t} from "./m3022.ts";
import {K0e,J9t,P$n,Duo,O$n} from "./m3914.ts";
import {pG,Nut,H$n,oce} from "../src/telemetry/3912_oldStart.ts";
import {Cd,lr} from "./m233.ts";
import {sp,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {G0e,Fut,V0e} from "./m3913.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Luo(e){let t=Ouo.c(9),n;if(t[0]!==e.edits||t[1]!==e.file_path||t[2]!==e.remoteOldContent||t[3]!==e.skipLocalRead)n=()=>akp(e.file_path,e.edits,e.remoteOldContent,e.skipLocalRead??!1),t[0]=e.edits,t[1]=e.file_path,t[2]=e.remoteOldContent,t[3]=e.skipLocalRead,t[4]=n;else n=t[4];let[r]=Uut.useState(n),o;if(t[5]===Symbol.for("react.memo_cache_sentinel"))o=Xqe.jsx(K$,{paddingX:0,children:Xqe.jsx(Text,{dimColor:!0,children:"\u2026"})}),t[5]=o;else o=t[5];let s;if(t[6]!==r||t[7]!==e.file_path)s=Xqe.jsx(Uut.Suspense,{fallback:o,children:Xqe.jsx(ikp,{promise:r,file_path:e.file_path})}),t[6]=r,t[7]=e.file_path,t[8]=s;else s=t[8];return s}
function ikp(e){let t=Ouo.c(6),{promise:n,file_path:r}=e,{patch:o,firstLine:s,fileContent:i}=Uut.use(n),{columns:a}=_r(),l;if(t[0]!==a||t[1]!==i||t[2]!==r||t[3]!==s||t[4]!==o)l=Xqe.jsx(K$,{paddingX:0,children:Xqe.jsx(h9e,{hunks:o,dim:!1,width:a,filePath:r,firstLine:s,fileContent:i})}),t[0]=a,t[1]=i,t[2]=r,t[3]=s,t[4]=o,t[5]=l;else l=t[5];return l}
async function akp(e,t,n,r){let o=t.filter((i)=>i.old_string!=null&&i.new_string!=null),s=o.length===1?o[0]:void 0;if(n===void 0&&!r){if(s&&s.old_string.length>=K0e)return But(e,[s])}try{if(n!==void 0){let a=o.map((l)=>Puo(n,l));return{patch:pG({filePath:e,fileContents:n,edits:a}),firstLine:Cd(n),fileContent:n}}if(r)return But(e,o);let i=await J9t(e);if(i===null)return But(e,o);try{if(!s||s.old_string===""){let u=await P$n(i);if(u===null)return But(e,o);let d=o.map((p)=>Puo(u,p));return{patch:pG({filePath:e,fileContents:u,edits:d}),firstLine:Cd(u),fileContent:u}}let a=await Duo(i,s.old_string,Nut);if(a.truncated||a.content==="")return But(e,[s]);let l=Puo(a.content,s),c=pG({filePath:e,fileContents:a.content,edits:[l]});return{patch:H$n(c,a.lineOffset-1),firstLine:a.lineOffset===1?Cd(a.content):null,fileContent:a.content}}finally{await i.close()}}catch(i){if(sp(i))logForDebugging(`FileEditToolDiff: fs error computing diff for ${e}: ${i.message}`,{level:"error"});else Ie(i);return But(e,o)}}
function But(e,t){return{patch:t.flatMap((n)=>pG({filePath:e,fileContents:n.old_string,edits:[n]})),firstLine:null,fileContent:void 0}}
function Puo(e,t){let n=G0e(e,t.old_string)||t.old_string,r=Fut(t.old_string,n,t.new_string);return{...t,old_string:n,new_string:r}}
var Ouo,Uut,Xqe;
var LBa=b(()=>{ui();je();V0e();qe();oce();Ct();vn();O$n();lr();Jqe();j1t();Ouo=x(tt(),1),Uut=x(et(),1),Xqe=x(oe(),1)});
export {Luo,ikp,akp,But,Puo,Ouo,Uut,Xqe,LBa};
