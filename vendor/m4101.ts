// @ts-nocheck
import {Ws,vd} from "../src/session/1465_promise.ts";
import {d5a,c4n,a4n,l4n,i4n,Hye,c5a,Qdt} from "../src/telemetry/4101_level.ts";
import {b} from "../runtime.ts";
function f5a({commandName:e,agentId:t,isNonInteractiveSession:n,setAppState:r}){if(t!==void 0||n)return;if(Ws())return;d5a(e);let o=c4n();if(!a4n(e))return;if(l4n(e)){m5a(e,r);return}o.then((s)=>{if(l4n(e)){m5a(e,r);return}if(!s)return;let i=i4n();if(!i)return;r((a)=>({...a,fotwClaim:{phase:"needs_payment_setup",command:i,amountMinorUnits:s.amountMinorUnits,currency:s.currency}}))})}
function m5a(e,t){let n=i4n(),r=Hye();if(!n||!r)return;t((o)=>({...o,fotwClaim:{phase:"pending",command:n,amountMinorUnits:r.amountMinorUnits,currency:r.currency}})),c5a(e).catch(()=>({outcome:"failed"})).then((o)=>{t((s)=>{let i=s.fotwClaim;if(!i||i.command!==n)return s;if(o.outcome==="granted")return{...s,fotwClaim:{phase:"granted",command:i.command,amountMinorUnits:o.amountMinorUnits,currency:o.currency}};return{...s,fotwClaim:{...i,phase:"failed"}}})})}
var h5a=b(()=>{Qdt();vd()});
export {f5a,m5a,h5a};
