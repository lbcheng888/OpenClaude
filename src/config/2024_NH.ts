// @ts-nocheck
import {getCanonicalName,Mo as Qq} from "../permissions/1453_swapShrinksContextWindow.ts";
import {getGlobalConfig,Qn as O8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as j_,zn as t6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {usesFirstPartyModelIds,li as $7} from "../api/1282_usesFirstPartyModelIds.ts";
import {b as L} from "../../runtime.ts";
import {B3 as Pm} from "../../vendor/m453.ts";
import {sn as apiMetricsId} from "./0047_namespace.ts";
import {wn as h6} from "../../vendor/m45.ts";
import {st as T_,_l as D4} from "../../vendor/m5.ts";
// @ts-nocheck
// 模型分类工具：判断模型是否为 Fable/Mythos 系列、是否使用简化 system prompt，
// 以及把模型字符串映射到 API 指标名（falcon / sonnet_4_5 / haiku_4_5 / opus / sonnet / haiku / base）。

// 跨模块依赖（混淆名保持，编译期擦除）
declare const getCanonicalName: (model: string) => string;
declare const Qq: any;
declare const getGlobalConfig: () => any;
declare const O8: any;
declare const j_: (key: string, defaultValue: any) => any;
declare const t6: any;
declare const usesFirstPartyModelIds: () => boolean;
declare const $7: any;
declare const L: (fn: () => void) => any;
declare const Pm: any;
declare const apiMetricsId: any;
declare const h6: <T>(fn: (...args: any[]) => T) => (...args: any[]) => T;
declare const T_: (val: any) => boolean;
declare const D4: (val: any) => boolean;

/** Fable-5 / Mythos-5 の exact match 判定 */
function isFable5OrMythos5(modelId: string): boolean {
  if (modelId === "claude-fable-5" || modelId === "claude-mythos-5") return !0;
  return !1;
}

/** モデル ID が Fable シリーズかどうか */
function isFableSeriesModel(modelId: string): boolean {
  return modelId.startsWith("claude-fable-");
}

/** モデル ID が Mythos シリーズかどうか */
function isMythosSeriesModel(modelId: string): boolean {
  return modelId.startsWith("claude-mythos-");
}

/** 常に false を返すスタブ（将来の拡張用プレースホルダ） */
function alwaysFalse(modelId: string): boolean {
  return !1;
}

/**
 * モデル ID を API メトリクスカテゴリに変換する。
 * Fable5/Mythos5 → "falcon", sonnet_4_5 → "sonnet_4_5", haiku_4_5 → "haiku_4_5",
 * opus 含む → "opus", sonnet 含む → "sonnet", haiku 含む → "haiku", その他 → "base"
 */
function getModelMetricsCategory(modelId: string): "falcon" | "sonnet_4_5" | "haiku_4_5" | "opus" | "sonnet" | "haiku" | "base" {
  if (isFable5OrMythos5(modelId)) return "falcon";
  if (modelId === "claude-sonnet-4-5") return "sonnet_4_5";
  if (modelId === "claude-haiku-4-5") return "haiku_4_5";
  if (modelId.includes("opus")) return "opus";
  if (modelId.includes("sonnet")) return "sonnet";
  if (modelId.includes("haiku")) return "haiku";
  return "base";
}

/**
 * ベースのメトリクス名にモデルカテゴリのサフィックスを付与する。
 * カテゴリが "base" の場合はサフィックスなし。
 */
function buildMetricsNameWithSuffix(baseName: string, modelId: string): string {
  let category = getModelMetricsCategory(modelId);
  return category === "base" ? baseName : `${baseName}_${category}`;
}

/** モデル ID が EAP (Early Access Preview) バリアントかどうか */
function isEapModelVariant(modelId: string): boolean {
  return /-eap($|\[)/i.test(modelId);
}

/**
 * 指定モデルが「簡易 system prompt」モードに該当するかどうかを返す。
 * グローバル設定の simple_system_prompt キャッシュまたは GrowthBook フラグを参照する。
 */
function shouldUseSimpleSystemPromptForModel(modelId: string): boolean {
  let canonicalName = getCanonicalName(modelId);
  let cachedSetting = getGlobalConfig().clientDataCache?.simple_system_prompt;
  if (typeof cachedSetting === "object" && cachedSetting !== null && Object.entries(cachedSetting).some(([key, val]: [string, any]) => val === !0 && canonicalName.includes(key))) return !0;
  let featureFlag = j_("tengu_velvet_cascade", null);
  if (typeof featureFlag !== "object" || featureFlag === null || !("models" in featureFlag) || !Array.isArray(featureFlag.models)) return !1;
  return featureFlag.models.some((entry: any) => typeof entry === "string" && canonicalName.includes(entry));
}

/**
 * 指定モデルに対して複雑な system prompt を使うべきかどうかを返す。
 * EAP モデル・古い Claude3/haiku/sonnet/特定 opus → true（複雑 prompt 必要）。
 * Opus4.8 / Fable5 / Mythos5 → false（简易で OK）。
 * それ以外はファーストパーティモデルでない場合のみ true。
 */
function requiresComplexSystemPrompt(modelId: string): boolean {
  if (isEapModelVariant(modelId)) return !1;
  let canonicalName = getCanonicalName(modelId);
  if (canonicalName.includes("claude-3-") || canonicalName.includes("haiku") || canonicalName.includes("sonnet") || canonicalName === "claude-opus-4-0" || canonicalName === "claude-opus-4-1" || canonicalName === "claude-opus-4-5" || canonicalName === "claude-opus-4-6" || canonicalName === "claude-opus-4-7") return !0;
  if (canonicalName === "claude-opus-4-8" || canonicalName === "claude-fable-5" || canonicalName === "claude-mythos-5") return !1;
  return !usesFirstPartyModelIds();
}

/** memoized: 与えられたモデルに対してシンプル system prompt を使うべきかを判定するキャッシュ付き関数 */
var useSimpleSystemPromptCached: (modelId: string) => boolean;

/** 初期化ランブル: 依存モジュールを起動し useSimpleSystemPromptCached を初期化 */
var yG = L(() => {
  Pm();
  t6();
  O8();
  apiMetricsId();
  Qq();
  $7();
  useSimpleSystemPromptCached = h6((modelId: string) => {
    if (!modelId) return !1;
    if (T_(process.env.CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT)) return !0;
    if (D4(process.env.CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT)) return !1;
    return !requiresComplexSystemPrompt(modelId) || shouldUseSimpleSystemPromptForModel(modelId);
  });
});
export {isFable5OrMythos5 as zQ,isFableSeriesModel as XAn,isMythosSeriesModel as kti,alwaysFalse as Hti,getModelMetricsCategory as hkt,buildMetricsNameWithSuffix as lXe,isEapModelVariant as dfe,shouldUseSimpleSystemPromptForModel as FWu,requiresComplexSystemPrompt as UWu,useSimpleSystemPromptCached as Dh,yG as NH};
