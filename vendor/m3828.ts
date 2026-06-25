// @ts-nocheck
import {sD,cmn} from "./m1449.ts";
import {Box} from "./m2432.ts";
import {Ba,I_} from "./m2584.ts";
import {pb,eG} from "./m3827.ts";
import {Text} from "./m2433.ts";
import {Link} from "./m2437.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function d2n(){let e=vMa.c(10),t;if(e[0]===Symbol.for("react.memo_cache_sentinel"))t=sD.getInstance().getStatus(),e[0]=t;else t=e[0];let[n,r]=u2n.useState(t),o,s;if(e[1]===Symbol.for("react.memo_cache_sentinel"))o=()=>sD.getInstance().subscribe(r),s=[],e[1]=o,e[2]=s;else o=e[1],s=e[2];if(u2n.useEffect(o,s),!n.isAuthenticating&&!n.error&&n.output.length===0)return null;if(!n.isAuthenticating&&!n.error)return null;let i;if(e[3]!==n.output)i=n.output.length>0&&V_e.jsx(Box,{flexDirection:"column",children:n.output.slice(-5).map(LAp)}),e[3]=n.output,e[4]=i;else i=e[4];let a;if(e[5]!==n.error)a=n.error&&V_e.jsx(Ba,{error:n.error}),e[5]=n.error,e[6]=a;else a=e[6];let l;if(e[7]!==i||e[8]!==a)l=V_e.jsx(Box,{marginY:1,children:V_e.jsxs(pb,{color:"permission",title:"Cloud authentication",children:[i,a]})}),e[7]=i,e[8]=a,e[9]=l;else l=e[9];return l}
function LAp(e,t){let n=e.match(OAp);if(!n)return V_e.jsx(Text,{dimColor:!0,children:e},t);let r=n[0],o=n.index??0,s=e.slice(0,o),i=e.slice(o+r.length);return V_e.jsxs(Text,{dimColor:!0,children:[s,V_e.jsx(Link,{url:r,children:r}),i]},t)}
var vMa,u2n,V_e,OAp;
var Llo=b(()=>{je();cmn();I_();eG();vMa=x(tt(),1),u2n=x(et(),1),V_e=x(oe(),1),OAp=/https?:\/\/\S+/});
export {d2n,LAp,vMa,u2n,V_e,OAp,Llo};
