// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {allTools,lo} from "../src/tools/5190_userPromptCount.ts";
import {Ms,Pp} from "../src/config/2273_loggedTmuxCcDisable.ts";
import {dd,YM,Dd} from "./m687.ts";
import {hat,_He} from "./m3752.ts";
import {pTo,wll} from "../src/tui/4557_count.ts";
import {S6t,mTo} from "../src/core/4558_categories.ts";
import {Se,bt} from "./m195.ts";
import {k6n,H6n} from "../src/permissions/4412_level.ts";
import {Te} from "./m2253.ts";
var Rll={};
isFullscreenWithTTY(Rll,{call:()=>mVp});
function pVp(e){return allTools(e)}
async function mVp(e,t,n){let r=Ms()&&n.trim().toLowerCase()!=="all",o=dd();if(o){if(!YM("controlChannel"))return e("Context usage isn't available over this remote connection"),null;try{let f=await o.sendControlRequest({subtype:"get_context_usage"}),A=await hat(b6t.createElement(pTo,{data:f,isRemote:!0,collapseDetailSections:r}));e(A,{display:"system",metaMessages:[S6t(f,{skipCollapseStatus:!0})]})}catch(f){e(`Couldn't fetch context from remote: ${Se(f)}`)}return null}let{messages:s,getAppState:i,options:{mainLoopModel:a,tools:l}}=t,c=pVp(s),u=process.stdout.columns||80,d=i(),p=await k6n(c,a,async()=>d.toolPermissionContext,l,d.agentDefinitions,u,t,void 0,c,d.autoCompactWindow),m=await hat(b6t.createElement(pTo,{data:p,collapseDetailSections:r}));return e(m,{display:"system",metaMessages:[S6t(p)]}),null}
var b6t;
var xll=b(()=>{wll();Dd();H6n();bt();Pp();lo();_He();mTo();b6t=M(Te(),1)});
export {Rll,pVp,mVp,b6t,xll};
