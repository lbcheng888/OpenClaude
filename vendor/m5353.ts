// @ts-nocheck
import {mt,configProtoStore} from "./m2458.ts";
import {hWt,lYn} from "./m5226.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function Tjl(e){let t=mt((r)=>r.footerLinks),n=e?.excludeKeyed===!0;return yjl.useMemo(()=>{let r=n?t.filter((o)=>o.key===void 0):t;return r.length<=hWt?r:r.slice(0,hWt)},[t,n])}
var yjl;
var Sjl=b(()=>{configProtoStore();lYn();yjl=M(Te(),1)});
export {Tjl,yjl,Sjl};
