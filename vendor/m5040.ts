// @ts-nocheck
import {tx,i_e} from "./m3307.ts";
import {gracefulShutdown,isAmberSentinelEnabled} from "../src/config/3348_flushAnalyticsSinks.ts";
import {BMl,UMl} from "../src/tui/5040_onDone.ts";
import {LMl,MMl} from "../src/telemetry/5039_items.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Uym(){return tx(Bym)??"Goodbye!"}
function wYn(e){let t=$Ml.c(11),{showWorktree:n,backgroundItems:r,onDone:o,onCancel:s}=e,i;if(t[0]!==o)i=async function(c){o(c??Uym()),await gracefulShutdown(0,"prompt_input_exit")},t[0]=o,t[1]=i;else i=t[1];let a=i;if(n){let l;if(t[2]!==s||t[3]!==a)l=z0o.jsx(BMl,{onDone:a,onCancel:s}),t[2]=s,t[3]=a,t[4]=l;else l=t[4];return l}if(r.length>0){let l;if(t[5]!==a)l=()=>void a(),t[5]=a,t[6]=l;else l=t[6];let c=s??$ym,u;if(t[7]!==r||t[8]!==l||t[9]!==c)u=z0o.jsx(LMl,{items:r,onExit:l,onCancel:c}),t[7]=r,t[8]=l,t[9]=c,t[10]=u;else u=t[10];return u}return null}
function $ym(){}
var $Ml,z0o,Bym;
var j0o=b(()=>{i_e();isAmberSentinelEnabled();MMl();UMl();$Ml=x(tt(),1),z0o=x(oe(),1),Bym=["Goodbye!","See ya!","Bye!","Catch you later!"]});
export {Uym,wYn,$ym,$Ml,z0o,Bym,j0o};
