// @ts-nocheck
import {pl,Wu} from "./m438.ts";
import {Ws,vd} from "../src/session/1465_promise.ts";
import {Xst,nDn,iDn,uS} from "../src/config/3192_path.ts";
import {Eat} from "./m3354.ts";
import {isMcpServerBlockedAtConnectTime,KA} from "../src/telemetry/3158_unwrapCcrProxyUrl.ts";
import {VO,zA,ReactRuntime} from "../src/tools/3238_name.ts";
import {jZn,JZn} from "./m5338.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function Lec(e){let[t,n]=Mtr.useState([]);Mtr.useEffect(()=>{if(pl()||Ws())return;if(!Xst())return;let r=!1;return nDn().then(async(o)=>{if(r||!o)return;let s={type:o.url.startsWith("ws:")?"ws-ide":"sse-ide",url:o.url,ideName:o.name,authToken:o.authToken,ideRunningInWindows:o.ideRunningInWindows,scope:"dynamic"};if(await Eat(),r||isMcpServerBlockedAtConnectTime("ide",s))return;let i=await VO("ide",s);if(r)return;if(i.type!=="connected")zA("ide",s).catch(()=>{});n([i])}),()=>{r=!0,iDn()}},[]),jZn(t,e)}
var Mtr;
var Mec=b(()=>{Wu();ReactRuntime();KA();vd();uS();JZn();Mtr=x(et(),1)});
export {Lec,Mtr,Mec};
