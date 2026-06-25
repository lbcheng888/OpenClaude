// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {gracefulShutdownSync,isAmberSentinelEnabled} from "../src/config/3348_flushAnalyticsSinks.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {Bl,d_} from "./m3354.ts";
import {preInitQueue,di} from "./m2583.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
var Dmc={};
ft(Dmc,{DevChannelsDialog:()=>DevChannelsDialog});
function DevChannelsDialog(e){let t=xmc.c(13),{channels:n,onAccept:r}=e,o;if(t[0]!==r)o=function(f){e:switch(f){case"accept":{r();break e}case"exit":gracefulShutdownSync(1)}},t[0]=r,t[1]=o;else o=t[1];let s=o,i=MKm,a,l;if(t[2]===Symbol.for("react.memo_cache_sentinel"))a=lLe.jsx(Text,{children:"--dangerously-load-development-channels is for local channel development only. Do not use this option to run channels you have downloaded off the internet."}),l=lLe.jsx(Text,{children:"Please use --channels to run a list of approved channels."}),t[2]=a,t[3]=l;else a=t[2],l=t[3];let c;if(t[4]!==n)c=n.map(LKm).join(", "),t[4]=n,t[5]=c;else c=t[5];let u;if(t[6]!==c)u=lLe.jsxs(Box,{flexDirection:"column",gap:1,children:[a,l,lLe.jsxs(Text,{dimColor:!0,children:["Channels:"," ",c]})]}),t[6]=c,t[7]=u;else u=t[7];let d;if(t[8]!==s)d=lLe.jsx(Bl,{confirmLabel:"I am using this for local development",cancelLabel:"Exit",onConfirm:()=>s("accept"),onCancel:()=>s("exit")}),t[8]=s,t[9]=d;else d=t[9];let p;if(t[10]!==u||t[11]!==d)p=lLe.jsxs(preInitQueue,{title:"WARNING: Loading development channels",color:"error",onCancel:i,children:[u,d]}),t[10]=u,t[11]=d,t[12]=p;else p=t[12];return p}
function LKm(e){return e.kind==="plugin"?`plugin:${e.name}@${e.marketplace}`:`server:${e.name}`}
function MKm(){gracefulShutdownSync(0)}
var xmc,lLe;
var Pmc=b(()=>{je();isAmberSentinelEnabled();d_();di();xmc=x(tt(),1),lLe=x(oe(),1)});
export {Dmc,DevChannelsDialog,LKm,MKm,xmc,lLe,Pmc};
