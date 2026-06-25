// @ts-nocheck
import {bo,uo} from "./m2468.ts";
import {getIsRemoteMode,lt} from "../src/session/0132_sent.ts";
import {ucc,dcc} from "../src/config/5613_installed.ts";
import {bx,lJ} from "./m4620.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
function mcc(){let e=pcc.c(3),t=bo(),n=knr.useRef(!1),r,o;if(e[0]!==t)r=()=>{if(getIsRemoteMode()||n.current)return;n.current=!0,ucc().then((s)=>{let i=(s.configSaveFailed?1:0)+(!s.installed&&s.skipped&&s.reason==="unknown"?1:0);bx("plugins",i),t((a)=>{if(a.setupIssues.marketplaceIssueCount===i)return a;return{...a,setupIssues:{...a.setupIssues,marketplaceIssueCount:i}}})}).catch(Ie)},o=[t],e[0]=t,e[1]=r,e[2]=o;else r=e[1],o=e[2];knr.useEffect(r,o)}
var pcc,knr;
var fcc=b(()=>{lt();uo();vn();dcc();lJ();pcc=x(tt(),1),knr=x(et(),1)});
export {mcc,pcc,knr,fcc};
