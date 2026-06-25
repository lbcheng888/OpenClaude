// @ts-nocheck
import {b} from "../runtime.ts";
function yid(){return{account_id:0,organization_uuid:"",account_uuid:""}}
function w2r(e){return e!==null&&e!==void 0}
var Pfe;
var k2r=b(()=>{Pfe={fromJSON(e){return{account_id:w2r(e.account_id)?globalThis.Number(e.account_id):0,organization_uuid:w2r(e.organization_uuid)?globalThis.String(e.organization_uuid):"",account_uuid:w2r(e.account_uuid)?globalThis.String(e.account_uuid):""}},toJSON(e){let t={};if(e.account_id!==void 0)t.account_id=Math.round(e.account_id);if(e.organization_uuid!==void 0)t.organization_uuid=e.organization_uuid;if(e.account_uuid!==void 0)t.account_uuid=e.account_uuid;return t},create(e){return Pfe.fromPartial(e??{})},fromPartial(e){let t=yid();return t.account_id=e.account_id??0,t.organization_uuid=e.organization_uuid??"",t.account_uuid=e.account_uuid??"",t}}});
export {yid,w2r,Pfe,k2r};
