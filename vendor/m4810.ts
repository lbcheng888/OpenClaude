// @ts-nocheck
import {Xe,Zs} from "./m2216.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {b} from "../runtime.ts";
function Fvl(e){let t=e.map((r)=>({text:r})),n="Check the Claude Code changelog for updates";return{title:"What's new",lines:t,footer:t.length>0?"/release-notes for more":void 0,emptyMessage:"Check the Claude Code changelog for updates"}}
function Bvl(e){let n=e.filter(({isEnabled:o})=>o).sort((o,s)=>Number(o.isComplete)-Number(s.isComplete)).map(({text:o,isComplete:s})=>({text:`${s?`${Xe.tick} `:""}${o}`})),r=isTmuxControlMode()===Nvl.homedir()?"Note: You have launched claude in your home directory. For the best experience, launch it in a project directory instead.":void 0;if(r)n.push({text:r});return{title:"Tips for getting started",lines:n}}
var Nvl;
var Uvl=b(()=>{Zs();Po();Nvl=require("os")});
export {Fvl,Bvl,Nvl,Uvl};
