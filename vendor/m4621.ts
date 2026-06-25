// @ts-nocheck
import {bo,uo} from "./m2468.ts";
import {d0e,kct} from "./m3779.ts";
import {Aat,uLn} from "./m3365.ts";
import {pl,Wu} from "./m438.ts";
import {bx,lJ} from "./m4620.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
function QKn(){let e=H_l.c(5),t=bo(),[n,r]=XKn.useState(jtm),o;if(e[0]===Symbol.for("react.memo_cache_sentinel"))o=()=>{let{errors:l}=d0e();r(l)},e[0]=o;else o=e[0];Aat(o);let i,a;if(e[1]!==n||e[2]!==t)i=()=>{if(pl())return;bx("settings",n.length),t((l)=>{if(l.setupIssues.settingsErrorCount===n.length)return l;return{...l,setupIssues:{...l.setupIssues,settingsErrorCount:n.length}}})},a=[n,t],e[1]=n,e[2]=t,e[3]=i,e[4]=a;else i=e[3],a=e[4];return XKn.useEffect(i,a),n}
function jtm(){let{errors:e}=d0e();return e}
var H_l,XKn;
var uvo=b(()=>{Wu();uo();kct();lJ();uLn();H_l=x(tt(),1),XKn=x(et(),1)});
export {QKn,jtm,H_l,XKn,uvo};
