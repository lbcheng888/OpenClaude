// @ts-nocheck
import {je} from "./m577.ts";
import {WD,_me} from "./m1285.ts";
import {isOverageProvisioningAllowed,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {b} from "../runtime.ts";
import {lt,getIsNonInteractiveSession} from "../src/session/0131_sent.ts";
import {Lr} from "./m578.ts";
import {i$t,Gio} from "./m3953.ts";
import {Kio,Vio} from "./m3954.ts";
import {Jio,Yio} from "./m3955.ts";
function pct(){if(je.DISABLE_EXTRA_USAGE_COMMAND)return!1;if(WD()!==null)return!0;return isOverageProvisioningAllowed()}
var Lte,Xio,Qio,Zio;
var mct=b(()=>{lt();_me();Ao();Lr();Lte={type:"local-jsx",name:"usage-credits",description:"Configure usage credits to keep working when you hit a limit",isEnabled:()=>pct()&&!getIsNonInteractiveSession(),requires:{ink:!0},load:()=>Promise.resolve().then(() => (i$t(),Gio))},Xio={type:"local",name:"usage-credits",supportsNonInteractive:!0,description:"Configure usage credits to keep working when you hit a limit",isEnabled:()=>pct()&&getIsNonInteractiveSession(),get isHidden(){return!getIsNonInteractiveSession()},load:()=>Promise.resolve().then(() => (Kio(),Vio))},Qio={type:"local-jsx",name:"extra-usage",description:"Renamed to /usage-credits",isHidden:!0,isEnabled:()=>pct()&&!getIsNonInteractiveSession(),requires:{ink:!0},load:()=>Promise.resolve().then(() => (Jio(),Yio))},Zio={type:"local",name:"extra-usage",supportsNonInteractive:!0,description:"Renamed to /usage-credits",isHidden:!0,isEnabled:()=>pct()&&getIsNonInteractiveSession(),load:()=>Promise.resolve().then(() => (Jio(),Yio)).then((e)=>({call:e.callNonInteractive}))}});
export {pct,Lte,Xio,Qio,Zio,mct};
