// @ts-nocheck
import {Text} from "./m2433.ts";
import {f8,$M} from "../src/telemetry/2032_word.ts";
import {ay,E$} from "./m2821.ts";
import {useIsScreenReaderEnabled} from "./m2444.ts";
import {MA,qZ} from "../src/telemetry/2538_qZ.ts";
import {useAnimationFrame} from "../src/config/2452_isVisible.ts";
import {dM,hA,Pa} from "./m720.ts";
import {at,Wo} from "./m2557.ts";
import {zn} from "../src/api/0465_getOauthConfig.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function CIo(e,t,n,r){if(!e)return`${t} found \xB7 ${n} verified`;if(e==="synthesizing"){let o=[`${n} verified`];if(r>0)o.push(`${r} refuted`);return o.push("deduping"),o.join(" \xB7 ")}if(e==="verifying"){let o=[`${t} found`,`${n} verified`];if(r>0)o.push(`${r} refuted`);return o.join(" \xB7 ")}return t>0?`${t} found`:"finding"}
function SIo(e){let t=Ojn.c(5),{text:n,phase:r}=e,o=r===void 0?0:r,s;if(t[0]!==n)s=[...n],t[0]=n,t[1]=s;else s=t[1];let i;if(t[2]!==o||t[3]!==s)i=KE.jsx(KE.Fragment,{children:s.map((a,l)=>KE.jsx(Text,{color:f8(l+o),children:a},l))}),t[2]=o,t[3]=s,t[4]=i;else i=t[4];return i}
function bIo(e,t,n){let r=EIo.useRef(e),o=EIo.useRef(t);if(n||e<r.current)r.current=e;else if(e>r.current&&t!==o.current)r.current+=1,o.current=t;return r.current}
function Ymm(e){let t=Ojn.c(20),{session:n}=e,r=ay(),o=useIsScreenReaderEnabled(),s;if(t[0]!==o||t[1]!==r.prefersReducedMotion)s=MA(r.prefersReducedMotion)||o,t[0]=o,t[1]=r.prefersReducedMotion,t[2]=s;else s=t[2];let i=s,a=n.reviewProgress,l=n.status==="running",[,c]=useAnimationFrame(l&&!i?JIl:null),u=a?.bugsFound??0,d=a?.bugsVerified??0,p=a?.bugsRefuted??0,m=i||!l,f=bIo(u,c,m),h=bIo(d,c,m),g=bIo(p,c,m),_=Math.floor(c/(JIl*3))%7;if(n.status==="completed"){let k,I;if(t[3]===Symbol.for("react.memo_cache_sentinel"))k=KE.jsxs(Text,{color:"background",children:[dM," "]}),I=KE.jsx(SIo,{text:"ultrareview",phase:0}),t[3]=k,t[4]=I;else k=t[3],I=t[4];let D;if(t[5]===Symbol.for("react.memo_cache_sentinel"))D=KE.jsxs(KE.Fragment,{children:[k,I,KE.jsxs(Text,{dimColor:!0,children:[" ready \xB7 ",KE.jsx(at,{chord:"shift+down",action:"view"})]})]}),t[5]=D;else D=t[5];return D}if(n.status==="failed"){let k;if(t[6]===Symbol.for("react.memo_cache_sentinel"))k=KE.jsxs(KE.Fragment,{children:[KE.jsxs(Text,{color:"background",children:[dM," "]}),KE.jsx(SIo,{text:"ultrareview",phase:0}),KE.jsxs(Text,{color:"error",dimColor:!0,children:[" \xB7 ","error"]})]}),t[6]=k;else k=t[6];return k}let T;if(t[7]!==f||t[8]!==a||t[9]!==g||t[10]!==h)T=!a?"setting up":CIo(a.stage,f,h,g),t[7]=f,t[8]=a,t[9]=g,t[10]=h,t[11]=T;else T=t[11];let y=T,S;if(t[12]===Symbol.for("react.memo_cache_sentinel"))S=KE.jsxs(Text,{color:"background",children:[hA," "]}),t[12]=S;else S=t[12];let E=l?_:0,R;if(t[13]!==E)R=KE.jsx(SIo,{text:"ultrareview",phase:E}),t[13]=E,t[14]=R;else R=t[14];let w;if(t[15]!==y)w=KE.jsxs(Text,{dimColor:!0,children:[" \xB7 ",y]}),t[15]=y,t[16]=w;else w=t[16];let H;if(t[17]!==R||t[18]!==w)H=KE.jsxs(KE.Fragment,{children:[S,R,w]}),t[17]=R,t[18]=w,t[19]=H;else H=t[19];return H}
function AGt(e){let t=Ojn.c(11),{session:n}=e;if(n.isRemoteReview){let a;if(t[0]!==n)a=KE.jsx(Ymm,{session:n}),t[0]=n,t[1]=a;else a=t[1];return a}if(n.status==="completed"){let a;if(t[2]===Symbol.for("react.memo_cache_sentinel"))a=KE.jsx(Text,{bold:!0,color:"success",dimColor:!0,children:"done"}),t[2]=a;else a=t[2];return a}if(n.status==="failed"){let a;if(t[3]===Symbol.for("react.memo_cache_sentinel"))a=KE.jsx(Text,{bold:!0,color:"error",dimColor:!0,children:"error"}),t[3]=a;else a=t[3];return a}if(!n.todoList.length){let a;if(t[4]!==n.status)a=KE.jsxs(Text,{dimColor:!0,children:[n.status,"\u2026"]}),t[4]=n.status,t[5]=a;else a=t[5];return a}let r;if(t[6]!==n.todoList)r=zn(n.todoList,Jmm),t[6]=n.todoList,t[7]=r;else r=t[7];let o=r,s=n.todoList.length,i;if(t[8]!==o||t[9]!==s)i=KE.jsxs(Text,{dimColor:!0,children:[o,"/",s]}),t[8]=o,t[9]=s,t[10]=i;else i=t[10];return i}
function Jmm(e){return e.status==="completed"}
var Ojn,EIo,KE,JIl=80;
var AIo=b(()=>{Pa();E$();je();qZ();$M();Wo();Ojn=x(tt(),1),EIo=x(et(),1),KE=x(oe(),1)});
export {CIo,SIo,bIo,Ymm,AGt,Jmm,Ojn,EIo,KE,JIl,AIo};
