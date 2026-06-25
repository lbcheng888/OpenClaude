// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {dUo,uUo} from "./m5565.ts";
import {Td,Cb} from "./m5036.ts";
import {xf,HA} from "./m2219.ts";
var hic={};
ft(hic,{registerRunSkill:()=>registerRunSkill});
function fic(){return J5m??=Promise.resolve().then(() => (dUo(),uUo))}
function registerRunSkill(){Td({name:"run",menuDescription:"Launch this project\u2019s app to see your change working",description:X5m,userInvocable:!0,files:()=>fic().then((e)=>e.RUN_EXAMPLE_FILES),async getPromptForCommand(e){let{SKILL_MD:t}=await fic(),n=[xf(t).content.trimStart()];if(e)n.push(`## User Request

${e}`);return[{type:"text",text:n.join(`

`)}]}})}
var J5m,X5m="Launch and drive this project's app to see a change working. Use when asked to run, start, or screenshot the app, or to confirm a change works in the real app (not just tests). First looks for a project skill that already covers launching the app; otherwise falls back to built-in patterns per project type (CLI, server, TUI, Electron, browser-driven, library).";
var gic=b(()=>{HA();Cb()});
export {hic,fic,registerRunSkill,J5m,X5m,gic};
