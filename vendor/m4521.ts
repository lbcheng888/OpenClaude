// @ts-nocheck
import {i8e,L6t,Jrl} from "../src/config/4379_commit.ts";
import {PW,_3e} from "./m3266.ts";
import {Yc,Zm} from "../src/config/2709_Zm.ts";
import {b} from "../runtime.ts";
import {Po} from "./m638.ts";
import {ia,getDefaultBranch} from "./m698.ts";
import {Q5e,Uce} from "./m4347.ts";
import {gDe} from "./m4377.ts";
import {epo} from "./m3990.ts";
function Rpl(e,t,n){let{commit:r,pr:o}=i8e(),s=PW(r),i=PW(n??o),a=vpl(process.env.SAFEUSER||""),l=vpl(process.env.USER||""),c="",u="",d="",p="",m=`

5. After creating/updating the PR, check if the user's CLAUDE.md mentions posting to Slack channels. If it does, use ToolSearch to search for "slack send message" tools. If ToolSearch finds a Slack tool, ask the user if they'd like you to post the PR URL to the relevant Slack channel. Only post if the user confirms. If ToolSearch returns no results or errors, skip this step silently\u2014do not mention the failure, do not attempt workarounds, and do not try alternative approaches.`;return`${c}## Context

- \`SAFEUSER\`: ${a}
- \`whoami\`: ${l}
- \`git status\`: !\`git status\`
- \`git diff HEAD\`: !\`git diff HEAD\`
- \`git branch --show-current\`: !\`git branch --show-current\`
- \`git diff ${e}...HEAD\`: !\`git diff ${e}...HEAD\`
- \`gh pr view --json number\`: !\`${Yc()?"gh pr view --json number 2>/dev/null || true":'gh pr view --json number 2>$null; if (-not $?) { "" }'}\`

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
${Yc()?`\`\`\`
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
${Yc()?`\`\`\`
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
function vpl(e){return e.replace(/[^a-zA-Z0-9._-]/g,"")}
var UYp,Apl,$Yp,wpl;
var kpl=b(()=>{L6t();Po();ia();Q5e();_3e();Zm();gDe();UYp=["git checkout -b *","git add *","git status *","git push *","git commit *","gh pr create *","gh pr edit *","gh pr view *","gh pr merge *"],Apl=[...UYp.flatMap((e)=>[`Bash(${e})`,`PowerShell(${e})`]),"ToolSearch","mcp__slack__send_message","mcp__claude_ai_Slack__slack_send_message"];$Yp={type:"prompt",name:epo,description:"Commit, push, and open a PR",allowedTools:Apl,get contentLength(){return Rpl("main",!1).length},progressMessage:"creating commit and PR",source:"builtin",async getPromptForCommand(e,t){let[n,r]=await Promise.all([getDefaultBranch(),Jrl(t.getAppState)]),o=!1,s=Rpl(PW(n),o,r),i=e?.trim();if(i)s+=`

## Additional instructions from user

${PW(i)}`;return[{type:"text",text:await Uce(s,{...t,getAppState(){let l=t.getAppState();return{...l,toolPermissionContext:{...l.toolPermissionContext,alwaysAllowRules:{...l.toolPermissionContext.alwaysAllowRules,command:Apl}}}}},`/${epo}`)}]}},wpl=$Yp});
export {Rpl,vpl,UYp,Apl,$Yp,wpl,kpl};
