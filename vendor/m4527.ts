// @ts-nocheck
import {isClaudeAISubscriber,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {parseUserSpecifiedModel,Kg,isPinnedFableModel,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {Hf,WS} from "../src/api/1453_month.ts";
import {tB,fge,Sae,ej} from "../src/telemetry/2743_raw.ts";
import {k_,GS} from "../src/api/2028_used.ts";
import {b} from "../runtime.ts";
function JDe(e,t,n){if(!isClaudeAISubscriber())return!1;let r=e!==null?parseUserSpecifiedModel(e):Kg(),o=r.toLowerCase(),s=o.includes("opus")||o.includes("fable"),i=o.includes("opus-4-6"),a=o.includes("sonnet-4-6");if(t&&Hf(e))return!0;if((o.includes("fable")||isPinnedFableModel(r))&&!tB()&&(fge()||Sae()))return!0;if(!k_(o))return!1;if(s&&n)return!1;return i||a}
var w8t=b(()=>{lo();GS();WS();ej();Ro()});
export {JDe,w8t};
