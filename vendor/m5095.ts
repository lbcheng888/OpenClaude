// @ts-nocheck
import {b} from "../runtime.ts";
function abm(){return!1}
function yFl(e,t="darwin",n="arm64",r=_Fl.existsSync,o=abm()){let s=process.env.SDK_NATIVE_BIN??"claude",i=t==="win32"?".exe":"",l=(t==="android"?[`${Kgt}-linux-${n}-android`]:t==="linux"?o?[`${Kgt}-linux-${n}-musl`,`${Kgt}-linux-${n}`]:[`${Kgt}-linux-${n}`,`${Kgt}-linux-${n}-musl`]:[`${Kgt}-${t}-${n}`]).map((c)=>`${c}/${s}${i}`);for(let c of l)try{let u=e(c);if(r(u))return u}catch{}return null}
var _Fl,Kgt="@anthropic-ai/claude-agent-sdk";
var TFl=b(()=>{_Fl=require("fs")});
export {abm,yFl,_Fl,Kgt,TFl};
