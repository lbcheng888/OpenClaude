// @ts-nocheck
import {b} from "../runtime.ts";
function SIp(e){let t=e.find((r)=>r.type==="user"&&!r.isMeta);if(!t)return"";let n=t.message.content;if(typeof n==="string")return n;if(Array.isArray(n)){let r=n.find((o)=>o.type==="text");if(r&&r.type==="text")return r.text}return""}
function xdo(e,t){let r=[4,7,20].map((i)=>e[i]||"0").join(""),o=`${TIp}${r}${t}`;return P$a.createHash("sha256").update(o).digest("hex").slice(0,3)}
function O$a(e){let t=SIp(e);return xdo(t,{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.190",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-24T02:21:52Z",GIT_SHA:"c1e566ee5380a4c29ddd0fd0a742361e013cebd0"}.VERSION)}
var P$a,TIp="59cf53e54c78";
var Ddo=b(()=>{P$a=require("crypto")});
export {SIp,xdo,O$a,P$a,TIp,Ddo};
