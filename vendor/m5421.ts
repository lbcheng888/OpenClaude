// @ts-nocheck
import {dhe,Rnt,sA} from "./m2782.ts";
import {IWl,DWl} from "./m5420.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function PWl({executeQueuedInput:e,hasActiveLocalJsxUI:t,queryGuard:n}){let r=IGt.useSyncExternalStore(n.subscribe,n.getSnapshot),o=IGt.useSyncExternalStore(dhe,Rnt);IGt.useEffect(()=>{if(r)return;if(t)return;if(o.length===0)return;IWl({executeInput:e})},[o,r,e,t,n])}
var IGt;
var OWl=b(()=>{sA();DWl();IGt=M(Te(),1)});
export {PWl,IGt,OWl};
