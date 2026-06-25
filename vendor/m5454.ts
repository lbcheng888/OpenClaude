// @ts-nocheck
import {Cge,Dot,ef} from "./m2794.ts";
import {fQl,hQl} from "./m5453.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function gQl({executeQueuedInput:e,hasActiveLocalJsxUI:t,queryGuard:n}){let r=rzt.useSyncExternalStore(n.subscribe,n.getSnapshot),o=rzt.useSyncExternalStore(Cge,Dot);rzt.useEffect(()=>{if(r)return;if(t)return;if(o.length===0)return;fQl({executeInput:e})},[o,r,e,t,n])}
var rzt;
var _Ql=b(()=>{ef();hQl();rzt=x(et(),1)});
export {gQl,rzt,_Ql};
