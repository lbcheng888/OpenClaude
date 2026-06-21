// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {isTeammate,Am} from "../src/agent/1459_waitForTeammatesToBecomeIdle.ts";
import {i_,elt,K0} from "./m3824.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {qf,ry} from "../src/agent/2772_withFileTypes.ts";
import {saveAgentColor,ja} from "../src/permissions/5143_writeRemoteAgentMetadata.ts";
import {e8n,t8n} from "./m4485.ts";
import {$En,AC,mg} from "../src/agent/2580_level.ts";
import {ES,EU} from "./m4256.ts";
import {getBridgeTokenOverride,getBridgeBaseUrlOverride,tJ} from "./m4224.ts";
import {x0e,U6e} from "./m4386.ts";
var Zol={};
isFullscreenWithTTY(Zol,{performSetColor:()=>performSetColor,call:()=>Mjp});
async function Mjp(e,t,n){return e(await performSetColor(n,t),{display:"system"}),null}
async function performSetColor(e,t){if(isTeammate())return"Cannot set color: This session is a teammate. Teammate colors are assigned by the team leader.";let n=e?.trim()??"",r=n===""?i_[Math.floor(Math.random()*i_.length)]:n.toLowerCase(),o=Ljp.includes(r);if(!o&&!i_.includes(r)){let d=i_.join(", ");return`Invalid color "${r}". Available colors: ${d}, default`}let s=getSessionId(),i=qf(),a=o?"default":r,l=o?void 0:r;await saveAgentColor(s,a,i),t.setAppState((d)=>e8n(d,{color:l}));let c=t.getAppState(),u=c.agent?c.agentDefinitions.activeAgents.find((d)=>d.agentType===c.agent):void 0;return $En(AC(),elt({userOverride:l,agentDefinitionColor:u?.color})),Njp(a),o?"Session color reset to default":`Session color set to: ${r}`}
function Njp(e){let t=ES()?.bridgeSessionId;if(!t)return;let n=getBridgeTokenOverride();Promise.resolve().then(() => (x0e(),U6e)).then(({updateBridgeSessionColorTag:r})=>r(t,e,i_,{baseUrl:getBridgeBaseUrlOverride(),getAccessToken:n?()=>n:void 0}).catch(()=>{}))}
var Ljp;
var Z_o=b(()=>{lt();tJ();EU();mg();K0();ry();ja();t8n();Am();Ljp=["default","reset","none","gray","grey"]});
export {Zol,Mjp,performSetColor,Njp,Ljp,Z_o};
