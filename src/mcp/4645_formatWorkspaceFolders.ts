// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {Dyl,Oyl,xyl,Pyl,Lyl} from "../../vendor/m4643.ts";
import {wl,sy} from "../../vendor/m2585.ts";
import {oDn,cB,tH,aDn,taa,lDn,MXr,Iee,uS} from "../config/3192_path.ts";
import {hr} from "../../vendor/m2573.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {FO,uj} from "../../vendor/m2812.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {cS,Rj} from "../../vendor/m3188.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {getCurrentWorktreeSession as _f} from "../config/3348_flushAnalyticsSinks.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {execFileNoThrow as Fn,Ii} from "../../vendor/m690.ts";
import {He,xe,mn} from "../telemetry/0600_feature_name.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {useTimeout as md,WPt} from "../../vendor/m2460.ts";
import {zA,ReactRuntime as Ew} from "../tools/3238_name.ts";
import {TS} from "../../vendor/m4541.ts";
import {je} from "../../vendor/m2462.ts";
import {qI} from "../session/5205_worktreeBranchName.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
var Fyl = {};
ft(Fyl, {
  formatWorkspaceFolders: () => formatWorkspaceFolders,
  call: () => call,
  IDE_CONNECTION_TIMEOUT_MS: () => IDE_CONNECTION_TIMEOUT_MS,
  IDECommandFlow: () => IDECommandFlow
});

/** Picker UI for selecting an IDE to connect to (available + unavailable lists). */
function IDESelectionMenu(props: {
  availableIDEs: any[];
  unavailableIDEs: any[];
  selectedIDE: any;
  onClose: () => void;
  onSelect: (ide: any) => void;
}) {
  let memo = uWt.c(39),
    {
      availableIDEs,
      unavailableIDEs,
      selectedIDE,
      onClose,
      onSelect
    } = props,
    initialValue: string;
  if (memo[0] !== selectedIDE?.port) initialValue = selectedIDE?.port?.toString() ?? "None", memo[0] = selectedIDE?.port, memo[1] = initialValue;else initialValue = memo[1];
  let [currentValue, setCurrentValue] = S6.useState(initialValue),
    [showJetbrainsHint, setShowJetbrainsHint] = S6.useState(!1),
    [showDisconnectHint, setShowDisconnectHint] = S6.useState(!1),
    onValueChange: (value: string) => void;
  if (memo[2] !== availableIDEs || memo[3] !== onSelect) onValueChange = (value: string) => {
    if (value !== "None" && Dyl()) setShowJetbrainsHint(!0);else if (value === "None" && Oyl()) setShowDisconnectHint(!0);else onSelect(availableIDEs.find(ide => ide.port === parseInt(value)));
  }, memo[2] = availableIDEs, memo[3] = onSelect, memo[4] = onValueChange;else onValueChange = memo[4];
  let handleChange = onValueChange,
    nameCounts: Record<string, number>;
  if (memo[5] !== availableIDEs) nameCounts = availableIDEs.reduce(countIDENames, {}), memo[5] = availableIDEs, memo[6] = nameCounts;else nameCounts = memo[6];
  let ideNameCounts = nameCounts,
    selectOptions: any[];
  if (memo[7] !== availableIDEs || memo[8] !== ideNameCounts) {
    let toOption: (ide: any) => any;
    if (memo[10] !== ideNameCounts) toOption = ide => {
      let hasDuplicateName = (ideNameCounts[ide.name] || 0) > 1 && ide.workspaceFolders.length > 0;
      return {
        label: ide.name,
        value: ide.port.toString(),
        description: hasDuplicateName ? formatWorkspaceFolders(ide.workspaceFolders) : void 0
      };
    }, memo[10] = ideNameCounts, memo[11] = toOption;else toOption = memo[11];
    selectOptions = availableIDEs.map(toOption).concat([{
      label: "None",
      value: "None",
      description: void 0
    }]), memo[7] = availableIDEs, memo[8] = ideNameCounts, memo[9] = selectOptions;
  } else selectOptions = memo[9];
  let options = selectOptions;
  if (showJetbrainsHint) {
    let jetbrainsHintNode: any;
    if (memo[12] !== handleChange || memo[13] !== currentValue) jetbrainsHintNode = Tb.jsx(xyl, {
      onComplete: () => handleChange(currentValue)
    }), memo[12] = handleChange, memo[13] = currentValue, memo[14] = jetbrainsHintNode;else jetbrainsHintNode = memo[14];
    return jetbrainsHintNode;
  }
  if (showDisconnectHint) {
    let disconnectHintNode: any;
    if (memo[15] !== onSelect) disconnectHintNode = Tb.jsx(Pyl, {
      onComplete: () => {
        onSelect(void 0);
      }
    }), memo[15] = onSelect, memo[16] = disconnectHintNode;else disconnectHintNode = memo[16];
    return disconnectHintNode;
  }
  let emptyMessageNode: any;
  if (memo[17] !== availableIDEs.length) emptyMessageNode = availableIDEs.length === 0 && Tb.jsx(wl, {
    children: oDn() ? `No available IDEs detected. Please install the plugin and restart your IDE:
https://docs.claude.com/s/claude-code-jetbrains` : "No available IDEs detected. Make sure your IDE has the Claude Code extension or plugin installed and is running."
  }), memo[17] = availableIDEs.length, memo[18] = emptyMessageNode;else emptyMessageNode = memo[18];
  let selectNode: any;
  if (memo[19] !== availableIDEs.length || memo[20] !== handleChange || memo[21] !== options || memo[22] !== currentValue) selectNode = availableIDEs.length !== 0 && Tb.jsx(hr, {
    defaultValue: currentValue,
    defaultFocusValue: currentValue,
    options: options,
    onChange: value => {
      setCurrentValue(value), handleChange(value);
    }
  }), memo[19] = availableIDEs.length, memo[20] = handleChange, memo[21] = options, memo[22] = currentValue, memo[23] = selectNode;else selectNode = memo[23];
  let vsCodeWarningNode: any;
  if (memo[24] !== availableIDEs) vsCodeWarningNode = availableIDEs.length !== 0 && availableIDEs.some(isVSCode) && Tb.jsx($, {
    marginTop: 1,
    children: Tb.jsx(v, {
      color: "warning",
      children: "Note: Only one Claude Code instance can be connected to VS Code at a time."
    })
  }), memo[24] = availableIDEs, memo[25] = vsCodeWarningNode;else vsCodeWarningNode = memo[25];
  let autoConnectTipNode: any;
  if (memo[26] !== availableIDEs.length) autoConnectTipNode = availableIDEs.length !== 0 && !cB() && Tb.jsx($, {
    marginTop: 1,
    children: Tb.jsx(v, {
      dimColor: !0,
      children: "Tip: You can enable auto-connect to IDE in /config or with the --ide flag"
    })
  }), memo[26] = availableIDEs.length, memo[27] = autoConnectTipNode;else autoConnectTipNode = memo[27];
  let unavailableSectionNode: any;
  if (memo[28] !== unavailableIDEs) unavailableSectionNode = unavailableIDEs.length > 0 && Tb.jsxs($, {
    marginTop: 1,
    flexDirection: "column",
    children: [Tb.jsxs(v, {
      dimColor: !0,
      children: ["Found ", unavailableIDEs.length, " other running IDE(s). However, their workspace/project directories do not match the current cwd."]
    }), Tb.jsxs($, {
      marginTop: 1,
      paddingLeft: 3,
      flexDirection: "column",
      children: [unavailableIDEs.slice(0, 4).map(renderUnavailableIDE), unavailableIDEs.length > 4 && Tb.jsx(FO, {
        count: unavailableIDEs.length - 4,
        unit: "IDE"
      })]
    })]
  }), memo[28] = unavailableIDEs, memo[29] = unavailableSectionNode;else unavailableSectionNode = memo[29];
  let bodyNode: any;
  if (memo[30] !== emptyMessageNode || memo[31] !== selectNode || memo[32] !== vsCodeWarningNode || memo[33] !== autoConnectTipNode || memo[34] !== unavailableSectionNode) bodyNode = Tb.jsxs($, {
    flexDirection: "column",
    children: [emptyMessageNode, selectNode, vsCodeWarningNode, autoConnectTipNode, unavailableSectionNode]
  }), memo[30] = emptyMessageNode, memo[31] = selectNode, memo[32] = vsCodeWarningNode, memo[33] = autoConnectTipNode, memo[34] = unavailableSectionNode, memo[35] = bodyNode;else bodyNode = memo[35];
  let dialogNode: any;
  if (memo[36] !== onClose || memo[37] !== bodyNode) dialogNode = Tb.jsx(Jn, {
    title: "Select IDE",
    subtitle: "Connect to an IDE for integrated development features.",
    onCancel: onClose,
    color: "ide",
    children: bodyNode
  }), memo[36] = onClose, memo[37] = bodyNode, memo[38] = dialogNode;else dialogNode = memo[38];
  return dialogNode;
}

/** Renders one unavailable IDE row showing its name and workspace folders. */
function renderUnavailableIDE(ide: any, key: number) {
  return Tb.jsx(cS, {
    children: Tb.jsxs(v, {
      dimColor: !0,
      children: [ide.name, ": ", formatWorkspaceFolders(ide.workspaceFolders)]
    })
  }, key);
}

/** True when the IDE is VS Code (by either display name). */
function isVSCode(ide: any) {
  return ide.name === "VS Code" || ide.name === "Visual Studio Code";
}

/** Reducer accumulating a count of IDEs per name. */
function countIDENames(counts: Record<string, number>, ide: any) {
  return counts[ide.name] = (counts[ide.name] || 0) + 1, counts;
}

/** Finds the IDE in the list whose url matches the configured dynamic ide entry. */
async function findMatchingIDE(ides: any[], dynamicMcpConfig: any) {
  let ideConfig = dynamicMcpConfig?.ide;
  if (!ideConfig || ideConfig.type !== "sse-ide" && ideConfig.type !== "ws-ide") return null;
  for (let ide of ides) if (ide.url === ideConfig.url) return ide;
  return null;
}

/** Picker UI for choosing an IDE to open the current project/worktree in. */
function OpenProjectIDEMenu(props: {
  availableIDEs: any[];
  onSelectIDE: (ide: any) => void;
  onDone: (...args: any[]) => void;
}) {
  let memo = uWt.c(18),
    {
      availableIDEs,
      onSelectIDE,
      onDone
    } = props,
    initialValue: string;
  if (memo[0] !== availableIDEs[0]?.port) initialValue = availableIDEs[0]?.port?.toString() ?? "", memo[0] = availableIDEs[0]?.port, memo[1] = initialValue;else initialValue = memo[1];
  let [currentValue, setCurrentValue] = S6.useState(initialValue),
    onValueChange: (value: string) => void;
  if (memo[2] !== availableIDEs || memo[3] !== onSelectIDE) onValueChange = value => {
    let selected = availableIDEs.find(ide => ide.port === parseInt(value));
    onSelectIDE(selected);
  }, memo[2] = availableIDEs, memo[3] = onSelectIDE, memo[4] = onValueChange;else onValueChange = memo[4];
  let selectIDE = onValueChange,
    selectOptions: any[];
  if (memo[5] !== availableIDEs) selectOptions = availableIDEs.map(toPortOption), memo[5] = availableIDEs, memo[6] = selectOptions;else selectOptions = memo[6];
  let options = selectOptions,
    cancelHandler: () => void;
  if (memo[7] !== onDone) cancelHandler = function () {
    onDone("IDE selection cancelled", {
      display: "system"
    });
  }, memo[7] = onDone, memo[8] = cancelHandler;else cancelHandler = memo[8];
  let onCancel = cancelHandler,
    changeHandler: (value: string) => void;
  if (memo[9] !== selectIDE) changeHandler = value => {
    setCurrentValue(value), selectIDE(value);
  }, memo[9] = selectIDE, memo[10] = changeHandler;else changeHandler = memo[10];
  let selectNode: any;
  if (memo[11] !== options || memo[12] !== currentValue || memo[13] !== changeHandler) selectNode = Tb.jsx(hr, {
    defaultValue: currentValue,
    defaultFocusValue: currentValue,
    options: options,
    onChange: changeHandler
  }), memo[11] = options, memo[12] = currentValue, memo[13] = changeHandler, memo[14] = selectNode;else selectNode = memo[14];
  let dialogNode: any;
  if (memo[15] !== onCancel || memo[16] !== selectNode) dialogNode = Tb.jsx(Jn, {
    title: "Select an IDE to open the project",
    onCancel: onCancel,
    color: "ide",
    children: selectNode
  }), memo[15] = onCancel, memo[16] = selectNode, memo[17] = dialogNode;else dialogNode = memo[17];
  return dialogNode;
}

/** Maps an IDE to a {label, value} select option keyed by port. */
function toPortOption(ide: any) {
  return {
    label: ide.name,
    value: ide.port.toString()
  };
}

/** Picker UI for choosing which running IDE to install the extension into. */
function InstallExtensionMenu(props: {
  runningIDEs: any[];
  onSelectIDE: (ide: any) => void;
  onDone: (...args: any[]) => void;
}) {
  let memo = uWt.c(15),
    {
      runningIDEs,
      onSelectIDE,
      onDone
    } = props,
    [currentValue, setCurrentValue] = S6.useState(runningIDEs[0] ?? ""),
    selectHandler: (ide: any) => void;
  if (memo[0] !== onSelectIDE) selectHandler = ide => {
    onSelectIDE(ide);
  }, memo[0] = onSelectIDE, memo[1] = selectHandler;else selectHandler = memo[1];
  let selectIDE = selectHandler,
    selectOptions: any[];
  if (memo[2] !== runningIDEs) selectOptions = runningIDEs.map(toIDEOption), memo[2] = runningIDEs, memo[3] = selectOptions;else selectOptions = memo[3];
  let options = selectOptions,
    cancelHandler: () => void;
  if (memo[4] !== onDone) cancelHandler = function () {
    onDone("IDE selection cancelled", {
      display: "system"
    });
  }, memo[4] = onDone, memo[5] = cancelHandler;else cancelHandler = memo[5];
  let onCancel = cancelHandler,
    changeHandler: (ide: any) => void;
  if (memo[6] !== selectIDE) changeHandler = ide => {
    setCurrentValue(ide), selectIDE(ide);
  }, memo[6] = selectIDE, memo[7] = changeHandler;else changeHandler = memo[7];
  let selectNode: any;
  if (memo[8] !== options || memo[9] !== currentValue || memo[10] !== changeHandler) selectNode = Tb.jsx(hr, {
    defaultFocusValue: currentValue,
    options: options,
    onChange: changeHandler
  }), memo[8] = options, memo[9] = currentValue, memo[10] = changeHandler, memo[11] = selectNode;else selectNode = memo[11];
  let dialogNode: any;
  if (memo[12] !== onCancel || memo[13] !== selectNode) dialogNode = Tb.jsx(Jn, {
    title: "Select IDE to install extension",
    onCancel: onCancel,
    color: "ide",
    children: selectNode
  }), memo[12] = onCancel, memo[13] = selectNode, memo[14] = dialogNode;else dialogNode = memo[14];
  return dialogNode;
}

/** Maps an IDE identifier to a {label, value} option using its display name. */
function toIDEOption(ide: any) {
  return {
    label: tH(ide),
    value: ide
  };
}

/** Effect-only component that triggers onInstall(ide) once on mount. */
function AutoInstallEffect(props: { ide: any; onInstall: (ide: any) => void }) {
  let memo = uWt.c(4),
    {
      ide,
      onInstall
    } = props,
    installCallback: () => void,
    installDeps: any[];
  if (memo[0] !== ide || memo[1] !== onInstall) installCallback = () => {
    onInstall(ide);
  }, installDeps = [ide, onInstall], memo[0] = ide, memo[1] = onInstall, memo[2] = installCallback, memo[3] = installDeps;else installCallback = memo[2], installDeps = memo[3];
  return S6.useEffect(installCallback, installDeps), null;
}

/** Entry point for the /ide slash command: open project, install extension, or connect. */
async function call(onDone: (...args: any[]) => void, context: any, subcommand: string) {
  W("tengu_ext_ide_command", {});
  let {
    options: {
      dynamicMcpConfig: dynamicMcpConfig
    },
    onChangeDynamicMcpConfig
  } = context;
  if (subcommand?.trim() === "open") {
    let worktreeSession = _f(),
      targetPath = worktreeSession ? worktreeSession.worktreePath : Lt(),
      validIDEs = (await aDn(!0)).filter(ide => ide.isValid);
    if (validIDEs.length === 0) return onDone("No IDEs with Claude Code extension detected."), null;
    return Tb.jsx(OpenProjectIDEMenu, {
      availableIDEs: validIDEs,
      onSelectIDE: async ide => {
        if (!ide) {
          onDone("No IDE selected.");
          return;
        }
        let appBundle = taa(ide.name),
          launchCommand = appBundle ? await lDn(appBundle, ide.name) : null;
        if (launchCommand) {
          let {
            code: exitCode
          } = await Fn(launchCommand, [targetPath]);
          if (exitCode !== 0 && !c7n.basename(launchCommand).startsWith("code")) ({
            code: exitCode
          } = await Fn("code", [targetPath]));
          if (exitCode === 0) He("ide_open_project"), onDone(`Opened ${worktreeSession ? "worktree" : "project"} in ${bt.bold(ide.name)}`);else xe("ide_open_project", "ide_open_project_failed"), onDone(`Failed to open in ${ide.name}. Try opening manually: ${targetPath}`);
        } else if (oDn()) onDone(`Please open the ${worktreeSession ? "worktree" : "project"} manually in ${bt.bold(ide.name)}: ${targetPath}`);else onDone(`Please open the ${worktreeSession ? "worktree" : "project"} manually in ${bt.bold(ide.name)}: ${targetPath}`);
      },
      onDone: () => {
        onDone("Exited without opening IDE", {
          display: "system"
        });
      }
    });
  }
  let detectedIDEs = await aDn(!0);
  if (detectedIDEs.length === 0 && context.onInstallIDEExtension && !cB()) {
    let installableIDEs = await MXr(),
      installIDE = (ide: any) => {
        if (context.onInstallIDEExtension) if (context.onInstallIDEExtension(ide), Iee(ide)) onDone(`Installed plugin to ${bt.bold(tH(ide))}
Please ${bt.bold("restart your IDE")} completely for it to take effect`);else onDone(`Installed extension to ${bt.bold(tH(ide))}`);
      };
    if (installableIDEs.length > 1) return Tb.jsx(InstallExtensionMenu, {
      runningIDEs: installableIDEs,
      onSelectIDE: installIDE,
      onDone: () => {
        onDone("No IDE selected.", {
          display: "system"
        });
      }
    });else if (installableIDEs.length === 1) return Tb.jsx(AutoInstallEffect, {
      ide: installableIDEs[0],
      onInstall: installIDE
    });
  }
  let validIDEs = detectedIDEs.filter(ide => ide.isValid),
    invalidIDEs = detectedIDEs.filter(ide => !ide.isValid),
    currentIDE = await findMatchingIDE(validIDEs, dynamicMcpConfig);
  return Tb.jsx(IDECommandFlow, {
    availableIDEs: validIDEs,
    unavailableIDEs: invalidIDEs,
    currentIDE: currentIDE,
    dynamicMcpConfig: dynamicMcpConfig,
    onChangeDynamicMcpConfig: onChangeDynamicMcpConfig,
    onDone: onDone
  });
}

/** Drives connect/disconnect lifecycle and renders the IDE selection menu. */
function IDECommandFlow({
  availableIDEs: availableIDEs,
  unavailableIDEs: unavailableIDEs,
  currentIDE: currentIDE,
  dynamicMcpConfig: dynamicMcpConfig,
  onChangeDynamicMcpConfig: onChangeDynamicMcpConfig,
  onDone: onDone
}) {
  let [connectingIDE, setConnectingIDE] = S6.useState(null),
    ideClient = _t(state => state.mcp.clients.find(client => client.name === "ide")),
    setAppState = bo(),
    isFirstRender = S6.useRef(!0);
  S6.useEffect(() => {
    if (!connectingIDE) return;
    if (isFirstRender.current) {
      isFirstRender.current = !1;
      return;
    }
    if (!ideClient || ideClient.type === "pending") return;
    if (ideClient.type === "connected") He("ide_connect"), onDone(`Connected to ${connectingIDE.name}.`);else if (ideClient.type === "failed") xe("ide_connect", "ide_connect_failed"), onDone(`Failed to connect to ${connectingIDE.name}.`);
  }, [ideClient, connectingIDE, onDone]), md(() => {
    if (!connectingIDE) return;
    xe("ide_connect", "ide_connect_timeout"), onDone(`Connection to ${connectingIDE.name} timed out.`);
  }, connectingIDE ? IDE_CONNECTION_TIMEOUT_MS : null, [connectingIDE, onDone]);
  let handleSelect = S6.useCallback(ide => {
    if (!onChangeDynamicMcpConfig) {
      onDone("Error connecting to IDE.");
      return;
    }
    let nextConfig = {
      ...(dynamicMcpConfig || {})
    };
    if (currentIDE) delete nextConfig.ide;
    if (!ide) {
      if (ideClient && ideClient.type === "connected" && currentIDE) ideClient.client.onclose = () => {}, zA("ide", ideClient.config), setAppState(state => ({
        ...state,
        mcp: {
          ...state.mcp,
          clients: state.mcp.clients.filter(client => client.name !== "ide"),
          tools: state.mcp.tools.filter(tool => !tool.name?.startsWith("mcp__ide__")),
          commands: state.mcp.commands.filter(command => !command.name?.startsWith("mcp__ide__"))
        }
      }));
      if (onChangeDynamicMcpConfig(nextConfig), currentIDE) He("ide_disconnect");
      onDone(currentIDE ? `Disconnected from ${currentIDE.name}.` : "No IDE selected.");
      return;
    }
    let ideUrl = ide.url;
    nextConfig.ide = {
      type: ideUrl.startsWith("ws:") ? "ws-ide" : "sse-ide",
      url: ideUrl,
      ideName: ide.name,
      authToken: ide.authToken,
      ideRunningInWindows: ide.ideRunningInWindows,
      scope: "dynamic"
    }, isFirstRender.current = !0, setConnectingIDE(ide), onChangeDynamicMcpConfig(nextConfig);
  }, [dynamicMcpConfig, currentIDE, ideClient, setAppState, onChangeDynamicMcpConfig, onDone]);
  if (connectingIDE) return Tb.jsxs(v, {
    dimColor: !0,
    children: ["Connecting to ", connectingIDE.name, "…"]
  });
  return Tb.jsx(IDESelectionMenu, {
    availableIDEs: availableIDEs,
    unavailableIDEs: unavailableIDEs,
    selectedIDE: currentIDE,
    onClose: () => onDone("IDE selection cancelled", {
      display: "system"
    }),
    onSelect: handleSelect
  });
}

/**
 * Formats up to two workspace folder paths into a comma-separated string that
 * fits within maxLength, stripping the cwd prefix and ellipsizing long paths.
 */
function formatWorkspaceFolders(folders: string[], maxLength: number = 100) {
  if (folders.length === 0) return "";
  let cwd = Lt(),
    shownFolders = folders.slice(0, 2),
    hasMore = folders.length > 2,
    moreSuffixLength = hasMore ? 3 : 0,
    separatorLength = (shownFolders.length - 1) * 2,
    budget = maxLength - separatorLength - moreSuffixLength,
    perFolderLength = Math.floor(budget / shownFolders.length),
    normalizedCwd = cwd.normalize("NFC"),
    result = shownFolders.map(folder => {
      let normalizedFolder = folder.normalize("NFC");
      if (normalizedFolder.startsWith(normalizedCwd + c7n.sep)) folder = normalizedFolder.slice(normalizedCwd.length + 1);
      if (folder.length <= perFolderLength) return folder;
      return "…" + folder.slice(-(perFolderLength - 1));
    }).join(", ");
  if (hasMore) result += ", …";
  return result;
}

var uWt,
  c7n,
  S6,
  Tb,
  IDE_CONNECTION_TIMEOUT_MS = 35000;
var Byl = b(() => {
  Gc();
  kt();
  TS();
  Rj();
  di();
  sy();
  uj();
  Lyl();
  WPt();
  je();
  mn();
  Ew();
  uo();
  Po();
  Ii();
  uS();
  qI();
  uWt = x(tt(), 1), c7n = x(require("path")), S6 = x(et(), 1), Tb = x(oe(), 1);
});

export {Fyl,IDESelectionMenu as Vnm,renderUnavailableIDE as Knm,isVSCode as znm,countIDENames as jnm,findMatchingIDE as Ynm,OpenProjectIDEMenu as Jnm,toPortOption as Xnm,InstallExtensionMenu as Qnm,toIDEOption as Znm,AutoInstallEffect as erm,call as trm,IDECommandFlow,formatWorkspaceFolders,uWt,c7n,S6,Tb,IDE_CONNECTION_TIMEOUT_MS,Byl};
