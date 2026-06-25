// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {Lk} from "../src/config/2259_R9r.ts";
var Kkn={};
ft(Kkn,{SEND_USER_FILE_TOOL_PROMPT:()=>SEND_USER_FILE_TOOL_PROMPT,SEND_USER_FILE_TOOL_NAME:()=>SEND_USER_FILE_TOOL_NAME,DESCRIPTION:()=>WVr});
var SEND_USER_FILE_TOOL_NAME="SendUserFile",WVr="Send one or more files to the user",SEND_USER_FILE_TOOL_PROMPT=`Send files to the user. Use this when the file *is* the deliverable \u2014 a generated diagram, a report, a screenshot, a built artifact \u2014 and you want it surfaced, not just mentioned. Paths can be absolute or relative to the current working directory.

Add a \`caption\` when a one-liner of context helps ("the failing case is row 42", "before vs after"). Skip it if the file speaks for itself.

Set \`status\` on every call. Use \`proactive\` when you're initiating \u2014 the user is away and you want this to reach their phone (build artifact ready, report generated). Use \`normal\` when replying to something the user just said.

Files must already exist on the local filesystem \u2014 the tool sends files, it doesn't fetch URLs or render content. When unsure of a path, verify with ls first; absolute paths avoid ambiguity about the working directory.

Example: SendUserFile({ files: ["report.md"], caption: "Here's the report.", status: "normal" })`;
var lW="TaskOutput";
var Vz="EnterPlanMode";
var Zp="AskUserQuestion",s3i=12,i3i="Asks the user multiple choice questions to gather information, clarify ambiguity, understand preferences, make decisions or offer them choices.",a3i,VVr,l3i=`
Reserve this for decisions where the user's answer changes what you do next \u2014 not for choices with a conventional default or facts you can verify in the codebase yourself. In those cases pick the obvious option, mention it in your response, and proceed.
`;
var d1=b(()=>{a3i={markdown:`
Preview feature:
Use the optional \`preview\` field on options when presenting concrete artifacts that users need to visually compare:
- ASCII mockups of UI layouts or components
- Code snippets showing different implementations
- Diagram variations
- Configuration examples

Preview content is rendered as markdown in a monospace box. Multi-line text with newlines is supported. When any option has a preview, the UI switches to a side-by-side layout with a vertical option list on the left and preview on the right. Do not use previews for simple preference questions where labels and descriptions suffice. Note: previews are only supported for single-select questions (not multiSelect).
`,html:`
Preview feature:
Use the optional \`preview\` field on options when presenting concrete artifacts that users need to visually compare:
- HTML mockups of UI layouts or components
- Formatted code snippets showing different implementations
- Visual comparisons or diagrams

Preview content must be a self-contained HTML fragment (no <html>/<body> wrapper, no <script> or <style> tags \u2014 use inline style attributes instead). Do not use previews for simple preference questions where labels and descriptions suffice. Note: previews are only supported for single-select questions (not multiSelect).
`},VVr=`Use this tool only when you are blocked on a decision that is genuinely the user's to make: one you cannot resolve from the request, the code, or sensible defaults.

Usage notes:
- Users will always be able to select "Other" to provide custom text input
- Use multiSelect: true to allow multiple answers to be selected for a question
- If you recommend a specific option, make that the first option in the list and add "(Recommended)" at the end of the label

Plan mode note: To switch into plan mode, use ${Vz} (not this tool). Once in plan mode, use this tool to clarify requirements or choose between approaches BEFORE finalizing your plan. Do NOT use this tool to ask "Is my plan ready?", "Should I proceed?", or otherwise reference "the plan" in questions \u2014 the user cannot see the plan until you call ${Lk} for approval.
`});
export {Kkn,SEND_USER_FILE_TOOL_NAME,WVr,SEND_USER_FILE_TOOL_PROMPT,lW,Vz,Zp,s3i,i3i,a3i,VVr,l3i,d1};
