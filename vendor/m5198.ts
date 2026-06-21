// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b0,mQe} from "./m2206.ts";
import {getSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b,M} from "../runtime.ts";
import {O4} from "./m2337.ts";
function XFl({currentVersion:e,requiredMinimumVersion:t,requiredMaximumVersion:n,topLevelCommand:r}){if(!t&&!n)return null;if(r!==void 0&&QEm.has(r))return null;if(!Gzn.parse(e))return null;if(t){let o=Gzn.parse(t)?.version;if(!o)logForDebugging(`requiredMinimumVersion '${t}' is not a valid semver version \u2014 ignoring`,{level:"error"});else if(!b0(e,o))return`Claude Code ${e} is older than the minimum version required by your organization (${t}).
Update Claude Code using your organization's approved method, then try again. If automatic updates are available, \`claude update\` may also work.`}if(n){let o=Gzn.parse(n)?.version;if(!o)logForDebugging(`requiredMaximumVersion '${n}' is not a valid semver version \u2014 ignoring`,{level:"error"});else if(!mQe(e,o))return`Claude Code ${e} is newer than the maximum version allowed by your organization (${n}).
Your organization requires version ${n} or older. Install an approved version using your organization's approved method. \`claude install <version>\` may also work.`}return null}
function QFl(e){try{let t=e.parent?e:null;while(t?.parent?.parent)t=t.parent;let n=getSettingsForSource("policySettings");return XFl({currentVersion:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.185",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-20T06:38:30Z",GIT_SHA:"9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"}.VERSION,requiredMinimumVersion:n?.requiredMinimumVersion,requiredMaximumVersion:n?.requiredMaximumVersion,topLevelCommand:t?.name()})}catch(t){return De(t),null}}
function ZFl(){try{let e=getSettingsForSource("policySettings");return XFl({currentVersion:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.185",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-20T06:38:30Z",GIT_SHA:"9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"}.VERSION,requiredMinimumVersion:e?.requiredMinimumVersion,requiredMaximumVersion:e?.requiredMaximumVersion,topLevelCommand:void 0})}catch(e){return De(e),null}}
var Gzn,QEm;
var k0o=b(()=>{qe();Rn();yr();Gzn=M(O4(),1),QEm=new Set(["update","install","doctor"])});
export {XFl,QFl,ZFl,Gzn,QEm,k0o};
