// @ts-nocheck
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
import {t4} from "./m2347.ts";
function v7l(e){return`${tyt.major(e,{loose:!0})}.${tyt.minor(e,{loose:!0})}.${tyt.patch(e,{loose:!0})}`}
function ZZn(e,t={ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.190",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-24T02:21:52Z",GIT_SHA:"c1e566ee5380a4c29ddd0fd0a742361e013cebd0"}.VERSION){let[n,r]=w7l.useState(()=>v7l(t));if(!e)return null;let o=v7l(e);if(o!==n)return r(o),o;return null}
var w7l,tyt;
var KNo=b(()=>{w7l=x(et(),1),tyt=x(t4(),1)});
export {v7l,ZZn,w7l,tyt,KNo};
