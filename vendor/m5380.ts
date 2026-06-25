// @ts-nocheck
import {_t,uo} from "./m2468.ts";
import {hgt,WTe} from "./m4890.ts";
import {zdt,e6a,W3n} from "../src/agent/4080_W3n.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function PFo(e){let t=DFo.c(13),{tasksSelected:n,onOpenDialog:r}=e,o=_t($Fm),s;if(t[0]!==o)s=Object.values(o??{}).filter(hgt),t[0]=o,t[1]=s;else s=t[1];let i=s;if(i.length===0)return null;let a;if(t[2]!==i)a=zdt(i),t[2]=i,t[3]=a;else a=t[3];let l;if(t[4]!==r||t[5]!==a||t[6]!==n)l=PSe.jsx(qFm,{selected:n,onClick:r,children:a}),t[4]=r,t[5]=a,t[6]=n,t[7]=l;else l=t[7];let c;if(t[8]!==i)c=e6a(i)&&PSe.jsxs(Text,{dimColor:!0,children:[" \xB7 ",Xe.arrowDown," to view"]}),t[8]=i,t[9]=c;else c=t[9];let u;if(t[10]!==l||t[11]!==c)u=PSe.jsxs(PSe.Fragment,{children:[l,c]}),t[10]=l,t[11]=c,t[12]=u;else u=t[12];return u}
function $Fm(e){return e.tasks}
function qFm(e){let t=DFo.c(8),{selected:n,onClick:r,children:o}=e,[s,i]=Mjl.useState(!1),a=n||s,l;if(t[0]!==o||t[1]!==a)l=PSe.jsx(Text,{color:"background",inverse:a,children:o}),t[0]=o,t[1]=a,t[2]=l;else l=t[2];let c=l;if(!r)return c;let u,d;if(t[3]===Symbol.for("react.memo_cache_sentinel"))u=()=>i(!0),d=()=>i(!1),t[3]=u,t[4]=d;else u=t[3],d=t[4];let p;if(t[5]!==c||t[6]!==r)p=PSe.jsx(Box,{onClick:r,onMouseEnter:u,onMouseLeave:d,children:c}),t[5]=c,t[6]=r,t[7]=p;else p=t[7];return p}
var DFo,Mjl,PSe;
var Njl=b(()=>{Zs();uo();W3n();je();WTe();DFo=x(tt(),1),Mjl=x(et(),1),PSe=x(oe(),1)});
export {PFo,$Fm,qFm,DFo,Mjl,PSe,Njl};
