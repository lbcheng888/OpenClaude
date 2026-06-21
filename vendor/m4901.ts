// @ts-nocheck
import {xx,$P} from "./m4515.ts";
import {ift,d8t} from "./m4897.ts";
import {Text} from "./m2423.ts";
import {Bs,rA} from "./m2550.ts";
import {Box} from "./m2422.ts";
import {pr,Yl} from "./m2562.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function qCl(e){let t=$Cl.c(32),{onHeaderFocusChange:n,onStateChange:r}=e,{headerFocused:o,focusHeader:s}=xx(),i,a;if(t[0]!==o||t[1]!==n)i=()=>{n(o)},a=[o,n],t[0]=o,t[1]=n,t[2]=i,t[3]=a;else i=t[2],a=t[3];JDe.useEffect(i,a);let{getDenials:l}=ift(),[c]=JDe.useState(l),[u,d]=JDe.useState(oim),[p,m]=JDe.useState(rim),[f,A]=JDe.useState(0),h,g;if(t[4]!==u||t[5]!==c||t[6]!==r||t[7]!==p)h=()=>{r({approved:u,retry:p,denials:c})},g=[u,p,c,r],t[4]=u,t[5]=c,t[6]=r,t[7]=p,t[8]=h,t[9]=g;else h=t[8],g=t[9];JDe.useEffect(h,g);let _;if(t[10]===Symbol.for("react.memo_cache_sentinel"))_=(D)=>{let N=Number(D);d((O)=>{let $=new Set(O);if($.has(N))$.delete(N);else $.add(N);return $})},t[10]=_;else _=t[10];let y=_,T;if(t[11]===Symbol.for("react.memo_cache_sentinel"))T=(D)=>{A(Number(D))},t[11]=T;else T=t[11];let S=T,v;if(t[12]!==f||t[13]!==o)v=function(N){if(o)return;if(N.ctrl||N.meta||N.shift)return;if(N.key!=="r")return;N.preventDefault(),m((O)=>{let $=new Set(O);if($.has(f))$.delete(f);else $.add(f);return $}),d((O)=>{if(O.has(f))return O;let $=new Set(O);return $.add(f),$})},t[12]=f,t[13]=o,t[14]=v;else v=t[14];let R=v;if(c.length===0){let D;if(t[15]===Symbol.for("react.memo_cache_sentinel"))D=VN.createElement(Text,{dimColor:!0},"No recent denials. Commands denied by the auto mode classifier will appear here."),t[15]=D;else D=t[15];return D}let k;if(t[16]!==u||t[17]!==c||t[18]!==p){let D;if(t[20]!==u||t[21]!==p)D=(N,O)=>{let $=u.has(O),U=p.has(O)?" (retry)":"";return{label:VN.createElement(Text,null,VN.createElement(Bs,{status:$?"success":"error",withSpace:!0}),N.display,VN.createElement(Text,{dimColor:!0},U)),value:String(O),...{}}},t[20]=u,t[21]=p,t[22]=D;else D=t[22];k=c.map(D),t[16]=u,t[17]=c,t[18]=p,t[19]=k}else k=t[19];let x=k,H;if(t[23]===Symbol.for("react.memo_cache_sentinel"))H=VN.createElement(Text,null,"Commands recently denied by the auto mode classifier."),t[23]=H;else H=t[23];let I=Math.min(10,x.length),P;if(t[24]!==s||t[25]!==o||t[26]!==x||t[27]!==I)P=VN.createElement(Box,{marginTop:1},VN.createElement(pr,{options:x,onChange:y,onFocus:S,visibleOptionCount:I,isDisabled:o,onUpFromFirstItem:s})),t[24]=s,t[25]=o,t[26]=x,t[27]=I,t[28]=P;else P=t[28];let L;if(t[29]!==R||t[30]!==P)L=VN.createElement(Box,{flexDirection:"column",onKeyDown:R},H,P),t[29]=R,t[30]=P,t[31]=L;else L=t[31];return L}
function rim(){return new Set}
function oim(){return new Set}
var $Cl,VN,JDe;
var jCl=b(()=>{d8t();ze();Yl();rA();$P();$Cl=M(rt(),1),VN=M(Te(),1),JDe=M(Te(),1)});
export {qCl,rim,oim,$Cl,VN,JDe,jCl};
