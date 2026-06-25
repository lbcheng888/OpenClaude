// @ts-nocheck
import {Ws,vd} from "../src/session/1465_promise.ts";
import {j_t,NOe} from "./m5310.ts";
import {LY,Rpt} from "./m4175.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function uKl(e){let{sandboxHost:t,elicitationServer:n,workerSandboxHost:r}=e,o=Ws(),s=KLm[j_t()?.kind??""];a7t.useEffect(()=>{if(!o)return;LY.emit(t?`allow network: ${t}`:null,"sandbox")},[o,t]),a7t.useEffect(()=>{if(!o)return;LY.emit(r?`allow network: ${r}`:null,"worker-sandbox")},[o,r]),a7t.useEffect(()=>{if(!o)return;LY.emit(n?`MCP input: ${n}`:null,"elicitation")},[o,n]),a7t.useEffect(()=>{if(!o)return;LY.emit(s??null,"dialog")},[o,s])}
var a7t,KLm;
var dKl=b(()=>{NOe();vd();Rpt();a7t=x(et(),1),KLm={refusal_fallback_prompt:"choose: retry on fallback model or edit prompt",fable_overage_consent_prompt:"choose: continue Fable 5 on usage credits or switch models"}});
export {uKl,a7t,KLm,dKl};
