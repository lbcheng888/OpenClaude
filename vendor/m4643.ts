// @ts-nocheck
import {saveGlobalConfig,getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {hr} from "./m2573.ts";
import {Text} from "./m2433.ts";
import {preInitQueue,di} from "./m2583.ts";
import {cB,uS} from "../src/config/3192_path.ts";
import {Bl,d_} from "./m3354.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {TS} from "./m4541.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function xyl(e){let t=Cvo.c(9),{onComplete:n}=e,r;if(t[0]!==n)r=async(u)=>{let d=u==="yes";saveGlobalConfig((p)=>({...p,autoConnectIde:d,hasIdeAutoConnectDialogBeenShown:!0})),n()},t[0]=n,t[1]=r;else r=t[1];let o=r,s;if(t[2]===Symbol.for("react.memo_cache_sentinel"))s=[{label:"Yes",value:"yes"},{label:"No",value:"no"}],t[2]=s;else s=t[2];let i=s,a;if(t[3]!==o)a=sWe.jsx(hr,{options:i,onChange:o,defaultValue:"yes"}),t[3]=o,t[4]=a;else a=t[4];let l;if(t[5]===Symbol.for("react.memo_cache_sentinel"))l=sWe.jsx(Text,{dimColor:!0,children:"You can also configure this in /config or with the --ide flag"}),t[5]=l;else l=t[5];let c;if(t[6]!==n||t[7]!==a)c=sWe.jsxs(preInitQueue,{title:"Do you wish to enable auto-connect to IDE?",color:"ide",onCancel:n,children:[a,l]}),t[6]=n,t[7]=a,t[8]=c;else c=t[8];return c}
function Dyl(){let e=getGlobalConfig();return!cB()&&e.autoConnectIde!==!0&&e.hasIdeAutoConnectDialogBeenShown!==!0}
function Pyl(e){let t=Cvo.c(10),{onComplete:n}=e,r;if(t[0]!==n)r=()=>{saveGlobalConfig(Gnm),n(!0)},t[0]=n,t[1]=r;else r=t[1];let o=r,s;if(t[2]!==n)s=()=>{n(!1)},t[2]=n,t[3]=s;else s=t[3];let i=s,a;if(t[4]!==i||t[5]!==o)a=sWe.jsx(Bl,{cancelFirst:!0,focus:"cancel",onConfirm:o,onCancel:i}),t[4]=i,t[5]=o,t[6]=a;else a=t[6];let l;if(t[7]!==i||t[8]!==a)l=sWe.jsx(preInitQueue,{title:"Do you wish to disable auto-connect to IDE?",subtitle:"You can also configure this in /config",onCancel:i,color:"ide",children:a}),t[7]=i,t[8]=a,t[9]=l;else l=t[9];return l}
function Gnm(e){return{...e,autoConnectIde:!1}}
function Oyl(){let e=getGlobalConfig();return!cB()&&e.autoConnectIde===!0}
var Cvo,sWe;
var Lyl=b(()=>{je();tr();uS();TS();d_();di();Cvo=x(tt(),1),sWe=x(oe(),1)});
export {xyl,Dyl,Pyl,Gnm,Oyl,Cvo,sWe,Lyl};
