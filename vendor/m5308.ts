// @ts-nocheck
import {wge,SHe} from "./m3758.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {k4l,H4l} from "../src/config/5308_isUpdating.ts";
import {b4l,E4l} from "../src/config/5307_isUpdating.ts";
import {T4l,S4l} from "../src/tui/5306_isUpdating.ts";
import {b,M} from "../runtime.ts";
import {Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function VYn(e){let t=I4l.c(13),{isUpdating:n,onChangeIsUpdating:r,showSuccessMessage:o,verbose:s}=e,[i,a]=QWt.useState(null),[l,c]=QWt.useState(null),u,d;if(t[0]===Symbol.for("react.memo_cache_sentinel"))u=()=>{(async function(){let h=await wge();logForDebugging(`AutoUpdaterWrapper: Installation type: ${h}`),a(h==="native"),c(h==="package-manager")})()},d=[],t[0]=u,t[1]=d;else u=t[0],d=t[1];if(QWt.useEffect(u,d),i===null||l===null)return null;if(l){let f;if(t[2]!==n||t[3]!==r||t[4]!==o||t[5]!==s)f=XWt.createElement(k4l,{verbose:s,isUpdating:n,onChangeIsUpdating:r,showSuccessMessage:o}),t[2]=n,t[3]=r,t[4]=o,t[5]=s,t[6]=f;else f=t[6];return f}let p=i?b4l:T4l,m;if(t[7]!==p||t[8]!==n||t[9]!==r||t[10]!==o||t[11]!==s)m=XWt.createElement(p,{verbose:s,isUpdating:n,onChangeIsUpdating:r,showSuccessMessage:o}),t[7]=p,t[8]=n,t[9]=r,t[10]=o,t[11]=s,t[12]=m;else m=t[12];return m}
var I4l,XWt,QWt;
var SPo=b(()=>{Qn();qe();SHe();S4l();E4l();H4l();I4l=M(rt(),1),XWt=M(Te(),1),QWt=M(Te(),1)});
export {VYn,I4l,XWt,QWt,SPo};
