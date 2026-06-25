// @ts-nocheck
import {Ci,fd} from "./m2469.ts";
import {bo,uo} from "./m2468.ts";
import {pl,Wu} from "./m438.ts";
import {Fbl,K7n} from "../src/telemetry/4709_scope.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Ruc(){let e=Auc.c(8),{addNotification:t}=Ci(),n=bo(),r;if(e[0]===Symbol.for("react.memo_cache_sentinel"))r=[],e[0]=r;else r=e[0];let[o,s]=Lzt.useState(r),i,a;if(e[1]!==n)i=()=>{if(pl())return;return Fbl((d,p)=>{logForDebugging(`Plugin autoupdate notification: ${d.length} plugin(s) updated, ${p.length} blocked by pinner`),s(d),n((m)=>{let f=m.plugins.errors.filter(XGm);if(f.length===m.plugins.errors.length&&p.length===0)return m;return{...m,plugins:{...m.plugins,errors:[...f,...p]}}})})},a=[n],e[1]=n,e[2]=i,e[3]=a;else i=e[2],a=e[3];Lzt.useEffect(i,a);let l,c;if(e[4]!==t||e[5]!==o)l=()=>{if(pl())return;if(o.length===0)return;let u=o.map(JGm),d=u.length<=2?u.join(" and "):`${u.length} plugins`;t({key:"plugin-autoupdate-restart",jsx:pVe.jsxs(pVe.Fragment,{children:[pVe.jsxs(Text,{color:"success",children:[u.length===1?"Plugin":"Plugins"," updated:"," ",d]}),pVe.jsx(Text,{dimColor:!0,children:" \xB7 Run /reload-plugins to apply"})]}),priority:"low",timeoutMs:1e4}),logForDebugging(`Showing plugin autoupdate notification for: ${u.join(", ")}`)},c=[o,t],e[4]=t,e[5]=o,e[6]=l,e[7]=c;else l=e[6],c=e[7];Lzt.useEffect(l,c)}
function JGm(e){let t=e.indexOf("@");return t>0?e.substring(0,t):e}
function XGm(e){return e.type!=="autoupdate-blocked-by-pinner"}
var Auc,Lzt,pVe;
var vuc=b(()=>{fd();je();Wu();uo();qe();K7n();Auc=x(tt(),1),Lzt=x(et(),1),pVe=x(oe(),1)});
export {Ruc,JGm,XGm,Auc,Lzt,pVe,vuc};
