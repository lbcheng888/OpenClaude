// @ts-nocheck
import {mua,DXr} from "./m3348.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function qWl({isLoading:e,onSubmitMessage:t}){let n=mua(),r=YPe.useMemo(()=>n.subscribe.bind(n),[n]),o=YPe.useCallback(()=>n.revision,[n]),s=YPe.useSyncExternalStore(r,o);YPe.useEffect(()=>{if(e)return;let i=n.poll();if(i)t(i.content)},[e,s,n,t])}
var YPe;
var jWl=b(()=>{DXr();YPe=M(Te(),1)});
export {qWl,YPe,jWl};
