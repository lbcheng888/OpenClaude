// @ts-nocheck
import {b} from "../runtime.ts";
function Jdm(){return!1}
function VIl(e,t="darwin",n="arm64",r=GIl.existsSync,o=Jdm()){let s=process.env.SDK_NATIVE_BIN??"claude",i=t==="win32"?".exe":"",l=(t==="android"?[`${kft}-linux-${n}-android`]:t==="linux"?o?[`${kft}-linux-${n}-musl`,`${kft}-linux-${n}`]:[`${kft}-linux-${n}`,`${kft}-linux-${n}-musl`]:[`${kft}-${t}-${n}`]).map((c)=>`${c}/${s}${i}`);for(let c of l)try{let u=e(c);if(r(u))return u}catch{}return null}
var GIl,kft="@anthropic-ai/claude-agent-sdk";
var KIl=b(()=>{GIl=require("fs")});
export {Jdm,VIl,GIl,kft,KIl};
