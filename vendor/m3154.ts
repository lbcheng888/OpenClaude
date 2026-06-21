// @ts-nocheck
import {Wrt,Pee} from "../src/telemetry/3153_Pee.ts";
import {XLe,Oi,Ni,YT} from "../src/tools/0323_ttl.ts";
import {mW,Grt} from "./m3153.ts";
import {on,Rn} from "../src/session/0615_length.ts";
import {b} from "../runtime.ts";
async function KQi(e,t){if(!Wrt(e.capabilities))throw Error("readMcpDirectory called on a server without directoryRead capability");let n=[],r,o=0;do{let s;try{s=await e.client.request({method:"resources/directory/read",params:{uri:t,...r&&{cursor:r}}},XLe,{timeout:mW()})}catch(i){if(o===0||!(i instanceof Oi&&i.code===Ni.InvalidParams))throw i;return on(e.name,`resources/directory/read ${t}: page ${o+1} returned InvalidParams on cursor; returning ${n.length} entries from prior pages`),n}n.push(...s.resources),r=s.nextCursor,o++}while(r&&o<VQi);if(r)on(e.name,`resources/directory/read ${t}: stopped at ${VQi} pages with more pending`);return n}
function zQi(e){if(!e.endsWith("/SKILL.md"))return;let t=e.slice(0,-9);return/^[a-z][a-z0-9+.-]*:\/\/./i.test(t)?t:void 0}
var Vrt="inode/directory",VQi=20;
var oHn=b(()=>{YT();Pee();Grt();Rn()});
export {KQi,zQi,Vrt,VQi,oHn};
