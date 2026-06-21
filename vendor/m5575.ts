// @ts-nocheck
import {bo,configProtoStore} from "./m2458.ts";
import {getIsRemoteMode,lt} from "../src/session/0131_sent.ts";
import {Eec,Cec} from "../src/config/5575_installed.ts";
import {lD,EJ} from "./m4592.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function wec(){let e=vec.c(3),t=bo(),n=wQn.useRef(!1),r,o;if(e[0]!==t)r=()=>{if(getIsRemoteMode()||n.current)return;n.current=!0,Eec().then((s)=>{let i=(s.configSaveFailed?1:0)+(!s.installed&&s.skipped&&s.reason==="unknown"?1:0);lD("plugins",i),t((a)=>{if(a.setupIssues.marketplaceIssueCount===i)return a;return{...a,setupIssues:{...a.setupIssues,marketplaceIssueCount:i}}})}).catch(De)},o=[t],e[0]=t,e[1]=r,e[2]=o;else r=e[1],o=e[2];wQn.useEffect(r,o)}
var vec,wQn;
var Rec=b(()=>{lt();configProtoStore();Rn();Cec();EJ();vec=M(rt(),1),wQn=M(Te(),1)});
export {wec,vec,wQn,Rec};
