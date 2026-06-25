// @ts-nocheck
import {I3n,cmo} from "./m4051.ts";
import {Git,rOn} from "./m3300.ts";
import {sl,UB} from "../src/tools/4381_isSearch.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function _Vl({isNonInteractive:e,isMeta:t,callerSource:n}){if(e)return"sdk";if(t)return"system";return n??"typed"}
function r7t(e){let t=yVl.c(8),{input:n,progress:r,verbose:o}=e,s=`<bash-input>${n}</bash-input>`,i;if(t[0]!==s)i=n7t.jsx(I3n,{addMargin:!1,param:{text:s,type:"text"}}),t[0]=s,t[1]=i;else i=t[1];let a;if(t[2]!==r||t[3]!==o)a=r?n7t.jsx(Git,{fullOutput:r.fullOutput,output:r.output,elapsedTimeSeconds:r.elapsedTimeSeconds,totalLines:r.totalLines,verbose:o}):sl.renderToolUseProgressMessage?.([],{verbose:o,tools:[],terminalSize:void 0}),t[2]=r,t[3]=o,t[4]=a;else a=t[4];let l;if(t[5]!==i||t[6]!==a)l=n7t.jsxs(Box,{flexDirection:"column",marginTop:1,children:[i,a]}),t[5]=i,t[6]=a,t[7]=l;else l=t[7];return l}
var yVl,n7t;
var aNo=b(()=>{je();UB();cmo();rOn();yVl=x(tt(),1),n7t=x(oe(),1)});
export {_Vl,r7t,yVl,n7t,aNo};
