// @ts-nocheck
import {tx,i_e} from "./m3307.ts";
import {fl,po} from "../src/tools/5224_userPromptCount.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {Yn,Pl} from "./m2465.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function RDp(){return tx(["Got it.","Good to know.","Noted."])}
function V4a(e){let t=G4a.c(10),{text:n,addMargin:r}=e,o;if(t[0]!==n)o=fl(n,"user-memory-input"),t[0]=n,t[1]=o;else o=t[1];let s=o,i;if(t[2]===Symbol.for("react.memo_cache_sentinel"))i=RDp(),t[2]=i;else i=t[2];let a=i;if(!s)return null;let l=r?1:0,c;if(t[3]===Symbol.for("react.memo_cache_sentinel"))c=yxe.jsx(Text,{color:"remember",backgroundColor:"memoryBackgroundColor",children:"#"}),t[3]=c;else c=t[3];let u;if(t[4]!==s)u=yxe.jsxs(Box,{children:[c,yxe.jsxs(Text,{backgroundColor:"memoryBackgroundColor",color:"text",children:[" ",s," "]})]}),t[4]=s,t[5]=u;else u=t[5];let d;if(t[6]===Symbol.for("react.memo_cache_sentinel"))d=yxe.jsx(Yn,{height:1,children:yxe.jsx(Text,{dimColor:!0,children:a})}),t[6]=d;else d=t[6];let p;if(t[7]!==l||t[8]!==u)p=yxe.jsxs(Box,{flexDirection:"column",marginTop:l,width:"100%",children:[u,d]}),t[7]=l,t[8]=u,t[9]=p;else p=t[9];return p}
var G4a,yxe;
var K4a=b(()=>{i_e();je();po();Pl();G4a=x(tt(),1),yxe=x(oe(),1)});
export {RDp,V4a,G4a,yxe,K4a};
