// @ts-nocheck
import {K1a,Sce} from "./m3981.ts";
import {Ui,Ld} from "./m2459.ts";
import {uOo,LJn} from "./m5345.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function ejl(){let e=dOo.c(5),t=K1a(),{addNotification:n,removeNotification:r}=Ui(),o,s;if(e[0]!==n||e[1]!==r||e[2]!==t)o=()=>{if(t===null){r(Q6l);return}n({key:Q6l,kind:"warning",priority:"immediate",pinned:!0,jsx:sde.createElement(xIm,{warning:t})})},s=[t,n,r],e[0]=n,e[1]=r,e[2]=t,e[3]=o,e[4]=s;else o=e[3],s=e[4];Z6l.useEffect(o,s)}
function xIm(e){let t=dOo.c(9),{warning:n}=e,r=n.type==="deep-link"?"Prompt from an external link":"Pre-filled prompt",o=n.prefillLength>uOo,s;if(t[0]!==o||t[1]!==n.prefillLength)s=o?` (${n.prefillLength.toLocaleString("en-US")} chars)`:"",t[0]=o,t[1]=n.prefillLength,t[2]=s;else s=t[2];let i=o?" \xB7 scroll to review it all before pressing Enter":" \xB7 review before pressing Enter",a;if(t[3]!==i)a=sde.createElement(Text,{dimColor:!0},i),t[3]=i,t[4]=a;else a=t[4];let l;if(t[5]!==r||t[6]!==s||t[7]!==a)l=sde.createElement(sde.Fragment,null,r,s,a),t[5]=r,t[6]=s,t[7]=a,t[8]=l;else l=t[8];return l}
var dOo,sde,Z6l,Q6l="launch-prompt-warning";
var tjl=b(()=>{Ld();ze();LJn();Sce();dOo=M(rt(),1),sde=M(Te(),1),Z6l=M(Te(),1)});
export {ejl,xIm,dOo,sde,Z6l,Q6l,tjl};
