# OpenClaude

Claude Code 的完整开源复刻（1:1 parity with official v2.1.136）。

基于 Bun + React + Ink 构建，从官方 binary 逆向工程 Z-block 逐模块翻译为 TypeScript。

## 快速开始

```bash
# 安装依赖
bun install

# 编译
bun run build

# 运行
node dist/index.js

# 测试
bun test
```

## 架构

```
src/
├── agent/          # Agent loop、tool 执行、workflow trace
│   ├── tengu.ts         # 核心 agent 会话（TenguSession）
│   └── workflow-trace.ts
├── api/            # API 客户端（Anthropic / DeepSeek / GPT-5.5）
│   └── client.ts
├── config/         # 设置加载、合并、校验
│   └── claude-settings.ts
├── core/           # 核心模块
│   ├── protocol.ts      # 消息协议处理
│   ├── context.ts       # 上下文管理
│   ├── cost.ts          # 用量/成本追踪
│   ├── skills.ts        # 技能发现与加载
│   └── runtime.ts       # 运行时检测（WSL、剪贴板等）
├── hooks/          # Hook 系统
│   └── runner.ts
├── permissions/    # 权限系统
│   └── handler.ts
├── session/        # Session 持久化
│   └── store.ts
├── terminal/       # TUI 终端
│   ├── app.tsx          # 主 TUI 组件
│   ├── startup-screen.tsx
│   ├── markdown.ts
│   ├── ansi.ts
│   ├── image-paste.ts
│   └── components/      # UI 组件（6 batch + dialogs/wrappers）
└── tools/          # 工具注册与执行
    ├── registry.ts
    ├── diff.ts
    ├── read-only.ts
    └── plugin.ts
```

## 与官方 1:1 对比

```
npm run test:official-parity    # 需要设置 OFFICIAL_CLAUDE_CLI 指向官方 binary
```

当前 parity 状态：**5/8 PASS**（3 个 cosmetic 差异为布局像素级）

## 版本同步流程

```bash
# 1. 下载官方 binary
npm pack @anthropic-ai/claude-code-darwin-arm64@<version>

# 2. 提取 bundle
BINARY=<path-to-claude> OUTDIR=.versions/<version> python3 extract_v4.py

# 3. Z-block diff
BASELINE_VERSION=<old> node tools/update-from-binary.mjs <binary-path>

# 4. 更新源文件（基于 diff 报告）
# 5. bun test && npm run test:official-parity
```

## License

MIT
