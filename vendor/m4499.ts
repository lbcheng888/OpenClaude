// @ts-nocheck
import {qdt,gqn,AXa} from "../src/config/4357_commit.ts";
import {nY,Dot} from "./m3250.ts";
import {Su,oA} from "../src/config/2697_oA.ts";
import {b} from "../runtime.ts";
import {Go} from "./m632.ts";
import {Ba,getDefaultBranch} from "./m693.ts";
import {Pdt,I_e} from "./m4327.ts";
import {P6e} from "./m4355.ts";
import {yio} from "./m3923.ts";
function Msl(e,t,n){let{commit:r,pr:o}=qdt(),s=nY(r),i=nY(n??o),a=Nsl(process.env.SAFEUSER||""),l=Nsl(process.env.USER||""),c="",u="",d="",p="",m=`

5. After creating/updating the PR, check if the user's CLAUDE.md mentions posting to Slack channels. If it does, use ToolSearch to search for "slack send message" tools. If ToolSearch finds a Slack tool, ask the user if they'd like you to post the PR URL to the relevant Slack channel. Only post if the user confirms. If ToolSearch returns no results or errors, skip this step silently\u2014do not mention the failure, do not attempt workarounds, and do not try alternative approaches.`;return`${c}## Context

- \`SAFEUSER\`: ${a}
- \`whoami\`: ${l}
- \`git status\`: !\`git status\`
- \`git diff HEAD\`: !\`git diff HEAD\`
- \`git branch --show-current\`: !\`git branch --show-current\`
- \`git diff ${e}...HEAD\`: !\`git diff ${e}...HEAD\`
- \`gh pr view --json number\`: !\`${Su()?"gh pr view --json number 2>/dev/null || true":'gh pr view --json number 2>$null; if (-not $?) { "" }'}\`

## Git Safety Protocol

- NEVER update the git config
- NEVER run destructive/irreversible git commands (like push --force, hard reset, etc) unless the user explicitly requests them
- NEVER skip hooks (--no-verify, --no-gpg-sign, etc) unless the user explicitly requests it
- NEVER run force push to main/master, warn the user if they request it
- Do not commit files that likely contain secrets (.env, credentials.json, etc)
- Never use git commands with the -i flag (like git rebase -i or git add -i) since they require interactive input which is not supported

## Your task

Analyze all changes that will be included in the pull request, making sure to look at all relevant commits (NOT just the latest commit, but ALL commits that will be included in the pull request from the git diff ${e}...HEAD output above).

Based on the above changes:
1. Create a new branch if on ${e} (use SAFEUSER from context above for the branch name prefix, falling back to whoami if SAFEUSER is empty, e.g., \`username/feature-name\`)
2. Create a single commit with an appropriate message${s?", ending with the attribution text shown in the example below":""}:
${Su()?`\`\`\`
git commit -m "$(cat <<'EOF'
Commit message here.${s?`

${s}`:""}
EOF
)"
\`\`\``:`\`\`\`
git commit -m @'
Commit message here.${s?`

${s}`:""}
'@
\`\`\`
The closing \`'@\` MUST be at column 0 with no leading whitespace.`}
3. Push the branch to origin
4. If a PR already exists for this branch (check the gh pr view output above), update the PR title and body using \`gh pr edit\` to reflect the current diff${d}. Otherwise, create a pull request using \`gh pr create\` with the multi-line body syntax shown below${u}.
   - IMPORTANT: Keep PR titles short (under 70 characters). Use the body for details.
${Su()?`\`\`\`
gh pr create --title "Short, descriptive title" --body "$(cat <<'EOF'
## Summary
<1-3 bullet points>

## Test plan
[Bulleted markdown checklist of TODOs for testing the pull request...]${p}${i?`

${i}`:""}
EOF
)"
\`\`\``:`\`\`\`
gh pr create --title "Short, descriptive title" --body @'
## Summary
<1-3 bullet points>

## Test plan
[Bulleted markdown checklist of TODOs for testing the pull request...]${p}${i?`

${i}`:""}
'@
\`\`\``}

You have the capability to call multiple tools in a single response. You MUST do all of the above in a single message.${m}

Return the PR URL when you're done, so the user can see it.`}
function Nsl(e){return e.replace(/[^a-zA-Z0-9._-]/g,"")}
var r8p,Lsl,o8p,Bsl;
var Fsl=b(()=>{gqn();Go();Ba();Pdt();Dot();oA();P6e();r8p=["git checkout -b *","git add *","git status *","git push *","git commit *","gh pr create *","gh pr edit *","gh pr view *","gh pr merge *"],Lsl=[...r8p.flatMap((e)=>[`Bash(${e})`,`PowerShell(${e})`]),"ToolSearch","mcp__slack__send_message","mcp__claude_ai_Slack__slack_send_message"];o8p={type:"prompt",name:yio,description:"Commit, push, and open a PR",allowedTools:Lsl,get contentLength(){return Msl("main",!1).length},progressMessage:"creating commit and PR",source:"builtin",async getPromptForCommand(e,t){let[n,r]=await Promise.all([getDefaultBranch(),AXa(t.getAppState)]),o=!1,s=Msl(nY(n),o,r),i=e?.trim();if(i)s+=`

## Additional instructions from user

${nY(i)}`;return[{type:"text",text:await I_e(s,{...t,getAppState(){let l=t.getAppState();return{...l,toolPermissionContext:{...l.toolPermissionContext,alwaysAllowRules:{...l.toolPermissionContext.alwaysAllowRules,command:Lsl}}}}},`/${yio}`)}]}},Bsl=o8p});
export {Msl,Nsl,r8p,Lsl,o8p,Bsl,Fsl};
