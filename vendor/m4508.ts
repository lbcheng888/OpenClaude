// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {isTeammate,Op} from "../src/agent/1464_waitForTeammatesToBecomeIdle.ts";
import {__,eut,ix} from "./m3842.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {Nm,D_} from "../src/agent/2784_withFileTypes.ts";
import {saveAgentColor,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {bVn,EVn} from "./m4507.ts";
import {Ivn,eb,Pf} from "../src/agent/2591_level.ts";
import {yS,WB} from "./m4274.ts";
import {getBridgeTokenOverride,getBridgeBaseUrlOverride,BY} from "./m4242.ts";
import {ADe,m8e} from "./m4408.ts";
var Udl={};
ft(Udl,{performSetColor:()=>performSetColor,call:()=>TYp});
async function TYp(e,t,n){return e(await performSetColor(n,t),{display:"system"}),null}
async function performSetColor(e,t){if(isTeammate())return"Cannot set color: This session is a teammate. Teammate colors are assigned by the team leader.";let n=e?.trim()??"",r=n===""?__[Math.floor(Math.random()*__.length)]:n.toLowerCase(),o=yYp.includes(r);if(!o&&!__.includes(r)){let d=__.join(", ");return`Invalid color "${r}". Available colors: ${d}, default`}let s=getSessionId(),i=Nm(),a=o?"default":r,l=o?void 0:r;await saveAgentColor(s,a,i),t.setAppState((d)=>bVn(d,{color:l}));let c=t.getAppState(),u=c.agent?c.agentDefinitions.activeAgents.find((d)=>d.agentType===c.agent):void 0;return Ivn(eb(),eut({userOverride:l,agentDefinitionColor:u?.color})),SYp(a),o?"Session color reset to default":`Session color set to: ${r}`}
function SYp(e){let t=yS()?.bridgeSessionId;if(!t)return;let n=getBridgeTokenOverride();Promise.resolve().then(() => (ADe(),m8e)).then(({updateBridgeSessionColorTag:r})=>r(t,e,__,{baseUrl:getBridgeBaseUrlOverride(),getAccessToken:n?()=>n:void 0}).catch(()=>{}))}
var yYp;
var zCo=b(()=>{lt();BY();WB();Pf();ix();D_();_a();EVn();Op();yYp=["default","reset","none","gray","grey"]});
export {Udl,TYp,performSetColor,SYp,yYp,zCo};
