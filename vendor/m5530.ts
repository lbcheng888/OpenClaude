// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {ap,BE} from "./m5006.ts";
import {jXn,fXl,WLo,AXl} from "./m5529.ts";
import {Ev,RA} from "./m2211.ts";
var kXl={};
isFullscreenWithTTY(kXl,{registerRunSkill:()=>registerRunSkill});
function registerRunSkill(){ap({name:"run",menuDescription:"Launch this project\u2019s app to see your change working",description:CFm,userInvocable:!0,files:jXn,async getPromptForCommand(e){let t=[EFm.trimStart()];if(e)t.push(`## User Request

${e}`);return[{type:"text",text:t.join(`

`)}]}})}
var xXl,EFm,CFm;
var HXl=b(()=>{Ev();BE();fXl();WLo();({frontmatter:xXl,content:EFm}=RA(AXl)),CFm=typeof xXl.description==="string"?xXl.description:"Launch and drive this project's app to see a change working."});
export {kXl,registerRunSkill,xXl,EFm,CFm,HXl};
