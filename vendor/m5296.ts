// @ts-nocheck
import {getLastInteractionTime,resetInteractionBaseline,lt} from "../src/session/0131_sent.ts";
import {VK,F4} from "./m2416.ts";
import {useInterval} from "./m2446.ts";
import {Jle,mUt} from "../src/telemetry/3811_configured_channel.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function wxm(){return Date.now()-getLastInteractionTime()}
function Rxm(e){return wxm()<e}
function xxm(e){return!Rxm(e)}
function qWt(e,t){let n=VK(),[r,o]=$Wt.useState(!1);$Wt.useEffect(()=>{resetInteractionBaseline()},[]),$Wt.useEffect(()=>{o(!1)},[e,t,n]),useInterval(()=>{if(xxm(i4l))o(!0),Jle({message:e,notificationType:t},n)},r?null:i4l)}
var $Wt,i4l=6000;
var hPo=b(()=>{lt();F4();ze();mUt();$Wt=M(Te(),1)});
export {wxm,Rxm,xxm,qWt,$Wt,i4l,hPo};
