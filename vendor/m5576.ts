// @ts-nocheck
import {bo,configProtoStore} from "./m2458.ts";
import {getIsRemoteMode,lt} from "../src/session/0131_sent.ts";
import {Fca,Bca,uDn} from "../src/tui/3336_seenNotifications.ts";
import {_Gn,lCo} from "../src/tui/4802_arm.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function xec(){let e=bo(),t=RQn.useRef(!1);RQn.useEffect(()=>{if(getIsRemoteMode()||t.current)return;if(t.current=!0,!Fca()||_Gn())return;Bca().then((n)=>{if(n===null)return;e((r)=>{if(r.setupIssues.existingClaudeSubscription===n)return r;return{...r,setupIssues:{...r.setupIssues,existingClaudeSubscription:n}}})}).catch(De)},[e])}
var RQn;
var kec=b(()=>{lt();uDn();configProtoStore();Rn();lCo();RQn=M(Te(),1)});
export {xec,RQn,kec};
