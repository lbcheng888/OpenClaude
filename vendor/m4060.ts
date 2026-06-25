// @ts-nocheck
import {Q4a,pmo} from "./m4058.ts";
import {L3n,fmo} from "./m4059.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {Box} from "./m2432.ts";
import {yg,_4} from "./m2581.ts";
import {LBe,Lyn,f8,$M} from "../src/telemetry/2032_word.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function nqa(e){let t=M3n.c(28),{text:n,useBriefLayout:r,timestamp:o}=e,s=Q4a(),i=s?.isQueued??!1,a=typeof n==="object";if(r){let p;if(t[0]!==o)p=o?L3n(o):"",t[0]=o,t[1]=p;else p=t[1];let m=p,f=i?"subtle":"text",h=s?.selectionHighlight==="on",g;if(t[2]!==h)g=h?_S.jsxs(Text,{"aria-label":"selected:",color:"suggestion",children:[Xe.pointer," "]}):null,t[2]=h,t[3]=g;else g=t[3];let _=h?"suggestion":i?"subtle":"briefLabelYou",T;if(t[4]!==_)T=_S.jsx(Text,{color:_,children:"You"}),t[4]=_,t[5]=T;else T=t[5];let y;if(t[6]!==m)y=m?_S.jsxs(Text,{dimColor:!0,children:[" ",m]}):null,t[6]=m,t[7]=y;else y=t[7];let S;if(t[8]!==g||t[9]!==T||t[10]!==y)S=_S.jsxs(Box,{flexDirection:"row",children:[g,T,y]}),t[8]=g,t[9]=T,t[10]=y,t[11]=S;else S=t[11];let E;if(t[12]!==n||t[13]!==f||t[14]!==a)E=a?_S.jsxs(_S.Fragment,{children:[_S.jsx(Text,{color:f,children:n.head}),_S.jsx(tqa,{hiddenLines:n.hiddenLines,indent:2}),_S.jsx(Text,{color:f,children:n.tail})]}):_S.jsx(Text,{color:f,children:n}),t[12]=n,t[13]=f,t[14]=a,t[15]=E;else E=t[15];let R;if(t[16]!==S||t[17]!==E)R=_S.jsxs(Box,{flexDirection:"column",paddingLeft:2,children:[S,E]}),t[16]=S,t[17]=E,t[18]=R;else R=t[18];return R}let l=3+(s?.paddingWidth??0),c;if(t[19]!==s?.selectionHighlight)c=_S.jsx(Box,{flexShrink:0,children:s?.selectionHighlight==="off"?_S.jsx(Text,{children:"  "}):_S.jsxs(Text,{"aria-label":s?.selectionHighlight==="on"?"selected:":"you:",color:s?.selectionHighlight==="on"?"suggestion":"subtle",children:[Xe.pointer," "]})}),t[19]=s?.selectionHighlight,t[20]=c;else c=t[20];let u;if(t[21]!==l||t[22]!==n||t[23]!==a)u=a?_S.jsxs(Box,{flexDirection:"column",children:[_S.jsx(hmo,{text:n.head}),_S.jsx(tqa,{hiddenLines:n.hiddenLines,indent:l}),_S.jsx(hmo,{text:n.tail})]}):_S.jsx(hmo,{text:n}),t[21]=l,t[22]=n,t[23]=a,t[24]=u;else u=t[24];let d;if(t[25]!==c||t[26]!==u)d=_S.jsxs(Box,{flexDirection:"row",children:[c,u]}),t[25]=c,t[26]=u,t[27]=d;else d=t[27];return d}
function tqa(e){let t=M3n.c(3),{hiddenLines:n,indent:r}=e,o=`(${n} ${n===1?"line":"lines"} hidden)`,s;if(t[0]!==r||t[1]!==o)s=_S.jsx(yg,{title:o,titleAlign:"start",color:"subtle",padding:r}),t[0]=r,t[1]=o,t[2]=s;else s=t[2];return s}
function hmo(e){let t=M3n.c(3),{text:n}=e,r,o;if(t[0]!==n){o=Symbol.for("react.early_return_sentinel");e:{let s=LBe()?Lyn(n):[];if(s.length===0){o=_S.jsx(Text,{color:"text",children:n});break e}let i=[],a=0;for(let l of s){if(l.start>a)i.push(_S.jsx(Text,{color:"text",children:n.slice(a,l.start)},`plain-${a}`));for(let c=l.start;c<l.end;c++)i.push(_S.jsx(Text,{color:f8(c-l.start),children:n[c]},`rb-${c}`));a=l.end}if(a<n.length)i.push(_S.jsx(Text,{color:"text",children:n.slice(a)},`plain-${a}`));r=_S.jsx(Text,{children:i})}t[0]=n,t[1]=r,t[2]=o}else r=t[1],o=t[2];if(o!==Symbol.for("react.early_return_sentinel"))return o;return r}
var M3n,_S;
var rqa=b(()=>{Zs();pmo();je();fmo();$M();_4();M3n=x(tt(),1),_S=x(oe(),1)});
export {nqa,tqa,hmo,M3n,_S,rqa};
