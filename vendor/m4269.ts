// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {truncate} from "./m237.ts";
import {Gn,sc} from "./m2455.ts";
import {Text} from "./m2423.ts";
import {ic,Ny} from "./m2574.ts";
import {Box} from "./m2422.ts";
import {ze} from "./m2452.ts";
import {ps} from "./m238.ts";
import {Te} from "./m2253.ts";
var DGa={};
isFullscreenWithTTY(DGa,{isWorktreeModeEnabled:()=>isWorktreeModeEnabled});
function isWorktreeModeEnabled(){return!0}
function PGa(e){return`${e.cron??""}${e.prompt?`: ${truncate(e.prompt,60,!0)}`:""}`}
function OGa(e){return M9.default.createElement(Gn,null,M9.default.createElement(Text,null,"Scheduled ",M9.default.createElement(Text,{bold:!0},e.id)," ",M9.default.createElement(Text,{dimColor:!0},"(",e.humanSchedule,")")))}
function LGa(e){return e.id??""}
function MGa(e){return M9.default.createElement(Gn,null,M9.default.createElement(Text,null,"Cancelled ",M9.default.createElement(Text,{bold:!0},e.id)))}
function NGa(){return""}
function BGa(e){if(e.jobs.length===0)return M9.default.createElement(Gn,null,M9.default.createElement(ic,null,"No scheduled jobs"));return M9.default.createElement(Gn,null,M9.default.createElement(Box,{flexDirection:"column"},e.jobs.map((t)=>M9.default.createElement(Text,{key:t.id},M9.default.createElement(Text,{bold:!0},t.id)," ",M9.default.createElement(Text,{dimColor:!0},t.humanSchedule,t.recurring?" (recurring)":" (one-shot)",t.durable===!1?" [session-only]":"",t.prompt?`: ${truncate(t.prompt,60,!0)}`:"")))))}
var M9;
var o4n=b(()=>{Ny();sc();ze();ps();M9=M(Te(),1)});
export {DGa,isWorktreeModeEnabled,PGa,OGa,LGa,MGa,NGa,BGa,M9,o4n};
