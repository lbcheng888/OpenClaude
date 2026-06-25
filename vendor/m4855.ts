// @ts-nocheck
import {Yt,Es} from "./m641.ts";
import {getOriginalCwd,lt} from "../src/session/0132_sent.ts";
import {getSessionIdFromLog,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {Ma} from "./m2519.ts";
import {b} from "../runtime.ts";
function JHo(){return Yt()==="windows"?";":"&&"}
function bjn(e,t,n){let r=getOriginalCwd();if(!t||!e.projectPath||e.projectPath===r)return{isCrossProject:!1};if(n.some((a)=>e.projectPath===a||e.projectPath.startsWith(a+SHl.sep)))return{isCrossProject:!0,isSameRepoWorktree:!0,projectPath:e.projectPath};let s=getSessionIdFromLog(e);return{isCrossProject:!0,isSameRepoWorktree:!1,command:`cd ${Ma([e.projectPath])} ${JHo()} claude --resume ${s}`,projectPath:e.projectPath}}
var SHl;
var XHo=b(()=>{lt();Es();_a();SHl=require("path")});
export {JHo,bjn,SHl,XHo};
