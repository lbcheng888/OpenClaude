// @ts-nocheck
import {getSessionId as It,getAllowedChannels as Nb,getMemoryToggledOff as Kx,lt} from "../session/0132_sent.ts";
import {Ne} from "../../vendor/m583.ts";
import {getCurrentSessionTitle as ph,getCurrentSessionAiTitle as FG,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {isChannelsEnabled as Bye,wpt} from "../telemetry/4178_isChannelsEnabled.ts";
import {isChannelsPolicyBlocked as Ipt,d5e} from "../../vendor/m4178.ts";
import {getSettingsForSource as An,br} from "./0745_updateSettingsForSource.ts";
import {IU} from "../../vendor/m5.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {wUn,kUn,NPa,xPa,DPa,IPa,OPa,LPa,MPa,PPa,vUn,slo} from "./3781_label.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {wkt,IAe} from "../../vendor/m1451.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {_t,uo} from "../../vendor/m2468.ts";
import {useTheme as ji} from "../../vendor/m2285.ts";
import {getSettingsSchema as ZS,SE} from "../../vendor/m2559.ts";
import {bf,G8e} from "../../vendor/m4537.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {Xl} from "./0651_maxBytes.ts";
import {ZDe} from "../../vendor/m4536.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Settings / diagnostics screen data builders.
 *
 * These functions assemble the rows shown in the Claude Code "Settings" view:
 * the version/session header block, the model/MCP/theme block, the compliance
 * block, and the asynchronous system-diagnostics block. Each builder returns
 * arrays of `{ label, value }` row groups which are later filtered, flattened
 * and rendered into a two-column table.
 */

/** A single labelled row in the settings table. */
interface SettingsRow {
  /** Column-1 caption (omitted renders as an empty cell). */
  label?: string;
  /** Column-2 content: string, ReactNode, or an array of nodes. */
  value: unknown;
}

/**
 * Builds the header group: version/build info, session name & id, optional
 * tmux session, optional channel listening status, optional memory-paused
 * notice, cwd, plus appended platform/auth/extra groups.
 */
function wJp(): SettingsRow[] {
  let sessionId = It(),
    tmuxSession = Ne.CLAUDE_CODE_TMUX_SESSION,
    sessionNameNode = ph(sessionId) ?? FG(sessionId) ?? _b.jsx(v, {
      dimColor: !0,
      children: "/rename to add a name"
    }),
    channelSources = Nb(),
    channelsStatus = "";
  if (channelSources.length > 0) {
    let sourcesLabel = channelSources.map(source => source.kind === "plugin" ? `plugin:${source.name}@${source.marketplace}` : `server:${source.name}`).join(", "),
      inactiveReason = Rr() !== "firstParty" ? "not available on third-party providers" : !Bye() ? "not currently available" : Ipt(An("policySettings")) ? "blocked by org policy" : void 0;
    channelsStatus = inactiveReason ? `Configured but not active (${inactiveReason}): ${sourcesLabel}` : `Listening for messages from ${sourcesLabel}`;
  }
  return [{
    label: "Version",
    value: `${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION}${IU()}`
  }, ...[], {
    label: "Session name",
    value: sessionNameNode
  }, {
    label: "Session ID",
    value: sessionId
  }, ...(tmuxSession ? [{
    label: "tmux session",
    value: tmuxSession
  }] : []), ...(channelsStatus ? [{
    label: "Channels",
    value: channelsStatus
  }] : []), ...[], ...(Kx() ? [{
    label: "Memory",
    value: "Paused for this session \xB7 /pause-memory to resume"
  }] : []), {
    label: "cwd",
    value: Lt()
  }, ...wUn(), ...HJp(), ...kUn()];
}

/** Maps an internal compliance-taint key to its human-readable label. */
function kJp(taint: string): string {
  switch (taint) {
    case "hipaa":
      return "HIPAA";
    case "zdr":
      return "ZDR (Zero Data Retention)";
    default:
      return A(`Unknown compliance_taint '${taint}' from policyLimits`, {
        level: "warn"
      }), taint;
  }
}

/** Builds the compliance group, or an empty group when no taints apply. */
function HJp(): SettingsRow[] {
  let taints = wkt();
  return taints.length > 0 ? [{
    label: "Compliance",
    value: taints.map(kJp)
  }] : [];
}

/** Builds the model / MCP-clients / theme group. */
function IJp({
  mainLoopModel: mainLoopModel,
  mcp: mcp,
  theme: theme,
  context: context
}: {
  mainLoopModel: any;
  mcp: any;
  theme: any;
  context: any;
}): SettingsRow[] {
  return [{
    label: "Model",
    value: NPa(mainLoopModel)
  }, ...xPa(mcp.clients, context.options.ideInstallationStatus, theme), ...DPa(mcp.clients, theme), ...IPa(), ...OPa()];
}

/** Asynchronously gathers the remaining detail groups. */
async function iml(): Promise<SettingsRow[]> {
  return [...(await LPa()), ...(await MPa()), ...(await PPa())];
}

/**
 * Renders a row value: arrays become comma-separated wrapped nodes,
 * strings become a text node, everything else is passed through.
 * Uses a React-compiler memo cache (`MVn.c`).
 */
function xJp(props: { value: unknown }): unknown {
  let cache = MVn.c(8),
    {
      value: value
    } = props;
  if (Array.isArray(value)) {
    let mappedItems;
    if (cache[0] !== value) {
      let renderItem;
      if (cache[2] !== value.length) renderItem = (item, index) => _b.jsxs(v, {
        children: [item, index < value.length - 1 ? "," : ""]
      }, index), cache[2] = value.length, cache[3] = renderItem;else renderItem = cache[3];
      mappedItems = value.map(renderItem), cache[0] = value, cache[1] = mappedItems;
    } else mappedItems = cache[1];
    let wrappedRow;
    if (cache[4] !== mappedItems) wrappedRow = _b.jsx($, {
      flexWrap: "wrap",
      columnGap: 1,
      flexShrink: 99,
      children: mappedItems
    }), cache[4] = mappedItems, cache[5] = wrappedRow;else wrappedRow = cache[5];
    return wrappedRow;
  }
  if (typeof value === "string") {
    let textNode;
    if (cache[6] !== value) textNode = _b.jsx(v, {
      children: value
    }), cache[6] = value, cache[7] = textNode;else textNode = cache[7];
    return textNode;
  }
  return value;
}

/**
 * Top-level Settings screen component. Assembles header + model groups,
 * renders the table, the suspense-wrapped diagnostics, and the cancel hint.
 */
function aml(props: { context: any; diagnosticsPromise: any }): unknown {
  let cache = MVn.c(20),
    {
      context: context,
      diagnosticsPromise: diagnosticsPromise
    } = props,
    mainLoopModel = _t(LJp),
    mcp = _t(OJp),
    [theme] = ji(),
    groups;
  if (cache[0] !== context || cache[1] !== mainLoopModel || cache[2] !== mcp || cache[3] !== theme) groups = vUn([wJp(), IJp({
    mainLoopModel: mainLoopModel,
    mcp: mcp,
    theme: theme,
    context: context
  })]), cache[0] = context, cache[1] = mainLoopModel, cache[2] = mcp, cache[3] = theme, cache[4] = groups;else groups = cache[4];
  let groupList = groups,
    flexGrow = ZS() ? 1 : void 0,
    columns;
  if (cache[5] === Symbol.for("react.memo_cache_sentinel")) columns = [{
    bold: !0
  }, {}], cache[5] = columns;else columns = cache[5];
  let rows;
  if (cache[6] !== groupList) rows = groupList.filter(PJp).flatMap(DJp), cache[6] = groupList, cache[7] = rows;else rows = cache[7];
  let table;
  if (cache[8] !== rows) table = _b.jsx(bf, {
    box: "plain",
    columns: columns,
    children: rows
  }), cache[8] = rows, cache[9] = table;else table = cache[9];
  let diagnostics;
  if (cache[10] !== diagnosticsPromise) diagnostics = _b.jsx(NVn.Suspense, {
    fallback: null,
    children: _b.jsx(MJp, {
      promise: diagnosticsPromise
    })
  }), cache[10] = diagnosticsPromise, cache[11] = diagnostics;else diagnostics = cache[11];
  let content;
  if (cache[12] !== flexGrow || cache[13] !== table || cache[14] !== diagnostics) content = _b.jsxs($, {
    flexDirection: "column",
    gap: 1,
    flexGrow: flexGrow,
    children: [table, diagnostics]
  }), cache[12] = flexGrow, cache[13] = table, cache[14] = diagnostics, cache[15] = content;else content = cache[15];
  let cancelHint;
  if (cache[16] === Symbol.for("react.memo_cache_sentinel")) cancelHint = _b.jsx(v, {
    dimColor: !0,
    children: _b.jsx(dr, {
      action: "confirm:no",
      context: "Settings",
      fallback: "Esc",
      description: "cancel"
    })
  }), cache[16] = cancelHint;else cancelHint = cache[16];
  let root;
  if (cache[17] !== flexGrow || cache[18] !== content) root = _b.jsxs($, {
    flexDirection: "column",
    gap: 1,
    flexGrow: flexGrow,
    children: [content, cancelHint]
  }), cache[17] = flexGrow, cache[18] = content, cache[19] = root;else root = cache[19];
  return root;
}

/**
 * Flattens a row group into table rows, inserting a blank gap row before
 * every group after the first.
 */
function DJp(group: SettingsRow[], groupIndex: number): unknown[] {
  return [groupIndex > 0 && _b.jsxs(bf.Row, {
    children: [_b.jsx(_b.Fragment, {
      children: " "
    }), _b.jsx(_b.Fragment, {
      children: ""
    })]
  }, `gap-${groupIndex}`), ...group.map((row, rowIndex) => {
    let {
      label: label,
      value: value
    } = row;
    return _b.jsxs(bf.Row, {
      children: [_b.jsx(_b.Fragment, {
        children: label !== void 0 ? `${label}:` : ""
      }), _b.jsx(xJp, {
        value: value
      })]
    }, `${groupIndex}-${rowIndex}`);
  })];
}

/** Predicate: keep only non-empty row groups. */
function PJp(group: SettingsRow[]): boolean {
  return group.length > 0;
}

/** Selector: extract the mcp state slice. */
function OJp(state: { mcp: any }): any {
  return state.mcp;
}

/** Selector: extract the main-loop model state slice. */
function LJp(state: { mainLoopModel: any }): any {
  return state.mainLoopModel;
}

/**
 * Renders the asynchronous "System diagnostics" block once its promise
 * resolves; renders nothing when there are no diagnostics.
 */
function MJp(props: { promise: any }): unknown {
  let cache = MVn.c(5),
    {
      promise: promise
    } = props,
    diagnostics = NVn.use(promise);
  if (diagnostics.length === 0) return null;
  let heading;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) heading = _b.jsx(v, {
    bold: !0,
    children: "System diagnostics"
  }), cache[0] = heading;else heading = cache[0];
  let items;
  if (cache[1] !== diagnostics) items = diagnostics.map(NJp), cache[1] = diagnostics, cache[2] = items;else items = cache[2];
  let block;
  if (cache[3] !== items) block = _b.jsxs($, {
    flexDirection: "column",
    paddingBottom: 1,
    children: [heading, items]
  }), cache[3] = items, cache[4] = block;else block = cache[4];
  return block;
}

/** Renders a single diagnostic line with a warning icon. */
function NJp(diagnostic: unknown, key: number): unknown {
  return _b.jsxs($, {
    flexDirection: "row",
    gap: 1,
    paddingX: 1,
    children: [_b.jsx(bs, {
      status: "warning"
    }), typeof diagnostic === "string" ? _b.jsx(v, {
      wrap: "wrap",
      children: diagnostic
    }) : diagnostic]
  }, key);
}
var MVn, NVn, _b;
var lml = b(() => {
  lt();
  SE();
  je();
  wpt();
  d5e();
  IAe();
  uo();
  Po();
  qe();
  Ir();
  Xl();
  Ps();
  ZDe();
  _a();
  br();
  slo();
  uc();
  ff();
  G8e();
  MVn = x(tt(), 1), NVn = x(et(), 1), _b = x(oe(), 1);
});

export {wJp,kJp,HJp,IJp,iml,xJp,aml,DJp,PJp,OJp,LJp,MJp,NJp,MVn,NVn,_b,lml};
