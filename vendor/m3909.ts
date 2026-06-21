// @ts-nocheck
import {b} from "../runtime.ts";
function eTp(e){let t=e.find((r)=>r.type==="user"&&!r.isMeta);if(!t)return"";let n=t.message.content;if(typeof n==="string")return n;if(Array.isArray(n)){let r=n.find((o)=>o.type==="text");if(r&&r.type==="text")return r.text}return""}
function Kso(e,t){let r=[4,7,20].map((i)=>e[i]||"0").join(""),o=`${Zyp}${r}${t}`;return ROa.createHash("sha256").update(o).digest("hex").slice(0,3)}
function xOa(e){let t=eTp(e);return Kso(t,{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.185",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-20T06:38:30Z",GIT_SHA:"9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"}.VERSION)}
var ROa,Zyp="59cf53e54c78";
var zso=b(()=>{ROa=require("crypto")});
export {eTp,Kso,xOa,ROa,Zyp,zso};
