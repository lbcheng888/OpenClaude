// @ts-nocheck
import {b} from "../runtime.ts";
import {nIe,wte,G4e,jW} from "../src/config/3923_maxFiles.ts";
import {ZSl,QSl} from "../src/tui/4843_call.ts";
var com="https://code.claude.com/docs/en/claude-code-on-the-web",uom=(e)=>`
      You are an expert code reviewer. Follow these steps:

      1. If no PR number is provided in the args, run \`gh pr list\` to show open PRs
      2. If a PR number is provided, run \`gh pr view <number> --json title,body,author,baseRefName,headRefName,state,additions,deletions,changedFiles,labels\` to get PR details
      3. Run \`gh pr diff <number>\` to get the diff
      4. Analyze the changes and provide a thorough code review that includes:
         - Overview of what the PR does
         - Analysis of code quality and style
         - Specific suggestions for improvements
         - Any potential issues or risks

      Keep your review concise but thorough. Focus on:
      - Code correctness
      - Following project conventions
      - Performance implications
      - Test coverage
      - Security considerations

      Format your review with clear sections and bullet points.

      PR number: ${e}
    `,dom,ebl,UGn;
var KCo=b(()=>{nIe();dom={type:"prompt",name:"review",description:"Review a pull request",progressMessage:"reviewing pull request",contentLength:0,source:"builtin",async getPromptForCommand(e){return[{type:"text",text:uom(e)}]}},ebl={type:"local-jsx",name:"ultrareview",get description(){return`Start a cloud agent that finds and verifies bugs in your branch (${wte()}, ${G4e()} USD) \xB7 Runs in Claude Code on the web. See ${com}`},isEnabled:()=>jW(),load:()=>Promise.resolve().then(() => (ZSl(),QSl))},UGn=dom});
export {com,uom,dom,ebl,UGn,KCo};
