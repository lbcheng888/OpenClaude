// @ts-nocheck
import {getInitialSettings,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {getOauthAccountInfo,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {SNt,rge} from "./m3334.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Tst,Fke} from "./m3332.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function kyl(){let e=getInitialSettings().companyAnnouncements;return!!e&&e.some((t)=>t)}
function Hyl(e){if(pGn!==null)return pGn;let t=(getInitialSettings().companyAnnouncements??[]).filter((r)=>r);if(t.length===0)return null;let n=getGlobalConfig().numStartups===1?t[0]:t[Math.floor(Math.random()*t.length)];if(!n)return null;if(e)pGn=n;return n}
function stm(){pGn=null}
function Iyl(){let e=Ryl.c(7),t;if(e[0]===Symbol.for("react.memo_cache_sentinel"))t=getOauthAccountInfo(),e[0]=t;else t=e[0];let n=t,r=SNt(),[o]=xyl.useState(itm),s;if(e[1]!==r||e[2]!==o)s=r?Hyl(!0):o,e[1]=r,e[2]=o,e[3]=s;else s=e[3];let i=s;if(!i)return null;let a;if(e[4]===Symbol.for("react.memo_cache_sentinel"))a=!process.env.IS_DEMO&&n?.organizationName&&Yje.createElement(Text,{dimColor:!0},"Message from ",n.organizationName,":"),e[4]=a;else a=e[4];let l;if(e[5]!==i)l=Yje.createElement(Box,{flexDirection:"column"},a,Yje.createElement(Text,null,i)),e[5]=i,e[6]=l;else l=e[6];return l}
function itm(){return Hyl(!1)}
var Ryl,Yje,xyl,pGn=null;
var Dyl=b(()=>{ze();Ao();Qn();yr();Tst();rge();Ryl=M(rt(),1),Yje=M(Te(),1),xyl=M(Te(),1);Fke(stm)});
export {kyl,Hyl,stm,Iyl,itm,Ryl,Yje,xyl,pGn,Dyl};
