// @ts-nocheck
import {g4a,yce} from "./m4046.ts";
import {Ci,fd} from "./m2469.ts";
import {HFo,Oer} from "./m5377.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Djl(){let e=IFo.c(5),t=g4a(),{addNotification:n,removeNotification:r}=Ci(),o,s;if(e[0]!==n||e[1]!==r||e[2]!==t)o=()=>{if(t===null){r(Ijl);return}n({key:Ijl,kind:"warning",priority:"immediate",pinned:!0,jsx:YGe.jsx(MFm,{warning:t})})},s=[t,n,r],e[0]=n,e[1]=r,e[2]=t,e[3]=o,e[4]=s;else o=e[3],s=e[4];xjl.useEffect(o,s)}
function MFm(e){let t=IFo.c(9),{warning:n}=e,r=n.type==="deep-link"?"Prompt from an external link":"Pre-filled prompt",o=n.prefillLength>HFo,s;if(t[0]!==o||t[1]!==n.prefillLength)s=o?` (${n.prefillLength.toLocaleString("en-US")} chars)`:"",t[0]=o,t[1]=n.prefillLength,t[2]=s;else s=t[2];let i=o?" \xB7 scroll to review it all before pressing Enter":" \xB7 review before pressing Enter",a;if(t[3]!==i)a=YGe.jsx(Text,{dimColor:!0,children:i}),t[3]=i,t[4]=a;else a=t[4];let l;if(t[5]!==r||t[6]!==s||t[7]!==a)l=YGe.jsxs(YGe.Fragment,{children:[r,s,a]}),t[5]=r,t[6]=s,t[7]=a,t[8]=l;else l=t[8];return l}
var IFo,xjl,YGe,Ijl="launch-prompt-warning";
var Pjl=b(()=>{fd();je();Oer();yce();IFo=x(tt(),1),xjl=x(et(),1),YGe=x(oe(),1)});
export {Djl,MFm,IFo,xjl,YGe,Ijl,Pjl};
