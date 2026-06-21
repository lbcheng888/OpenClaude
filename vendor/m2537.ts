// @ts-nocheck
import {jHi,GHi} from "./m2535.ts";
import {Nie,gEn,$0t} from "./m2534.ts";
import {useAnimationFrame} from "../src/config/2442_isVisible.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {PUe,q0t} from "./m2536.ts";
import {Ansi} from "./m2431.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function zHi(e){let t=KHi.c(23),{text:n,highlights:r}=e,o;if(t[0]!==r||t[1]!==n){let S=jHi(n,r);o=[[]];let v=0;for(let R of S){let k=R.text.split(`
`);for(let x=0;x<k.length;x++){if(x>0)o.push([]),v=v+1;let H=k[x];if(H.length>0)o.at(-1).push({text:H,highlight:R.highlight,start:v});v=v+H.length}}t[0]=r,t[1]=n,t[2]=o}else o=t[2];let s;if(t[3]!==r)s=r.some(Cfd),t[3]=r,t[4]=s;else s=t[4];let i=s,a=0,l=1;if(i){let S=1/0,v=-1/0;if(t[5]!==v||t[6]!==r||t[7]!==S){for(let R of r)if(R.shimmerColor)S=Math.min(S,R.start),v=Math.max(v,R.end);t[5]=v,t[6]=r,t[7]=S,t[8]=S,t[9]=v}else S=t[8],v=t[9];a=S-10,l=v-S+20}let c;if(t[10]!==l||t[11]!==i||t[12]!==o||t[13]!==a)c={lines:o,hasShimmer:i,sweepStart:a,cycleLength:l},t[10]=l,t[11]=i,t[12]=o,t[13]=a,t[14]=c;else c=t[14];let{lines:u,hasShimmer:d,sweepStart:p,cycleLength:m}=c,f=Nie(),A=d&&!f,[h,g]=useAnimationFrame(A?50:null),_=A?p+Math.floor(g/50)%m:gEn,y;if(t[15]!==_||t[16]!==u){let S;if(t[18]!==_)S=(v,R)=>x$.createElement(Box,{key:R},v.length===0?x$.createElement(Text,null," "):v.map((k,x)=>{if(k.highlight?.shimmerColor&&k.highlight.color)return x$.createElement(Text,{key:x},k.text.split("").map((H,I)=>x$.createElement(PUe,{key:I,char:H,index:k.start+I,glimmerIndex:_,messageColor:k.highlight.color,shimmerColor:k.highlight.shimmerColor})));return x$.createElement(Text,{key:x,color:k.highlight?.color,dimColor:k.highlight?.dimColor,inverse:k.highlight?.inverse},x$.createElement(Ansi,null,k.text))})),t[18]=_,t[19]=S;else S=t[19];y=u.map(S),t[15]=_,t[16]=u,t[17]=y}else y=t[17];let T;if(t[20]!==h||t[21]!==y)T=x$.createElement(Box,{ref:h,flexDirection:"column"},y),t[20]=h,t[21]=y,t[22]=T;else T=t[22];return T}
function Cfd(e){return e.shimmerColor}
var KHi,x$;
var YHi=b(()=>{$0t();ze();GHi();q0t();KHi=M(rt(),1),x$=M(Te(),1)});
export {zHi,Cfd,KHi,x$,YHi};
