// @ts-nocheck
import {clearPluginWorkflowCache,fdo,loadPluginWorkflows} from "./m4180.ts";
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
import {BIe,aG} from "../src/config/4090_BIe.ts";
import {Iy,hc} from "../src/agent/2230_explicitlyRequested.ts";
import {G9n,Ado} from "./m4181.ts";
import {$6a,U6a} from "./m4182.ts";
async function q9t(e,t){return(await QIe(t)).find((r)=>r.name===e)}
function invalidateWorkflowCache(){QIe.cache.clear?.(),clearPluginWorkflowCache()}
var QIe;
var j9t=b(()=>{ta();BIe();Iy();fdo();G9n();$6a();QIe=wn(async(e)=>{if(hc("workflows"))return[...Ado()];let[t,n]=await Promise.all([U6a(e),loadPluginWorkflows()]),r=new Set(t.map((a)=>a.name)),o=n.filter((a)=>!r.has(a.name)),s=new Set([...r,...o.map((a)=>a.name)]);return[...Ado().filter((a)=>!s.has(a.name)),...o,...t]},(e)=>`${aG()}:${e}`)});
export {q9t,invalidateWorkflowCache,QIe,j9t};
