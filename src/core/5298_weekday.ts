// @ts-nocheck
import {Wc} from "../api/3868_level.ts";
import {iU,rb} from "../permissions/5178_level.ts";
import {Af,S_} from "../agent/1454_agentType.ts";
import {wc,lo} from "../tools/5190_userPromptCount.ts";
import {Oe,Ie,ln} from "../telemetry/0594_feature_name.ts";
import {De,Rn} from "../session/0615_length.ts";
import {b} from "../../runtime.ts";
async function a4l(e,t,n){let r=new Date,o=r.toISOString(),s=-r.getTimezoneOffset(),i=Math.floor(Math.abs(s)/60),a=Math.abs(s)%60,c=`${s>=0?"+":"-"}${String(i).padStart(2,"0")}:${String(a).padStart(2,"0")}`,u=r.toLocaleDateString("en-US",{weekday:"long"}),d=Wc(["You are a date/time parser that converts natural language into ISO 8601 format.","You MUST respond with ONLY the ISO 8601 formatted string, with no explanation or additional text.","If the input is ambiguous, prefer future dates over past dates.","For times without dates, use today's date.","For dates without times, do not include a time component.",'If the input is incomplete or you cannot confidently parse it into a valid date, respond with exactly "INVALID" (nothing else).','Examples of INVALID input: partial dates like "2025-01-", lone numbers like "13", gibberish.','Examples of valid natural language: "tomorrow", "next Monday", "jan 1st 2025", "in 2 hours", "yesterday".']),p=t==="date"?"YYYY-MM-DD (date only, no time)":`YYYY-MM-DDTHH:MM:SS${c} (full date-time with timezone)`,m=`Current context:
- Current date and time: ${o} (UTC)
- Local timezone: ${c}
- Day of week: ${u}

User input: "${e}"

Output format: ${p}

Parse the user's input into ISO 8601 format. Return ONLY the formatted string, or "INVALID" if the input is incomplete or unparseable.`;try{let f=await iU({systemPrompt:d,userPrompt:m,signal:n,options:{querySource:"mcp_datetime_parse",agents:[],isNonInteractiveSession:!1,hasAppendSystemPrompt:!1,mcpTools:[],enablePromptCaching:!1,agentContext:Af()}}),A=wc(f.message.content).trim();if(!A||A==="INVALID")return Oe("mcp_elicitation_nl_datetime_parse","parse_failed"),{success:!1,error:"Unable to parse date/time from input"};if(!/^\d{4}/.test(A))return Oe("mcp_elicitation_nl_datetime_parse","parse_failed"),{success:!1,error:"Unable to parse date/time from input"};return Ie("mcp_elicitation_nl_datetime_parse"),{success:!0,value:A}}catch(f){if(!n.aborted)Oe("mcp_elicitation_nl_datetime_parse","haiku_error"),De(f);return{success:!1,error:"Unable to parse date/time. Please enter in ISO 8601 format manually."}}}
function l4l(e){return/^\d{4}-\d{2}-\d{2}(T|$)/.test(e.trim())}
var c4l=b(()=>{ln();rb();S_();Rn();lo()});
export {a4l,l4l,c4l};
