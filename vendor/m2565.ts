// @ts-nocheck
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function bn(e){let t=jMi.c(5),{children:n}=e,r,o;if(t[0]!==n){o=Symbol.for("react.early_return_sentinel");e:{let i=Svn.Children.toArray(n).filter(HRd);if(i.length===0){o=null;break e}r=i.map(kRd)}t[0]=n,t[1]=r,t[2]=o}else r=t[1],o=t[2];if(o!==Symbol.for("react.early_return_sentinel"))return o;let s;if(t[3]!==r)s=P2e.jsx(P2e.Fragment,{children:r}),t[3]=r,t[4]=s;else s=t[4];return s}
function kRd(e,t){return P2e.jsxs(YMi.Fragment,{children:[t>0&&P2e.jsx(Text,{dimColor:!0,children:" \xB7 "}),e]},Svn.isValidElement(e)?e.key??t:t)}
function HRd(e){return e!==""}
var jMi,YMi,Svn,P2e;
var Is=b(()=>{je();jMi=x(tt(),1),YMi=x(et(),1),Svn=x(et(),1),P2e=x(oe(),1)});
export {bn,kRd,HRd,jMi,YMi,Svn,P2e,Is};
