// @ts-nocheck
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
import {lt,getSessionId} from "../src/session/0132_sent.ts";
import {lo,getSubscriptionType,getRateLimitTier,getOauthAccountInfo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {tr,getOrCreateUserID,getGlobalConfig} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {Po,isTmuxControlMode} from "./m638.ts";
import {Ir} from "./m584.ts";
import {dn} from "../src/config/0137_namespace.ts";
import {zN,Nv} from "./m688.ts";
import {qAt} from "../src/config/0577_externalHttp.ts";
import {nt} from "./m127.ts";
async function pli(){if(dxt===null&&!uxt)uxt=itd(),dxt=await uxt,uxt=null,TZe.cache.clear?.()}
function FRe(){dxt=null,uxt=null,TZe.cache.clear?.(),xse.cache.clear?.()}
function mli(){return TZe(!0)}
function std(){return}
async function itd(){return}
function dli(e){return typeof e==="string"&&e.length>=atd?e:void 0}
var dxt=null,uxt=null,TZe,xse,fli,atd=8;
var KQ=b(()=>{Wi();lt();lo();tr();Po();Ir();dn();zN();TZe=Hn((e)=>{let t=getOrCreateUserID(),n=getGlobalConfig(),r,o,s;if(e){if(r=getSubscriptionType()??void 0,o=getRateLimitTier()??void 0,r&&n.claudeCodeFirstTokenDate){let c=new Date(n.claudeCodeFirstTokenDate).getTime();if(!isNaN(c))s=c}}let i=getOauthAccountInfo(),a=dli(i?.organizationUuid),l=dli(i?.accountUuid);return{deviceId:t,sessionId:getSessionId(),email:std(),appVersion:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.190",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-24T02:21:52Z",GIT_SHA:"c1e566ee5380a4c29ddd0fd0a742361e013cebd0"}.VERSION,platform:qAt(),organizationUuid:a,accountUuid:l,userType:"external",subscriptionType:r,rateLimitTier:o,firstTokenTime:s,...nt(process.env.GITHUB_ACTIONS)&&{githubActionsMetadata:{actor:process.env.GITHUB_ACTOR,actorId:process.env.GITHUB_ACTOR_ID,repository:process.env.GITHUB_REPOSITORY,repositoryId:process.env.GITHUB_REPOSITORY_ID,repositoryOwner:process.env.GITHUB_REPOSITORY_OWNER,repositoryOwnerId:process.env.GITHUB_REPOSITORY_OWNER_ID}}}});xse=Hn(async()=>{let e=await Nv("git config --get user.email",{reject:!1,cwd:isTmuxControlMode()});return e.exitCode===0&&e.stdout?e.stdout.trim():void 0}),fli=Hn(async()=>{let e=await Nv("git config --get user.name",{reject:!1,cwd:isTmuxControlMode()});return e.exitCode===0&&e.stdout?e.stdout.trim():void 0})});
export {pli,FRe,mli,std,itd,dli,dxt,uxt,TZe,xse,fli,atd,KQ};
