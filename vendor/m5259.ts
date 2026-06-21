// @ts-nocheck
import {VUn,vao} from "./m3986.ts";
import {Got,p0n} from "./m3284.ts";
import {Rl,TU} from "../src/tui/4359_isSearch.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function h9l({isNonInteractive:e,isMeta:t,callerSource:n}){if(e)return"sdk";if(t)return"system";return n??"typed"}
function wWt(e){let t=g9l.c(8),{input:n,progress:r,verbose:o}=e,s=`<bash-input>${n}</bash-input>`,i;if(t[0]!==s)i=EYn.default.createElement(VUn,{addMargin:!1,param:{text:s,type:"text"}}),t[0]=s,t[1]=i;else i=t[1];let a;if(t[2]!==r||t[3]!==o)a=r?EYn.default.createElement(Got,{fullOutput:r.fullOutput,output:r.output,elapsedTimeSeconds:r.elapsedTimeSeconds,totalLines:r.totalLines,verbose:o}):Rl.renderToolUseProgressMessage?.([],{verbose:o,tools:[],terminalSize:void 0}),t[2]=r,t[3]=o,t[4]=a;else a=t[4];let l;if(t[5]!==i||t[6]!==a)l=EYn.default.createElement(Box,{flexDirection:"column",marginTop:1},i,a),t[5]=i,t[6]=a,t[7]=l;else l=t[7];return l}
var g9l,EYn;
var LDo=b(()=>{ze();TU();vao();p0n();g9l=M(rt(),1),EYn=M(Te(),1)});
export {h9l,wWt,g9l,EYn,LDo};
