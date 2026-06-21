// @ts-nocheck
import {Cn,Xx,dr} from "./m231.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {Link} from "./m2427.ts";
import {pr,Yl} from "./m2562.ts";
import {Kn,Li} from "./m2572.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Bvl(e){let t=Nvl.c(26),{hookEventMetadata:n,hooksByEvent:r,totalHooksCount:o,restrictedByPolicy:s,suspendedBySafeMode:i,onSelectEvent:a,onCancel:l}=e,c;if(t[0]!==o)c=Cn(o,"hook"),t[0]=o,t[1]=c;else c=t[1];let u=`${o} ${c} configured`,d;if(t[2]!==i)d=i&&Ky.createElement(Box,{flexDirection:"column"},Ky.createElement(Text,{color:"warning"},et.info," Safe mode"),Ky.createElement(Text,{dimColor:!0},"Hooks from settings files are suspended and will not run this session",i.managedHooksStillApply?" (managed policy hooks still apply)":"","; session hooks created by /goal, agents, and skills still run. Settings edits save but don't load until safe mode is off."," ",Xx(i.exitHint)," to re-enable.")),t[2]=i,t[3]=d;else d=t[3];let p;if(t[4]!==s)p=s&&Ky.createElement(Box,{flexDirection:"column"},Ky.createElement(Text,{color:"suggestion"},et.info," Hooks Restricted by Policy"),Ky.createElement(Text,{dimColor:!0},"Only hooks from managed settings can run. User-defined hooks from ~/.claude/settings.json, .claude/settings.json, and .claude/settings.local.json are blocked.")),t[4]=s,t[5]=p;else p=t[5];let m;if(t[6]===Symbol.for("react.memo_cache_sentinel"))m=Ky.createElement(Box,{flexDirection:"column"},Ky.createElement(Text,{dimColor:!0},et.info," This menu is read-only. To add or modify hooks, edit settings.json directly or ask Claude."," ",Ky.createElement(Link,{url:"https://code.claude.com/docs/en/hooks"},"Learn more"))),t[6]=m;else m=t[6];let f;if(t[7]!==a)f=(T)=>{a(T)},t[7]=a,t[8]=f;else f=t[8];let A;if(t[9]!==n)A=Object.entries(n),t[9]=n,t[10]=A;else A=t[10];let h;if(t[11]!==r||t[12]!==A)h=A.map((T)=>{let[S,v]=T,R=r[S]||0;return{label:R>0?Ky.createElement(Text,null,S," ",Ky.createElement(Text,{color:"suggestion"},"(",R,")")):S,value:S,description:v.summary}}),t[11]=r,t[12]=A,t[13]=h;else h=t[13];let g;if(t[14]!==l||t[15]!==f||t[16]!==h)g=Ky.createElement(Box,{flexDirection:"column"},Ky.createElement(pr,{onChange:f,onCancel:l,options:h})),t[14]=l,t[15]=f,t[16]=h,t[17]=g;else g=t[17];let _;if(t[18]!==d||t[19]!==p||t[20]!==g)_=Ky.createElement(Box,{flexDirection:"column",gap:1},d,p,m,g),t[18]=d,t[19]=p,t[20]=g,t[21]=_;else _=t[21];let y;if(t[22]!==l||t[23]!==u||t[24]!==_)y=Ky.createElement(Kn,{title:"Hooks",subtitle:u,onCancel:l},_),t[22]=l,t[23]=u,t[24]=_,t[25]=y;else y=t[25];return y}
var Nvl,Ky;
var Fvl=b(()=>{Ai();ze();dr();Yl();Li();Nvl=M(rt(),1),Ky=M(Te(),1)});
export {Bvl,Nvl,Ky,Fvl};
