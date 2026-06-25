// @ts-nocheck
import {Ate,_Y} from "./3988_toolName.ts";
import {GPl,Rgt} from "../../vendor/m4970.ts";
import {j_e,ix} from "../../vendor/m3842.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {c$n,tce} from "./3892_permissionMode.ts";
import {lEn,rz} from "../config/2253_displayName.ts";
import {gS,vte} from "../../vendor/m3991.ts";
import {isBuiltInAgent as Gh,kg} from "./4476_toAgentInfos.ts";
import {gh,G1} from "../../vendor/m3957.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Agent configuration preview component (permission confirmation UI).
 *
 * Renders a read-only summary of a subagent definition — its description,
 * resolved tools, model, permission mode, memory, hooks, skills, color and
 * system prompt — shown when the user is asked to confirm using an agent.
 *
 * Compiled by the React Compiler: `S0o.c(n)` allocates a memoization cache of
 * length `n`; each guarded `if (cache[i] !== input)` block recomputes a value
 * only when its dependency changed, otherwise reuses the cached result. The
 * `Symbol.for("react.memo_cache_sentinel")` slots are constant (never-changing)
 * cached values.
 */

/**
 * @param props.agent  The subagent configuration to preview.
 * @param props.tools  Tool list used to resolve available/unavailable tools.
 * @param props.onBack Callback invoked when the user dismisses the preview.
 */
function YPl(props) {
  let cache = S0o.c(48),
    {
      agent: agent,
      tools: tools,
      onBack: onBack
    } = props,
    resolvedTools;
  if (cache[0] !== agent || cache[1] !== tools) resolvedTools = Ate(agent, tools, !1), cache[0] = agent, cache[1] = tools, cache[2] = resolvedTools;else resolvedTools = cache[2];
  let resolvedToolsValue = resolvedTools,
    modelLabelRaw;
  if (cache[3] !== agent) modelLabelRaw = GPl(agent), cache[3] = agent, cache[4] = modelLabelRaw;else modelLabelRaw = cache[4];
  let agentSummary = modelLabelRaw,
    agentColorRaw;
  if (cache[5] !== agent.agentType) agentColorRaw = j_e(agent.agentType), cache[5] = agent.agentType, cache[6] = agentColorRaw;else agentColorRaw = cache[6];
  let agentColor = agentColorRaw,
    confirmOptions;
  if (cache[7] === Symbol.for("react.memo_cache_sentinel")) confirmOptions = {
    context: "Confirmation"
  }, cache[7] = confirmOptions;else confirmOptions = cache[7];
  Or("confirm:no", onBack, confirmOptions);
  let onReturnKey;
  if (cache[8] !== onBack) onReturnKey = (keyEvent) => {
    if (keyEvent.key === "return") keyEvent.preventDefault(), onBack();
  }, cache[8] = onBack, cache[9] = onReturnKey;else onReturnKey = cache[9];
  let handleKeyDown = onReturnKey,
    summaryNode;
  if (cache[10] !== agentSummary) summaryNode = Vm.jsx(v, {
    dimColor: !0,
    children: agentSummary
  }), cache[10] = agentSummary, cache[11] = summaryNode;else summaryNode = cache[11];
  let descriptionLabel;
  if (cache[12] === Symbol.for("react.memo_cache_sentinel")) descriptionLabel = Vm.jsxs(v, {
    children: [Vm.jsx(v, {
      bold: !0,
      children: "Description"
    }), " (tells Claude when to use this agent):"]
  }), cache[12] = descriptionLabel;else descriptionLabel = cache[12];
  let descriptionSection;
  if (cache[13] !== agent.whenToUse) descriptionSection = Vm.jsxs($, {
    flexDirection: "column",
    children: [descriptionLabel, Vm.jsx($, {
      marginLeft: 2,
      children: Vm.jsx(v, {
        children: agent.whenToUse
      })
    })]
  }), cache[13] = agent.whenToUse, cache[14] = descriptionSection;else descriptionSection = cache[14];
  let toolsLabel;
  if (cache[15] === Symbol.for("react.memo_cache_sentinel")) toolsLabel = Vm.jsxs(v, {
    children: [Vm.jsx(v, {
      bold: !0,
      children: "Tools"
    }), ":", " "]
  }), cache[15] = toolsLabel;else toolsLabel = cache[15];
  let toolsSection;
  if (cache[16] !== resolvedToolsValue) toolsSection = Vm.jsxs($, {
    children: [toolsLabel, Vm.jsx(bgm, {
      resolvedTools: resolvedToolsValue
    })]
  }), cache[16] = resolvedToolsValue, cache[17] = toolsSection;else toolsSection = cache[17];
  let modelLabel;
  if (cache[18] === Symbol.for("react.memo_cache_sentinel")) modelLabel = Vm.jsx(v, {
    bold: !0,
    children: "Model"
  }), cache[18] = modelLabel;else modelLabel = cache[18];
  let modelDisplayName;
  if (cache[19] !== agent.model) modelDisplayName = c$n(agent.model), cache[19] = agent.model, cache[20] = modelDisplayName;else modelDisplayName = cache[20];
  let modelSection;
  if (cache[21] !== modelDisplayName) modelSection = Vm.jsxs(v, {
    children: [modelLabel, ": ", modelDisplayName]
  }), cache[21] = modelDisplayName, cache[22] = modelSection;else modelSection = cache[22];
  let permissionModeSection;
  if (cache[23] !== agent.permissionMode) permissionModeSection = agent.permissionMode && Vm.jsxs(v, {
    children: [Vm.jsx(v, {
      bold: !0,
      children: "Permission mode"
    }), ": ", agent.permissionMode]
  }), cache[23] = agent.permissionMode, cache[24] = permissionModeSection;else permissionModeSection = cache[24];
  let memorySection;
  if (cache[25] !== agent.memory) memorySection = agent.memory && Vm.jsxs(v, {
    children: [Vm.jsx(v, {
      bold: !0,
      children: "Memory"
    }), ": ", lEn(agent.memory)]
  }), cache[25] = agent.memory, cache[26] = memorySection;else memorySection = cache[26];
  let hooksSection;
  if (cache[27] !== agent.hooks) hooksSection = agent.hooks && Object.keys(agent.hooks).length > 0 && Vm.jsxs(v, {
    children: [Vm.jsx(v, {
      bold: !0,
      children: "Hooks"
    }), ": ", Object.keys(agent.hooks).join(", ")]
  }), cache[27] = agent.hooks, cache[28] = hooksSection;else hooksSection = cache[28];
  let skillsSection;
  if (cache[29] !== agent.skills) skillsSection = agent.skills && agent.skills.length > 0 && Vm.jsxs(v, {
    children: [Vm.jsx(v, {
      bold: !0,
      children: "Skills"
    }), ":", " ", agent.skills.length > 10 ? `${agent.skills.length} skills` : agent.skills.join(", ")]
  }), cache[29] = agent.skills, cache[30] = skillsSection;else skillsSection = cache[30];
  let colorSection;
  if (cache[31] !== agent.agentType || cache[32] !== agentColor) colorSection = agentColor && Vm.jsx($, {
    children: Vm.jsxs(v, {
      children: [Vm.jsx(v, {
        bold: !0,
        children: "Color"
      }), ":", " ", Vm.jsx(gS, {
        color: agentColor,
        padded: !0,
        children: agent.agentType
      })]
    })
  }), cache[31] = agent.agentType, cache[32] = agentColor, cache[33] = colorSection;else colorSection = cache[33];
  let systemPromptSection;
  if (cache[34] !== agent) systemPromptSection = !Gh(agent) && Vm.jsxs(Vm.Fragment, {
    children: [Vm.jsx($, {
      children: Vm.jsxs(v, {
        children: [Vm.jsx(v, {
          bold: !0,
          children: "System prompt"
        }), ":"]
      })
    }), Vm.jsx($, {
      marginLeft: 2,
      marginRight: 2,
      children: Vm.jsx(gh, {
        children: agent.getSystemPrompt()
      })
    })]
  }), cache[34] = agent, cache[35] = systemPromptSection;else systemPromptSection = cache[35];
  let containerNode;
  if (cache[36] !== handleKeyDown || cache[37] !== toolsSection || cache[38] !== modelSection || cache[39] !== permissionModeSection || cache[40] !== memorySection || cache[41] !== hooksSection || cache[42] !== skillsSection || cache[43] !== colorSection || cache[44] !== systemPromptSection || cache[45] !== summaryNode || cache[46] !== descriptionSection) containerNode = Vm.jsxs($, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: handleKeyDown,
    children: [summaryNode, descriptionSection, toolsSection, modelSection, permissionModeSection, memorySection, hooksSection, skillsSection, colorSection, systemPromptSection]
  }), cache[36] = handleKeyDown, cache[37] = toolsSection, cache[38] = modelSection, cache[39] = permissionModeSection, cache[40] = memorySection, cache[41] = hooksSection, cache[42] = skillsSection, cache[43] = colorSection, cache[44] = systemPromptSection, cache[45] = summaryNode, cache[46] = descriptionSection, cache[47] = containerNode;else containerNode = cache[47];
  return containerNode;
}

/**
 * Renders the resolved tool list for an agent preview: lists valid tools, and
 * warns about tools that are unavailable to subagents or unrecognized.
 *
 * @param props.resolvedTools The resolution result with wildcard flag plus
 *                            valid/unavailable/invalid tool name buckets.
 */
function bgm(props) {
  let cache = S0o.c(12),
    {
      resolvedTools: resolvedTools
    } = props;
  if (resolvedTools.hasWildcard) {
    let allToolsNode;
    if (cache[0] === Symbol.for("react.memo_cache_sentinel")) allToolsNode = Vm.jsx(v, {
      children: "All tools"
    }), cache[0] = allToolsNode;else allToolsNode = cache[0];
    return allToolsNode;
  }
  let {
    validTools: validTools,
    unavailableTools: unavailableTools,
    invalidTools: invalidTools
  } = resolvedTools;
  if (validTools.length === 0 && unavailableTools.length === 0 && invalidTools.length === 0) {
    let noneNode;
    if (cache[1] === Symbol.for("react.memo_cache_sentinel")) noneNode = Vm.jsx(v, {
      children: "None"
    }), cache[1] = noneNode;else noneNode = cache[1];
    return noneNode;
  }
  let validToolsNode;
  if (cache[2] !== validTools) validToolsNode = validTools.length > 0 && Vm.jsx(v, {
    children: validTools.join(", ")
  }), cache[2] = validTools, cache[3] = validToolsNode;else validToolsNode = cache[3];
  let unavailableToolsNode;
  if (cache[4] !== unavailableTools) unavailableToolsNode = unavailableTools.length > 0 && Vm.jsxs(v, {
    color: "warning",
    children: [Xe.warning, " Not available to subagents:", " ", unavailableTools.join(", ")]
  }), cache[4] = unavailableTools, cache[5] = unavailableToolsNode;else unavailableToolsNode = cache[5];
  let invalidToolsNode;
  if (cache[6] !== invalidTools) invalidToolsNode = invalidTools.length > 0 && Vm.jsxs(v, {
    color: "warning",
    children: [Xe.warning, " Unrecognized: ", invalidTools.join(", ")]
  }), cache[6] = invalidTools, cache[7] = invalidToolsNode;else invalidToolsNode = cache[7];
  let toolListNode;
  if (cache[8] !== validToolsNode || cache[9] !== unavailableToolsNode || cache[10] !== invalidToolsNode) toolListNode = Vm.jsxs($, {
    flexDirection: "column",
    children: [validToolsNode, unavailableToolsNode, invalidToolsNode]
  }), cache[8] = validToolsNode, cache[9] = unavailableToolsNode, cache[10] = invalidToolsNode, cache[11] = toolListNode;else toolListNode = cache[11];
  return toolListNode;
}
var S0o, Vm;
var JPl = b(() => {
  Zs();
  je();
  ss();
  ix();
  rz();
  _Y();
  kg();
  tce();
  vte();
  G1();
  Rgt();
  S0o = x(tt(), 1), Vm = x(oe(), 1);
});

export {YPl,bgm,S0o,Vm,JPl};
