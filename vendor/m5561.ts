// @ts-nocheck
import {mt,configProtoStore} from "./m2458.ts";
import {fYt,dr} from "./m231.ts";
import {Text} from "./m2423.ts";
import {fQn,MMo} from "./m5560.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function $Zl(e){let t=UZl.c(11),{evaluation:n,onSelect:r,inputValue:o,setInputValue:s,mountDelayMs:i}=e,a=mt(A2m),l;if(t[0]!==n.memory_impact_summary||t[1]!==a){let p=n.memory_impact_summary?.trim();l=p&&!a?fYt(p,f2m):p,t[0]=n.memory_impact_summary,t[1]=a,t[2]=l}else l=t[2];let c=l,u;if(t[3]!==c)u=c?QGt.default.createElement(QGt.default.Fragment,null,c," ",QGt.default.createElement(Text,{dimColor:!0},FZl)):FZl,t[3]=c,t[4]=u;else u=t[4];let d;if(t[5]!==o||t[6]!==i||t[7]!==r||t[8]!==s||t[9]!==u)d=QGt.default.createElement(fQn,{onSelect:r,inputValue:o,setInputValue:s,message:u,messageBold:!1,mountDelayMs:i,showNotSure:!0}),t[5]=o,t[6]=i,t[7]=r,t[8]=s,t[9]=u,t[10]=d;else d=t[10];return d}
function A2m(e){return e.verbose}
var UZl,QGt,FZl="Did this memory help? (optional)",f2m=4;
var qZl=b(()=>{ze();configProtoStore();dr();MMo();UZl=M(rt(),1),QGt=M(Te(),1)});
export {$Zl,A2m,UZl,QGt,FZl,f2m,qZl};
