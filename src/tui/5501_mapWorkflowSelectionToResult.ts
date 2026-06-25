// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {WORKFLOW_TOOL_NAME as AI} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {Bw,Nte} from "../../vendor/m4186.ts";
import {fec,hec} from "../../vendor/m5499.ts";
import {AL,d9} from "../../vendor/m4632.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {VBo,KBo} from "../tools/5493_behavior.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {getOriginalCwd as gr,lt} from "../session/0132_sent.ts";
import {Pi,vu} from "../mcp/2200_mcpServerName.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {xB,j0e} from "../../vendor/m3918.ts";
import {ZOe,pzt} from "./5491_options.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {hm,DI} from "../../vendor/m3357.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
var Sec = {};
ft(Sec, {
  mapWorkflowSelectionToResult: () => mapWorkflowSelectionToResult,
  WorkflowPermissionDialog: () => WorkflowPermissionDialog,
  WORKFLOW_USAGE_WARNING: () => WORKFLOW_USAGE_WARNING
});
function mapWorkflowSelectionToResult(selection, request, script, feedback) {
  switch (selection) {
    case "yes":
      return {
        behavior: "allow",
        updatedInput: {
          ...request.input,
          script: script
        },
        ...(feedback && {
          feedback: feedback
        })
      };
    case "yes-always":
      return {
        behavior: "allow",
        updatedInput: {
          ...request.input,
          script: script
        },
        ...(request.workflowName && {
          permissionUpdates: [{
            type: "addRules",
            rules: [{
              toolName: AI,
              ruleContent: request.workflowName
            }],
            behavior: "allow",
            destination: "localSettings"
          }]
        })
      };
    case "no":
      return {
        behavior: "deny",
        ...(feedback && {
          feedback: feedback
        })
      };
  }
}
function WorkflowPermissionDialog(props) {
  let cache = gec.c(71),
    {
      payload: payload,
      answer: answer
    } = props,
    [script, setScript] = zBo.useState(payload.script),
    parsedScript;
  if (cache[0] !== script) parsedScript = Bw(script), cache[0] = script, cache[1] = parsedScript;else parsedScript = cache[1];
  let parseResult = parsedScript,
    parsedWorkflow = "error" in parseResult ? null : parseResult,
    scriptBody = parsedWorkflow?.scriptBody ?? script,
    summarized;
  if (cache[2] !== scriptBody) summarized = fec(scriptBody), cache[2] = scriptBody, cache[3] = summarized;else summarized = cache[3];
  let summary = summarized,
    phaseSummaries;
  e: {
    let collectPrompts = J9m,
      mapAgentPhase;
    if (cache[4] === Symbol.for("react.memo_cache_sentinel")) mapAgentPhase = agentPhase => ({
      title: V9m[agentPhase.kind] + (agentPhase.annotation ? ` ${agentPhase.annotation}` : ""),
      prompts: collectPrompts(agentPhase)
    }), cache[4] = mapAgentPhase;else mapAgentPhase = cache[4];
    let buildAgentPhase = mapAgentPhase,
      metaPhases = parsedWorkflow?.meta.phases;
    if (metaPhases && metaPhases.length > 0) {
      let merged;
      if (cache[5] !== metaPhases || cache[6] !== summary?.phases) {
        let mapMetaPhase;
        if (cache[8] !== summary?.phases) mapMetaPhase = (metaPhase, index) => ({
          title: metaPhase.title,
          detail: metaPhase.detail,
          prompts: collectPrompts(summary?.phases[index])
        }), cache[8] = summary?.phases, cache[9] = mapMetaPhase;else mapMetaPhase = cache[9];
        let metaMapped = metaPhases.map(mapMetaPhase),
          extraPhases = (summary?.phases ?? []).slice(metaPhases.length).map(buildAgentPhase);
        merged = [...metaMapped, ...extraPhases], cache[5] = metaPhases, cache[6] = summary?.phases, cache[7] = merged;
      } else merged = cache[7];
      phaseSummaries = merged;
      break e;
    }
    if (summary && summary.phases.length > 0) {
      let mapped;
      if (cache[10] !== summary.phases) mapped = summary.phases.map(buildAgentPhase), cache[10] = summary.phases, cache[11] = mapped;else mapped = cache[11];
      phaseSummaries = mapped;
      break e;
    }
    phaseSummaries = null;
  }
  let phases = phaseSummaries,
    [showRaw, setShowRaw] = zBo.useState(phases === null),
    keyHandler;
  if (cache[12] !== script) keyHandler = function (keyEvent) {
    if (keyEvent.ctrl && keyEvent.key === "g") {
      keyEvent.preventDefault();
      let editResult = AL(script);
      if (editResult.content !== null && editResult.content !== script) setScript(editResult.content), setShowRaw(false);
    }
  }, cache[12] = script, cache[13] = keyHandler;else keyHandler = cache[13];
  let onKeyDown = keyHandler,
    selectHandler;
  if (cache[14] !== answer || cache[15] !== payload || cache[16] !== script) selectHandler = (value, feedback) => {
    if (value === "toggle") {
      setShowRaw(Y9m);
      return;
    }
    answer(mapWorkflowSelectionToResult(value, payload, script, feedback));
  }, cache[14] = answer, cache[15] = payload, cache[16] = script, cache[17] = selectHandler;else selectHandler = cache[17];
  let onSelect = selectHandler,
    cancelHandler;
  if (cache[18] !== answer) cancelHandler = () => {
    answer({
      behavior: "deny"
    });
  }, cache[18] = answer, cache[19] = cancelHandler;else cancelHandler = cache[19];
  let onCancel = cancelHandler,
    description = parsedWorkflow?.meta.description,
    argsPreviewValue;
  e: {
    if (payload.args === undefined) {
      argsPreviewValue = undefined;
      break e;
    }
    let preview;
    if (cache[20] !== payload.args) {
      let serialized;
      try {
        serialized = Pe(payload.args);
      } catch {
        serialized = String(payload.args);
      }
      preview = serialized.length > 120 ? serialized.slice(0, 119) + "\u2026" : serialized, cache[20] = payload.args, cache[21] = preview;
    } else preview = cache[21];
    argsPreviewValue = preview;
  }
  let argsPreview = argsPreviewValue,
    workflowBadgeValue;
  if (cache[22] !== payload) workflowBadgeValue = Boolean(payload.workflowName) && VBo(payload), cache[22] = payload, cache[23] = workflowBadgeValue;else workflowBadgeValue = cache[23];
  let showYesAlways = workflowBadgeValue,
    yesOption;
  if (cache[24] === Symbol.for("react.memo_cache_sentinel")) yesOption = {
    label: "Yes, run it",
    value: "yes",
    feedbackConfig: {
      type: "accept"
    }
  }, cache[24] = yesOption;else yesOption = cache[24];
  let optionsValue;
  if (cache[25] !== phases || cache[26] !== payload.workflowName || cache[27] !== showYesAlways || cache[28] !== showRaw) {
    if (optionsValue = [yesOption], showYesAlways) {
      let workflowNameNode;
      if (cache[30] !== payload.workflowName) workflowNameNode = xb.jsx(v, {
        bold: true,
        children: payload.workflowName
      }), cache[30] = payload.workflowName, cache[31] = workflowNameNode;else workflowNameNode = cache[31];
      let cwdNode;
      if (cache[32] === Symbol.for("react.memo_cache_sentinel")) cwdNode = xb.jsx(v, {
        bold: true,
        children: gr()
      }), cache[32] = cwdNode;else cwdNode = cache[32];
      let yesAlwaysOption;
      if (cache[33] !== workflowNameNode) yesAlwaysOption = {
        label: xb.jsxs(v, {
          children: ["Yes, and don't ask again for", " ", workflowNameNode, " in", " ", cwdNode]
        }),
        value: "yes-always"
      }, cache[33] = workflowNameNode, cache[34] = yesAlwaysOption;else yesAlwaysOption = cache[34];
      optionsValue.push(yesAlwaysOption);
    }
    if (phases) {
      let toggleLabel = showRaw ? "View workflow summary" : "View raw script",
        toggleOption;
      if (cache[35] !== toggleLabel) toggleOption = {
        label: toggleLabel,
        value: "toggle"
      }, cache[35] = toggleLabel, cache[36] = toggleOption;else toggleOption = cache[36];
      optionsValue.push(toggleOption);
    }
    let noOption;
    if (cache[37] === Symbol.for("react.memo_cache_sentinel")) noOption = {
      label: "No",
      value: "no",
      feedbackConfig: {
        type: "reject"
      }
    }, cache[37] = noOption;else noOption = cache[37];
    optionsValue.push(noOption), cache[25] = phases, cache[26] = payload.workflowName, cache[27] = showYesAlways, cache[28] = showRaw, cache[29] = optionsValue;
  } else optionsValue = cache[29];
  let options = optionsValue,
    resolvedToolName;
  if (cache[38] !== payload.toolName) resolvedToolName = Pi(payload.toolName), cache[38] = payload.toolName, cache[39] = resolvedToolName;else resolvedToolName = cache[39];
  let analyticsContextValue;
  if (cache[40] !== payload.isMcp || cache[41] !== resolvedToolName) analyticsContextValue = {
    toolName: resolvedToolName,
    isMcp: payload.isMcp
  }, cache[40] = payload.isMcp, cache[41] = resolvedToolName, cache[42] = analyticsContextValue;else analyticsContextValue = cache[42];
  let toolAnalyticsContext = analyticsContextValue,
    descriptionNode;
  if (cache[43] !== description) descriptionNode = description && xb.jsx($, {
    marginBottom: 1,
    children: xb.jsx(v, {
      bold: true,
      children: description
    })
  }), cache[43] = description, cache[44] = descriptionNode;else descriptionNode = cache[44];
  let scriptOrSummaryNode;
  if (cache[45] !== phases || cache[46] !== script || cache[47] !== showRaw) scriptOrSummaryNode = showRaw || !phases ? xb.jsx($, {
    borderStyle: "dashed",
    borderColor: "subtle",
    paddingX: 1,
    children: xb.jsx(xB, {
      code: script,
      filePath: "workflow.js"
    })
  }) : xb.jsxs($, {
    flexDirection: "column",
    children: [xb.jsx(v, {
      children: "This dynamic workflow will spin up multiple subagents across the following phases:"
    }), phases.map(z9m)]
  }), cache[45] = phases, cache[46] = script, cache[47] = showRaw, cache[48] = scriptOrSummaryNode;else scriptOrSummaryNode = cache[48];
  let argsNode;
  if (cache[49] !== argsPreview) argsNode = argsPreview && xb.jsx($, {
    marginTop: 1,
    children: xb.jsxs(v, {
      children: [xb.jsxs(v, {
        bold: true,
        dimColor: true,
        children: ["args:", " "]
      }), xb.jsx(v, {
        dimColor: true,
        children: argsPreview
      })]
    })
  }), cache[49] = argsPreview, cache[50] = argsNode;else argsNode = cache[50];
  let bodyNode;
  if (cache[51] !== descriptionNode || cache[52] !== scriptOrSummaryNode || cache[53] !== argsNode) bodyNode = xb.jsxs($, {
    flexDirection: "column",
    paddingX: 1,
    marginBottom: 1,
    overflow: "hidden",
    children: [descriptionNode, scriptOrSummaryNode, argsNode]
  }), cache[51] = descriptionNode, cache[52] = scriptOrSummaryNode, cache[53] = argsNode, cache[54] = bodyNode;else bodyNode = cache[54];
  let usageWarningNode;
  if (cache[55] === Symbol.for("react.memo_cache_sentinel")) usageWarningNode = xb.jsx($, {
    marginBottom: 1,
    children: xb.jsx(v, {
      color: "warning",
      children: WORKFLOW_USAGE_WARNING
    })
  }), cache[55] = usageWarningNode;else usageWarningNode = cache[55];
  let selectMenuNode;
  if (cache[56] !== onCancel || cache[57] !== onSelect || cache[58] !== options || cache[59] !== toolAnalyticsContext) selectMenuNode = xb.jsx(ZOe, {
    options: options,
    onSelect: onSelect,
    onCancel: onCancel,
    question: usageWarningNode,
    toolAnalyticsContext: toolAnalyticsContext
  }), cache[56] = onCancel, cache[57] = onSelect, cache[58] = options, cache[59] = toolAnalyticsContext, cache[60] = selectMenuNode;else selectMenuNode = cache[60];
  let editHintNode;
  if (cache[61] === Symbol.for("react.memo_cache_sentinel")) editHintNode = xb.jsx(v, {
    dimColor: true,
    children: xb.jsx(at, {
      chord: "ctrl+g",
      action: "edit script in $EDITOR"
    })
  }), cache[61] = editHintNode;else editHintNode = cache[61];
  let menuNode;
  if (cache[62] !== selectMenuNode) menuNode = xb.jsxs($, {
    flexDirection: "column",
    paddingX: 1,
    children: [selectMenuNode, editHintNode]
  }), cache[62] = selectMenuNode, cache[63] = menuNode;else menuNode = cache[63];
  let containerNode;
  if (cache[64] !== onKeyDown || cache[65] !== bodyNode || cache[66] !== menuNode) containerNode = xb.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: onKeyDown,
    children: [bodyNode, menuNode]
  }), cache[64] = onKeyDown, cache[65] = bodyNode, cache[66] = menuNode, cache[67] = containerNode;else containerNode = cache[67];
  let dialogNode;
  if (cache[68] !== payload.requestSource || cache[69] !== containerNode) dialogNode = xb.jsx(hm, {
    color: "permission",
    title: "Run a dynamic workflow?",
    requestSource: payload.requestSource,
    children: containerNode
  }), cache[68] = payload.requestSource, cache[69] = containerNode, cache[70] = dialogNode;else dialogNode = cache[70];
  return dialogNode;
}
function z9m(phase, index) {
  return xb.jsxs(_ec.Fragment, {
    children: [xb.jsxs(v, {
      children: ["  ", index + 1, ". ", phase.title, phase.detail ? xb.jsxs(v, {
        dimColor: true,
        children: [" \u2014 ", phase.detail]
      }) : ""]
    }), phase.prompts.length > 0 && xb.jsxs(v, {
      dimColor: true,
      children: ["     ", phase.prompts.slice(0, 2).map(j9m).join("  "), phase.prompts.length > 2 ? `  +${phase.prompts.length - 2} more` : ""]
    })]
  }, index);
}
function j9m(prompt) {
  return `\xB7 "${prompt.length > 60 ? prompt.slice(0, 59) + "\u2026" : prompt}"`;
}
function Y9m(showRaw) {
  return !showRaw;
}
function J9m(workflow) {
  let seen = new Set(),
    prompts = [];
  for (let agent of workflow?.agents ?? []) if (agent.prompt && !seen.has(agent.prompt)) seen.add(agent.prompt), prompts.push(agent.prompt);
  return prompts;
}
var gec, _ec, zBo, xb, WORKFLOW_USAGE_WARNING, V9m;
var bec = b(() => {
  lt();
  Wo();
  j0e();
  DI();
  pzt();
  je();
  vu();
  hec();
  Nte();
  d9();
  tn();
  KBo();
  gec = x(tt(), 1), _ec = x(et(), 1), zBo = x(et(), 1), xb = x(oe(), 1), WORKFLOW_USAGE_WARNING = "Dynamic workflows can use a lot of tokens quickly by running many " + "subagents in parallel \u2014 which counts against your usage limit. Stop a " + "running workflow at any time with /workflows, or disable dynamic workflows in /config.", V9m = {
    loop: "loop",
    parallel: "parallel",
    sequential: "step"
  };
});

export {Sec,mapWorkflowSelectionToResult,WorkflowPermissionDialog,z9m,j9m,Y9m,J9m,gec,_ec,zBo,xb,WORKFLOW_USAGE_WARNING,V9m,bec};
