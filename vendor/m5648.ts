// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {gracefulShutdownSync,ym} from "../src/config/3332_flushAnalyticsSinks.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {ac,e_} from "./m3338.ts";
import {Kn,Li} from "./m2572.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var Noc={};
isFullscreenWithTTY(Noc,{DevChannelsDialog:()=>DevChannelsDialog});
function DevChannelsDialog(e){let t=Moc.c(13),{channels:n,onAccept:r}=e,o;if(t[0]!==r)o=function(f){e:switch(f){case"accept":{r();break e}case"exit":gracefulShutdownSync(1)}},t[0]=r,t[1]=o;else o=t[1];let s=o,i=J9m,a,l;if(t[2]===Symbol.for("react.memo_cache_sentinel"))a=x5e.default.createElement(Text,null,"--dangerously-load-development-channels is for local channel development only. Do not use this option to run channels you have downloaded off the internet."),l=x5e.default.createElement(Text,null,"Please use --channels to run a list of approved channels."),t[2]=a,t[3]=l;else a=t[2],l=t[3];let c;if(t[4]!==n)c=n.map(Y9m).join(", "),t[4]=n,t[5]=c;else c=t[5];let u;if(t[6]!==c)u=x5e.default.createElement(Box,{flexDirection:"column",gap:1},a,l,x5e.default.createElement(Text,{dimColor:!0},"Channels:"," ",c)),t[6]=c,t[7]=u;else u=t[7];let d;if(t[8]!==s)d=x5e.default.createElement(ac,{confirmLabel:"I am using this for local development",cancelLabel:"Exit",onConfirm:()=>s("accept"),onCancel:()=>s("exit")}),t[8]=s,t[9]=d;else d=t[9];let p;if(t[10]!==u||t[11]!==d)p=x5e.default.createElement(Kn,{title:"WARNING: Loading development channels",color:"error",onCancel:i},u,d),t[10]=u,t[11]=d,t[12]=p;else p=t[12];return p}
function Y9m(e){return e.kind==="plugin"?`plugin:${e.name}@${e.marketplace}`:`server:${e.name}`}
function J9m(){gracefulShutdownSync(0)}
var Moc,x5e;
var Boc=b(()=>{ze();ym();e_();Li();Moc=M(rt(),1),x5e=M(Te(),1)});
export {Noc,DevChannelsDialog,Y9m,J9m,Moc,x5e,Boc};
