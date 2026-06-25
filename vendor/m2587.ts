// @ts-nocheck
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {ga,rh} from "./m2550.ts";
import {Xe,Zs} from "./m2216.ts";
import {M2e,COt} from "./m2586.ts";
import {Ba,I_} from "./m2584.ts";
import {uvn,$5r} from "./m2554.ts";
import {useDebouncedCallback} from "./m2453.ts";
import {Vtt,Ktt,UAn} from "./m2466.ts";
import {Or,ss} from "./m2553.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {dr,uc} from "./m2558.ts";
import {hr,Ol} from "./m2573.ts";
import {preInitQueue,di} from "./m2583.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function P1i(){let e=AOt.c(1),t;if(e[0]===Symbol.for("react.memo_cache_sentinel"))t=NA.jsx(Text,{dimColor:!0,children:"Claude Code will be able to read files in this directory and make edits when auto-accept edits is on."}),e[0]=t;else t=e[0];return t}
function cvd(e){let t=AOt.c(5),{path:n}=e,r;if(t[0]!==n)r=NA.jsx(Text,{color:"permission",children:n}),t[0]=n,t[1]=r;else r=t[1];let o;if(t[2]===Symbol.for("react.memo_cache_sentinel"))o=NA.jsx(P1i,{}),t[2]=o;else o=t[2];let s;if(t[3]!==r)s=NA.jsxs(Box,{flexDirection:"column",gap:1,children:[r,o]}),t[3]=r,t[4]=s;else s=t[4];return s}
function uvd(e){let t=AOt.c(14),{value:n,onChange:r,onSubmit:o,error:s,suggestions:i,selectedSuggestion:a}=e,l;if(t[0]===Symbol.for("react.memo_cache_sentinel"))l=NA.jsx(Text,{children:"Enter the path to the directory:"}),t[0]=l;else l=t[0];let c;if(t[1]!==r||t[2]!==o||t[3]!==n)c=NA.jsx(Box,{borderDimColor:!0,borderStyle:"round",marginTop:1,paddingLeft:1,children:NA.jsx(ga,{showCursor:!0,placeholder:`Directory path${Xe.ellipsis}`,value:n,onChange:r,onSubmit:o,columns:80,cursorOffset:n.length,onChangeCursorOffset:dvd})}),t[1]=r,t[2]=o,t[3]=n,t[4]=c;else c=t[4];let u;if(t[5]!==a||t[6]!==i)u=i.length>0&&NA.jsx(Box,{marginBottom:1,children:NA.jsx(M2e,{suggestions:i,selectedSuggestion:a,noPad:!0})}),t[5]=a,t[6]=i,t[7]=u;else u=t[7];let d;if(t[8]!==s)d=NA.jsx(Ba,{error:s}),t[8]=s,t[9]=d;else d=t[9];let p;if(t[10]!==c||t[11]!==u||t[12]!==d)p=NA.jsxs(Box,{flexDirection:"column",children:[l,c,u,d]}),t[10]=c,t[11]=u,t[12]=d,t[13]=p;else p=t[13];return p}
function dvd(){}
function ROt(e){let t=AOt.c(36),{onAddDirectory:n,onCancel:r,permissionContext:o,directoryPath:s}=e,[i,a]=N2e.useState(""),[l,c]=N2e.useState(null),u;if(t[0]===Symbol.for("react.memo_cache_sentinel"))u=[],t[0]=u;else u=t[0];let[d,p]=N2e.useState(u),[m,f]=N2e.useState(0),h;if(t[1]===Symbol.for("react.memo_cache_sentinel"))h=async(N)=>{if(!N){p([]),f(0);return}let F=await uvn(N);p(F),f(0)},t[1]=h;else h=t[1];let _=useDebouncedCallback(h,100),T,y;if(t[2]!==_||t[3]!==i)T=()=>{_(i)},y=[i,_],t[2]=_,t[3]=i,t[4]=T,t[5]=y;else T=t[4],y=t[5];N2e.useEffect(T,y);let S;if(t[6]===Symbol.for("react.memo_cache_sentinel"))S=(N)=>{let F=N.id+"/";a(F),c(null)},t[6]=S;else S=t[6];let E=S,R;if(t[7]!==n||t[8]!==o)R=async(N)=>{let F=await Vtt(N,o);if(F.resultType==="success")n(F.absolutePath,!1);else c(Ktt(F))},t[7]=n,t[8]=o,t[9]=R;else R=t[9];let w=R,H;if(t[10]===Symbol.for("react.memo_cache_sentinel"))H={context:"Settings"},t[10]=H;else H=t[10];Or("confirm:no",r,H);let k;if(t[11]!==w||t[12]!==m||t[13]!==d)k=(N)=>{if(d.length>0){if(N.key==="tab"){N.preventDefault();let F=d[m];if(F)E(F);return}if(N.key==="return"){N.preventDefault();let F=d[m];if(F)w(F.id+"/");return}if(N.key==="up"||N.ctrl&&N.key==="p"){N.preventDefault(),f((F)=>F<=0?d.length-1:F-1);return}if(N.key==="down"||N.ctrl&&N.key==="n"){N.preventDefault(),f((F)=>F>=d.length-1?0:F+1);return}}},t[11]=w,t[12]=m,t[13]=d,t[14]=k;else k=t[14];let I=k,D;if(t[15]!==s||t[16]!==n||t[17]!==r)D=(N)=>{if(!s)return;let F=N;e:switch(F){case"yes-session":{n(s,!1);break e}case"yes-remember":{n(s,!0);break e}case"no":r()}},t[15]=s,t[16]=n,t[17]=r,t[18]=D;else D=t[18];let O=D,L;if(t[19]!==s)L=s?void 0:NA.jsxs(bn,{children:[NA.jsx(at,{chord:"tab",action:"complete"}),NA.jsx(at,{chord:"enter",action:"add"}),NA.jsx(dr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"cancel"})]}),t[19]=s,t[20]=L;else L=t[20];let P;if(t[21]!==i||t[22]!==s||t[23]!==l||t[24]!==O||t[25]!==w||t[26]!==m||t[27]!==d)P=s?NA.jsxs(Box,{flexDirection:"column",gap:1,children:[NA.jsx(cvd,{path:s}),NA.jsx(hr,{options:lvd,onChange:O,onCancel:()=>O("no")})]}):NA.jsxs(Box,{flexDirection:"column",gap:1,children:[NA.jsx(P1i,{}),NA.jsx(uvd,{value:i,onChange:a,onSubmit:w,error:l,suggestions:d,selectedSuggestion:m})]}),t[21]=i,t[22]=s,t[23]=l,t[24]=O,t[25]=w,t[26]=m,t[27]=d,t[28]=P;else P=t[28];let M;if(t[29]!==r||t[30]!==L||t[31]!==P)M=NA.jsx(preInitQueue,{title:"Add directory to workspace",onCancel:r,color:"permission",isCancelActive:!1,inputGuide:L,children:P}),t[29]=r,t[30]=L,t[31]=P,t[32]=M;else M=t[32];let B;if(t[33]!==I||t[34]!==M)B=NA.jsx(Box,{flexDirection:"column",tabIndex:0,autoFocus:!0,onKeyDown:I,children:M}),t[33]=I,t[34]=M,t[35]=B;else B=t[35];return B}
var AOt,N2e,NA,lvd;
var n8r=b(()=>{Zs();UAn();rh();je();ss();$5r();uc();Ol();Is();di();I_();Wo();COt();AOt=x(tt(),1),N2e=x(et(),1),NA=x(oe(),1),lvd=[{value:"yes-session",label:"Yes, for this session"},{value:"yes-remember",label:"Yes, and remember this directory"},{value:"no",label:"No"}]});
export {P1i,cvd,uvd,dvd,ROt,AOt,N2e,NA,lvd,n8r};
