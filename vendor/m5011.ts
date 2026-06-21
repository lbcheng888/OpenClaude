// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {q0,Khe} from "./m3291.ts";
import {_i,hp} from "../src/session/1460_promise.ts";
import {K_e,Qqt} from "./m4494.ts";
import {getCurrentWorktreeSession,gracefulShutdown,ym} from "../src/config/3332_flushAnalyticsSinks.ts";
import {r8n,Lpt} from "../src/agent/4492_label.ts";
import {LVn,Lwo} from "./m5010.ts";
import {hI} from "../src/session/5172_worktreeBranchName.ts";
import {Te} from "./m2253.ts";
var bkl={};
isFullscreenWithTTY(bkl,{call:()=>Dcm});
function Icm(){return q0(Hcm)??"Goodbye!"}
async function Dcm(e){if(_i())return e(),K_e(),null;let t=getCurrentWorktreeSession()!==null,n=r8n();if(t||n.length>0)return Mwo.createElement(LVn,{showWorktree:t,backgroundItems:n,onDone:e,onCancel:()=>e()});return e(Icm()),await gracefulShutdown(0,"prompt_input_exit"),null}
var Mwo,Hcm;
var Ekl=b(()=>{Khe();Lwo();Qqt();hp();Lpt();ym();hI();Mwo=M(Te(),1),Hcm=["Goodbye!","See ya!","Bye!","Catch you later!"]});
export {bkl,Icm,Dcm,Mwo,Hcm,Ekl};
