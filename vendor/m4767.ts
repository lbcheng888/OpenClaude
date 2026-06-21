// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {zjn,CronDeleteToolName,lo} from "../src/tools/5190_userPromptCount.ts";
import {isTeammate,Am} from "../src/agent/1459_waitForTeammatesToBecomeIdle.ts";
import {Bmt,jWn} from "../src/permissions/4767_once.ts";
import {B_e,P4t} from "./m4387.ts";
import {e8n,t8n} from "./m4485.ts";
import {Fwe,AC,mg} from "../src/agent/2580_level.ts";
var Ugl={};
isFullscreenWithTTY(Ugl,{renameSystemReminder:()=>renameSystemReminder,performRename:()=>performRename,call:()=>$Zp});
function renameSystemReminder(e){let t=zjn(e);return CronDeleteToolName(`The user named this session "${t}". This may indicate the session's focus or intent.`)}
async function performRename(e,t){if(isTeammate())return{message:"Cannot rename: This session is a teammate. Teammate names are set by the team leader."};let n=!e||e.trim()==="",r;if(n){let o=await Bmt(t.messages,t.abortController.signal,{preferFork:!0});if(!o)return{message:"Could not generate a name: no conversation context yet. Usage: /rename <name>"};r=o}else r=e.trim();return await B_e(r,"user"),t.setAppState((o)=>e8n(o,{name:r})),await Fwe(AC(),r,"user"),{message:`Session renamed to: ${r}`,newName:r,isGenerated:n}}
async function $Zp(e,t,n){let{message:r,newName:o,isGenerated:s}=await performRename(n,t);return e(r,{display:"system",metaMessages:o&&!s?[renameSystemReminder(o)]:void 0}),null}
var VWn=b(()=>{mg();lo();t8n();Am();P4t();jWn()});
export {Ugl,renameSystemReminder,performRename,$Zp,VWn};
