# Claude Code 官方 TUI 1:1 清单

本清单只记录当前真实状态。未勾选项清零前，不得宣称已经和官方 TUI 1:1。

## 硬约束

- [x] 不加载 `/Users/lbcheng/claude-code/dist/cli.js`。
- [x] 不 import `/Users/lbcheng/claude-code/src/entrypoints/cli.tsx`。
- [x] 不 spawn 官方 CLI。
- [x] `dist/index.js` 由本项目 TS 入口编译生成。
- [x] `/Users/lbcheng/claude-code` 只作为参考源，不作为运行时入口。
- [x] 工具层严格报错，不把不存在路径暗中重写到当前项目。

## 已关闭主线

- [x] 主 Agent Loop：用户输入 -> API -> tool_use -> tool_result -> 下一轮 API。
- [x] streaming block index、工具输入增量、工具结果顺序和中断处理。
- [x] Read/LS/Grep/Glob/Bash/Edit/MultiEdit/NotebookEdit/Task/WebSearch 基础语义。
- [x] 同进程 Task 子代理、后台任务、`TaskOutput`、`TaskStop`、`↓ manage` 面板。
- [x] API retry、畸形工具回合 retry、连接错误格式化和重试提示。
- [x] DeepSeekV4/GPT-5.5 图片请求 body、图片粘贴、原子图片 chip。
- [x] 启动首屏、footer、bypass 文案、release notes 基础来源。
- [x] 输入框 inverse-cell 光标、进行中光标、Ctrl/Meta 基础编辑、Shift+Tab。
- [x] 官方式 spinner tick、shimmer、tool-use、stall、reduced motion。
- [x] Explore/Agent progress 默认保留重复 toolUseId，只折叠旧行。
- [x] API 前缀注入 `# Environment`、真实 cwd、git snapshot、managed/user/project/local CLAUDE.md、rules、`@include`、外部 include 开关、conditional rules、Read 后 nested memory、当前日期、当前 output style、language preference、skills 列表与 `Skill` 按需加载、`--append-system-prompt` 主/子代理继承。

## 当前未完成

- [ ] 官方 context 剩余接线：真实 MCP connected server instructions 实时注入、worktree session 状态来源逐帧验证。
- [ ] 启动首屏 80/120/137 列 golden 与官方逐字符比对进入 CI。
- [ ] Markdown renderer 全量对齐：段落、强调、链接、inline code、软换行、列表、引用、代码块、diff。
- [ ] system-reminder、错误、警告、permission 提示的颜色、缩进、换行 golden。
- [ ] Ctrl+O 展开模式全交互：展开、收起、滚动、搜索、退出。
- [ ] `/` 补全面板官方排序、分组、来源 badge、颜色。
- [ ] permission dialog 官方 selector、remember scope、settings 写入和命中提示。
- [ ] Bash shell snapshot 的 embedded rg/find/grep、tmux、sandbox、session env hook。
- [ ] Bash 自动后台化阈值、导航、通知、恢复、停止全链路。
- [ ] Grep/Glob 官方 edge fixtures：glob 组合、hidden、ignore、path 规范化、空结果格式。
- [ ] Edit/MultiEdit 官方 edge fixtures：CRLF、无尾换行、并发改动、权限拒绝、失败文案。
- [ ] NotebookEdit 官方 edge fixtures：cell history、权限 diff、read-before-edit 文案。
- [ ] 文件权限 matcher 官方 edge fixtures：symlink、home、相对路径、workspace boundary。
- [ ] Task/Agent teammate/team/name 语义和 grouped renderer 截图。
- [ ] protocol trace：同 prompt 下多工具并发顺序、permission deny 下一轮 request body 与官方 diff 为零。
- [ ] manual run：同一终端尺寸、同一 prompt、同一 settings，官方和当前逐帧记录归档。

## 完成定义

- [ ] 当前未完成项全部关闭。
- [ ] build、unit、smoke、golden、protocol trace 全绿。
- [ ] 官方/当前关键截图无肉眼差异。
- [ ] 静态扫描确认没有官方 CLI、dist、entrypoint 运行时依赖。
- [ ] 没有 Mock、伪造状态、路径猜测修正或临时降级。
