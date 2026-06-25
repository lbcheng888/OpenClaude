// @ts-nocheck
import {Sn,fk,lr} from "./m233.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {Link} from "./m2437.ts";
import {hr,Ol} from "./m2573.ts";
import {preInitQueue,di} from "./m2583.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function XDl(e){let t=JDl.c(26),{hookEventMetadata:n,hooksByEvent:r,totalHooksCount:o,restrictedByPolicy:s,suspendedBySafeMode:i,onSelectEvent:a,onCancel:l}=e,c;if(t[0]!==o)c=Sn(o,"hook"),t[0]=o,t[1]=c;else c=t[1];let u=`${o} ${c} configured`,d;if(t[2]!==i)d=i&&fN.jsxs(Box,{flexDirection:"column",children:[fN.jsxs(Text,{color:"warning",children:[Xe.info," Safe mode"]}),fN.jsxs(Text,{dimColor:!0,children:["Hooks from settings files are suspended and will not run this session",i.managedHooksStillApply?" (managed policy hooks still apply)":"","; session hooks created by /goal, agents, and skills still run. Settings edits save but don't load until safe mode is off."," ",fk(i.exitHint)," to re-enable."]})]}),t[2]=i,t[3]=d;else d=t[3];let p;if(t[4]!==s)p=s&&fN.jsxs(Box,{flexDirection:"column",children:[fN.jsxs(Text,{color:"suggestion",children:[Xe.info," Hooks Restricted by Policy"]}),fN.jsx(Text,{dimColor:!0,children:"Only hooks from managed settings can run. User-defined hooks from ~/.claude/settings.json, .claude/settings.json, and .claude/settings.local.json are blocked."})]}),t[4]=s,t[5]=p;else p=t[5];let m;if(t[6]===Symbol.for("react.memo_cache_sentinel"))m=fN.jsx(Box,{flexDirection:"column",children:fN.jsxs(Text,{dimColor:!0,children:[Xe.info," This menu is read-only. To add or modify hooks, edit settings.json directly or ask Claude."," ",fN.jsx(Link,{url:"https://code.claude.com/docs/en/hooks",children:"Learn more"})]})}),t[6]=m;else m=t[6];let f;if(t[7]!==a)f=(S)=>{a(S)},t[7]=a,t[8]=f;else f=t[8];let h;if(t[9]!==n)h=Object.entries(n),t[9]=n,t[10]=h;else h=t[10];let g;if(t[11]!==r||t[12]!==h)g=h.map((S)=>{let[E,R]=S,w=r[E]||0;return{label:w>0?fN.jsxs(Text,{children:[E," ",fN.jsxs(Text,{color:"suggestion",children:["(",w,")"]})]}):E,value:E,description:R.summary}}),t[11]=r,t[12]=h,t[13]=g;else g=t[13];let _;if(t[14]!==l||t[15]!==f||t[16]!==g)_=fN.jsx(Box,{flexDirection:"column",children:fN.jsx(hr,{onChange:f,onCancel:l,options:g})}),t[14]=l,t[15]=f,t[16]=g,t[17]=_;else _=t[17];let T;if(t[18]!==d||t[19]!==p||t[20]!==_)T=fN.jsxs(Box,{flexDirection:"column",gap:1,children:[d,p,m,_]}),t[18]=d,t[19]=p,t[20]=_,t[21]=T;else T=t[21];let y;if(t[22]!==l||t[23]!==u||t[24]!==T)y=fN.jsx(preInitQueue,{title:"Hooks",subtitle:u,onCancel:l,children:T}),t[22]=l,t[23]=u,t[24]=T,t[25]=y;else y=t[25];return y}
var JDl,fN;
var QDl=b(()=>{Zs();je();lr();Ol();di();JDl=x(tt(),1),fN=x(oe(),1)});
export {XDl,JDl,fN,QDl};
