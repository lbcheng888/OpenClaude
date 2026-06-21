// @ts-nocheck
import {MGi,Txn} from "../src/config/3007_Txn.ts";
import {_t,cu} from "./m582.ts";
import {Qbi,Yve} from "./m2365.ts";
import {b,M} from "../runtime.ts";
import {e9,sy} from "./m2808.ts";
import {ze} from "./m2452.ts";
import {Pp,Ms} from "../src/config/2273_loggedTmuxCcDisable.ts";
import {$Gi,UGi} from "./m3007.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
import {useTheme} from "./m2274.ts";
import {Box} from "./m2422.ts";
import {NoSelect} from "./m2437.ts";
import {RawAnsi} from "./m2438.ts";
function wMd(e){return Math.max(e.oldStart+e.oldLines-1,e.newStart+e.newLines-1,1).toString().length+3}
function RMd(e,t,n,r,o,s,i,a){let l=MGi();if(!l)return null;let c=a?wMd(e):0,u=c>0&&c<s?c:0,d=`${o}|${s}|${i?1:0}|${u}|${_t.level}|${t??""}|${n}`,p=qGi.get(e),m=p?.get(d);if(m)return m;let f=new l(e,t,n,r).render(o,s,i);if(f===null)return null;let A=null,h=null;if(u>0){A=Array(f.length),h=Array(f.length);for(let _=0;_<f.length;_++){let[y,T]=Qbi(f[_]??"",u);A[_]=y,h[_]=T}}let g={lines:f,gutterWidth:u,gutters:A,contents:h};if(!p)p=new Map,qGi.set(e,p);if(p.size>=4)p.clear();return p.set(d,g),g}
var jGi,aN,WGi,qGi,wae;
var Wnt=b(()=>{cu();e9();ze();Pp();Yve();Txn();$Gi();jGi=M(rt(),1),aN=M(Te(),1),WGi=M(Te(),1),qGi=new WeakMap;wae=WGi.memo(function(t){let n=jGi.c(26),{patch:r,dim:o,filePath:s,firstLine:i,fileContent:a,width:l,skipHighlighting:c}=t,u=c===void 0?!1:c,[d]=useTheme(),m=sy().syntaxHighlightingDisabled??!1,f=Math.max(1,Math.floor(l)),A;if(n[0]!==o||n[1]!==a||n[2]!==s||n[3]!==i||n[4]!==r||n[5]!==f||n[6]!==u||n[7]!==m||n[8]!==d){let v=Ms();A=u||m?null:RMd(r,i,s,a??null,d,f,o,v),n[0]=o,n[1]=a,n[2]=s,n[3]=i,n[4]=r,n[5]=f,n[6]=u,n[7]=m,n[8]=d,n[9]=A}else A=n[9];let h=A;if(!h){let v;if(n[10]!==o||n[11]!==r||n[12]!==l)v=aN.createElement(Box,null,aN.createElement(UGi,{patch:r,dim:o,width:l})),n[10]=o,n[11]=r,n[12]=l,n[13]=v;else v=n[13];return v}let{lines:g,gutterWidth:_,gutters:y,contents:T}=h;if(_>0&&y&&T){let v;if(n[14]!==_||n[15]!==y)v=aN.createElement(NoSelect,{fromLeftEdge:!0},aN.createElement(RawAnsi,{lines:y,width:_})),n[14]=_,n[15]=y,n[16]=v;else v=n[16];let R=f-_,k;if(n[17]!==T||n[18]!==R)k=aN.createElement(RawAnsi,{lines:T,width:R}),n[17]=T,n[18]=R,n[19]=k;else k=n[19];let x;if(n[20]!==v||n[21]!==k)x=aN.createElement(Box,{flexDirection:"row"},v,k),n[20]=v,n[21]=k,n[22]=x;else x=n[22];return x}let S;if(n[23]!==g||n[24]!==f)S=aN.createElement(Box,null,aN.createElement(RawAnsi,{lines:g,width:f})),n[23]=g,n[24]=f,n[25]=S;else S=n[25];return S})});
export {wMd,RMd,jGi,aN,WGi,qGi,wae,Wnt};
