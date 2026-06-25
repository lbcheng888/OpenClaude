// @ts-nocheck
import {getDynamicConfig_CACHED_MAY_BE_STALE as Dk,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Oa,eO} from "../../vendor/m1456.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {K3e,Bj,__e} from "../../vendor/m3350.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {gh,G1} from "../../vendor/m3957.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {b,x} from "../../runtime.ts";
import {MS} from "../../vendor/m460.ts";
import {je} from "../../vendor/m2462.ts";
import {V3e,ole} from "../../vendor/m3348.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
import {ve} from "../../vendor/m461.ts";
import {jt} from "../../vendor/m253.ts";
/**
 * Startup announcements module.
 *
 * Loads the "tengu_startup_announcements" config (a list of announcement
 * descriptors), validates them against a zod schema, then selects which
 * announcement (if any) to surface at startup based on per-announcement
 * impression caps, model gating, and priority.
 */

/** A single startup announcement descriptor (shape validated by `Mum`). */
interface StartupAnnouncement {
  id: string;
  title?: string;
  text: string;
  priority: number;
  maxImpressions: number;
  requiresModel?: string;
}

/**
 * Read the configured startup announcements, validate them against the schema,
 * and fall back to the default (`Xwl`) when validation fails.
 */
function ekl(): StartupAnnouncement[] {
  let rawAnnouncements = Dk("tengu_startup_announcements", Xwl),
    parseResult = Mum().safeParse(rawAnnouncements);
  return parseResult.success ? parseResult.data : Xwl;
}

/**
 * True when the announcement has no model requirement, or the required model
 * (`Oa`) is currently available.
 */
function tkl(announcement: StartupAnnouncement): boolean {
  return announcement.requiresModel === void 0 || Oa(announcement.requiresModel);
}

/**
 * Pick the highest-priority announcement that hasn't exceeded its impression
 * cap and passes the model gate. When `cacheSelection` is set, memoize the
 * chosen announcement in `ojn`.
 */
function sjn(cacheSelection: boolean): StartupAnnouncement | undefined {
  if (ojn !== void 0) return ojn;
  let impressionsByAnnouncementId = Ot().announcementImpressions ?? {},
    selectedAnnouncement = ekl().filter(announcement => (impressionsByAnnouncementId[announcement.id] ?? 0) < announcement.maxImpressions && tkl(announcement)).sort((left, right) => right.priority - left.priority)[0];
  if (cacheSelection && selectedAnnouncement !== void 0) ojn = selectedAnnouncement;
  return selectedAnnouncement;
}

/**
 * Serialize the highest-priority model-eligible announcement (ignoring
 * impression caps) to JSON, or `false` when none exist.
 */
function nkl(): string | false {
  let topAnnouncement = ekl().filter(tkl).sort((left, right) => right.priority - left.priority)[0];
  if (topAnnouncement === void 0) return !1;
  return JSON.stringify({
    id: topAnnouncement.id,
    title: topAnnouncement.title,
    text: topAnnouncement.text
  });
}

/** Clear the memoized announcement selection. */
function Num(): void {
  ojn = void 0;
}

/**
 * React component rendering the current startup announcement (if any),
 * tracking an impression and reporting telemetry via `Bj`.
 */
function rkl() {
  let memoCache = Qwl.c(14),
    isReady = K3e(),
    [initialAnnouncement] = Zwl.useState(Fum),
    resolvedAnnouncement: StartupAnnouncement | undefined;
  if (memoCache[0] !== isReady || memoCache[1] !== initialAnnouncement) resolvedAnnouncement = isReady ? sjn(!0) : initialAnnouncement, memoCache[0] = isReady, memoCache[1] = initialAnnouncement, memoCache[2] = resolvedAnnouncement;else resolvedAnnouncement = memoCache[2];
  let announcement = resolvedAnnouncement,
    onImpression: () => void;
  if (memoCache[3] !== announcement) onImpression = () => {
    if (!announcement) return;
    hn(state => ({
      ...state,
      announcementImpressions: {
        ...state.announcementImpressions,
        [announcement.id]: (state.announcementImpressions?.[announcement.id] ?? 0) + 1
      }
    }));
  }, memoCache[3] = announcement, memoCache[4] = onImpression;else onImpression = memoCache[4];
  let hasAnnouncement = announcement !== void 0,
    impressionOptions: { enabled: boolean };
  if (memoCache[5] !== hasAnnouncement) impressionOptions = {
    enabled: hasAnnouncement
  }, memoCache[5] = hasAnnouncement, memoCache[6] = impressionOptions;else impressionOptions = memoCache[6];
  if (Bj("startup-announcement", onImpression, impressionOptions), !announcement) return null;
  let titleNode;
  if (memoCache[7] !== announcement.title) titleNode = announcement.title ? dGt.jsx(v, {
    color: "claude",
    children: announcement.title
  }) : null, memoCache[7] = announcement.title, memoCache[8] = titleNode;else titleNode = memoCache[8];
  let textNode;
  if (memoCache[9] !== announcement.text) textNode = dGt.jsx(gh, {
    children: announcement.text
  }), memoCache[9] = announcement.text, memoCache[10] = textNode;else textNode = memoCache[10];
  let renderedAnnouncement;
  if (memoCache[11] !== titleNode || memoCache[12] !== textNode) renderedAnnouncement = dGt.jsxs($, {
    flexDirection: "column",
    children: [titleNode, textNode]
  }), memoCache[11] = titleNode, memoCache[12] = textNode, memoCache[13] = renderedAnnouncement;else renderedAnnouncement = memoCache[13];
  return renderedAnnouncement;
}

/** Initial selection (no caching) used to seed the component's state. */
function Fum(): StartupAnnouncement | undefined {
  return sjn(!1);
}
var Qwl, Zwl, dGt, Mum, Xwl, ojn;
var EHo = b(() => {
  MS();
  je();
  jn();
  tr();
  eO();
  V3e();
  G1();
  __e();
  Qwl = x(tt(), 1), Zwl = x(et(), 1), dGt = x(oe(), 1), Mum = ve(() => jt.array(jt.object({
    id: jt.string(),
    title: jt.string().optional(),
    text: jt.string(),
    priority: jt.number().default(0),
    maxImpressions: jt.number().default(3),
    requiresModel: jt.string().optional()
  })).default([])), Xwl = [];
  ole(Num);
});

export {ekl,tkl,sjn,nkl,Num,rkl,Fum,Qwl,Zwl,dGt,Mum,Xwl,ojn,EHo};
