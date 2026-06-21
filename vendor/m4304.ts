// @ts-nocheck
import {b} from "../runtime.ts";
function BKa(e){return e?._meta?.["claude/endTurn"]===!0}
function Nmo(e){if(e.type!=="user"||!BKa(e.mcpMeta))return!1;let t=e.message.content;return!Array.isArray(t)||!t.some((n)=>n.type==="tool_result"&&n.is_error===!0)}
function Bmo(e,t){if(!e)return t;return BKa(t)?KMp:void 0}
var KMp;
var Fmo=b(()=>{KMp=Object.freeze({_meta:Object.freeze({["claude/endTurn"]:!0})})});
export {BKa,Nmo,Bmo,KMp,Fmo};
