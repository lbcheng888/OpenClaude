// @ts-nocheck
import {_t,uo} from "./m2468.ts";
import {Ci,fd} from "./m2469.ts";
import {Nu,Wu} from "./m438.ts";
import {mS} from "./m3842.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function zuc(e){if(!("text"in e))return 1;let t=e.text.match(/^(\d+)/);return t?.[1]?parseInt(t[1],10):1}
function rVm(e,t){return juc(zuc(e)+1)}
function juc(e){return{key:"teammate-spawn",kind:"event",text:e===1?"1 teammate started":`${e} teammates started`,priority:"low",timeoutMs:5000,fold:rVm}}
function oVm(e,t){return Yuc(zuc(e)+1)}
function Yuc(e){return{key:"teammate-shutdown",kind:"event",text:e===1?"1 teammate shut down":`${e} teammates shut down`,priority:"low",timeoutMs:5000,fold:oVm}}
function Juc(){let e=_t((o)=>o.tasks),{addNotification:t}=Ci(),n=Nzt.useRef(new Set),r=Nzt.useRef(new Set);Nzt.useEffect(()=>{if(Nu()!==null)return;for(let[o,s]of Object.entries(e)){if(!mS(s))continue;if(s.status==="running"&&!n.current.has(o))n.current.add(o),t(juc(1));if(s.status==="completed"&&!r.current.has(o))r.current.add(o),t(Yuc(1))}},[e,t])}
var Nzt;
var Xuc=b(()=>{fd();Wu();uo();Nzt=x(et(),1)});
export {zuc,rVm,juc,oVm,Yuc,Juc,Nzt,Xuc};
