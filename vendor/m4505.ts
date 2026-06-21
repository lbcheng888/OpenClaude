// @ts-nocheck
import {isClaudeAISubscriber,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {parseUserSpecifiedModel,getDefaultMainLoopModel,isPinnedFableModel,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {vA,tE} from "../src/api/1448_month.ts";
import {D0,X$,eW} from "../src/telemetry/2730_raw.ts";
import {T_,jS} from "../src/api/2023_used.ts";
import {b} from "../runtime.ts";
function eDe(e,t,n){if(!isClaudeAISubscriber())return!1;let r=e!==null?parseUserSpecifiedModel(e):getDefaultMainLoopModel(),o=r.toLowerCase(),s=o.includes("opus")||o.includes("fable"),i=o.includes("opus-4-6"),a=o.includes("sonnet-4-6");if(t&&vA(e))return!0;if((o.includes("fable")||isPinnedFableModel(r))&&!D0()&&X$())return!0;if(!T_(o))return!1;if(s&&n)return!1;return i||a}
var e6t=b(()=>{Ao();jS();tE();eW();Mo()});
export {eDe,e6t};
