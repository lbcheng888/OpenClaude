// @ts-nocheck
import {getInitialSettings,yr as v8} from "../config/0740_updateSettingsForSource.ts";
import {GLOBAL_CONFIG_KEYS,DEFAULT_GLOBAL_CONFIG,Qn as O8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {$Qe as xoH,Ug as QA} from "../../vendor/m2264.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
// 配置差异报告模块：检测环境变量、全局配置、本地配置、CLI 配置中与默认值不同的设置项，
// 用于生成 /status 等命令的调试信息。

// 跨模块依赖(混淆名保持，编译期擦除)
declare const getInitialSettings: () => Record<string, any>;
declare const v8: () => void;
declare const GLOBAL_CONFIG_KEYS: string[];
declare const DEFAULT_GLOBAL_CONFIG: Record<string, any>;
declare const O8: () => void;
declare const xoH: string[];
declare const QA: () => void;
declare const L: (fn: () => void) => any;

/**
 * 当前进程环境变量中，以 CLAUDE_CODE_ 或 ANTHROPIC_ 开头且不在排除列表中的键名列表。
 * @param env - 环境变量对象（默认 process.env）
 */
function getRelevantEnvVarNames(env: Record<string, string | undefined> = process.env): string[] {
    let result: string[] = [];
    for (let key in env)
        if (
            (key.startsWith("CLAUDE_CODE_") || key.startsWith("ANTHROPIC_")) &&
            !EXCLUDED_ENV_VARS.has(key) &&
            env[key] !== undefined &&
            env[key] !== ""
        )
            result.push(key);
    return result.sort();
}

/**
 * 全局配置中，与默认值不同的键名列表。
 * @param globalConfig - 当前全局配置对象
 */
function getNonDefaultGlobalConfigKeys(globalConfig: Record<string, any>): string[] {
    let initialSettings = getInitialSettings(),
        result: string[] = [];
    for (let key of GLOBAL_CONFIG_KEYS) {
        if (EXCLUDED_GLOBAL_CONFIG_KEYS.has(key)) continue;
        let currentValue = (xoH.includes(key) ? initialSettings[key] : undefined) ?? globalConfig[key],
            defaultValue = DEFAULT_GLOBAL_CONFIG[key];
        if (currentValue === undefined || isEffectivelyDefault(currentValue, defaultValue)) continue;
        result.push(key);
    }
    return result;
}

/**
 * 本地配置（project config）中，存在值的键名列表。
 * @param localConfig - 本地配置对象
 */
function getNonDefaultLocalConfigKeys(localConfig: Record<string, any>): string[] {
    let result: string[] = [];
    for (let key of LOCAL_CONFIG_KEYS)
        if (localConfig[key] !== undefined) result.push(key);
    if (localConfig.permissions?.defaultMode !== undefined) result.push("permissions.defaultMode");
    if (localConfig.worktree?.baseRef !== undefined) result.push("worktree.baseRef");
    return result.sort();
}

/**
 * CLI 配置中，来源为 "cli" 的键名列表。
 * @param cliConfig - CLI 配置对象
 * @param getSource - 返回每个键的来源字符串的函数
 */
function getNonDefaultCliConfigKeys(cliConfig: Record<string, any>, getSource: (key: string) => string): string[] {
    let result: string[] = [];
    for (let key in cliConfig)
        if (getSource(key) === "cli") result.push(key);
    return result.sort();
}

/**
 * 值是否等同于默认值（含空对象视为默认值）。
 */
function isEffectivelyDefault(value: any, defaultValue: any): boolean {
    if (value === defaultValue) return true;
    if (typeof value === "object" && value !== null) return Object.keys(value).length === 0;
    return false;
}

var EXCLUDED_ENV_VARS: Set<string>, EXCLUDED_GLOBAL_CONFIG_KEYS: Set<string>, LOCAL_CONFIG_KEYS: string[];

/** 模块初始化 lazy thunk */
var initInstalledMarketplacesTelemetry = L(() => {
    O8();
    QA();
    v8();
    EXCLUDED_ENV_VARS = new Set(["CLAUDE_CODE_ENTRYPOINT"]);
    EXCLUDED_GLOBAL_CONFIG_KEYS = new Set([
        "tipsHistory",
        "installMethod",
        "shiftEnterKeyBindingInstalled",
        "hasUsedBackslashReturn",
        "hasCompletedClaudeInChromeOnboarding",
        "remoteDialogSeen",
        "lspRecommendationIgnoredCount",
        "autoUpdates",
        "autoUpdatesProtectedForNative",
    ]);
    LOCAL_CONFIG_KEYS = [
        "model",
        "outputStyle",
        "language",
        "effortLevel",
        "fastMode",
        "alwaysThinkingEnabled",
        "spinnerTipsEnabled",
        "prefersReducedMotion",
        "promptSuggestionEnabled",
        "awaySummaryEnabled",
        "precomputeCompactionEnabled",
        "switchModelsOnFlag",
        "autoUpdatesChannel",
        "viewMode",
        "syntaxHighlightingDisabled",
        "useAutoModeDuringPlan",
        "enableWorkflows",
        "disableWorkflows",
        "disableArtifact",
        "workflowKeywordTriggerEnabled",
        "autoCompactWindow",
        "cleanupPeriodDays",
        "forceLoginMethod",
    ];
});

export {getRelevantEnvVarNames as yrc,getNonDefaultGlobalConfigKeys as Trc,getNonDefaultLocalConfigKeys as Src,getNonDefaultCliConfigKeys as brc,isEffectivelyDefault as R9m,EXCLUDED_ENV_VARS as C9m,EXCLUDED_GLOBAL_CONFIG_KEYS as v9m,LOCAL_CONFIG_KEYS as w9m,initInstalledMarketplacesTelemetry as Erc};
