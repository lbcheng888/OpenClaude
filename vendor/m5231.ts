// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {U0,fet} from "./m2214.ts";
import {getSettingsForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b,x} from "../runtime.ts";
import {t4} from "./m2347.ts";
function U5l({currentVersion:e,requiredMinimumVersion:t,requiredMaximumVersion:n,topLevelCommand:r}){if(!t&&!n)return null;if(r!==void 0&&dDm.has(r))return null;if(!qQn.parse(e))return null;if(t){let o=qQn.parse(t)?.version;if(!o)logForDebugging(`requiredMinimumVersion '${t}' is not a valid semver version \u2014 ignoring`,{level:"error"});else if(!U0(e,o))return`Claude Code ${e} is older than the minimum version required by your organization (${t}).
Update Claude Code using your organization's approved method, then try again. If automatic updates are available, \`claude update\` may also work.`}if(n){let o=qQn.parse(n)?.version;if(!o)logForDebugging(`requiredMaximumVersion '${n}' is not a valid semver version \u2014 ignoring`,{level:"error"});else if(!fet(e,o))return`Claude Code ${e} is newer than the maximum version allowed by your organization (${n}).
Your organization requires version ${n} or older. Install an approved version using your organization's approved method. \`claude install <version>\` may also work.`}return null}
function $5l(e){try{let t=e.parent?e:null;while(t?.parent?.parent)t=t.parent;let n=getSettingsForSource("policySettings");return U5l({currentVersion:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.190",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-24T02:21:52Z",GIT_SHA:"c1e566ee5380a4c29ddd0fd0a742361e013cebd0"}.VERSION,requiredMinimumVersion:n?.requiredMinimumVersion,requiredMaximumVersion:n?.requiredMaximumVersion,topLevelCommand:t?.name()})}catch(t){return Ie(t),null}}
function q5l(){try{let e=getSettingsForSource("policySettings");return U5l({currentVersion:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.190",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-24T02:21:52Z",GIT_SHA:"c1e566ee5380a4c29ddd0fd0a742361e013cebd0"}.VERSION,requiredMinimumVersion:e?.requiredMinimumVersion,requiredMaximumVersion:e?.requiredMaximumVersion,topLevelCommand:void 0})}catch(e){return Ie(e),null}}
var qQn,dDm;
var jMo=b(()=>{qe();vn();br();qQn=x(t4(),1),dDm=new Set(["update","install","doctor"])});
export {U5l,$5l,q5l,qQn,dDm,jMo};
