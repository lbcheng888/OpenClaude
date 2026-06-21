// @ts-nocheck
import {et,Ai} from "./m2208.ts";
import {Pt,Go} from "./m632.ts";
import {b} from "../runtime.ts";
function U_l(e){let t=e.map((r)=>({text:r})),n="Check the Claude Code changelog for updates";return{title:"What's new",lines:t,footer:t.length>0?"/release-notes for more":void 0,emptyMessage:"Check the Claude Code changelog for updates"}}
function $_l(e){let n=e.filter(({isEnabled:o})=>o).sort((o,s)=>Number(o.isComplete)-Number(s.isComplete)).map(({text:o,isComplete:s})=>({text:`${s?`${et.tick} `:""}${o}`})),r=Pt()===F_l.homedir()?"Note: You have launched claude in your home directory. For the best experience, launch it in a project directory instead.":void 0;if(r)n.push({text:r});return{title:"Tips for getting started",lines:n}}
var F_l;
var q_l=b(()=>{Ai();Go();F_l=require("os")});
export {U_l,$_l,F_l,q_l};
