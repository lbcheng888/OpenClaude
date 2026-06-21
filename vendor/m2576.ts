// @ts-nocheck
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {Pa,rh} from "./m2539.ts";
import {et,Ai} from "./m2208.ts";
import {MUe,V0t} from "./m2575.ts";
import {nl,v_} from "./m2573.ts";
import {bEn,u3r} from "./m2543.ts";
import {j4} from "./m2443.ts";
import {jZe,WZe,ZSn} from "./m2456.ts";
import {Or,Ts} from "./m2542.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {lr,readRoster} from "./m2547.ts";
import {pr,Yl} from "./m2562.ts";
import {Kn,Li} from "./m2572.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function o0i(){let e=K0t.c(1),t;if(e[0]===Symbol.for("react.memo_cache_sentinel"))t=Op.createElement(Text,{dimColor:!0},"Claude Code will be able to read files in this directory and make edits when auto-accept edits is on."),e[0]=t;else t=e[0];return t}
function NAd(e){let t=K0t.c(5),{path:n}=e,r;if(t[0]!==n)r=Op.createElement(Text,{color:"permission"},n),t[0]=n,t[1]=r;else r=t[1];let o;if(t[2]===Symbol.for("react.memo_cache_sentinel"))o=Op.createElement(o0i,null),t[2]=o;else o=t[2];let s;if(t[3]!==r)s=Op.createElement(Box,{flexDirection:"column",gap:1},r,o),t[3]=r,t[4]=s;else s=t[4];return s}
function BAd(e){let t=K0t.c(14),{value:n,onChange:r,onSubmit:o,error:s,suggestions:i,selectedSuggestion:a}=e,l;if(t[0]===Symbol.for("react.memo_cache_sentinel"))l=Op.createElement(Text,null,"Enter the path to the directory:"),t[0]=l;else l=t[0];let c;if(t[1]!==r||t[2]!==o||t[3]!==n)c=Op.createElement(Box,{borderDimColor:!0,borderStyle:"round",marginTop:1,paddingLeft:1},Op.createElement(Pa,{showCursor:!0,placeholder:`Directory path${et.ellipsis}`,value:n,onChange:r,onSubmit:o,columns:80,cursorOffset:n.length,onChangeCursorOffset:FAd})),t[1]=r,t[2]=o,t[3]=n,t[4]=c;else c=t[4];let u;if(t[5]!==a||t[6]!==i)u=i.length>0&&Op.createElement(Box,{marginBottom:1},Op.createElement(MUe,{suggestions:i,selectedSuggestion:a,noPad:!0})),t[5]=a,t[6]=i,t[7]=u;else u=t[7];let d;if(t[8]!==s)d=Op.createElement(nl,{error:s}),t[8]=s,t[9]=d;else d=t[9];let p;if(t[10]!==c||t[11]!==u||t[12]!==d)p=Op.createElement(Box,{flexDirection:"column"},l,c,u,d),t[10]=c,t[11]=u,t[12]=d,t[13]=p;else p=t[13];return p}
function FAd(){}
function z0t(e){let t=K0t.c(36),{onAddDirectory:n,onCancel:r,permissionContext:o,directoryPath:s}=e,[i,a]=NUe.useState(""),[l,c]=NUe.useState(null),u;if(t[0]===Symbol.for("react.memo_cache_sentinel"))u=[],t[0]=u;else u=t[0];let[d,p]=NUe.useState(u),[m,f]=NUe.useState(0),A;if(t[1]===Symbol.for("react.memo_cache_sentinel"))A=async($)=>{if(!$){p([]),f(0);return}let U=await bEn($);p(U),f(0)},t[1]=A;else A=t[1];let g=j4(A,100),_,y;if(t[2]!==g||t[3]!==i)_=()=>{g(i)},y=[i,g],t[2]=g,t[3]=i,t[4]=_,t[5]=y;else _=t[4],y=t[5];NUe.useEffect(_,y);let T;if(t[6]===Symbol.for("react.memo_cache_sentinel"))T=($)=>{let U=$.id+"/";a(U),c(null)},t[6]=T;else T=t[6];let S=T,v;if(t[7]!==n||t[8]!==o)v=async($)=>{let U=await jZe($,o);if(U.resultType==="success")n(U.absolutePath,!1);else c(WZe(U))},t[7]=n,t[8]=o,t[9]=v;else v=t[9];let R=v,k;if(t[10]===Symbol.for("react.memo_cache_sentinel"))k={context:"Settings"},t[10]=k;else k=t[10];Or("confirm:no",r,k);let x;if(t[11]!==R||t[12]!==m||t[13]!==d)x=($)=>{if(d.length>0){if($.key==="tab"){$.preventDefault();let U=d[m];if(U)S(U);return}if($.key==="return"){$.preventDefault();let U=d[m];if(U)R(U.id+"/");return}if($.key==="up"||$.ctrl&&$.key==="p"){$.preventDefault(),f((U)=>U<=0?d.length-1:U-1);return}if($.key==="down"||$.ctrl&&$.key==="n"){$.preventDefault(),f((U)=>U>=d.length-1?0:U+1);return}}},t[11]=R,t[12]=m,t[13]=d,t[14]=x;else x=t[14];let H=x,I;if(t[15]!==s||t[16]!==n||t[17]!==r)I=($)=>{if(!s)return;let U=$;e:switch(U){case"yes-session":{n(s,!1);break e}case"yes-remember":{n(s,!0);break e}case"no":r()}},t[15]=s,t[16]=n,t[17]=r,t[18]=I;else I=t[18];let P=I,L;if(t[19]!==s)L=s?void 0:Op.createElement(Tn,null,Op.createElement(at,{chord:"tab",action:"complete"}),Op.createElement(at,{chord:"enter",action:"add"}),Op.createElement(lr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"cancel"})),t[19]=s,t[20]=L;else L=t[20];let D;if(t[21]!==i||t[22]!==s||t[23]!==l||t[24]!==P||t[25]!==R||t[26]!==m||t[27]!==d)D=s?Op.createElement(Box,{flexDirection:"column",gap:1},Op.createElement(NAd,{path:s}),Op.createElement(pr,{options:MAd,onChange:P,onCancel:()=>P("no")})):Op.createElement(Box,{flexDirection:"column",gap:1},Op.createElement(o0i,null),Op.createElement(BAd,{value:i,onChange:a,onSubmit:R,error:l,suggestions:d,selectedSuggestion:m})),t[21]=i,t[22]=s,t[23]=l,t[24]=P,t[25]=R,t[26]=m,t[27]=d,t[28]=D;else D=t[28];let N;if(t[29]!==r||t[30]!==L||t[31]!==D)N=Op.createElement(Kn,{title:"Add directory to workspace",onCancel:r,color:"permission",isCancelActive:!1,inputGuide:L},D),t[29]=r,t[30]=L,t[31]=D,t[32]=N;else N=t[32];let O;if(t[33]!==H||t[34]!==N)O=Op.createElement(Box,{flexDirection:"column",tabIndex:0,autoFocus:!0,onKeyDown:H},N),t[33]=H,t[34]=N,t[35]=O;else O=t[35];return O}
var K0t,Op,NUe,MAd;
var R3r=b(()=>{Ai();ZSn();rh();ze();Ts();u3r();readRoster();Yl();zs();Li();v_();rs();V0t();K0t=M(rt(),1),Op=M(Te(),1),NUe=M(Te(),1),MAd=[{value:"yes-session",label:"Yes, for this session"},{value:"yes-remember",label:"Yes, and remember this directory"},{value:"no",label:"No"}]});
export {o0i,NAd,BAd,FAd,z0t,K0t,Op,NUe,MAd,R3r};
