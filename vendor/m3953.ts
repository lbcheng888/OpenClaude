// @ts-nocheck
import {mS} from "./m3842.ts";
import {setMemberMode,sL} from "./m3897.ts";
import {zP,fM,FS} from "./m722.ts";
import {isBypassPermissionsModeDisabled,vUe} from "../src/telemetry/2232_vUe.ts";
import {isAutoModeGateEnabled,cy} from "../src/permissions/5219_verifyAutoModeGateAccess.ts";
import {b} from "../runtime.ts";
import {Pw} from "../src/permissions/3902_writeToMailbox.ts";
function A2a(e,t){for(let n of Object.values(t.tasks))if(mS(n)&&n.identity.agentName===e)return n.id;return}
function pdo(e,t,n){t.update(e,(r)=>({...r,awaitingPlanApproval:n}))}
function R2a(e,t,n){let r=n.get(e);if(!r||!mS(r)||!r.awaitingPlanApproval)return!1;if(!t.approved)return pdo(e,n,!1),!0;let o=mdo(t.permissionMode);return n.update(e,(s)=>({...s,awaitingPlanApproval:!1,permissionMode:o})),setMemberMode(r.identity.teamName,r.identity.agentName,o),!0}
function mdo(e){let t=zP(fM(e??"default"));if(t==="bypassPermissions"&&isBypassPermissionsModeDisabled())return"default";if(t==="auto"&&!isAutoModeGateEnabled())return"default";return t}
var fdo=b(()=>{vUe();FS();cy();sL();Pw()});
export {A2a,pdo,R2a,mdo,fdo};
