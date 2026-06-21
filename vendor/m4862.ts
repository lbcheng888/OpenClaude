// @ts-nocheck
import {Text} from "./m2423.ts";
import {Z8,isFastModeEligible} from "../src/telemetry/2027_word.ts";
import {sy,e9} from "./m2808.ts";
import {useIsScreenReaderEnabled} from "./m2434.ts";
import {Dv,VZ} from "../src/telemetry/2527_VZ.ts";
import {useAnimationFrame} from "../src/config/2442_isVisible.ts";
import {QM,lv,sl} from "./m715.ts";
import {at,rs} from "./m2546.ts";
import {Wn} from "../src/api/0459_getOauthConfig.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function avo(e,t,n,r){if(!e)return`${t} found \xB7 ${n} verified`;if(e==="synthesizing"){let o=[`${n} verified`];if(r>0)o.push(`${r} refuted`);return o.push("deduping"),o.join(" \xB7 ")}if(e==="verifying"){let o=[`${t} found`,`${n} verified`];if(r>0)o.push(`${r} refuted`);return o.join(" \xB7 ")}return t>0?`${t} found`:"finding"}
function svo(e){let t=VGn.c(5),{text:n,phase:r}=e,o=r===void 0?0:r,s;if(t[0]!==n)s=[...n],t[0]=n,t[1]=s;else s=t[1];let i;if(t[2]!==o||t[3]!==s)i=vb.default.createElement(vb.default.Fragment,null,s.map((a,l)=>vb.default.createElement(Text,{key:l,color:Z8(l+o)},a))),t[2]=o,t[3]=s,t[4]=i;else i=t[4];return i}
function ivo(e,t,n){let r=vb.useRef(e),o=vb.useRef(t);if(n||e<r.current)r.current=e;else if(e>r.current&&t!==o.current)r.current+=1,o.current=t;return r.current}
function Nom(e){let t=VGn.c(20),{session:n}=e,r=sy(),o=useIsScreenReaderEnabled(),s;if(t[0]!==o||t[1]!==r.prefersReducedMotion)s=Dv(r.prefersReducedMotion)||o,t[0]=o,t[1]=r.prefersReducedMotion,t[2]=s;else s=t[2];let i=s,a=n.reviewProgress,l=n.status==="running",[,c]=useAnimationFrame(l&&!i?Gbl:null),u=a?.bugsFound??0,d=a?.bugsVerified??0,p=a?.bugsRefuted??0,m=i||!l,f=ivo(u,c,m),A=ivo(d,c,m),h=ivo(p,c,m),g=Math.floor(c/(Gbl*3))%7;if(n.status==="completed"){let x,H;if(t[3]===Symbol.for("react.memo_cache_sentinel"))x=vb.default.createElement(Text,{color:"background"},QM," "),H=vb.default.createElement(svo,{text:"ultrareview",phase:0}),t[3]=x,t[4]=H;else x=t[3],H=t[4];let I;if(t[5]===Symbol.for("react.memo_cache_sentinel"))I=vb.default.createElement(vb.default.Fragment,null,x,H,vb.default.createElement(Text,{dimColor:!0}," ready \xB7 ",vb.default.createElement(at,{chord:"shift+down",action:"view"}))),t[5]=I;else I=t[5];return I}if(n.status==="failed"){let x;if(t[6]===Symbol.for("react.memo_cache_sentinel"))x=vb.default.createElement(vb.default.Fragment,null,vb.default.createElement(Text,{color:"background"},QM," "),vb.default.createElement(svo,{text:"ultrareview",phase:0}),vb.default.createElement(Text,{color:"error",dimColor:!0}," \xB7 ","error")),t[6]=x;else x=t[6];return x}let _;if(t[7]!==f||t[8]!==a||t[9]!==h||t[10]!==A)_=!a?"setting up":avo(a.stage,f,A,h),t[7]=f,t[8]=a,t[9]=h,t[10]=A,t[11]=_;else _=t[11];let y=_,T;if(t[12]===Symbol.for("react.memo_cache_sentinel"))T=vb.default.createElement(Text,{color:"background"},lv," "),t[12]=T;else T=t[12];let S=l?g:0,v;if(t[13]!==S)v=vb.default.createElement(svo,{text:"ultrareview",phase:S}),t[13]=S,t[14]=v;else v=t[14];let R;if(t[15]!==y)R=vb.default.createElement(Text,{dimColor:!0}," \xB7 ",y),t[15]=y,t[16]=R;else R=t[16];let k;if(t[17]!==v||t[18]!==R)k=vb.default.createElement(vb.default.Fragment,null,T,v,R),t[17]=v,t[18]=R,t[19]=k;else k=t[19];return k}
function n8t(e){let t=VGn.c(11),{session:n}=e;if(n.isRemoteReview){let a;if(t[0]!==n)a=vb.default.createElement(Nom,{session:n}),t[0]=n,t[1]=a;else a=t[1];return a}if(n.status==="completed"){let a;if(t[2]===Symbol.for("react.memo_cache_sentinel"))a=vb.default.createElement(Text,{bold:!0,color:"success",dimColor:!0},"done"),t[2]=a;else a=t[2];return a}if(n.status==="failed"){let a;if(t[3]===Symbol.for("react.memo_cache_sentinel"))a=vb.default.createElement(Text,{bold:!0,color:"error",dimColor:!0},"error"),t[3]=a;else a=t[3];return a}if(!n.todoList.length){let a;if(t[4]!==n.status)a=vb.default.createElement(Text,{dimColor:!0},n.status,"\u2026"),t[4]=n.status,t[5]=a;else a=t[5];return a}let r;if(t[6]!==n.todoList)r=Wn(n.todoList,Bom),t[6]=n.todoList,t[7]=r;else r=t[7];let o=r,s=n.todoList.length,i;if(t[8]!==o||t[9]!==s)i=vb.default.createElement(Text,{dimColor:!0},o,"/",s),t[8]=o,t[9]=s,t[10]=i;else i=t[10];return i}
function Bom(e){return e.status==="completed"}
var VGn,vb,Gbl=80;
var lvo=b(()=>{sl();e9();ze();VZ();isFastModeEligible();rs();VGn=M(rt(),1),vb=M(Te(),1)});
export {avo,svo,ivo,Nom,n8t,Bom,VGn,vb,Gbl,lvo};
