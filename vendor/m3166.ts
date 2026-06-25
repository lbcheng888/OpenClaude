// @ts-nocheck
import {_Xr,kee} from "../src/telemetry/3165_kee.ts";
import {GMe,li,_i,Qy} from "../src/tools/0325_ttl.ts";
import {HW,Vst} from "./m3165.ts";
import {ln,vn} from "../src/session/0621_length.ts";
import {b} from "../runtime.ts";
function q9e(e){let t=e?.extensions?.[_Xr];return t!=null&&typeof t==="object"&&"directoryRead"in t&&t.directoryRead===!0}
async function Wsa(e,t){if(!q9e(e.capabilities))throw Error("readMcpDirectory called on a server without directoryRead capability");let n=[],r,o=0;do{let s;try{s=await e.client.request({method:"resources/directory/read",params:{uri:t,...r&&{cursor:r}}},GMe,{timeout:HW()})}catch(i){if(o===0||!(i instanceof li&&i.code===_i.InvalidParams))throw i;return ln(e.name,`resources/directory/read ${t}: page ${o+1} returned InvalidParams on cursor; returning ${n.length} entries from prior pages`),n}n.push(...s.resources),r=s.nextCursor,o++}while(r&&o<qsa);if(r)ln(e.name,`resources/directory/read ${t}: stopped at ${qsa} pages with more pending`);return n}
var GNt="inode/directory",qsa=20;
var VNt=b(()=>{Qy();vn();kee();Vst()});
export {q9e,Wsa,GNt,qsa,VNt};
