// @ts-nocheck
import {_i,hp} from "../src/session/1460_promise.ts";
import {MFa,E2n,S2n,b2n,T2n,l_e,OFa,Lct} from "../src/telemetry/4037_level.ts";
import {b} from "../runtime.ts";
function FFa({commandName:e,agentId:t,isNonInteractiveSession:n,setAppState:r}){if(t!==void 0||n)return;if(_i())return;MFa(e);let o=E2n();if(!S2n(e))return;if(b2n(e)){BFa(e,r);return}o.then((s)=>{if(b2n(e)){BFa(e,r);return}if(!s)return;let i=T2n();if(!i)return;r((a)=>({...a,fotwClaim:{phase:"needs_payment_setup",command:i,amountMinorUnits:s.amountMinorUnits,currency:s.currency}}))})}
function BFa(e,t){let n=T2n(),r=l_e();if(!n||!r)return;t((o)=>({...o,fotwClaim:{phase:"pending",command:n,amountMinorUnits:r.amountMinorUnits,currency:r.currency}})),OFa(e).catch(()=>({outcome:"failed"})).then((o)=>{t((s)=>{let i=s.fotwClaim;if(!i||i.command!==n)return s;if(o.outcome==="granted")return{...s,fotwClaim:{phase:"granted",command:i.command,amountMinorUnits:o.amountMinorUnits,currency:o.currency}};return{...s,fotwClaim:{...i,phase:"failed"}}})})}
var UFa=b(()=>{Lct();hp()});
export {FFa,BFa,UFa};
