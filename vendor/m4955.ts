// @ts-nocheck
import {os} from "../src/api/0465_getOauthConfig.ts";
import {at,Wo} from "./m2557.ts";
import {wl,sy} from "./m2585.ts";
import {preInitQueue,di} from "./m2583.ts";
import {Box} from "./m2432.ts";
import {hr,Ol} from "./m2573.ts";
import {GDl,Cgt} from "./m4951.ts";
import {Sn,lr} from "./m233.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function rPl(e){let t=nPl.c(26),{selectedEvent:n,matchersForSelectedEvent:r,hooksByEventAndMatcher:o,eventDescription:s,onSelect:i,onCancel:a}=e,l;if(t[0]!==o||t[1]!==r||t[2]!==n){let h;if(t[4]!==o||t[5]!==n)h=(g)=>{let _=o[n]?.[g]||[],T=os(_.map(Qhm));return{matcher:g,sources:T,hookCount:_.length}},t[4]=o,t[5]=n,t[6]=h;else h=t[6];l=r.map(h),t[0]=o,t[1]=r,t[2]=n,t[3]=l}else l=t[3];let c=l;if(r.length===0){let h=`${n} - Matchers`,g,_;if(t[7]===Symbol.for("react.memo_cache_sentinel"))g=GWe.jsx(at,{chord:"escape",action:"go back"}),_=GWe.jsx(wl,{hint:"To add hooks, edit settings.json directly or ask Claude",children:"No hooks configured for this event"}),t[7]=g,t[8]=_;else g=t[7],_=t[8];let T;if(t[9]!==s||t[10]!==a||t[11]!==h)T=GWe.jsx(preInitQueue,{title:h,subtitle:s,onCancel:a,inputGuide:g,children:_}),t[9]=s,t[10]=a,t[11]=h,t[12]=T;else T=t[12];return T}let u=`${n} - Matchers`,d;if(t[13]!==c)d=c.map(Xhm),t[13]=c,t[14]=d;else d=t[14];let p;if(t[15]!==i)p=(h)=>{i(h)},t[15]=i,t[16]=p;else p=t[16];let m;if(t[17]!==a||t[18]!==d||t[19]!==p)m=GWe.jsx(Box,{flexDirection:"column",children:GWe.jsx(hr,{options:d,onChange:p,onCancel:a})}),t[17]=a,t[18]=d,t[19]=p,t[20]=m;else m=t[20];let f;if(t[21]!==s||t[22]!==a||t[23]!==u||t[24]!==m)f=GWe.jsx(preInitQueue,{title:u,subtitle:s,onCancel:a,children:m}),t[21]=s,t[22]=a,t[23]=u,t[24]=m,t[25]=f;else f=t[25];return f}
function Xhm(e){let t=e.sources.map(GDl).join(", "),n=e.matcher||"(all)";return{label:`[${t}] ${n}`,value:e.matcher,description:`${e.hookCount} ${Sn(e.hookCount,"hook")}`}}
function Qhm(e){return e.source}
var nPl,GWe;
var oPl=b(()=>{je();Cgt();lr();Ol();di();sy();Wo();nPl=x(tt(),1),GWe=x(oe(),1)});
export {rPl,Xhm,Qhm,nPl,GWe,oPl};
