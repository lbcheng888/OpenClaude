// @ts-nocheck
import {Eu} from "./m3812.ts";
import {at,rs} from "./m2546.ts";
import {Tn,zs} from "./m2554.ts";
import {lr,readRoster} from "./m2547.ts";
import {React,CE} from "./m3813.ts";
import {CVn,lwo} from "./m4944.ts";
import {b,M} from "../runtime.ts";
import {$y} from "./m3814.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function vRl(e){let t=CRl.c(10),{tools:n}=e,{goNext:r,goBack:o,updateWizardData:s,wizardData:i}=Eu(),a;if(t[0]!==r||t[1]!==s)a=(m)=>{s({selectedTools:m}),r()},t[0]=r,t[1]=s,t[2]=a;else a=t[2];let l=a,c=i.selectedTools,u;if(t[3]===Symbol.for("react.memo_cache_sentinel"))u=l8e.default.createElement(at,{chord:"enter",action:"toggle selection"}),t[3]=u;else u=t[3];let d;if(t[4]===Symbol.for("react.memo_cache_sentinel"))d=l8e.default.createElement(Tn,null,u,l8e.default.createElement(at,{chord:["up","down"],action:"navigate"}),l8e.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"go back"})),t[4]=d;else d=t[4];let p;if(t[5]!==o||t[6]!==l||t[7]!==c||t[8]!==n)p=l8e.default.createElement(React,{subtitle:"Select tools",footerText:d},l8e.default.createElement(CVn,{tools:n,initialTools:c,onComplete:l,onCancel:o})),t[5]=o,t[6]=l,t[7]=c,t[8]=n,t[9]=p;else p=t[9];return p}
var CRl,l8e;
var wRl=b(()=>{readRoster();zs();rs();$y();CE();lwo();CRl=M(rt(),1),l8e=M(Te(),1)});
export {vRl,CRl,l8e,wRl};
