// @ts-nocheck
import {isAgentSwarmsEnabled,lb} from "../src/config/3314_isAgentSwarmsEnabled.ts";
import {getTeammateColor,Op} from "../src/agent/1464_waitForTeammatesToBecomeIdle.ts";
import {__,tL,ix} from "./m3842.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function LBm(){if(!isAgentSwarmsEnabled())return;let e=getTeammateColor();if(!e)return;if(__.includes(e))return tL[e];return}
function SYl(e){let t=VFo.c(3),{isLoading:n,themeColor:r}=e,s=r??void 0,i;if(t[0]!==s||t[1]!==n)i=JGe.jsxs(Text,{"aria-label":"input:",color:s,dimColor:n,children:[Xe.pointer,"\xA0"]}),t[0]=s,t[1]=n,t[2]=i;else i=t[2];return i}
function KFo(e){let t=VFo.c(6),{mode:n,isLoading:r,viewingAgentName:o,viewingAgentColor:s}=e,i;if(t[0]===Symbol.for("react.memo_cache_sentinel"))i=LBm(),t[0]=i;else i=t[0];let a=i,l=s?tL[s]:void 0,c;if(t[1]!==r||t[2]!==n||t[3]!==l||t[4]!==o)c=JGe.jsx(Box,{alignItems:"flex-start",alignSelf:"flex-start",flexWrap:"nowrap",justifyContent:"flex-start",children:o?JGe.jsx(SYl,{isLoading:r,themeColor:l}):n==="bash"?JGe.jsx(Text,{"aria-label":"bash input:",color:"bashBorder",dimColor:r,children:"!\xA0"}):JGe.jsx(SYl,{isLoading:r,themeColor:isAgentSwarmsEnabled()?a:void 0})}),t[1]=r,t[2]=n,t[3]=l,t[4]=o,t[5]=c;else c=t[5];return c}
var VFo,JGe;
var bYl=b(()=>{Zs();je();ix();Op();lb();VFo=x(tt(),1),JGe=x(oe(),1)});
export {LBm,SYl,KFo,VFo,JGe,bYl};
