// @ts-nocheck
import {_t,uo} from "./m2468.ts";
import {VKt,aZn} from "./m5259.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function Qjl(e){let t=_t((r)=>r.footerLinks),n=e?.excludeKeyed===!0;return Xjl.useMemo(()=>{let r=n?t.filter((o)=>o.key===void 0):t;return r.length<=VKt?r:r.slice(0,VKt)},[t,n])}
var Xjl;
var Zjl=b(()=>{uo();aZn();Xjl=x(et(),1)});
export {Qjl,Xjl,Zjl};
