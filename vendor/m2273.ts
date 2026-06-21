// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {yZ,Pp} from "../src/config/2273_loggedTmuxCcDisable.ts";
import {k_i,sTn} from "./m2270.ts";
import {$g,Sk,lg} from "./m2269.ts";
import {sleep} from "../src/telemetry/1483_withTimeout.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {s_i,o_i,Yfe} from "./m2265.ts";
import {I_i,IFr} from "./m2271.ts";
import {WFe,IK,GFe} from "./m2266.ts";
var F_i={};
isFullscreenWithTTY(F_i,{watchSystemTheme:()=>watchSystemTheme,_resetInitialProbeForTesting:()=>_resetInitialProbeForTesting});
function _resetInitialProbeForTesting(){iTn=void 0}
function watchSystemTheme(e,t,n){let r,o=!1,s=!1,i=n?.muxTimeoutMs??Red,a=Boolean(process.env.TMUX||process.env.STY)&&!yZ();async function l(){if(s)return;s=!0;try{let p=k_i($g.SET_BG_COLOR),m=a?{...p,request:Sk(p.request)}:p,f,A=a?"dcs":"direct";if(a){if(f=await Promise.race([e.send(m),sleep(i,void 0,{unref:!0}).then(()=>{return})]),!f)if(o)e.cancel(m);else e.flush(),A="mux-bare",[f]=await Promise.all([e.send(p),e.flush()])}else[f]=await Promise.all([e.send(m),e.flush()]);if(o)return;if(!f){logForDebugging(`systemTheme: OSC 11 query (via=${A}) got no response`,{level:"debug"}),iTn=!1;return}iTn=!0;let h=s_i(f.data);if(logForDebugging(`systemTheme: OSC 11 response=${f.data} detected=${h} via=${A}`,{level:"debug"}),h===void 0||h===r)return;r=h,o_i(h),t(h)}finally{s=!1}}let c=process.env.CLAUDE_BG_BACKEND==="daemon";if(iTn!==!1&&!c)l();let u=I_i(()=>void l()),d=c?WFe(()=>{if(IK()==="focused")l()}):void 0;return()=>{o=!0,u(),d?.()}}
var Red=2000,iTn;
var U_i=b(()=>{GFe();sTn();IFr();lg();qe();Pp();Yfe()});
export {F_i,_resetInitialProbeForTesting,watchSystemTheme,Red,iTn,U_i};
