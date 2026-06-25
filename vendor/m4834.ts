// @ts-nocheck
import {Qse,ky} from "../src/agent/2238_explicitlyRequested.ts";
import {getMemoryFiles,ZR} from "../src/config/2729_stripHtmlComments.ts";
import {_r,ui} from "./m2463.ts";
import {Uzn,nGt} from "../src/config/4808_leftWidth.ts";
import {cw,uo} from "./m2468.ts";
import {getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {getMainLoopModel,isModeDependentModelSetting,parseUserSpecifiedModel,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {nl,T2} from "./m1455.ts";
import {ukl,AHo,ckl,ajn,RHo} from "../src/config/4834_children.ts";
import {tno,__e} from "./m3350.ts";
import {ND,s_e} from "./m3298.ts";
import {Box} from "./m2432.ts";
import {FPe,Qzn} from "./m4822.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function hdm(){let e=wHo.c(3),t;if(e[0]===Symbol.for("react.memo_cache_sentinel"))t=Qse()?null:getMemoryFiles(),e[0]=t;else t=e[0];let n=t,[r,o]=ljn.useState(dkl),s,i;if(e[1]===Symbol.for("react.memo_cache_sentinel"))s=()=>{if(n===null){o(dkl);return}let a=!0;return n.then((l)=>{if(a)o(l)},gdm),()=>{a=!1}},i=[n],e[1]=s,e[2]=i;else s=e[1],i=e[2];return ljn.useEffect(s,i),r}
function gdm(){}
function pkl(e){let t=wHo.c(7),{agentDefinitions:n,latchAnnouncementSlot:r}=e===void 0?{}:e,o=r===void 0?!0:r,{columns:s}=_r(),i=Uzn(s),a=cw(_dm),l=hdm(),c=getGlobalConfig(),u;e:{let R=a?.modelRestrictedWarning;if(!R){u=null;break e}let w=getMainLoopModel(),H=nl(R.requested.trim().toLowerCase());if(!isModeDependentModelSetting(H)&&H!=="best"&&parseUserSpecifiedModel(R.requested).toLowerCase()===w.toLowerCase()){u=null;break e}u={requested:R.requested,effective:w}}let d={config:c,agentDefinitions:n,memoryFiles:l,installBrokenMessages:a?.installBrokenMessages??[],npmInstallDeprecated:a?.npmInstallDeprecated??!1,modelDeprecationWarning:a?.modelDeprecationWarning??null,modelRestrictedWarning:u,existingClaudeSubscription:a?.existingClaudeSubscription??null},m=(o?ukl:AHo)(ckl(d),i,{suppressPromos:ajn()}),f=m.warnings.length>0,h=m.slot!==null,g=m.ant.length>0,_=tno,T=ND,y=!f&&!h&&!g?null:yJ.jsxs(Box,{flexDirection:"column",paddingLeft:1,children:[m.warnings.map((R)=>yJ.jsx(vHo.Fragment,{children:R.render(d)},R.id)),m.slot===null?null:yJ.jsxs(Box,{flexDirection:"column",marginTop:f?1:0,children:[yJ.jsx(Box,{flexDirection:"column",paddingLeft:1,borderStyle:"quote",borderTop:!1,borderBottom:!1,borderRight:!1,borderColor:m.slot.tier==="announcement"?"claude":void 0,borderDimColor:m.slot.tier!=="announcement",children:m.slot.render(d)}),m.slotOverflowCount>0&&yJ.jsx(Box,{paddingLeft:2,children:yJ.jsxs(FPe,{command:"/status",children:["+",m.slotOverflowCount," more"]})})]}),g&&yJ.jsx(Box,{flexDirection:"column",paddingLeft:2,marginTop:f||h?1:0,children:m.ant.map((R)=>yJ.jsx(vHo.Fragment,{children:R.render(d)},R.id))})]}),S;if(t[0]!==T||t[1]!==y)S=yJ.jsx(T,{children:y}),t[0]=T,t[1]=y,t[2]=S;else S=t[2];let E;if(t[3]!==o||t[4]!==_.Provider||t[5]!==S)E=yJ.jsx(_.Provider,{value:o,children:S}),t[3]=o,t[4]=_.Provider,t[5]=S,t[6]=E;else E=t[6];return E}
function _dm(e){return e.setupIssues}
var wHo,vHo,ljn,yJ,dkl;
var mkl=b(()=>{ui();je();uo();ZR();tr();ky();nGt();T2();Ro();RHo();Qzn();__e();s_e();wHo=x(tt(),1),vHo=x(et(),1),ljn=x(et(),1),yJ=x(oe(),1),dkl=[]});
export {hdm,gdm,pkl,_dm,wHo,vHo,ljn,yJ,dkl,mkl};
