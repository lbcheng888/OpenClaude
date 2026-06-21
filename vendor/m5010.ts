// @ts-nocheck
import {q0,Khe} from "./m3291.ts";
import {gracefulShutdown,ym} from "../src/config/3332_flushAnalyticsSinks.ts";
import {ykl,Tkl} from "../src/tui/5010_onDone.ts";
import {Akl,hkl} from "../src/tui/5009_items.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function xcm(){return q0(Rcm)??"Goodbye!"}
function LVn(e){let t=Skl.c(11),{showWorktree:n,backgroundItems:r,onDone:o,onCancel:s}=e,i;if(t[0]!==o)i=async function(c){o(c??xcm()),await gracefulShutdown(0,"prompt_input_exit")},t[0]=o,t[1]=i;else i=t[1];let a=i;if(n){let l;if(t[2]!==s||t[3]!==a)l=Owo.default.createElement(ykl,{onDone:a,onCancel:s}),t[2]=s,t[3]=a,t[4]=l;else l=t[4];return l}if(r.length>0){let l;if(t[5]!==a)l=()=>void a(),t[5]=a,t[6]=l;else l=t[6];let c=s??kcm,u;if(t[7]!==r||t[8]!==l||t[9]!==c)u=Owo.default.createElement(Akl,{items:r,onExit:l,onCancel:c}),t[7]=r,t[8]=l,t[9]=c,t[10]=u;else u=t[10];return u}return null}
function kcm(){}
var Skl,Owo,Rcm;
var Lwo=b(()=>{Khe();ym();hkl();Tkl();Skl=M(rt(),1),Owo=M(Te(),1),Rcm=["Goodbye!","See ya!","Bye!","Catch you later!"]});
export {xcm,LVn,kcm,Skl,Owo,Rcm,Lwo};
