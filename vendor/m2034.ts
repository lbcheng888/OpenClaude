// @ts-nocheck
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
import {lt,getSessionId} from "../src/session/0131_sent.ts";
import {Ao,getSubscriptionType,getRateLimitTier,getOauthAccountInfo} from "../src/config/2031_withOAuthRefreshLock.ts";
import {Qn,getOrCreateUserID,getGlobalConfig} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {Go,Pt} from "./m632.ts";
import {Lr} from "./m578.ts";
import {sn} from "../src/config/0047_namespace.ts";
import {vB,wR} from "./m682.ts";
import {hbt} from "../src/config/0571_externalHttp.ts";
import {st} from "./m5.ts";
async function gni(){if(Bkt===null&&!Nkt)Nkt=$Gu(),Bkt=await Nkt,Nkt=null,SXe.cache.clear?.()}
function tve(){Bkt=null,Nkt=null,SXe.cache.clear?.(),Ise.cache.clear?.()}
function _ni(){return SXe(!0)}
function UGu(){return}
async function $Gu(){return}
function hni(e){return typeof e==="string"&&e.length>=qGu?e:void 0}
var Bkt=null,Nkt=null,SXe,Ise,yni,qGu=8;
var JQ=b(()=>{ta();lt();Ao();Qn();Go();Lr();sn();vB();SXe=wn((e)=>{let t=getOrCreateUserID(),n=getGlobalConfig(),r,o,s;if(e){if(r=getSubscriptionType()??void 0,o=getRateLimitTier()??void 0,r&&n.claudeCodeFirstTokenDate){let c=new Date(n.claudeCodeFirstTokenDate).getTime();if(!isNaN(c))s=c}}let i=getOauthAccountInfo(),a=hni(i?.organizationUuid),l=hni(i?.accountUuid);return{deviceId:t,sessionId:getSessionId(),email:UGu(),appVersion:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.185",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-20T06:38:30Z",GIT_SHA:"9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"}.VERSION,platform:hbt(),organizationUuid:a,accountUuid:l,userType:"external",subscriptionType:r,rateLimitTier:o,firstTokenTime:s,...st(process.env.GITHUB_ACTIONS)&&{githubActionsMetadata:{actor:process.env.GITHUB_ACTOR,actorId:process.env.GITHUB_ACTOR_ID,repository:process.env.GITHUB_REPOSITORY,repositoryId:process.env.GITHUB_REPOSITORY_ID,repositoryOwner:process.env.GITHUB_REPOSITORY_OWNER,repositoryOwnerId:process.env.GITHUB_REPOSITORY_OWNER_ID}}}});Ise=wn(async()=>{let e=await wR("git config --get user.email",{reject:!1,cwd:Pt()});return e.exitCode===0&&e.stdout?e.stdout.trim():void 0}),yni=wn(async()=>{let e=await wR("git config --get user.name",{reject:!1,cwd:Pt()});return e.exitCode===0&&e.stdout?e.stdout.trim():void 0})});
export {gni,tve,_ni,UGu,$Gu,hni,Bkt,Nkt,SXe,Ise,yni,qGu,JQ};
