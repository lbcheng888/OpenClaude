// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {Text} from "./m2423.ts";
import {ac,e_} from "./m3338.ts";
import {Kn,Li} from "./m2572.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var Wrc={};
isFullscreenWithTTY(Wrc,{ApproveApiKey:()=>ApproveApiKey});
function ApproveApiKey(e){let t=jrc.c(16),{customApiKeyTruncated:n,onDone:r}=e,o;if(t[0]!==n||t[1]!==r)o=function(f){e:switch(f){case"yes":{saveGlobalConfig((A)=>({...A,customApiKeyResponses:{...A.customApiKeyResponses,approved:[...A.customApiKeyResponses?.approved??[],n]}})),r(!0);break e}case"no":saveGlobalConfig((A)=>({...A,customApiKeyResponses:{...A.customApiKeyResponses,rejected:[...A.customApiKeyResponses?.rejected??[],n]}})),r(!1)}},t[0]=n,t[1]=r,t[2]=o;else o=t[2];let s=o,i;if(t[3]!==s)i=()=>s("no"),t[3]=s,t[4]=i;else i=t[4];let a;if(t[5]===Symbol.for("react.memo_cache_sentinel"))a=hTe.default.createElement(Text,{bold:!0},"ANTHROPIC_API_KEY"),t[5]=a;else a=t[5];let l;if(t[6]!==n)l=hTe.default.createElement(Text,null,a,hTe.default.createElement(Text,null,": sk-ant-...",n)),t[6]=n,t[7]=l;else l=t[7];let c;if(t[8]===Symbol.for("react.memo_cache_sentinel"))c=hTe.default.createElement(Text,null,"Do you want to use this API key?"),t[8]=c;else c=t[8];let u;if(t[9]===Symbol.for("react.memo_cache_sentinel"))u=hTe.default.createElement(Text,null,"No (",hTe.default.createElement(Text,{bold:!0},"recommended"),")"),t[9]=u;else u=t[9];let d;if(t[10]!==s)d=hTe.default.createElement(ac,{focus:"cancel",cancelLabel:u,onConfirm:()=>s("yes"),onCancel:()=>s("no")}),t[10]=s,t[11]=d;else d=t[11];let p;if(t[12]!==i||t[13]!==l||t[14]!==d)p=hTe.default.createElement(Kn,{title:"Detected a custom API key in your environment",color:"warning",onCancel:i},l,c,d),t[12]=i,t[13]=l,t[14]=d,t[15]=p;else p=t[15];return p}
var jrc,hTe;
var b1o=b(()=>{ze();Qn();e_();Li();jrc=M(rt(),1),hTe=M(Te(),1)});
export {Wrc,ApproveApiKey,jrc,hTe,b1o};
