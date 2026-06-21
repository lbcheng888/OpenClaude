// @ts-nocheck
import {Or,Ts} from "./m2542.ts";
import {mr,ki} from "./m2453.ts";
import {bA,Qm,Sw} from "../src/mcp/0728_serverName.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {Newline} from "./m2436.ts";
import {Text} from "./m2423.ts";
import {yU,w9t} from "../src/tools/4155_url.ts";
import {Rl,TU} from "../src/tui/4359_isSearch.ts";
import {Box} from "./m2422.ts";
import {Pa,rh} from "./m2539.ts";
import {et,Ai} from "./m2208.ts";
import {Kn,Li} from "./m2572.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function FCl(e){let t=BCl.c(18),{onCancel:n,onSubmit:r,ruleBehavior:o}=e,[s,i]=Lvo.useState(""),[a,l]=Lvo.useState(0),c;if(t[0]===Symbol.for("react.memo_cache_sentinel"))c={context:"Settings"},t[0]=c;else c=t[0];Or("confirm:no",n,c);let{columns:u}=mr(),d=u-6,p;if(t[1]!==r||t[2]!==o)p=(v)=>{let R=v.trim();if(R.length===0)return;let k=bA(R);r(k,o)},t[1]=r,t[2]=o,t[3]=p;else p=t[3];let m=p,f=`Add ${o} permission rule`,A;if(t[4]===Symbol.for("react.memo_cache_sentinel"))A=ew.createElement(Tn,null,ew.createElement(at,{chord:"enter",action:"submit"}),ew.createElement(at,{chord:"escape",action:"cancel"})),t[4]=A;else A=t[4];let h;if(t[5]===Symbol.for("react.memo_cache_sentinel"))h=ew.createElement(Newline,null),t[5]=h;else h=t[5];let g,_;if(t[6]===Symbol.for("react.memo_cache_sentinel"))g=ew.createElement(Text,{bold:!0},Qm({toolName:yU.name})),_=ew.createElement(Text,{bold:!1}," or "),t[6]=g,t[7]=_;else g=t[6],_=t[7];let y;if(t[8]===Symbol.for("react.memo_cache_sentinel"))y=ew.createElement(Text,null,"Permission rules are a tool name, optionally followed by a specifier in parentheses.",h,"e.g.,"," ",g,_,ew.createElement(Text,{bold:!0},Qm({toolName:Rl.name,ruleContent:"ls *"}))),t[8]=y;else y=t[8];let T;if(t[9]!==a||t[10]!==m||t[11]!==s||t[12]!==d)T=ew.createElement(Box,{flexDirection:"column"},y,ew.createElement(Box,{borderDimColor:!0,borderStyle:"round",marginY:1,paddingLeft:1},ew.createElement(Pa,{showCursor:!0,value:s,onChange:i,onSubmit:m,placeholder:`Enter permission rule${et.ellipsis}`,columns:d,cursorOffset:a,onChangeCursorOffset:l}))),t[9]=a,t[10]=m,t[11]=s,t[12]=d,t[13]=T;else T=t[13];let S;if(t[14]!==n||t[15]!==f||t[16]!==T)S=ew.createElement(Kn,{title:f,onCancel:n,color:"permission",isCancelActive:!1,inputGuide:A},T),t[14]=n,t[15]=f,t[16]=T,t[17]=S;else S=t[17];return S}
var BCl,ew,Lvo;
var UCl=b(()=>{Ai();rh();ki();ze();Ts();TU();w9t();Sw();zs();Li();rs();BCl=M(rt(),1),ew=M(Te(),1),Lvo=M(Te(),1)});
export {FCl,BCl,ew,Lvo,UCl};
