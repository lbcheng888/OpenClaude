// @ts-nocheck
import {isAgentSwarmsEnabled,cb} from "../src/config/3298_isAgentSwarmsEnabled.ts";
import {getTeammateColor,Am} from "../src/agent/1459_waitForTeammatesToBecomeIdle.ts";
import {i_,NL,K0} from "./m3824.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function R0m(){if(!isAgentSwarmsEnabled())return;let e=getTeammateColor();if(!e)return;if(i_.includes(e))return NL[e];return}
function Bjl(e){let t=wOo.c(3),{isLoading:n,themeColor:r}=e,s=r??void 0,i;if(t[0]!==s||t[1]!==n)i=Xne.createElement(Text,{"aria-label":"input:",color:s,dimColor:n},et.pointer,"\xA0"),t[0]=s,t[1]=n,t[2]=i;else i=t[2];return i}
function ROo(e){let t=wOo.c(6),{mode:n,isLoading:r,viewingAgentName:o,viewingAgentColor:s}=e,i;if(t[0]===Symbol.for("react.memo_cache_sentinel"))i=R0m(),t[0]=i;else i=t[0];let a=i,l=s?NL[s]:void 0,c;if(t[1]!==r||t[2]!==n||t[3]!==l||t[4]!==o)c=Xne.createElement(Box,{alignItems:"flex-start",alignSelf:"flex-start",flexWrap:"nowrap",justifyContent:"flex-start"},o?Xne.createElement(Bjl,{isLoading:r,themeColor:l}):n==="bash"?Xne.createElement(Text,{"aria-label":"bash input:",color:"bashBorder",dimColor:r},"!\xA0"):Xne.createElement(Bjl,{isLoading:r,themeColor:isAgentSwarmsEnabled()?a:void 0})),t[1]=r,t[2]=n,t[3]=l,t[4]=o,t[5]=c;else c=t[5];return c}
var wOo,Xne;
var Fjl=b(()=>{Ai();ze();K0();Am();cb();wOo=M(rt(),1),Xne=M(Te(),1)});
export {R0m,Bjl,ROo,wOo,Xne,Fjl};
