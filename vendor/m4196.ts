// @ts-nocheck
import {clearPluginWorkflowCache,rgo,loadPluginWorkflows} from "./m4193.ts";
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
import {sxe,runForkedQuery} from "../src/config/3967_sxe.ts";
import {ky,buildMcpToolName} from "../src/agent/2238_explicitlyRequested.ts";
import {Vqn,ogo} from "./m4194.ts";
import {jKa,zKa} from "./m4195.ts";
async function nqt(e,t){return(await Gxe(t)).find((r)=>r.name===e)}
function invalidateWorkflowCache(){Gxe.cache.clear?.(),clearPluginWorkflowCache()}
var Gxe;
var rqt=b(()=>{Wi();sxe();ky();rgo();Vqn();jKa();Gxe=Hn(async(e)=>{if(buildMcpToolName("workflows"))return[...ogo()];let[t,n]=await Promise.all([zKa(e),loadPluginWorkflows()]),r=new Set(t.map((a)=>a.name)),o=n.filter((a)=>!r.has(a.name)),s=new Set([...r,...o.map((a)=>a.name)]);return[...ogo().filter((a)=>!s.has(a.name)),...o,...t]},(e)=>`${runForkedQuery()}:${e}`)});
export {nqt,invalidateWorkflowCache,Gxe,rqt};
