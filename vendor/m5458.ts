// @ts-nocheck
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {QU,oTe} from "./m5411.ts";
import {eOe,FGt} from "../src/tui/5458_options.ts";
import {Tm,Fk} from "./m3341.ts";
import {TC,hz} from "../src/telemetry/2688_hz.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function ELm(e,t,n){switch(e){case"yes":return{behavior:"allow",updatedInput:t.input,...n&&{feedback:n}};case"yes-apply-suggestions":{let r="suggestions"in t.permissionResult?t.permissionResult.suggestions??[]:[];return{behavior:"allow",updatedInput:t.input,permissionUpdates:r}}case"no":return{behavior:"deny",...n&&{feedback:n}}}}
function CLm(e){let t="suggestions"in e.permissionResult?e.permissionResult.suggestions??[]:[];return e.showAlwaysAllow&&t.length>0}
function vLm(e){let t=e.filter((n)=>n.type==="addRules").flatMap((n)=>n.rules??[]);if(t.length===1&&t[0].ruleContent){let n=t[0];return Mx.createElement(Text,null,"Yes, and don't ask again for"," ",Mx.createElement(Text,{bold:!0},n.toolName,"(",n.ruleContent,")"))}return`Yes, and add ${t.length} suggested permission rules`}
function cVl(e){let t=lVl.c(42),{payload:n,answer:r}=e,o;if(t[0]!==n)o=CLm(n),t[0]=n,t[1]=o;else o=t[1];let s=o,i;if(t[2]!==n.permissionResult)i="suggestions"in n.permissionResult?n.permissionResult.suggestions??[]:[],t[2]=n.permissionResult,t[3]=i;else i=t[3];let a=i,l;if(t[4]!==r||t[5]!==n)l=(R,k)=>{r(ELm(R,n,k))},t[4]=r,t[5]=n,t[6]=l;else l=t[6];let c=l,u;if(t[7]!==r)u=()=>{r({behavior:"deny"})},t[7]=r,t[8]=u;else u=t[8];let d=u,p;if(t[9]===Symbol.for("react.memo_cache_sentinel"))p={label:"Yes",value:"yes",feedbackConfig:{type:"accept"}},t[9]=p;else p=t[9];let m;if(t[10]!==s||t[11]!==a){if(m=[p],s){let k;if(t[13]!==a)k=vLm(a),t[13]=a,t[14]=k;else k=t[14];let x;if(t[15]!==k)x={label:k,value:"yes-apply-suggestions"},t[15]=k,t[16]=x;else x=t[16];m.push(x)}let R;if(t[17]===Symbol.for("react.memo_cache_sentinel"))R={label:"No",value:"no",feedbackConfig:{type:"reject"}},t[17]=R;else R=t[17];m.push(R),t[10]=s,t[11]=a,t[12]=m}else m=t[12];let f=m,A;if(t[18]!==n.command||t[19]!==n.intervalMs||t[20]!==n.mcp)A=n.mcp?Mx.createElement(Text,null,"Poll"," ",Mx.createElement(Text,{bold:!0},n.mcp.server,"/",n.mcp.tool)," ","every ",n.intervalMs/1000,"s"):Mx.createElement(Text,null,n.command),t[18]=n.command,t[19]=n.intervalMs,t[20]=n.mcp,t[21]=A;else A=t[21];let h;if(t[22]!==n.monitorDescription)h=Mx.createElement(Text,{dimColor:!0},n.monitorDescription),t[22]=n.monitorDescription,t[23]=h;else h=t[23];let g;if(t[24]!==A||t[25]!==h)g=Mx.createElement(Box,{flexDirection:"column",paddingX:2,paddingY:1},A,h),t[24]=A,t[25]=h,t[26]=g;else g=t[26];let _=n.mcp?"tool":"command",y;if(t[27]!==n.permissionResult||t[28]!==_)y=Mx.createElement(QU,{permissionResult:n.permissionResult,toolType:_}),t[27]=n.permissionResult,t[28]=_,t[29]=y;else y=t[29];let T;if(t[30]!==d||t[31]!==c||t[32]!==f)T=Mx.createElement(eOe,{options:f,onSelect:c,onCancel:d}),t[30]=d,t[31]=c,t[32]=f,t[33]=T;else T=t[33];let S;if(t[34]!==y||t[35]!==T)S=Mx.createElement(Box,{flexDirection:"column"},y,T),t[34]=y,t[35]=T,t[36]=S;else S=t[36];let v;if(t[37]!==n.requestSource||t[38]!==n.workerBadge||t[39]!==S||t[40]!==g)v=Mx.createElement(Tm,{title:TC,workerBadge:n.workerBadge,requestSource:n.requestSource},g,S),t[37]=n.requestSource,t[38]=n.workerBadge,t[39]=S,t[40]=g,t[41]=v;else v=t[41];return v}
var lVl,Mx;
var uVl=b(()=>{Fk();FGt();oTe();ze();hz();lVl=M(rt(),1),Mx=M(Te(),1)});
export {ELm,CLm,vLm,cVl,lVl,Mx,uVl};
