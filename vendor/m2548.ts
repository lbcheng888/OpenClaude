// @ts-nocheck
import {uMi,pMi} from "./m2546.ts";
import {Die,svn,yOt} from "./m2545.ts";
import {useAnimationFrame} from "../src/config/2452_isVisible.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {x2e,TOt} from "./m2547.ts";
import {Ansi} from "./m2441.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function gMi(e){let t=hMi.c(23),{text:n,highlights:r}=e,o;if(t[0]!==r||t[1]!==n){let E=uMi(n,r);o=[[]];let R=0;for(let w of E){let H=w.text.split(`
`);for(let k=0;k<H.length;k++){if(k>0)o.push([]),R=R+1;let I=H[k];if(I.length>0)o.at(-1).push({text:I,highlight:w.highlight,start:R});R=R+I.length}}t[0]=r,t[1]=n,t[2]=o}else o=t[2];let s;if(t[3]!==r)s=r.some(JAd),t[3]=r,t[4]=s;else s=t[4];let i=s,a=0,l=1;if(i){let E=1/0,R=-1/0;if(t[5]!==R||t[6]!==r||t[7]!==E){for(let w of r)if(w.shimmerColor)E=Math.min(E,w.start),R=Math.max(R,w.end);t[5]=R,t[6]=r,t[7]=E,t[8]=E,t[9]=R}else E=t[8],R=t[9];a=E-10,l=R-E+20}let c;if(t[10]!==l||t[11]!==i||t[12]!==o||t[13]!==a)c={lines:o,hasShimmer:i,sweepStart:a,cycleLength:l},t[10]=l,t[11]=i,t[12]=o,t[13]=a,t[14]=c;else c=t[14];let{lines:u,hasShimmer:d,sweepStart:p,cycleLength:m}=c,f=Die(),h=d&&!f,[g,_]=useAnimationFrame(h?50:null),T=h?p+Math.floor(_/50)%m:svn,y;if(t[15]!==T||t[16]!==u){let E;if(t[18]!==T)E=(R,w)=>mwe.jsx(Box,{children:R.length===0?mwe.jsx(Text,{children:" "}):R.map((H,k)=>{if(H.highlight?.shimmerColor&&H.highlight.color)return mwe.jsx(Text,{children:H.text.split("").map((I,D)=>mwe.jsx(x2e,{char:I,index:H.start+D,glimmerIndex:T,messageColor:H.highlight.color,shimmerColor:H.highlight.shimmerColor},D))},k);return mwe.jsx(Text,{color:H.highlight?.color,dimColor:H.highlight?.dimColor,inverse:H.highlight?.inverse,children:mwe.jsx(Ansi,{children:H.text})},k)})},w),t[18]=T,t[19]=E;else E=t[19];y=u.map(E),t[15]=T,t[16]=u,t[17]=y}else y=t[17];let S;if(t[20]!==g||t[21]!==y)S=mwe.jsx(Box,{ref:g,flexDirection:"column",children:y}),t[20]=g,t[21]=y,t[22]=S;else S=t[22];return S}
function JAd(e){return e.shimmerColor}
var hMi,mwe;
var _Mi=b(()=>{yOt();je();pMi();TOt();hMi=x(tt(),1),mwe=x(oe(),1)});
export {gMi,JAd,hMi,mwe,_Mi};
