// @ts-nocheck
import {U_e,c0e} from "./m3774.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {N7l,F7l} from "../src/config/5345_isUpdating.ts";
import {I7l,x7l} from "../src/config/5344_isUpdating.ts";
import {k7l,H7l} from "../src/tui/5343_isUpdating.ts";
import {b,x} from "../runtime.ts";
import {tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function ter(e){let t=B7l.c(13),{isUpdating:n,onChangeIsUpdating:r,showSuccessMessage:o,verbose:s}=e,[i,a]=I7t.useState(null),[l,c]=I7t.useState(null),u,d;if(t[0]===Symbol.for("react.memo_cache_sentinel"))u=()=>{(async function(){let g=await U_e();logForDebugging(`AutoUpdaterWrapper: Installation type: ${g}`),a(g==="native"),c(g==="package-manager")})()},d=[],t[0]=u,t[1]=d;else u=t[0],d=t[1];if(I7t.useEffect(u,d),i===null||l===null)return null;if(l){let f;if(t[2]!==n||t[3]!==r||t[4]!==o||t[5]!==s)f=jNo.jsx(N7l,{verbose:s,isUpdating:n,onChangeIsUpdating:r,showSuccessMessage:o}),t[2]=n,t[3]=r,t[4]=o,t[5]=s,t[6]=f;else f=t[6];return f}let p=i?I7l:k7l,m;if(t[7]!==p||t[8]!==n||t[9]!==r||t[10]!==o||t[11]!==s)m=jNo.jsx(p,{verbose:s,isUpdating:n,onChangeIsUpdating:r,showSuccessMessage:o}),t[7]=p,t[8]=n,t[9]=r,t[10]=o,t[11]=s,t[12]=m;else m=t[12];return m}
var B7l,I7t,jNo;
var YNo=b(()=>{tr();qe();c0e();H7l();x7l();F7l();B7l=x(tt(),1),I7t=x(et(),1),jNo=x(oe(),1)});
export {ter,B7l,I7t,jNo,YNo};
