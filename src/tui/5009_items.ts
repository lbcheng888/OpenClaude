// @ts-nocheck
import {logEvent,Ct} from "../../vendor/m131.ts";
import {mr,ki} from "../../vendor/m2453.ts";
import {My,eb,pE} from "../../vendor/m2548.ts";
import {TZ,Pp} from "../config/2273_loggedTmuxCcDisable.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {Box} from "../../vendor/m2422.ts";
import {initModule,Oz} from "../../vendor/m2799.ts";
import {pr,Yl} from "../../vendor/m2562.ts";
import {Text} from "../../vendor/m2423.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function Akl(e){let t=fkl.c(42),{items:n,onExit:r,onCancel:o}=e,s;if(t[0]!==n.length)s=function($){logEvent("tengu_exit_background_work_prompt",{item_count:n.length,chose_exit:$==="exit"})},t[0]=n.length,t[1]=s;else s=t[1];let i=s,a;if(t[2]!==i||t[3]!==o||t[4]!==r)a=function($){switch(i($),$){case"exit":return r();case"stay":return o()}},t[2]=i,t[3]=o,t[4]=r,t[5]=a;else a=t[5];let l=a,c;if(t[6]!==i||t[7]!==o)c=function(){i("stay"),o()},t[6]=i,t[7]=o,t[8]=c;else c=t[8];let u=c,d=mr(),{rows:p}=My(d),m=eb(),f;if(t[9]!==m||t[10]!==p)f=!m&&TZ()?Math.floor(p/2):p,t[9]=m,t[10]=p,t[11]=f;else f=t[11];let h=Math.max(1,f-12),g,_,y,T,S,v,R,k;if(t[12]!==u||t[13]!==n||t[14]!==h){let O=n.slice(0,h);_=Kn,R="Background work is running",k="The following will stop when you exit:",y=u,g=Box,T="column",S=0,v=O.map(Ccm),t[12]=u,t[13]=n,t[14]=h,t[15]=g,t[16]=_,t[17]=y,t[18]=T,t[19]=S,t[20]=v,t[21]=R,t[22]=k}else g=t[15],_=t[16],y=t[17],T=t[18],S=t[19],v=t[20],R=t[21],k=t[22];let x=n.length-h,H;if(t[23]!==x)H=sPe.default.createElement(initModule,{count:x,unit:"item"}),t[23]=x,t[24]=H;else H=t[24];let I;if(t[25]!==g||t[26]!==H||t[27]!==T||t[28]!==S||t[29]!==v)I=sPe.default.createElement(g,{flexDirection:T,gap:S},v,H),t[25]=g,t[26]=H,t[27]=T,t[28]=S,t[29]=v,t[30]=I;else I=t[30];let P;if(t[31]===Symbol.for("react.memo_cache_sentinel"))P={label:"Exit anyway",value:"exit"},t[31]=P;else P=t[31];let L;if(t[32]===Symbol.for("react.memo_cache_sentinel"))L=[P,{label:"Stay",value:"stay"}],t[32]=L;else L=t[32];let D;if(t[33]!==l)D=sPe.default.createElement(pr,{options:L,onChange:l}),t[33]=l,t[34]=D;else D=t[34];let N;if(t[35]!==_||t[36]!==y||t[37]!==I||t[38]!==D||t[39]!==R||t[40]!==k)N=sPe.default.createElement(_,{title:R,subtitle:k,onCancel:y},I,D),t[35]=_,t[36]=y,t[37]=I,t[38]=D,t[39]=R,t[40]=k,t[41]=N;else N=t[41];return N}
function Ccm(e,t){return sPe.default.createElement(Box,{key:t,flexDirection:"row"},sPe.default.createElement(Text,{bold:!0},e.label),e.detail?sPe.default.createElement(Text,{dimColor:!0}," \xB7 ",e.detail):null)}
var fkl,sPe;
var hkl=b(()=>{pE();ki();ze();Ct();Pp();Yl();Li();Oz();fkl=M(rt(),1),sPe=M(Te(),1)});
export {Akl,Ccm,fkl,sPe,hkl};
