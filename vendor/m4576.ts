// @ts-nocheck
import {getSettingsSchema,Dy,SE} from "./m2559.ts";
import {_r,ui} from "./m2463.ts";
import {Df,TI} from "./m2577.ts";
import {Or,ss} from "./m2553.ts";
import {qm,GI,sP} from "./m4535.ts";
import {aml,iml,lml} from "../src/config/4539_dimColor.ts";
import {xfl,Dfl} from "../src/tui/4561_onClose.ts";
import {Xfl,Qfl} from "./m4567.ts";
import {khl,Dhl} from "./m4575.ts";
import {ku,rS} from "./m2582.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function uPe(e){let t=Phl.c(27),{onClose:n,context:r,defaultTab:o}=e,[s,i]=cPe.useState(o),[a,l]=cPe.useState(!1),[c,u]=cPe.useState(!1),[d,p]=cPe.useState(!1),m=getSettingsSchema(),{rows:f}=Dy(_r()),h=m?f+1:Math.max(15,Math.min(Math.floor(f*0.8),30)),[g]=cPe.useState(wZp);Df();let _;if(t[0]!==n||t[1]!==a)_=()=>{if(a)return;n("Settings dialog dismissed",{display:"system"})},t[0]=n,t[1]=a,t[2]=_;else _=t[2];let T=_,y=!a&&!(s==="Config"&&c)&&!(s==="Gates"&&d)&&s!=="Stats",S;if(t[3]!==y)S={context:"Settings",isActive:y},t[3]=y,t[4]=S;else S=t[4];Or("confirm:no",T,S);let E;if(t[5]!==r||t[6]!==g)E=nJ.jsx(qm,{title:"Status",children:nJ.jsx(aml,{context:r,diagnosticsPromise:g})},"status"),t[5]=r,t[6]=g,t[7]=E;else E=t[7];let R;if(t[8]!==h||t[9]!==r||t[10]!==n)R=nJ.jsx(qm,{title:"Config",children:nJ.jsx(cPe.Suspense,{fallback:null,children:nJ.jsx(xfl,{context:r,onClose:n,setTabsHidden:l,onIsSearchModeChange:u,contentHeight:h})})},"config"),t[8]=h,t[9]=r,t[10]=n,t[11]=R;else R=t[11];let w;if(t[12]===Symbol.for("react.memo_cache_sentinel"))w=nJ.jsx(qm,{title:"Usage",children:nJ.jsx(Xfl,{})},"usage"),t[12]=w;else w=t[12];let H;if(t[13]!==n)H=nJ.jsx(qm,{title:"Stats",children:nJ.jsx(khl,{onClose:n})},"stats"),t[13]=n,t[14]=H;else H=t[14];let k;if(t[15]!==h)k=[],t[15]=h,t[16]=k;else k=t[16];let I;if(t[17]!==E||t[18]!==R||t[19]!==H||t[20]!==k)I=[E,R,w,H,...k],t[17]=E,t[18]=R,t[19]=H,t[20]=k,t[21]=I;else I=t[21];let D=I,O=o!=="Config"&&o!=="Gates",L;if(t[22]!==s||t[23]!==O||t[24]!==D||t[25]!==a)L=nJ.jsx(ku,{color:"permission",children:nJ.jsx(GI,{title:"Settings",color:"permission",selectedTab:s,onTabChange:i,hidden:a,initialHeaderFocused:O,children:D})}),t[22]=s,t[23]=O,t[24]=D,t[25]=a,t[26]=L;else L=t[26];return L}
function wZp(){return iml().catch(kZp)}
function kZp(){return[]}
var Phl,cPe,nJ;
var z8t=b(()=>{ss();TI();ui();SE();rS();sP();lml();Dfl();Qfl();Dhl();Phl=x(tt(),1),cPe=x(et(),1),nJ=x(oe(),1)});
export {uPe,wZp,kZp,Phl,cPe,nJ,z8t};
