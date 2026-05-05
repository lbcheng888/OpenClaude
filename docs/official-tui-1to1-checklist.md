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
- [x] 连续只读工具按官方 batch 并发执行，tool_result 仍按 tool_use 顺序回填。
- [x] 权限拒绝必须生成 `is_error` tool_result，不能直接丢弃。
- [x] 重复 tool_use id 必须直接报错。
- [x] 孤立 tool_result 必须直接报错。
- [x] 支持用户中断当前 turn，并正确取消 API 与工具执行。
- [x] 支持工具执行中的 abort signal。
- [x] 支持 Bash `run_in_background` 基础前后台状态，并可用 `BashOutput`/`KillBash` 查询和停止。
- [x] background shell/task 有真实后台注册、输出文件和查询工具，不再只是启动态。
- [x] background shell/task 完成或失败会通过 Agent Loop notification 事件回到 TUI。
- [x] `/tasks` 可列出当前后台 Bash/Agent 任务的 id、状态、描述和输出文件。
- [x] `/tasks <id>` / `/tasks output <id>` / `/tasks stop <id>` 路由到真实 `BashOutput`、`TaskOutput`、`KillBash`、`TaskStop` 状态。
- [x] 空输入按 `↓` 会打开真实后台任务面板，和 Agent group 的 `↓ manage` 提示一致；loading 中也可打开。
- [x] `/tasks` 无参数打开同一个交互式后台任务面板，loading 中也可用；不是只打印静态列表。
- [ ] background shell/task 的官方任务导航、通知、持久化语义完全一致。
- [x] 支持基础 hook 流程：PreToolUse、PostToolUse、PostToolUseFailure、Notification、Stop。
- [x] 支持基础官方 Hook JSON 输出：PreToolUse `permissionDecision` / `updatedInput` / `additionalContext`、PermissionRequest `decision`。
- [x] 支持基础生命周期 hooks：UserPromptSubmit、SessionStart、StopFailure、PreCompact、PostCompact。
- [ ] 官方 hook 的 prompt/agent/function/session/plugin、once/asyncRewake、完整输出 schema 语义一致。
- [x] 支持官方 project JSONL 路径的基础 session 保存和 `/resume <id>` 历史重建。
- [x] 支持 CLI `--resume <id>` / `--continue` 基础历史恢复。
- [x] `/compact` 保存当前 session checkpoint。
- [ ] session continue/compact 的官方摘要语义一致。
- [x] 支持基础上下文统计，不能出现 `NaN`。
- [x] API 请求前有全局 history token budget，累计 tool_result 过大时会保持 tool_use/tool_result 配对并把旧大结果移出请求，避免服务端“内容超长”。

## 启动首屏

- [x] 渲染 LogoV2 风格 Welcome 卡片。
- [x] 渲染 Clawd 图形。
- [x] 渲染 What's new 区域。
- [x] 读取真实模型、effort、settings。
- [x] `--dangerously-skip-permissions` 显示 bypass footer。
- [x] bypass footer 不再把 model/context usage 混到同一行。
- [x] LogoV2 welcome 首屏进入 transcript 消息流，不再固定悬浮在顶部；长对话会自然滚出历史窗口。
- [x] `--model` 和 `/model <name>` 不只更新 footer，会进入主 Agent、print、subagent 的真实 API request body。
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
- [x] system/error 行使用专门 warning/status renderer，不再经过 MarkdownBlock 二次解释。
- [ ] Ratchet/NoSelect 行为一致，复制文本时不带 gutter。
- [x] transcript 可见历史按终端行高预算裁剪，不再固定最后 12 条消息导致长工具输出挤压输入区。
- [ ] 窄屏换行、宽屏截断、滚动历史裁剪与官方完全一致。
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
- [x] API stream、Agent Loop、TUI 串起 `requesting/responding/thinking/tool-input/tool-use` spinner mode。
- [x] tool_use 输入 JSON 流式阶段先渲染工具行，再用完整输入/result 原地更新。
- [ ] 各 spinner mode 的 glimmer 速度、颜色、token/timer footprint 与官方完全一致。
- [x] Thinking 行使用官方式随机 verb，不再固定 `Thinking…`。
- [ ] glimmer message、完整随机 verb 池、thinking duration 展示一致。
- [ ] token/timer 展示阈值一致。
- [ ] stalled 状态颜色变化一致。
- [ ] teammate/task spinner tree 一致。
- [ ] reduced motion 设置一致。

## 工具调用 UI

- [x] 工具行显示 `⏺`、工具名、括号参数。
- [x] 工具行路径参数按 cwd/home 压缩显示，工作区内不再铺满 `/Users/...`。
- [x] 未完成工具显示 `Running…`。
- [x] tool_use 输入 JSON 流式阶段如果已是完整 JSON，会先转为工具专属参数摘要，不再显示 `Read({"file_path": ...})`。
- [x] 完成/失败工具用成功/错误颜色更新。
- [x] Bash 输出默认折叠，不再整屏 raw dump。
- [x] Read 结果只显示 `Read N lines`，不直接 dump 文件内容。
- [x] Read 错误在 TUI 显示官方式短摘要，不把完整错误/内部协议 raw dump 出来。
- [x] Search/Glob/Grep 结果显示 Found 摘要。
- [x] Write/Edit 结果显示单行摘要。
- [x] Bash stdout/stderr 分离渲染。
- [x] Bash cwd reset warning 渲染。
- [x] Bash `timeout` 会真实中断并返回错误结果。
- [x] Bash 静默成功命令显示 `Done`，不再统一显示 `(No output)`。
- [x] Bash timeout 参数进入结果 UI 展示。
- [x] Bash 运行超过 2s 后显示 elapsed；显式 timeout 时显示 `elapsed · timeout`。
- [x] Bash progress 通过工具执行层真实 stdout/stderr 流式事件更新，不再只靠 TUI 计时。
- [x] Bash progress 显示实时 tail output、line/byte status。
- [x] Bash progress 显示 background hint，`ctrl+b` 可把真实前台 Bash 进程转为后台任务。
- [ ] Bash progress 的完整 offscreen freeze 行为一致。
- [x] Bash 大输出按 `BASH_MAX_OUTPUT_LENGTH` 限制 inline，完整内容写入 session tool-results。
- [x] Bash 输出支持基础 JSON 格式化、ANSI 下划线剥离、image data 摘要。
- [x] Bash 输出支持基础 URL linkify 和 ANSI 控制序列清洗。
- [x] Bash 输出渲染保留结构化 SGR 样式：标准色、亮色、ansi256、RGB、bold、dim、underline、inverse。
- [ ] Bash ANSI 颜色/样式完整保留与官方一致。
- [x] Read 图片、PDF、notebook、empty、too large 状态有专门结果，不再 raw dump。
- [x] Read 文本/空文件/offset 超范围使用 display 元数据渲染行数，不再从 tool_result 字符串猜测。
- [x] Read unchanged 状态返回官方 `FILE_UNCHANGED_STUB`，TUI 显示 `Unchanged since last read`。
- [x] Write/Edit/MultiEdit 支持基础 diff display，Ctrl+O 可展开。
- [x] Write/Edit/MultiEdit/NotebookEdit 使用真实最短编辑脚本生成 hunk diff，避免插入行导致后续整段误判。
- [x] 展开 diff 时按 header/hunk/add/remove/context 结构上色。
- [ ] Edit/MultiEdit diff 展示与失败错误完全一致。
- [x] LS、TodoWrite、MultiEdit、WebFetch 有基础 renderer。
- [x] NotebookEdit 基础 renderer 接入编辑类 diff 展示。
- [x] WebSearch 使用官方 server-side `web_search_20250305` 语义和摘要 renderer。
- [x] Task/Agent 同步子 Agent 完成态 renderer 接入。
- [x] Task/Agent 同步子 Agent 失败态走结构化 Agent renderer，不再退化成裸工具错误。
- [x] Task/Agent failed display 展开时显示真实 error 文本，即使 subagent 没有 content。
- [x] Task/Agent background 基础 renderer 和 `TaskOutput` 查询接入。
- [x] Task/Agent background 失败态可通过 `TaskOutput` 返回结构化 failed Agent display。
- [x] Task tool description/schema 接入官方式使用边界，提示不要把大段 raw output/整文件/父 transcript 塞进 prompt。
- [x] Task progress display 带 agentId、tool count、当前工具名，使用官方式 `In progress… · N tool uses` 摘要。
- [x] Task progress display 在同一个 Agent 块内展示子 Agent 最近工具调用和结果摘要，不再只显示最后一句状态。
- [x] 同一 assistant turn 内连续多个 Task 会合并为 Agent group，显示 running/finished/background launched 和每个 agent 的树状状态行。
- [x] Agent group 的 `↓ manage` 提示接入真实后台任务管理面板，支持上下选择、Enter 读取输出、S 停止任务。
- [x] Backgrounded agent 单块和 group 展开时显示真实 task/output_file 信息。
- [ ] Task/Agent teammate、name/team 和官方 grouped renderer 颜色/快捷键细节完全一致。
- [ ] MCP 工具名、server tag、permission 文案一致。
- [ ] unknown tool error 与官方 fallback 一致。
- [ ] verbose/non-verbose 渲染差异一致。

## 工具执行语义

- [x] Bash 改为异步执行，避免阻塞 TUI。
- [x] Bash 使用官方 shell 选择优先级：`CLAUDE_CODE_SHELL`、`$SHELL`、zsh/bash fallback。
- [x] Read offset 按官方 1-based 语义。
- [x] Read 文本 tool_result 使用官方 compact `cat -n` 行号格式。
- [x] Glob 支持基础 `*`、`?`、`**` 匹配。
- [x] Grep 支持 include 文件名匹配。
- [x] Bash 跨调用保持 cwd。
- [x] Bash 跨调用保持 exported env。
- [x] Bash 退出码、stdout/stderr 分离进入 display state。
- [x] Bash 注入官方子进程环境：`SHELL`、`GIT_EDITOR=true`、`CLAUDECODE=1`。
- [x] Bash 使用官方式 shell snapshot：source 用户 shell 配置，执行前 source snapshot，再通过 `eval` 二次解析命令。
- [x] Bash shell snapshot 支持 alias/function/options 基础等价。
- [x] Bash 执行前按 shell 类型关闭 extglob/EXTENDED_GLOB。
- [ ] Bash shell snapshot 的 embedded rg/find/grep、tmux、sandbox、session env hook 与官方完全一致。
- [x] Bash 支持基础 `timeout` 和 `run_in_background` 语义。
- [x] Bash 大输出返回官方 `<persisted-output>` 指针，UI display 只保留预览。
- [x] Bash 前台进程支持用户触发转后台，后续可用 `BashOutput` 查询同一进程输出。
- [x] Bash 后台任务完成/失败通知接入 TUI notification。
- [ ] Bash 自动后台化、完整任务导航语义一致。
- [x] WebSearch 通过 Anthropic Messages API 发起二次 server-side search，并解析 `server_tool_use` / `web_search_tool_result` 流式事件。
- [x] Task 工具通过同进程子 TenguSession 执行真实 Agent Loop，并把结果作为父循环 tool_result 回填。
- [x] Task schema 使用官方式 “何时不要用 Task” 与前后台 usage notes，降低子 Agent prompt 爆上下文。
- [x] Task `run_in_background` 创建真实后台子 Agent，输出写入 session tool-results，并可用 `TaskOutput` 阻塞/非阻塞查询。
- [x] Task 后台子 Agent 完成/失败通知接入 TUI notification。
- [x] Task 子 Agent 异常返回 failed 结果、duration、tool count、error，并由父循环作为 tool_result 回填。
- [x] Grep 使用 ripgrep 执行，支持 include glob 和 head_limit。
- [x] Grep 支持基础 hidden、case_insensitive、output_mode。
- [ ] Grep hidden、case、output mode 与官方完全一致。
- [x] Glob 支持基础 hidden 和 ignore。
- [ ] Glob 排序、ignore、hidden、path 语义一致。
- [x] Read 有基础文件大小限制。
- [x] Read 默认最多返回官方 `MAX_LINES_TO_READ=2000` 行。
- [x] Read 空文件和 offset 超范围返回官方 system-reminder 内容，同时 TUI 显示 0 lines。
- [x] Read 使用官方 `maxTokens` 语义：超出输出 token 预算时返回短错误，要求 offset/limit 精读。
- [x] Agent Loop 对所有 tool_result 增加 5000-token wire budget：超限内容写入临时文件，只把预览和 Read offset/limit 指引发给模型。
- [x] Agent Loop 对整条 API request history 增加全局预算：旧 tool_result 超预算会写入稳定临时文件，API 请求只保留 system-reminder 指针。
- [x] Agent Loop 按 content block 独立清洗内部协议 marker，`<|end_of_sentence|>`、`<| end_of_sentence |>`、`<|end_of_toolresults|>` 不再漏到可见 transcript。
- [x] 完成态 assistant content、恢复历史、TUI 渲染边界共用同一个协议清洗函数，旧 session 里的 raw marker 不再重新显示。
- [x] MultiEdit 支持顺序编辑和失败即停。
- [x] Write/Edit/MultiEdit/NotebookEdit diff 生成使用行级最短编辑脚本，并按 context hunks 输出。
- [ ] Write/Edit/MultiEdit 的完整权限、校验、换行、并发安全语义一致。
- [x] NotebookEdit 支持真实 `.ipynb` replace/insert/delete cell 基础编辑。
- [ ] NotebookEdit 的 read-before-edit、file history、权限 diff 与官方完全一致。
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
- [x] 读取 `~/.claude/settings.json` 的 `permissions.allow/ask/deny/defaultMode`。
- [x] settings allow/ask/deny 支持基础 tool-specific matcher：`Bash(pattern)`、`Read(path)` 等。
- [x] settings allow/deny 支持 escaped parentheses、旧工具名别名、Bash `cmd:*` 基础匹配。
- [x] settings `permissions.ask` 会强制进入权限请求，`dontAsk` 下拒绝而不是弹窗。
- [x] bypass mode 仍尊重显式 deny/ask 规则和硬安全检查。
- [x] Bash permission matcher 支持子命令级复合命令判定，单个 allow 前缀不再误放行未授权子命令。
- [x] Bash deny/ask matcher 支持 env 前缀、safe wrapper、redirection、xargs、wildcard 和 escaped `*` 基础语义。
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
- [x] `/cost` 基于真实会话 API usage、API/wall duration、edit diff 行数输出官方式摘要，不再是占位提示。
- [x] `/doctor`
- [x] `/tasks` 基础后台任务列表、输出查看和停止
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
- [x] `npm run test:tengu` 覆盖连续只读工具并发执行和结果顺序。
- [x] `npm run test:tengu` 覆盖 stream 到 spinner mode 的状态转换。
- [x] `npm run test:tengu` 覆盖 tool_use 输入 JSON 流式事件。
- [x] `npm run test:tengu` 覆盖取消 turn 和基础工具语义。
- [x] `npm run test:tengu` 覆盖 Bash timeout、background task 输出查询。
- [x] `npm run test:tengu` 覆盖 Bash progress 从工具执行层向 TUI 事件转发。
- [x] `npm run test:tengu` 覆盖 Bash 前台进程转后台后继续输出并可查询。
- [x] `npm run test:tengu` 覆盖工具执行 notification 事件进入 TUI loop。
- [x] `npm run test:tengu` 覆盖 Bash/Task 后台任务完成通知、任务列表、按 id 输出和停止。
- [x] `npm run test:tengu` 覆盖 WebSearch server-side tool 请求、流式进度和结果 display。
- [x] `npm run test:tengu` 覆盖 Task 同进程子 Agent 执行上下文和完成态 display。
- [x] `npm run test:tengu` 覆盖 Task 后台子 Agent 启动、输出文件和 `TaskOutput` 查询。
- [x] `npm run test:tengu` 覆盖 Bash 静默命令 UI 状态和 timeoutMs。
- [x] `npm run test:tengu` 覆盖 Bash 官方 shell 选择和子进程环境注入。
- [x] `npm run test:tengu` 覆盖 Bash shell snapshot alias 执行。
- [x] `npm run test:tengu` 覆盖 Bash 大输出落盘和 `<persisted-output>` 结果。
- [x] `npm run test:tengu` 覆盖累计 tool_result history 超预算时的 API 请求压缩、稳定落盘和 tool_result 配对保留。
- [x] `npm run test:tengu` 覆盖 ANSI SGR 解析、样式保留、宽度换行和 Ctrl+O 折叠提示。
- [x] `npm run test:tengu` 覆盖 diff 最短编辑脚本、分离 hunk 和确定性截断。
- [x] `npm run test:tengu` 覆盖 settings 层级合并、flag/managed 来源、permission matcher、基础 hooks、Hook JSON 决策。
- [x] `npm run test:tengu` 覆盖 settings `permissions.ask` 合并、ask 优先级、`dontAsk` 下拒绝、bypass 下显式 deny/ask 仍生效。
- [x] `npm run test:tengu` 覆盖 Bash permission matcher 的复合命令、env/wrapper/xargs/redirection、wildcard/escaped star。
- [x] API HTTP stream error 会提取服务端真实 message，不再只显示 `HTTP <status>`。
- [x] `npm run test:tengu` 覆盖 `streamMessage` / `sendMessage` 使用当前会话模型，而不是只读环境默认模型。
- [x] `npm run test:tengu` 覆盖 `/cost` 的 token/cache/web-search 估算、未知模型标记、零用量格式、API/wall duration 和代码变更行数。
- [x] `npm run test:tengu` 覆盖 Read media/notebook/empty、Grep hidden/case/output mode、Glob hidden/ignore。
- [x] `npm run test:tengu` 覆盖 Read 同 session 重复读取未变化文件返回官方 unchanged stub。
- [x] `npm run test:tengu` 覆盖 Read compact `cat -n` 行号格式和默认 2000 行限制。
- [x] `npm run test:tengu` 覆盖 Read display 元数据、空文件和 offset 超范围 system-reminder。
- [x] `npm run test:tengu` 覆盖 NotebookEdit 真实 replace/insert/delete。
- [x] `npm run test:tengu` 覆盖内部协议 marker 的流式、带空格、非 marker 保留和恢复历史清洗。
- [x] `npm run test:tengu` 覆盖 session project JSONL 写入/读取、parentUuid 链、metadata 保留、dontAsk 拒绝。
- [x] `npm run build` 能生成本项目 `dist/index.js`。
- [x] `npm run test:tui-smoke` 真启动 TUI 验证首屏、welcome、无凭证错误、bypass footer。
- [x] `npm run test:tui-input-smoke` 真启动 TUI 验证 `?` 帮助、`↓` 后台任务管理、`/doctor`、`/tasks` 列表、task id 路由错误和缺参 usage。
- [x] `npm run test:tui-background-smoke` 用本地 SSE API 验证 `Task(run_in_background:true)` 启动后，父 turn 仍在 loading 时 `↓ manage` 和 `/tasks` 都能打开面板，并可 Enter 读取输出、S 停止任务。
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
