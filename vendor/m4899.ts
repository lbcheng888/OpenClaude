// @ts-nocheck
import {getRelativeSettingsFilePathForSource} from "../src/config/0735_settings.ts";
import {nEt,mf} from "./m702.ts";
import {Yg,Cae,lx} from "./m2777.ts";
import {SandboxManager,Ag} from "./m2671.ts";
import {y5n,XTo} from "./m4594.ts";
import {Cn,dr} from "./m231.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {pr,Yl} from "./m2562.ts";
import {Kn,Li} from "./m2572.ts";
import {Qm,Sw} from "../src/mcp/0728_serverName.ts";
import {dVn,Ovo} from "./m4898.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {yr} from "../src/config/0740_updateSettingsForSource.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function tim(e){switch(e){case"localSettings":return{label:"Project settings (local)",description:`Saved in ${getRelativeSettingsFilePathForSource("localSettings")}`,value:e};case"projectSettings":return{label:"Project settings",description:`Checked in at ${getRelativeSettingsFilePathForSource("projectSettings")}`,value:e};case"userSettings":return{label:"User settings",description:"Saved in at ~/.claude/settings.json",value:e}}}
function MCl(e){let t=LCl.c(26),{onAddRules:n,onCancel:r,ruleValues:o,ruleBehavior:s,initialContext:i,setToolPermissionContext:a}=e,l;if(t[0]===Symbol.for("react.memo_cache_sentinel"))l=nEt.map(tim),t[0]=l;else l=t[0];let c=l,u;if(t[1]!==i||t[2]!==n||t[3]!==r||t[4]!==s||t[5]!==o||t[6]!==a)u=(S)=>{if(S==="cancel"){r();return}else if(nEt.includes(S)){let v=S,R=Yg(i,{type:"addRules",rules:o,behavior:s,destination:v});Cae({type:"addRules",rules:o,behavior:s,destination:v}),a(R);let k=o.map((P)=>({ruleValue:P,ruleBehavior:s,source:v})),x=SandboxManager.isSandboxingEnabled()&&SandboxManager.isAutoAllowBashIfSandboxedEnabled(),I=y5n(R,{sandboxAutoAllowEnabled:x}).filter((P)=>o.some((L)=>L.toolName===P.rule.ruleValue.toolName&&L.ruleContent===P.rule.ruleValue.ruleContent));n(k,I)}},t[1]=i,t[2]=n,t[3]=r,t[4]=s,t[5]=o,t[6]=a,t[7]=u;else u=t[7];let d=u,p;if(t[8]!==o.length)p=Cn(o.length,"rule"),t[8]=o.length,t[9]=p;else p=t[9];let m=`Add ${s} permission ${p}`,f;if(t[10]!==o)f=o.map(nim),t[10]=o,t[11]=f;else f=t[11];let A;if(t[12]!==f)A=GN.createElement(Box,{flexDirection:"column",paddingX:2},f),t[12]=f,t[13]=A;else A=t[13];let h=o.length===1?"Where should this rule be saved?":"Where should these rules be saved?",g;if(t[14]!==h)g=GN.createElement(Text,null,h),t[14]=h,t[15]=g;else g=t[15];let _;if(t[16]!==d)_=GN.createElement(pr,{options:c,onChange:d}),t[16]=d,t[17]=_;else _=t[17];let y;if(t[18]!==g||t[19]!==_)y=GN.createElement(Box,{flexDirection:"column",marginY:1},g,_),t[18]=g,t[19]=_,t[20]=y;else y=t[20];let T;if(t[21]!==r||t[22]!==A||t[23]!==y||t[24]!==m)T=GN.createElement(Kn,{title:m,onCancel:r,color:"permission"},A,y),t[21]=r,t[22]=A,t[23]=y,t[24]=m,t[25]=T;else T=t[25];return T}
function nim(e){return GN.createElement(Box,{flexDirection:"column",key:Qm(e)},GN.createElement(Text,{bold:!0},Qm(e)),GN.createElement(dVn,{ruleValue:e}))}
var LCl,GN;
var NCl=b(()=>{Yl();ze();lx();Sw();XTo();Ag();mf();yr();dr();Li();Ovo();LCl=M(rt(),1),GN=M(Te(),1)});
export {tim,MCl,nim,LCl,GN,NCl};
