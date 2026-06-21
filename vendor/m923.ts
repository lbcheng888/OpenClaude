// @ts-nocheck
import {zon,ETr} from "./m922.ts";
import {b,M} from "../runtime.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
var CAs=()=>{};
var KKe,Yon=(e={})=>KKe.memoize(KKe.chain(zon(e),async()=>{throw new KKe.TokenProviderError("Could not load token from any providers",!1)}),(t)=>t.expiration!==void 0&&t.expiration.getTime()-Date.now()<300000,(t)=>t.expiration!==void 0);
var vAs=b(()=>{ETr();KKe=M(createDefaultGlobalConfig(),1)});
export {CAs,KKe,Yon,vAs};
