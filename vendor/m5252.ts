// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {pr} from "./m2562.ts";
import {Kn,Li} from "./m2572.ts";
import {getBaseRenderOptions,zee} from "../src/telemetry/3356_getBaseRenderOptions.ts";
import {render,ze} from "./m2452.ts";
import {AppStateProvider,Jq} from "./m3354.ts";
import {KeybindingSetup,xW} from "./m3346.ts";
import {ySe,Le,Xt} from "../src/config/0228_encoding.ts";
import {yb} from "./m4521.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var Q$l={};
isFullscreenWithTTY(Q$l,{showInvalidConfigDialog:()=>showInvalidConfigDialog});
function Wwm(e){let t=X$l.c(19),{filePath:n,errorDescription:r,onExit:o,onReset:s}=e,i;if(t[0]!==o||t[1]!==s)i=(A)=>{if(A==="exit")o();else s()},t[0]=o,t[1]=s,t[2]=i;else i=t[2];let a=i,l;if(t[3]!==n)l=KJ.default.createElement(Text,null,"The configuration file at ",KJ.default.createElement(Text,{bold:!0},n)," contains invalid JSON."),t[3]=n,t[4]=l;else l=t[4];let c;if(t[5]!==r)c=KJ.default.createElement(Text,null,r),t[5]=r,t[6]=c;else c=t[6];let u;if(t[7]!==l||t[8]!==c)u=KJ.default.createElement(Box,{flexDirection:"column",gap:1},l,c),t[7]=l,t[8]=c,t[9]=u;else u=t[9];let d;if(t[10]===Symbol.for("react.memo_cache_sentinel"))d=KJ.default.createElement(Text,{bold:!0},"Choose an option:"),t[10]=d;else d=t[10];let p;if(t[11]===Symbol.for("react.memo_cache_sentinel"))p=[{label:"Exit and fix manually",value:"exit"},{label:"Reset with default configuration",value:"reset"}],t[11]=p;else p=t[11];let m;if(t[12]!==a||t[13]!==o)m=KJ.default.createElement(Box,{flexDirection:"column"},d,KJ.default.createElement(pr,{options:p,onChange:a,onCancel:o})),t[12]=a,t[13]=o,t[14]=m;else m=t[14];let f;if(t[15]!==o||t[16]!==u||t[17]!==m)f=KJ.default.createElement(Kn,{title:"Configuration error",color:"error",onCancel:o},u,m),t[15]=o,t[16]=u,t[17]=m,t[18]=f;else f=t[18];return f}
async function showInvalidConfigDialog({error:e}){let t={...getBaseRenderOptions(!1),theme:Gwm};await new Promise(async(n)=>{let{unmount:r}=await render(KJ.default.createElement(AppStateProvider,null,KJ.default.createElement(KeybindingSetup,null,KJ.default.createElement(Wwm,{filePath:e.filePath,errorDescription:e.message,onExit:()=>{r(),n(),process.exit(1)},onReset:()=>{ySe(e.filePath,Le(e.defaultConfig,null,2),{flush:!1,encoding:"utf8"}),r(),n(),process.exit(0)}}))),t)})}
var X$l,KJ,Gwm="dark";
var Z$l=b(()=>{ze();xW();Jq();zee();Xt();yb();Li();X$l=M(rt(),1),KJ=M(Te(),1)});
export {Q$l,Wwm,showInvalidConfigDialog,X$l,KJ,Gwm,Z$l};
