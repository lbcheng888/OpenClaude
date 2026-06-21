// @ts-nocheck
import {yS} from "./m3824.ts";
import {setMemberMode,BL} from "./m3879.ts";
import {xO,t1,eC} from "./m717.ts";
import {isBypassPermissionsModeDisabled,kFe} from "../src/telemetry/2224_kFe.ts";
import {isAutoModeGateEnabled,ly} from "../src/permissions/5185_verifyAutoModeGateAccess.ts";
import {b} from "../runtime.ts";
import {Tx} from "../src/permissions/3886_writeToMailbox.ts";
function YFa(e,t){for(let n of Object.values(t.tasks))if(yS(n)&&n.identity.agentName===e)return n.id;return}
function alo(e,t,n){t.update(e,(r)=>({...r,awaitingPlanApproval:n}))}
function JFa(e,t,n){let r=n.get(e);if(!r||!yS(r)||!r.awaitingPlanApproval)return!1;if(!t.approved)return alo(e,n,!1),!0;let o=llo(t.permissionMode);return n.update(e,(s)=>({...s,awaitingPlanApproval:!1,permissionMode:o})),setMemberMode(r.identity.teamName,r.identity.agentName,o),!0}
function llo(e){let t=xO(t1(e??"default"));if(t==="bypassPermissions"&&isBypassPermissionsModeDisabled())return"default";if(t==="auto"&&!isAutoModeGateEnabled())return"default";return t}
var clo=b(()=>{kFe();eC();ly();BL();Tx()});
export {YFa,alo,JFa,llo,clo};
