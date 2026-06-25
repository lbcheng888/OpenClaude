// @ts-nocheck
import {CLAUDE_IN_CHROME_DOMAIN_RULE_TOOL,bO} from "../src/mcp/2592_trackClaudeInChromeTabId.ts";
import {Text} from "./m2433.ts";
import {hr,Ol} from "./m2573.ts";
import {Box} from "./m2432.ts";
import {hm,DI} from "./m3357.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function b9m(e,t){switch(e){case"allow":return{behavior:"allow",updatedInput:t.input};case"allow-domain":return{behavior:"allow",updatedInput:t.input,permissionUpdates:t.chrome?[{type:"addRules",rules:[{toolName:CLAUDE_IN_CHROME_DOMAIN_RULE_TOOL,ruleContent:t.chrome.host}],behavior:"allow",destination:"session"}]:[]};case"deny":return{behavior:"deny"}}}
function E9m(e){return e.showAlwaysAllow&&!e.isAskCappedByOrg&&!!e.chrome}
function DZl(e){let t=xZl.c(27),{payload:n,answer:r}=e,{verbPhrase:o,chrome:s}=n,i;if(t[0]!==n)i=E9m(n),t[0]=n,t[1]=i;else i=t[1];let a=i,l;if(t[2]!==r||t[3]!==n)l=(S)=>{r(b9m(S,n))},t[2]=r,t[3]=n,t[4]=l;else l=t[4];let c=l,u;if(t[5]!==r)u=()=>{r({behavior:"cancelled"})},t[5]=r,t[6]=u;else u=t[6];let d=u,p;if(t[7]===Symbol.for("react.memo_cache_sentinel"))p={label:"Allow",value:"allow"},t[7]=p;else p=t[7];let m;if(t[8]!==s||t[9]!==a){if(m=[p],a&&s){let E;if(t[11]!==s.host)E={label:mde.jsxs(Text,{children:["Allow all actions on ",mde.jsx(Text,{bold:!0,children:s.host})," for this session"]}),value:"allow-domain"},t[11]=s.host,t[12]=E;else E=t[12];m.push(E)}let S;if(t[13]===Symbol.for("react.memo_cache_sentinel"))S={label:mde.jsxs(Text,{children:["Deny ",mde.jsx(Text,{bold:!0,children:"(esc)"})]}),value:"deny"},t[13]=S;else S=t[13];m.push(S),t[8]=s,t[9]=a,t[10]=m}else m=t[10];let f=m,h=s?`Claude in Chrome wants to ${o} on ${s.host}`:`Claude in Chrome wants to ${o}`,g;if(t[14]!==s)g=s?mde.jsx(Text,{dimColor:!0,children:s.url}):null,t[14]=s,t[15]=g;else g=t[15];let _;if(t[16]!==d||t[17]!==c||t[18]!==f)_=mde.jsx(hr,{options:f,onChange:c,onCancel:d}),t[16]=d,t[17]=c,t[18]=f,t[19]=_;else _=t[19];let T;if(t[20]!==g||t[21]!==_)T=mde.jsxs(Box,{flexDirection:"column",paddingY:1,gap:1,children:[g,_]}),t[20]=g,t[21]=_,t[22]=T;else T=t[22];let y;if(t[23]!==n.requestSource||t[24]!==h||t[25]!==T)y=mde.jsx(hm,{title:h,requestSource:n.requestSource,children:T}),t[23]=n.requestSource,t[24]=h,t[25]=T,t[26]=y;else y=t[26];return y}
var xZl,mde;
var PZl=b(()=>{Ol();DI();je();bO();xZl=x(tt(),1),mde=x(oe(),1)});
export {b9m,E9m,DZl,xZl,mde,PZl};
