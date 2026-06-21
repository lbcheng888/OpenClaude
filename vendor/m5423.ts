// @ts-nocheck
import {useClock} from "./m2432.ts";
import {dhe,Rnt,Z$i,sA} from "./m2782.ts";
import {mt,configProtoStore} from "./m2458.ts";
import {LWl,MWl} from "./m5422.ts";
import {d0e,D3t} from "../src/permissions/4291_agentId.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function BWl(e){let t=useClock(),n=nht.useSyncExternalStore(dhe,Rnt),r=mt((s)=>s.tasks),o=nht.useRef(new Set);nht.useEffect(()=>{if(n.length===0)return;let s=LWl(n,r);if(s.length===0)return;let i=[],a=[];for(let c of s){if(o.current.has(c.agentId))continue;o.current.add(c.agentId),i.push(...c.consumedCommands),a.push(c)}if(i.length>0)Z$i(i);let l=o.current;for(let c of a){let u=t.setTimeout(()=>GPm({agentId:c.agentId,inFlight:l}),NWl);e(c.agentId,c.prompt).catch((d)=>{if(d instanceof d0e)logForDebugging(`[wakeRouter] resume state error for ${c.agentId}: ${Se(d)}`);else De(d)}).finally(()=>{u(),l.delete(c.agentId)})}},[n,r,e,t])}
function GPm(e){logForDebugging(`[wakeRouter] dispatch for ${e.agentId} exceeded ${NWl}ms; releasing inFlight reservation`,{level:"warn"}),e.inFlight.delete(e.agentId)}
var nht,NWl=60000;
var FWl=b(()=>{ze();configProtoStore();D3t();qe();bt();Rn();sA();MWl();nht=M(Te(),1)});
export {BWl,GPm,nht,NWl,FWl};
