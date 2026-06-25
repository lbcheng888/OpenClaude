// @ts-nocheck
import {sn,mc} from "../../vendor/m237.ts";
import {truncateToWidth as xs,truncateToWidthNoEllipsis as Fre,truncate as Ha} from "../../vendor/m239.ts";
import {IU} from "../../vendor/m5.ts";
import {getDirectConnectServerUrl as Usr,lt} from "../session/0132_sent.ts";
import {dd,Xl} from "./0651_maxBytes.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {Ne} from "../../vendor/m583.ts";
import {getAPIProvider as Rr,THIRD_PARTY_PROVIDER_LABELS as hQ,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {isClaudeAISubscriber as Eo,getSubscriptionName as Kyn,lo} from "./2036_withOAuthRefreshLock.ts";
import {getInitialSettings as Fr,br} from "./0745_updateSettingsForSource.ts";
import {vzn,eGt,CWe} from "../../vendor/m4794.ts";
import {fE} from "../../vendor/m2214.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
import {Xo} from "../../vendor/m240.ts";
/**
 * Status-line layout helpers for the Claude Code CLI.
 * Computes left/right column widths, truncates paths and model/billing labels,
 * builds the welcome banner, and assembles the footer status info.
 */

/** Pick the status-line layout mode based on the available terminal width. */
function Uzn(totalWidth: number): "horizontal" | "compact" {
  if (totalWidth >= 70) return "horizontal";
  return "compact";
}

/**
 * Compute the column widths for the status line.
 * In "horizontal" mode the left column is fixed and the right column fills the
 * remaining space (clamped to a minimum); otherwise both columns share one width.
 */
function Rvl(
  termWidth: number,
  mode: string,
  desiredLeftWidth: number
): { leftWidth: number; rightWidth: number; totalWidth: number } {
  if (mode === "horizontal") {
    let leftWidth = desiredLeftWidth,
      reserved = sHo + Bzn + Fzn + leftWidth,
      available = termWidth - reserved,
      rightWidth = Math.max(30, available),
      blockWidth = Math.min(leftWidth + rightWidth + Fzn + Bzn, termWidth - sHo);
    if (blockWidth < leftWidth + rightWidth + Fzn + Bzn) rightWidth = blockWidth - leftWidth - Fzn - Bzn;
    return {
      leftWidth: leftWidth,
      rightWidth: rightWidth,
      totalWidth: blockWidth
    };
  }
  let sharedWidth = Math.min(termWidth - sHo, Avl + 20);
  return {
    leftWidth: sharedWidth,
    rightWidth: sharedWidth,
    totalWidth: sharedWidth
  };
}

/** Compute a column width from the widest of three label strings, capped at the max. */
function vvl(label1: string, label2: string, label3: string): number {
  let widest = Math.max(sn(label1), sn(label2), sn(label3), 20);
  return Math.min(widest + 4, Avl);
}

/** Build the welcome banner; omits the name when missing or too long. */
function $zn(name?: string): string {
  if (!name || name.length > Wcm) return "Welcome back!";
  return `Welcome back ${name}!`;
}

/**
 * Truncate a slash-separated path to fit within `maxWidth` display columns,
 * preferring to keep the first and last segments and elide the middle with "…".
 */
function NPe(path: string, maxWidth: number): string {
  if (sn(path) <= maxWidth) return path;
  let sep = "/",
    ellipsis = "…",
    sepWidth = 1,
    ellipsisWidth = 1,
    segments = path.split(sep),
    firstSegment = segments[0] || "",
    lastSegment = segments.at(-1) || "",
    firstWidth = sn(firstSegment),
    lastWidth = sn(lastSegment);
  if (segments.length === 1) return xs(path, maxWidth);
  if (firstSegment === "" && sepWidth + ellipsisWidth + lastWidth >= maxWidth) return `${sep}${xs(lastSegment, Math.max(1, maxWidth - ellipsisWidth))}`;
  if (firstSegment !== "" && sepWidth * 2 + ellipsisWidth + lastWidth >= maxWidth) return `${ellipsis}${sep}${xs(lastSegment, Math.max(1, maxWidth - sepWidth - ellipsisWidth))}`;
  if (segments.length === 2) {
    let firstBudget = maxWidth - sepWidth - ellipsisWidth - lastWidth;
    return `${Fre(firstSegment, firstBudget)}${ellipsis}${sep}${lastSegment}`;
  }
  let middleBudget = maxWidth - firstWidth - lastWidth - sepWidth - 2 * ellipsisWidth;
  if (middleBudget <= 0) {
    let firstBudget = Math.max(0, maxWidth - lastWidth - sepWidth - 2 * ellipsisWidth);
    return `${Fre(firstSegment, firstBudget)}${sep}${ellipsis}${sep}${lastSegment}`;
  }
  let kept: string[] = [];
  for (let idx = segments.length - 2; idx > 0; idx--) {
    let segment = segments[idx];
    if (segment && sn(segment) + ellipsisWidth <= middleBudget) kept.unshift(segment), middleBudget -= sn(segment) + ellipsisWidth;else break;
  }
  if (kept.length === 0) return `${firstSegment}${sep}${ellipsis}${sep}${lastSegment}`;
  return `${firstSegment}${sep}${ellipsis}${sep}${kept.join(sep)}${sep}${lastSegment}`;
}

/** Assemble the footer status info: version string, cwd label, billing type, and agent name. */
function Jht(): { version: string; cwd: string; billingType: string; agentName: any } {
  let version = process.env.DEMO_VERSION ?? `${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION}${IU()}`,
    serverUrl = Usr(),
    cwdLabel = process.env.DEMO_VERSION ? "/code/claude" : dd(Lt()),
    cwd = Ne.CLAUDE_CODE_HIDE_CWD ? "" : serverUrl ? `${cwdLabel} in ${serverUrl.replace(/^https?:\/\//, "")}` : cwdLabel,
    provider = Rr(),
    billingType = provider !== "firstParty" ? hQ[provider] : Eo() ? Kyn() : "API Usage Billing",
    agentName = Fr().agent;
  return {
    version: version,
    cwd: cwd,
    billingType: billingType,
    agentName: agentName
  };
}

/**
 * Decide whether the model and billing labels fit on one line; if not, signal a
 * split and truncate each independently, otherwise keep billing and fit the model.
 */
function wvl(
  model: string,
  billing: string,
  maxWidth: number
): { shouldSplit: boolean; truncatedModel: string; truncatedBilling: string } {
  if (sn(model) + 3 + sn(billing) > maxWidth) return {
    shouldSplit: !0,
    truncatedModel: Ha(model, maxWidth),
    truncatedBilling: Ha(billing, maxWidth)
  };
  return {
    shouldSplit: !1,
    truncatedModel: Ha(model, Math.max(maxWidth - sn(billing) - 3, 10)),
    truncatedBilling: billing
  };
}

/** Collect recent items from the most-relevant top-3 groups, capped at `limit`. */
function kvl(limit: number): any[] {
  let raw = vzn();
  if (!raw) return [];
  let parsed: any;
  try {
    parsed = eGt(raw);
  } catch {
    return [];
  }
  let collected: any[] = [],
    topKeys = Object.keys(parsed).sort((a, b) => fE(a, b) ? -1 : 1).slice(0, 3);
  for (let key of topKeys) {
    let items = parsed[key];
    if (items) collected.push(...items);
  }
  return collected.slice(0, limit);
}

/** Max shared column width. */
var Avl = 50,
  /** Max welcome-name length before the banner falls back to the generic greeting. */
  Wcm = 20,
  /** Horizontal padding/margin reserved outside the columns. */
  sHo = 4,
  /** Inner gutter width. */
  Fzn = 1,
  /** Border/gap width between columns. */
  Bzn = 2;
var nGt = b(() => {
  lt();
  mc();
  lo();
  Po();
  Ir();
  Xl();
  Xo();
  Ps();
  CWe();
  br();
});

export {Uzn,Rvl,vvl,$zn,NPe,Jht,wvl,kvl,Avl,Wcm,sHo,Fzn,Bzn,nGt};
