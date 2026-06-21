// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {cR,gJ} from "./m4537.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {handlePlanModeTransition,lt} from "../src/session/0131_sent.ts";
import {Yg,lx} from "./m2777.ts";
import {prepareContextForPlanMode,ly} from "../src/permissions/5185_verifyAutoModeGateAccess.ts";
import {jb,Dd} from "./m687.ts";
import {lft,DP,IP,yx} from "../src/core/5144_encoding.ts";
import {RG,q9} from "./m4604.ts";
import {Q6,TDe} from "./m4603.ts";
import {Ok,ab} from "../src/config/3178_path.ts";
import {vwa,_He} from "./m3752.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var svl={};
isFullscreenWithTTY(svl,{call:()=>Sim});
function Tim(e){let t=ovl.c(10),{planContent:n,planPath:r,editorName:o}=e,s;if(t[0]!==r)s=zP.createElement(cR,{subtitle:r},"Current Plan"),t[0]=r,t[1]=s;else s=t[1];let i;if(t[2]!==n)i=zP.createElement(Box,{marginTop:1},zP.createElement(Text,null,n)),t[2]=n,t[3]=i;else i=t[3];let a;if(t[4]!==o)a=o&&zP.createElement(Box,{marginTop:1},zP.createElement(Text,{dimColor:!0},'"/plan open"'),zP.createElement(Text,{dimColor:!0}," to edit this plan in "),zP.createElement(Text,{bold:!0,dimColor:!0},o)),t[4]=o,t[5]=a;else a=t[5];let l;if(t[6]!==s||t[7]!==i||t[8]!==a)l=zP.createElement(Box,{flexDirection:"column"},s,i,a),t[6]=s,t[7]=i,t[8]=a,t[9]=l;else l=t[9];return l}
async function Sim(e,t,n){let{getAppState:r,setAppState:o}=t,i=r().toolPermissionContext.mode,a=i!=="plan";if(a)handlePlanModeTransition(i,"plan"),o((A)=>({...A,toolPermissionContext:Yg(prepareContextForPlanMode(A.toolPermissionContext),{type:"setMode",mode:"plan",destination:"session"})}));if(jb())return e(a?"Enabled plan mode":"Already in plan mode."),null;if(a){let A=n.trim();if(A&&A!=="open")return e("Enabled plan mode",{shouldQuery:!0}),null;if(!lft())return e("Enabled plan mode"),null}let l=DP(),c=IP();if(!l)return e(a?"Enabled plan mode":"Already in plan mode. No plan written yet."),null;if(n.trim().split(/\s+/)[0]==="open"){let A=await RG(c);if(A.error)e(A.error);else e(`Opened plan in editor: ${c}`);return null}let d=Q6(),p=d?Ok(d):void 0,f=await vwa(zP.createElement(Tim,{planContent:l,planPath:c,editorName:p}));return e(f),null}
var ovl,zP;
var ivl=b(()=>{lt();gJ();ze();Dd();TDe();ab();lx();ly();yx();q9();_He();ovl=M(rt(),1),zP=M(Te(),1)});
export {svl,Tim,Sim,ovl,zP,ivl};
