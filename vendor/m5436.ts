// @ts-nocheck
import {ca} from "./m5.ts";
import {z7} from "../src/session/1460_promise.ts";
import {b} from "../runtime.ts";
import {kg} from "./m129.ts";
function cGl(){let e=ca(),t=ca(),n=ca(),r=new Map,o=0;return{subscribe:e.subscribe,onCancel:t.subscribe,onUpdate:n.subscribe,reply(s){let i=r.get(s.id);if(!i)return;r.delete(s.id),i(s)},request({kind:s,payload:i},a){o+=1;let l=`dialog-${o}`,{promise:c,resolve:u}=z7(),d=a?.signal;if(d?.aborted)return queueMicrotask(()=>u({id:l,cancelled:!0})),{id:l,replied:c,update:()=>{}};let p;if(r.set(l,(m)=>{if(d&&p)d.removeEventListener("abort",p);u(m)}),d)p=()=>{if(r.delete(l))u({id:l,cancelled:!0}),t.emit(l)},d.addEventListener("abort",p,{once:!0});return e.emit({id:l,kind:s,payload:i}),{id:l,replied:c,update:(m)=>{if(r.has(l))n.emit({id:l,payload:m})}}}}}
var uGl=b(()=>{kg()});
export {cGl,uGl};
