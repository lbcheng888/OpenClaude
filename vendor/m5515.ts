// @ts-nocheck
import {Td,Cb} from "./m5036.ts";
import {isClaudeInChromeWiredThisSession,kTe} from "../src/permissions/4676_shouldSuppressChromeOffer.ts";
import {aEo,dGn} from "./m4444.ts";
import {b} from "../runtime.ts";
function ctc(){Td({name:"claude-in-chrome",menuDescription:"Let Claude browse and interact with pages in your Chrome",description:"Automates your Chrome browser to interact with web pages - clicking elements, filling forms, capturing screenshots, reading console logs, and navigating sites. Opens pages in new tabs within your existing Chrome session. Requires site-level permissions before executing (configured in the extension).",whenToUse:"When the user wants to interact with web pages, automate browser tasks, capture screenshots, read console logs, or perform any browser-based actions. Always invoke BEFORE attempting to use any mcp__claude-in-chrome__* tools.",allowedTools:[],userInvocable:!0,isEnabled:()=>isClaudeInChromeWiredThisSession(),async getPromptForCommand(e){let t=aEo;if(e)t+=`

## Task

${e}`;return[{type:"text",text:t}]}})}
var utc=b(()=>{dGn();kTe();Cb()});
export {ctc,utc};
