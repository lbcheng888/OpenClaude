# OpenClaude 2.1.190 — Claude Code 1:1 可读逆向(可编译运行)

官方 **Claude Code 2.1.190**(Bun standalone 原生二进制)逆向还原的**模块化 TypeScript 工程**:
每个模块独立 `.ts`/`.tsx`,带 `import`/`export` 链接、可读命名、子系统目录,`bun` 直接跑,
行为与官方逐字 1:1(含真实对话)。

## 规模与可读度

- **5787 个模块** = 971 Claude 自有 `src/` + 4816 第三方 `vendor/`
- **948/971 个自有模块可读**(可读命名,多数含 TS 类型/注释/JSX,97.6%)
- 余下保持字节切片(运行 1:1,locals 已 scope 改名):11 个超大模块(>70KB,撞 LLM 输出上限,含 749KB 纯字符串资产)+ 12 个三门不过的硬尾

## 增量逆向(v185 → v190,跨 5 个版本)

- 跨版本 **α-结构哈希**复用上一版可读体:命中 **523**(53.8%,跨版本跨度大 churn 多属正常,经诊断 0 join 失败,449 个确为真结构/字面量变化)
- 新增/改动 **449 个模块**:
  1. **Workflow 并行 LLM 还原**(346 个有 v185 同名对应体,喂 v185 可读体当移植参照;92 个真新模块冷还原):425/426 写出
  2. **机械改名兜底**(69 个三门不过的,`rename_from_rewrites` 容错收割名字 + 机械 `scope.rename`,按构造保结构,必过门):救回 57 个
- 每个还原体仍须过三道门,不过的回退字节切片

## 三道 soundness 门(全程强制,杜绝降级)

1. **α-结构等价**:还原体编译后(剥 TS 类型、JSX→createElement)与字节切片结构+字面量+运算符全等,仅标识符名可不同(`!0/!1/void 0` 按可证等价折叠)
2. **绑定双射**:变量绑定一一对应,杜绝合并/拆分失真
3. **bun 运行门**:整树真实跑 `bun index.ts --version`,bisect 把命中 bun 运行期 bug 的还原体回退字节切片

本版运行门 0 回退(无 bun 转译期崩溃体)。

## 本版修复的工具链 bug(第一性原理)

**机械改名的自由名碰撞**:`rename_from_rewrites` 改名时 `taken` 集只用 `p.scope.globals`(单作用域可见的自由名),
漏了**其它作用域**的自由标识符(跨模块 canon 名)。当某局部被改名成与模块内别处自由变量同名的名字时,
绑定双射门判定不一致(该名一处是绑定、一处是自由)→ 整模块回退。
正解:改名前**模块级收集全部自由标识符名**(traverse + `scope.getBinding` 判定非绑定)进全局 reserved,
改名时全局禁用。只减少改名(绝不破坏已过门模块),sound。本版据此救回 2 个模块,并固化工具链防未来假回退。

## 原生插件

二进制内嵌的 5 个平台编译 `.node`(`audio-capture` 语音、`computer-use-input` 键鼠、
`computer-use-swift` GUI、`image-processor` 图像/剪贴板、`url-handler`)由 `carve_native.cjs`
自解析 Mach-O/fat 头碗出,`runtime.ts` 运行时真实 `require`。macOS arm64 实测 5 个全部 dlopen 成功。

## 验证

```bash
bun index.ts --version                         # 2.1.190 (Claude Code)
bun build --compile index.ts --outfile oc && ./oc --version
```

差分测试(my-vs-official,比较报错存在性而非非确定性文本)**0 失败**,覆盖
`--version`/`--help`/`mcp list`/`config list` 及 `-p` 真实对话(simple/haiku/math/list/json)。

> 仅供学习与互操作研究。Claude Code 版权归 Anthropic PBC。
