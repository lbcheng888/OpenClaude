// @ts-nocheck
import {getInitialSettings,hasSkipDangerousModePermissionPrompt,hasAutoModeOptIn,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {t1,wB,nKe,oQ,eC} from "./m717.ts";
import {getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {wFe,Om} from "../src/config/2215_level.ts";
import {Text} from "./m2423.ts";
import {Tn,zs} from "./m2554.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function FXl(e,t){if(e){if(t<30000)return 15000;if(t<300000)return 60000;return 180000}if(t<30000)return 60000;if(t<600000)return 300000;if(t<3600000)return 900000;return 1800000}
function $Xl(e){let t=e?.agent??getInitialSettings().agent;if(!e&&!t)return;let n=e?.permissionMode?t1(e.permissionMode):void 0,r=hasSkipDangerousModePermissionPrompt()||Boolean(getGlobalConfig().bypassPermissionsModeAccepted),o=n==="bypassPermissions"&&!r||n==="auto"&&!hasAutoModeOptIn()?void 0:n,s=e?.allowBypass&&r?!0:void 0,i=e?.effort?.toLowerCase(),a=i&&wFe(i)?i:void 0;if(!o&&!e?.model&&!a&&!t&&!s)return;return{permissionMode:o,model:e?.model,effort:a,agent:t,allowBypass:s}}
function qXl(e){let t=UXl.c(17),{defaults:n}=e,{permissionMode:r,model:o,effort:s,agent:i,allowBypass:a}=n,l=!!r,c=a&&!l;if(!l&&!o&&!s&&!i&&!c)return null;let u;if(t[0]!==r||t[1]!==l)u=l&&y5e.default.createElement(Text,{color:wB(r)},nKe(r)," ",oQ(r).toLowerCase()),t[0]=r,t[1]=l,t[2]=u;else u=t[2];let d;if(t[3]!==c)d=c&&y5e.default.createElement(Text,{color:wB("bypassPermissions")},nKe("bypassPermissions")," bypass available"),t[3]=c,t[4]=d;else d=t[4];let p;if(t[5]!==i)p=i&&y5e.default.createElement(Text,{dimColor:!0},"@",i),t[5]=i,t[6]=p;else p=t[6];let m;if(t[7]!==o)m=o&&y5e.default.createElement(Text,{dimColor:!0},o),t[7]=o,t[8]=m;else m=t[8];let f;if(t[9]!==s)f=s&&y5e.default.createElement(Text,{dimColor:!0},s),t[9]=s,t[10]=f;else f=t[10];let A;if(t[11]!==u||t[12]!==d||t[13]!==p||t[14]!==m||t[15]!==f)A=y5e.default.createElement(Tn,null,u,d,p,m,f),t[11]=u,t[12]=d,t[13]=p,t[14]=m,t[15]=f,t[16]=A;else A=t[16];return A}
var UXl,y5e;
var jXl=b(()=>{zs();ze();Qn();Om();eC();yr();UXl=M(rt(),1),y5e=M(Te(),1)});
export {FXl,$Xl,qXl,UXl,y5e,jXl};
