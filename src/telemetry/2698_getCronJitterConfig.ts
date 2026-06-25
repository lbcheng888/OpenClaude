// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {K7 as iS,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {sW as Fg,iW as kp} from "../../vendor/m2696.ts";
import {Qr as a8} from "../../vendor/m323.ts";
import {ve as kH} from "../../vendor/m461.ts";
import {C as k} from "../../vendor/m321.ts";
var BL7 = {};
j_(BL7, {
  getCronJitterConfig: () => getCronJitterConfig
});

/** Configuration shape for cron scheduler jitter behaviour. */
interface CronJitterConfig {
  /** Fraction of the period to delay recurring tasks (0–1). */
  recurringFrac: number;
  /** Maximum jitter cap in ms for recurring tasks. */
  recurringCapMs: number;
  /** Maximum jitter applied to one-shot tasks in ms. */
  oneShotMaxMs: number;
  /** Minimum (floor) jitter applied to one-shot tasks in ms. */
  oneShotFloorMs: number;
  /** Tasks whose next-fire minute is divisible by this get jitter applied. */
  oneShotMinuteMod: number;
  /** Recurring tasks older than this ms are expired after their next fire. */
  recurringMaxAgeMs: number;
  /** How many ms before the next fire time to wake the scheduler early for cache-warmup. */
  cacheLeadMs: number;
}

/**
 * Returns the active cron jitter configuration.
 *
 * Reads the `tengu_kairos_cron_config` feature-flag value (cached for
 * `DEFAULT_CONFIG_CACHE_TTL_MS`), validates it against the Zod schema, and
 * falls back to `DEFAULT_CRON_JITTER_CONFIG` on validation failure.
 */
function getCronJitterConfig(): CronJitterConfig {
  let rawConfig = iS("tengu_kairos_cron_config", Fg, jz3),
    parseResult = getCronJitterConfigSchema().safeParse(rawConfig);
  return parseResult.success ? parseResult.data : Fg;
}

/** TTL in ms for the feature-flag config cache (1 minute). */
var jz3 = 60000,
  /** Upper bound in ms used for recurringCapMs, oneShotMaxMs, oneShotFloorMs fields (30 minutes). */
  yu8 = 1800000,
  /** Upper bound in ms used for recurringMaxAgeMs field (30 days). */
  Jz3 = 2592000000,
  /** Lazily-initialized Zod schema for {@link CronJitterConfig}. */
  getCronJitterConfigSchema: () => import("zod").ZodEffects<import("zod").ZodObject<any>>;
var ML_ = L(() => {
  a8();
  o6();
  kp();
  getCronJitterConfigSchema = kH(() => k.object({
    recurringFrac: k.number().min(0).max(1),
    recurringCapMs: k.number().int().min(0).max(yu8),
    oneShotMaxMs: k.number().int().min(0).max(yu8),
    oneShotFloorMs: k.number().int().min(0).max(yu8),
    oneShotMinuteMod: k.number().int().min(1).max(60),
    recurringMaxAgeMs: k.number().int().min(0).max(Jz3).default(Fg.recurringMaxAgeMs),
    cacheLeadMs: k.number().int().min(0).max(60000).default(Fg.cacheLeadMs)
  }).refine(cfg => cfg.oneShotFloorMs <= cfg.oneShotMaxMs));
});
export {BL7 as N9i,getCronJitterConfig,jz3 as EPd,yu8 as kVr,Jz3 as CPd,getCronJitterConfigSchema as APd,ML_ as iMt};
