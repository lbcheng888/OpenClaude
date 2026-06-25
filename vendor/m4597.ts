// @ts-nocheck
import {_r,ui} from "./m2463.ts";
import {wl,sy} from "./m2585.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Sn,lr} from "./m233.ts";
import {truncateStartToWidth} from "./m239.ts";
import {Xe,Zs} from "./m2216.ts";
import {J4,$He} from "./m3189.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {Xo} from "./m240.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Ogl(e){let t=PKn.c(36),{files:n,selectedIndex:r}=e,{columns:o}=_r(),s;e:{if(n.length===0||n.length<=Z8t){let y;if(t[0]!==n.length)y={startIndex:0,endIndex:n.length},t[0]=n.length,t[1]=y;else y=t[1];s=y;break e}let g=Math.max(0,r-Math.floor(Z8t/2)),_=g+Z8t;if(_>n.length)_=n.length,g=Math.max(0,_-Z8t);let T;if(t[2]!==_||t[3]!==g)T={startIndex:g,endIndex:_},t[2]=_,t[3]=g,t[4]=T;else T=t[4];s=T}let{startIndex:i,endIndex:a}=s;if(n.length===0){let g;if(t[5]===Symbol.for("react.memo_cache_sentinel"))g=cN.jsx(wl,{children:"No changed files"}),t[5]=g;else g=t[5];return g}let l,c,u,d,p,m;if(t[6]!==o||t[7]!==a||t[8]!==n||t[9]!==r||t[10]!==i){let g=n.slice(i,a),_=i>0;c=a<n.length,u=n.length>Z8t;let T=Math.max(20,o-16-3-4);if(l=Box,d="column",t[17]!==_||t[18]!==u||t[19]!==i)p=u&&cN.jsx(Text,{dimColor:!0,children:_?` \u2191 ${i} more ${Sn(i,"file")}`:" "}),t[17]=_,t[18]=u,t[19]=i,t[20]=p;else p=t[20];let y;if(t[21]!==T||t[22]!==r||t[23]!==i)y=(S,E)=>cN.jsx(etm,{file:S,isSelected:i+E===r,maxPathWidth:T},S.path),t[21]=T,t[22]=r,t[23]=i,t[24]=y;else y=t[24];m=g.map(y),t[6]=o,t[7]=a,t[8]=n,t[9]=r,t[10]=i,t[11]=l,t[12]=c,t[13]=u,t[14]=d,t[15]=p,t[16]=m}else l=t[11],c=t[12],u=t[13],d=t[14],p=t[15],m=t[16];let f;if(t[25]!==a||t[26]!==n.length||t[27]!==c||t[28]!==u)f=u&&cN.jsx(Text,{dimColor:!0,children:c?` \u2193 ${n.length-a} more ${Sn(n.length-a,"file")}`:" "}),t[25]=a,t[26]=n.length,t[27]=c,t[28]=u,t[29]=f;else f=t[29];let h;if(t[30]!==l||t[31]!==d||t[32]!==p||t[33]!==m||t[34]!==f)h=cN.jsxs(l,{flexDirection:d,children:[p,m,f]}),t[30]=l,t[31]=d,t[32]=p,t[33]=m,t[34]=f,t[35]=h;else h=t[35];return h}
function etm(e){let t=PKn.c(14),{file:n,isSelected:r,maxPathWidth:o}=e,s;if(t[0]!==n.path||t[1]!==o)s=truncateStartToWidth(n.path,o),t[0]=n.path,t[1]=o,t[2]=s;else s=t[2];let i=s,l=`${r?Xe.pointer+" ":"  "}${i}`,c=r?"background":void 0,u;if(t[3]!==r||t[4]!==l||t[5]!==c)u=cN.jsx(Text,{bold:r,color:c,inverse:r,children:l}),t[3]=r,t[4]=l,t[5]=c,t[6]=u;else u=t[6];let d;if(t[7]===Symbol.for("react.memo_cache_sentinel"))d=cN.jsx(Box,{flexGrow:1}),t[7]=d;else d=t[7];let p;if(t[8]!==n||t[9]!==r)p=cN.jsx(ttm,{file:n,isSelected:r}),t[8]=n,t[9]=r,t[10]=p;else p=t[10];let m;if(t[11]!==u||t[12]!==p)m=cN.jsxs(Box,{flexDirection:"row",children:[u,d,p]}),t[11]=u,t[12]=p,t[13]=m;else m=t[13];return m}
function ttm(e){let t=PKn.c(16),{file:n,isSelected:r}=e;if(n.isUntracked){let a=!r,l;if(t[0]!==a)l=cN.jsx(Text,{dimColor:a,italic:!0,children:"untracked"}),t[0]=a,t[1]=l;else l=t[1];return l}if(n.isBinary){let a=!r,l;if(t[2]!==a)l=cN.jsx(Text,{dimColor:a,italic:!0,children:"Binary file"}),t[2]=a,t[3]=l;else l=t[3];return l}if(n.isLargeFile){let a=!r,l;if(t[4]!==a)l=cN.jsx(Text,{dimColor:a,italic:!0,children:"Large file modified"}),t[4]=a,t[5]=l;else l=t[5];return l}let o;if(t[6]!==n.linesAdded||t[7]!==n.linesRemoved||t[8]!==r)o=cN.jsx(J4,{added:n.linesAdded,removed:n.linesRemoved,bold:r}),t[6]=n.linesAdded,t[7]=n.linesRemoved,t[8]=r,t[9]=o;else o=t[9];let s;if(t[10]!==n.isTruncated||t[11]!==r)s=n.isTruncated&&cN.jsx(Text,{dimColor:!r,children:" (truncated)"}),t[10]=n.isTruncated,t[11]=r,t[12]=s;else s=t[12];let i;if(t[13]!==o||t[14]!==s)i=cN.jsxs(Text,{children:[o,s]}),t[13]=o,t[14]=s,t[15]=i;else i=t[15];return i}
var PKn,cN,Z8t=5;
var Lgl=b(()=>{Zs();ui();je();Xo();lr();$He();sy();PKn=x(tt(),1),cN=x(oe(),1)});
export {Ogl,etm,ttm,PKn,cN,Z8t,Lgl};
