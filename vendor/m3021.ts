// @ts-nocheck
import {IXi,u0n} from "../src/config/3020_u0n.ts";
import {bt,Gc} from "./m588.ts";
import {lHi,Ove} from "./m2375.ts";
import {b,x} from "../runtime.ts";
import {E$,ay} from "./m2821.ts";
import {je} from "./m2462.ts";
import {tp,Cs} from "../src/config/2284_loggedTmuxCcDisable.ts";
import {LXi,OXi} from "./m3020.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
import {useTheme} from "./m2285.ts";
import {Box} from "./m2432.ts";
import {NoSelect} from "./m2447.ts";
import {RawAnsi} from "./m2448.ts";
function pqd(e){return Math.max(e.oldStart+e.oldLines-1,e.newStart+e.newLines-1,1).toString().length+3}
function mqd(e,t,n,r,o,s,i,a){let l=IXi();if(!l)return null;let c=a?pqd(e):0,u=c>0&&c<s?c:0,d=`${o}|${s}|${i?1:0}|${u}|${bt.level}|${t??""}|${n}`,p=MXi.get(e),m=p?.get(d);if(m)return m;let f=new l(e,t,n,r).render(o,s,i);if(f===null)return null;let h=null,g=null;if(u>0){h=Array(f.length),g=Array(f.length);for(let T=0;T<f.length;T++){let[y,S]=lHi(f[T]??"",u);h[T]=y,g[T]=S}}let _={lines:f,gutterWidth:u,gutters:h,contents:g};if(!p)p=new Map,MXi.set(e,p);if(p.size>=4)p.clear();return p.set(d,_),_}
var NXi,FXi,vae,MXi,wae;
var Jot=b(()=>{Gc();E$();je();tp();Ove();u0n();LXi();NXi=x(tt(),1),FXi=x(et(),1),vae=x(oe(),1),MXi=new WeakMap;wae=FXi.memo(function(t){let n=NXi.c(26),{patch:r,dim:o,filePath:s,firstLine:i,fileContent:a,width:l,skipHighlighting:c}=t,u=c===void 0?!1:c,[d]=useTheme(),m=ay().syntaxHighlightingDisabled??!1,f=Math.max(1,Math.floor(l)),h;if(n[0]!==o||n[1]!==a||n[2]!==s||n[3]!==i||n[4]!==r||n[5]!==f||n[6]!==u||n[7]!==m||n[8]!==d){let R=Cs();h=u||m?null:mqd(r,i,s,a??null,d,f,o,R),n[0]=o,n[1]=a,n[2]=s,n[3]=i,n[4]=r,n[5]=f,n[6]=u,n[7]=m,n[8]=d,n[9]=h}else h=n[9];let g=h;if(!g){let R;if(n[10]!==o||n[11]!==r||n[12]!==l)R=vae.jsx(Box,{children:vae.jsx(OXi,{patch:r,dim:o,width:l})}),n[10]=o,n[11]=r,n[12]=l,n[13]=R;else R=n[13];return R}let{lines:_,gutterWidth:T,gutters:y,contents:S}=g;if(T>0&&y&&S){let R;if(n[14]!==T||n[15]!==y)R=vae.jsx(NoSelect,{fromLeftEdge:!0,children:vae.jsx(RawAnsi,{lines:y,width:T})}),n[14]=T,n[15]=y,n[16]=R;else R=n[16];let w=f-T,H;if(n[17]!==S||n[18]!==w)H=vae.jsx(RawAnsi,{lines:S,width:w}),n[17]=S,n[18]=w,n[19]=H;else H=n[19];let k;if(n[20]!==R||n[21]!==H)k=vae.jsxs(Box,{flexDirection:"row",children:[R,H]}),n[20]=R,n[21]=H,n[22]=k;else k=n[22];return k}let E;if(n[23]!==_||n[24]!==f)E=vae.jsx(Box,{children:vae.jsx(RawAnsi,{lines:_,width:f})}),n[23]=_,n[24]=f,n[25]=E;else E=n[25];return E})});
export {pqd,mqd,NXi,FXi,vae,MXi,wae,Jot};
