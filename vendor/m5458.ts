// @ts-nocheck
import {v_a,fno} from "./m3364.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function RQl({isLoading:e,onSubmitMessage:t}){let n=v_a(),r=jOe.useMemo(()=>n.subscribe.bind(n),[n]),o=jOe.useCallback(()=>n.revision,[n]),s=jOe.useSyncExternalStore(r,o);jOe.useEffect(()=>{if(e)return;let i=n.poll();if(i)t(i.content)},[e,s,n,t])}
var jOe;
var vQl=b(()=>{fno();jOe=x(et(),1)});
export {RQl,jOe,vQl};
