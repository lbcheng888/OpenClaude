// @ts-nocheck
import {q0,Khe} from "./m3291.ts";
import {Dl,lo} from "../src/tools/5190_userPromptCount.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {Gn,sc} from "./m2455.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function IEp(){return q0(["Got it.","Good to know.","Noted."])}
function TNa(e){let t=yNa.c(10),{text:n,addMargin:r}=e,o;if(t[0]!==n)o=Dl(n,"user-memory-input"),t[0]=n,t[1]=o;else o=t[1];let s=o,i;if(t[2]===Symbol.for("react.memo_cache_sentinel"))i=IEp(),t[2]=i;else i=t[2];let a=i;if(!s)return null;let l=r?1:0,c;if(t[3]===Symbol.for("react.memo_cache_sentinel"))c=QW.createElement(Text,{color:"remember",backgroundColor:"memoryBackgroundColor"},"#"),t[3]=c;else c=t[3];let u;if(t[4]!==s)u=QW.createElement(Box,null,c,QW.createElement(Text,{backgroundColor:"memoryBackgroundColor",color:"text"}," ",s," ")),t[4]=s,t[5]=u;else u=t[5];let d;if(t[6]===Symbol.for("react.memo_cache_sentinel"))d=QW.createElement(Gn,{height:1},QW.createElement(Text,{dimColor:!0},a)),t[6]=d;else d=t[6];let p;if(t[7]!==l||t[8]!==u)p=QW.createElement(Box,{flexDirection:"column",marginTop:l,width:"100%"},u,d),t[7]=l,t[8]=u,t[9]=p;else p=t[9];return p}
var yNa,QW;
var SNa=b(()=>{Khe();ze();lo();sc();yNa=M(rt(),1),QW=M(Te(),1)});
export {IEp,TNa,yNa,QW,SNa};
