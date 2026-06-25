// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {qE,BG} from "./m4563.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {handlePlanModeTransition,lt} from "../src/session/0132_sent.ts";
import {i_,Sw} from "./m2789.ts";
import {prepareContextForPlanMode,cy} from "../src/permissions/5219_verifyAutoModeGateAccess.ts";
import {Ub,Wu} from "./m438.ts";
import {bgt,VD,GD,Dw} from "../src/core/5176_encoding.ts";
import {GG,d9} from "./m4632.ts";
import {T6,TPe} from "./m4631.ts";
import {tH,uS} from "../src/config/3192_path.ts";
import {qDa,i0e} from "./m3768.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
var _Dl={};
ft(_Dl,{call:()=>Phm});
function Dhm(e){let t=gDl.c(10),{planContent:n,planPath:r,editorName:o}=e,s;if(t[0]!==r)s=kne.jsx(qE,{subtitle:r,children:"Current Plan"}),t[0]=r,t[1]=s;else s=t[1];let i;if(t[2]!==n)i=kne.jsx(Box,{marginTop:1,children:kne.jsx(Text,{children:n})}),t[2]=n,t[3]=i;else i=t[3];let a;if(t[4]!==o)a=o&&kne.jsxs(Box,{marginTop:1,children:[kne.jsx(Text,{dimColor:!0,children:'"/plan open"'}),kne.jsx(Text,{dimColor:!0,children:" to edit this plan in "}),kne.jsx(Text,{bold:!0,dimColor:!0,children:o})]}),t[4]=o,t[5]=a;else a=t[5];let l;if(t[6]!==s||t[7]!==i||t[8]!==a)l=kne.jsxs(Box,{flexDirection:"column",children:[s,i,a]}),t[6]=s,t[7]=i,t[8]=a,t[9]=l;else l=t[9];return l}
async function Phm(e,t,n){let{getAppState:r,setAppState:o}=t,i=r().toolPermissionContext.mode,a=i!=="plan";if(a)handlePlanModeTransition(i,"plan"),o((h)=>({...h,toolPermissionContext:i_(prepareContextForPlanMode(h.toolPermissionContext),{type:"setMode",mode:"plan",destination:"session"})}));if(Ub())return e(a?"Enabled plan mode":"Already in plan mode."),null;if(a){let h=n.trim();if(h&&h!=="open")return e("Enabled plan mode",{shouldQuery:!0}),null;if(!bgt())return e("Enabled plan mode"),null}let l=VD(),c=GD();if(!l)return e(a?"Enabled plan mode":"Already in plan mode. No plan written yet."),null;if(n.trim().split(/\s+/)[0]==="open"){let h=await GG(c);if(h.error)e(h.error);else e(`Opened plan in editor: ${c}`);return null}let d=T6(),p=d?tH(d):void 0,f=await qDa(kne.jsx(Dhm,{planContent:l,planPath:c,editorName:p}));return e(f),null}
var gDl,kne;
var yDl=b(()=>{lt();BG();je();Wu();TPe();uS();Sw();cy();Dw();d9();i0e();gDl=x(tt(),1),kne=x(oe(),1)});
export {_Dl,Dhm,Phm,gDl,kne,yDl};
