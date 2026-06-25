// @ts-nocheck
import {ffa,Zae} from "./m3309.ts";
import {_r,ui} from "./m2463.ts";
import {useInterval} from "./m2456.ts";
import {Box} from "./m2432.ts";
import {zlo,jlo} from "../src/tui/3852_toolWindowStart.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function pXl(e){let t=uXl.c(3),{agentId:n}=e,r=ffa(n),{columns:o}=_r(),[,s]=dXl.useReducer(l2m,0);if(useInterval(s,r?1000:null),r===null)return null;let i;if(t[0]!==o||t[1]!==r)i=yBo.jsx(Box,{flexDirection:"row",marginTop:1,width:"100%",children:yBo.jsx(zlo,{status:r,columns:o})}),t[0]=o,t[1]=r,t[2]=i;else i=t[2];return i}
function l2m(e){return e+1}
var uXl,dXl,yBo;
var mXl=b(()=>{jlo();Zae();ui();je();uXl=x(tt(),1),dXl=x(et(),1),yBo=x(oe(),1)});
export {pXl,l2m,uXl,dXl,yBo,mXl};
