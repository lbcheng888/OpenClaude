// @ts-nocheck
import {Ui,Ld} from "./m2459.ts";
import {bo,configProtoStore} from "./m2458.ts";
import {getIsRemoteMode,lt} from "../src/session/0131_sent.ts";
import {_A} from "./m459.ts";
import {je} from "./m577.ts";
import {wge,SHe} from "./m3758.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {K3e} from "../src/config/3762_level.ts";
import {lD,EJ} from "./m4592.ts";
import {b,M} from "../runtime.ts";
import {Lr} from "./m578.ts";
import {wY} from "./m3762.ts";
import {Te} from "./m2253.ts";
function Aec(){let{addNotification:e}=Ui(),t=bo(),n=EQn.useRef(!1);EQn.useEffect(()=>{if(getIsRemoteMode()||n.current)return;if(n.current=!0,!_A()&&!je.DISABLE_INSTALLATION_CHECKS)wge().then((r)=>{if(r==="development")return;t((o)=>{if(o.setupIssues.npmInstallDeprecated)return o;return{...o,setupIssues:{...o.setupIssues,npmInstallDeprecated:!0}}})}).catch(De);K3e().then((r)=>{let o=[],s=0;r.forEach((i,a)=>{if(i.type==="error"){o.push(i.message);return}if(i.type==="path"){s++;return}let l=i.type==="alias"?"medium":"low";e({key:`install-message-${a}-${i.type}`,text:i.message,priority:l,color:"warning"})}),lD("install",s),t((i)=>{let a=i.setupIssues;if(a.installPathCount===s&&a.installBrokenMessages.length===o.length&&a.installBrokenMessages.every((l,c)=>l===o[c]))return i;return{...i,setupIssues:{...a,installBrokenMessages:o,installPathCount:s}}})}).catch(De)},[e,t])}
var EQn;
var hec=b(()=>{lt();Ld();configProtoStore();SHe();Lr();Rn();wY();EJ();EQn=M(Te(),1)});
export {Aec,EQn,hec};
