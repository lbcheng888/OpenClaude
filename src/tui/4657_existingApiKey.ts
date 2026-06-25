// @ts-nocheck
import {_r,ui} from "../../vendor/m2463.ts";
import {useTheme as ji} from "../../vendor/m2285.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {qE,BG} from "../../vendor/m4563.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {color as wo} from "../../vendor/m2431.ts";
import {ga,rh} from "../../vendor/m2550.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
var addGithubWorkflowLabel = "Add Claude Code GitHub Workflow",
  githubActionSetupDocsUrl = "https://github.com/anthropics/claude-code-action/blob/main/docs/setup.md",
  claudeWorkflowYaml = `name: Claude Code

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]
  pull_request_review:
    types: [submitted]

jobs:
  claude:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review' && contains(github.event.review.body, '@claude')) ||
      (github.event_name == 'issues' && (contains(github.event.issue.body, '@claude') || contains(github.event.issue.title, '@claude')))
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write
      actions: read # Required for Claude to read CI results on PRs
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - name: Run Claude Code
        id: claude
        uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}

          # This is an optional setting that allows Claude to read CI results on PRs
          additional_permissions: |
            actions: read

          # Optional: Give a custom prompt to Claude. If this is not specified, Claude will perform the instructions specified in the comment that tagged it.
          # prompt: 'Update the pull request description to include a summary of changes.'

          # Optional: Add claude_args to customize behavior and configuration
          # See https://github.com/anthropics/claude-code-action/blob/main/docs/usage.md
          # or https://code.claude.com/docs/en/cli-reference for available options
          # claude_args: '--allowed-tools Bash(gh pr *)'

`,
  installPrBody = `## \uD83E\uDD16 Installing Claude Code GitHub App

This PR adds a GitHub Actions workflow that enables Claude Code integration in our repository.

### What is Claude Code?

[Claude Code](https://claude.com/claude-code) is an AI coding agent that can help with:
- Bug fixes and improvements  
- Documentation updates
- Implementing new features
- Code reviews and suggestions
- Writing tests
- And more!

### How it works

Once this PR is merged, we'll be able to interact with Claude by mentioning @claude in a pull request or issue comment.
Once the workflow is triggered, Claude will analyze the comment and surrounding context, and execute on the request in a GitHub action.

### Important Notes

- **This workflow won't take effect until this PR is merged**
- **@claude mentions won't work until after the merge is complete**
- The workflow runs automatically whenever Claude is mentioned in PR or issue comments
- Claude gets access to the entire PR or issue context including files, diffs, and previous comments

### Security

- Our Anthropic API key is securely stored as a GitHub Actions secret
- Only users with write access to the repository can trigger the workflow
- All Claude runs are stored in the GitHub Actions run history
- Claude's default tools are limited to reading/writing files and interacting with our repo by creating comments, branches, and commits.
- We can add more allowed tools by adding them to the workflow file like:

\`\`\`
allowed_tools: Bash(npm install),Bash(npm run build),Bash(npm run lint),Bash(npm run test)
\`\`\`

There's more information in the [Claude Code action repo](https://github.com/anthropics/claude-code-action).

After merging this PR, let's try mentioning @claude in a comment on any PR to get started!`,
  claudeReviewWorkflowYaml = `name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize, ready_for_review, reopened]
    # Optional: Only run on specific file changes
    # paths:
    #   - "src/**/*.ts"
    #   - "src/**/*.tsx"
    #   - "src/**/*.js"
    #   - "src/**/*.jsx"

jobs:
  claude-review:
    # Optional: Filter by PR author
    # if: |
    #   github.event.pull_request.user.login == 'external-contributor' ||
    #   github.event.pull_request.user.login == 'new-developer' ||
    #   github.event.pull_request.author_association == 'FIRST_TIME_CONTRIBUTOR'

    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - name: Run Claude Code Review
        id: claude-review
        uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}
          plugin_marketplaces: 'https://github.com/anthropics/claude-code.git'
          plugins: 'code-review@claude-code-plugins'
          prompt: '/code-review:code-review \${{ github.repository }}/pull/\${{ github.event.pull_request.number }}'
          # See https://github.com/anthropics/claude-code-action/blob/main/docs/usage.md
          # or https://code.claude.com/docs/en/cli-reference for available options

`;
function ApiKeySelectionScreen(props) {
  let memoCache = reactCompilerRuntime.c(55),
    {
      existingApiKey: existingApiKey,
      apiKeyOrOAuthToken: apiKeyOrOAuthToken,
      onApiKeyChange: onApiKeyChange,
      onSubmit: onSubmit,
      onToggleUseExistingKey: onToggleUseExistingKey,
      onCreateOAuthToken: onCreateOAuthToken,
      selectedOption: selectedOption,
      onSelectOption: onSelectOption
    } = props,
    selected = selectedOption === undefined ? existingApiKey ? "existing" : onCreateOAuthToken ? "oauth" : "new" : selectedOption,
    [cursorOffset, setCursorOffset] = React.useState(0),
    terminalSize = _r(),
    [theme] = ji(),
    handleSelectPrevious;
  if (memoCache[0] !== existingApiKey || memoCache[1] !== onCreateOAuthToken || memoCache[2] !== onSelectOption || memoCache[3] !== onToggleUseExistingKey || memoCache[4] !== selected) handleSelectPrevious = () => {
    if (selected === "new" && onCreateOAuthToken) onSelectOption("oauth");else if (selected === "oauth" && existingApiKey) onSelectOption("existing"), onToggleUseExistingKey(true);
  }, memoCache[0] = existingApiKey, memoCache[1] = onCreateOAuthToken, memoCache[2] = onSelectOption, memoCache[3] = onToggleUseExistingKey, memoCache[4] = selected, memoCache[5] = handleSelectPrevious;else handleSelectPrevious = memoCache[5];
  let selectPrevious = handleSelectPrevious,
    handleSelectNext;
  if (memoCache[6] !== onCreateOAuthToken || memoCache[7] !== onSelectOption || memoCache[8] !== onToggleUseExistingKey || memoCache[9] !== selected) handleSelectNext = () => {
    if (selected === "existing") onSelectOption(onCreateOAuthToken ? "oauth" : "new"), onToggleUseExistingKey(false);else if (selected === "oauth") onSelectOption("new");
  }, memoCache[6] = onCreateOAuthToken, memoCache[7] = onSelectOption, memoCache[8] = onToggleUseExistingKey, memoCache[9] = selected, memoCache[10] = handleSelectNext;else handleSelectNext = memoCache[10];
  let selectNext = handleSelectNext,
    handleConfirm;
  if (memoCache[11] !== onCreateOAuthToken || memoCache[12] !== onSubmit || memoCache[13] !== selected) handleConfirm = () => {
    if (selected === "oauth" && onCreateOAuthToken) onCreateOAuthToken();else onSubmit();
  }, memoCache[11] = onCreateOAuthToken, memoCache[12] = onSubmit, memoCache[13] = selected, memoCache[14] = handleConfirm;else handleConfirm = memoCache[14];
  let confirm = handleConfirm,
    isNewKeySelected = selected === "new",
    confirmBindings;
  if (memoCache[15] !== confirm || memoCache[16] !== selectNext || memoCache[17] !== selectPrevious) confirmBindings = {
    "confirm:previous": selectPrevious,
    "confirm:next": selectNext,
    "confirm:yes": confirm
  }, memoCache[15] = confirm, memoCache[16] = selectNext, memoCache[17] = selectPrevious, memoCache[18] = confirmBindings;else confirmBindings = memoCache[18];
  let confirmKeysActive = !isNewKeySelected,
    confirmOptions;
  if (memoCache[19] !== confirmKeysActive) confirmOptions = {
    context: "Confirmation",
    isActive: confirmKeysActive
  }, memoCache[19] = confirmKeysActive, memoCache[20] = confirmOptions;else confirmOptions = memoCache[20];
  Oo(confirmBindings, confirmOptions);
  let navBindings;
  if (memoCache[21] !== selectNext || memoCache[22] !== selectPrevious) navBindings = {
    "confirm:previous": selectPrevious,
    "confirm:next": selectNext
  }, memoCache[21] = selectNext, memoCache[22] = selectPrevious, memoCache[23] = navBindings;else navBindings = memoCache[23];
  let navOptions;
  if (memoCache[24] !== isNewKeySelected) navOptions = {
    context: "Confirmation",
    isActive: isNewKeySelected
  }, memoCache[24] = isNewKeySelected, memoCache[25] = navOptions;else navOptions = memoCache[25];
  Oo(navBindings, navOptions);
  let header;
  if (memoCache[26] === Symbol.for("react.memo_cache_sentinel")) header = jsxRuntime.jsx($, {
    marginBottom: 1,
    children: jsxRuntime.jsx(qE, {
      subtitle: "Choose API key",
      children: "Install GitHub App"
    })
  }), memoCache[26] = header;else header = memoCache[26];
  let existingOptionRow;
  if (memoCache[27] !== existingApiKey || memoCache[28] !== selected || memoCache[29] !== theme) existingOptionRow = existingApiKey && jsxRuntime.jsx($, {
    marginBottom: 1,
    children: jsxRuntime.jsxs(v, {
      children: [selected === "existing" ? wo("success", theme)("> ") : "  ", "Use your existing Claude Code API key"]
    })
  }), memoCache[27] = existingApiKey, memoCache[28] = selected, memoCache[29] = theme, memoCache[30] = existingOptionRow;else existingOptionRow = memoCache[30];
  let oauthOptionRow;
  if (memoCache[31] !== onCreateOAuthToken || memoCache[32] !== selected || memoCache[33] !== theme) oauthOptionRow = onCreateOAuthToken && jsxRuntime.jsx($, {
    marginBottom: 1,
    children: jsxRuntime.jsxs(v, {
      children: [selected === "oauth" ? wo("success", theme)("> ") : "  ", "Create a long-lived token with your Claude subscription"]
    })
  }), memoCache[31] = onCreateOAuthToken, memoCache[32] = selected, memoCache[33] = theme, memoCache[34] = oauthOptionRow;else oauthOptionRow = memoCache[34];
  let newKeyMarker;
  if (memoCache[35] !== selected || memoCache[36] !== theme) newKeyMarker = selected === "new" ? wo("success", theme)("> ") : "  ", memoCache[35] = selected, memoCache[36] = theme, memoCache[37] = newKeyMarker;else newKeyMarker = memoCache[37];
  let newKeyOptionRow;
  if (memoCache[38] !== newKeyMarker) newKeyOptionRow = jsxRuntime.jsx($, {
    marginBottom: 1,
    children: jsxRuntime.jsxs(v, {
      children: [newKeyMarker, "Enter a new API key"]
    })
  }), memoCache[38] = newKeyMarker, memoCache[39] = newKeyOptionRow;else newKeyOptionRow = memoCache[39];
  let newKeyInput;
  if (memoCache[40] !== apiKeyOrOAuthToken || memoCache[41] !== cursorOffset || memoCache[42] !== onApiKeyChange || memoCache[43] !== onSubmit || memoCache[44] !== selected || memoCache[45] !== terminalSize) newKeyInput = selected === "new" && jsxRuntime.jsx(ga, {
    value: apiKeyOrOAuthToken,
    onChange: onApiKeyChange,
    onSubmit: onSubmit,
    onPaste: onApiKeyChange,
    focus: true,
    placeholder: "sk-ant\u2026 (Create a new key at https://platform.claude.com/settings/keys)",
    mask: "*",
    columns: terminalSize.columns,
    cursorOffset: cursorOffset,
    onChangeCursorOffset: setCursorOffset,
    showCursor: true
  }), memoCache[40] = apiKeyOrOAuthToken, memoCache[41] = cursorOffset, memoCache[42] = onApiKeyChange, memoCache[43] = onSubmit, memoCache[44] = selected, memoCache[45] = terminalSize, memoCache[46] = newKeyInput;else newKeyInput = memoCache[46];
  let optionsBox;
  if (memoCache[47] !== existingOptionRow || memoCache[48] !== oauthOptionRow || memoCache[49] !== newKeyOptionRow || memoCache[50] !== newKeyInput) optionsBox = jsxRuntime.jsxs($, {
    flexDirection: "column",
    borderStyle: "round",
    paddingX: 1,
    children: [header, existingOptionRow, oauthOptionRow, newKeyOptionRow, newKeyInput]
  }), memoCache[47] = existingOptionRow, memoCache[48] = oauthOptionRow, memoCache[49] = newKeyOptionRow, memoCache[50] = newKeyInput, memoCache[51] = optionsBox;else optionsBox = memoCache[51];
  let footerHints;
  if (memoCache[52] === Symbol.for("react.memo_cache_sentinel")) footerHints = jsxRuntime.jsx($, {
    marginLeft: 3,
    children: jsxRuntime.jsx(v, {
      dimColor: true,
      children: jsxRuntime.jsxs(bn, {
        children: [jsxRuntime.jsx(at, {
          chord: ["up", "down"],
          action: "select"
        }), jsxRuntime.jsx(at, {
          chord: "enter",
          action: "continue"
        })]
      })
    })
  }), memoCache[52] = footerHints;else footerHints = memoCache[52];
  let root;
  if (memoCache[53] !== optionsBox) root = jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [optionsBox, footerHints]
  }), memoCache[53] = optionsBox, memoCache[54] = root;else root = memoCache[54];
  return root;
}
var reactCompilerRuntime, React, jsxRuntime;
var moduleInit = b(() => {
  Is();
  BG();
  Wo();
  rh();
  ui();
  je();
  ss();
  reactCompilerRuntime = x(tt(), 1), React = x(et(), 1), jsxRuntime = x(oe(), 1);
});

export {addGithubWorkflowLabel as hTl,githubActionSetupDocsUrl as _ue,claudeWorkflowYaml as gTl,installPrBody as _Tl,claudeReviewWorkflowYaml as yTl,ApiKeySelectionScreen as bTl,reactCompilerRuntime as TTl,React as STl,jsxRuntime as Ex,moduleInit as ETl};
