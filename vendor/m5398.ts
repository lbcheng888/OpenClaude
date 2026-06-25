// @ts-nocheck
import {useStdin,CEn} from "./m2266.ts";
import {onAttacherCapsChange,getAttacherCaps,lt} from "../src/session/0132_sent.ts";
import {Ne} from "./m583.ts";
import {Cs,tp} from "../src/config/2284_loggedTmuxCcDisable.ts";
import {du,iw} from "./m2302.ts";
import {sleep} from "../src/telemetry/1488_withTimeout.ts";
import {b,x} from "../runtime.ts";
import {Ir} from "./m584.ts";
import {et} from "./m2261.ts";
function vYl(e){let t=pyt.useRef(e);t.current=e;let{internal_querier:n}=useStdin(),r=pyt.useSyncExternalStore(onAttacherCapsChange,()=>getAttacherCaps()?.terminal??Ne.terminal);pyt.useEffect(()=>{if(!Cs()||!n)return;if(r!=="iTerm.app"&&r!=="Apple_Terminal")return;let o=du.get(process.stdout);if(!o)return;let s=new AbortController;return(async()=>{while(!s.signal.aborted){let i=await o.probeExternalClear(n);if(s.signal.aborted)return;if(i)t.current();await sleep(200,s.signal,{unref:!0})}})(),()=>s.abort()},[n,r])}
var pyt;
var wYl=b(()=>{lt();CEn();iw();Ir();tp();pyt=x(et(),1)});
export {vYl,pyt,wYl};
