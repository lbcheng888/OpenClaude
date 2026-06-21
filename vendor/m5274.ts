// @ts-nocheck
import {_i,hp} from "../src/session/1460_promise.ts";
import {IAt,FPe} from "./m5273.ts";
import {XY,Rut} from "./m4162.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function n3l(e){let{sandboxHost:t,elicitationServer:n,workerSandboxHost:r}=e,o=_i(),s=gRm[IAt()?.kind??""];kWt.useEffect(()=>{if(!o)return;XY.emit(t?`allow network: ${t}`:null,"sandbox")},[o,t]),kWt.useEffect(()=>{if(!o)return;XY.emit(r?`allow network: ${r}`:null,"worker-sandbox")},[o,r]),kWt.useEffect(()=>{if(!o)return;XY.emit(n?`MCP input: ${n}`:null,"elicitation")},[o,n]),kWt.useEffect(()=>{if(!o)return;XY.emit(s??null,"dialog")},[o,s])}
var kWt,gRm;
var r3l=b(()=>{FPe();hp();Rut();kWt=M(Te(),1),gRm={refusal_fallback_prompt:"choose: retry on fallback model or edit prompt",fable_overage_consent_prompt:"choose: continue Fable 5 on usage credits or switch models"}});
export {n3l,kWt,gRm,r3l};
