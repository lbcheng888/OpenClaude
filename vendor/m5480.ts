// @ts-nocheck
import {ap,BE} from "./m5006.ts";
import {isClaudeInChromeWiredThisSession,rye} from "../src/permissions/4648_shouldSuppressChromeOffer.ts";
import {fgo,V6n} from "./m4422.ts";
import {b} from "../runtime.ts";
function C7l(){ap({name:"claude-in-chrome",menuDescription:"Let Claude browse and interact with pages in your Chrome",description:"Automates your Chrome browser to interact with web pages - clicking elements, filling forms, capturing screenshots, reading console logs, and navigating sites. Opens pages in new tabs within your existing Chrome session. Requires site-level permissions before executing (configured in the extension).",whenToUse:"When the user wants to interact with web pages, automate browser tasks, capture screenshots, read console logs, or perform any browser-based actions. Always invoke BEFORE attempting to use any mcp__claude-in-chrome__* tools.",allowedTools:[],userInvocable:!0,isEnabled:()=>isClaudeInChromeWiredThisSession(),async getPromptForCommand(e){let t=fgo;if(e)t+=`

## Task

${e}`;return[{type:"text",text:t}]}})}
var v7l=b(()=>{V6n();rye();BE()});
export {C7l,v7l};
