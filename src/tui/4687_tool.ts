// @ts-nocheck
import {rsn,osn,T0} from "../mcp/0733_serverName.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {_Me,lr} from "../../vendor/m233.ts";
import {cS,Rj} from "../../vendor/m3188.ts";
import {getConfigFilePath as $G,eWe} from "../../vendor/m4595.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/** ToolDetailView: renders a detail panel for a single MCP tool, showing
 *  its name, read-only/destructive/open-world flags, description, and parameters. */
function SWt(props: any) {
  let memoCache = WSl.c(45),
    {
      tool: tool,
      server: server,
      onBack: onBack
    } = props,
    [description, setDescription] = C7n.useState(""),
    userFacingName: any,
    toolId: any;

  // --- compute userFacingName and internal toolId ---
  if (memoCache[0] !== server.name || memoCache[1] !== tool) {
    toolId = rsn(tool.name, server.name);
    let resolvedName = tool.userFacingName ? tool.userFacingName({}) : toolId;
    userFacingName = osn(resolvedName), memoCache[0] = server.name, memoCache[1] = tool, memoCache[2] = userFacingName, memoCache[3] = toolId;
  } else userFacingName = memoCache[2], toolId = memoCache[3];
  let displayName = userFacingName,
    isReadOnly: any;

  // --- isReadOnly flag ---
  if (memoCache[4] !== tool) isReadOnly = tool.isReadOnly?.({}) ?? !1, memoCache[4] = tool, memoCache[5] = isReadOnly;else isReadOnly = memoCache[5];
  let readOnly = isReadOnly,
    isDestructive: any;

  // --- isDestructive flag ---
  if (memoCache[6] !== tool) isDestructive = tool.isDestructive?.({}) ?? !1, memoCache[6] = tool, memoCache[7] = isDestructive;else isDestructive = memoCache[7];
  let destructive = isDestructive,
    isOpenWorld: any;

  // --- isOpenWorld flag ---
  if (memoCache[8] !== tool) isOpenWorld = tool.isOpenWorld?.({}) ?? !1, memoCache[8] = tool, memoCache[9] = isOpenWorld;else isOpenWorld = memoCache[9];
  let openWorld = isOpenWorld,
    loadDescription: any,
    effectDeps: any;

  // --- effect: load tool description async ---
  if (memoCache[10] !== tool) loadDescription = () => {
    (async function () {
      try {
        let descText = await tool.description({}, {
          isNonInteractiveSession: !1,
          toolPermissionContext: {
            mode: "default",
            additionalWorkingDirectories: new Map(),
            alwaysAllowRules: {},
            alwaysDenyRules: {},
            alwaysAskRules: {},
            isBypassPermissionsModeAvailable: !1,
            mcpPermissionModeOverrides: {}
          },
          tools: []
        });
        setDescription(descText);
      } catch {
        setDescription("Failed to load description");
      }
    })();
  }, effectDeps = [tool], memoCache[10] = tool, memoCache[11] = loadDescription, memoCache[12] = effectDeps;else loadDescription = memoCache[11], effectDeps = memoCache[12];
  C7n.useEffect(loadDescription, effectDeps);

  // --- render read-only badge ---
  let readOnlyBadge: any;
  if (memoCache[13] !== readOnly) readOnlyBadge = readOnly && WE.jsx(v, {
    color: "success",
    children: " [read-only]"
  }), memoCache[13] = readOnly, memoCache[14] = readOnlyBadge;else readOnlyBadge = memoCache[14];

  // --- render destructive badge ---
  let destructiveBadge: any;
  if (memoCache[15] !== destructive) destructiveBadge = destructive && WE.jsx(v, {
    color: "error",
    children: " [destructive]"
  }), memoCache[15] = destructive, memoCache[16] = destructiveBadge;else destructiveBadge = memoCache[16];

  // --- render open-world badge ---
  let openWorldBadge: any;
  if (memoCache[17] !== openWorld) openWorldBadge = openWorld && WE.jsx(v, {
    dimColor: !0,
    children: " [open-world]"
  }), memoCache[17] = openWorld, memoCache[18] = openWorldBadge;else openWorldBadge = memoCache[18];

  // --- compose title with badges ---
  let titleElement: any;
  if (memoCache[19] !== displayName || memoCache[20] !== readOnlyBadge || memoCache[21] !== destructiveBadge || memoCache[22] !== openWorldBadge) titleElement = WE.jsxs(WE.Fragment, {
    children: [displayName, readOnlyBadge, destructiveBadge, openWorldBadge]
  }), memoCache[19] = displayName, memoCache[20] = readOnlyBadge, memoCache[21] = destructiveBadge, memoCache[22] = openWorldBadge, memoCache[23] = titleElement;else titleElement = memoCache[23];
  let title = titleElement,
    escGuide: any;

  // --- static: escape key input guide ---
  if (memoCache[24] === Symbol.for("react.memo_cache_sentinel")) escGuide = WE.jsx(dr, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "go back"
  }), memoCache[24] = escGuide;else escGuide = memoCache[24];

  // --- static: "Tool name:" label ---
  let toolNameLabel: any;
  if (memoCache[25] === Symbol.for("react.memo_cache_sentinel")) toolNameLabel = WE.jsx(v, {
    bold: !0,
    children: "Tool name: "
  }), memoCache[25] = toolNameLabel;else toolNameLabel = memoCache[25];

  // --- tool id row ---
  let toolIdRow: any;
  if (memoCache[26] !== toolId) toolIdRow = WE.jsxs($, {
    children: [toolNameLabel, WE.jsx(v, {
      dimColor: !0,
      children: toolId
    })]
  }), memoCache[26] = toolId, memoCache[27] = toolIdRow;else toolIdRow = memoCache[27];

  // --- static: "Full name:" label ---
  let fullNameLabel: any;
  if (memoCache[28] === Symbol.for("react.memo_cache_sentinel")) fullNameLabel = WE.jsx(v, {
    bold: !0,
    children: "Full name: "
  }), memoCache[28] = fullNameLabel;else fullNameLabel = memoCache[28];

  // --- full internal tool name row ---
  let fullNameRow: any;
  if (memoCache[29] !== tool.name) fullNameRow = WE.jsxs($, {
    children: [fullNameLabel, WE.jsx(v, {
      dimColor: !0,
      children: tool.name
    })]
  }), memoCache[29] = tool.name, memoCache[30] = fullNameRow;else fullNameRow = memoCache[30];

  // --- description section (truncated to zrm chars) ---
  let descriptionSection: any;
  if (memoCache[31] !== description) descriptionSection = description && WE.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    children: [WE.jsx(v, {
      bold: !0,
      children: "Description:"
    }), WE.jsx(v, {
      wrap: "wrap",
      children: _Me(description, zrm)
    })]
  }), memoCache[31] = description, memoCache[32] = descriptionSection;else descriptionSection = memoCache[32];

  // --- parameters section ---
  let parametersSection: any;
  if (memoCache[33] !== tool.inputJSONSchema) parametersSection = tool.inputJSONSchema && tool.inputJSONSchema.properties && Object.keys(tool.inputJSONSchema.properties).length > 0 && WE.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    children: [WE.jsx(v, {
      bold: !0,
      children: "Parameters:"
    }), WE.jsx($, {
      marginLeft: 2,
      flexDirection: "column",
      children: Object.entries(tool.inputJSONSchema.properties).map(entry => {
        let [paramName, paramSchema] = entry,
          isRequired = tool.inputJSONSchema?.required?.includes(paramName);
        return WE.jsxs(cS, {
          children: [paramName, WE.jsx($G, {
            when: isRequired ?? !1,
            children: "required"
          }), ":", " ", WE.jsx(v, {
            dimColor: !0,
            children: typeof paramSchema === "object" && paramSchema && "type" in paramSchema ? String(paramSchema.type) : "unknown"
          }), typeof paramSchema === "object" && paramSchema && "description" in paramSchema && WE.jsxs(v, {
            dimColor: !0,
            children: [" - ", _Me(String(paramSchema.description), jrm)]
          })]
        }, paramName);
      })
    })]
  }), memoCache[33] = tool.inputJSONSchema, memoCache[34] = parametersSection;else parametersSection = memoCache[34];

  // --- body container ---
  let bodyContainer: any;
  if (memoCache[35] !== toolIdRow || memoCache[36] !== fullNameRow || memoCache[37] !== descriptionSection || memoCache[38] !== parametersSection) bodyContainer = WE.jsxs($, {
    flexDirection: "column",
    children: [toolIdRow, fullNameRow, descriptionSection, parametersSection]
  }), memoCache[35] = toolIdRow, memoCache[36] = fullNameRow, memoCache[37] = descriptionSection, memoCache[38] = parametersSection, memoCache[39] = bodyContainer;else bodyContainer = memoCache[39];

  // --- wrap in panel with title, subtitle=server name, cancel=onBack ---
  let panel: any;
  if (memoCache[40] !== onBack || memoCache[41] !== server.name || memoCache[42] !== bodyContainer || memoCache[43] !== title) panel = WE.jsx(Jn, {
    title: title,
    subtitle: server.name,
    onCancel: onBack,
    inputGuide: escGuide,
    children: bodyContainer
  }), memoCache[40] = onBack, memoCache[41] = server.name, memoCache[42] = bodyContainer, memoCache[43] = title, memoCache[44] = panel;else panel = memoCache[44];
  return panel;
}
var WSl,
  C7n,
  WE,
  zrm = 1000,
  jrm = 200;
var A7n = b(() => {
  je();
  T0();
  lr();
  uc();
  eWe();
  Rj();
  di();
  WSl = x(tt(), 1), C7n = x(et(), 1), WE = x(oe(), 1);
});
export {SWt,WSl,C7n,WE,zrm,jrm,A7n};
