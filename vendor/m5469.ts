// @ts-nocheck
import {Ni} from "./m127.ts";
import {T7} from "../src/session/1465_promise.ts";
import {b} from "../runtime.ts";
import {ig} from "./m130.ts";
function KQl(){let e=Ni(),t=Ni(),n=Ni(),r=new Map,o=0;return{subscribe:e.subscribe,onCancel:t.subscribe,onUpdate:n.subscribe,reply(s){let i=r.get(s.id);if(!i)return;r.delete(s.id),i(s)},request({kind:s,payload:i},a){o+=1;let l=`dialog-${o}`,{promise:c,resolve:u}=T7(),d=a?.signal;if(d?.aborted)return queueMicrotask(()=>u({id:l,cancelled:!0})),{id:l,replied:c,update:()=>{}};let p;if(r.set(l,(m)=>{if(d&&p)d.removeEventListener("abort",p);u(m)}),d)p=()=>{if(r.delete(l))u({id:l,cancelled:!0}),t.emit(l)},d.addEventListener("abort",p,{once:!0});return e.emit({id:l,kind:s,payload:i,queueBehind:a?.queueBehind}),{id:l,replied:c,update:(m)=>{if(r.has(l))n.emit({id:l,payload:m})}}}}}
var zQl=b(()=>{ig()});
export {KQl,zQl};
