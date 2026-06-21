// @ts-nocheck
import {Gn,sc} from "./m2455.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function tGa(){return`Exit a worktree session created by EnterWorktree and return the session to the original working directory.

## Scope

This tool ONLY operates on worktrees created by EnterWorktree in this session. It will NOT touch:
- Worktrees you created manually with \`git worktree add\`
- Worktrees from a previous session (even if created by EnterWorktree then)
- The directory you're in if EnterWorktree was never called

If called outside an EnterWorktree session, the tool is a **no-op**: it reports that no worktree session is active and takes no action. Filesystem state is unchanged.

## When to Use

- The user explicitly asks to "exit the worktree", "leave the worktree", "go back", or otherwise end the worktree session
- Do NOT call this proactively \u2014 only when the user asks

## Parameters

- \`action\` (required): \`"keep"\` or \`"remove"\`
  - \`"keep"\` \u2014 leave the worktree directory and branch intact on disk. Use this if the user wants to come back to the work later, or if there are changes to preserve.
  - \`"remove"\` \u2014 delete the worktree directory and its branch. Use this for a clean exit when the work is done or abandoned.
- \`discard_changes\` (optional, default false): only meaningful with \`action: "remove"\`. If the worktree has uncommitted files or commits not on the original branch, the tool will REFUSE to remove it unless this is set to \`true\`. If the tool returns an error listing changes, confirm with the user before re-invoking with \`discard_changes: true\`.

## Behavior

- Restores the session's working directory to where it was before EnterWorktree
- Clears CWD-dependent caches (system prompt sections, memory files, plans directory) so the session state reflects the original directory
- If a tmux session was attached to the worktree: killed on \`remove\`, left running on \`keep\` (its name is returned so the user can reattach)
- Once exited, EnterWorktree can be called again to create a fresh worktree
`}
function nGa(e){return""}
function rGa(e,t,n){let r=e.action==="keep"?"Kept worktree":"Removed worktree";return CU.createElement(Gn,null,CU.createElement(Box,{flexDirection:"column"},CU.createElement(Text,null,r,e.worktreeBranch?CU.createElement(CU.Fragment,null," ","(branch ",CU.createElement(Text,{bold:!0},e.worktreeBranch),")"):null),CU.createElement(Text,{dimColor:!0},"Returned to ",e.originalCwd)))}
var CU;
var oGa=b(()=>{sc();ze();CU=M(Te(),1)});
export {tGa,nGa,rGa,CU,oGa};
