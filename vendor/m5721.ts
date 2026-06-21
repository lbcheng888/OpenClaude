// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {dy,_He} from "./m3752.ts";
import {Text} from "./m2423.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {JFn,YOa,JOa,Vlt,eIe} from "../src/permissions/3913_allow.ts";
import {getAutoModeConfig,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {parseUserSpecifiedModel,getMainLoopModel,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {v6,ZHe} from "../src/api/3911_model.ts";
import {Fs,qU} from "./m5131.ts";
import {Se,bt} from "./m195.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
var bZn={};
isFullscreenWithTTY(bZn,{autoModeDefaultsHandler:()=>autoModeDefaultsHandler,autoModeCritiqueHandler:()=>autoModeCritiqueHandler,autoModeConfigHandler:()=>autoModeConfigHandler});
async function qcc(e,t){e.render(lOe.default.createElement(dy,null,lOe.default.createElement(Text,null,Le(t,null,2)))),await e.waitUntilExit()}
async function autoModeDefaultsHandler(e){Ie("cli_auto_mode_defaults"),await qcc(e,JFn())}
async function autoModeConfigHandler(e){Ie("cli_auto_mode_config"),await qcc(e,YOa(getAutoModeConfig()))}
async function autoModeCritiqueHandler(e,t){let n=getAutoModeConfig();if(!(TZn(n?.allow)||TZn(n?.soft_deny)||TZn(n?.hard_deny)||TZn(n?.environment))){e.render(lOe.default.createElement(dy,null,lOe.default.createElement(Text,null,`No custom auto mode rules found.

Add rules to your settings file under autoMode.{allow, soft_deny, hard_deny, environment}.
Run \`claude auto-mode defaults\` to see the default rules for reference.`))),await e.waitUntilExit();return}let o=t.model?parseUserSpecifiedModel(t.model):getMainLoopModel(),s=JFn(),i=JOa(),a=SZn("allow",n?.allow??[],s.allow)+SZn("soft_deny",n?.soft_deny??[],s.soft_deny)+SZn("hard_deny",n?.hard_deny??[],s.hard_deny)+SZn("environment",n?.environment??[],s.environment);e.render(lOe.default.createElement(Text,null,"Analyzing your auto mode rules\u2026",`

`));let l;try{let u=(await v6({querySource:"auto_mode_critique",model:o,system:Mqm,skipSystemPromptPrefix:!0,max_tokens:4096,messages:[{role:"user",content:`Here is the full classifier system prompt that the auto mode classifier receives:

<classifier_system_prompt>
`+i+`
</classifier_system_prompt>

Here are the user's custom rules (each section header notes whether they replace or extend the defaults):

`+a+`
Please critique these custom rules.`}]})).content.find((d)=>d.type==="text");l=u?.type==="text"?u.text:"No critique was generated. Please try again."}catch(c){return Oe("cli_auto_mode_critique","cli_auto_mode_critique_query_failed"),e.unmount(),Fs("Failed to analyze rules: "+Se(c))}Ie("cli_auto_mode_critique"),e.render(lOe.default.createElement(dy,null,lOe.default.createElement(Text,null,l))),await e.waitUntilExit()}
function TZn(e){return(e??[]).some((t)=>t!==Vlt)}
function SZn(e,t,n){let r=t.filter((a)=>a!==Vlt);if(r.length===0)return"";let o=t.length!==r.length,s=r.map((a)=>"- "+a).join(`
`),i=n.map((a)=>"- "+a).join(`
`);return"## "+e+(o?` (custom rules added alongside the defaults)
`:` (custom rules replacing defaults)
`)+`Custom:
`+s+`

`+(o?`Defaults also in effect:
`:`Defaults being replaced:
`)+i+`

`}
var lOe,Mqm=`You are an expert reviewer of auto mode classifier rules for Claude Code.

Claude Code has an "auto mode" that uses an AI classifier to decide whether tool calls should be auto-approved or require user confirmation. Users can write custom rules in four categories:

- **allow**: Actions the classifier should auto-approve
- **soft_deny**: Destructive/irreversible actions the classifier should block unless clear user intent authorizes them
- **hard_deny**: Security-boundary actions the classifier should block unconditionally (user intent does not clear these)
- **environment**: Context about the user's setup that helps the classifier make decisions

Your job is to critique the user's custom rules for clarity, completeness, and potential issues. The classifier is an LLM that reads these rules as part of its system prompt.

For each rule, evaluate:
1. **Clarity**: Is the rule unambiguous? Could the classifier misinterpret it?
2. **Completeness**: Are there gaps or edge cases the rule doesn't cover?
3. **Conflicts**: Do any of the rules conflict with each other?
4. **Actionability**: Is the rule specific enough for the classifier to act on?

Be concise and constructive. Only comment on rules that could be improved. If all rules look good, say so.`;
var EZn=b(()=>{ze();ln();bt();Mo();eIe();yr();ZHe();Xt();_He();qU();lOe=M(Te(),1)});
export {bZn,qcc,autoModeDefaultsHandler,autoModeConfigHandler,autoModeCritiqueHandler,TZn,SZn,lOe,Mqm,EZn};
