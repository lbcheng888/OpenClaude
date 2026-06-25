// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {Td,Cb} from "./m5036.ts";
import {mUo,pUo} from "./m5567.ts";
import {dUo,uUo} from "./m5565.ts";
import {xf,HA} from "./m2219.ts";
var bic={};
ft(bic,{registerRunSkillGeneratorSkill:()=>registerRunSkillGeneratorSkill});
function registerRunSkillGeneratorSkill(){Td({name:"run-skill-generator",menuDescription:"Create a skill that knows how to run this project\u2019s app",description:r8m,userInvocable:!0,disableModelInvocation:!0,files:async()=>{let[{TEMPLATE_MD:e},{RUN_EXAMPLE_FILES:t}]=await Promise.all([Promise.resolve().then(() => (mUo(),pUo)),Promise.resolve().then(() => (dUo(),uUo))]);return{"template.md":e,...t}},async getPromptForCommand(e){let{SKILL_MD:t}=await Promise.resolve().then(() => (mUo(),pUo)),n=[xf(t).content.trimStart()];if(e)n.push(`## User Request

${e}`);return[{type:"text",text:n.join(`

`)}]}})}
var r8m="Author or improve the run-<unit> skill \u2014 a per-project skill that tells agents how to build, launch, and drive this project's app. Use when the user asks to set up the project, get it running, write run instructions, or verify build/run steps work from a clean environment.";
var Eic=b(()=>{HA();Cb()});
export {bic,registerRunSkillGeneratorSkill,r8m,Eic};
