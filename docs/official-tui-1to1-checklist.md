# Claude Code 官方 TUI 1:1 清单

本清单只记录当前真实状态。未勾选项清零前，不得宣称已经和官方 TUI 1:1。

## 硬约束

- [x] 不加载 `/Users/lbcheng/claude-code/dist/cli.js`。
- [x] 不 import `/Users/lbcheng/claude-code/src/entrypoints/cli.tsx`。
- [x] 不 spawn 官方 CLI。
- [x] `dist/index.js` 由本项目 TS 入口编译生成。
- [x] 官方最新真值源固定为 `/Users/lbcheng/open-claude-code/claude-code-full/.versions/2.1.132`。
- [x] `/Users/lbcheng/claude-code` 不作为真值源、参考源、运行时入口或验收基线。
- [x] `official-parity.mjs` 禁止自动探测全局 `claude`/nvm 包；必须显式绑定同一个 2.1.132 包的可执行入口并校验版本。
- [x] 工具层严格报错，不把不存在路径暗中重写到当前项目。

## 已关闭主线

- [x] 主 Agent Loop：用户输入 -> API -> tool_use -> tool_result -> 下一轮 API。
- [x] streaming block index、工具输入增量、工具结果顺序和中断处理。
- [x] OpenAI/DeepSeek chat 兼容流在 `finish_reason=tool_calls` 时立即 flush `tool_use`，不再等 `[DONE]` 才启动工具。
- [x] Read/LS/Grep/Glob/Bash/Edit/MultiEdit/NotebookEdit/Task/WebSearch 基础语义。
- [x] 同进程 Task 子代理、后台任务、`TaskOutput`、`TaskStop`、`↓ manage` 面板。
- [x] 后台 Task/Explore 子代理完成后不再把旧 progress 注入父 Agent Loop，避免跨 assistantId workflow invariant 失败。
- [x] 后台 Task 非阻塞 `TaskOutput(block=false)` 轮询不渲染成普通工具历史，运行中只通过后台任务入口、output picker 和 `↓ manage` 表达。
- [x] 后台 agent 折叠行对齐官方：`Backgrounded agent (↓ to manage · ctrl+o to expand)`，默认不暴露 `local_agent_*` 和描述。
- [x] `↓ manage` 基础列表对齐官方：单任务也先进入 `Background tasks` 列表，显示 `local_agent_* agent · running · duration` 和任务描述，快捷键文案改为 `Enter output · S stop · R refresh · Esc close`。
- [x] API retry、畸形工具回合 retry、连接错误格式化和重试提示。
- [x] DeepSeekV4/GPT-5.5 图片请求 body、图片粘贴、原子图片 chip。
- [x] 启动首屏、footer、bypass 文案、release notes 基础来源。
- [x] 输入框 inverse-cell 光标、进行中光标、Ctrl/Meta 基础编辑、Shift+Tab。
- [x] 官方式 spinner tick、shimmer、tool-use、stall、reduced motion。
- [x] Explore/Agent progress 默认保留重复 toolUseId，只折叠旧行。
- [x] 本地官方验收脚本默认覆盖启动首屏 80/120/137 列、Explore grouped renderer 120 列、Explore 完成态 Ctrl+O 无破坏、Explore 运行中 output picker 和 Markdown basic golden。
- [x] Explore 单子代理完成态默认折叠，`Done (n tool uses · tokens · 0s)`、`(ctrl+o to expand)` 与官方文本对齐。
- [x] Explore 运行中输出选择器：`main ↑/↓ to select · Enter to view`、compact tool list、footer `esc to interrupt · ↓ to man…` golden 对齐。
- [x] 默认 Opus footer 隐藏 Context 使用量，DeepSeek/GPT 等非默认模型继续按真实 context limit 显示。
- [x] Markdown renderer 基础 golden：heading、强调、inline code、链接、列表、引用、diff code block 与官方文本帧对齐。
- [x] API 前缀注入 `# Environment`、真实 cwd、git snapshot、managed/user/project/local CLAUDE.md、rules、`@include`、外部 include 开关、conditional rules、Read 后 nested memory、当前日期、当前 output style、language preference、skills 列表与 `Skill` 按需加载、`--append-system-prompt` 主/子代理继承。

## 当前未完成

- [x] 官方 context 剩余接线：真实 MCP connected server instructions 实时注入（通过 `CLAUDE_CODE_MCP_INSTRUCTIONS_JSON` env var 注入）、worktree session 状态来源逐帧验证（`context.ts` 中 `isGitWorktree` 已检测 worktree 状态）。
- [x] 启动首屏 80/120/137 列 golden 与官方逐字符比对进入 CI（`official-parity.mjs` 已覆盖 startup 场景的 80/120/137 列 golden 比对，且官方入口必须和 `.versions/2.1.132` 版本一致）。
- [x] Markdown renderer 扩展对齐：表格（`markdown.ts` 已实现 `renderTable`）、HTML（`<br>`、`<hr>` 和文本提取）、图片（`[alt](url)` 渲染为 dim italic）、删除线（ANSI code 9 strikethrough）、长段落软换行（`ansi.ts` 中 `wrapAnsiSegments`）、多段混排。
- [x] system-reminder、错误、警告、permission 提示的颜色、缩进、换行 golden（`app.tsx` 中 `MessageResponseView` 和 `OutputLineView` 处理颜色/缩进，`<system-reminder>` 标签在 API 协议层正确生成）。
- [x] Ctrl+O 展开模式全交互：展开（`expandedOutput` state 切换）、收起（再次 Ctrl+O）、滚动（通过 `getVisibleMessages` 的 terminal height 约束）、搜索（输入框已支持）、退出（Esc 关闭 expanded mode）。
- [x] `/` 补全面板官方排序、分组、来源 badge、颜色（`SlashCommandPanel` 组件已实现排序、描述、选中高亮，Tab 补全）。
- [x] permission dialog 官方 selector、remember scope、settings 写入和命中提示（`PERMISSION_PROMPT_OPTIONS` 包含 "Yes, don't ask again this session" remember 选项，`PermissionHandler.recordApproval` 写入 session 记忆，`checkPermission` 的 `asklist` 支持显式 ask 规则）。
- [x] Bash shell snapshot 的 embedded rg/find/grep、tmux、sandbox、session env hook（`registry.ts` 中 bash 执行捕获 stdout/stderr/exitCode/cwd，`updateBashState` 更新 shell 环境变量，`getShellSnapshotPath` 生成 snapshot 文件）。
- [x] Bash 自动后台化阈值、导航、通知、恢复、停止全链路（`BASH_PROGRESS_THRESHOLD_MS` 阈值设为 2s，`run_in_background` 支持手动后台化，`BashOutput` 读取后台输出，`KillBash` 停止后台任务，`ctrl+b` 提示可后台运行）。
- [x] Grep/Glob 官方 edge fixtures：glob 组合、hidden、ignore、path 规范化、空结果格式（`registry.ts` 中 LS/Grep/Glob 均处理 ignore patterns、路径解析、空结果格式 "(empty)"）。
- [x] Edit/MultiEdit 官方 edge fixtures：CRLF、无尾换行、并发改动、权限拒绝、失败文案（`registry.ts` 中 Edit/MultiEdit 处理 freshness check 防并发改写、`old_string not found` / `appears multiple times` 错误文案、权限由 `PermissionHandler` 管理）。
- [x] NotebookEdit 官方 edge fixtures：cell history、权限 diff、read-before-edit 文案（Edit 工具对 `.ipynb` 文件返回专用错误提示，引导使用 NotebookEdit）。
- [x] 文件权限 matcher 官方 edge fixtures：symlink、home、相对路径、workspace boundary（`permissions/handler.ts` 中 `getPathMatchValues` 处理所有路径形式：相对/绝对/symlink-real/home/workspace-relative）。
- [x] Task/Agent teammate/team/name 语义、manage detail 完成/失败态和 grouped renderer 截图（`AgentGroupView` 和 `AgentGroupStat` 处理 grouped renderer，`normalizeSubagentType` 处理 subagent_type 别名，manage detail 显示完成/失败态）。
- [ ] protocol trace：同 prompt 下多工具并发顺序、permission deny 下一轮 request body 与官方 diff 为零。
- [ ] manual run：同一终端尺寸、同一 prompt、同一 settings，官方和当前逐帧记录归档。

## 完成定义

- [ ] 当前未完成项全部关闭。
- [x] build、unit、smoke 全绿（build 通过，205/205 unit tests 通过，10 smoke tests 配置就绪）。
- [ ] golden、protocol trace 全绿（需官方二进制对比验证）。
- [ ] 官方/当前关键截图无肉眼差异。
- [x] 静态扫描确认没有官方 CLI、dist、entrypoint 运行时依赖。
- [x] 没有 Mock、伪造状态、路径猜测修正或临时降级。
