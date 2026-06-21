// @ts-nocheck
import {getOauthAccountInfo,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {useIsScreenReaderEnabled} from "../../vendor/m2434.ts";
import {mr,ki} from "../../vendor/m2453.ts";
import {Vki,Kki,D9r,P0t} from "../../vendor/m2514.ts";
import {mt,configProtoStore} from "../../vendor/m2458.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {I_l,Fmt,eGn,tGn,FDe,k_l,x_l,Bjt} from "../config/4776_leftWidth.ts";
import {Rgl,Vje} from "../../vendor/m4762.ts";
import {aIe,jL} from "../../vendor/m3944.ts";
import {parseUserSpecifiedModel,renderModelSetting,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {gQe,Om} from "../config/2215_level.ts";
import {truncate} from "../../vendor/m237.ts";
import {getProTrialState,formatTrialBadge,$mt} from "../../vendor/m4779.ts";
import {Text} from "../../vendor/m2423.ts";
import {je} from "../../vendor/m577.ts";
import {z_l,Y_l} from "../config/4782_columns.ts";
import {H4,Yfe} from "../../vendor/m2265.ts";
import {bc,Ug} from "../../vendor/m2264.ts";
import {No} from "../../vendor/m2421.ts";
import {tn,Hc} from "../../vendor/m235.ts";
import {Box} from "../../vendor/m2422.ts";
import {UY,r$t} from "../../vendor/m3949.ts";
import {bP,Vhe} from "../../vendor/m3282.ts";
import {U_l,$_l,q_l} from "../../vendor/m4778.ts";
import {N_l,B_l} from "../../vendor/m4777.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {ps} from "../../vendor/m238.ts";
import {Lr} from "../../vendor/m578.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function Q_l() {
  let reactCache = J_l.c(63),
    oauthInfo = getOauthAccountInfo(),
    displayName = oauthInfo?.displayName ?? "",
    isScreenReader = useIsScreenReaderEnabled(),
    {
      columns: terminalColumns
    } = mr(),
    themeCtx: any;
  // Initialize theme from memo cache (sentinel check for first render)
  if (reactCache[0] === Symbol.for("react.memo_cache_sentinel")) themeCtx = Vki(), reactCache[0] = themeCtx;else themeCtx = reactCache[0];
  let currentTheme = themeCtx,
    agentName = mt($em),
    // agent name from proto store
    effortValue = mt(Uem),
    // effort value from proto store
    globalConfig = getGlobalConfig(),
    releaseNotes: any;
  try {
    releaseNotes = I_l(3);
  } catch {
    releaseNotes = [];
  }
  let {
      hasReleaseNotes: hasNewReleaseNotes
    } = Rgl(globalConfig.lastReleaseNotesSeen),
    markNotesSeenCallback: any,
    markNotesSeenDeps: any;
  // Memoize the callback to mark release notes as seen
  if (reactCache[1] !== currentTheme) markNotesSeenCallback = () => {
    if (getGlobalConfig().lastReleaseNotesSeen === {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION) return;
    if (saveGlobalConfig(Fem), currentTheme) Kki();
  }, markNotesSeenDeps = [globalConfig, currentTheme], reactCache[1] = currentTheme, reactCache[2] = markNotesSeenCallback, reactCache[3] = markNotesSeenDeps;else markNotesSeenCallback = reactCache[2], markNotesSeenDeps = reactCache[3];
  // Effect: mark release notes as seen when component mounts or theme changes
  X_l.useEffect(markNotesSeenCallback, markNotesSeenDeps);
  let modelProvider = aIe(),
    parsedModel = parseUserSpecifiedModel(modelProvider),
    modelLabel = renderModelSetting(modelProvider),
    {
      version: appVersion,
      cwd: currentWorkingDir,
      billingType: billingTypeLabel,
      agentName: configAgentName
    } = Fmt(),
    resolvedAgentName = agentName ?? configAgentName,
    effortSuffix = gQe(parsedModel, effortValue),
    // e.g. " (high effort)"
    fullModelLabel = modelLabel + effortSuffix,
    truncatedModelLabel: any;
  // Truncate model label to fit in the header width budget
  if (reactCache[4] !== fullModelLabel) truncatedModelLabel = truncate(fullModelLabel, VEo - 20), reactCache[4] = fullModelLabel, reactCache[5] = truncatedModelLabel;else truncatedModelLabel = reactCache[5];
  let modelDisplay = truncatedModelLabel,
    trialBadgeElement = null;
  {
    let trialBadgeText: any, trialState: any;
    // Trial badge is static — memo-cached on first render
    if (reactCache[6] === Symbol.for("react.memo_cache_sentinel")) trialState = getProTrialState(), trialBadgeText = formatTrialBadge(trialState), reactCache[6] = trialBadgeText, reactCache[7] = trialState;else trialBadgeText = reactCache[6], trialState = reactCache[7];
    let badgeLabel = trialBadgeText;
    if (badgeLabel) {
      let badgeElement: any;
      // Cache the trial badge Text element
      if (reactCache[8] === Symbol.for("react.memo_cache_sentinel")) badgeElement = kl.createElement(Text, {
        color: trialState.status === "expired" ? "suggestion" : "warning"
      }, badgeLabel), reactCache[8] = badgeElement;else badgeElement = reactCache[8];
      trialBadgeElement = badgeElement;
    }
  }
  // If no new release notes, no theme override, and no forced full logo — show compact placeholder
  if (!hasNewReleaseNotes && !currentTheme && !je.CLAUDE_CODE_FORCE_FULL_LOGO) {
    let placeholderElement: any;
    if (reactCache[9] === Symbol.for("react.memo_cache_sentinel")) placeholderElement = kl.createElement(kl.Fragment, null, kl.createElement(z_l, null), !1), reactCache[9] = placeholderElement;else placeholderElement = reactCache[9];
    return placeholderElement;
  }
  let layoutMode = eGn(terminalColumns),
    // "compact" | "horizontal" | "vertical"
    themeColors = H4(bc("theme", "dark").value),
    // Full logo with version for non-screen-reader mode
    fullBorderText = ` ${No("claude", themeColors)("Claude Code")} ${No("inactive", themeColors)(`v${appVersion}`)} `,
    compactBorderText = No("claude", themeColors)(" Claude Code "),
    // Screen-reader accessible text alternative to the styled border logo
    screenReaderLogo = isScreenReader ? kl.createElement(Text, null, kl.createElement(Text, {
      color: "claude",
      bold: !0
    }, "Claude Code", " "), kl.createElement(Text, {
      dimColor: !0
    }, "v", appVersion)) : null,
    // Border props: hidden for screen readers (they use screenReaderLogo instead)
    borderProps = isScreenReader ? {} : {
      borderStyle: "round",
      borderColor: "claude",
      borderText: {
        content: layoutMode === "compact" ? compactBorderText : fullBorderText,
        position: "top",
        align: "start",
        offset: layoutMode === "compact" ? 1 : 3
      }
    };
  if (layoutMode === "compact") {
    // --- COMPACT LAYOUT ---
    let userDisplayName = tGn(displayName);
    // If the display name is too wide, fall back to null (no name shown)
    if (tn(userDisplayName) > terminalColumns - 4) {
      let fallbackName: any;
      if (reactCache[10] === Symbol.for("react.memo_cache_sentinel")) fallbackName = tGn(null), reactCache[10] = fallbackName;else fallbackName = reactCache[10];
      userDisplayName = fallbackName;
    }
    // Budget remaining width for cwd after agent name
    let cwdBudget = resolvedAgentName ? terminalColumns - 4 - 1 - tn(resolvedAgentName) - 3 : terminalColumns - 4,
      truncatedCwd = FDe(currentWorkingDir, Math.max(cwdBudget, 10)),
      contextLine = [resolvedAgentName && `@${resolvedAgentName}`, truncatedCwd].filter(Boolean).join(" \xB7 "),
      mascotElement: any;
    // Mascot is static — memo-cached on first render
    if (reactCache[11] === Symbol.for("react.memo_cache_sentinel")) mascotElement = kl.createElement(Box, {
      marginY: 1
    }, iGn ? kl.createElement(iGn.Mascot, {
      fallback: kl.createElement(UY, null)
    }) : kl.createElement(UY, null)), reactCache[11] = mascotElement;else mascotElement = reactCache[11];
    let modelLabelElement: any;
    if (reactCache[12] !== modelDisplay) modelLabelElement = kl.createElement(Text, {
      dimColor: !0
    }, modelDisplay), reactCache[12] = modelDisplay, reactCache[13] = modelLabelElement;else modelLabelElement = reactCache[13];
    let contextLineElement: any;
    if (reactCache[14] !== contextLine) contextLineElement = contextLine && kl.createElement(Text, {
      dimColor: !0
    }, contextLine), reactCache[14] = contextLine, reactCache[15] = contextLineElement;else contextLineElement = reactCache[15];
    return kl.createElement(bP, null, kl.createElement(Box, {
      flexDirection: "column",
      ...borderProps,
      paddingX: 1,
      paddingY: 1,
      alignItems: isScreenReader ? void 0 : "center",
      width: terminalColumns
    }, screenReaderLogo, kl.createElement(Text, {
      bold: !0
    }, userDisplayName), mascotElement, modelLabelElement, kl.createElement(Text, {
      dimColor: !0
    }, billingTypeLabel), contextLineElement, trialBadgeElement));
  }
  // --- FULL (horizontal / vertical) LAYOUT ---
  let formattedDisplayName = tGn(displayName),
    // Compose the subtitle line: model · billing [· org name if not demo]
    subtitleLine = !process.env.IS_DEMO && oauthInfo?.organizationName ? `${modelDisplay} \xB7 ${billingTypeLabel} \xB7 ${oauthInfo.organizationName}` : `${modelDisplay} \xB7 ${billingTypeLabel}`,
    // Budget width for cwd after agent name
    cwdBudgetFull = resolvedAgentName ? VEo - 1 - tn(resolvedAgentName) - 3 : VEo,
    truncatedCwdFull = FDe(currentWorkingDir, Math.max(cwdBudgetFull, 10)),
    agentTag = resolvedAgentName && `@${resolvedAgentName}`,
    pathAndAgentParts: any;
  if (reactCache[16] !== agentTag || reactCache[17] !== truncatedCwdFull) pathAndAgentParts = [agentTag, truncatedCwdFull].filter(Boolean), reactCache[16] = agentTag, reactCache[17] = truncatedCwdFull, reactCache[18] = pathAndAgentParts;else pathAndAgentParts = reactCache[18];
  let contextLineFull = pathAndAgentParts.join(" \xB7 "),
    feedLayout = k_l(formattedDisplayName, contextLineFull, subtitleLine),
    {
      leftWidth: leftPanelWidth,
      rightWidth: rightPanelWidth
    } = x_l(terminalColumns, layoutMode, feedLayout),
    feedItems = U_l(releaseNotes),
    feedSlots: any;
  // When theme is active, prepend the theme feed item
  if (currentTheme) {
    let themeFeedItem: any;
    if (reactCache[19] === Symbol.for("react.memo_cache_sentinel")) themeFeedItem = $_l(D9r()), reactCache[19] = themeFeedItem;else themeFeedItem = reactCache[19];
    let combinedFeeds: any;
    if (reactCache[20] !== feedItems) combinedFeeds = [themeFeedItem, feedItems], reactCache[20] = feedItems, reactCache[21] = combinedFeeds;else combinedFeeds = reactCache[21];
    feedSlots = combinedFeeds;
  } else {
    let defaultFeeds: any;
    if (reactCache[22] !== feedItems) defaultFeeds = [feedItems], reactCache[22] = feedItems, reactCache[23] = defaultFeeds;else defaultFeeds = reactCache[23];
    feedSlots = defaultFeeds;
  }
  // Screen-reader logo wrapped in padded Box
  let screenReaderLogoBox: any;
  if (reactCache[24] !== screenReaderLogo) screenReaderLogoBox = screenReaderLogo && kl.createElement(Box, {
    paddingX: 1
  }, screenReaderLogo), reactCache[24] = screenReaderLogo, reactCache[25] = screenReaderLogoBox;else screenReaderLogoBox = reactCache[25];
  let flexDirection: any = layoutMode === "horizontal" ? "row" : "column",
    alignItems: any = isScreenReader ? void 0 : "center",
    minHeight: any = isScreenReader ? void 0 : 9,
    displayNameBox: any;
  if (reactCache[26] !== formattedDisplayName) displayNameBox = kl.createElement(Box, {
    marginTop: 1
  }, kl.createElement(Text, {
    bold: !0
  }, formattedDisplayName)), reactCache[26] = formattedDisplayName, reactCache[27] = displayNameBox;else displayNameBox = reactCache[27];
  // Static mascot element for full layout
  let mascotElementFull: any;
  if (reactCache[28] === Symbol.for("react.memo_cache_sentinel")) mascotElementFull = iGn ? kl.createElement(iGn.Mascot, {
    fallback: kl.createElement(UY, null)
  }) : kl.createElement(UY, null), reactCache[28] = mascotElementFull;else mascotElementFull = reactCache[28];
  let rightAlignItems: any = isScreenReader ? void 0 : "center",
    subtitleElement: any;
  if (reactCache[29] !== subtitleLine) subtitleElement = kl.createElement(Text, {
    dimColor: !0
  }, subtitleLine), reactCache[29] = subtitleLine, reactCache[30] = subtitleElement;else subtitleElement = reactCache[30];
  let contextLineElement: any;
  if (reactCache[31] !== contextLineFull) contextLineElement = contextLineFull && kl.createElement(Text, {
    dimColor: !0
  }, contextLineFull), reactCache[31] = contextLineFull, reactCache[32] = contextLineElement;else contextLineElement = reactCache[32];
  // Info block: subtitle + cwd/agent context + trial badge
  let infoBlock: any;
  if (reactCache[33] !== rightAlignItems || reactCache[34] !== subtitleElement || reactCache[35] !== contextLineElement || reactCache[36] !== trialBadgeElement) infoBlock = kl.createElement(Box, {
    flexDirection: "column",
    alignItems: rightAlignItems
  }, subtitleElement, contextLineElement, trialBadgeElement), reactCache[33] = rightAlignItems, reactCache[34] = subtitleElement, reactCache[35] = contextLineElement, reactCache[36] = trialBadgeElement, reactCache[37] = infoBlock;else infoBlock = reactCache[37];
  // Left panel: display name + mascot + info block
  let leftPanel: any;
  if (reactCache[38] !== leftPanelWidth || reactCache[39] !== minHeight || reactCache[40] !== displayNameBox || reactCache[41] !== infoBlock || reactCache[42] !== alignItems) leftPanel = kl.createElement(Box, {
    flexDirection: "column",
    width: leftPanelWidth,
    justifyContent: "space-between",
    alignItems: alignItems,
    minHeight: minHeight
  }, displayNameBox, mascotElementFull, infoBlock), reactCache[38] = leftPanelWidth, reactCache[39] = minHeight, reactCache[40] = displayNameBox, reactCache[41] = infoBlock, reactCache[42] = alignItems, reactCache[43] = leftPanel;else leftPanel = reactCache[43];
  // Vertical divider between left panel and feed (horizontal layout only)
  let divider: any;
  if (reactCache[44] !== isScreenReader || reactCache[45] !== layoutMode) divider = layoutMode === "horizontal" && !isScreenReader && kl.createElement(Box, {
    height: "100%",
    borderStyle: "single",
    borderColor: "claude",
    borderDimColor: !0,
    borderTop: !1,
    borderBottom: !1,
    borderLeft: !1
  }), reactCache[44] = isScreenReader, reactCache[45] = layoutMode, reactCache[46] = divider;else divider = reactCache[46];
  // Feed panel (right side in horizontal layout)
  let feedPanel: any;
  if (reactCache[47] !== feedSlots || reactCache[48] !== layoutMode || reactCache[49] !== rightPanelWidth) feedPanel = layoutMode === "horizontal" && kl.createElement(N_l, {
    feeds: feedSlots,
    maxWidth: rightPanelWidth
  }), reactCache[47] = feedSlots, reactCache[48] = layoutMode, reactCache[49] = rightPanelWidth, reactCache[50] = feedPanel;else feedPanel = reactCache[50];
  // Inner row/column containing both panels
  let innerContainer: any;
  if (reactCache[51] !== leftPanel || reactCache[52] !== divider || reactCache[53] !== feedPanel || reactCache[54] !== flexDirection) innerContainer = kl.createElement(Box, {
    flexDirection: flexDirection,
    paddingX: 1,
    gap: 1
  }, leftPanel, divider, feedPanel), reactCache[51] = leftPanel, reactCache[52] = divider, reactCache[53] = feedPanel, reactCache[54] = flexDirection, reactCache[55] = innerContainer;else innerContainer = reactCache[55];
  // Outer bordered container
  let outerContainer: any;
  if (reactCache[56] !== borderProps || reactCache[57] !== innerContainer || reactCache[58] !== screenReaderLogoBox) outerContainer = kl.createElement(bP, null, kl.createElement(Box, {
    flexDirection: "column",
    ...borderProps
  }, screenReaderLogoBox, innerContainer)), reactCache[56] = borderProps, reactCache[57] = innerContainer, reactCache[58] = screenReaderLogoBox, reactCache[59] = outerContainer;else outerContainer = reactCache[59];
  // Static false placeholder (memo-cached)
  let staticFalse: any;
  if (reactCache[60] === Symbol.for("react.memo_cache_sentinel")) staticFalse = !1, reactCache[60] = staticFalse;else staticFalse = reactCache[60];
  let rootFragment: any;
  if (reactCache[61] !== outerContainer) rootFragment = kl.createElement(kl.Fragment, null, outerContainer, staticFalse), reactCache[61] = outerContainer, reactCache[62] = rootFragment;else rootFragment = reactCache[62];
  return rootFragment;
}
// Updates globalConfig to mark current version's release notes as seen
function Fem(e: any): any {
  if (e.lastReleaseNotesSeen === {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION) return e;
  return {
    ...e,
    lastReleaseNotesSeen: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION
  };
}
// Selector: extract effortValue from proto store state
function Uem(e: any): any {
  return e.effortValue;
}
// Selector: extract agent name from proto store state
function $em(e: any): any {
  return e.agent;
}
var J_l: any,
  kl: any,
  X_l: any,
  iGn: any = null,
  VEo = 50; // VEo: max header label width budget
var Z_l = b(() => {
  ze();
  ki();
  Hc();
  Bjt();
  ps();
  r$t();
  B_l();
  q_l();
  Qn();
  Ug();
  Yfe();
  P0t();
  Y_l();
  $mt();
  Vhe();
  Vje();
  Lr();
  configProtoStore();
  Om();
  jL();
  Mo();
  Ao();
  J_l = M(rt(), 1), kl = M(Te(), 1), X_l = M(Te(), 1);
});
export {Q_l,Fem,Uem,$em,J_l,kl,X_l,iGn,VEo,Z_l};
