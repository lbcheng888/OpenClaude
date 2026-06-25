// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {Text} from "./m2433.ts";
import {Bl,d_} from "./m3354.ts";
import {preInitQueue,di} from "./m2583.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
var Bpc={};
ft(Bpc,{ApproveApiKey:()=>ApproveApiKey});
function ApproveApiKey(e){let t=Fpc.c(16),{customApiKeyTruncated:n,onDone:r}=e,o;if(t[0]!==n||t[1]!==r)o=function(f){e:switch(f){case"yes":{saveGlobalConfig((h)=>({...h,customApiKeyResponses:{...h.customApiKeyResponses,approved:[...h.customApiKeyResponses?.approved??[],n]}})),r(!0);break e}case"no":saveGlobalConfig((h)=>({...h,customApiKeyResponses:{...h.customApiKeyResponses,rejected:[...h.customApiKeyResponses?.rejected??[],n]}})),r(!1)}},t[0]=n,t[1]=r,t[2]=o;else o=t[2];let s=o,i;if(t[3]!==s)i=()=>s("no"),t[3]=s,t[4]=i;else i=t[4];let a;if(t[5]===Symbol.for("react.memo_cache_sentinel"))a=_de.jsx(Text,{bold:!0,children:"ANTHROPIC_API_KEY"}),t[5]=a;else a=t[5];let l;if(t[6]!==n)l=_de.jsxs(Text,{children:[a,_de.jsxs(Text,{children:[": sk-ant-...",n]})]}),t[6]=n,t[7]=l;else l=t[7];let c;if(t[8]===Symbol.for("react.memo_cache_sentinel"))c=_de.jsx(Text,{children:"Do you want to use this API key?"}),t[8]=c;else c=t[8];let u;if(t[9]===Symbol.for("react.memo_cache_sentinel"))u=_de.jsxs(Text,{children:["No (",_de.jsx(Text,{bold:!0,children:"recommended"}),")"]}),t[9]=u;else u=t[9];let d;if(t[10]!==s)d=_de.jsx(Bl,{focus:"cancel",cancelLabel:u,onConfirm:()=>s("yes"),onCancel:()=>s("no")}),t[10]=s,t[11]=d;else d=t[11];let p;if(t[12]!==i||t[13]!==l||t[14]!==d)p=_de.jsxs(preInitQueue,{title:"Detected a custom API key in your environment",color:"warning",onCancel:i,children:[l,c,d]}),t[12]=i,t[13]=l,t[14]=d,t[15]=p;else p=t[15];return p}
var Fpc,_de;
var e$o=b(()=>{je();tr();d_();di();Fpc=x(tt(),1),_de=x(oe(),1)});
export {Bpc,ApproveApiKey,Fpc,_de,e$o};
