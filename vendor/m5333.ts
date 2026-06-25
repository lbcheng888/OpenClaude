// @ts-nocheck
import {getLastInteractionTime,resetInteractionBaseline,lt} from "../src/session/0132_sent.ts";
import {bz,i4} from "./m2426.ts";
import {useInterval} from "./m2456.ts";
import {jle,W$t} from "../src/telemetry/3827_configured_channel.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
function t1m(){return Date.now()-getLastInteractionTime()}
function n1m(e){return t1m()<e}
function r1m(e){return!n1m(e)}
function b7t(e,t){let n=bz(),[r,o]=S7t.useState(!1);S7t.useEffect(()=>{resetInteractionBaseline()},[]),S7t.useEffect(()=>{o(!1)},[e,t,n]),useInterval(()=>{if(r1m(h7l))o(!0),jle({message:e,notificationType:t},n)},r?null:h7l)}
var S7t,h7l=6000;
var WNo=b(()=>{lt();i4();je();W$t();S7t=x(et(),1)});
export {t1m,n1m,r1m,b7t,S7t,h7l,WNo};
