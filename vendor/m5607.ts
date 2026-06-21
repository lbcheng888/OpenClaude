// @ts-nocheck
import {mt,configProtoStore} from "./m2458.ts";
import {Ui,Ld} from "./m2459.ts";
import {dd,Dd} from "./m687.ts";
import {yS} from "./m3824.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function anc(e){if(!("text"in e))return 1;let t=e.text.match(/^(\d+)/);return t?.[1]?parseInt(t[1],10):1}
function I$m(e,t){return lnc(anc(e)+1)}
function lnc(e){return{key:"teammate-spawn",kind:"event",text:e===1?"1 teammate started":`${e} teammates started`,priority:"low",timeoutMs:5000,fold:I$m}}
function D$m(e,t){return cnc(anc(e)+1)}
function cnc(e){return{key:"teammate-shutdown",kind:"event",text:e===1?"1 teammate shut down":`${e} teammates shut down`,priority:"low",timeoutMs:5000,fold:D$m}}
function unc(){let e=mt((o)=>o.tasks),{addNotification:t}=Ui(),n=lVt.useRef(new Set),r=lVt.useRef(new Set);lVt.useEffect(()=>{if(dd()!==null)return;for(let[o,s]of Object.entries(e)){if(!yS(s))continue;if(s.status==="running"&&!n.current.has(o))n.current.add(o),t(lnc(1));if(s.status==="completed"&&!r.current.has(o))r.current.add(o),t(cnc(1))}},[e,t])}
var lVt;
var dnc=b(()=>{Ld();Dd();configProtoStore();lVt=M(Te(),1)});
export {anc,I$m,lnc,D$m,cnc,unc,lVt,dnc};
