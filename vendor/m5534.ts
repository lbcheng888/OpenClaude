// @ts-nocheck
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function GXl(e){let t=WXl.c(18),{questions:n,ageLabel:r,ageColor:o}=e,s=n[0];if(!s)return null;let i;if(t[0]!==o||t[1]!==r)i=F_.createElement(Text,{color:o},r),t[0]=o,t[1]=r,t[2]=i;else i=t[2];let a;if(t[3]===Symbol.for("react.memo_cache_sentinel"))a=F_.createElement(Text,null," "),t[3]=a;else a=t[3];let l;if(t[4]!==s.question)l=F_.createElement(Box,{flexGrow:1,width:0},F_.createElement(Text,{bold:!0,wrap:"truncate"},s.question)),t[4]=s.question,t[5]=l;else l=t[5];let c;if(t[6]!==n.length)c=n.length>1&&F_.createElement(Box,{flexShrink:0,paddingLeft:1},F_.createElement(Text,{dimColor:!0},"+",n.length-1," more \xB7 enter to open")),t[6]=n.length,t[7]=c;else c=t[7];let u;if(t[8]!==i||t[9]!==l||t[10]!==c)u=F_.createElement(Box,null,i,a,l,c),t[8]=i,t[9]=l,t[10]=c,t[11]=u;else u=t[11];let d;if(t[12]!==s.options)d=s.options.map(IFm),t[12]=s.options,t[13]=d;else d=t[13];let p;if(t[14]===Symbol.for("react.memo_cache_sentinel"))p=F_.createElement(Box,{paddingLeft:5},F_.createElement(Text,{dimColor:!0},"or type your own answer below")),t[14]=p;else p=t[14];let m;if(t[15]!==u||t[16]!==d)m=F_.createElement(Box,{flexDirection:"column"},u,d,p),t[15]=u,t[16]=d,t[17]=m;else m=t[17];return m}
function IFm(e,t){return F_.createElement(Box,{key:e.label,paddingLeft:2},F_.createElement(Box,{width:3,flexShrink:0},F_.createElement(Text,{dimColor:!0},t+1,".")),F_.createElement(Box,{flexGrow:1,width:0},F_.createElement(Text,{wrap:"truncate"},e.label,e.description&&F_.createElement(Text,{dimColor:!0}," \xB7 ",e.description))))}
function VXl(e,t){let n=t?.[0];if(!n||e<"1"||e>"9")return null;let r=Number(e)-1;return n.options[r]?.label??null}
var WXl,F_;
var KXl=b(()=>{ze();WXl=M(rt(),1),F_=M(Te(),1)});
export {GXl,IFm,VXl,WXl,F_,KXl};
