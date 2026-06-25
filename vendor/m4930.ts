// @ts-nocheck
import {Or,ss} from "./m2553.ts";
import {_r,ui} from "./m2463.ts";
import {Jf,Gp,gA} from "../src/mcp/0733_serverName.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {Newline} from "./m2446.ts";
import {Text} from "./m2433.ts";
import {BB,$4t} from "../src/tools/4168_url.ts";
import {sl,UB} from "../src/tools/4381_isSearch.ts";
import {Box} from "./m2432.ts";
import {ga,rh} from "./m2550.ts";
import {Xe,Zs} from "./m2216.ts";
import {preInitQueue,di} from "./m2583.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Jxl(e){let t=Yxl.c(18),{onCancel:n,onSubmit:r,ruleBehavior:o}=e,[s,i]=QIo.useState(""),[a,l]=QIo.useState(0),c;if(t[0]===Symbol.for("react.memo_cache_sentinel"))c={context:"Settings"},t[0]=c;else c=t[0];Or("confirm:no",n,c);let{columns:u}=_r(),d=u-6,p;if(t[1]!==r||t[2]!==o)p=(R)=>{let w=R.trim();if(w.length===0)return;let H=Jf(w);r(H,o)},t[1]=r,t[2]=o,t[3]=p;else p=t[3];let m=p,f=`Add ${o} permission rule`,h;if(t[4]===Symbol.for("react.memo_cache_sentinel"))h=initH6.jsxs(bn,{children:[initH6.jsx(at,{chord:"enter",action:"submit"}),initH6.jsx(at,{chord:"escape",action:"cancel"})]}),t[4]=h;else h=t[4];let g;if(t[5]===Symbol.for("react.memo_cache_sentinel"))g=initH6.jsx(Newline,{}),t[5]=g;else g=t[5];let _,T;if(t[6]===Symbol.for("react.memo_cache_sentinel"))_=initH6.jsx(Text,{bold:!0,children:Gp({toolName:BB.name})}),T=initH6.jsx(Text,{bold:!1,children:" or "}),t[6]=_,t[7]=T;else _=t[6],T=t[7];let y;if(t[8]===Symbol.for("react.memo_cache_sentinel"))y=initH6.jsxs(Text,{children:["Permission rules are a tool name, optionally followed by a specifier in parentheses.",g,"e.g.,"," ",_,T,initH6.jsx(Text,{bold:!0,children:Gp({toolName:sl.name,ruleContent:"ls *"})})]}),t[8]=y;else y=t[8];let S;if(t[9]!==a||t[10]!==m||t[11]!==s||t[12]!==d)S=initH6.jsxs(Box,{flexDirection:"column",children:[y,initH6.jsx(Box,{borderDimColor:!0,borderStyle:"round",marginY:1,paddingLeft:1,children:initH6.jsx(ga,{showCursor:!0,value:s,onChange:i,onSubmit:m,placeholder:`Enter permission rule${Xe.ellipsis}`,columns:d,cursorOffset:a,onChangeCursorOffset:l})})]}),t[9]=a,t[10]=m,t[11]=s,t[12]=d,t[13]=S;else S=t[13];let E;if(t[14]!==n||t[15]!==f||t[16]!==S)E=initH6.jsx(preInitQueue,{title:f,onCancel:n,color:"permission",isCancelActive:!1,inputGuide:h,children:S}),t[14]=n,t[15]=f,t[16]=S,t[17]=E;else E=t[17];return E}
var Yxl,QIo,initH6;
var Xxl=b(()=>{Zs();rh();ui();je();ss();UB();$4t();gA();Is();di();Wo();Yxl=x(tt(),1),QIo=x(et(),1),initH6=x(oe(),1)});
export {Jxl,Yxl,QIo,initH6,Xxl};
