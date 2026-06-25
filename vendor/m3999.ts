// @ts-nocheck
import {useIsScreenReaderEnabled} from "./m2444.ts";
import {F9a,B9a} from "./m3998.ts";
import {gdt,N9a,W9n} from "./m3997.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Ql,Pa} from "./m720.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Hte({isError:e,isUnresolved:t,shouldAnimate:n}){let r=useIsScreenReaderEnabled(),[o,s]=F9a(n&&!r),i=gdt(),a=G9n.useRef(null);return G9n.useEffect(()=>{if(t)a.current??=Date.now();else if(a.current!==null){if(Date.now()-a.current>N9a)i();a.current=null}},[t,i]),ipo.jsx(Box,{ref:o,minWidth:2,children:ipo.jsx(Text,{"aria-label":e?"tool error:":"tool:",color:t?void 0:e?"error":"success",dimColor:t,children:!n||s||e||!t?Ql:" "})})}
var G9n,ipo;
var _dt=b(()=>{Pa();W9n();B9a();je();G9n=x(et(),1),ipo=x(oe(),1)});
export {Hte,G9n,ipo,_dt};
