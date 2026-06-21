// @ts-nocheck
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {QU,oTe} from "./m5411.ts";
import {pr,Yl} from "./m2562.ts";
import {Tm,Fk} from "./m3341.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function DLm(e,t){switch(e){case"yes":return{behavior:"allow",updatedInput:t.input};case"yes-dont-ask-again-domain":return{behavior:"allow",updatedInput:t.input,permissionUpdates:[{type:"addRules",rules:[{toolName:t.toolName,ruleContent:`domain:${t.hostname}`}],behavior:"allow",destination:"localSettings"}]};case"no":return{behavior:"deny"}}}
function PLm(e){let t=e.permissionResult.decisionReason,n=t?.type==="safetyCheck"&&!t.classifierApprovable;return e.showAlwaysAllow&&!n&&!e.isAskCappedByOrg&&e.hostname!==""}
function RVl(e){let t=wVl.c(36),{payload:n,answer:r}=e,o;if(t[0]!==n)o=PLm(n),t[0]=n,t[1]=o;else o=t[1];let s=o,i;if(t[2]!==r||t[3]!==n)i=(S)=>{r(DLm(S,n))},t[2]=r,t[3]=n,t[4]=i;else i=t[4];let a=i,l;if(t[5]!==r)l=()=>{r({behavior:"cancelled"})},t[5]=r,t[6]=l;else l=t[6];let c=l,u;if(t[7]===Symbol.for("react.memo_cache_sentinel"))u={label:"Yes",value:"yes"},t[7]=u;else u=t[7];let d;if(t[8]!==n.hostname||t[9]!==s){if(d=[u],s){let v;if(t[11]!==n.hostname)v={label:iw.createElement(Text,null,"Yes, and don't ask again for"," ",iw.createElement(Text,{bold:!0},n.hostname)),value:"yes-dont-ask-again-domain"},t[11]=n.hostname,t[12]=v;else v=t[12];d.push(v)}let S;if(t[13]===Symbol.for("react.memo_cache_sentinel"))S={label:iw.createElement(Text,null,"No, and tell Claude what to do differently ",iw.createElement(Text,{bold:!0},"(esc)")),value:"no"},t[13]=S;else S=t[13];d.push(S),t[8]=n.hostname,t[9]=s,t[10]=d}else d=t[10];let p=d,m;if(t[14]!==n.renderedToolUseMessage)m=iw.createElement(Text,null,n.renderedToolUseMessage),t[14]=n.renderedToolUseMessage,t[15]=m;else m=t[15];let f;if(t[16]!==n.description)f=iw.createElement(Text,{dimColor:!0},n.description),t[16]=n.description,t[17]=f;else f=t[17];let A;if(t[18]!==m||t[19]!==f)A=iw.createElement(Box,{flexDirection:"column",paddingX:2,paddingY:1},m,f),t[18]=m,t[19]=f,t[20]=A;else A=t[20];let h;if(t[21]!==n.permissionResult)h=iw.createElement(QU,{permissionResult:n.permissionResult,toolType:"tool"}),t[21]=n.permissionResult,t[22]=h;else h=t[22];let g;if(t[23]===Symbol.for("react.memo_cache_sentinel"))g=iw.createElement(Text,null,"Do you want to allow Claude to fetch this content?"),t[23]=g;else g=t[23];let _;if(t[24]!==c||t[25]!==a||t[26]!==p)_=iw.createElement(pr,{options:p,onChange:a,onCancel:c}),t[24]=c,t[25]=a,t[26]=p,t[27]=_;else _=t[27];let y;if(t[28]!==_||t[29]!==h)y=iw.createElement(Box,{flexDirection:"column"},h,g,_),t[28]=_,t[29]=h,t[30]=y;else y=t[30];let T;if(t[31]!==n.requestSource||t[32]!==n.workerBadge||t[33]!==y||t[34]!==A)T=iw.createElement(Tm,{title:"Fetch",workerBadge:n.workerBadge,requestSource:n.requestSource},A,y),t[31]=n.requestSource,t[32]=n.workerBadge,t[33]=y,t[34]=A,t[35]=T;else T=t[35];return T}
var wVl,iw;
var xVl=b(()=>{Yl();Fk();oTe();ze();wVl=M(rt(),1),iw=M(Te(),1)});
export {DLm,PLm,RVl,wVl,iw,xVl};
