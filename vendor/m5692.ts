// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {Bl,d_} from "./m3354.ts";
import {preInitQueue,di} from "./m2583.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
var o$o={};
ft(o$o,{ThirdPartyModelUpgradeDialog:()=>ThirdPartyModelUpgradeDialog});
function ThirdPartyModelUpgradeDialog(e){let t=Umc.c(27),{tierLabel:n,fromName:r,toName:o,toProviderId:s,onDone:i}=e,a=`Newer ${n} model available`,l;if(t[0]!==i)l=()=>i(!1),t[0]=i,t[1]=l;else l=t[1];let c;if(t[2]!==r)c=HV.jsxs(Text,{children:["Currently pinned: ",HV.jsx(Text,{bold:!0,children:r})]}),t[2]=r,t[3]=c;else c=t[3];let u;if(t[4]!==o)u=HV.jsx(Text,{bold:!0,children:o}),t[4]=o,t[5]=u;else u=t[5];let d;if(t[6]!==s)d=HV.jsxs(Text,{dimColor:!0,children:["(",s,")"]}),t[6]=s,t[7]=d;else d=t[7];let p;if(t[8]!==u||t[9]!==d)p=HV.jsxs(Text,{children:["Latest available: ",u," ",d]}),t[8]=u,t[9]=d,t[10]=p;else p=t[10];let m;if(t[11]!==c||t[12]!==p)m=HV.jsxs(Box,{flexDirection:"column",children:[c,p]}),t[11]=c,t[12]=p,t[13]=m;else m=t[13];let f;if(t[14]===Symbol.for("react.memo_cache_sentinel"))f=HV.jsx(Text,{dimColor:!0,children:"Claude Code will restart to apply."}),t[14]=f;else f=t[14];let h;if(t[15]!==o)h=HV.jsxs(Text,{children:["Update settings to use ",o,"?"," ",f]}),t[15]=o,t[16]=h;else h=t[16];let g;if(t[17]!==i)g=HV.jsx(Bl,{onConfirm:()=>i(!0),onCancel:()=>i(!1)}),t[17]=i,t[18]=g;else g=t[18];let _;if(t[19]!==g||t[20]!==m||t[21]!==h)_=HV.jsxs(Box,{flexDirection:"column",gap:1,children:[m,h,g]}),t[19]=g,t[20]=m,t[21]=h,t[22]=_;else _=t[22];let T;if(t[23]!==a||t[24]!==_||t[25]!==l)T=HV.jsx(preInitQueue,{title:a,color:"permission",onCancel:l,children:_}),t[23]=a,t[24]=_,t[25]=l,t[26]=T;else T=t[26];return T}
var Umc,HV;
var s$o=b(()=>{je();d_();di();Umc=x(tt(),1),HV=x(oe(),1)});
export {o$o,ThirdPartyModelUpgradeDialog,Umc,HV,s$o};
