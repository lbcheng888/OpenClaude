// @ts-nocheck
import {ndn,hp} from "../src/session/1460_promise.ts";
import {bsl,Lpt} from "../src/agent/4492_label.ts";
import {sendRv,j6e} from "../src/config/4391_stopRendezvousServer.ts";
import {aue,rM} from "./m4493.ts";
import {b} from "../runtime.ts";
function K_e(e){if(!ndn())return;let t=bsl();if(sendRv({type:"detach-request",msg:t,broadcast:e?.broadcast}))return;process.stdout.write(aue(t))}
var Qqt=b(()=>{j6e();hp();Lpt();rM()});
export {K_e,Qqt};
