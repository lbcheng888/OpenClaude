#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const repo = resolve(dirname(new URL(import.meta.url).pathname), "..");
const requestedScenarioName = process.env.OFFICIAL_PARITY_SCENARIO || "all";
if (requestedScenarioName === "all" && !process.env.OFFICIAL_CLAUDE_CLI) {
  resolveOfficialEntry(resolveOfficialTruthSource());
}
if (requestedScenarioName === "all") {
  runAllScenarios();
}
const scenarioName = requestedScenarioName;
const scenario = createScenario(scenarioName);
const officialTruthSource = resolveOfficialTruthSource();
const officialEntry = resolveOfficialEntry(officialTruthSource);
const currentEntry = process.env.CURRENT_CLAUDE_CLI || join(repo, "dist", "index.js");
const officialRuntime = process.env.OFFICIAL_CLAUDE_RUNTIME || inferRuntime(officialEntry);
const currentRuntime = process.env.CURRENT_CLAUDE_RUNTIME || "node";
const artifactDir = process.env.OFFICIAL_PARITY_ARTIFACT_DIR || join(tmpdir(), "claude-code-full-official-parity");
const profile = process.env.OFFICIAL_PARITY_PROFILE || "isolated";
const baselineWorkdir = resolve(process.env.OFFICIAL_PARITY_WORKDIR || process.cwd());
const columns = (process.env.OFFICIAL_PARITY_COLUMNS || scenario.defaultColumns)
  .split(",")
  .map(value => Number.parseInt(value.trim(), 10))
  .filter(value => Number.isFinite(value) && value > 0);
const rows = Number.parseInt(process.env.OFFICIAL_PARITY_ROWS || "64", 10);
const settleMs = Number.parseInt(process.env.OFFICIAL_PARITY_SETTLE_MS || String(scenario.settleMs), 10);
const exitMode = process.env.OFFICIAL_PARITY_EXIT_MODE || scenario.exitMode || "close";

if (!existsSync(officialEntry)) {
  fail(`Missing official CLI: ${officialEntry}`);
}
if (!existsSync(currentEntry)) {
  fail(`Missing current CLI: ${currentEntry}. Run npm run build first.`);
}
assertOfficialEntryVersion(officialEntry, officialRuntime, officialTruthSource.version);
if (columns.length === 0) {
  fail("OFFICIAL_PARITY_COLUMNS did not contain any valid terminal widths.");
}
if (!["isolated", "local-copy", "local"].includes(profile)) {
  fail("OFFICIAL_PARITY_PROFILE must be one of: isolated, local-copy, local.");
}
if (!["close", "ctrlc"].includes(exitMode)) {
  fail("OFFICIAL_PARITY_EXIT_MODE must be one of: close, ctrlc.");
}

mkdirSync(artifactDir, { recursive: true });
writeFileSync(join(artifactDir, "official-truth-source.txt"), [
  `version=${officialTruthSource.version}`,
  `dir=${officialTruthSource.dir}`,
  `bundle=${officialTruthSource.bundle}`,
  `official_cli=${officialEntry}`,
  `official_runtime=${officialRuntime}`,
].join("\n") + "\n", "utf8");

const results = [];
for (const width of columns) {
  const official = captureTarget("official", { runtime: officialRuntime, entry: officialEntry }, width);
  const current = captureTarget("current", { runtime: currentRuntime, entry: currentEntry }, width);
  const diff = diffLines(official.normalized, current.normalized);
  const passed = scenario.skipScreenDiff === true || diff.length === 0;
  const diffPath = join(artifactDir, `${scenario.name}-${width}.diff`);
  writeFileSync(diffPath, diff.join("\n") + (diff.length > 0 ? "\n" : ""), "utf8");
  results.push({ width, passed, official, current, diffPath });
}

let failed = false;
for (const result of results) {
  if (result.passed) {
    console.log(`PASS ${scenario.name} ${result.width} cols`);
    continue;
  }
  failed = true;
  console.error(`FAIL ${scenario.name} ${result.width} cols`);
  console.error(`  official: ${result.official.normalizedPath}`);
  console.error(`  current:  ${result.current.normalizedPath}`);
  console.error(`  diff:     ${result.diffPath}`);
}

if (failed) {
  process.exitCode = 1;
} else {
  console.log(`ALL OFFICIAL PARITY CHECKS PASS (${artifactDir})`);
}

function captureTarget(label, target, width) {
  const base = join(artifactDir, `${scenario.name}-${width}-${label}`);
  const usesFixtureWorkdir = scenarioUsesFixtureWorkdir();
  const workdir = profile === "isolated" || usesFixtureWorkdir
    ? join(artifactDir, `${scenario.name}-${width}-work`)
    : baselineWorkdir;
  const home = profile === "local"
    ? (process.env.HOME || homedir())
    : join(artifactDir, `${scenario.name}-${width}-${label}-home`);
  const configDir = profile === "local"
    ? (process.env.CLAUDE_CONFIG_DIR || join(home, ".claude"))
    : join(home, ".claude");
  const rawPath = `${base}.raw`;
  const normalizedPath = `${base}.txt`;
  const expectPath = `${base}.expect`;
  if (profile === "isolated" || usesFixtureWorkdir) {
    rmSync(home, { recursive: true, force: true });
    rmSync(workdir, { recursive: true, force: true });
  }
  mkdirSync(workdir, { recursive: true });
  mkdirSync(configDir, { recursive: true });
  prepareScenarioWorkdir(workdir);
  if (profile === "isolated") {
    seedClaudeConfig({ configDir, workdir });
  } else if (profile === "local-copy") {
    copyLocalClaudeConfig(configDir, { scrubApiEnv: Boolean(scenario.serverScript) });
  }

  writeFileSync(expectPath, buildExpectScript({
    entry: target.entry,
    runtime: target.runtime,
    rawPath,
    serverPath: scenario.serverScript ? writeScenarioServer(base, scenario.serverScript) : null,
    workdir,
    home,
    configDir,
    width,
    profile,
  }), "utf8");

  const result = spawnSync("expect", [expectPath], {
    cwd: workdir,
    encoding: "utf8",
    env: buildCaptureEnv({ home, configDir, width }),
  });
  writeFileSync(rawPath, result.stdout ?? "", "utf8");
  if (result.status !== 0) {
    const details = [truncateForError(result.stdout), result.stderr].filter(Boolean).join("\n").trim();
    fail(`${label} capture failed at ${width} cols${details ? `:\n${details}` : ""}`);
  }

  const raw = readFileSync(rawPath, "utf8");
  const searchableRaw = normalizeRawForNeedleSearch(raw);
  for (const required of scenario.requiredRawText || []) {
    if (!searchableRaw.includes(required)) {
      fail(`${label} raw capture at ${width} cols did not contain ${JSON.stringify(required)}.`);
    }
  }
  const normalized = normalizeTerminalCapture(raw, { workdir, home, configDir, width });
  writeFileSync(normalizedPath, normalized, "utf8");
  for (const required of scenario.requiredText) {
    if (!normalized.includes(required)) {
      fail(`${label} capture at ${width} cols did not contain ${JSON.stringify(required)}.`);
    }
  }
  return { rawPath, normalizedPath, normalized };
}

function createScenario(name) {
  switch (name) {
    case "startup":
      return {
        name,
        args: ["--dangerously-skip-permissions"],
        requiredText: ["Claude Code v"],
        waitText: "/effort",
        defaultColumns: "80,120,137",
        settleMs: 900,
        needsApi: false,
      };
    case "explore-renderer":
      return {
        name,
        args: ["--dangerously-skip-permissions", "Explore renderer fixture"],
        requiredText: ["Explore", "Parity complete."],
        requiredRawText: [],
        waitText: "complete.",
        defaultColumns: "120",
        settleMs: 300,
        needsApi: true,
        exitMode: "ctrlc",
        serverScript: getExploreRendererServerScript(),
      };
    case "explore-expanded-renderer":
      return {
        name,
        args: ["--dangerously-skip-permissions", "Explore renderer fixture"],
        requiredText: ["Explore", "Parity complete."],
        requiredRawText: [],
        waitText: "complete.",
        defaultColumns: "120",
        settleMs: 80,
        needsApi: true,
        exitMode: "ctrlc",
        skipScreenDiff: true,
        expandOutput: true,
        expandOutputDelayMs: 120,
        serverScript: getExploreRendererServerScript(),
      };
    case "explore-running-picker":
      return {
        name,
        args: ["--dangerously-skip-permissions", "Explore renderer fixture"],
        requiredText: ["Explore", "Bash(tail -f /dev/null)", "bypass permissions"],
        requiredRawText: ["main", "↑/↓", "Enter"],
        skipScreenDiff: true,
        waitText: "/dev/null",
        defaultColumns: "120",
        settleMs: 80,
        needsApi: true,
        expandOutput: true,
        expandOutputDelayMs: 160,
        expandOutputInput: "\x1b[111;5u",
        serverScript: getExploreRendererServerScript({ bashCommand: "tail -f /dev/null" }),
      };
    case "markdown-renderer":
      return {
        name,
        args: ["--dangerously-skip-permissions", "Markdown renderer fixture"],
        requiredText: ["Heading", "ordered item", "quoted line", "-old", "+new"],
        waitText: "+new",
        defaultColumns: "120",
        settleMs: 1200,
        needsApi: true,
        exitMode: "ctrlc",
        serverScript: getMarkdownRendererServerScript(),
      };
    default:
      fail(`Unknown OFFICIAL_PARITY_SCENARIO: ${name}`);
  }
}

function prepareScenarioWorkdir(workdir) {
  if (!scenarioUsesFixtureWorkdir()) return;
  mkdirSync(join(workdir, "src"), { recursive: true });
  writeFileSync(join(workdir, "package.json"), `${JSON.stringify({
    name: "official-parity-fixture",
    version: "1.0.0",
    type: "module",
  }, null, 2)}\n`, "utf8");
  writeFileSync(join(workdir, "src", "index.ts"), "export const answer = 42;\n", "utf8");
  writeFileSync(join(workdir, "README.md"), "# Official parity fixture\n", "utf8");
}

function scenarioUsesFixtureWorkdir() {
  return ["explore-renderer", "explore-expanded-renderer", "explore-running-picker"].includes(scenario.name);
}

function writeScenarioServer(base, source) {
  const serverPath = `${base}.server.mjs`;
  writeFileSync(serverPath, source, "utf8");
  return serverPath;
}

function getMarkdownRendererServerScript() {
  const markdown = [
    "# Heading",
    "",
    "Plain **bold** and *italic* with `inline_code` plus [a link](https://example.com).",
    "",
    "- unordered item",
    "- second item",
    "",
    "1. ordered item",
    "   1. nested ordered item",
    "",
    "> quoted line",
    "",
    "```diff",
    "-old",
    "+new",
    "@@ hunk",
    "```",
  ].join("\n");

  return String.raw`import http from "node:http";

const markdown = ${JSON.stringify(markdown)};

function writeEvent(res, event) {
  res.write("event: " + event.type + "\n");
  res.write("data: " + JSON.stringify(event) + "\n\n");
}

function startMessage(res) {
  writeEvent(res, {
    type: "message_start",
    message: {
      id: "msg_markdown_" + Date.now(),
      type: "message",
      role: "assistant",
      model: "claude-opus-4-7",
      content: [],
      stop_reason: null,
      stop_sequence: null,
      usage: { input_tokens: 1, output_tokens: 1 },
    },
  });
}

function finishMessage(res) {
  writeEvent(res, {
    type: "message_delta",
    delta: { stop_reason: "end_turn", stop_sequence: null },
    usage: { input_tokens: 32, output_tokens: 64 },
  });
  writeEvent(res, { type: "message_stop" });
  res.end();
}

const server = http.createServer((req, res) => {
  if (req.method !== "POST") {
    res.writeHead(404).end();
    return;
  }

  req.resume();
  req.on("end", () => {
    res.writeHead(200, {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      "connection": "keep-alive",
    });
    startMessage(res);
    writeEvent(res, {
      type: "content_block_start",
      index: 0,
      content_block: { type: "text", text: "" },
    });
    writeEvent(res, {
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: markdown },
    });
    writeEvent(res, { type: "content_block_stop", index: 0 });
    finishMessage(res);
  });
});

server.listen(0, "127.0.0.1", () => {
  console.log("PORT " + server.address().port);
});
`;
}

function getExploreRendererServerScript(options = {}) {
  const bashCommand = options.bashCommand || "pwd";
  return String.raw`import http from "node:http";

let nextToolId = 1;

function writeEvent(res, event) {
  res.write("event: " + event.type + "\n");
  res.write("data: " + JSON.stringify(event) + "\n\n");
}

function startMessage(res) {
  writeEvent(res, {
    type: "message_start",
    message: {
      id: "msg_parity_" + Date.now(),
      type: "message",
      role: "assistant",
      model: "claude-opus-4-7",
      content: [],
      stop_reason: null,
      stop_sequence: null,
      usage: { input_tokens: 1, output_tokens: 1 },
    },
  });
}

function finishMessage(res, stopReason) {
  writeEvent(res, {
    type: "message_delta",
    delta: { stop_reason: stopReason, stop_sequence: null },
    usage: { input_tokens: 32, output_tokens: 8 },
  });
  writeEvent(res, { type: "message_stop" });
  res.end();
}

function respondWithText(res, text) {
  startMessage(res);
  writeEvent(res, {
    type: "content_block_start",
    index: 0,
    content_block: { type: "text", text: "" },
  });
  writeEvent(res, {
    type: "content_block_delta",
    index: 0,
    delta: { type: "text_delta", text },
  });
  writeEvent(res, { type: "content_block_stop", index: 0 });
  finishMessage(res, "end_turn");
}

function respondWithToolUse(res, name, input) {
  startMessage(res);
  writeEvent(res, {
    type: "content_block_start",
    index: 0,
    content_block: { type: "tool_use", id: "toolu_parity_" + nextToolId++, name, input: {} },
  });
  writeEvent(res, {
    type: "content_block_delta",
    index: 0,
    delta: { type: "input_json_delta", partial_json: JSON.stringify(input) },
  });
  writeEvent(res, { type: "content_block_stop", index: 0 });
  finishMessage(res, "tool_use");
}

function toolNames(payload) {
  return (payload.tools || []).map(tool => String(tool.name || tool?.function?.name || ""));
}

function toolResultCount(payload) {
  return JSON.stringify(payload.messages || []).split('"tool_result"').length - 1;
}

function isParentTurn(payload) {
  const names = toolNames(payload);
  const messages = JSON.stringify(payload.messages || []);
  return names.includes("Task") || messages.includes("Explore renderer fixture");
}

const server = http.createServer((req, res) => {
  if (req.method !== "POST") {
    res.writeHead(404).end();
    return;
  }

  let body = "";
  req.on("data", chunk => {
    body += chunk;
  });
  req.on("end", () => {
    const payload = JSON.parse(body || "{}");
    res.writeHead(200, {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      "connection": "keep-alive",
    });

    const count = toolResultCount(payload);
    if (isParentTurn(payload)) {
      if (count === 0) {
        respondWithToolUse(res, "Task", {
          description: "Explore project structure",
          prompt: "Explore project structure. Use read-only tools. List the root, read package.json, and run pwd.",
          subagent_type: "Explore",
        });
        return;
      }
      respondWithText(res, "Parity complete.");
      return;
    }

    switch (count) {
      case 0:
        respondWithToolUse(res, "LS", { path: "." });
        return;
      case 1:
        respondWithToolUse(res, "Read", { file_path: "package.json" });
        return;
      case 2:
        respondWithToolUse(res, "Bash", { command: ${JSON.stringify(bashCommand)}, description: "Print working directory" });
        return;
      default:
        respondWithText(res, "Explore complete.");
    }
  });
});

server.listen(0, "127.0.0.1", () => {
  console.log("PORT " + server.address().port);
});
`;
}

function resolveOfficialTruthSource() {
  const version = process.env.OFFICIAL_TRUTH_VERSION || "2.1.132";
  const dir = resolve(process.env.OFFICIAL_TRUTH_DIR || join(repo, ".versions", version));
  const bundle = join(dir, "main_bundle", "full_bundle.cjs");

  if (!existsSync(bundle)) {
    fail(`Missing official truth bundle: ${bundle}`);
  }

  const header = readFileSync(bundle, "utf8").slice(0, 4096);
  const foundVersion = header.match(/Version:\s*([0-9]+\.[0-9]+\.[0-9]+)/u)?.[1];
  if (foundVersion !== version) {
    fail(`Official truth bundle version mismatch: expected ${version}, got ${foundVersion || "unknown"} at ${bundle}`);
  }

  return { version, dir, bundle };
}

function resolveOfficialEntry(officialTruth) {
  if (process.env.OFFICIAL_CLAUDE_CLI) return resolve(process.env.OFFICIAL_CLAUDE_CLI);

  fail([
    `Official truth source is fixed at ${officialTruth.dir}.`,
    "Set OFFICIAL_CLAUDE_CLI to the executable from that same 2.1.132 package before running parity capture.",
    "Refusing to auto-detect global claude, nvm packages, or /Users/lbcheng/claude-code because that can compare against the wrong build.",
  ].join("\n"));
}

function assertOfficialEntryVersion(entry, runtime, expectedVersion) {
  if (process.env.OFFICIAL_PARITY_SKIP_VERSION_CHECK === "1") return;

  const command = runtime === "direct" ? entry : runtime;
  const args = runtime === "direct" ? ["--version"] : [entry, "--version"];
  const result = spawnSync(command, args, { encoding: "utf8", timeout: 5000 });
  const output = `${result.stdout || ""}${result.stderr || ""}`;
  if (result.error) {
    fail(`Could not read official CLI version from ${entry}: ${result.error.message}`);
  }
  if (result.status !== 0) {
    fail(`Official CLI version check failed for ${entry}:\n${truncateForError(output)}`);
  }

  const actualVersion = output.match(/\b([0-9]+\.[0-9]+\.[0-9]+)\b/u)?.[1];
  if (actualVersion !== expectedVersion) {
    fail(`Official CLI version mismatch: expected ${expectedVersion} from .versions, got ${actualVersion || "unknown"} from ${entry}.`);
  }
}

function inferRuntime(entry) {
  if (/\.(?:js|cjs|mjs)$/u.test(entry)) return "node";
  return "direct";
}

function buildExpectScript({ runtime, entry, rawPath, serverPath, workdir, home, configDir, width, profile }) {
  const spawnLine = runtime === "direct"
    ? `spawn -noecho ${tclQuote(entry)} ${scenario.args.map(tclQuote).join(" ")}`
    : `spawn -noecho ${tclQuote(runtime)} ${tclQuote(entry)} ${scenario.args.map(tclQuote).join(" ")}`;
  const lines = [
    "#!/usr/bin/expect -f",
    "set timeout 12",
    "log_user 1",
    `set env(TERM) ${tclQuote("xterm-256color")}`,
    `set env(COLUMNS) ${tclQuote(String(width))}`,
    `set env(LINES) ${tclQuote(String(rows))}`,
    `set env(HOME) ${tclQuote(home)}`,
    `set env(CLAUDE_CONFIG_DIR) ${tclQuote(configDir)}`,
    "set env(IS_DEMO) 0",
  ];

  if (serverPath) {
    lines.push(
      `spawn -noecho node ${tclQuote(serverPath)}`,
      "set parity_server_id $spawn_id",
      "expect -i $parity_server_id -re {PORT ([0-9]+)}",
      "set parity_server_port $expect_out(1,string)",
      "set env(ANTHROPIC_BASE_URL) \"http://127.0.0.1:$parity_server_port\"",
      "set env(ANTHROPIC_AUTH_TOKEN) parity-token",
      "set env(ANTHROPIC_API_KEY) parity-token",
      "set env(CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) 1",
    );
  }

  if (profile === "isolated") {
    lines.push(
      "set env(CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) 1",
      ...(scenario.needsApi ? [] : [
        "catch {unset env(ANTHROPIC_AUTH_TOKEN)}",
        "catch {unset env(ANTHROPIC_API_KEY)}",
        "catch {unset env(ANTHROPIC_BASE_URL)}",
      ]),
      "catch {unset env(ANTHROPIC_MODEL)}",
      "catch {unset env(ANTHROPIC_DEFAULT_HAIKU_MODEL)}",
      "catch {unset env(ANTHROPIC_DEFAULT_OPUS_MODEL)}",
      "catch {unset env(ANTHROPIC_DEFAULT_SONNET_MODEL)}",
      "catch {unset env(DEEPSEEK_API_KEY)}",
      "catch {unset env(DEEPSEEK_BASE_URL)}",
      "catch {unset env(OPENAI_API_KEY)}",
      "catch {unset env(OPENAI_BASE_URL)}",
      "catch {unset env(CLAUDE_CODE_API_PROVIDER)}",
      "catch {unset env(CLAUDE_CODE_EFFORT_LEVEL)}",
      "catch {unset env(CLAUDE_CODE_SUBAGENT_MODEL)}",
    );
  }

  lines.push(
    `cd ${tclQuote(workdir)}`,
    `set stty_init ${tclQuote(`rows ${rows} columns ${width}`)}`,
    spawnLine,
    `catch {stty rows ${rows} columns ${width} < $spawn_out(slave,name)}`,
    "expect {",
    "  \"Accessing workspace:\" { send \"\\r\"; exp_continue }",
    "  \"Choose the text style\" { send \"\\r\"; exp_continue }",
    "  \"Yes, I trust this folder\" { send \"\\r\"; exp_continue }",
    `  ${tclQuote(scenario.waitText)} {}`,
    "  timeout { exit 2 }",
    "  eof { exit 3 }",
    "}",
    ...(scenario.afterWaitInput ? [`send ${tclQuote(scenario.afterWaitInput)}`, `after ${scenario.afterWaitInputDelayMs || 200}`] : []),
    ...(scenario.expandOutput ? [`send ${tclQuote(scenario.expandOutputInput || "\x0f")}`, `after ${scenario.expandOutputDelayMs || 900}`] : []),
    `after ${settleMs}`,
  );

  if (exitMode === "close") {
    if (serverPath) {
      lines.push("catch {exec kill [exp_pid -i $parity_server_id]}");
    }
    lines.push(
      "catch {close}",
      "catch {wait}",
      "exit 0",
      "",
    );
    return lines.join("\n");
  }

  lines.push(
    "send \"\\003\"",
    "expect {",
    "  \"Press Ctrl-C again to exit\" {}",
    "  eof {}",
    "  timeout {}",
    "}",
    "after 500",
  );
  if (serverPath) {
    lines.push("catch {exec kill [exp_pid -i $parity_server_id]}");
  }
  lines.push(
    "catch {close}",
    "catch {wait}",
    "exit 0",
    "",
  );

  return lines.join("\n");
}

function buildCaptureEnv({ home, configDir, width }) {
  const env = {
    ...process.env,
    TERM: "xterm-256color",
    COLUMNS: String(width),
    LINES: String(rows),
    HOME: home,
    CLAUDE_CONFIG_DIR: configDir,
  };
  if (profile === "isolated") {
    env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1";
  }
  return env;
}

function normalizeTerminalCapture(raw, paths) {
  const stripped = renderTerminalFrame(raw, {
    columns: paths.width,
    rows,
  })
    .replace(/Claude Code v[0-9]+(?:\.[0-9]+)*/gu, "Claude Code v<VERSION>")
    .replace(/^✻ .+ for (?:\d+ms|\d+(?:\.\d+)?s|\d+m(?: \d+s)?)$/gmu, "✻ <turn-duration>")
    .replace(/^[✢✳✶✻✽·] .+…(?: \([^)]*\))?$/gmu, "✻ <active-spinner>")
    .replace(/^(\s*)Press Ctrl-C again to exit.*$/gmu, "$1⏵⏵ bypass permissions on (shift+tab to cycle)")
    .replace(/local_agent_\d+/gu, "local_agent_N")
    .replace(/\b\d+m \d+s\b/gu, "<duration>")
    .replace(/\b\d+s\b/gu, "<duration>")
    .replace(/^❯(?: |\u00a0)Try ".+"$/gmu, '❯ Try "<prompt-placeholder>"')
    .replace(new RegExp(escapeRegExp(paths.workdir), "gu"), "<cwd>")
    .replace(/\/…\/claude-parity-[^/\s]+\/[^\s]+-work/gu, "/…<cwd>")
    .replace(new RegExp(escapeRegExp(paths.home), "gu"), "<home>")
    .replace(new RegExp(escapeRegExp(paths.configDir), "gu"), "<config>")
    .replace(/\/…\/claude-code-full-official-parity\//gu, "/…/");
  const cropped = cropRenderedFrame(stripped);
  return cropped
    .split("\n")
    .map(line => line.replace(/[^\S\n]+$/gu, ""))
    .filter(line => !/^\s*\[\d*\s*$/u.test(line))
    .filter(line => !/^\s*$/.test(line))
    .join("\n")
    .trimEnd() + "\n";
}

function cropRenderedFrame(rendered) {
  if (scenario.name === "startup") {
    const lines = rendered.split("\n");
    const startupLineIndex = lines.findIndex(line => line.includes("Claude Code v"));
    return startupLineIndex === -1 ? rendered : lines.slice(startupLineIndex).join("\n");
  }

  const startupIndex = rendered.indexOf("Claude Code v");
  return startupIndex === -1 ? rendered : rendered.slice(startupIndex);
}

function normalizeRawForNeedleSearch(raw) {
  return raw
    .replace(/\x1b\[[0-?]*[ -/]*[@-~]/gu, "")
    .replace(/\x1b\][^\x07]*(?:\x07|\x1b\\)/gu, "")
    .replace(/\x1b[ -/]*[@-~]/gu, "")
    .replace(/\r/gu, "\n")
    .replace(/[^\S\n]+/gu, " ");
}

function runAllScenarios() {
  const script = new URL(import.meta.url).pathname;
  let failed = false;
  for (const name of ["startup", "explore-renderer", "explore-expanded-renderer", "explore-running-picker", "markdown-renderer"]) {
    const result = spawnSync(process.execPath, [script], {
      cwd: repo,
      stdio: "inherit",
      env: {
        ...process.env,
        OFFICIAL_PARITY_SCENARIO: name,
      },
    });
    if (result.status !== 0) {
      failed = true;
    }
  }
  process.exit(failed ? 1 : 0);
}

function renderTerminalFrame(raw, size) {
  const screen = Array.from({ length: size.rows }, () => Array(size.columns).fill(" "));
  let x = 0;
  let y = 0;
  let savedX = 0;
  let savedY = 0;

  for (let index = 0; index < raw.length;) {
    const char = raw[index];
    if (char === "\x1b") {
      const parsed = parseEscape(raw, index);
      if (parsed) {
        ({ x, y, savedX, savedY } = applyEscape(parsed, { x, y, savedX, savedY, screen, size }));
        index = parsed.end;
        continue;
      }
      index++;
      continue;
    }
    if (char === "\r") {
      x = 0;
      index++;
      continue;
    }
    if (char === "\n") {
      y = Math.min(size.rows - 1, y + 1);
      index++;
      continue;
    }
    if (char === "\b") {
      x = Math.max(0, x - 1);
      index++;
      continue;
    }
    if (char && char < " ") {
      index++;
      continue;
    }

    const codePoint = raw.codePointAt(index);
    if (codePoint === undefined) break;
    const text = String.fromCodePoint(codePoint);
    index += text.length;
    const width = Math.max(1, stringWidth(text));
    if (x >= size.columns) {
      x = 0;
      y = Math.min(size.rows - 1, y + 1);
    }
    if (y >= 0 && y < size.rows && x >= 0 && x < size.columns) {
      screen[y][x] = text;
      for (let offset = 1; offset < width && x + offset < size.columns; offset++) {
        screen[y][x + offset] = "";
      }
    }
    x += width;
  }

  return screen.map(line => line.join("").replace(/[^\S\n]+$/gu, "")).join("\n");
}

function parseEscape(raw, start) {
  const next = raw[start + 1];
  if (next === "]") {
    const bel = raw.indexOf("\x07", start + 2);
    const st = raw.indexOf("\x1b\\", start + 2);
    const end = bel === -1 ? st : st === -1 ? bel : Math.min(bel, st);
    if (end === -1) return { type: "skip", end: raw.length };
    return { type: "skip", end: end + (end === st ? 2 : 1) };
  }
  if (next === "P") {
    const st = raw.indexOf("\x1b\\", start + 2);
    return { type: "skip", end: st === -1 ? raw.length : st + 2 };
  }
  if (next === "[") {
    const match = /\x1b\[([0-?]*)([ -/]*)([@-~])/uy;
    match.lastIndex = start;
    const result = match.exec(raw);
    if (!result) return null;
    return {
      type: "csi",
      params: result[1] ?? "",
      intermediates: result[2] ?? "",
      command: result[3] ?? "",
      end: match.lastIndex,
    };
  }
  return { type: "skip", end: Math.min(raw.length, start + 2) };
}

function applyEscape(parsed, state) {
  if (parsed.type !== "csi") return state;
  const params = parseCsiParams(parsed.params);
  const first = params[0] ?? 1;
  let { x, y, savedX, savedY } = state;
  const { screen, size } = state;

  switch (parsed.command) {
    case "A":
      y = Math.max(0, y - first);
      break;
    case "B":
      y = Math.min(size.rows - 1, y + first);
      break;
    case "C":
      x = Math.min(size.columns - 1, x + first);
      break;
    case "D":
      x = Math.max(0, x - first);
      break;
    case "E":
      y = Math.min(size.rows - 1, y + first);
      x = 0;
      break;
    case "F":
      y = Math.max(0, y - first);
      x = 0;
      break;
    case "G":
      x = clamp((first || 1) - 1, 0, size.columns - 1);
      break;
    case "H":
    case "f":
      y = clamp((params[0] || 1) - 1, 0, size.rows - 1);
      x = clamp((params[1] || 1) - 1, 0, size.columns - 1);
      break;
    case "J":
      eraseDisplay(screen, x, y, params[0] ?? 0);
      break;
    case "K":
      eraseLine(screen, x, y, params[0] ?? 0);
      break;
    case "s":
      savedX = x;
      savedY = y;
      break;
    case "u":
      x = savedX;
      y = savedY;
      break;
  }
  return { ...state, x, y, savedX, savedY };
}

function parseCsiParams(raw) {
  if (!raw || raw.startsWith("?")) return [];
  return raw
    .split(";")
    .map(value => value === "" ? 1 : Number.parseInt(value, 10))
    .map(value => Number.isFinite(value) ? value : 1);
}

function eraseDisplay(screen, x, y, mode) {
  if (mode === 2 || mode === 3) {
    for (const line of screen) line.fill(" ");
    return;
  }
  if (mode === 1) {
    for (let row = 0; row < y; row++) screen[row].fill(" ");
    eraseLine(screen, x, y, 1);
    return;
  }
  eraseLine(screen, x, y, 0);
  for (let row = y + 1; row < screen.length; row++) screen[row].fill(" ");
}

function eraseLine(screen, x, y, mode) {
  const line = screen[y];
  if (!line) return;
  if (mode === 2) {
    line.fill(" ");
    return;
  }
  if (mode === 1) {
    for (let column = 0; column <= x && column < line.length; column++) line[column] = " ";
    return;
  }
  for (let column = x; column < line.length; column++) line[column] = " ";
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function stringWidth(value) {
  let width = 0;
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    if (code === 0) continue;
    if (code < 32 || (code >= 0x7f && code < 0xa0)) continue;
    width += isWideCodePoint(code) ? 2 : 1;
  }
  return width;
}

function isWideCodePoint(code) {
  return (
    code >= 0x1100 && (
      code <= 0x115f ||
      code === 0x2329 ||
      code === 0x232a ||
      (code >= 0x2e80 && code <= 0xa4cf && code !== 0x303f) ||
      (code >= 0xac00 && code <= 0xd7a3) ||
      (code >= 0xf900 && code <= 0xfaff) ||
      (code >= 0xfe10 && code <= 0xfe19) ||
      (code >= 0xfe30 && code <= 0xfe6f) ||
      (code >= 0xff00 && code <= 0xff60) ||
      (code >= 0xffe0 && code <= 0xffe6) ||
      (code >= 0x1f300 && code <= 0x1faff) ||
      (code >= 0x20000 && code <= 0x3fffd)
    )
  );
}

function seedClaudeConfig({ configDir, workdir }) {
  const projectConfig = {
    allowedTools: [],
    mcpContextUris: [],
    mcpServers: {},
    enabledMcpjsonServers: [],
    disabledMcpjsonServers: [],
    hasTrustDialogAccepted: true,
    hasCompletedProjectOnboarding: true,
    projectOnboardingSeenCount: 4,
    hasClaudeMdExternalIncludesApproved: true,
    hasClaudeMdExternalIncludesWarningShown: true,
  };
  const globalConfig = {
    numStartups: 100,
    installMethod: "global",
    theme: "dark",
    hasCompletedOnboarding: true,
    lastOnboardingVersion: "2.1.132",
    lastReleaseNotesSeen: process.env.OFFICIAL_PARITY_LAST_RELEASE_NOTES_SEEN || "2.1.128",
    preferredNotifChannel: "auto",
    verbose: false,
    editorMode: "normal",
    autoCompactEnabled: true,
    showTurnDuration: true,
    hasSeenTasksHint: true,
    hasUsedBackgroundTask: true,
    tipsHistory: {
      "new-user-warmup": 100,
      "plan-mode-for-complex-tasks": 100,
      "color-when-multi-clauding": 100,
      "memory-command": 100,
      "theme-command": 100,
      "status-line": 100,
      "enter-to-steer-in-relatime": 100,
      "todo-list": 100,
      "shift-enter": 100,
      "ide-upsell-external-terminal": 100,
      "install-github-app": 100,
      "install-slack-app": 100,
      "drag-and-drop-images": 100,
      "paste-images-mac": 100,
      "double-esc-code-restore": 100,
      "continue": 100,
      "shift-tab": 100,
      "image-paste": 100,
      "custom-agents": 100,
      "desktop-app": 100,
      "web-app": 100,
      "permissions": 100,
      "rename-conversation": 100,
      "custom-commands": 100,
      "feedback-command": 100,
      "frontend-design-plugin": 100,
      "git-worktrees": 100,
      "agent-flag": 100,
      "mobile-app": 100,
    },
    memoryUsageCount: 0,
    promptQueueUseCount: 0,
    btwUseCount: 0,
    todoFeatureEnabled: true,
    showExpandedTodos: false,
    messageIdleNotifThresholdMs: 60000,
    autoConnectIde: false,
    autoInstallIdeExtension: false,
    fileCheckpointingEnabled: true,
    terminalProgressBarEnabled: false,
    cachedStatsigGates: {},
    cachedDynamicConfigs: {},
    cachedGrowthBookFeatures: {
      tengu_feedback_survey_config: { probability: 0 },
      tengu_good_survey_transcript_ask_config: { probability: 0 },
      tengu_negative_interaction_transcript_ask_config: { probability: 0 },
      tengu_post_compact_survey: false,
      tengu_desktop_upsell_v2: { enabled: false },
      tengu_prompt_suggestion: false,
    },
    respectGitignore: true,
    copyFullResponse: false,
    projects: {
      [workdir]: projectConfig,
    },
  };
  writeFileSync(join(configDir, ".claude.json"), JSON.stringify(globalConfig, null, 2), "utf8");
  writeFileSync(join(configDir, "settings.json"), JSON.stringify({
    skipDangerousModePermissionPrompt: true,
    theme: "dark",
    permissions: {
      allow: ["Bash"],
      deny: [],
    },
  }, null, 2), "utf8");
}

function copyLocalClaudeConfig(targetConfigDir, options = {}) {
  const sourceHome = process.env.OFFICIAL_PARITY_SOURCE_HOME
    || process.env.HOME
    || homedir();
  const sourceConfigDir = process.env.OFFICIAL_PARITY_SOURCE_CONFIG_DIR
    || process.env.CLAUDE_CONFIG_DIR
    || join(sourceHome, ".claude");
  const globalConfigCandidates = [
    process.env.OFFICIAL_PARITY_SOURCE_GLOBAL_CONFIG,
    process.env.CLAUDE_CONFIG_DIR ? join(process.env.CLAUDE_CONFIG_DIR, ".claude.json") : join(sourceHome, ".claude.json"),
    join(sourceConfigDir, ".claude.json"),
  ].filter(Boolean);
  for (const source of globalConfigCandidates) {
    if (!existsSync(source)) continue;
    copyIfExists(source, join(targetConfigDir, ".claude.json"));
    break;
  }
  for (const relativePath of [
    "settings.json",
    "settings.local.json",
    "cache/changelog.md",
  ]) {
    copyIfExists(join(sourceConfigDir, relativePath), join(targetConfigDir, relativePath));
  }
  if (options.scrubApiEnv) {
    scrubCopiedApiEnv(join(targetConfigDir, "settings.json"));
    scrubCopiedApiEnv(join(targetConfigDir, "settings.local.json"));
  }
  if (process.env.OFFICIAL_PARITY_LAST_RELEASE_NOTES_SEEN) {
    setCopiedGlobalConfigValue(
      join(targetConfigDir, ".claude.json"),
      "lastReleaseNotesSeen",
      process.env.OFFICIAL_PARITY_LAST_RELEASE_NOTES_SEEN,
    );
  }
}

function setCopiedGlobalConfigValue(configPath, key, value) {
  const config = existsSync(configPath)
    ? JSON.parse(readFileSync(configPath, "utf8"))
    : {};
  config[key] = value;
  writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
}

function scrubCopiedApiEnv(settingsPath) {
  if (!existsSync(settingsPath)) return;
  const settings = JSON.parse(readFileSync(settingsPath, "utf8"));
  if (!settings.env || typeof settings.env !== "object") return;
  for (const key of [
    "ANTHROPIC_BASE_URL",
    "ANTHROPIC_AUTH_TOKEN",
    "ANTHROPIC_API_KEY",
    "DEEPSEEK_BASE_URL",
    "DEEPSEEK_API_KEY",
    "OPENAI_BASE_URL",
    "OPENAI_API_KEY",
  ]) {
    delete settings.env[key];
  }
  writeFileSync(settingsPath, JSON.stringify(settings, null, 2), "utf8");
}

function copyIfExists(source, target) {
  if (!existsSync(source)) return;
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}

function diffLines(left, right) {
  if (left === right) return [];
  const leftLines = left.split("\n");
  const rightLines = right.split("\n");
  const max = Math.max(leftLines.length, rightLines.length);
  const output = [];
  for (let index = 0; index < max; index++) {
    const a = leftLines[index];
    const b = rightLines[index];
    if (a === b) continue;
    output.push(`@@ line ${index + 1} @@`);
    if (a !== undefined) output.push(`- ${a}`);
    if (b !== undefined) output.push(`+ ${b}`);
  }
  return output;
}

function tclQuote(value) {
  return `{${String(value).replace(/\\/gu, "\\\\").replace(/\}/gu, "\\}")}}`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

function truncateForError(value) {
  if (!value) return "";
  if (value.length <= 2000) return value;
  return `${value.slice(0, 2000)}\n... (${value.length - 2000} more bytes)`;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
