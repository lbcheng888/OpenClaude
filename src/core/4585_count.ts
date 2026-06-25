// @ts-nocheck
import {Kje,wm} from "../../vendor/m707.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {formatTokens as el,formatTokenEstimate as Ure,Xo} from "../../vendor/m240.ts";
import {cs,kte} from "../../vendor/m3992.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {getPublicModelDisplayName as g7,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {Xhl,Qhl} from "../../vendor/m4582.ts";
import {egl,tgl} from "../../vendor/m4583.ts";
import {dd,Xl} from "../config/0651_maxBytes.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Context Usage view (the `/context` command output).
 *
 * Renders a breakdown of how the model's context window is being consumed:
 * a token grid, per-category token counts, the auto-compact window, and
 * expandable sections for MCP tools, custom agents, memory files and skills.
 *
 * NOTE: This module diverged structurally from its v2.1.185 counterpart
 * (which rendered grep/glob results), so names here are derived directly from
 * the v190 code rather than ported.
 */

/** Spacer/divider element rendered between sections when not remote. */
function VZp() {
  let cache = CKn.c(2);
  return null;
}

/**
 * Groups agents/skills by display label and sorts each group by token count
 * (descending). Known top-level categories in `KZp` are emitted first (with
 * their plugin-scoped sub-entries), then everything else.
 */
function ngl(items) {
  let byLabel: Map<string, any[]> = new Map();
  for (let item of items) {
    let label = Kje(item.source) + (item.pluginName ? ` (${item.pluginName})` : ""),
      bucket = byLabel.get(label) || [];
    bucket.push(item), byLabel.set(label, bucket);
  }
  for (let [label, bucket] of byLabel.entries())
    byLabel.set(label, bucket.sort((a, b) => b.tokens - a.tokens));
  let ordered: Map<string, any[]> = new Map();
  for (let category of KZp) {
    let bucket = byLabel.get(category);
    if (bucket) ordered.set(category, bucket);
    let pluginScoped = [...byLabel.keys()].filter(key => key.startsWith(category + " (")).sort();
    for (let key of pluginScoped) ordered.set(key, byLabel.get(key));
  }
  for (let [label, bucket] of byLabel) if (!ordered.has(label)) ordered.set(label, bucket);
  return ordered;
}

/**
 * Collapsed one-line summary node, e.g. "5 tools · 1.2k tokens".
 * Memoizes the pluralized noun and formatted token count separately.
 */
function EKn(props) {
  let cache = CKn.c(9),
    {
      count: count,
      noun: noun,
      tokens: tokens
    } = props,
    nounText;
  if (cache[0] !== count || cache[1] !== noun)
    nounText = Sn(count, noun), cache[0] = count, cache[1] = noun, cache[2] = nounText;
  else nounText = cache[2];
  let tokensText;
  if (cache[3] !== tokens)
    tokensText = el(tokens), cache[3] = tokens, cache[4] = tokensText;
  else tokensText = cache[4];
  let summaryNode;
  if (cache[5] !== count || cache[6] !== nounText || cache[7] !== tokensText)
    summaryNode = bi.jsx(cs, {
      variant: "tree",
      children: bi.jsxs(cs.Node, {
        dimColor: !0,
        children: [count, " ", nounText, " \xB7 ", tokensText, " tokens"]
      })
    }), cache[5] = count, cache[6] = nounText, cache[7] = tokensText, cache[8] = summaryNode;
  else summaryNode = cache[8];
  return summaryNode;
}

/**
 * Top-level Context Usage component.
 * @param props.data context-usage payload (categories, totals, model, etc.)
 * @param props.isRemote whether running in a remote session (hides spacer)
 * @param props.collapseDetailSections render collapsed summaries instead of trees
 */
function RRo(props) {
  let cache = CKn.c(116),
    {
      data: data,
      isRemote: isRemote,
      collapseDetailSections: collapseDetailSections
    } = props,
    remote = isRemote === void 0 ? !1 : isRemote,
    collapsed = collapseDetailSections === void 0 ? !1 : collapseDetailSections,
    {
      categories: categories,
      totalTokens: totalTokens,
      rawMaxTokens: rawMaxTokens,
      autocompactSource: autocompactSource,
      percentage: percentage,
      gridRows: gridRows,
      model: model,
      memoryFiles: memoryFiles,
      mcpTools: mcpTools,
      deferredBuiltinTools: deferredBuiltinTools,
      systemTools: systemTools,
      systemPromptSections: systemPromptSections,
      agents: agents,
      skills: skills,
      messageBreakdown: messageBreakdown
    } = data,
    rootBox,
    columnBox,
    hasExpandable,
    paddingLeft,
    title,
    summaryRow,
    columnDir,
    marginLeft,
    autoCompactNode,
    mcpSection,
    systemToolsNode,
    rootDir;
  if (cache[0] !== agents.length || cache[1] !== autocompactSource || cache[2] !== categories || cache[3] !== collapsed || cache[4] !== gridRows || cache[5] !== remote || cache[6] !== mcpTools || cache[7] !== memoryFiles.length || cache[8] !== model || cache[9] !== percentage || cache[10] !== rawMaxTokens || cache[11] !== skills?.tokens || cache[12] !== systemPromptSections?.length || cache[13] !== systemTools || cache[14] !== deferredBuiltinTools || cache[15] !== totalTokens) {
    let deferredTools = deferredBuiltinTools === void 0 ? [] : deferredBuiltinTools,
      shownCategories = categories.filter(hem),
      hasDeferredMcp;
    if (cache[28] !== categories)
      hasDeferredMcp = categories.some(fem), cache[28] = categories, cache[29] = hasDeferredMcp;
    else hasDeferredMcp = cache[29];
    let mcpLoadedOnDemand = hasDeferredMcp,
      hasDeferredTools = deferredTools.length > 0,
      autoCompactCategory = categories.find(mem);
    if (hasExpandable = mcpTools.length > 0 || agents.length > 0 || memoryFiles.length > 0 || (skills?.tokens ?? 0) > 0 || !1, columnBox = $, rootDir = "column", paddingLeft = 1, cache[30] === Symbol.for("react.memo_cache_sentinel"))
      title = bi.jsx(v, {
        bold: !0,
        children: "Context Usage"
      }), cache[30] = title;
    else title = cache[30];
    let gridNodes;
    if (cache[31] !== gridRows)
      gridNodes = gridRows.map(dem), cache[31] = gridRows, cache[32] = gridNodes;
    else gridNodes = cache[32];
    let gridColumn;
    if (cache[33] !== gridNodes)
      gridColumn = bi.jsx($, {
        flexDirection: "column",
        flexShrink: 0,
        children: gridNodes
      }), cache[33] = gridNodes, cache[34] = gridColumn;
    else gridColumn = cache[34];
    let modelLabelNode;
    if (cache[35] !== model)
      modelLabelNode = g7(model) && bi.jsx(v, {
        children: g7(model)
      }), cache[35] = model, cache[36] = modelLabelNode;
    else modelLabelNode = cache[36];
    let modelNameNode;
    if (cache[37] !== model)
      modelNameNode = bi.jsx(v, {
        dimColor: !0,
        children: model
      }), cache[37] = model, cache[38] = modelNameNode;
    else modelNameNode = cache[38];
    let totalTokensText;
    if (cache[39] !== totalTokens)
      totalTokensText = el(totalTokens), cache[39] = totalTokens, cache[40] = totalTokensText;
    else totalTokensText = cache[40];
    let maxTokensText;
    if (cache[41] !== rawMaxTokens)
      maxTokensText = el(rawMaxTokens), cache[41] = rawMaxTokens, cache[42] = maxTokensText;
    else maxTokensText = cache[42];
    let usageLineNode;
    if (cache[43] !== percentage || cache[44] !== totalTokensText || cache[45] !== maxTokensText)
      usageLineNode = bi.jsxs(v, {
        dimColor: !0,
        children: [totalTokensText, "/", maxTokensText, " tokens (", percentage, "%)"]
      }), cache[43] = percentage, cache[44] = totalTokensText, cache[45] = maxTokensText, cache[46] = usageLineNode;
    else usageLineNode = cache[46];
    let spacerNode;
    if (cache[47] !== remote)
      spacerNode = !remote && bi.jsx(VZp, {}), cache[47] = remote, cache[48] = spacerNode;
    else spacerNode = cache[48];
    let blankLineNode, categoriesHeading;
    if (cache[49] === Symbol.for("react.memo_cache_sentinel"))
      blankLineNode = bi.jsx(v, {
        children: " "
      }), categoriesHeading = bi.jsx(v, {
        dimColor: !0,
        italic: !0,
        children: "Estimated usage by category"
      }), cache[49] = blankLineNode, cache[50] = categoriesHeading;
    else blankLineNode = cache[49], categoriesHeading = cache[50];
    let renderCategoryRow;
    if (cache[51] !== rawMaxTokens)
      renderCategoryRow = (category, index) => {
        let categoryTokensText = el(category.tokens),
          percentText = category.isDeferred ? "N/A" : `${(category.tokens / rawMaxTokens * 100).toFixed(1)}%`,
          isAutoCompact = category.name === AKn,
          categoryName = category.name,
          glyph = category.isDeferred ? " " : isAutoCompact ? "⛝" : "⛁";
        return bi.jsxs($, {
          children: [bi.jsx(v, {
            color: category.color,
            children: glyph
          }), bi.jsxs(v, {
            children: [" ", categoryName, ": "]
          }), bi.jsxs(v, {
            dimColor: !0,
            children: [categoryTokensText, " tokens (", percentText, ")"]
          })]
        }, index);
      }, cache[51] = rawMaxTokens, cache[52] = renderCategoryRow;
    else renderCategoryRow = cache[52];
    let categoryRows = shownCategories.map(renderCategoryRow),
      freeSpaceNode;
    if (cache[53] !== categories || cache[54] !== rawMaxTokens)
      freeSpaceNode = (categories.find(uem)?.tokens ?? 0) > 0 && bi.jsxs($, {
        children: [bi.jsx(v, {
          dimColor: !0,
          children: "⛶"
        }), bi.jsx(v, {
          children: " Free space: "
        }), bi.jsxs(v, {
          dimColor: !0,
          children: [el(categories.find(cem)?.tokens || 0), " ", "(", ((categories.find(lem)?.tokens || 0) / rawMaxTokens * 100).toFixed(1), "%)"]
        })]
      }), cache[53] = categories, cache[54] = rawMaxTokens, cache[55] = freeSpaceNode;
    else freeSpaceNode = cache[55];
    let autoCompactRowNode = autoCompactCategory && autoCompactCategory.tokens > 0 && bi.jsxs($, {
        children: [bi.jsx(v, {
          color: autoCompactCategory.color,
          children: "⛝"
        }), bi.jsxs(v, {
          dimColor: !0,
          children: [" ", autoCompactCategory.name, ": "]
        }), bi.jsxs(v, {
          dimColor: !0,
          children: [el(autoCompactCategory.tokens), " tokens (", (autoCompactCategory.tokens / rawMaxTokens * 100).toFixed(1), "%)"]
        })]
      }),
      categoryListColumn;
    if (cache[56] !== modelLabelNode || cache[57] !== modelNameNode || cache[58] !== usageLineNode || cache[59] !== spacerNode || cache[60] !== categoryRows || cache[61] !== freeSpaceNode || cache[62] !== autoCompactRowNode)
      categoryListColumn = bi.jsxs($, {
        flexDirection: "column",
        gap: 0,
        flexShrink: 0,
        children: [modelLabelNode, modelNameNode, usageLineNode, spacerNode, blankLineNode, categoriesHeading, categoryRows, freeSpaceNode, autoCompactRowNode]
      }), cache[56] = modelLabelNode, cache[57] = modelNameNode, cache[58] = usageLineNode, cache[59] = spacerNode, cache[60] = categoryRows, cache[61] = freeSpaceNode, cache[62] = autoCompactRowNode, cache[63] = categoryListColumn;
    else categoryListColumn = cache[63];
    if (cache[64] !== gridColumn || cache[65] !== categoryListColumn)
      summaryRow = bi.jsxs($, {
        flexDirection: "row",
        gap: 2,
        children: [gridColumn, categoryListColumn]
      }), cache[64] = gridColumn, cache[65] = categoryListColumn, cache[66] = summaryRow;
    else summaryRow = cache[66];
    if (rootBox = $, columnDir = "column", marginLeft = -1, cache[67] !== autocompactSource || cache[68] !== rawMaxTokens)
      autoCompactNode = autocompactSource !== "auto" && bi.jsxs($, {
        marginTop: 1,
        children: [bi.jsx(v, {
          bold: !0,
          children: "Auto-compact window: "
        }), bi.jsx(v, {
          dimColor: !0,
          children: autocompactSource === "experiment" || autocompactSource === "clientdata" ? `auto (${el(rawMaxTokens)} tokens)` : `${el(rawMaxTokens)} tokens`
        })]
      }), cache[67] = autocompactSource, cache[68] = rawMaxTokens, cache[69] = autoCompactNode;
    else autoCompactNode = cache[69];
    if (cache[70] !== collapsed || cache[71] !== mcpLoadedOnDemand || cache[72] !== mcpTools)
      mcpSection = mcpTools.length > 0 && bi.jsxs($, {
        flexDirection: "column",
        marginTop: 1,
        children: [bi.jsxs($, {
          children: [bi.jsx(v, {
            bold: !0,
            children: "MCP tools"
          }), bi.jsxs(v, {
            dimColor: !0,
            children: [" ", "\xB7 /mcp", mcpLoadedOnDemand ? " (loaded on-demand)" : ""]
          })]
        }), collapsed ? bi.jsx(EKn, {
          count: mcpTools.length,
          noun: "tool",
          tokens: mcpTools.filter(tool => !mcpLoadedOnDemand || tool.isLoaded).reduce(aem, 0)
        }) : bi.jsxs(bi.Fragment, {
          children: [mcpTools.some(iem) && bi.jsxs($, {
            flexDirection: "column",
            marginTop: 1,
            children: [bi.jsx(v, {
              dimColor: !0,
              children: "Loaded"
            }), bi.jsx(cs, {
              variant: "tree",
              children: mcpTools.filter(sem).map(oem)
            })]
          }), mcpLoadedOnDemand && mcpTools.some(rem) && bi.jsxs($, {
            flexDirection: "column",
            marginTop: 1,
            children: [bi.jsx(v, {
              dimColor: !0,
              children: "Available"
            }), bi.jsx(cs, {
              variant: "tree",
              children: mcpTools.filter(nem).map(tem)
            })]
          }), !mcpLoadedOnDemand && bi.jsx(cs, {
            variant: "tree",
            children: mcpTools.map(eem)
          })]
        })]
      }), cache[70] = collapsed, cache[71] = mcpLoadedOnDemand, cache[72] = mcpTools, cache[73] = mcpSection;
    else mcpSection = cache[73];
    systemToolsNode = (systemTools && systemTools.length > 0 || hasDeferredTools) && !1, cache[0] = agents.length, cache[1] = autocompactSource, cache[2] = categories, cache[3] = collapsed, cache[4] = gridRows, cache[5] = remote, cache[6] = mcpTools, cache[7] = memoryFiles.length, cache[8] = model, cache[9] = percentage, cache[10] = rawMaxTokens, cache[11] = skills?.tokens, cache[12] = systemPromptSections?.length, cache[13] = systemTools, cache[14] = deferredBuiltinTools, cache[15] = totalTokens, cache[16] = rootBox, cache[17] = columnBox, cache[18] = hasExpandable, cache[19] = paddingLeft, cache[20] = title, cache[21] = summaryRow, cache[22] = columnDir, cache[23] = marginLeft, cache[24] = autoCompactNode, cache[25] = mcpSection, cache[26] = systemToolsNode, cache[27] = rootDir;
  } else rootBox = cache[16], columnBox = cache[17], hasExpandable = cache[18], paddingLeft = cache[19], title = cache[20], summaryRow = cache[21], columnDir = cache[22], marginLeft = cache[23], autoCompactNode = cache[24], mcpSection = cache[25], systemToolsNode = cache[26], rootDir = cache[27];
  let systemPromptNode;
  if (cache[74] !== collapsed || cache[75] !== systemPromptSections)
    systemPromptNode = systemPromptSections && systemPromptSections.length > 0 && !1, cache[74] = collapsed, cache[75] = systemPromptSections, cache[76] = systemPromptNode;
  else systemPromptNode = cache[76];
  let agentsSection;
  if (cache[77] !== agents || cache[78] !== collapsed)
    agentsSection = agents.length > 0 && bi.jsxs($, {
      flexDirection: "column",
      marginTop: 1,
      children: [bi.jsxs($, {
        children: [bi.jsx(v, {
          bold: !0,
          children: "Custom agents"
        }), bi.jsx(v, {
          dimColor: !0,
          children: " \xB7 /agents"
        })]
      }), collapsed ? bi.jsx(EKn, {
        count: agents.length,
        noun: "agent",
        tokens: agents.reduce(ZZp, 0)
      }) : Array.from(ngl(agents).entries()).map(XZp)]
    }), cache[77] = agents, cache[78] = collapsed, cache[79] = agentsSection;
  else agentsSection = cache[79];
  let memorySection;
  if (cache[80] !== collapsed || cache[81] !== memoryFiles)
    memorySection = memoryFiles.length > 0 && bi.jsxs($, {
      flexDirection: "column",
      marginTop: 1,
      children: [bi.jsxs($, {
        children: [bi.jsx(v, {
          bold: !0,
          children: "Memory files"
        }), bi.jsx(v, {
          dimColor: !0,
          children: " \xB7 /memory"
        })]
      }), collapsed ? bi.jsx(EKn, {
        count: memoryFiles.length,
        noun: "file",
        tokens: memoryFiles.reduce(JZp, 0)
      }) : bi.jsx(cs, {
        variant: "tree",
        children: memoryFiles.map(YZp)
      })]
    }), cache[80] = collapsed, cache[81] = memoryFiles, cache[82] = memorySection;
  else memorySection = cache[82];
  let skillsSection;
  if (cache[83] !== collapsed || cache[84] !== skills)
    skillsSection = skills && skills.tokens > 0 && bi.jsxs($, {
      flexDirection: "column",
      marginTop: 1,
      children: [bi.jsxs($, {
        children: [bi.jsx(v, {
          bold: !0,
          children: "Skills"
        }), bi.jsx(v, {
          dimColor: !0,
          children: " \xB7 /skills"
        })]
      }), collapsed ? bi.jsx(EKn, {
        count: skills.skillFrontmatter.length,
        noun: "skill",
        tokens: skills.tokens
      }) : Array.from(ngl(skills.skillFrontmatter).entries()).map(zZp)]
    }), cache[83] = collapsed, cache[84] = skills, cache[85] = skillsSection;
  else skillsSection = cache[85];
  let messageBreakdownNode;
  if (cache[86] !== messageBreakdown)
    messageBreakdownNode = messageBreakdown && !1, cache[86] = messageBreakdown, cache[87] = messageBreakdownNode;
  else messageBreakdownNode = cache[87];
  let expandHintNode;
  if (cache[88] !== collapsed || cache[89] !== hasExpandable)
    expandHintNode = collapsed && hasExpandable && bi.jsx($, {
      marginTop: 1,
      children: bi.jsx(v, {
        dimColor: !0,
        children: "/context all to expand"
      })
    }), cache[88] = collapsed, cache[89] = hasExpandable, cache[90] = expandHintNode;
  else expandHintNode = cache[90];
  let detailColumn;
  if (cache[91] !== rootBox || cache[92] !== systemPromptNode || cache[93] !== agentsSection || cache[94] !== memorySection || cache[95] !== skillsSection || cache[96] !== messageBreakdownNode || cache[97] !== expandHintNode || cache[98] !== columnDir || cache[99] !== marginLeft || cache[100] !== autoCompactNode || cache[101] !== mcpSection || cache[102] !== systemToolsNode)
    detailColumn = bi.jsxs(rootBox, {
      flexDirection: columnDir,
      marginLeft: marginLeft,
      children: [autoCompactNode, mcpSection, systemToolsNode, systemPromptNode, agentsSection, memorySection, skillsSection, messageBreakdownNode, expandHintNode]
    }), cache[91] = rootBox, cache[92] = systemPromptNode, cache[93] = agentsSection, cache[94] = memorySection, cache[95] = skillsSection, cache[96] = messageBreakdownNode, cache[97] = expandHintNode, cache[98] = columnDir, cache[99] = marginLeft, cache[100] = autoCompactNode, cache[101] = mcpSection, cache[102] = systemToolsNode, cache[103] = detailColumn;
  else detailColumn = cache[103];
  let suggestions;
  if (cache[104] !== data)
    suggestions = Xhl(data), cache[104] = data, cache[105] = suggestions;
  else suggestions = cache[105];
  let suggestionsNode;
  if (cache[106] !== suggestions)
    suggestionsNode = bi.jsx(egl, {
      suggestions: suggestions
    }), cache[106] = suggestions, cache[107] = suggestionsNode;
  else suggestionsNode = cache[107];
  let viewNode;
  if (cache[108] !== columnBox || cache[109] !== paddingLeft || cache[110] !== title || cache[111] !== summaryRow || cache[112] !== detailColumn || cache[113] !== suggestionsNode || cache[114] !== rootDir)
    viewNode = bi.jsxs(columnBox, {
      flexDirection: rootDir,
      paddingLeft: paddingLeft,
      children: [title, summaryRow, detailColumn, suggestionsNode]
    }), cache[108] = columnBox, cache[109] = paddingLeft, cache[110] = title, cache[111] = summaryRow, cache[112] = detailColumn, cache[113] = suggestionsNode, cache[114] = rootDir, cache[115] = viewNode;
  else viewNode = cache[115];
  return viewNode;
}

/** Renders one skill group: a label followed by a tree of its skill nodes. */
function zZp(entry) {
  let [label, skillsInGroup] = entry;
  return bi.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    children: [bi.jsx(v, {
      dimColor: !0,
      children: label
    }), bi.jsx(cs, {
      variant: "tree",
      children: skillsInGroup.map(jZp)
    })]
  }, label);
}

/** Tree node for a single skill: "name: <tokens> tokens". */
function jZp(skill, index) {
  return bi.jsx(cs.Node, {
    children: bi.jsxs(v, {
      children: [skill.name, ":", " ", bi.jsxs(v, {
        dimColor: !0,
        children: [Ure(skill.tokens), " tokens"]
      })]
    })
  }, index);
}

/** Tree node for a single memory file: "<path>: <tokens> tokens". */
function YZp(memoryFile, index) {
  return bi.jsx(cs.Node, {
    children: bi.jsxs(v, {
      children: [dd(memoryFile.path), ":", " ", bi.jsxs(v, {
        dimColor: !0,
        children: [el(memoryFile.tokens), " tokens"]
      })]
    })
  }, index);
}

/** Reducer summing memory-file token counts. */
function JZp(acc, memoryFile) {
  return acc + memoryFile.tokens;
}

/** Renders one agent group: a label followed by a tree of its agent nodes. */
function XZp(entry) {
  let [label, agentsInGroup] = entry;
  return bi.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    children: [bi.jsx(v, {
      dimColor: !0,
      children: label
    }), bi.jsx(cs, {
      variant: "tree",
      children: agentsInGroup.map(QZp)
    })]
  }, label);
}

/** Tree node for a single agent: "<agentType>: <tokens> tokens". */
function QZp(agent, index) {
  return bi.jsx(cs.Node, {
    children: bi.jsxs(v, {
      children: [agent.agentType, ":", " ", bi.jsxs(v, {
        dimColor: !0,
        children: [el(agent.tokens), " tokens"]
      })]
    })
  }, index);
}

/** Reducer summing agent token counts. */
function ZZp(acc, agent) {
  return acc + agent.tokens;
}

/** Tree node for an MCP tool (no on-demand loading): "name: <tokens> tokens". */
function eem(tool, index) {
  return bi.jsx(cs.Node, {
    children: bi.jsxs(v, {
      children: [tool.name, ":", " ", bi.jsxs(v, {
        dimColor: !0,
        children: [el(tool.tokens), " tokens"]
      })]
    })
  }, index);
}

/** Tree node for an available (not-yet-loaded) MCP tool: name only. */
function tem(tool, index) {
  return bi.jsx(cs.Node, {
    dimColor: !0,
    children: tool.name
  }, index);
}

/** Predicate: tool is not yet loaded. */
function nem(tool) {
  return !tool.isLoaded;
}

/** Predicate: tool is not yet loaded. */
function rem(tool) {
  return !tool.isLoaded;
}

/** Tree node for a loaded MCP tool: "name: <tokens> tokens". */
function oem(tool, index) {
  return bi.jsx(cs.Node, {
    children: bi.jsxs(v, {
      children: [tool.name, ":", " ", bi.jsxs(v, {
        dimColor: !0,
        children: [el(tool.tokens), " tokens"]
      })]
    })
  }, index);
}

/** Predicate: tool is loaded. */
function sem(tool) {
  return tool.isLoaded;
}

/** Predicate: tool is loaded. */
function iem(tool) {
  return tool.isLoaded;
}

/** Reducer summing MCP tool token counts. */
function aem(acc, tool) {
  return acc + tool.tokens;
}

/** Predicate: category is the "Free space" pseudo-category. */
function lem(category) {
  return category.name === "Free space";
}

/** Predicate: category is the "Free space" pseudo-category. */
function cem(category) {
  return category.name === "Free space";
}

/** Predicate: category is the "Free space" pseudo-category. */
function uem(category) {
  return category.name === "Free space";
}

/** Renders one grid row as a horizontal run of cell glyphs. */
function dem(row, index) {
  return bi.jsx($, {
    flexDirection: "row",
    marginLeft: -1,
    children: row.map(pem)
  }, index);
}

/** Renders a single grid cell glyph, colored/shaped by category and fullness. */
function pem(cell, index) {
  if (cell.categoryName === "Free space") return bi.jsx(v, {
    dimColor: !0,
    children: "⛶ "
  }, index);
  if (cell.categoryName === AKn) return bi.jsx(v, {
    color: cell.color,
    children: "⛝ "
  }, index);
  return bi.jsx(v, {
    color: cell.color,
    children: cell.squareFullness >= 0.7 ? "⛁ " : "⛀ "
  }, index);
}

/** Predicate: category is the auto-compact buffer. */
function mem(category) {
  return category.name === AKn;
}

/** Predicate: deferred MCP category (loaded on-demand). */
function fem(category) {
  return category.isDeferred && category.name.includes("MCP");
}

/** Predicate: category should appear in the per-category list (non-zero, real, eager). */
function hem(category) {
  return category.tokens > 0 && category.name !== "Free space" && category.name !== AKn && !category.isDeferred;
}

var CKn,
  bi,
  /** Display name of the auto-compact buffer pseudo-category. */
  AKn = "Autocompact buffer",
  /** Ordered list of top-level token-source categories. */
  KZp;
var rgl = b(() => {
  je();
  Qhl();
  Xl();
  Xo();
  Ro();
  wm();
  lr();
  tgl();
  kte();
  CKn = x(tt(), 1), bi = x(oe(), 1);
  KZp = ["Project", "User", "Managed", "Plugin", "MCP", "Built-in"];
});

export {VZp,ngl,EKn,RRo,zZp,jZp,YZp,JZp,XZp,QZp,ZZp,eem,tem,nem,rem,oem,sem,iem,aem,lem,cem,uem,dem,pem,mem,fem,hem,CKn,bi,AKn,KZp,rgl};
