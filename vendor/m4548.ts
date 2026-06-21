// @ts-nocheck
import {eb,My,pE} from "./m2548.ts";
import {mr,ki} from "./m2453.ts";
import {xA,jH} from "./m2566.ts";
import {Or,Ts} from "./m2542.ts";
import {wf,_I,$P} from "./m4515.ts";
import {yil,_il,Til} from "../src/tui/4519_dimColor.ts";
import {sal,ial} from "../src/tui/4535_onClose.ts";
import {Eal,Cal} from "./m4539.ts";
import {Xal,tll} from "./m4547.ts";
import {Wu,lS} from "./m2571.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function dDe(e){let t=nll.c(27),{onClose:n,context:r,defaultTab:o}=e,[s,i]=uDe.useState(o),[a,l]=uDe.useState(!1),[c,u]=uDe.useState(!1),[d,p]=uDe.useState(!1),m=eb(),{rows:f}=My(mr()),A=m?f+1:Math.max(15,Math.min(Math.floor(f*0.8),30)),[h]=uDe.useState(EGp);xA();let g;if(t[0]!==n||t[1]!==a)g=()=>{if(a)return;n("Settings dialog dismissed",{display:"system"})},t[0]=n,t[1]=a,t[2]=g;else g=t[2];let _=g,y=!a&&!(s==="Config"&&c)&&!(s==="Gates"&&d)&&s!=="Stats",T;if(t[3]!==y)T={context:"Settings",isActive:y},t[3]=y,t[4]=T;else T=t[4];Or("confirm:no",_,T);let S;if(t[5]!==r||t[6]!==h)S=kx.createElement(wf,{key:"status",title:"Status"},kx.createElement(yil,{context:r,diagnosticsPromise:h})),t[5]=r,t[6]=h,t[7]=S;else S=t[7];let v;if(t[8]!==A||t[9]!==r||t[10]!==n)v=kx.createElement(wf,{key:"config",title:"Config"},kx.createElement(uDe.Suspense,{fallback:null},kx.createElement(sal,{context:r,onClose:n,setTabsHidden:l,onIsSearchModeChange:u,contentHeight:A}))),t[8]=A,t[9]=r,t[10]=n,t[11]=v;else v=t[11];let R;if(t[12]===Symbol.for("react.memo_cache_sentinel"))R=kx.createElement(wf,{key:"usage",title:"Usage"},kx.createElement(Eal,null)),t[12]=R;else R=t[12];let k;if(t[13]!==n)k=kx.createElement(wf,{key:"stats",title:"Stats"},kx.createElement(Xal,{onClose:n})),t[13]=n,t[14]=k;else k=t[14];let x;if(t[15]!==A)x=[],t[15]=A,t[16]=x;else x=t[16];let H;if(t[17]!==S||t[18]!==v||t[19]!==k||t[20]!==x)H=[S,v,R,k,...x],t[17]=S,t[18]=v,t[19]=k,t[20]=x,t[21]=H;else H=t[21];let I=H,P=o!=="Config"&&o!=="Gates",L;if(t[22]!==s||t[23]!==P||t[24]!==I||t[25]!==a)L=kx.createElement(Wu,{color:"permission"},kx.createElement(_I,{title:"Settings",color:"permission",selectedTab:s,onTabChange:i,hidden:a,initialHeaderFocused:P},I)),t[22]=s,t[23]=P,t[24]=I,t[25]=a,t[26]=L;else L=t[26];return L}
function EGp(){return _il().catch(CGp)}
function CGp(){return[]}
var nll,kx,uDe;
var y6t=b(()=>{Ts();jH();ki();pE();lS();$P();Til();ial();Cal();tll();nll=M(rt(),1),kx=M(Te(),1),uDe=M(Te(),1)});
export {dDe,EGp,CGp,nll,kx,uDe,y6t};
