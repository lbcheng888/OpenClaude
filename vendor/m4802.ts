// @ts-nocheck
import {Zse,Iy} from "../src/agent/2230_explicitlyRequested.ts";
import {getMemoryFiles,zw} from "../src/config/2717_stripHtmlComments.ts";
import {mr,ki} from "./m2453.ts";
import {eGn,Bjt} from "../src/config/4776_leftWidth.ts";
import {XR,configProtoStore} from "./m2458.ts";
import {getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {getMainLoopModel,isModeDependentModelSetting,parseUserSpecifiedModel,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {$l,X2} from "./m1450.ts";
import {iTl,aCo,sTl,_Gn,lCo} from "../src/tui/4802_arm.ts";
import {yXr,rge} from "./m3334.ts";
import {bP,Vhe} from "./m3282.ts";
import {Box} from "./m2422.ts";
import {UDe,dGn} from "./m4790.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function enm(){let e=cCo.c(3),t;if(e[0]===Symbol.for("react.memo_cache_sentinel"))t=Zse()?null:getMemoryFiles(),e[0]=t;else t=e[0];let n=t,[r,o]=yGn.useState(aTl),s,i;if(e[1]===Symbol.for("react.memo_cache_sentinel"))s=()=>{if(n===null){o(aTl);return}let a=!0;return n.then((l)=>{if(a)o(l)},tnm),()=>{a=!1}},i=[n],e[1]=s,e[2]=i;else s=e[1],i=e[2];return yGn.useEffect(s,i),r}
function tnm(){}
function lTl(e){let t=cCo.c(7),{agentDefinitions:n,latchAnnouncementSlot:r}=e===void 0?{}:e,o=r===void 0?!0:r,{columns:s}=mr(),i=eGn(s),a=XR(nnm),l=enm(),c=getGlobalConfig(),u;e:{let v=a?.modelRestrictedWarning;if(!v){u=null;break e}let R=getMainLoopModel(),k=$l(v.requested.trim().toLowerCase());if(!isModeDependentModelSetting(k)&&k!=="best"&&parseUserSpecifiedModel(v.requested).toLowerCase()===R.toLowerCase()){u=null;break e}u={requested:v.requested,effective:R}}let d={config:c,agentDefinitions:n,memoryFiles:l,installBrokenMessages:a?.installBrokenMessages??[],npmInstallDeprecated:a?.npmInstallDeprecated??!1,modelDeprecationWarning:a?.modelDeprecationWarning??null,modelRestrictedWarning:u,existingClaudeSubscription:a?.existingClaudeSubscription??null},m=(o?iTl:aCo)(sTl(d),i,{suppressPromos:_Gn()}),f=m.warnings.length>0,A=m.slot!==null,h=m.ant.length>0,g=yXr,_=bP,y=!f&&!A&&!h?null:uR.createElement(Box,{flexDirection:"column",paddingLeft:1},m.warnings.map((v)=>uR.createElement(uR.Fragment,{key:v.id},v.render(d))),m.slot===null?null:uR.createElement(Box,{flexDirection:"column",marginTop:f?1:0},uR.createElement(Box,{flexDirection:"column",paddingLeft:1,borderStyle:"quote",borderTop:!1,borderBottom:!1,borderRight:!1,borderColor:m.slot.tier==="announcement"?"claude":void 0,borderDimColor:m.slot.tier!=="announcement"},m.slot.render(d)),m.slotOverflowCount>0&&uR.createElement(Box,{paddingLeft:2},uR.createElement(UDe,{command:"/status"},"+",m.slotOverflowCount," more"))),h&&uR.createElement(Box,{flexDirection:"column",paddingLeft:2,marginTop:f||A?1:0},m.ant.map((v)=>uR.createElement(uR.Fragment,{key:v.id},v.render(d))))),T;if(t[0]!==_||t[1]!==y)T=uR.createElement(_,null,y),t[0]=_,t[1]=y,t[2]=T;else T=t[2];let S;if(t[3]!==o||t[4]!==g.Provider||t[5]!==T)S=uR.createElement(g.Provider,{value:o},T),t[3]=o,t[4]=g.Provider,t[5]=T,t[6]=S;else S=t[6];return S}
function nnm(e){return e.setupIssues}
var cCo,uR,yGn,aTl;
var cTl=b(()=>{ki();ze();configProtoStore();zw();Qn();Iy();Bjt();X2();Mo();lCo();dGn();rge();Vhe();cCo=M(rt(),1),uR=M(Te(),1),yGn=M(Te(),1),aTl=[]});
export {enm,tnm,lTl,nnm,cCo,uR,yGn,aTl,cTl};
