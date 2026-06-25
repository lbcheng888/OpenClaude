// @ts-nocheck
import {Ync,jnc} from "./m5557.ts";
import {Td,Cb} from "./m5036.ts";
import {v6e} from "./m3990.ts";
import {xf,HA} from "./m2219.ts";
import {b} from "../runtime.ts";
function Jnc(){return qqm??=Promise.resolve().then(() => (Ync(),jnc))}
function Xnc(){Td({name:v6e,description:Wqm,userInvocable:!0,files:()=>Jnc().then((e)=>e.SKILL_FILES),async getPromptForCommand(e){let{SKILL_MD:t}=await Jnc(),n=[xf(t).content.trimStart()];if(e)n.push(`## User Request

${e}`);return[{type:"text",text:n.join(`

`)}]}})}
var qqm,Wqm="Verify that a code change actually does what it's supposed to by running the app and observing behavior. Use when asked to verify a PR, confirm a fix works, test a change manually, check that a feature works, or validate local changes before pushing.";
var Qnc=b(()=>{HA();Cb()});
export {Jnc,Xnc,qqm,Wqm,Qnc};
