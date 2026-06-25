// @ts-nocheck
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function _Xl(e,t){let n=ZGe.useRef(e??null),r=ZGe.useRef(!e);return ZGe.useEffect(()=>{let o=n.current;if(!o)return;let s=!1;return o.then((i)=>{if(s)return;if(r.current=!0,n.current=null,i.length>0)t((a)=>[...i,...a])}),()=>{s=!0}},[t]),ZGe.useCallback(async()=>{if(r.current||!n.current)return;let o=await n.current;if(r.current)return;if(r.current=!0,n.current=null,o.length>0)t((s)=>[...o,...s])},[t])}
var ZGe;
var yXl=b(()=>{ZGe=x(et(),1)});
export {_Xl,ZGe,yXl};
