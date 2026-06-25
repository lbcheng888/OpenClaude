// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {hr} from "./m2573.ts";
import {preInitQueue,di} from "./m2583.ts";
import {getBaseRenderOptions,qee} from "../src/telemetry/3372_getBaseRenderOptions.ts";
import {render,je} from "./m2462.ts";
import {AppStateProvider,pq} from "./m3370.ts";
import {KeybindingSetup,WW} from "./m3362.ts";
import {eEe,TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {TS} from "./m4541.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
var QGl={};
ft(QGl,{showInvalidConfigDialog:()=>showInvalidConfigDialog});
function yLm(e){let t=XGl.c(19),{filePath:n,errorDescription:r,onExit:o,onReset:s}=e,i;if(t[0]!==o||t[1]!==s)i=(h)=>{if(h==="exit")o();else s()},t[0]=o,t[1]=s,t[2]=i;else i=t[2];let a=i,l;if(t[3]!==n)l=fV.jsxs(Text,{children:["The configuration file at ",fV.jsx(Text,{bold:!0,children:n})," contains invalid JSON."]}),t[3]=n,t[4]=l;else l=t[4];let c;if(t[5]!==r)c=fV.jsx(Text,{children:r}),t[5]=r,t[6]=c;else c=t[6];let u;if(t[7]!==l||t[8]!==c)u=fV.jsxs(Box,{flexDirection:"column",gap:1,children:[l,c]}),t[7]=l,t[8]=c,t[9]=u;else u=t[9];let d;if(t[10]===Symbol.for("react.memo_cache_sentinel"))d=fV.jsx(Text,{bold:!0,children:"Choose an option:"}),t[10]=d;else d=t[10];let p;if(t[11]===Symbol.for("react.memo_cache_sentinel"))p=[{label:"Exit and fix manually",value:"exit"},{label:"Reset with default configuration",value:"reset"}],t[11]=p;else p=t[11];let m;if(t[12]!==a||t[13]!==o)m=fV.jsxs(Box,{flexDirection:"column",children:[d,fV.jsx(hr,{options:p,onChange:a,onCancel:o})]}),t[12]=a,t[13]=o,t[14]=m;else m=t[14];let f;if(t[15]!==o||t[16]!==u||t[17]!==m)f=fV.jsxs(preInitQueue,{title:"Configuration error",color:"error",onCancel:o,children:[u,m]}),t[15]=o,t[16]=u,t[17]=m,t[18]=f;else f=t[18];return f}
async function showInvalidConfigDialog({error:e}){let t={...getBaseRenderOptions(!1),theme:TLm};await new Promise(async(n)=>{let{unmount:r}=await render(fV.jsx(AppStateProvider,{children:fV.jsx(KeybindingSetup,{children:fV.jsx(yLm,{filePath:e.filePath,errorDescription:e.message,onExit:()=>{r(),n(),process.exit(1)},onReset:()=>{eEe(e.filePath,TeamDeleteToolName(e.defaultConfig,null,2),{flush:!1,encoding:"utf8"}),r(),n(),process.exit(0)}})})}),t)})}
var XGl,fV,TLm="dark";
var ZGl=b(()=>{je();WW();pq();qee();tn();TS();di();XGl=x(tt(),1),fV=x(oe(),1)});
export {QGl,yLm,showInvalidConfigDialog,XGl,fV,TLm,ZGl};
