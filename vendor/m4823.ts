// @ts-nocheck
import {zt,qs} from "./m635.ts";
import {getOriginalCwd,lt} from "../src/session/0131_sent.ts";
import {getSessionIdFromLog,ja} from "../src/permissions/5143_writeRemoteAgentMetadata.ts";
import {Xa} from "./m2509.ts";
import {b} from "../runtime.ts";
function ICo(){return zt()==="windows"?";":"&&"}
function DGn(e,t,n){let r=getOriginalCwd();if(!t||!e.projectPath||e.projectPath===r)return{isCrossProject:!1};if(n.some((a)=>e.projectPath===a||e.projectPath.startsWith(a+mSl.sep)))return{isCrossProject:!0,isSameRepoWorktree:!0,projectPath:e.projectPath};let s=getSessionIdFromLog(e);return{isCrossProject:!0,isSameRepoWorktree:!1,command:`cd ${Xa([e.projectPath])} ${ICo()} claude --resume ${s}`,projectPath:e.projectPath}}
var mSl;
var DCo=b(()=>{lt();qs();ja();mSl=require("path")});
export {ICo,DGn,mSl,DCo};
