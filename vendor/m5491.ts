// @ts-nocheck
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {gU,MSe} from "./m5444.ts";
import {ZOe,pzt} from "../src/tui/5491_options.ts";
import {hm,DI} from "./m3357.ts";
import {EC,qz} from "../src/telemetry/2700_qz.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function D9m(e,t,n){switch(e){case"yes":return{behavior:"allow",updatedInput:t.input,...n&&{feedback:n}};case"yes-apply-suggestions":{let r="suggestions"in t.permissionResult?t.permissionResult.suggestions??[]:[];return{behavior:"allow",updatedInput:t.input,permissionUpdates:r}}case"no":return{behavior:"deny",...n&&{feedback:n}}}}
function P9m(e){let t="suggestions"in e.permissionResult?e.permissionResult.suggestions??[]:[];return e.showAlwaysAllow&&t.length>0}
function O9m(e){let t=e.filter((n)=>n.type==="addRules").flatMap((n)=>n.rules??[]);if(t.length===1&&t[0].ruleContent){let n=t[0];return vV.jsxs(Text,{children:["Yes, and don't ask again for"," ",vV.jsxs(Text,{bold:!0,children:[n.toolName,"(",n.ruleContent,")"]})]})}return`Yes, and add ${t.length} suggested permission rules`}
function KZl(e){let t=VZl.c(41),{payload:n,answer:r}=e,o;if(t[0]!==n)o=P9m(n),t[0]=n,t[1]=o;else o=t[1];let s=o,i;if(t[2]!==n.permissionResult)i="suggestions"in n.permissionResult?n.permissionResult.suggestions??[]:[],t[2]=n.permissionResult,t[3]=i;else i=t[3];let a=i,l;if(t[4]!==r||t[5]!==n)l=(w,H)=>{r(D9m(w,n,H))},t[4]=r,t[5]=n,t[6]=l;else l=t[6];let c=l,u;if(t[7]!==r)u=()=>{r({behavior:"deny"})},t[7]=r,t[8]=u;else u=t[8];let d=u,p;if(t[9]===Symbol.for("react.memo_cache_sentinel"))p={label:"Yes",value:"yes",feedbackConfig:{type:"accept"}},t[9]=p;else p=t[9];let m;if(t[10]!==s||t[11]!==a){if(m=[p],s){let H;if(t[13]!==a)H=O9m(a),t[13]=a,t[14]=H;else H=t[14];let k;if(t[15]!==H)k={label:H,value:"yes-apply-suggestions"},t[15]=H,t[16]=k;else k=t[16];m.push(k)}let w;if(t[17]===Symbol.for("react.memo_cache_sentinel"))w={label:"No",value:"no",feedbackConfig:{type:"reject"}},t[17]=w;else w=t[17];m.push(w),t[10]=s,t[11]=a,t[12]=m}else m=t[12];let f=m,h;if(t[18]!==n.command||t[19]!==n.intervalMs||t[20]!==n.mcp)h=n.mcp?vV.jsxs(Text,{children:["Poll"," ",vV.jsxs(Text,{bold:!0,children:[n.mcp.server,"/",n.mcp.tool]})," ","every ",n.intervalMs/1000,"s"]}):vV.jsx(Text,{children:n.command}),t[18]=n.command,t[19]=n.intervalMs,t[20]=n.mcp,t[21]=h;else h=t[21];let g;if(t[22]!==n.monitorDescription)g=vV.jsx(Text,{dimColor:!0,children:n.monitorDescription}),t[22]=n.monitorDescription,t[23]=g;else g=t[23];let _;if(t[24]!==h||t[25]!==g)_=vV.jsxs(Box,{flexDirection:"column",paddingX:2,paddingY:1,children:[h,g]}),t[24]=h,t[25]=g,t[26]=_;else _=t[26];let T=n.mcp?"tool":"command",y;if(t[27]!==n.permissionResult||t[28]!==T)y=vV.jsx(gU,{permissionResult:n.permissionResult,toolType:T}),t[27]=n.permissionResult,t[28]=T,t[29]=y;else y=t[29];let S;if(t[30]!==d||t[31]!==c||t[32]!==f)S=vV.jsx(ZOe,{options:f,onSelect:c,onCancel:d}),t[30]=d,t[31]=c,t[32]=f,t[33]=S;else S=t[33];let E;if(t[34]!==y||t[35]!==S)E=vV.jsxs(Box,{flexDirection:"column",children:[y,S]}),t[34]=y,t[35]=S,t[36]=E;else E=t[36];let R;if(t[37]!==n.requestSource||t[38]!==E||t[39]!==_)R=vV.jsxs(hm,{title:EC,requestSource:n.requestSource,children:[_,E]}),t[37]=n.requestSource,t[38]=E,t[39]=_,t[40]=R;else R=t[40];return R}
var VZl,vV;
var zZl=b(()=>{DI();pzt();MSe();je();qz();VZl=x(tt(),1),vV=x(oe(),1)});
export {D9m,P9m,O9m,KZl,VZl,vV,zZl};
