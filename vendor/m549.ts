// @ts-nocheck
import {b} from "../runtime.ts";
var NZo,GGc=async function*(e){if(e.stream)yield*e.stream();else if(e.arrayBuffer)yield await e.arrayBuffer();else if(e[NZo])yield*e[NZo]();else yield e},Ynn;
var R_r=b(()=>{({asyncIterator:NZo}=Symbol),Ynn=GGc});
export {NZo,GGc,Ynn,R_r};
