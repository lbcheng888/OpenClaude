// @ts-nocheck
import {b} from "../runtime.ts";
function QYu(){return{account_id:0,organization_uuid:"",account_uuid:""}}
function eNr(e){return e!==null&&e!==void 0}
var Efe;
var tNr=b(()=>{Efe={fromJSON(e){return{account_id:eNr(e.account_id)?globalThis.Number(e.account_id):0,organization_uuid:eNr(e.organization_uuid)?globalThis.String(e.organization_uuid):"",account_uuid:eNr(e.account_uuid)?globalThis.String(e.account_uuid):""}},toJSON(e){let t={};if(e.account_id!==void 0)t.account_id=Math.round(e.account_id);if(e.organization_uuid!==void 0)t.organization_uuid=e.organization_uuid;if(e.account_uuid!==void 0)t.account_uuid=e.account_uuid;return t},create(e){return Efe.fromPartial(e??{})},fromPartial(e){let t=QYu();return t.account_id=e.account_id??0,t.organization_uuid=e.organization_uuid??"",t.account_uuid=e.account_uuid??"",t}}});
export {QYu,eNr,Efe,tNr};
