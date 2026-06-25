// @ts-nocheck
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {gU,MSe} from "./m5444.ts";
import {hr,Ol} from "./m2573.ts";
import {hm,DI} from "./m3357.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function $9m(e,t){switch(e){case"yes":return{behavior:"allow",updatedInput:t.input};case"yes-dont-ask-again-domain":return{behavior:"allow",updatedInput:t.input,permissionUpdates:[{type:"addRules",rules:[{toolName:t.toolName,ruleContent:`domain:${t.hostname}`}],behavior:"allow",destination:"localSettings"}]};case"no":return{behavior:"deny"}}}
function q9m(e){let t=e.permissionResult.decisionReason,n=t?.type==="safetyCheck"&&!t.classifierApprovable;return e.showAlwaysAllow&&!n&&!e.isAskCappedByOrg&&e.hostname!==""}
function uec(e){let t=cec.c(35),{payload:n,answer:r}=e,o;if(t[0]!==n)o=q9m(n),t[0]=n,t[1]=o;else o=t[1];let s=o,i;if(t[2]!==r||t[3]!==n)i=(E)=>{r($9m(E,n))},t[2]=r,t[3]=n,t[4]=i;else i=t[4];let a=i,l;if(t[5]!==r)l=()=>{r({behavior:"cancelled"})},t[5]=r,t[6]=l;else l=t[6];let c=l,u;if(t[7]===Symbol.for("react.memo_cache_sentinel"))u={label:"Yes",value:"yes"},t[7]=u;else u=t[7];let d;if(t[8]!==n.hostname||t[9]!==s){if(d=[u],s){let R;if(t[11]!==n.hostname)R={label:z6.jsxs(Text,{children:["Yes, and don't ask again for"," ",z6.jsx(Text,{bold:!0,children:n.hostname})]}),value:"yes-dont-ask-again-domain"},t[11]=n.hostname,t[12]=R;else R=t[12];d.push(R)}let E;if(t[13]===Symbol.for("react.memo_cache_sentinel"))E={label:z6.jsxs(Text,{children:["No, and tell Claude what to do differently ",z6.jsx(Text,{bold:!0,children:"(esc)"})]}),value:"no"},t[13]=E;else E=t[13];d.push(E),t[8]=n.hostname,t[9]=s,t[10]=d}else d=t[10];let p=d,m;if(t[14]!==n.renderedToolUseMessage)m=z6.jsx(Text,{children:n.renderedToolUseMessage}),t[14]=n.renderedToolUseMessage,t[15]=m;else m=t[15];let f;if(t[16]!==n.description)f=z6.jsx(Text,{dimColor:!0,children:n.description}),t[16]=n.description,t[17]=f;else f=t[17];let h;if(t[18]!==m||t[19]!==f)h=z6.jsxs(Box,{flexDirection:"column",paddingX:2,paddingY:1,children:[m,f]}),t[18]=m,t[19]=f,t[20]=h;else h=t[20];let g;if(t[21]!==n.permissionResult)g=z6.jsx(gU,{permissionResult:n.permissionResult,toolType:"tool"}),t[21]=n.permissionResult,t[22]=g;else g=t[22];let _;if(t[23]===Symbol.for("react.memo_cache_sentinel"))_=z6.jsx(Text,{children:"Do you want to allow Claude to fetch this content?"}),t[23]=_;else _=t[23];let T;if(t[24]!==c||t[25]!==a||t[26]!==p)T=z6.jsx(hr,{options:p,onChange:a,onCancel:c}),t[24]=c,t[25]=a,t[26]=p,t[27]=T;else T=t[27];let y;if(t[28]!==T||t[29]!==g)y=z6.jsxs(Box,{flexDirection:"column",children:[g,_,T]}),t[28]=T,t[29]=g,t[30]=y;else y=t[30];let S;if(t[31]!==n.requestSource||t[32]!==y||t[33]!==h)S=z6.jsxs(hm,{title:"Fetch",requestSource:n.requestSource,children:[h,y]}),t[31]=n.requestSource,t[32]=y,t[33]=h,t[34]=S;else S=t[34];return S}
var cec,z6;
var dec=b(()=>{Ol();DI();MSe();je();cec=x(tt(),1),z6=x(oe(),1)});
export {$9m,q9m,uec,cec,z6,dec};
