// @ts-nocheck
import {Dna,nzr,rzr} from "../src/computer-use/3209_flag.ts";
import {mzr,Jna} from "../src/computer-use/3215_unhideComputerUseApps.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {z7} from "../src/session/1460_promise.ts";
import {Nhe} from "../src/tui/3217_computerUseMcpState.ts";
import {qna,QHn} from "./m3211.ts";
import {Oe,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {b} from "../runtime.ts";
async function*N6e(e){let n=e.getAppState().computerUseMcpState?.hiddenDuringTurn,r=!!(n&&n.size>0),o=Dna();if(!r&&!o)return;let s=!1;if(r){let{unhideComputerUseApps:i}=await Promise.resolve().then(() => (mzr(),Jna)),a=!1,l=i([...n]).then(()=>{a=!0},(d)=>{a=!0,logForDebugging(`[Computer Use MCP] auto-unhide failed: ${Se(d)}`)}),c=z7(),u=setTimeout(c.resolve,Y2p);if(await Promise.race([l,c.promise]).finally(()=>clearTimeout(u)),!a)s=!0;Nhe(e.setAppState,(d)=>d?.hiddenDuringTurn===void 0?d:{...d,hiddenDuringTurn:void 0})}if(o){try{qna()}catch(i){logForDebugging(`[Computer Use MCP] unregisterEscHotkey failed: ${Se(i)}`)}if(await nzr())yield{type:"os_notification",message:"Claude is done using your computer",notificationType:"computer_use_exit"}}if(s)Oe("computeruse_turn_cleanup","unhide_timeout");else Ie("computeruse_turn_cleanup")}
var Y2p=5000;
var GAo=b(()=>{ln();qe();bt();rzr();QHn()});
export {N6e,Y2p,GAo};
