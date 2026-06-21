# OpenClaude 2.1.185 — Claude Code 1:1 可读逆向(可编译运行)

官方 **Claude Code 2.1.185**(Bun standalone 原生二进制)逆向还原的**模块化 TypeScript 工程**:
每个模块独立 `.ts`/`.tsx`,带 `import`/`export` 链接、可读命名、子系统目录,`bun` 直接跑,
行为与官方逐字 1:1(含真实对话)。

## 规模与可读度

- **5738 个模块** = 960 Claude 自有 `src/` + 4778 第三方 `vendor/`
- **834/960 个自有模块可读**(可读命名,多数含 TS 类型/注释/JSX)
- 余下保持字节切片(运行 1:1,locals 混淆名):被三道门拒的 + 3 个超大模块(撞 LLM 输出上限)+ 1 个嵌入式 prompt 资产(748KB 纯字符串,还原零收益)+ 1 个 bun 运行门回退体

## 增量逆向(v183 → v185)

- 跨版本 **α-结构哈希**复用上一版可读体:命中 **93.7%**(900 个直接搬运)
- 新增/改动 **61 个模块**用 **Workflow 并行 LLM 还原**(两轮):
  1. 常规还原:55 个(排除 6 个 >80KB,其中 1 个为纯字符串资产)
  2. 对结构漂移/绑定不双射/编译失败的 28 个做**严格"纯转写改名"**重还原,救回 20 个
- 每个还原体仍须过三道门,不过的自动回退字节切片

## 三道 soundness 门(全程强制,杜绝降级)

1. **α-结构等价**:还原体编译后(剥 TS 类型、JSX→createElement)与字节切片结构+字面量+运算符全等,仅标识符名可不同(`!0/!1/void 0` 按可证等价折叠)
2. **绑定双射**:变量绑定一一对应,杜绝合并/拆分失真
3. **bun 运行门**:整树真实跑 `bun index.ts --version`,bisect 把命中 bun 运行期 bug(SIGTRAP)的还原体回退字节切片

本版 `tui/4217_role.tsx` 过了前两门但踩 bun 运行期 bug,被运行门正确回退。

## 原生插件

二进制内嵌的 5 个平台编译 `.node`(`audio-capture` 语音、`computer-use-input` 键鼠、
`computer-use-swift` GUI、`image-processor` 图像/剪贴板、`url-handler`)由 `carve_native.cjs`
自解析 Mach-O/fat 头碗出,`runtime.ts` 运行时真实 `require`。macOS arm64 实测 5 个全部加载成功。

## v185 新功能(vs v183)

- **问题上报解释器**(ISSUES_EXPLAINER,多处):内置 issue 解释/上报引导
- **技能注册**:registerClaudeCodeSkill + SKILL_PROMPT,运行时注册 Claude Code skill
- **OAuth 刷新锁**(withOAuthRefreshLock):并发刷新令牌串行化
- **OTel headers 环境变量**(parseOtelHeadersEnvVar):自定义遥测头
- **启动加速**:spawnSpare 预热备用进程、resolveLauncher 解析启动器
- **诊断**:performHeapDump 堆转储
- **MCP 启动顺序门**:waitForPendingMcpBeforeFirstCommand,首条命令前等待在途 MCP
- **远端环境检测**(isRunningInRemoteEnvironment)

## 验证

```bash
bun index.ts --version                         # 2.1.185 (Claude Code)
bun build --compile index.ts --outfile oc && ./oc --version
```

差分测试(my-vs-official,比较报错存在性而非非确定性文本)**0 失败**,覆盖
`--version`/`--help`/`mcp list`/`config list` 及 `-p` 真实对话(simple/haiku/math/list/json)。

> 仅供学习与互操作研究。Claude Code 版权归 Anthropic PBC。
