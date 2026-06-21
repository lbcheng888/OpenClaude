// @ts-nocheck
import {useStdin,Uyn} from "./m2258.ts";
import {onAttacherCapsChange,getAttacherCaps,lt} from "../src/session/0131_sent.ts";
import {je} from "./m577.ts";
import {Ms,Pp} from "../src/config/2273_loggedTmuxCcDisable.ts";
import {qu,bk} from "./m2291.ts";
import {sleep} from "../src/telemetry/1483_withTimeout.ts";
import {b,M} from "../runtime.ts";
import {Lr} from "./m578.ts";
import {Te} from "./m2253.ts";
function jjl(e){let t=zAt.useRef(e);t.current=e;let{internal_querier:n}=useStdin(),r=zAt.useSyncExternalStore(onAttacherCapsChange,()=>getAttacherCaps()?.terminal??je.terminal);zAt.useEffect(()=>{if(!Ms()||!n)return;if(r!=="iTerm.app"&&r!=="Apple_Terminal")return;let o=qu.get(process.stdout);if(!o)return;let s=new AbortController;return(async()=>{while(!s.signal.aborted){let i=await o.probeExternalClear(n);if(s.signal.aborted)return;if(i)t.current();await sleep(200,s.signal,{unref:!0})}})(),()=>s.abort()},[n,r])}
var zAt;
var Wjl=b(()=>{lt();Uyn();bk();Lr();Pp();zAt=M(Te(),1)});
export {jjl,zAt,Wjl};
