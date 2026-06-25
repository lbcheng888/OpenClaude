// @ts-nocheck
import {Nca,FQr,BQr} from "../src/computer-use/3225_flag.ts";
import {YQr,tua} from "../src/computer-use/3231_unhideComputerUseApps.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {T7} from "../src/session/1465_promise.ts";
import {Yge} from "../src/tools/3233_computerUseMcpState.ts";
import {zca,WDn} from "./m3227.ts";
import {xe,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {b} from "../runtime.ts";
async function*CDe(e){let n=e.getAppState().computerUseMcpState?.hiddenDuringTurn,r=!!(n&&n.size>0),o=Nca();if(!r&&!o)return;let s=!1;if(r){let{unhideComputerUseApps:i}=await Promise.resolve().then(() => (YQr(),tua)),a=!1,l=i([...n]).then(()=>{a=!0},(d)=>{a=!0,logForDebugging(`[Computer Use MCP] auto-unhide failed: ${Ce(d)}`)}),c=T7(),u=setTimeout(c.resolve,xWp);if(await Promise.race([l,c.promise]).finally(()=>clearTimeout(u)),!a)s=!0;Yge(e.setAppState,(d)=>d?.hiddenDuringTurn===void 0?d:{...d,hiddenDuringTurn:void 0})}if(o){try{zca()}catch(i){logForDebugging(`[Computer Use MCP] unregisterEscHotkey failed: ${Ce(i)}`)}if(await FQr())yield{type:"os_notification",message:"Claude is done using your computer",notificationType:"computer_use_exit"}}if(s)xe("computeruse_turn_cleanup","unhide_timeout");else He("computeruse_turn_cleanup")}
var xWp=5000;
var MSo=b(()=>{mn();qe();Ct();BQr();WDn()});
export {CDe,xWp,MSo};
