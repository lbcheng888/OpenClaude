// @ts-nocheck
import {ay,E$} from "./m2821.ts";
import {yIe,x3e} from "./m3323.ts";
import {_r,ui} from "./m2463.ts";
import {useTheme} from "./m2285.ts";
import {s9n,m3t} from "./m3955.ts";
import {sn,mc} from "./m237.ts";
import {DN,ppe} from "./m238.ts";
import {getFastModeModelDisplayName,lr} from "./m233.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {ZM,Ove} from "./m2375.ts";
import {Ansi} from "./m2441.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function rZl(e){let t=BBo.c(5),n=ay(),r;if(t[0]!==n.syntaxHighlightingDisabled)r=n.syntaxHighlightingDisabled?null:yIe(),t[0]=n.syntaxHighlightingDisabled,t[1]=r;else r=t[1];let o=r,s;if(t[2]!==o||t[3]!==e)s=jne.jsx(L$m,{...e,highlight:o}),t[2]=o,t[3]=e,t[4]=s;else s=t[4];return s}
function L$m(e){let t=BBo.c(37),{content:n,maxLines:r,minHeight:o,minWidth:s,maxWidth:i,highlight:a}=e,l=s===void 0?40:s,{columns:c}=_r(),[u]=useTheme(),d=i??c-4,p=r??20,m;if(t[0]!==n||t[1]!==a||t[2]!==u)m=s9n(n,u,a),t[0]=n,t[1]=a,t[2]=u,t[3]=m;else m=t[3];let f=m,h=Math.max(1,d-4),g,_,T,y,S,E;if(t[4]!==p||t[5]!==d||t[6]!==o||t[7]!==l||t[8]!==f||t[9]!==h){let k;if(t[16]!==h)k=(X)=>sn(X)>h?DN(X,h,{hard:!0,trim:!1}).split(`
`):X,t[16]=h,t[17]=k;else k=t[17];let I=f.split(`
`).flatMap(k),D=I.length>p,O=D?I.slice(0,p):I,L=Math.min(o??0,p),P=Math.max(0,L-O.length-(D?1:0)),M=P>0?[...O,...Array(P).fill("")]:O,B=Math.max(l,...M.map(M$m)),N=Math.max(4,Math.min(B+4,d)),F=N-4,V=N-2,G;if(t[18]!==V)G=getFastModeModelDisplayName(RV.horizontal,V),t[18]=V,t[19]=G;else G=t[19];let z=`${RV.topLeft}${G}${RV.topRight}`,J=N-2,K;if(t[20]!==J)K=getFastModeModelDisplayName(RV.horizontal,J),t[20]=J,t[21]=K;else K=t[21];if(_=`${RV.bottomLeft}${K}${RV.bottomRight}`,E=D?(()=>{let X=I.length-p,ee=`${RV.horizontal.repeat(3)} \u2702 ${RV.horizontal.repeat(3)} ${X} lines hidden `,te=sn(ee),ne=Math.max(0,N-2-te);return`${RV.teeLeft}${ee}${RV.horizontal.repeat(ne)}${RV.teeRight}`})():null,g=Box,T="column",t[22]!==z)y=jne.jsx(Text,{dimColor:!0,children:z}),t[22]=z,t[23]=y;else y=t[23];let j;if(t[24]!==F)j=(X,ee)=>{let ne=sn(X)>F?ZM(X,0,F):X,se=" ".repeat(Math.max(0,F-sn(ne)));return jne.jsxs(Box,{flexDirection:"row",children:[jne.jsxs(Text,{dimColor:!0,children:[RV.vertical," "]}),jne.jsx(Ansi,{children:ne}),jne.jsxs(Text,{dimColor:!0,children:[se," ",RV.vertical]})]},ee)},t[24]=F,t[25]=j;else j=t[25];S=M.map(j),t[4]=p,t[5]=d,t[6]=o,t[7]=l,t[8]=f,t[9]=h,t[10]=g,t[11]=_,t[12]=T,t[13]=y,t[14]=S,t[15]=E}else g=t[10],_=t[11],T=t[12],y=t[13],S=t[14],E=t[15];let R;if(t[26]!==E)R=E&&jne.jsx(Text,{color:"warning",children:E}),t[26]=E,t[27]=R;else R=t[27];let w;if(t[28]!==_)w=jne.jsx(Text,{dimColor:!0,children:_}),t[28]=_,t[29]=w;else w=t[29];let H;if(t[30]!==g||t[31]!==T||t[32]!==y||t[33]!==S||t[34]!==R||t[35]!==w)H=jne.jsxs(g,{flexDirection:T,children:[y,S,R,w]}),t[30]=g,t[31]=T,t[32]=y,t[33]=S,t[34]=R,t[35]=w,t[36]=H;else H=t[36];return H}
function M$m(e){return sn(e)}
var BBo,jne,RV;
var oZl=b(()=>{E$();ui();mc();ppe();je();x3e();m3t();Ove();lr();BBo=x(tt(),1),jne=x(oe(),1),RV={topLeft:"\u250C",topRight:"\u2510",bottomLeft:"\u2514",bottomRight:"\u2518",horizontal:"\u2500",vertical:"\u2502",teeLeft:"\u251C",teeRight:"\u2524"}});
export {rZl,L$m,M$m,BBo,jne,RV,oZl};
