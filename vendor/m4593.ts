// @ts-nocheck
import {bo,configProtoStore} from "./m2458.ts";
import {EHe,kat} from "./m3763.ts";
import {wst,gDn} from "./m3349.ts";
import {ec,Dd} from "./m687.ts";
import {lD,EJ} from "./m4592.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function g5n(){let e=zcl.c(5),t=bo(),[n,r]=h5n.useState(W7p),o;if(e[0]===Symbol.for("react.memo_cache_sentinel"))o=()=>{let{errors:l}=EHe();r(l)},e[0]=o;else o=e[0];wst(o);let i,a;if(e[1]!==n||e[2]!==t)i=()=>{if(ec())return;lD("settings",n.length),t((l)=>{if(l.setupIssues.settingsErrorCount===n.length)return l;return{...l,setupIssues:{...l.setupIssues,settingsErrorCount:n.length}}})},a=[n,t],e[1]=n,e[2]=t,e[3]=i,e[4]=a;else i=e[3],a=e[4];return h5n.useEffect(i,a),n}
function W7p(){let{errors:e}=EHe();return e}
var zcl,h5n;
var JTo=b(()=>{Dd();configProtoStore();kat();EJ();gDn();zcl=M(rt(),1),h5n=M(Te(),1)});
export {g5n,W7p,zcl,h5n,JTo};
