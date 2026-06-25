// @ts-nocheck
import {_t,uo} from "./m2468.ts";
import {zXt,lr} from "./m233.ts";
import {Text} from "./m2433.ts";
import {_nr,s2o} from "./m5598.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Hlc(e){let t=klc.c(11),{evaluation:n,onSelect:r,inputValue:o,setInputValue:s,mountDelayMs:i}=e,a=_t(zWm),l;if(t[0]!==n.memory_impact_summary||t[1]!==a){let p=n.memory_impact_summary?.trim();l=p&&!a?zXt(p,KWm):p,t[0]=n.memory_impact_summary,t[1]=a,t[2]=l}else l=t[2];let c=l,u;if(t[3]!==c)u=c?dVe.jsxs(dVe.Fragment,{children:[c," ",dVe.jsx(Text,{dimColor:!0,children:wlc})]}):wlc,t[3]=c,t[4]=u;else u=t[4];let d;if(t[5]!==o||t[6]!==i||t[7]!==r||t[8]!==s||t[9]!==u)d=dVe.jsx(_nr,{onSelect:r,inputValue:o,setInputValue:s,message:u,messageBold:!1,mountDelayMs:i,showNotSure:!0}),t[5]=o,t[6]=i,t[7]=r,t[8]=s,t[9]=u,t[10]=d;else d=t[10];return d}
function zWm(e){return e.verbose}
var klc,dVe,wlc="Did this memory help? (optional)",KWm=4;
var Ilc=b(()=>{je();uo();lr();s2o();klc=x(tt(),1),dVe=x(oe(),1)});
export {Hlc,zWm,klc,dVe,wlc,KWm,Ilc};
