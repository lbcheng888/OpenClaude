// @ts-nocheck
import {P_,M9n,po} from "../src/tools/5224_userPromptCount.ts";
import {b} from "../runtime.ts";
function Ttr(e,t){switch(t.type){case"append":return t.messages.length===0?e:[...e,...t.messages];case"replace-all":return t.messages;case"remove-by-uuid":{let n=e.findIndex((o)=>o.uuid===t.uuid);if(n===-1)return e;let r=e.slice();return r.splice(n,1),r}case"trim-to-last-boundary-and-append":return[...P_(e,{includeSnipped:t.includeSnipped}),t.message];case"replace-last-ephemeral-progress":{let n=e.at(-1);if(n?.type==="progress"&&n.parentToolUseID===t.message.parentToolUseID&&n.data.type===t.message.data.type)return e.with(e.length-1,t.message);return[...e,t.message]}case"append-or-move-by-uuid":return M9n(e,t.message);case"trim-to-last-boundary-excluding-and-append":return[...P_(e,{includeSnipped:t.includeSnipped}).filter((n)=>!t.excludeUuids.has(n.uuid)),t.message];case"update":return t.updater(e)}}
var xBo=b(()=>{po()});
export {Ttr,xBo};
