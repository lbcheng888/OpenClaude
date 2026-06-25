// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {fZ,tp} from "../src/config/2284_loggedTmuxCcDisable.ts";
import {NAi,VEn} from "./m2281.ts";
import {Qg,Nk,hg} from "./m2280.ts";
import {sleep} from "../src/telemetry/1488_withTimeout.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {lAi,MEn,cZ} from "./m2273.ts";
import {BAi,l3r} from "./m2282.ts";
import {WUe,iz,GUe} from "./m2276.ts";
var zAi={};
ft(zAi,{watchSystemTheme:()=>watchSystemTheme,_resetInitialProbeForTesting:()=>_resetInitialProbeForTesting});
function _resetInitialProbeForTesting(){KEn=void 0}
function watchSystemTheme(e,t,n){let r=!1,o=!1,s=n?.muxTimeoutMs??edd,i=Boolean(process.env.TMUX||process.env.STY)&&!fZ();async function a(){if(o)return;o=!0;try{let d=NAi(Qg.SET_BG_COLOR),p=i?{...d,request:Nk(d.request)}:d,m,f=i?"dcs":"direct";if(i){if(m=await Promise.race([e.send(p),sleep(s,void 0,{unref:!0}).then(()=>{return})]),!m)if(r)e.cancel(p);else e.flush(),f="mux-bare",[m]=await Promise.all([e.send(d),e.flush()])}else[m]=await Promise.all([e.send(p),e.flush()]);if(r)return;if(!m){logForDebugging(`systemTheme: OSC 11 query (via=${f}) got no response`,{level:"debug"}),KEn=!1;return}KEn=!0;let h=lAi(m.data);if(logForDebugging(`systemTheme: OSC 11 response=${m.data} detected=${h} via=${f}`,{level:"debug"}),h===void 0)return;MEn(h),t(h)}finally{o=!1}}let l=process.env.CLAUDE_BG_BACKEND==="daemon";if(KEn!==!1&&!l)a();let c=BAi(()=>void a()),u=l?WUe(()=>{if(iz()==="focused")a()}):void 0;return()=>{r=!0,c(),u?.()}}
var edd=2000,KEn;
var jAi=b(()=>{GUe();VEn();l3r();hg();qe();tp();cZ()});
export {zAi,_resetInitialProbeForTesting,watchSystemTheme,edd,KEn,jAi};
