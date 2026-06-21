// @ts-nocheck
import {saveGlobalConfig,getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {pr} from "./m2562.ts";
import {Text} from "./m2423.ts";
import {Kn,Li} from "./m2572.ts";
import {FF,ab} from "../src/config/3178_path.ts";
import {ac,e_} from "./m3338.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {yb} from "./m4521.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Jul(e){let t=uSo.c(9),{onComplete:n}=e,r;if(t[0]!==n)r=async(u)=>{let d=u==="yes";saveGlobalConfig((p)=>({...p,autoConnectIde:d,hasIdeAutoConnectDialogBeenShown:!0})),n()},t[0]=n,t[1]=r;else r=t[1];let o=r,s;if(t[2]===Symbol.for("react.memo_cache_sentinel"))s=[{label:"Yes",value:"yes"},{label:"No",value:"no"}],t[2]=s;else s=t[2];let i=s,a;if(t[3]!==o)a=imt.default.createElement(pr,{options:i,onChange:o,defaultValue:"yes"}),t[3]=o,t[4]=a;else a=t[4];let l;if(t[5]===Symbol.for("react.memo_cache_sentinel"))l=imt.default.createElement(Text,{dimColor:!0},"You can also configure this in /config or with the --ide flag"),t[5]=l;else l=t[5];let c;if(t[6]!==n||t[7]!==a)c=imt.default.createElement(Kn,{title:"Do you wish to enable auto-connect to IDE?",color:"ide",onCancel:n},a,l),t[6]=n,t[7]=a,t[8]=c;else c=t[8];return c}
function Xul(){let e=getGlobalConfig();return!FF()&&e.autoConnectIde!==!0&&e.hasIdeAutoConnectDialogBeenShown!==!0}
function Qul(e){let t=uSo.c(10),{onComplete:n}=e,r;if(t[0]!==n)r=()=>{saveGlobalConfig(qKp),n(!0)},t[0]=n,t[1]=r;else r=t[1];let o=r,s;if(t[2]!==n)s=()=>{n(!1)},t[2]=n,t[3]=s;else s=t[3];let i=s,a;if(t[4]!==i||t[5]!==o)a=imt.default.createElement(ac,{cancelFirst:!0,focus:"cancel",onConfirm:o,onCancel:i}),t[4]=i,t[5]=o,t[6]=a;else a=t[6];let l;if(t[7]!==i||t[8]!==a)l=imt.default.createElement(Kn,{title:"Do you wish to disable auto-connect to IDE?",subtitle:"You can also configure this in /config",onCancel:i,color:"ide"},a),t[7]=i,t[8]=a,t[9]=l;else l=t[9];return l}
function qKp(e){return{...e,autoConnectIde:!1}}
function Zul(){let e=getGlobalConfig();return!FF()&&e.autoConnectIde===!0}
var uSo,imt;
var edl=b(()=>{ze();Qn();ab();yb();e_();Li();uSo=M(rt(),1),imt=M(Te(),1)});
export {Jul,Xul,Qul,qKp,Zul,uSo,imt,edl};
