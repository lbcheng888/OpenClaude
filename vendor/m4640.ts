// @ts-nocheck
import {_r,ui} from "./m2463.ts";
import {Dy,SE} from "./m2559.ts";
import {Or,ss} from "./m2553.ts";
import {Df,TI} from "./m2577.ts";
import {wu,$k} from "../src/tui/2575_current.ts";
import {qm,GI,sP} from "./m4535.ts";
import {Eyl,Cyl} from "./m4639.ts";
import {Svo,yyl} from "./m4637.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Link} from "./m2437.ts";
import {ku,rS} from "./m2582.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Ryl(e){let t=Ayl.c(44),{onClose:n,commands:r}=e,o=_r(),{rows:s,columns:i}=Dy(o),a=s,l=o.rows>=Unm,c;if(t[0]!==n)c=()=>n("Help dialog dismissed",{display:"system"}),t[0]=n,t[1]=c;else c=t[1];let u=c,d;if(t[2]===Symbol.for("react.memo_cache_sentinel"))d={context:"Help"},t[2]=d;else d=t[2];Or("help:dismiss",u,d);let p=Df(u),m=wu("help:dismiss","Help","esc"),f=$nm,h;if(t[3]!==r){let O;if(t[5]===Symbol.for("react.memo_cache_sentinel"))O=(L)=>f(L)&&!L.isHidden,t[5]=O;else O=t[5];h=r.filter(O),t[3]=r,t[4]=h}else h=t[4];let g=h,_;if(t[6]===Symbol.for("react.memo_cache_sentinel"))_=[],t[6]=_;else _=t[6];let T=_,y;if(t[7]!==r){let O;if(t[9]===Symbol.for("react.memo_cache_sentinel"))O=(L)=>!f(L)&&!L.isHidden,t[9]=O;else O=t[9];y=r.filter(O),t[7]=r,t[8]=y}else y=t[8];let S=y,E;if(t[10]===Symbol.for("react.memo_cache_sentinel"))E=wH.jsx(qm,{id:"general",title:"General",children:wH.jsx(Eyl,{})},"general"),t[10]=E;else E=t[10];let R;if(t[11]!==g||t[12]!==u||t[13]!==i||t[14]!==S||t[15]!==a){R=[E];let O;if(t[17]!==g||t[18]!==u||t[19]!==i||t[20]!==a)O=wH.jsx(qm,{id:"commands",title:"Commands",children:wH.jsx(Svo,{commands:g,maxHeight:a,columns:i,title:"Browse default commands",onCancel:u})},"commands"),t[17]=g,t[18]=u,t[19]=i,t[20]=a,t[21]=O;else O=t[21];R.push(O);let L;if(t[22]!==u||t[23]!==i||t[24]!==S||t[25]!==a)L=wH.jsx(qm,{id:"custom",title:"Custom commands",children:wH.jsx(Svo,{commands:S,maxHeight:a,columns:i,title:"Browse custom commands",emptyMessage:"No custom commands found",onCancel:u})},"custom"),t[22]=u,t[23]=i,t[24]=S,t[25]=a,t[26]=L;else L=t[26];R.push(L),t[11]=g,t[12]=u,t[13]=i,t[14]=S,t[15]=a,t[16]=R}else R=t[16];let w;if(t[31]!==R)w=wH.jsx(GI,{title:"Help",color:"professionalBlue",defaultTab:"general",children:R}),t[31]=R,t[32]=w;else w=t[32];let H;if(t[33]===Symbol.for("react.memo_cache_sentinel"))H=wH.jsx(Box,{marginTop:1,flexShrink:0,children:wH.jsxs(Text,{children:["For more help:"," ",wH.jsx(Link,{url:"https://code.claude.com/docs/en/overview"})]})}),t[33]=H;else H=t[33];let k;if(t[34]!==l)k=l&&wH.jsx(Box,{marginTop:1,flexShrink:0,children:wH.jsx(Text,{dimColor:!0,children:"Something else? Use /feedback to report bugs or request features."})}),t[34]=l,t[35]=k;else k=t[35];let I;if(t[36]!==m||t[37]!==p.keyName||t[38]!==p.pending)I=wH.jsx(Box,{marginTop:1,flexShrink:0,children:wH.jsx(Text,{dimColor:!0,children:p.pending?wH.jsxs(wH.Fragment,{children:["Press ",p.keyName," again to exit"]}):wH.jsxs(Text,{italic:!0,children:[m," to cancel"]})})}),t[36]=m,t[37]=p.keyName,t[38]=p.pending,t[39]=I;else I=t[39];let D;if(t[40]!==I||t[41]!==w||t[42]!==k)D=wH.jsx(Box,{flexDirection:"column",children:wH.jsxs(ku,{color:"professionalBlue",children:[w,H,k,I]})}),t[40]=I,t[41]=w,t[42]=k,t[43]=D;else D=t[43];return D}
function $nm(e){return e.type!=="prompt"||e.source==="builtin"||e.source==="bundled"}
var Ayl,wH,Unm=44;
var vyl=b(()=>{TI();$k();SE();ui();je();ss();rS();sP();yyl();Cyl();Ayl=x(tt(),1),wH=x(oe(),1)});
export {Ryl,$nm,Ayl,wH,Unm,vyl};
