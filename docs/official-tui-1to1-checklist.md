# Claude Code 官方 TUI 1:1 清单

本清单用于判定当前实现是否达到官方 TUI 和核心工作流 1:1。没有完成全部条目之前，不得宣称 1:1。

## 硬约束

- [x] 不加载 `/Users/lbcheng/claude-code/dist/cli.js`。
- [x] 不 import `/Users/lbcheng/claude-code/src/entrypoints/cli.tsx`。
- [x] 不 spawn 官方 CLI。
- [x] 当前 `dist/index.js` 必须由本项目 TS 入口编译生成。
- [x] `/Users/lbcheng/claude-code` 只能作为参考源，不能作为运行时入口。
- [x] 生产代码不得 Mock、不得伪造 usage/context/job/LSP 状态。
- [x] 所有“兼容官方”的判断必须能用截图、协议日志或测试证明。

## 核心工作流

- [x] 用户输入进入同一条会话历史。
- [x] API streaming 解析 `content_block_start/delta/stop`。
- [x] 保留 stream block `index`，按顺序组装 text 和 tool_use。
- [x] assistant `tool_use` 后必须追加 user `tool_result` 再发起下一次 API。
- [x] 多工具调用按 tool_use 顺序返回 tool_result。
- [x] 权限拒绝必须生成 `is_error` tool_result，不能直接丢弃。
- [x] 重复 tool_use id 必须直接报错。
- [x] 孤立 tool_result 必须直接报错。
- [x] 支持用户中断当前 turn，并正确取消 API 与工具执行。
- [x] 支持工具执行中的 abort signal。
- [x] 支持 Bash `run_in_background` 基础前后台状态，并可用 `BashOutput`/`KillBash` 查询和停止。
- [ ] background shell/task 的官方任务导航、通知、持久化语义一致。
- [x] 支持基础 hook 流程：PreToolUse、PostToolUse、PostToolUseFailure、Notification、Stop。
- [x] 支持基础官方 Hook JSON 输出：PreToolUse `permissionDecision` / `updatedInput` / `additionalContext`、PermissionRequest `decision`。
- [x] 支持基础生命周期 hooks：UserPromptSubmit、SessionStart、StopFailure、PreCompact、PostCompact。
- [ ] 官方 hook 的 prompt/agent/function/session/plugin、once/asyncRewake、完整输出 schema 语义一致。
- [x] 支持官方 project JSONL 路径的基础 session 保存和 `/resume <id>` 历史重建。
- [x] 支持 CLI `--resume <id>` / `--continue` 基础历史恢复。
- [x] `/compact` 保存当前 session checkpoint。
- [ ] session continue/compact 的官方摘要语义一致。
- [x] 支持基础上下文统计，不能出现 `NaN`。

## 启动首屏

- [x] 渲染 LogoV2 风格 Welcome 卡片。
- [x] 渲染 Clawd 图形。
- [x] 渲染 What's new 区域。
- [x] 读取真实模型、effort、settings。
- [x] `--dangerously-skip-permissions` 显示 bypass footer。
- [x] 带命令行 prompt 时，首帧先出现用户消息。
- [ ] 首屏布局在 80/120/137 列终端下与官方截图逐项对齐。
- [ ] release notes/changelog 内容与官方来源完全一致。
- [ ] API Usage Billing、目录路径、模型名、thinking effort 的截断规则完全一致。
- [ ] 首屏从 transcript 滚动历史消失/保留的时机与官方一致。

## Transcript 渲染

- [x] 用户消息用官方式高亮行。
- [x] assistant/tool block 按同一个 tool id 原地更新。
- [x] 不显示内联 `in/out tokens` 调试统计。
- [x] Thinking 不使用 `● Thinking...` 简化行。
- [x] Thinking 使用官方 glyph 序列和 claude 色系。
- [x] assistant 文本支持基础 Markdown 行级渲染。
- [ ] assistant 文本 markdown 渲染与官方完全一致。
- [ ] 代码块、列表、引用、diff、ANSI 文本渲染与官方一致。
- [ ] 系统提醒、错误、警告、permission 提示的颜色/缩进/换行一致。
- [ ] Ratchet/NoSelect 行为一致，复制文本时不带 gutter。
- [ ] 窄屏换行、宽屏截断、滚动历史裁剪与官方一致。
- [x] Ctrl+O 可展开工具输出。
- [ ] Ctrl+O 展开视图的完整交互与官方一致。

## 输入区

- [x] 支持多行输入。
- [x] 支持光标、placeholder、Enter 发送、Shift+Enter 换行。
- [x] 支持左右方向键、Home/End。
- [ ] 多行输入编辑器的完整视觉与官方一致。
- [x] 支持 Option/Alt 左右单词移动。
- [x] 支持历史输入上下切换。
- [x] 支持粘贴多行内容进入输入缓冲。
- [x] 支持内置和自定义 slash command 的唯一匹配 Tab 补全。
- [x] `/` slash command 有基础补全面板和 Tab 唯一匹配补全。
- [ ] `/` slash command 补全面板的颜色、排序、分组与官方完全一致。
- [x] `?` shortcuts 帮助入口可用。
- [x] 支持 Shift+Tab 权限模式切换。
- [ ] Shift+Tab 权限模式切换顺序和文案与官方完全一致。
- [ ] Vim/normal mode 如果官方当前版本启用，行为必须一致；未启用则不能伪造。

## Spinner 与状态

- [x] Thinking spinner glyph footprint 已替换简化态。
- [ ] requesting/responding/thinking/tool-use 四种 spinner mode 完整一致。
- [ ] glimmer message、随机 verb、thinking status、duration 展示一致。
- [ ] token/timer 展示阈值一致。
- [ ] stalled 状态颜色变化一致。
- [ ] teammate/task spinner tree 一致。
- [ ] reduced motion 设置一致。

## 工具调用 UI

- [x] 工具行显示 `⏺`、工具名、括号参数。
- [x] 未完成工具显示 `Running…`。
- [x] 完成/失败工具用成功/错误颜色更新。
- [x] Bash 输出默认折叠，不再整屏 raw dump。
- [x] Read 结果只显示 `Read N lines`，不直接 dump 文件内容。
- [x] Search/Glob/Grep 结果显示 Found 摘要。
- [x] Write/Edit 结果显示单行摘要。
- [x] Bash stdout/stderr 分离渲染。
- [x] Bash cwd reset warning 渲染。
- [x] Bash `timeout` 会真实中断并返回错误结果。
- [ ] Bash progress、timeout UI 展示一致。
- [x] Bash 输出支持基础 JSON 格式化、ANSI 下划线剥离、image data 摘要。
- [ ] Bash URL linkify、ANSI 全量处理一致。
- [x] Read 图片、PDF、notebook、empty、too large 状态有专门结果，不再 raw dump。
- [ ] Read unchanged 状态和官方 system-reminder 完全一致。
- [x] Write/Edit/MultiEdit 支持基础 diff display，Ctrl+O 可展开。
- [ ] Edit/MultiEdit diff 展示与失败错误完全一致。
- [x] LS、TodoWrite、MultiEdit、WebFetch 有基础 renderer。
- [ ] Task、WebSearch、NotebookEdit 等官方工具 renderer 完整接入。
- [ ] MCP 工具名、server tag、permission 文案一致。
- [ ] unknown tool error 与官方 fallback 一致。
- [ ] verbose/non-verbose 渲染差异一致。

## 工具执行语义

- [x] Bash 改为异步执行，避免阻塞 TUI。
- [x] Bash 使用 `/bin/bash` shell。
- [x] Read offset 按官方 1-based 语义。
- [x] Glob 支持基础 `*`、`?`、`**` 匹配。
- [x] Grep 支持 include 文件名匹配。
- [x] Bash 跨调用保持 cwd。
- [x] Bash 跨调用保持 exported env。
- [x] Bash 退出码、stdout/stderr 分离进入 display state。
- [ ] Bash 使用官方完整持久 shell/session 语义。
- [x] Bash 支持基础 `timeout` 和 `run_in_background` 语义。
- [ ] Bash 最大输出、自动后台化、任务导航语义一致。
- [x] Grep 使用 ripgrep 执行，支持 include glob 和 head_limit。
- [x] Grep 支持基础 hidden、case_insensitive、output_mode。
- [ ] Grep hidden、case、output mode 与官方完全一致。
- [x] Glob 支持基础 hidden 和 ignore。
- [ ] Glob 排序、ignore、hidden、path 语义一致。
- [x] Read 有基础文件大小限制。
- [ ] Read 使用官方 token 限制和 system-reminder。
- [x] MultiEdit 支持顺序编辑和失败即停。
- [ ] Write/Edit/MultiEdit 的完整权限、校验、换行、并发安全语义一致。
- [ ] 文件权限 matcher 与官方一致。

## 权限系统

- [x] bypass permissions mode 能进入工具执行。
- [x] ask/allow/deny 基础路径存在。
- [x] deny 返回 `is_error` tool_result。
- [x] permission prompt 使用工具摘要和 `Y/N` 基础决策。
- [ ] permission prompt UI 与官方完全一致。
- [x] Esc 拒绝、`A` allow 并记住本 session 基础行为可用。
- [ ] permission prompt UI 与 remember choice 文案/持久化和官方完全一致。
- [ ] tool-specific permission matcher 与官方完全一致。
- [x] PermissionRequest hook 可在交互弹窗前 allow/deny。
- [x] 读取 `~/.claude/settings.json` 的 `permissions.allow/deny/defaultMode`。
- [x] settings allow/deny 支持基础 tool-specific matcher：`Bash(pattern)`、`Read(path)` 等。
- [x] settings allow/deny 支持 escaped parentheses、旧工具名别名、Bash `cmd:*` 基础匹配。
- [x] `dontAsk` 模式未预批准直接拒绝，不再弹窗。
- [ ] settings allow/deny matcher 与官方完全一致。
- [ ] MCP permissions 一致。
- [ ] dangerous mode 文案与颜色完全一致。

## Slash Commands

- [x] `/help`
- [x] `/init`
- [x] `/model` 基础状态显示
- [x] `/mcp` 基础占位提示
- [x] `/permissions` 基础状态显示
- [x] `/release-notes` 基础提示
- [x] `/feedback`
- [x] `/clear`
- [x] `/compact` 基础占位提示
- [x] `/resume` 可列出并恢复基础 session history
- [x] `/cost` 基础占位提示
- [x] `/doctor`
- [ ] `/login` / auth 相关命令
- [x] 自定义 slash commands 从项目/用户 `.claude/commands/*.md` 加载并执行。

## 设置与状态

- [x] 读取 `~/.claude/settings.json` 的基础 env/settings。
- [x] settings 支持 user/project/local/--settings/managed file/drop-in 基础来源链。
- [ ] settings 层级合并规则与官方完全一致。
- [x] user/project/local settings 基础优先级一致。
- [ ] settings 的 remote policy/plugin/session 来源优先级一致。
- [ ] model/effort 配置来源一致。
- [ ] changelog cache 读取与官方一致。
- [x] 基础 session store 可保存/恢复 API history。
- [x] session store 使用 `~/.claude/projects/<sanitized-cwd>/<session-id>.jsonl` 基础格式、`parentUuid` 链和 `last-prompt`。
- [ ] session store 的 queue-operation、attribution、compact boundary、sidechain/subagent、tombstone 与官方完全一致。
- [ ] telemetry/usage 不泄漏到 UI，但内部状态一致。

## 验收证明

- [x] `npm run test:tengu` 覆盖核心 tool_use/tool_result 不变量。
- [x] `npm run test:tengu` 覆盖取消 turn 和基础工具语义。
- [x] `npm run test:tengu` 覆盖 Bash timeout、background task 输出查询。
- [x] `npm run test:tengu` 覆盖 settings 层级合并、flag/managed 来源、permission matcher、基础 hooks、Hook JSON 决策。
- [x] `npm run test:tengu` 覆盖 Read media/notebook/empty、Grep hidden/case/output mode、Glob hidden/ignore。
- [x] `npm run test:tengu` 覆盖 session project JSONL 写入/读取、parentUuid 链、metadata 保留、dontAsk 拒绝。
- [x] `npm run build` 能生成本项目 `dist/index.js`。
- [x] `npm run test:tui-smoke` 真启动 TUI 验证首屏、welcome、无凭证错误、bypass footer。
- [x] `npm run test:tui-input-smoke` 真启动 TUI 验证 `?` 帮助和 `/doctor` 命令。
- [x] 静态扫描确认 active runtime 没有直接接官方 cli/entrypoint/spawn。
- [ ] golden screenshot：官方首屏 vs 当前首屏，80/120/137 列。
- [ ] golden screenshot：用户输入后 Thinking。
- [ ] golden screenshot：Bash short output。
- [ ] golden screenshot：Bash long output 折叠。
- [ ] golden screenshot：Bash error/stderr。
- [ ] golden screenshot：Read text file。
- [ ] golden screenshot：Glob/Grep result。
- [ ] golden screenshot：permission ask/deny/allow。
- [ ] golden screenshot：narrow terminal wrap。
- [ ] protocol trace：多工具并发顺序与官方一致。
- [ ] protocol trace：permission deny 后下一轮 API 消息与官方一致。
- [ ] manual run：同一终端尺寸、同一 prompt、同一 settings，逐帧比对。

## 1:1 完成定义

- [ ] 上面所有必需项完成。
- [ ] 当前实现没有任何伪造状态或 Mock。
- [ ] 核心工作流测试、工具执行测试、截图回归全部通过。
- [ ] 同一环境下官方 TUI 与当前 TUI 的关键截图无肉眼差异。
- [ ] 新增功能不得通过直接加载官方 CLI、官方 dist、官方 entrypoint 达成。
