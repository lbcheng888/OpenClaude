// @ts-nocheck
import {mce,z9n,j9n,dxe,ydt} from "./4005_children.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {useTheme as ji} from "../../vendor/m2285.ts";
import {cw,uo} from "../../vendor/m2468.ts";
import {z3a,j3a} from "../../vendor/m4034.ts";
import {rl,jbn,ri} from "../tools/2235_userFacingName.ts";
import {Rp,MO} from "../tools/2710_allErrors.ts";
import {nMt,wVr} from "../../vendor/m2694.ts";
import {Uit,NW} from "../config/3289_NW.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {T3n,jpo} from "../../vendor/m4037.ts";
import {Kpo} from "./4033_param.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {sn,mc} from "../../vendor/m237.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Ql,Pa} from "../../vendor/m720.ts";
import {Hte,_dt} from "../../vendor/m3999.ts";
import {gS,vte} from "../../vendor/m3991.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {goe,pd} from "../../vendor/m706.ts";
import {B6e,_3n} from "../../vendor/m4035.ts";
import {y3n,zpo} from "../../vendor/m4036.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {K3a} from "../../vendor/m4033.ts";
import {tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
function t4a(props) {
  let cache = e4a.c(211),
    {
      param: param,
      addMargin: addMargin,
      tools: tools,
      commands: commands,
      verbose: verbose,
      inProgressToolUseIDs: inProgressToolUseIDs,
      progressMessagesForMessage: progressMessagesForMessage,
      shouldAnimate: shouldAnimate,
      shouldShowDot: shouldShowDot,
      inProgressToolCallCount: inProgressToolCallCount,
      lookups: lookups,
      isTranscriptMode: isTranscriptMode,
      messageUuid: messageUuid
    } = props,
    pendingWorkerRequest = Odt.useContext(mce),
    selectedToolUseId = z9n(),
    secondaryToolUseId = j9n(),
    isSelected = selectedToolUseId === param.id,
    mouseHandlers = dxe(messageUuid),
    [isHovered, setIsHovered] = Odt.useState(false),
    terminalSize = _r(),
    [theme] = ji(),
    workerRequest = cw(Kxp),
    paramExtra = z3a(param.id),
    permissionMode = cw(Vxp),
    hasStrippedDangerousRules = cw(Gxp),
    isAutoOrPlanWithStrip = permissionMode === "auto" || permissionMode === "plan" && hasStrippedDangerousRules,
    unusedFlag = false,
    resolvedTool;
  if (cache[0] !== param.input || cache[1] !== param.name || cache[2] !== tools) {
    e: {
      if (!tools) {
        let noToolsResult;
        if (cache[4] === Symbol.for("react.memo_cache_sentinel")) noToolsResult = {
          notFound: "no-tools"
        }, cache[4] = noToolsResult;else noToolsResult = cache[4];
        resolvedTool = noToolsResult;
        break e;
      }
      let matchedTool = rl(tools, param.name);
      if (!matchedTool) {
        let notFoundReason = param.name.startsWith("mcp__") || param.name.startsWith("skill__") || param.name.startsWith("eval_registered__") || param.name === Rp || param.name === "WebBrowser" || nMt.has(param.name) || Uit().has(param.name) || rl(jbn() ?? [], param.name) !== undefined ? "expected-absent" : "unknown",
          notFoundResult;
        if (cache[5] !== notFoundReason) notFoundResult = {
          notFound: notFoundReason
        }, cache[5] = notFoundReason, cache[6] = notFoundResult;else notFoundResult = cache[6];
        resolvedTool = notFoundResult;
        break e;
      }
      let parsedInput = matchedTool.inputSchema.safeParse(param.input),
        inputData = parsedInput.success ? parsedInput.data : undefined;
      resolvedTool = {
        tool: matchedTool,
        input: parsedInput,
        userFacingToolName: matchedTool.userFacingName(inputData),
        userFacingToolNameBackgroundColor: matchedTool.userFacingNameBackgroundColor?.(inputData),
        isTransparentWrapper: matchedTool.isTransparentWrapper?.() ?? false
      };
    }
    cache[0] = param.input, cache[1] = param.name, cache[2] = tools, cache[3] = resolvedTool;
  } else resolvedTool = cache[3];
  let toolInfo = resolvedTool,
    notFoundReason = "notFound" in toolInfo ? toolInfo.notFound : null,
    logEffect,
    logEffectDeps;
  if (cache[7] !== notFoundReason || cache[8] !== param.name) logEffect = () => {
    if (notFoundReason === "no-tools") Ie(Error(`Tools array is undefined for tool ${param.name}`));else if (notFoundReason === "expected-absent") A(`Tool ${param.name} not found in render-time tools`, {
      level: "error"
    });else if (notFoundReason === "unknown") Ie(Error(`Tool ${param.name} not found`));
  }, logEffectDeps = [param.name, notFoundReason], cache[7] = notFoundReason, cache[8] = param.name, cache[9] = logEffect, cache[10] = logEffectDeps;else logEffect = cache[9], logEffectDeps = cache[10];
  Odt.useEffect(logEffect, logEffectDeps);
  let isThinkingTool = param.name === Rp,
    outerBox,
    columnBox,
    innerBox,
    isQueued,
    isResolved,
    isPending,
    headerMessage,
    toolUseTag,
    columnDirection,
    rowDirection,
    justifyContent,
    marginTop,
    boxWidth,
    onMouseEnter,
    onMouseLeave,
    rowFlexDirection,
    rowFlexWrap,
    rowMinWidth,
    dotIndicator,
    toolNameEl,
    earlyReturn,
    ge;
  if (cache[11] !== addMargin || cache[12] !== isHovered || cache[13] !== commands || cache[14] !== inProgressToolCallCount || cache[15] !== inProgressToolUseIDs || cache[16] !== isSelected || cache[17] !== isTranscriptMode || cache[18] !== lookups || cache[19] !== messageUuid || cache[20] !== param || cache[21] !== toolInfo || cache[22] !== workerRequest?.toolUseId || cache[23] !== progressMessagesForMessage || cache[24] !== pendingWorkerRequest || cache[25] !== mouseHandlers || cache[26] !== secondaryToolUseId || cache[27] !== shouldAnimate || cache[28] !== shouldShowDot || cache[29] !== isThinkingTool || cache[30] !== terminalSize || cache[31] !== theme || cache[32] !== tools || cache[33] !== verbose) {
    rowFlexDirection = Symbol.for("react.early_return_sentinel");
    e: {
      if (isThinkingTool) {
        let We = param.input?.text;
        if (typeof We === "string" && We.length > 0) {
          rowFlexDirection = UI.jsx(T3n, {
            content: We,
            addMargin: addMargin
          });
          break e;
        }
      }
      let Oe = "notFound" in toolInfo;
      if (cache[56] !== addMargin || cache[57] !== isHovered || cache[58] !== commands || cache[59] !== inProgressToolCallCount || cache[60] !== inProgressToolUseIDs || cache[61] !== isSelected || cache[62] !== isTranscriptMode || cache[63] !== lookups || cache[64] !== messageUuid || cache[65] !== param || cache[66] !== toolInfo || cache[67] !== workerRequest?.toolUseId || cache[68] !== progressMessagesForMessage || cache[69] !== pendingWorkerRequest || cache[70] !== mouseHandlers || cache[71] !== secondaryToolUseId || cache[72] !== shouldAnimate || cache[73] !== shouldShowDot || cache[74] !== Oe || cache[75] !== terminalSize || cache[76] !== theme || cache[77] !== tools || cache[78] !== verbose) {
        if (Oe) {
          rowFlexDirection = null;
          break e;
        }
        let {
          tool: We,
          input: Fe,
          userFacingToolName: ke,
          userFacingToolNameBackgroundColor: Ue,
          isTransparentWrapper: Ge
        } = toolInfo;
        if (ge = We, cache[100] !== addMargin || cache[101] !== isHovered || cache[102] !== commands || cache[103] !== inProgressToolCallCount || cache[104] !== inProgressToolUseIDs || cache[105] !== Fe || cache[106] !== isSelected || cache[107] !== isTranscriptMode || cache[108] !== Ge || cache[109] !== lookups || cache[110] !== messageUuid || cache[111] !== param || cache[112] !== workerRequest?.toolUseId || cache[113] !== progressMessagesForMessage || cache[114] !== pendingWorkerRequest || cache[115] !== mouseHandlers || cache[116] !== secondaryToolUseId || cache[117] !== shouldAnimate || cache[118] !== shouldShowDot || cache[119] !== terminalSize || cache[120] !== theme || cache[121] !== ge || cache[122] !== tools || cache[123] !== ke || cache[124] !== Ue || cache[125] !== verbose) {
          isResolved = lookups.resolvedToolUseIDs.has(param.id), isQueued = !inProgressToolUseIDs.has(param.id) && !isResolved, isPending = workerRequest?.toolUseId === param.id;
          let ht = lookups.toolResultByToolUseID.get(param.id),
            pt = ht?.type === "user" ? ht.toolUseResult : undefined;
          if (Ge) {
            let Dt = Kpo({
              param: param,
              isQueued: isQueued,
              isResolved: isResolved,
              isError: lookups.erroredToolUseIDs.has(param.id),
              shouldAnimate: shouldAnimate,
              shouldShowDot: shouldShowDot,
              addMargin: addMargin,
              progressMessagesForMessage: progressMessagesForMessage,
              resultMsg: ht
            });
            if (Dt !== null) {
              rowFlexDirection = Dt;
              break e;
            }
            if (isResolved) {
              rowFlexDirection = null;
              break e;
            }
            let rt;
            if (cache[146] !== inProgressToolCallCount || cache[147] !== isTranscriptMode || cache[148] !== lookups || cache[149] !== param.id || cache[150] !== progressMessagesForMessage || cache[151] !== terminalSize || cache[152] !== ge || cache[153] !== tools || cache[154] !== verbose) rt = Z3a(ge, tools, lookups, param.id, progressMessagesForMessage, {
              verbose: verbose,
              inProgressToolCallCount: inProgressToolCallCount,
              isTranscriptMode: isTranscriptMode
            }, terminalSize), cache[146] = inProgressToolCallCount, cache[147] = isTranscriptMode, cache[148] = lookups, cache[149] = param.id, cache[150] = progressMessagesForMessage, cache[151] = terminalSize, cache[152] = ge, cache[153] = tools, cache[154] = verbose, cache[155] = rt;else rt = cache[155];
            rowFlexDirection = UI.jsx($, {
              flexDirection: "column",
              width: "100%",
              children: rt
            });
            break e;
          }
          if (ke === "") {
            rowFlexDirection = null;
            break e;
          }
          let Be;
          if (cache[156] !== commands || cache[157] !== Fe.data || cache[158] !== Fe.success || cache[159] !== theme || cache[160] !== ge || cache[161] !== verbose) Be = Fe.success ? zxp(ge, Fe.data, {
            theme: theme,
            verbose: verbose,
            commands: commands
          }) : null, cache[156] = commands, cache[157] = Fe.data, cache[158] = Fe.success, cache[159] = theme, cache[160] = ge, cache[161] = verbose, cache[162] = Be;else Be = cache[162];
          let dt = Be;
          if (dt === null) {
            rowFlexDirection = null;
            break e;
          }
          if (innerBox = $, rowDirection = "row", justifyContent = "space-between", marginTop = addMargin ? 1 : 0, boxWidth = "100%", cache[163] !== param.id || cache[164] !== secondaryToolUseId) onMouseEnter = undefined, cache[163] = param.id, cache[164] = secondaryToolUseId, cache[165] = onMouseEnter;else onMouseEnter = cache[165];
          if (cache[166] !== secondaryToolUseId) onMouseLeave = undefined, cache[166] = secondaryToolUseId, cache[167] = onMouseLeave;else onMouseLeave = cache[167];
          if (columnBox = $, columnDirection = "column", outerBox = $, rowFlexWrap = "row", rowMinWidth = "nowrap", dotIndicator = sn(ke) + (shouldShowDot ? 2 : 0), toolNameEl = shouldShowDot && (isResolved && lookups.erroredToolUseIDs.has(param.id), isQueued ? UI.jsx($, {
            minWidth: 2,
            children: UI.jsx(v, {
              "aria-label": "tool:",
              dimColor: isQueued,
              children: Ql
            })
          }) : UI.jsx(Hte, {
            shouldAnimate: shouldAnimate,
            isUnresolved: !isResolved,
            isError: lookups.erroredToolUseIDs.has(param.id)
          })), cache[168] !== ke || cache[169] !== Ue) earlyReturn = UI.jsx($, {
            flexShrink: 0,
            children: UI.jsx(gS, {
              color: Ue,
              bold: true,
              wrap: "truncate-end",
              children: ke
            })
          }), cache[168] = ke, cache[169] = Ue, cache[170] = earlyReturn;else earlyReturn = cache[170];
          if (cache[171] !== dt) headerMessage = dt !== "" && UI.jsx($, {
            flexWrap: "nowrap",
            children: UI.jsxs(v, {
              children: ["(", dt, ")"]
            })
          }), cache[171] = dt, cache[172] = headerMessage;else headerMessage = cache[172];
          toolUseTag = Fe.success && ge.renderToolUseTag && ge.renderToolUseTag(Fe.data, {
            toolUseId: param.id,
            toolUseResult: pt,
            progressMessages: lookups.progressMessagesByToolUseID.get(param.id)
          }), cache[100] = addMargin, cache[101] = isHovered, cache[102] = commands, cache[103] = inProgressToolCallCount, cache[104] = inProgressToolUseIDs, cache[105] = Fe, cache[106] = isSelected, cache[107] = isTranscriptMode, cache[108] = Ge, cache[109] = lookups, cache[110] = messageUuid, cache[111] = param, cache[112] = workerRequest?.toolUseId, cache[113] = progressMessagesForMessage, cache[114] = pendingWorkerRequest, cache[115] = mouseHandlers, cache[116] = secondaryToolUseId, cache[117] = shouldAnimate, cache[118] = shouldShowDot, cache[119] = terminalSize, cache[120] = theme, cache[121] = ge, cache[122] = tools, cache[123] = ke, cache[124] = Ue, cache[125] = verbose, cache[126] = outerBox, cache[127] = columnBox, cache[128] = innerBox, cache[129] = isQueued, cache[130] = isResolved, cache[131] = isPending, cache[132] = headerMessage, cache[133] = toolUseTag, cache[134] = columnDirection, cache[135] = rowDirection, cache[136] = justifyContent, cache[137] = marginTop, cache[138] = boxWidth, cache[139] = onMouseEnter, cache[140] = onMouseLeave, cache[141] = rowFlexWrap, cache[142] = rowMinWidth, cache[143] = dotIndicator, cache[144] = toolNameEl, cache[145] = earlyReturn;
        } else outerBox = cache[126], columnBox = cache[127], innerBox = cache[128], isQueued = cache[129], isResolved = cache[130], isPending = cache[131], headerMessage = cache[132], toolUseTag = cache[133], columnDirection = cache[134], rowDirection = cache[135], justifyContent = cache[136], marginTop = cache[137], boxWidth = cache[138], onMouseEnter = cache[139], onMouseLeave = cache[140], rowFlexWrap = cache[141], rowMinWidth = cache[142], dotIndicator = cache[143], toolNameEl = cache[144], earlyReturn = cache[145];
        cache[56] = addMargin, cache[57] = isHovered, cache[58] = commands, cache[59] = inProgressToolCallCount, cache[60] = inProgressToolUseIDs, cache[61] = isSelected, cache[62] = isTranscriptMode, cache[63] = lookups, cache[64] = messageUuid, cache[65] = param, cache[66] = toolInfo, cache[67] = workerRequest?.toolUseId, cache[68] = progressMessagesForMessage, cache[69] = pendingWorkerRequest, cache[70] = mouseHandlers, cache[71] = secondaryToolUseId, cache[72] = shouldAnimate, cache[73] = shouldShowDot, cache[74] = Oe, cache[75] = terminalSize, cache[76] = theme, cache[77] = tools, cache[78] = verbose, cache[79] = outerBox, cache[80] = columnBox, cache[81] = innerBox, cache[82] = isQueued, cache[83] = isResolved, cache[84] = isPending, cache[85] = headerMessage, cache[86] = toolUseTag, cache[87] = columnDirection, cache[88] = rowDirection, cache[89] = justifyContent, cache[90] = marginTop, cache[91] = boxWidth, cache[92] = onMouseEnter, cache[93] = onMouseLeave, cache[94] = rowFlexWrap, cache[95] = rowMinWidth, cache[96] = dotIndicator, cache[97] = toolNameEl, cache[98] = earlyReturn, cache[99] = ge;
      } else outerBox = cache[79], columnBox = cache[80], innerBox = cache[81], isQueued = cache[82], isResolved = cache[83], isPending = cache[84], headerMessage = cache[85], toolUseTag = cache[86], columnDirection = cache[87], rowDirection = cache[88], justifyContent = cache[89], marginTop = cache[90], boxWidth = cache[91], onMouseEnter = cache[92], onMouseLeave = cache[93], rowFlexWrap = cache[94], rowMinWidth = cache[95], dotIndicator = cache[96], toolNameEl = cache[97], earlyReturn = cache[98], ge = cache[99];
    }
    cache[11] = addMargin, cache[12] = isHovered, cache[13] = commands, cache[14] = inProgressToolCallCount, cache[15] = inProgressToolUseIDs, cache[16] = isSelected, cache[17] = isTranscriptMode, cache[18] = lookups, cache[19] = messageUuid, cache[20] = param, cache[21] = toolInfo, cache[22] = workerRequest?.toolUseId, cache[23] = progressMessagesForMessage, cache[24] = pendingWorkerRequest, cache[25] = mouseHandlers, cache[26] = secondaryToolUseId, cache[27] = shouldAnimate, cache[28] = shouldShowDot, cache[29] = isThinkingTool, cache[30] = terminalSize, cache[31] = theme, cache[32] = tools, cache[33] = verbose, cache[34] = outerBox, cache[35] = columnBox, cache[36] = innerBox, cache[37] = isQueued, cache[38] = isResolved, cache[39] = isPending, cache[40] = headerMessage, cache[41] = toolUseTag, cache[42] = columnDirection, cache[43] = rowDirection, cache[44] = justifyContent, cache[45] = marginTop, cache[46] = boxWidth, cache[47] = onMouseEnter, cache[48] = onMouseLeave, cache[49] = rowFlexDirection, cache[50] = rowFlexWrap, cache[51] = rowMinWidth, cache[52] = dotIndicator, cache[53] = toolNameEl, cache[54] = earlyReturn, cache[55] = ge;
  } else outerBox = cache[34], columnBox = cache[35], innerBox = cache[36], isQueued = cache[37], isResolved = cache[38], isPending = cache[39], headerMessage = cache[40], toolUseTag = cache[41], columnDirection = cache[42], rowDirection = cache[43], justifyContent = cache[44], marginTop = cache[45], boxWidth = cache[46], onMouseEnter = cache[47], onMouseLeave = cache[48], rowFlexDirection = cache[49], rowFlexWrap = cache[50], rowMinWidth = cache[51], dotIndicator = cache[52], toolNameEl = cache[53], earlyReturn = cache[54], ge = cache[55];
  if (rowFlexDirection !== Symbol.for("react.early_return_sentinel")) return rowFlexDirection;
  let Te;
  if (cache[173] !== outerBox || cache[174] !== headerMessage || cache[175] !== toolUseTag || cache[176] !== rowFlexWrap || cache[177] !== rowMinWidth || cache[178] !== dotIndicator || cache[179] !== toolNameEl || cache[180] !== earlyReturn) Te = UI.jsxs(outerBox, {
    flexDirection: rowFlexWrap,
    flexWrap: rowMinWidth,
    minWidth: dotIndicator,
    children: [toolNameEl, earlyReturn, headerMessage, toolUseTag]
  }), cache[173] = outerBox, cache[174] = headerMessage, cache[175] = toolUseTag, cache[176] = rowFlexWrap, cache[177] = rowMinWidth, cache[178] = dotIndicator, cache[179] = toolNameEl, cache[180] = earlyReturn, cache[181] = Te;else Te = cache[181];
  let he;
  if (cache[182] !== inProgressToolCallCount || cache[183] !== isAutoOrPlanWithStrip || cache[184] !== false || cache[185] !== isQueued || cache[186] !== isResolved || cache[187] !== isTranscriptMode || cache[188] !== isPending || cache[189] !== lookups || cache[190] !== param.id || cache[191] !== progressMessagesForMessage || cache[192] !== terminalSize || cache[193] !== ge || cache[194] !== tools || cache[195] !== verbose) he = !isResolved && (isPending ? UI.jsx(Yn, {
    height: 1,
    children: UI.jsx(v, {
      dimColor: true,
      children: "Waiting for permission\u2026"
    })
  }) : isQueued ? jxp(ge) : Z3a(ge, tools, lookups, param.id, progressMessagesForMessage, {
    verbose: verbose,
    inProgressToolCallCount: inProgressToolCallCount,
    isTranscriptMode: isTranscriptMode
  }, terminalSize)), cache[182] = inProgressToolCallCount, cache[183] = isAutoOrPlanWithStrip, cache[184] = false, cache[185] = isQueued, cache[186] = isResolved, cache[187] = isTranscriptMode, cache[188] = isPending, cache[189] = lookups, cache[190] = param.id, cache[191] = progressMessagesForMessage, cache[192] = terminalSize, cache[193] = ge, cache[194] = tools, cache[195] = verbose, cache[196] = he;else he = cache[196];
  let ye;
  if (cache[197] !== columnBox || cache[198] !== columnDirection || cache[199] !== Te || cache[200] !== he) ye = UI.jsxs(columnBox, {
    flexDirection: columnDirection,
    children: [Te, he]
  }), cache[197] = columnBox, cache[198] = columnDirection, cache[199] = Te, cache[200] = he, cache[201] = ye;else ye = cache[201];
  let we;
  if (cache[202] !== innerBox || cache[203] !== rowDirection || cache[204] !== justifyContent || cache[205] !== marginTop || cache[206] !== boxWidth || cache[207] !== onMouseEnter || cache[208] !== onMouseLeave || cache[209] !== ye) we = UI.jsx(innerBox, {
    flexDirection: rowDirection,
    justifyContent: justifyContent,
    marginTop: marginTop,
    width: boxWidth,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    children: ye
  }), cache[202] = innerBox, cache[203] = rowDirection, cache[204] = justifyContent, cache[205] = marginTop, cache[206] = boxWidth, cache[207] = onMouseEnter, cache[208] = onMouseLeave, cache[209] = ye, cache[210] = we;else we = cache[210];
  return we;
}
function Gxp(state) {
  return !!state.toolPermissionContext.strippedDangerousRules;
}
function Vxp(state) {
  return state.toolPermissionContext.mode;
}
function Kxp(state) {
  return state.pendingWorkerRequest;
}
function zxp(tool, input, {
  theme: theme,
  verbose: verbose,
  commands: commands
}) {
  let fastPath = goe(input);
  if (fastPath !== null) return fastPath;
  try {
    return tool.renderToolUseMessage(input, {
      theme: theme,
      verbose: verbose,
      commands: commands
    });
  } catch (err) {
    return Ie(Error(`Error rendering tool use message for ${tool.name}: ${err}`)), "";
  }
}
function Z3a(tool, tools, lookups, toolUseID, progressMessages, {
  verbose: verbose,
  inProgressToolCallCount: inProgressToolCallCount,
  isTranscriptMode: isTranscriptMode
}, terminalSize) {
  let filteredProgress = progressMessages.filter(msg => msg.data.type !== "hook_progress");
  try {
    let progressEl = tool.renderToolUseProgressMessage?.(filteredProgress, {
      tools: tools,
      verbose: verbose,
      terminalSize: terminalSize,
      inProgressToolCallCount: inProgressToolCallCount ?? 1,
      isTranscriptMode: isTranscriptMode
    }) ?? null;
    return UI.jsxs(UI.Fragment, {
      children: [UI.jsx(B6e, {
        children: UI.jsx(y3n, {
          hookEvent: "PreToolUse",
          lookups: lookups,
          toolUseID: toolUseID,
          verbose: verbose,
          isTranscriptMode: isTranscriptMode
        })
      }), progressEl]
    });
  } catch (err) {
    return Ie(Error(`Error rendering tool use progress message for ${tool.name}: ${err}`)), null;
  }
}
function jxp(tool) {
  try {
    return tool.renderToolUseQueuedMessage?.();
  } catch (err) {
    return Ie(Error(`Error rendering tool use queued message for ${tool.name}: ${err}`)), null;
  }
}
var e4a, Odt, UI;
var n4a = b(() => {
  ui();
  Pa();
  wVr();
  mc();
  je();
  uo();
  ri();
  K3a();
  MO();
  j3a();
  qe();
  NW();
  tp();
  pd();
  vn();
  vte();
  Pl();
  _3n();
  _dt();
  zpo();
  ydt();
  jpo();
  e4a = x(tt(), 1), Odt = x(et(), 1), UI = x(oe(), 1);
});

export {t4a,Gxp,Vxp,Kxp,zxp,Z3a,jxp,e4a,Odt,UI,n4a};
