// @ts-nocheck
import {b,M} from "../runtime.ts";
function IWs(){return"User-Agent"}
async function DWs(e){if(Ppn&&Ppn.versions){let t=Ppn.versions;if(t.bun)e.set("Bun",t.bun);else if(t.deno)e.set("Deno",t.deno);else if(t.node)e.set("Node",t.node)}e.set("OS",`(${oJe.arch()}-${oJe.type()}-${oJe.release()})`)}
var oJe,Ppn;
var PWs=b(()=>{oJe=M(require("os")),Ppn=M(require("process"))});
export {IWs,DWs,oJe,Ppn,PWs};
