// @ts-nocheck
import {Tnn,Snn,scalar} from "../mcp/0728_serverName.ts";
import {Text} from "../../vendor/m2423.ts";
import {lr,readRoster} from "../../vendor/m2547.ts";
import {Box} from "../../vendor/m2422.ts";
import {CLe,dr} from "../../vendor/m231.ts";
import {AS,Yz} from "../../vendor/m3174.ts";
import {CG,wje} from "../../vendor/m4567.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
/** ToolDetailView: renders a detail panel for a single MCP tool, showing
 *  its name, read-only/destructive/open-world flags, description, and parameters. */
function Q6t(props: any) {
  let memoCache = eml.c(45),
    {
      tool: tool,
      server: server,
      onBack: onBack
    } = props,
    [description, setDescription] = vS.useState("");

  // --- compute userFacingName and internal toolId ---
  let userFacingName: any, toolId: any;
  if (memoCache[0] !== server.name || memoCache[1] !== tool) {
    toolId = Tnn(tool.name, server.name);
    let resolvedName = tool.userFacingName ? tool.userFacingName({}) : toolId;
    userFacingName = Snn(resolvedName), memoCache[0] = server.name, memoCache[1] = tool, memoCache[2] = userFacingName, memoCache[3] = toolId;
  } else userFacingName = memoCache[2], toolId = memoCache[3];
  let displayName = userFacingName;

  // --- isReadOnly flag ---
  let isReadOnly: any;
  if (memoCache[4] !== tool) isReadOnly = tool.isReadOnly?.({}) ?? !1, memoCache[4] = tool, memoCache[5] = isReadOnly;else isReadOnly = memoCache[5];
  let readOnly = isReadOnly;

  // --- isDestructive flag ---
  let isDestructive: any;
  if (memoCache[6] !== tool) isDestructive = tool.isDestructive?.({}) ?? !1, memoCache[6] = tool, memoCache[7] = isDestructive;else isDestructive = memoCache[7];
  let destructive = isDestructive;

  // --- isOpenWorld flag ---
  let isOpenWorld: any;
  if (memoCache[8] !== tool) isOpenWorld = tool.isOpenWorld?.({}) ?? !1, memoCache[8] = tool, memoCache[9] = isOpenWorld;else isOpenWorld = memoCache[9];
  let openWorld = isOpenWorld;

  // --- effect: load tool description async ---
  let loadDescription: any, effectDeps: any;
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
  vS.useEffect(loadDescription, effectDeps);

  // --- render read-only badge ---
  let readOnlyBadge: any;
  if (memoCache[13] !== readOnly) readOnlyBadge = readOnly && vS.default.createElement(Text, {
    color: "success"
  }, " [read-only]"), memoCache[13] = readOnly, memoCache[14] = readOnlyBadge;else readOnlyBadge = memoCache[14];

  // --- render destructive badge ---
  let destructiveBadge: any;
  if (memoCache[15] !== destructive) destructiveBadge = destructive && vS.default.createElement(Text, {
    color: "error"
  }, " [destructive]"), memoCache[15] = destructive, memoCache[16] = destructiveBadge;else destructiveBadge = memoCache[16];

  // --- render open-world badge ---
  let openWorldBadge: any;
  if (memoCache[17] !== openWorld) openWorldBadge = openWorld && vS.default.createElement(Text, {
    dimColor: !0
  }, " [open-world]"), memoCache[17] = openWorld, memoCache[18] = openWorldBadge;else openWorldBadge = memoCache[18];

  // --- compose title with badges ---
  let titleElement: any;
  if (memoCache[19] !== displayName || memoCache[20] !== readOnlyBadge || memoCache[21] !== destructiveBadge || memoCache[22] !== openWorldBadge) titleElement = vS.default.createElement(vS.default.Fragment, null, displayName, readOnlyBadge, destructiveBadge, openWorldBadge), memoCache[19] = displayName, memoCache[20] = readOnlyBadge, memoCache[21] = destructiveBadge, memoCache[22] = openWorldBadge, memoCache[23] = titleElement;else titleElement = memoCache[23];
  let title = titleElement;

  // --- static: escape key input guide ---
  let escGuide: any;
  if (memoCache[24] === Symbol.for("react.memo_cache_sentinel")) escGuide = vS.default.createElement(lr, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "go back"
  }), memoCache[24] = escGuide;else escGuide = memoCache[24];

  // --- static: "Tool name:" label ---
  let toolNameLabel: any;
  if (memoCache[25] === Symbol.for("react.memo_cache_sentinel")) toolNameLabel = vS.default.createElement(Text, {
    bold: !0
  }, "Tool name: "), memoCache[25] = toolNameLabel;else toolNameLabel = memoCache[25];

  // --- tool id row ---
  let toolIdRow: any;
  if (memoCache[26] !== toolId) toolIdRow = vS.default.createElement(Box, null, toolNameLabel, vS.default.createElement(Text, {
    dimColor: !0
  }, toolId)), memoCache[26] = toolId, memoCache[27] = toolIdRow;else toolIdRow = memoCache[27];

  // --- static: "Full name:" label ---
  let fullNameLabel: any;
  if (memoCache[28] === Symbol.for("react.memo_cache_sentinel")) fullNameLabel = vS.default.createElement(Text, {
    bold: !0
  }, "Full name: "), memoCache[28] = fullNameLabel;else fullNameLabel = memoCache[28];

  // --- full internal tool name row ---
  let fullNameRow: any;
  if (memoCache[29] !== tool.name) fullNameRow = vS.default.createElement(Box, null, fullNameLabel, vS.default.createElement(Text, {
    dimColor: !0
  }, tool.name)), memoCache[29] = tool.name, memoCache[30] = fullNameRow;else fullNameRow = memoCache[30];

  // --- description section (truncated to Gzp chars) ---
  let descriptionSection: any;
  if (memoCache[31] !== description) descriptionSection = description && vS.default.createElement(Box, {
    flexDirection: "column",
    marginTop: 1
  }, vS.default.createElement(Text, {
    bold: !0
  }, "Description:"), vS.default.createElement(Text, {
    wrap: "wrap"
  }, CLe(description, Gzp))), memoCache[31] = description, memoCache[32] = descriptionSection;else descriptionSection = memoCache[32];

  // --- parameters section ---
  let parametersSection: any;
  if (memoCache[33] !== tool.inputJSONSchema) parametersSection = tool.inputJSONSchema && tool.inputJSONSchema.properties && Object.keys(tool.inputJSONSchema.properties).length > 0 && vS.default.createElement(Box, {
    flexDirection: "column",
    marginTop: 1
  }, vS.default.createElement(Text, {
    bold: !0
  }, "Parameters:"), vS.default.createElement(Box, {
    marginLeft: 2,
    flexDirection: "column"
  }, Object.entries(tool.inputJSONSchema.properties).map(entry => {
    let [paramName, paramSchema] = entry,
      isRequired = tool.inputJSONSchema?.required?.includes(paramName);
    return vS.default.createElement(AS, {
      key: paramName
    }, paramName, vS.default.createElement(CG, {
      when: isRequired ?? !1
    }, "required"), ":", " ", vS.default.createElement(Text, {
      dimColor: !0
    }, typeof paramSchema === "object" && paramSchema && "type" in paramSchema ? String(paramSchema.type) : "unknown"), typeof paramSchema === "object" && paramSchema && "description" in paramSchema && vS.default.createElement(Text, {
      dimColor: !0
    }, " - ", CLe(String(paramSchema.description), Vzp)));
  }))), memoCache[33] = tool.inputJSONSchema, memoCache[34] = parametersSection;else parametersSection = memoCache[34];

  // --- body container ---
  let bodyContainer: any;
  if (memoCache[35] !== toolIdRow || memoCache[36] !== fullNameRow || memoCache[37] !== descriptionSection || memoCache[38] !== parametersSection) bodyContainer = vS.default.createElement(Box, {
    flexDirection: "column"
  }, toolIdRow, fullNameRow, descriptionSection, parametersSection), memoCache[35] = toolIdRow, memoCache[36] = fullNameRow, memoCache[37] = descriptionSection, memoCache[38] = parametersSection, memoCache[39] = bodyContainer;else bodyContainer = memoCache[39];

  // --- wrap in panel with title, subtitle=server name, cancel=onBack ---
  let panel: any;
  if (memoCache[40] !== onBack || memoCache[41] !== server.name || memoCache[42] !== bodyContainer || memoCache[43] !== title) panel = vS.default.createElement(Kn, {
    title: title,
    subtitle: server.name,
    onCancel: onBack,
    inputGuide: escGuide
  }, bodyContainer), memoCache[40] = onBack, memoCache[41] = server.name, memoCache[42] = bodyContainer, memoCache[43] = title, memoCache[44] = panel;else panel = memoCache[44];
  return panel;
}
var eml: any,
  vS: any,
  Gzp = 1000,
  Vzp = 200;
var $5n = b(() => {
  ze();
  scalar();
  dr();
  readRoster();
  wje();
  Yz();
  Li();
  eml = M(rt(), 1), vS = M(Te(), 1);
});
export {Q6t,eml,vS,Gzp,Vzp,$5n};
