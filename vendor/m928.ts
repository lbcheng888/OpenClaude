// @ts-nocheck
import {xan,QAr} from "./m927.ts";
import {b,x} from "../runtime.ts";
import {Vg} from "./m600.ts";
var ybs=()=>{};
var VYe,Dan=(e={})=>VYe.memoize(VYe.chain(xan(e),async()=>{throw new VYe.TokenProviderError("Could not load token from any providers",!1)}),(t)=>t.expiration!==void 0&&t.expiration.getTime()-Date.now()<300000,(t)=>t.expiration!==void 0);
var Tbs=b(()=>{QAr();VYe=x(Vg(),1)});
export {ybs,VYe,Dan,Tbs};
