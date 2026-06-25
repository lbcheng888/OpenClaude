// @ts-nocheck
import {Ci,fd} from "./m2469.ts";
import {bo,uo} from "./m2468.ts";
import {getIsRemoteMode,lt} from "../src/session/0132_sent.ts";
import {Rf} from "./m465.ts";
import {Ne} from "./m583.ts";
import {U_e,c0e} from "./m3774.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {aqe} from "../src/config/3778_level.ts";
import {bx,lJ} from "./m4620.ts";
import {b,x} from "../runtime.ts";
import {Ir} from "./m584.ts";
import {rY} from "./m3778.ts";
import {et} from "./m2261.ts";
function ncc(){let{addNotification:e}=Ci(),t=bo(),n=Rnr.useRef(!1);Rnr.useEffect(()=>{if(getIsRemoteMode()||n.current)return;if(n.current=!0,!Rf()&&!Ne.DISABLE_INSTALLATION_CHECKS)U_e().then((r)=>{if(r==="development")return;t((o)=>{if(o.setupIssues.npmInstallDeprecated)return o;return{...o,setupIssues:{...o.setupIssues,npmInstallDeprecated:!0}}})}).catch(Ie);aqe().then((r)=>{let o=[],s=0;r.forEach((i,a)=>{if(i.type==="error"){o.push(i.message);return}if(i.type==="path"){s++;return}let l=i.type==="alias"?"medium":"low";e({key:`install-message-${a}-${i.type}`,text:i.message,priority:l,color:"warning"})}),bx("install",s),t((i)=>{let a=i.setupIssues;if(a.installPathCount===s&&a.installBrokenMessages.length===o.length&&a.installBrokenMessages.every((l,c)=>l===o[c]))return i;return{...i,setupIssues:{...a,installBrokenMessages:o,installPathCount:s}}})}).catch(Ie)},[e,t])}
var Rnr;
var rcc=b(()=>{lt();fd();uo();c0e();Ir();vn();rY();lJ();Rnr=x(et(),1)});
export {ncc,Rnr,rcc};
