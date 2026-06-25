// @ts-nocheck
import {getInitialSettings,br} from "../src/config/0745_updateSettingsForSource.ts";
import {getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {getOauthAccountInfo,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {K3e,__e} from "./m3350.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {V3e,ole} from "./m3348.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Hwl(){let e=getInitialSettings().companyAnnouncements;return!!e&&e.some((t)=>t)}
function Iwl(e){if(Zzn!==null)return Zzn;let t=(getInitialSettings().companyAnnouncements??[]).filter((r)=>r);if(t.length===0)return null;let n=getGlobalConfig().numStartups===1?t[0]:t[Math.floor(Math.random()*t.length)];if(!n)return null;if(e)Zzn=n;return n}
function yum(){Zzn=null}
function xwl(){let e=wwl.c(7),t;if(e[0]===Symbol.for("react.memo_cache_sentinel"))t=getOauthAccountInfo(),e[0]=t;else t=e[0];let n=t,r=K3e(),[o]=kwl.useState(Tum),s;if(e[1]!==r||e[2]!==o)s=r?Iwl(!0):o,e[1]=r,e[2]=o,e[3]=s;else s=e[3];let i=s;if(!i)return null;let a;if(e[4]===Symbol.for("react.memo_cache_sentinel"))a=!process.env.IS_DEMO&&n?.organizationName&&aGt.jsxs(Text,{dimColor:!0,children:["Message from ",n.organizationName,":"]}),e[4]=a;else a=e[4];let l;if(e[5]!==i)l=aGt.jsxs(Box,{flexDirection:"column",children:[a,aGt.jsx(Text,{children:i})]}),e[5]=i,e[6]=l;else l=e[6];return l}
function Tum(){return Iwl(!1)}
var wwl,kwl,aGt,Zzn=null;
var Dwl=b(()=>{je();lo();tr();br();V3e();__e();wwl=x(tt(),1),kwl=x(et(),1),aGt=x(oe(),1);ole(yum)});
export {Hwl,Iwl,yum,xwl,Tum,wwl,kwl,aGt,Zzn,Dwl};
