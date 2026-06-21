// @ts-nocheck
import {Ui,Ld} from "./m2459.ts";
import {bo,configProtoStore} from "./m2458.ts";
import {ec,Dd} from "./m687.ts";
import {Kml,cWn} from "../src/telemetry/4681_scope.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Ntc(){let e=Mtc.c(8),{addNotification:t}=Ui(),n=bo(),r;if(e[0]===Symbol.for("react.memo_cache_sentinel"))r=[],e[0]=r;else r=e[0];let[o,s]=iVt.useState(r),i,a;if(e[1]!==n)i=()=>{if(ec())return;return Kml((d,p)=>{logForDebugging(`Plugin autoupdate notification: ${d.length} plugin(s) updated, ${p.length} blocked by pinner`),s(d),n((m)=>{let f=m.plugins.errors.filter(b$m);if(f.length===m.plugins.errors.length&&p.length===0)return m;return{...m,plugins:{...m.plugins,errors:[...f,...p]}}})})},a=[n],e[1]=n,e[2]=i,e[3]=a;else i=e[2],a=e[3];iVt.useEffect(i,a);let l,c;if(e[4]!==t||e[5]!==o)l=()=>{if(ec())return;if(o.length===0)return;let u=o.map(S$m),d=u.length<=2?u.join(" and "):`${u.length} plugins`;t({key:"plugin-autoupdate-restart",jsx:cde.createElement(cde.Fragment,null,cde.createElement(Text,{color:"success"},u.length===1?"Plugin":"Plugins"," updated:"," ",d),cde.createElement(Text,{dimColor:!0}," \xB7 Run /reload-plugins to apply")),priority:"low",timeoutMs:1e4}),logForDebugging(`Showing plugin autoupdate notification for: ${u.join(", ")}`)},c=[o,t],e[4]=t,e[5]=o,e[6]=l,e[7]=c;else l=e[6],c=e[7];iVt.useEffect(l,c)}
function S$m(e){let t=e.indexOf("@");return t>0?e.substring(0,t):e}
function b$m(e){return e.type!=="autoupdate-blocked-by-pinner"}
var Mtc,cde,iVt;
var Btc=b(()=>{Ld();ze();Dd();configProtoStore();qe();cWn();Mtc=M(rt(),1),cde=M(Te(),1),iVt=M(Te(),1)});
export {Ntc,S$m,b$m,Mtc,cde,iVt,Btc};
