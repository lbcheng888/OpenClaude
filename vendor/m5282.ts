// @ts-nocheck
import {je} from "./m577.ts";
import {yd,YA,ng} from "./m132.ts";
import {Pn,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {ra,Ap} from "../src/config/0614_Ap.ts";
import {fo} from "./m566.ts";
import {getClientPlatform} from "../src/config/0048_ISSUES_EXPLAINER.ts";
import {getTerminalFocus,onInteraction,onTerminalFocusChange,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
import {Gp} from "./m567.ts";
import {yKt,Dde} from "./m124.ts";
import {Lr} from "./m578.ts";
import {fk} from "../src/api/2032_withOAuth401Retry.ts";
async function NRm(){let e=je.CLAUDE_CLIENT_PRESENCE_FILE;if(!e)return!1;if(yd(e)&&!YA(e))return!1;try{return await E3l.stat(e),!0}catch(t){if(!Pn(t))logForDebugging(`[presence] client-presence-marker stat failed: ${t}`);return!1}}
function C3l(e,t,n){if(ra())return MRm;let r={sessionId:e,baseUrl:t,getAuthHeaders:n},o=null,s=0,i=()=>{let d=Date.now();s=d,o??=new Date(d).toISOString();let p=`${r.baseUrl}/v1/code/sessions/${r.sessionId}/client/presence`;return logForDebugging(`[presence] pulse \u2192 ${p}`),fo.post(p,{client_id:LRm,connected_at:o},{headers:{...r.getAuthHeaders(),"anthropic-version":"2023-06-01","anthropic-client-platform":getClientPlatform()},timeout:OYn,validateStatus:()=>!0}).then((m)=>{if(m.status>=400)logForDebugging(`[presence] pulse got ${m.status}`)},()=>{})},a=()=>{if(getTerminalFocus()===!1){logForDebugging("[presence] pulse skipped (terminal blurred)");return}if(Date.now()-s<OYn)return;i()},l=onInteraction(a),c=onTerminalFocusChange(()=>{let d=getTerminalFocus();if(logForDebugging(`[presence] terminal focus \u2192 ${d===void 0?"unknown":d?"focused":"blurred"}`),d===!0)a()});logForDebugging(`[presence] wired for session ${e}`);let u=!1;return{teardown(){u=!0,l?.(),l=null,c?.(),c=null,o=null},pulseIfClientPresent(){if(u||Date.now()-s<OYn)return;NRm().then((d)=>{if(d&&!u&&Date.now()-s>=OYn)logForDebugging("[presence] client-presence-marker active \u2192 pulse"),i()})}}}
var E3l,OYn=5000,LRm,MRm;
var v3l=b(()=>{Gp();yKt();lt();ng();qe();Lr();bt();fk();Ap();E3l=require("fs/promises"),LRm=Dde.randomUUID(),MRm={teardown:()=>{},pulseIfClientPresent:()=>{}}});
export {NRm,C3l,E3l,OYn,LRm,MRm,v3l};
