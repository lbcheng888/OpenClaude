// @ts-nocheck
import {getInitialSettings,hasSkipDangerousModePermissionPrompt,hasAutoModeOptIn,br} from "../src/config/0745_updateSettingsForSource.ts";
import {fM,YN,eYe,tQ,FS} from "./m722.ts";
import {getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {CUe,Cp} from "../src/config/2223_level.ts";
import {Text} from "./m2433.ts";
import {bn,Is} from "./m2565.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Aic(e,t){if(e){if(t<30000)return 15000;if(t<300000)return 60000;return 180000}if(t<30000)return 60000;if(t<600000)return 300000;if(t<3600000)return 900000;return 1800000}
function vic(e){let t=e?.agent??getInitialSettings().agent;if(!e&&!t)return;let n=e?.permissionMode?fM(e.permissionMode):void 0,r=hasSkipDangerousModePermissionPrompt()||Boolean(getGlobalConfig().bypassPermissionsModeAccepted),o=n==="bypassPermissions"&&!r||n==="auto"&&!hasAutoModeOptIn()?void 0:n,s=e?.allowBypass&&r?!0:void 0,i=e?.effort?.toLowerCase(),a=i&&CUe(i)?i:void 0;if(!o&&!e?.model&&!a&&!t&&!s)return;return{permissionMode:o,model:e?.model,effort:a,agent:t,allowBypass:s}}
function wic(e){let t=Ric.c(17),{defaults:n}=e,{permissionMode:r,model:o,effort:s,agent:i,allowBypass:a}=n,l=!!r,c=a&&!l;if(!l&&!o&&!s&&!i&&!c)return null;let u;if(t[0]!==r||t[1]!==l)u=l&&tLe.jsxs(Text,{color:YN(r),children:[eYe(r)," ",tQ(r).toLowerCase()]}),t[0]=r,t[1]=l,t[2]=u;else u=t[2];let d;if(t[3]!==c)d=c&&tLe.jsxs(Text,{color:YN("bypassPermissions"),children:[eYe("bypassPermissions")," bypass available"]}),t[3]=c,t[4]=d;else d=t[4];let p;if(t[5]!==i)p=i&&tLe.jsxs(Text,{dimColor:!0,children:["@",i]}),t[5]=i,t[6]=p;else p=t[6];let m;if(t[7]!==o)m=o&&tLe.jsx(Text,{dimColor:!0,children:o}),t[7]=o,t[8]=m;else m=t[8];let f;if(t[9]!==s)f=s&&tLe.jsx(Text,{dimColor:!0,children:s}),t[9]=s,t[10]=f;else f=t[10];let h;if(t[11]!==u||t[12]!==d||t[13]!==p||t[14]!==m||t[15]!==f)h=tLe.jsxs(bn,{children:[u,d,p,m,f]}),t[11]=u,t[12]=d,t[13]=p,t[14]=m,t[15]=f,t[16]=h;else h=t[16];return h}
var Ric,tLe;
var kic=b(()=>{Is();je();tr();Cp();FS();br();Ric=x(tt(),1),tLe=x(oe(),1)});
export {Aic,vic,wic,Ric,tLe,kic};
