// @ts-nocheck
import {useIsScreenReaderEnabled} from "./m2434.ts";
import {gMa,_Ma} from "./m3936.ts";
import {sct,hMa,hUn} from "./m3935.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {fc,sl} from "./m715.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function Ite({isError:e,isUnresolved:t,shouldAnimate:n}){let r=useIsScreenReaderEnabled(),[o,s]=gMa(n&&!r),i=sct(),a=Q4e.useRef(null);return Q4e.useEffect(()=>{if(t)a.current??=Date.now();else if(a.current!==null){if(Date.now()-a.current>hMa)i();a.current=null}},[t,i]),Q4e.default.createElement(Box,{ref:o,minWidth:2},Q4e.default.createElement(Text,{"aria-label":e?"tool error:":"tool:",color:t?void 0:e?"error":"success",dimColor:t},!n||s||e||!t?fc:" "))}
var Q4e;
var ict=b(()=>{sl();hUn();_Ma();ze();Q4e=M(Te(),1)});
export {Ite,Q4e,ict};
