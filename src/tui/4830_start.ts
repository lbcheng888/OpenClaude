// @ts-nocheck
import {Text as v} from "../../vendor/m2433.ts";
import {wY,kxe,Hye,Xdt,Qdt} from "../telemetry/4101_level.ts";
import {K3e,Bj,__e} from "../../vendor/m3350.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve} from "../../vendor/m5.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {initY_ as y_,bye} from "../../vendor/m4018.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {V3e,ole} from "../../vendor/m3348.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/** Find ranges of slash-command tokens (e.g. "/help") within a text string. */
function tjn(text: string): Array<{ start: number; end: number }> {
  let ranges: Array<{ start: number; end: number }> = [],
    slashCommandRegex = /(^|[\s\u3002\u3001\uFF1F\uFF01])(\/[a-zA-Z][a-zA-Z0-9.:\-_]*)/g,
    match: RegExpExecArray | null = null;
  while ((match = slashCommandRegex.exec(text)) !== null) {
    let leadingSep = match[1] ?? "",
      command = (match[2] ?? "").replace(/\.+$/, ""),
      startIndex = match.index + leadingSep.length;
    ranges.push({
      start: startIndex,
      end: startIndex + command.length
    });
  }
  return ranges;
}

/** Render a line of announcement text, highlighting any embedded slash commands. */
function Rum(props: { text: string; style?: string }) {
  let cache = njn.c(9),
    {
      text: text,
      style: style
    } = props,
    children;
  if (cache[0] !== text) {
    children = [];
    let cursor = 0;
    for (let {
      start: rangeStart,
      end: rangeEnd
    } of tjn(text)) {
      if (rangeStart > cursor) children.push(text.slice(cursor, rangeStart));
      let commandText = text.slice(rangeStart, rangeEnd).replace(/[:\-_]+$/, "");
      children.push(mN.jsx(v, {
        bold: !0,
        color: "permission",
        children: commandText
      }, rangeStart)), cursor = rangeStart + commandText.length;
    }
    if (cursor < text.length) {
      let tail;
      if (cache[2] !== cursor || cache[3] !== text) tail = text.slice(cursor), cache[2] = cursor, cache[3] = text, cache[4] = tail;else tail = cache[4];
      children.push(tail);
    }
    cache[0] = text, cache[1] = children;
  } else children = cache[1];
  let isBold = style === "bold",
    isDim = style === "dim",
    element;
  if (cache[5] !== children || cache[6] !== isBold || cache[7] !== isDim) element = mN.jsx(v, {
    bold: isBold,
    dimColor: isDim,
    children: children
  }), cache[5] = children, cache[6] = isBold, cache[7] = isDim, cache[8] = element;else element = cache[8];
  return element;
}

/** Whether a feature-of-the-week nudge is eligible to show right now. */
function rjn(): boolean {
  if (!wY()?.command) return !1;
  if (kxe()) return Hye() !== null;
  return Xdt();
}

/** Resolve (and optionally cache) the current nudge campaign descriptor. */
function vum(shouldCache: boolean) {
  if (UPe !== null) return UPe;
  if (!rjn()) return null;
  let campaign = wY();
  if (!campaign) return null;
  let nudge = {
    variant: kxe() ? "credit" : "upsell",
    campaign: campaign,
    cached: Hye()
  };
  if (shouldCache) UPe = nudge;
  return nudge;
}

/** Clear the cached nudge descriptor. */
function wum() {
  UPe = null;
}

/** Container that decides whether to render the feature-of-the-week nudge. */
function qwl() {
  let cache = njn.c(4),
    shouldCache = K3e(),
    nudge;
  if (cache[0] !== shouldCache) nudge = vum(shouldCache), cache[0] = shouldCache, cache[1] = nudge;else nudge = cache[1];
  let resolved = nudge;
  if (resolved === null) return null;
  let element;
  if (cache[2] !== resolved.variant) element = mN.jsx(kum, {
    variant: resolved.variant
  }), cache[2] = resolved.variant, cache[3] = element;else element = cache[3];
  return element;
}

/** Renders the feature-of-the-week nudge body for both upsell and credit variants. */
function kum(props: { variant: "upsell" | "credit" }) {
  let cache = njn.c(23),
    {
      variant: variant
    } = props,
    [initial] = $wl.useState(Ium),
    campaign = UPe !== null ? UPe.campaign : initial.campaign,
    cached = UPe !== null ? UPe.cached : initial.cached,
    isEnabled = Boolean(campaign?.command) && (variant === "upsell" || cached !== null),
    onShown;
  if (cache[0] !== campaign || cache[1] !== variant) onShown = () => {
    if (!campaign) return;
    W("tengu_fotw_nudge_shown", {
      feature: campaign.feature,
      campaign: Ve("feature_of_the_week"),
      audience: Ve(variant === "credit" ? "claimant" : "viewer")
    });
  }, cache[0] = campaign, cache[1] = variant, cache[2] = onShown;else onShown = cache[2];
  let shownOptions;
  if (cache[3] !== isEnabled) shownOptions = {
    enabled: isEnabled
  }, cache[3] = isEnabled, cache[4] = shownOptions;else shownOptions = cache[4];
  if (Bj("fotw-nudge", onShown, shownOptions), !campaign?.command) return null;
  let showCommandChip = campaign.hideCommandChip !== !0,
    header;
  if (cache[5] !== campaign.announcementLines || cache[6] !== campaign.command || cache[7] !== campaign.commandBlurb || cache[8] !== campaign.titleLabel || cache[9] !== showCommandChip) header = campaign.announcementLines?.length ? mN.jsx($, {
    flexDirection: "column",
    children: campaign.announcementLines.map(Hum)
  }) : mN.jsxs(v, {
    children: [mN.jsx(v, {
      bold: !0,
      children: campaign.titleLabel ?? "Feature of the week:"
    }), showCommandChip ? mN.jsxs(mN.Fragment, {
      children: [" ", mN.jsxs(v, {
        bold: !0,
        color: "permission",
        children: ["/", campaign.command]
      })]
    }) : null, campaign.commandBlurb ? `${showCommandChip ? " \u2014 " : " "}${campaign.commandBlurb}` : ""]
  }), cache[5] = campaign.announcementLines, cache[6] = campaign.command, cache[7] = campaign.commandBlurb, cache[8] = campaign.titleLabel, cache[9] = showCommandChip, cache[10] = header;else header = cache[10];
  let headerElement = header;
  if (variant === "upsell") {
    let upsellElement;
    if (cache[11] !== headerElement) upsellElement = mN.jsx($, {
      flexDirection: "column",
      children: headerElement
    }), cache[11] = headerElement, cache[12] = upsellElement;else upsellElement = cache[12];
    return upsellElement;
  }
  if (cached === null) return null;
  let formattedAmount;
  if (cache[13] !== cached.amountMinorUnits || cache[14] !== cached.currency) formattedAmount = y_(cached.amountMinorUnits, cached.currency, "fit"), cache[13] = cached.amountMinorUnits, cache[14] = cached.currency, cache[15] = formattedAmount;else formattedAmount = cache[15];
  let amount = formattedAmount,
    redeemBySuffix = campaign.redeemBy ? ` \xB7 Redeem by ${campaign.redeemBy}` : "",
    creditLine;
  if (cache[16] !== amount || cache[17] !== redeemBySuffix) creditLine = mN.jsxs(v, {
    children: ["Get ", amount, " in usage credits when you run it", redeemBySuffix]
  }), cache[16] = amount, cache[17] = redeemBySuffix, cache[18] = creditLine;else creditLine = cache[18];
  let termsLine;
  if (cache[19] === Symbol.for("react.memo_cache_sentinel")) termsLine = mN.jsxs(v, {
    dimColor: !0,
    children: ["Terms apply: ", Aum]
  }), cache[19] = termsLine;else termsLine = cache[19];
  let creditElement;
  if (cache[20] !== headerElement || cache[21] !== creditLine) creditElement = mN.jsxs($, {
    flexDirection: "column",
    children: [headerElement, creditLine, termsLine]
  }), cache[20] = headerElement, cache[21] = creditLine, cache[22] = creditElement;else creditElement = cache[22];
  return creditElement;
}

/** Map an announcement line descriptor to a rendered AnnouncementLine element. */
function Hum(line: { text: string; style?: string }, index: number) {
  return mN.jsx(Rum, {
    text: line.text,
    style: line.style
  }, index);
}

/** Initial state factory for the nudge component (campaign + cached credit). */
function Ium() {
  return {
    campaign: wY(),
    cached: Hye()
  };
}
var njn: any,
  $wl: any,
  mN: any,
  Aum = "https://www.anthropic.com/legal/promotion-terms",
  UPe: any = null;
var Wwl = b(() => {
  je();
  kt();
  Qdt();
  bye();
  V3e();
  __e();
  njn = x(tt(), 1), $wl = x(et(), 1), mN = x(oe(), 1);
  ole(wum);
});

export {tjn,Rum,rjn,vum,wum,qwl,kum,Hum,Ium,njn,$wl,mN,Aum,UPe,Wwl};
