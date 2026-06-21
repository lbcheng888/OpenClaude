// @ts-nocheck
import {shouldAllowManagedSandboxDomainsOnly,Ag} from "./m2671.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {pr,Yl} from "./m2562.ts";
import {Tm,Fk} from "./m3341.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function JMo(e){let t=etc.c(22),{hostPattern:n,onUserResponse:r}=e,{host:o}=n,s;if(t[0]!==r)s=function(S){e:switch(S){case"yes":{r({allow:!0,persistToSettings:!1});break e}case"yes-dont-ask-again":{r({allow:!0,persistToSettings:!0});break e}case"no":r({allow:!1,persistToSettings:!1})}},t[0]=r,t[1]=s;else s=t[1];let i=s,a;if(t[2]===Symbol.for("react.memo_cache_sentinel"))a=shouldAllowManagedSandboxDomainsOnly(),t[2]=a;else a=t[2];let l=a,c;if(t[3]===Symbol.for("react.memo_cache_sentinel"))c={label:"Yes",value:"yes"},t[3]=c;else c=t[3];let u;if(t[4]!==o)u=!l?[{label:WE.createElement(Text,null,"Yes, and don't ask again for ",WE.createElement(Text,{bold:!0},o)),value:"yes-dont-ask-again"}]:[],t[4]=o,t[5]=u;else u=t[5];let d;if(t[6]===Symbol.for("react.memo_cache_sentinel"))d={label:WE.createElement(Text,null,"No, and tell Claude what to do differently ",WE.createElement(Text,{bold:!0},"(esc)")),value:"no"},t[6]=d;else d=t[6];let p;if(t[7]!==u)p=[c,...u,d],t[7]=u,t[8]=p;else p=t[8];let m=p,f;if(t[9]===Symbol.for("react.memo_cache_sentinel"))f=WE.createElement(Text,{dimColor:!0},"Host:"),t[9]=f;else f=t[9];let A;if(t[10]!==o)A=WE.createElement(Box,null,f,WE.createElement(Text,null," ",o)),t[10]=o,t[11]=A;else A=t[11];let h;if(t[12]===Symbol.for("react.memo_cache_sentinel"))h=WE.createElement(Box,{marginTop:1},WE.createElement(Text,null,"Do you want to allow this connection?")),t[12]=h;else h=t[12];let g;if(t[13]!==r)g=()=>{r({allow:!1,persistToSettings:!1})},t[13]=r,t[14]=g;else g=t[14];let _;if(t[15]!==i||t[16]!==m||t[17]!==g)_=WE.createElement(Box,null,WE.createElement(pr,{options:m,onChange:i,onCancel:g})),t[15]=i,t[16]=m,t[17]=g,t[18]=_;else _=t[18];let y;if(t[19]!==_||t[20]!==A)y=WE.createElement(Tm,{title:"Network request outside of sandbox"},WE.createElement(Box,{flexDirection:"column",paddingX:2,paddingY:1},A,h,_)),t[19]=_,t[20]=A,t[21]=y;else y=t[21];return y}
var etc,WE;
var ttc=b(()=>{ze();Ag();Yl();Fk();etc=M(rt(),1),WE=M(Te(),1)});
export {JMo,etc,WE,ttc};
