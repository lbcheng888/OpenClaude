// @ts-nocheck
import {b,x} from "../runtime.ts";
function vYs(){return"User-Agent"}
async function wYs(e){if(hhn&&hhn.versions){let t=hhn.versions;if(t.bun)e.set("Bun",t.bun);else if(t.deno)e.set("Deno",t.deno);else if(t.node)e.set("Node",t.node)}e.set("OS",`(${nQe.arch()}-${nQe.type()}-${nQe.release()})`)}
var nQe,hhn;
var kYs=b(()=>{nQe=x(require("os")),hhn=x(require("process"))});
export {vYs,wYs,nQe,hhn,kYs};
