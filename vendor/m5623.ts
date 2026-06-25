// @ts-nocheck
import {shouldAllowManagedSandboxDomainsOnly,Uh} from "./m2682.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {hr,Ol} from "./m2573.ts";
import {hm,DI} from "./m3357.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function T2o(e){let t=qcc.c(22),{hostPattern:n,onUserResponse:r}=e,{host:o}=n,s;if(t[0]!==r)s=function(E){e:switch(E){case"yes":{r({allow:!0,persistToSettings:!1});break e}case"yes-dont-ask-again":{r({allow:!0,persistToSettings:!0});break e}case"no":r({allow:!1,persistToSettings:!1})}},t[0]=r,t[1]=s;else s=t[1];let i=s,a;if(t[2]===Symbol.for("react.memo_cache_sentinel"))a=shouldAllowManagedSandboxDomainsOnly(),t[2]=a;else a=t[2];let l=a,c;if(t[3]===Symbol.for("react.memo_cache_sentinel"))c={label:"Yes",value:"yes"},t[3]=c;else c=t[3];let u;if(t[4]!==o)u=!l?[{label:R9.jsxs(Text,{children:["Yes, and don't ask again for ",R9.jsx(Text,{bold:!0,children:o})]}),value:"yes-dont-ask-again"}]:[],t[4]=o,t[5]=u;else u=t[5];let d;if(t[6]===Symbol.for("react.memo_cache_sentinel"))d={label:R9.jsxs(Text,{children:["No, and tell Claude what to do differently ",R9.jsx(Text,{bold:!0,children:"(esc)"})]}),value:"no"},t[6]=d;else d=t[6];let p;if(t[7]!==u)p=[c,...u,d],t[7]=u,t[8]=p;else p=t[8];let m=p,f;if(t[9]===Symbol.for("react.memo_cache_sentinel"))f=R9.jsx(Text,{dimColor:!0,children:"Host:"}),t[9]=f;else f=t[9];let h;if(t[10]!==o)h=R9.jsxs(Box,{children:[f,R9.jsxs(Text,{children:[" ",o]})]}),t[10]=o,t[11]=h;else h=t[11];let g;if(t[12]===Symbol.for("react.memo_cache_sentinel"))g=R9.jsx(Box,{marginTop:1,children:R9.jsx(Text,{children:"Do you want to allow this connection?"})}),t[12]=g;else g=t[12];let _;if(t[13]!==r)_=()=>{r({allow:!1,persistToSettings:!1})},t[13]=r,t[14]=_;else _=t[14];let T;if(t[15]!==i||t[16]!==m||t[17]!==_)T=R9.jsx(Box,{children:R9.jsx(hr,{options:m,onChange:i,onCancel:_})}),t[15]=i,t[16]=m,t[17]=_,t[18]=T;else T=t[18];let y;if(t[19]!==T||t[20]!==h)y=R9.jsx(hm,{title:"Network request outside of sandbox",children:R9.jsxs(Box,{flexDirection:"column",paddingX:2,paddingY:1,children:[h,g,T]})}),t[19]=T,t[20]=h,t[21]=y;else y=t[21];return y}
var qcc,R9;
var Wcc=b(()=>{je();Uh();Ol();DI();qcc=x(tt(),1),R9=x(oe(),1)});
export {T2o,qcc,R9,Wcc};
