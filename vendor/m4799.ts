// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {fVn,$w,po} from "../src/tools/5224_userPromptCount.ts";
import {isTeammate,Op} from "../src/agent/1464_waitForTeammatesToBecomeIdle.ts";
import {Yht,Hzn} from "../src/permissions/4799_once.ts";
import {oTe,s5t} from "./m4409.ts";
import {bVn,EVn} from "./m4507.ts";
import {Mie,eb,Pf} from "../src/agent/2591_level.ts";
var NRl={};
ft(NRl,{renameSystemReminder:()=>renameSystemReminder,performRename:()=>performRename,call:()=>ecm});
function renameSystemReminder(e){let t=fVn(e);return $w(`The user named this session "${t}". This may indicate the session's focus or intent.`)}
async function performRename(e,t){if(isTeammate())return{message:"Cannot rename: This session is a teammate. Teammate names are set by the team leader."};let n=!e||e.trim()==="",r;if(n){let o=await Yht(t.messages,t.abortController.signal,{preferFork:!0});if(!o)return{message:"Could not generate a name: no conversation context yet. Usage: /rename <name>"};r=o}else r=e.trim();return await oTe(r,"user"),t.setAppState((o)=>bVn(o,{name:r})),await Mie(eb(),r,"user"),{message:`Session renamed to: ${r}`,newName:r,isGenerated:n}}
async function ecm(e,t,n){let{message:r,newName:o,isGenerated:s}=await performRename(n,t);return e(r,{display:"system",metaMessages:o&&!s?[renameSystemReminder(o)]:void 0}),null}
var Dzn=b(()=>{Pf();po();EVn();Op();s5t();Hzn()});
export {NRl,renameSystemReminder,performRename,ecm,Dzn};
