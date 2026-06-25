// @ts-nocheck
import {getOauthAccountInfo as hc,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {useIsScreenReaderEnabled as Hd} from "../../vendor/m2444.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {pLi,mLi,u5r,uOt} from "../../vendor/m2525.ts";
import {_t,uo} from "../../vendor/m2468.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {kvl,Jht,Uzn,$zn,NPe,vvl,Rvl,nGt} from "../config/4808_leftWidth.ts";
import {ARl,CWe} from "../../vendor/m4794.ts";
import {Sdt,V1} from "../../vendor/m4006.ts";
import {parseUserSpecifiedModel as Qo,renderModelSetting as _7,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {yet,Cp} from "../config/2223_level.ts";
import {truncate as Ha} from "../../vendor/m239.ts";
import {getProTrialState as Qht,formatTrialBadge as rGt,Zht} from "../../vendor/m4811.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Ne} from "../../vendor/m583.ts";
import {Kvl,zvl} from "../config/4814_columns.ts";
import {X3,cZ} from "../../vendor/m2273.ts";
import {lc,mg} from "../../vendor/m2209.ts";
import {color as wo} from "../../vendor/m2431.ts";
import {sn,mc} from "../../vendor/m237.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {yY,G3t} from "../../vendor/m4016.ts";
import {ND,s_e} from "../../vendor/m3298.ts";
import {Fvl,Bvl,Uvl} from "../../vendor/m4810.ts";
import {Lvl,Mvl} from "../../vendor/m4809.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Xo} from "../../vendor/m240.ts";
import {Ir} from "../../vendor/m584.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
function Jvl() {
  let reactCache = jvl.c(63),
    oauthInfo = hc(),
    displayName = oauthInfo?.displayName ?? "",
    isScreenReader = Hd(),
    {
      columns: terminalColumns
    } = _r(),
    themeCtx: any;
  // Initialize theme from memo cache (sentinel check for first render)
  if (reactCache[0] === Symbol.for("react.memo_cache_sentinel")) themeCtx = pLi(), reactCache[0] = themeCtx;else themeCtx = reactCache[0];
  let currentTheme = themeCtx,
    agentName = _t(eum),
    // agent name from proto store
    effortValue = _t(Zcm),
    // effort value from proto store
    globalConfig = Ot(),
    releaseNotes: any;
  try {
    releaseNotes = kvl(3);
  } catch {
    releaseNotes = [];
  }
  let {
      hasReleaseNotes: hasNewReleaseNotes
    } = ARl(globalConfig.lastReleaseNotesSeen),
    markNotesSeenCallback: any,
    markNotesSeenDeps: any;
  // Memoize the callback to mark release notes as seen
  if (reactCache[1] !== currentTheme) markNotesSeenCallback = () => {
    if (Ot().lastReleaseNotesSeen === {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION) return;
    if (hn(Qcm), currentTheme) mLi();
  }, markNotesSeenDeps = [globalConfig, currentTheme], reactCache[1] = currentTheme, reactCache[2] = markNotesSeenCallback, reactCache[3] = markNotesSeenDeps;else markNotesSeenCallback = reactCache[2], markNotesSeenDeps = reactCache[3];
  // Effect: mark release notes as seen when component mounts or theme changes
  Yvl.useEffect(markNotesSeenCallback, markNotesSeenDeps);
  let modelProvider = Sdt(),
    parsedModel = Qo(modelProvider),
    modelLabel = _7(modelProvider),
    {
      version: appVersion,
      cwd: currentWorkingDir,
      billingType: billingTypeLabel,
      agentName: configAgentName
    } = Jht(),
    resolvedAgentName = agentName ?? configAgentName,
    effortSuffix = yet(parsedModel, effortValue),
    // e.g. " (high effort)"
    fullModelLabel = modelLabel + effortSuffix,
    truncatedModelLabel: any;
  // Truncate model label to fit in the header width budget
  if (reactCache[4] !== fullModelLabel) truncatedModelLabel = Ha(fullModelLabel, uHo - 20), reactCache[4] = fullModelLabel, reactCache[5] = truncatedModelLabel;else truncatedModelLabel = reactCache[5];
  let modelDisplay = truncatedModelLabel,
    trialBadgeElement = null;
  {
    let trialBadgeText: any, trialState: any;
    // Trial badge is static — memo-cached on first render
    if (reactCache[6] === Symbol.for("react.memo_cache_sentinel")) trialState = Qht(), trialBadgeText = rGt(trialState), reactCache[6] = trialBadgeText, reactCache[7] = trialState;else trialBadgeText = reactCache[6], trialState = reactCache[7];
    let badgeLabel = trialBadgeText;
    if (badgeLabel) {
      let badgeElement: any;
      // Cache the trial badge Text element
      if (reactCache[8] === Symbol.for("react.memo_cache_sentinel")) badgeElement = bh.jsx(v, {
        color: trialState.status === "expired" ? "suggestion" : "warning",
        children: badgeLabel
      }), reactCache[8] = badgeElement;else badgeElement = reactCache[8];
      trialBadgeElement = badgeElement;
    }
  }
  // If no new release notes, no theme override, and no forced full logo — show compact placeholder
  if (!hasNewReleaseNotes && !currentTheme && !Ne.CLAUDE_CODE_FORCE_FULL_LOGO) {
    let placeholderElement: any;
    if (reactCache[9] === Symbol.for("react.memo_cache_sentinel")) placeholderElement = bh.jsxs(bh.Fragment, {
      children: [bh.jsx(Kvl, {}), !1]
    }), reactCache[9] = placeholderElement;else placeholderElement = reactCache[9];
    return placeholderElement;
  }
  let layoutMode = Uzn(terminalColumns),
    // "compact" | "horizontal" | "vertical"
    themeColors = X3(lc("theme", "dark").value),
    // Full logo with version for non-screen-reader mode
    fullBorderText = ` ${wo("claude", themeColors)("Claude Code")} ${wo("inactive", themeColors)(`v${appVersion}`)} `,
    compactBorderText = wo("claude", themeColors)(" Claude Code "),
    // Screen-reader accessible text alternative to the styled border logo
    screenReaderLogo = isScreenReader ? bh.jsxs(v, {
      children: [bh.jsxs(v, {
        color: "claude",
        bold: !0,
        children: ["Claude Code", " "]
      }), bh.jsxs(v, {
        dimColor: !0,
        children: ["v", appVersion]
      })]
    }) : null,
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
    let userDisplayName = $zn(displayName);
    // If the display name is too wide, fall back to null (no name shown)
    if (sn(userDisplayName) > terminalColumns - 4) {
      let fallbackName: any;
      if (reactCache[10] === Symbol.for("react.memo_cache_sentinel")) fallbackName = $zn(null), reactCache[10] = fallbackName;else fallbackName = reactCache[10];
      userDisplayName = fallbackName;
    }
    // Budget remaining width for cwd after agent name
    let cwdBudget = resolvedAgentName ? terminalColumns - 4 - 1 - sn(resolvedAgentName) - 3 : terminalColumns - 4,
      truncatedCwd = NPe(currentWorkingDir, Math.max(cwdBudget, 10)),
      contextLine = [resolvedAgentName && `@${resolvedAgentName}`, truncatedCwd].filter(Boolean).join(" \xB7 "),
      mascotElement: any;
    // Mascot is static — memo-cached on first render
    if (reactCache[11] === Symbol.for("react.memo_cache_sentinel")) mascotElement = bh.jsx($, {
      marginY: 1,
      children: Kzn ? bh.jsx(Kzn.Mascot, {
        fallback: bh.jsx(yY, {})
      }) : bh.jsx(yY, {})
    }), reactCache[11] = mascotElement;else mascotElement = reactCache[11];
    let modelLabelElement: any;
    if (reactCache[12] !== modelDisplay) modelLabelElement = bh.jsx(v, {
      dimColor: !0,
      children: modelDisplay
    }), reactCache[12] = modelDisplay, reactCache[13] = modelLabelElement;else modelLabelElement = reactCache[13];
    let contextLineElement: any;
    if (reactCache[14] !== contextLine) contextLineElement = contextLine && bh.jsx(v, {
      dimColor: !0,
      children: contextLine
    }), reactCache[14] = contextLine, reactCache[15] = contextLineElement;else contextLineElement = reactCache[15];
    return bh.jsx(ND, {
      children: bh.jsxs($, {
        flexDirection: "column",
        ...borderProps,
        paddingX: 1,
        paddingY: 1,
        alignItems: isScreenReader ? void 0 : "center",
        width: terminalColumns,
        children: [screenReaderLogo, bh.jsx(v, {
          bold: !0,
          children: userDisplayName
        }), mascotElement, modelLabelElement, bh.jsx(v, {
          dimColor: !0,
          children: billingTypeLabel
        }), contextLineElement, trialBadgeElement]
      })
    });
  }
  // --- FULL (horizontal / vertical) LAYOUT ---
  let formattedDisplayName = $zn(displayName),
    // Compose the subtitle line: model · billing [· org name if not demo]
    subtitleLine = !process.env.IS_DEMO && oauthInfo?.organizationName ? `${modelDisplay} \xB7 ${billingTypeLabel} \xB7 ${oauthInfo.organizationName}` : `${modelDisplay} \xB7 ${billingTypeLabel}`,
    // Budget width for cwd after agent name
    cwdBudgetFull = resolvedAgentName ? uHo - 1 - sn(resolvedAgentName) - 3 : uHo,
    truncatedCwdFull = NPe(currentWorkingDir, Math.max(cwdBudgetFull, 10)),
    agentTag = resolvedAgentName && `@${resolvedAgentName}`,
    pathAndAgentParts: any;
  if (reactCache[16] !== agentTag || reactCache[17] !== truncatedCwdFull) pathAndAgentParts = [agentTag, truncatedCwdFull].filter(Boolean), reactCache[16] = agentTag, reactCache[17] = truncatedCwdFull, reactCache[18] = pathAndAgentParts;else pathAndAgentParts = reactCache[18];
  let contextLineFull = pathAndAgentParts.join(" \xB7 "),
    feedLayout = vvl(formattedDisplayName, contextLineFull, subtitleLine),
    {
      leftWidth: leftPanelWidth,
      rightWidth: rightPanelWidth
    } = Rvl(terminalColumns, layoutMode, feedLayout),
    feedItems = Fvl(releaseNotes),
    feedSlots: any;
  // When theme is active, prepend the theme feed item
  if (currentTheme) {
    let themeFeedItem: any;
    if (reactCache[19] === Symbol.for("react.memo_cache_sentinel")) themeFeedItem = Bvl(u5r()), reactCache[19] = themeFeedItem;else themeFeedItem = reactCache[19];
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
  if (reactCache[24] !== screenReaderLogo) screenReaderLogoBox = screenReaderLogo && bh.jsx($, {
    paddingX: 1,
    children: screenReaderLogo
  }), reactCache[24] = screenReaderLogo, reactCache[25] = screenReaderLogoBox;else screenReaderLogoBox = reactCache[25];
  let flexDirection: any = layoutMode === "horizontal" ? "row" : "column",
    alignItems: any = isScreenReader ? void 0 : "center",
    minHeight: any = isScreenReader ? void 0 : 9,
    displayNameBox: any;
  if (reactCache[26] !== formattedDisplayName) displayNameBox = bh.jsx($, {
    marginTop: 1,
    children: bh.jsx(v, {
      bold: !0,
      children: formattedDisplayName
    })
  }), reactCache[26] = formattedDisplayName, reactCache[27] = displayNameBox;else displayNameBox = reactCache[27];
  // Static mascot element for full layout
  let mascotElementFull: any;
  if (reactCache[28] === Symbol.for("react.memo_cache_sentinel")) mascotElementFull = Kzn ? bh.jsx(Kzn.Mascot, {
    fallback: bh.jsx(yY, {})
  }) : bh.jsx(yY, {}), reactCache[28] = mascotElementFull;else mascotElementFull = reactCache[28];
  let rightAlignItems: any = isScreenReader ? void 0 : "center",
    subtitleElement: any;
  if (reactCache[29] !== subtitleLine) subtitleElement = bh.jsx(v, {
    dimColor: !0,
    children: subtitleLine
  }), reactCache[29] = subtitleLine, reactCache[30] = subtitleElement;else subtitleElement = reactCache[30];
  let contextLineElement: any;
  if (reactCache[31] !== contextLineFull) contextLineElement = contextLineFull && bh.jsx(v, {
    dimColor: !0,
    children: contextLineFull
  }), reactCache[31] = contextLineFull, reactCache[32] = contextLineElement;else contextLineElement = reactCache[32];
  // Info block: subtitle + cwd/agent context + trial badge
  let infoBlock: any;
  if (reactCache[33] !== rightAlignItems || reactCache[34] !== subtitleElement || reactCache[35] !== contextLineElement || reactCache[36] !== trialBadgeElement) infoBlock = bh.jsxs($, {
    flexDirection: "column",
    alignItems: rightAlignItems,
    children: [subtitleElement, contextLineElement, trialBadgeElement]
  }), reactCache[33] = rightAlignItems, reactCache[34] = subtitleElement, reactCache[35] = contextLineElement, reactCache[36] = trialBadgeElement, reactCache[37] = infoBlock;else infoBlock = reactCache[37];
  // Left panel: display name + mascot + info block
  let leftPanel: any;
  if (reactCache[38] !== leftPanelWidth || reactCache[39] !== minHeight || reactCache[40] !== displayNameBox || reactCache[41] !== infoBlock || reactCache[42] !== alignItems) leftPanel = bh.jsxs($, {
    flexDirection: "column",
    width: leftPanelWidth,
    justifyContent: "space-between",
    alignItems: alignItems,
    minHeight: minHeight,
    children: [displayNameBox, mascotElementFull, infoBlock]
  }), reactCache[38] = leftPanelWidth, reactCache[39] = minHeight, reactCache[40] = displayNameBox, reactCache[41] = infoBlock, reactCache[42] = alignItems, reactCache[43] = leftPanel;else leftPanel = reactCache[43];
  // Vertical divider between left panel and feed (horizontal layout only)
  let divider: any;
  if (reactCache[44] !== isScreenReader || reactCache[45] !== layoutMode) divider = layoutMode === "horizontal" && !isScreenReader && bh.jsx($, {
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
  if (reactCache[47] !== feedSlots || reactCache[48] !== layoutMode || reactCache[49] !== rightPanelWidth) feedPanel = layoutMode === "horizontal" && bh.jsx(Lvl, {
    feeds: feedSlots,
    maxWidth: rightPanelWidth
  }), reactCache[47] = feedSlots, reactCache[48] = layoutMode, reactCache[49] = rightPanelWidth, reactCache[50] = feedPanel;else feedPanel = reactCache[50];
  // Inner row/column containing both panels
  let innerContainer: any;
  if (reactCache[51] !== leftPanel || reactCache[52] !== divider || reactCache[53] !== feedPanel || reactCache[54] !== flexDirection) innerContainer = bh.jsxs($, {
    flexDirection: flexDirection,
    paddingX: 1,
    gap: 1,
    children: [leftPanel, divider, feedPanel]
  }), reactCache[51] = leftPanel, reactCache[52] = divider, reactCache[53] = feedPanel, reactCache[54] = flexDirection, reactCache[55] = innerContainer;else innerContainer = reactCache[55];
  // Outer bordered container
  let outerContainer: any;
  if (reactCache[56] !== borderProps || reactCache[57] !== innerContainer || reactCache[58] !== screenReaderLogoBox) outerContainer = bh.jsx(ND, {
    children: bh.jsxs($, {
      flexDirection: "column",
      ...borderProps,
      children: [screenReaderLogoBox, innerContainer]
    })
  }), reactCache[56] = borderProps, reactCache[57] = innerContainer, reactCache[58] = screenReaderLogoBox, reactCache[59] = outerContainer;else outerContainer = reactCache[59];
  // Static false placeholder (memo-cached)
  let staticFalse: any;
  if (reactCache[60] === Symbol.for("react.memo_cache_sentinel")) staticFalse = !1, reactCache[60] = staticFalse;else staticFalse = reactCache[60];
  let rootFragment: any;
  if (reactCache[61] !== outerContainer) rootFragment = bh.jsxs(bh.Fragment, {
    children: [outerContainer, staticFalse]
  }), reactCache[61] = outerContainer, reactCache[62] = rootFragment;else rootFragment = reactCache[62];
  return rootFragment;
}
// Updates globalConfig to mark current version's release notes as seen
function Qcm(e) {
  if (e.lastReleaseNotesSeen === {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION) return e;
  return {
    ...e,
    lastReleaseNotesSeen: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION
  };
}
// Selector: extract effortValue from proto store state
function Zcm(e) {
  return e.effortValue;
}
// Selector: extract agent name from proto store state
function eum(e) {
  return e.agent;
}
var jvl,
  Yvl,
  bh,
  Kzn = null,
  uHo = 50; // uHo: max header label width budget
var Xvl = b(() => {
  je();
  ui();
  mc();
  nGt();
  Xo();
  G3t();
  Mvl();
  Uvl();
  tr();
  mg();
  cZ();
  uOt();
  zvl();
  Zht();
  s_e();
  CWe();
  Ir();
  uo();
  Cp();
  V1();
  Ro();
  lo();
  jvl = x(tt(), 1), Yvl = x(et(), 1), bh = x(oe(), 1);
});
export {Jvl,Qcm,Zcm,eum,jvl,Yvl,bh,Kzn,uHo,Xvl};
