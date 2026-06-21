// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
import {O4} from "./m2337.ts";
function _4l(e){return`${BAt.major(e,{loose:!0})}.${BAt.minor(e,{loose:!0})}.${BAt.patch(e,{loose:!0})}`}
function WYn(e,t={ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.185",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-20T06:38:30Z",GIT_SHA:"9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"}.VERSION){let[n,r]=y4l.useState(()=>_4l(t));if(!e)return null;let o=_4l(e);if(o!==n)return r(o),o;return null}
var y4l,BAt;
var yPo=b(()=>{y4l=M(Te(),1),BAt=M(O4(),1)});
export {_4l,WYn,y4l,BAt,yPo};
