// @ts-nocheck
import {N5n,F5n} from "../src/agent/4319_F5n.ts";
import {b} from "../runtime.ts";
import {uxe,Rte,A6e,fG} from "../src/config/3990_maxFiles.ts";
import {iIl,oIl} from "../src/telemetry/4875_call.ts";
var Emm="https://code.claude.com/docs/en/claude-code-on-the-web",Cmm="Run `gh pr list` to show the open pull requests, then ask the user which one to review (`/review <number>`).",Amm=(e,t)=>`Review target: GitHub pull request \`${e}\`.

Gather this target's diff with (instead of any local \`git diff\`):
1. \`gh pr view ${e} --json title,body,author,baseRefName,headRefName,state,additions,deletions,changedFiles,labels\` for context
2. \`gh pr diff ${e}\` for the unified diff

The PR's diff is the only review scope \u2014 local working-tree changes are out of scope. When an angle needs surrounding code, Read the files in this checkout if it matches the PR's branch, otherwise fetch file contents via \`gh\`.
${t?`
Additional instructions from the user: ${t}
`:""}
${N5n}
## Present the review

After the final phase, do not reply with the raw JSON findings array. Present a readable review: a 2-3 sentence overview of what the PR does, then the surviving findings most-severe first as \`file:line \u2014 summary (failure scenario)\`, or a note that nothing survived verification.`,Rmm,aIl,Hjn;
var pIo=b(()=>{F5n();uxe();Rmm={type:"prompt",name:"review",description:"Review a GitHub pull request; for your working diff use /code-review",argumentHint:"[pr number]",effort:"medium",progressMessage:"reviewing pull request",contentLength:0,source:"builtin",async getPromptForCommand(e){let[t="",...n]=e.trim().split(/\s+/),r=t.replaceAll("`","").replace(/^#/,"");return[{type:"text",text:r?Amm(r,n.join(" ")):Cmm}]}},aIl={type:"local-jsx",name:"ultrareview",get description(){return`Start a cloud agent that finds and verifies bugs in your branch (${Rte()}, ${A6e()} USD) \xB7 Runs in Claude Code on the web. See ${Emm}`},isEnabled:()=>fG(),load:()=>Promise.resolve().then(() => (iIl(),oIl))},Hjn=Rmm});
export {Emm,Cmm,Amm,Rmm,aIl,Hjn,pIo};
