// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function P5l(e,t){let n=d5e.useRef(e??null),r=d5e.useRef(!e);return d5e.useEffect(()=>{let o=n.current;if(!o)return;let s=!1;return o.then((i)=>{if(s)return;if(r.current=!0,n.current=null,i.length>0)t((a)=>[...i,...a])}),()=>{s=!0}},[t]),d5e.useCallback(async()=>{if(r.current||!n.current)return;let o=await n.current;if(r.current)return;if(r.current=!0,n.current=null,o.length>0)t((s)=>[...o,...s])},[t])}
var d5e;
var O5l=b(()=>{d5e=M(Te(),1)});
export {P5l,d5e,O5l};
