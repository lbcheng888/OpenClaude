// @ts-nocheck
import {bo,uo} from "./m2468.ts";
import {getIsRemoteMode,lt} from "../src/session/0132_sent.ts";
import {Xga,Jga,rLn} from "../src/telemetry/3352_seenNotifications.ts";
import {ajn,RHo} from "../src/config/4834_children.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function hcc(){let e=bo(),t=Hnr.useRef(!1);Hnr.useEffect(()=>{if(getIsRemoteMode()||t.current)return;if(t.current=!0,!Xga()||ajn())return;Jga().then((n)=>{if(n===null)return;e((r)=>{if(r.setupIssues.existingClaudeSubscription===n)return r;return{...r,setupIssues:{...r.setupIssues,existingClaudeSubscription:n}}})}).catch(Ie)},[e])}
var Hnr;
var gcc=b(()=>{lt();rLn();uo();vn();RHo();Hnr=x(et(),1)});
export {hcc,Hnr,gcc};
