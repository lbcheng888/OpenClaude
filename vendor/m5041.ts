// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {tx,i_e} from "./m3307.ts";
import {Ws,vd} from "../src/session/1465_promise.ts";
import {hTe,R8t} from "./m4516.ts";
import {getCurrentWorktreeSession,gracefulShutdown,isAmberSentinelEnabled} from "../src/config/3348_flushAnalyticsSinks.ts";
import {AVn,Mft} from "../src/agent/4514_label.ts";
import {wYn,j0o} from "./m5040.ts";
import {qI} from "../src/session/5205_worktreeBranchName.ts";
import {oe} from "./m2275.ts";
var qMl={};
ft(qMl,{call:()=>Gym});
function Wym(){return tx(qym)??"Goodbye!"}
async function Gym(e){if(Ws())return e(),hTe(),null;let t=getCurrentWorktreeSession()!==null,n=AVn();if(t||n.length>0)return WMl.jsx(wYn,{showWorktree:t,backgroundItems:n,onDone:e,onCancel:()=>e()});return e(Wym()),await gracefulShutdown(0,"prompt_input_exit"),null}
var WMl,qym;
var GMl=b(()=>{i_e();j0o();R8t();vd();Mft();isAmberSentinelEnabled();qI();WMl=x(oe(),1),qym=["Goodbye!","See ya!","Bye!","Catch you later!"]});
export {qMl,Wym,Gym,WMl,qym,GMl};
