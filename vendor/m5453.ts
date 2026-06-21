// @ts-nocheck
import {CLAUDE_IN_CHROME_DOMAIN_RULE_TOOL,oL} from "../src/mcp/2581_trackClaudeInChromeTabId.ts";
import {Text} from "./m2423.ts";
import {pr,Yl} from "./m2562.ts";
import {Box} from "./m2422.ts";
import {Tm,Fk} from "./m3341.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function pLm(e,t){switch(e){case"allow":return{behavior:"allow",updatedInput:t.input};case"allow-domain":return{behavior:"allow",updatedInput:t.input,permissionUpdates:t.chrome?[{type:"addRules",rules:[{toolName:CLAUDE_IN_CHROME_DOMAIN_RULE_TOOL,ruleContent:t.chrome.host}],behavior:"allow",destination:"session"}]:[]};case"deny":return{behavior:"deny"}}}
function mLm(e){return e.showAlwaysAllow&&!e.isAskCappedByOrg&&!!e.chrome}
function YGl(e){let t=zGl.c(28),{payload:n,answer:r}=e,{verbPhrase:o,chrome:s}=n,i;if(t[0]!==n)i=mLm(n),t[0]=n,t[1]=i;else i=t[1];let a=i,l;if(t[2]!==r||t[3]!==n)l=(T)=>{r(pLm(T,n))},t[2]=r,t[3]=n,t[4]=l;else l=t[4];let c=l,u;if(t[5]!==r)u=()=>{r({behavior:"cancelled"})},t[5]=r,t[6]=u;else u=t[6];let d=u,p;if(t[7]===Symbol.for("react.memo_cache_sentinel"))p={label:"Allow",value:"allow"},t[7]=p;else p=t[7];let m;if(t[8]!==s||t[9]!==a){if(m=[p],a&&s){let S;if(t[11]!==s.host)S={label:ZN.createElement(Text,null,"Allow all actions on ",ZN.createElement(Text,{bold:!0},s.host)," for this session"),value:"allow-domain"},t[11]=s.host,t[12]=S;else S=t[12];m.push(S)}let T;if(t[13]===Symbol.for("react.memo_cache_sentinel"))T={label:ZN.createElement(Text,null,"Deny ",ZN.createElement(Text,{bold:!0},"(esc)")),value:"deny"},t[13]=T;else T=t[13];m.push(T),t[8]=s,t[9]=a,t[10]=m}else m=t[10];let f=m,A=s?`Claude in Chrome wants to ${o} on ${s.host}`:`Claude in Chrome wants to ${o}`,h;if(t[14]!==s)h=s?ZN.createElement(Text,{dimColor:!0},s.url):null,t[14]=s,t[15]=h;else h=t[15];let g;if(t[16]!==d||t[17]!==c||t[18]!==f)g=ZN.createElement(pr,{options:f,onChange:c,onCancel:d}),t[16]=d,t[17]=c,t[18]=f,t[19]=g;else g=t[19];let _;if(t[20]!==h||t[21]!==g)_=ZN.createElement(Box,{flexDirection:"column",paddingY:1,gap:1},h,g),t[20]=h,t[21]=g,t[22]=_;else _=t[22];let y;if(t[23]!==n.requestSource||t[24]!==n.workerBadge||t[25]!==A||t[26]!==_)y=ZN.createElement(Tm,{title:A,workerBadge:n.workerBadge,requestSource:n.requestSource},_),t[23]=n.requestSource,t[24]=n.workerBadge,t[25]=A,t[26]=_,t[27]=y;else y=t[27];return y}
var zGl,ZN;
var JGl=b(()=>{Yl();Fk();ze();oL();zGl=M(rt(),1),ZN=M(Te(),1)});
export {pLm,mLm,YGl,zGl,ZN,JGl};
