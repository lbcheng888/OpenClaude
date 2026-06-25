// @ts-nocheck
import {getRelativeSettingsFilePathForSource} from "../src/config/0740_settings.ts";
import {HRt,wm} from "./m707.ts";
import {i_,Aae,Sw} from "./m2789.ts";
import {SandboxManager,Uh} from "./m2682.ts";
import {e7n,dvo} from "./m4622.ts";
import {Sn,lr} from "./m233.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {hr,Ol} from "./m2573.ts";
import {preInitQueue,di} from "./m2583.ts";
import {Gp,gA} from "../src/mcp/0733_serverName.ts";
import {Zjn,XIo} from "./m4928.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {br} from "../src/config/0745_updateSettingsForSource.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function mhm(e){switch(e){case"localSettings":return{label:"Project settings (local)",description:`Saved in ${getRelativeSettingsFilePathForSource("localSettings")}`,value:e};case"projectSettings":return{label:"Project settings",description:`Checked in at ${getRelativeSettingsFilePathForSource("projectSettings")}`,value:e};case"userSettings":return{label:"User settings",description:"Saved in at ~/.claude/settings.json",value:e}}}
function zxl(e){let t=Kxl.c(26),{onAddRules:n,onCancel:r,ruleValues:o,ruleBehavior:s,initialContext:i,setToolPermissionContext:a}=e,l;if(t[0]===Symbol.for("react.memo_cache_sentinel"))l=HRt.map(mhm),t[0]=l;else l=t[0];let c=l,u;if(t[1]!==i||t[2]!==n||t[3]!==r||t[4]!==s||t[5]!==o||t[6]!==a)u=(E)=>{if(E==="cancel"){r();return}else if(HRt.includes(E)){let R=E,w=i_(i,{type:"addRules",rules:o,behavior:s,destination:R});Aae({type:"addRules",rules:o,behavior:s,destination:R}),a(w);let H=o.map((O)=>({ruleValue:O,ruleBehavior:s,source:R})),k=SandboxManager.isSandboxingEnabled()&&SandboxManager.isAutoAllowBashIfSandboxedEnabled(),D=e7n(w,{sandboxAutoAllowEnabled:k}).filter((O)=>o.some((L)=>L.toolName===O.rule.ruleValue.toolName&&L.ruleContent===O.rule.ruleValue.ruleContent));n(H,D)}},t[1]=i,t[2]=n,t[3]=r,t[4]=s,t[5]=o,t[6]=a,t[7]=u;else u=t[7];let d=u,p;if(t[8]!==o.length)p=Sn(o.length,"rule"),t[8]=o.length,t[9]=p;else p=t[9];let m=`Add ${s} permission ${p}`,f;if(t[10]!==o)f=o.map(fhm),t[10]=o,t[11]=f;else f=t[11];let h;if(t[12]!==f)h=Due.jsx(Box,{flexDirection:"column",paddingX:2,children:f}),t[12]=f,t[13]=h;else h=t[13];let g=o.length===1?"Where should this rule be saved?":"Where should these rules be saved?",_;if(t[14]!==g)_=Due.jsx(Text,{children:g}),t[14]=g,t[15]=_;else _=t[15];let T;if(t[16]!==d)T=Due.jsx(hr,{options:c,onChange:d}),t[16]=d,t[17]=T;else T=t[17];let y;if(t[18]!==_||t[19]!==T)y=Due.jsxs(Box,{flexDirection:"column",marginY:1,children:[_,T]}),t[18]=_,t[19]=T,t[20]=y;else y=t[20];let S;if(t[21]!==r||t[22]!==h||t[23]!==y||t[24]!==m)S=Due.jsxs(preInitQueue,{title:m,onCancel:r,color:"permission",children:[h,y]}),t[21]=r,t[22]=h,t[23]=y,t[24]=m,t[25]=S;else S=t[25];return S}
function fhm(e){return Due.jsxs(Box,{flexDirection:"column",children:[Due.jsx(Text,{bold:!0,children:Gp(e)}),Due.jsx(Zjn,{ruleValue:e})]},Gp(e))}
var Kxl,Due;
var jxl=b(()=>{Ol();je();Sw();gA();dvo();Uh();wm();br();lr();di();XIo();Kxl=x(tt(),1),Due=x(oe(),1)});
export {mhm,zxl,fhm,Kxl,Due,jxl};
