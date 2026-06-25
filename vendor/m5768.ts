// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {py,i0e} from "./m3768.ts";
import {Text} from "./m2433.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {k9n,t9a,n9a,sdt,gye} from "../src/permissions/3986_editRemovalVisibility.ts";
import {getAutoModeConfig,br} from "../src/config/0745_updateSettingsForSource.ts";
import {parseUserSpecifiedModel,getMainLoopModel,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {Wq,cxe} from "../src/api/3982_model.ts";
import {Rs,_N} from "./m5161.ts";
import {Ce,Ct} from "./m197.ts";
import {je} from "./m2462.ts";
import {oe} from "./m2275.ts";
var $rr={};
ft($rr,{autoModeDefaultsHandler:()=>autoModeDefaultsHandler,autoModeCritiqueHandler:()=>autoModeCritiqueHandler,autoModeConfigHandler:()=>autoModeConfigHandler});
async function JTc(e,t){e.render(tbe.jsx(py,{children:tbe.jsx(Text,{children:TeamDeleteToolName(t,null,2)})})),await e.waitUntilExit()}
async function autoModeDefaultsHandler(e){He("cli_auto_mode_defaults"),await JTc(e,k9n())}
async function autoModeConfigHandler(e){He("cli_auto_mode_config"),await JTc(e,t9a(getAutoModeConfig()))}
async function autoModeCritiqueHandler(e,t){let n=getAutoModeConfig();if(!(Brr(n?.allow)||Brr(n?.soft_deny)||Brr(n?.hard_deny)||Brr(n?.environment))){e.render(tbe.jsx(py,{children:tbe.jsx(Text,{children:`No custom auto mode rules found.

Add rules to your settings file under autoMode.{allow, soft_deny, hard_deny, environment}.
Run \`claude auto-mode defaults\` to see the default rules for reference.`})})),await e.waitUntilExit();return}let o=t.model?parseUserSpecifiedModel(t.model):getMainLoopModel(),s=k9n(),i=n9a(),a=Urr("allow",n?.allow??[],s.allow)+Urr("soft_deny",n?.soft_deny??[],s.soft_deny)+Urr("hard_deny",n?.hard_deny??[],s.hard_deny)+Urr("environment",n?.environment??[],s.environment);e.render(tbe.jsxs(Text,{children:["Analyzing your auto mode rules\u2026",`

`]}));let l;try{let u=(await Wq({querySource:"auto_mode_critique",model:o,system:WJm,skipSystemPromptPrefix:!0,max_tokens:4096,messages:[{role:"user",content:`Here is the full classifier system prompt that the auto mode classifier receives:

<classifier_system_prompt>
`+i+`
</classifier_system_prompt>

Here are the user's custom rules (each section header notes whether they replace or extend the defaults):

`+a+`
Please critique these custom rules.`}]})).content.find((d)=>d.type==="text");l=u?.type==="text"?u.text:"No critique was generated. Please try again."}catch(c){return xe("cli_auto_mode_critique","cli_auto_mode_critique_query_failed"),e.unmount(),Rs("Failed to analyze rules: "+Ce(c))}He("cli_auto_mode_critique"),e.render(tbe.jsx(py,{children:tbe.jsx(Text,{children:l})})),await e.waitUntilExit()}
function Brr(e){return(e??[]).some((t)=>t!==sdt)}
function Urr(e,t,n){let r=t.filter((a)=>a!==sdt);if(r.length===0)return"";let o=t.length!==r.length,s=r.map((a)=>"- "+a).join(`
`),i=n.map((a)=>"- "+a).join(`
`);return"## "+e+(o?` (custom rules added alongside the defaults)
`:` (custom rules replacing defaults)
`)+`Custom:
`+s+`

`+(o?`Defaults also in effect:
`:`Defaults being replaced:
`)+i+`

`}
var tbe,WJm=`You are an expert reviewer of auto mode classifier rules for Claude Code.

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
var qrr=b(()=>{je();mn();Ct();Ro();gye();br();cxe();tn();i0e();_N();tbe=x(oe(),1)});
export {$rr,JTc,autoModeDefaultsHandler,autoModeConfigHandler,autoModeCritiqueHandler,Brr,Urr,tbe,WJm,qrr};
