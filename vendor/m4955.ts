// @ts-nocheck
import {Eu} from "./m3812.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {lr,readRoster} from "./m2547.ts";
import {React,CE} from "./m3813.ts";
import {Box} from "./m2422.ts";
import {pr,Yl} from "./m2562.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {$y} from "./m3814.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function uRl(){let e=cRl.c(11),{goNext:t,updateWizardData:n,cancel:r}=Eu(),o;if(e[0]===Symbol.for("react.memo_cache_sentinel"))o={label:"Project (.claude/agents/)",value:"projectSettings"},e[0]=o;else o=e[0];let s;if(e[1]===Symbol.for("react.memo_cache_sentinel"))s=[o,{label:"Personal (~/.claude/agents/)",value:"userSettings"}],e[1]=s;else s=e[1];let i=s,a;if(e[2]===Symbol.for("react.memo_cache_sentinel"))a=tPe.default.createElement(Tn,null,tPe.default.createElement(at,{chord:["up","down"],action:"navigate"}),tPe.default.createElement(at,{chord:"enter",action:"select"}),tPe.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"})),e[2]=a;else a=e[2];let l;if(e[3]!==t||e[4]!==n)l=(d)=>{n({location:d}),t()},e[3]=t,e[4]=n,e[5]=l;else l=e[5];let c;if(e[6]!==r)c=()=>r(),e[6]=r,e[7]=c;else c=e[7];let u;if(e[8]!==l||e[9]!==c)u=tPe.default.createElement(React,{subtitle:"Choose location",footerText:a},tPe.default.createElement(Box,null,tPe.default.createElement(pr,{key:"location-select",options:i,onChange:l,onCancel:c}))),e[8]=l,e[9]=c,e[10]=u;else u=e[10];return u}
var cRl,tPe;
var dRl=b(()=>{ze();readRoster();Yl();zs();rs();$y();CE();cRl=M(rt(),1),tPe=M(Te(),1)});
export {uRl,cRl,tPe,dRl};
