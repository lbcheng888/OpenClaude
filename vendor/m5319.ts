// @ts-nocheck
import {Ne} from "./m583.ts";
import {lu,Cf,zf} from "./m133.ts";
import {In,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Vi,$d} from "../src/config/0620_$d.ts";
import {ho} from "./m572.ts";
import {getClientPlatform} from "./m5.ts";
import {getTerminalFocus,onInteraction,onTerminalFocusChange,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
import {ap} from "./m573.ts";
import {zYt,Fde} from "./m121.ts";
import {Ir} from "./m584.ts";
import {kk} from "../src/api/2037_withOAuth401Retry.ts";
async function pMm(){let e=Ne.CLAUDE_CLIENT_PRESENCE_FILE;if(!e)return!1;if(lu(e)&&!Cf(e))return!1;try{return await DKl.stat(e),!0}catch(t){if(!In(t))logForDebugging(`[presence] client-presence-marker stat failed: ${t}`);return!1}}
function PKl(e,t,n){if(Vi())return dMm;let r={sessionId:e,baseUrl:t,getAuthHeaders:n},o=null,s=0,i=()=>{let d=Date.now();s=d,o??=new Date(d).toISOString();let p=`${r.baseUrl}/v1/code/sessions/${r.sessionId}/client/presence`;return logForDebugging(`[presence] pulse \u2192 ${p}`),ho.post(p,{client_id:uMm,connected_at:o},{headers:{...r.getAuthHeaders(),"anthropic-version":"2023-06-01","anthropic-client-platform":getClientPlatform()},timeout:UZn,validateStatus:()=>!0}).then((m)=>{if(m.status>=400)logForDebugging(`[presence] pulse got ${m.status}`)},()=>{})},a=()=>{if(getTerminalFocus()===!1){logForDebugging("[presence] pulse skipped (terminal blurred)");return}if(Date.now()-s<UZn)return;i()},l=onInteraction(a),c=onTerminalFocusChange(()=>{let d=getTerminalFocus();if(logForDebugging(`[presence] terminal focus \u2192 ${d===void 0?"unknown":d?"focused":"blurred"}`),d===!0)a()});logForDebugging(`[presence] wired for session ${e}`);let u=!1;return{teardown(){u=!0,l?.(),l=null,c?.(),c=null,o=null},pulseIfClientPresent(){if(u||Date.now()-s<UZn)return;pMm().then((d)=>{if(d&&!u&&Date.now()-s>=UZn)logForDebugging("[presence] client-presence-marker active \u2192 pulse"),i()})}}}
var DKl,UZn=5000,uMm,dMm;
var OKl=b(()=>{ap();zYt();lt();zf();qe();Ir();Ct();kk();$d();DKl=require("fs/promises"),uMm=Fde.randomUUID(),dMm={teardown:()=>{},pulseIfClientPresent:()=>{}}});
export {pMm,PKl,DKl,UZn,uMm,dMm,OKl};
