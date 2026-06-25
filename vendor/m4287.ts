// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {truncate} from "./m239.ts";
import {Yn,Pl} from "./m2465.ts";
import {Text} from "./m2433.ts";
import {wl,sy} from "./m2585.ts";
import {Box} from "./m2432.ts";
import {je} from "./m2462.ts";
import {Xo} from "./m240.ts";
import {oe} from "./m2275.ts";
var QJa={};
ft(QJa,{isWorktreeModeEnabled:()=>isWorktreeModeEnabled});
function isWorktreeModeEnabled(){return!0}
function ZJa(e){return`${e.cron??""}${e.prompt?`: ${truncate(e.prompt,60,!0)}`:""}`}
function eXa(e){return GB.jsx(Yn,{children:GB.jsxs(Text,{children:["Scheduled ",GB.jsx(Text,{bold:!0,children:e.id})," ",GB.jsxs(Text,{dimColor:!0,children:["(",e.humanSchedule,")"]})]})})}
function tXa(e){return e.id??""}
function nXa(e){return GB.jsx(Yn,{children:GB.jsxs(Text,{children:["Cancelled ",GB.jsx(Text,{bold:!0,children:e.id})]})})}
function rXa(){return""}
function oXa(e){if(e.jobs.length===0)return GB.jsx(Yn,{children:GB.jsx(wl,{children:"No scheduled jobs"})});return GB.jsx(Yn,{children:GB.jsx(Box,{flexDirection:"column",children:e.jobs.map((t)=>GB.jsxs(Text,{children:[GB.jsx(Text,{bold:!0,children:t.id})," ",GB.jsxs(Text,{dimColor:!0,children:[t.humanSchedule,t.recurring?" (recurring)":" (one-shot)",t.durable===!1?" [session-only]":"",t.prompt?`: ${truncate(t.prompt,60,!0)}`:""]})]},t.id))})})}
var GB;
var m5n=b(()=>{sy();Pl();je();Xo();GB=x(oe(),1)});
export {QJa,isWorktreeModeEnabled,ZJa,eXa,tXa,nXa,rXa,oXa,GB,m5n};
