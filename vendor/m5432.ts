// @ts-nocheck
import {Mc,bo,mt,configProtoStore} from "./m2458.ts";
import {mcpTools,sJ} from "./m4311.ts";
import {mLo,QWl} from "./m5431.ts";
import {elo,Sqe} from "./m4035.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function eGl({enabled:e}){let t=Mc(),n=bo(),r=mcpTools(),o=mt((s)=>s.plugins.enabled);ZWl.useEffect(()=>{if(!e)return;let s=()=>({abortController:new AbortController,taskRegistry:r});return mLo(o,(i)=>i.when==="always",s()),elo.subscribe((i)=>{mLo(t.getState().plugins.enabled,(a)=>a.when===`on-skill-invoke:${i}`,s())})},[e,o,t,n,r])}
var ZWl;
var tGl=b(()=>{configProtoStore();sJ();QWl();Sqe();ZWl=M(Te(),1)});
export {eGl,ZWl,tGl};
