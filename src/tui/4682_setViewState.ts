// @ts-nocheck
import {useClock as Ps} from "../../vendor/m2432.ts";
import {vf as kf,F9 as C9,Spt as Xdt,mne as rne,gnl as Wel,hS as cS} from "../config/4438_source.ts";
import {loadAllPlugins as IC,gg as mg} from "../agent/4445_resolvePluginRoot.ts";
import {une as ene,Z6e as D6e,Tpt as Jdt,uJ as JY,W_e as R_e} from "../../vendor/m4435.ts";
import {Npe as _pe,ik as nk} from "../agent/0726_level.ts";
import {Wn as Gn} from "../api/0459_getOauthConfig.ts";
import {getSettingsForSource as Cn,updateSettingsForSource as ao,yr as Er} from "../config/0740_updateSettingsForSource.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {rbo as QTo,cWn as b5n} from "../telemetry/4681_scope.ts";
import {react as Fh,W6 as D6} from "../../vendor/m4434.ts";
import {Cn as En,dr as fr} from "../../vendor/m231.ts";
import {et as Ze,Ai as pi} from "../../vendor/m2208.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {shouldSkipPluginAutoupdate as uDe,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Or as Ir,Wo,Ts as _s} from "../../vendor/m2542.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {lr as ur,readRoster as Ec} from "../../vendor/m2547.ts";
import {AS as lS,Yz as Lz} from "../../vendor/m3174.ts";
import {nl as Za,v_ as C_} from "../../vendor/m2573.ts";
import {pC as lC,Fie as xie} from "../../vendor/m2555.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function ManageMarketplaces({
  setViewState: setViewState,
  error: error,
  setError: setError,
  setResult: setResult,
  exitState: exitState,
  onManageComplete: onManageComplete,
  targetMarketplace: targetMarketplace,
  action: action
}) {
  let [marketplaces, setMarketplaces] = _y.useState([]),
    [loading, setLoading] = _y.useState(true),
    [selectedIndex, setSelectedIndex] = _y.useState(0),
    [processing, setProcessing] = _y.useState(false),
    [errorMessage, setErrorMessage] = _y.useState(null),
    [detailsResult, setDetailsResult] = _y.useState(null),
    [updateProgress, setUpdateProgress] = _y.useState(null),
    [viewMode, setViewMode] = _y.useState("list"),
    [selectedMarketplace, setSelectedMarketplace] = _y.useState(null),
    [detailFocusIndex, setDetailFocusIndex] = _y.useState(0),
    autoNavDoneRef = _y.useRef(false),
    timers = Ps(),
    pendingNavTimeoutRef = _y.useRef(undefined),
    mountedRef = _y.useRef(true);
  _y.useEffect(() => () => {
    mountedRef.current = false, pendingNavTimeoutRef.current?.();
  }, []), _y.useEffect(() => {
    async function loadMarketplaces() {
      try {
        let installedMcp = await kf(),
          {
            enabled: enabledPlugins,
            disabled: disabledPlugins
          } = await IC(),
          allPlugins = [...enabledPlugins, ...disabledPlugins],
          {
            marketplaces: loadedMarketplaces,
            failures: loadFailures
          } = await ene(installedMcp),
          marketplaceSettings = C9(),
          rows = [];
        for (let {
          name: mpName,
          config: mpConfig,
          data: mpData
        } of loadedMarketplaces) {
          let mpInstalled = allPlugins.filter(plugin => plugin.source.endsWith(`@${mpName}`));
          rows.push({
            name: mpName,
            source: D6e(mpConfig.source),
            lastUpdated: mpConfig.lastUpdated,
            pluginCount: mpData?.plugins.length,
            installedPlugins: mpInstalled,
            pendingUpdate: false,
            pendingRemove: false,
            autoUpdate: _pe(mpName, mpConfig, marketplaceSettings[mpName]?.autoUpdate)
          });
        }
        rows.sort((a, b) => {
          if (a.name === "claude-plugin-directory") return -1;
          if (b.name === "claude-plugin-directory") return 1;
          return a.name.localeCompare(b.name);
        }), setMarketplaces(rows);
        let loadedCount = Gn(loadedMarketplaces, mp => mp.data !== null),
          loadWarning = Jdt(loadFailures, loadedCount);
        if (loadWarning) if (loadWarning.type === "warning") setErrorMessage(loadWarning.message);else throw Error(loadWarning.message);
        if (targetMarketplace && !autoNavDoneRef.current && !error) {
          autoNavDoneRef.current = true;
          let targetIndex = rows.findIndex(row => row.name === targetMarketplace);
          if (targetIndex >= 0) {
            let targetRow = rows[targetIndex];
            if (action) {
              setSelectedIndex(targetIndex + 1);
              let updatedRows = rows.map((row, i) => i === targetIndex ? {
                ...row,
                pendingUpdate: action === "update",
                pendingRemove: action === "remove"
              } : row);
              setMarketplaces(updatedRows), applyChanges(updatedRows);
            } else if (targetRow) setSelectedIndex(targetIndex + 1), setSelectedMarketplace(targetRow), pendingNavTimeoutRef.current?.(), setViewMode("details");
          } else setError(`Marketplace not found: ${targetMarketplace}`);
        }
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load marketplaces"), setErrorMessage(loadError instanceof Error ? loadError.message : "Failed to load marketplaces");
      } finally {
        setLoading(false);
      }
    }
    loadMarketplaces();
  }, [targetMarketplace, action, error]);
  let hasPendingActions = () => marketplaces.some(ee => ee.pendingUpdate || ee.pendingRemove),
    getPendingCounts = () => {
      let updateCount = Gn(marketplaces, mp => mp.pendingUpdate),
        removeCount = Gn(marketplaces, mp => mp.pendingRemove);
      return {
        updateCount: updateCount,
        removeCount: removeCount
      };
    },
    applyChanges = async overrideMarketplaces => {
      let toApply = overrideMarketplaces || marketplaces,
        inDetailsView = viewMode === "details";
      setProcessing(true), setErrorMessage(null), setDetailsResult(null), setUpdateProgress(null);
      try {
        let userSettings = Cn("userSettings"),
          updatedCount = 0,
          removedCount = 0,
          updatedNames = new Set();
        for (let mp of toApply) {
          if (mp.pendingRemove) {
            if (mp.installedPlugins.length > 0) {
              let enabledPlugins = {
                ...userSettings?.enabledPlugins
              };
              for (let plugin of mp.installedPlugins) {
                let pluginKey = JY(plugin.name, mp.name);
                enabledPlugins[pluginKey] = false;
              }
              ao("userSettings", {
                enabledPlugins: enabledPlugins
              });
            }
            await Xdt(mp.name), removedCount++, j("tengu_marketplace_removed", {
              marketplace_name: mp.name,
              plugins_uninstalled: mp.installedPlugins.length
            });
            continue;
          }
          if (mp.pendingUpdate) await rne(mp.name, progress => {
            setUpdateProgress(progress);
          }), updatedCount++, updatedNames.add(mp.name.toLowerCase()), j("tengu_marketplace_updated", {
            marketplace_name: mp.name
          });
        }
        let bumpedPluginCount = 0;
        if (updatedNames.size > 0) {
          let {
            updated: bumpedPlugins
          } = await QTo(updatedNames);
          bumpedPluginCount = bumpedPlugins.length;
        }
        if (Fh(), await onManageComplete(), !mountedRef.current) return;
        let installedMcp = await kf(),
          {
            enabled: enabledPlugins,
            disabled: disabledPlugins
          } = await IC();
        if (!mountedRef.current) return;
        let allPlugins = [...enabledPlugins, ...disabledPlugins],
          {
            marketplaces: loadedMarketplaces
          } = await ene(installedMcp);
        if (!mountedRef.current) return;
        let marketplaceSettings = C9(),
          rows = [];
        for (let {
          name: mpName,
          config: mpConfig,
          data: mpData
        } of loadedMarketplaces) {
          let mpInstalled = allPlugins.filter(plugin => plugin.source.endsWith(`@${mpName}`));
          rows.push({
            name: mpName,
            source: D6e(mpConfig.source),
            lastUpdated: mpConfig.lastUpdated,
            pluginCount: mpData?.plugins.length,
            installedPlugins: mpInstalled,
            pendingUpdate: false,
            pendingRemove: false,
            autoUpdate: _pe(mpName, mpConfig, marketplaceSettings[mpName]?.autoUpdate)
          });
        }
        if (rows.sort((a, b) => {
          if (a.name === "claude-plugin-directory") return -1;
          if (b.name === "claude-plugin-directory") return 1;
          return a.name.localeCompare(b.name);
        }), setMarketplaces(rows), inDetailsView && selectedMarketplace) {
          let refreshed = rows.find(row => row.name === selectedMarketplace.name);
          if (refreshed) setSelectedMarketplace(refreshed);
        }
        let summaryParts = [];
        if (updatedCount > 0) {
          let bumpedSuffix = bumpedPluginCount > 0 ? ` (${bumpedPluginCount} ${En(bumpedPluginCount, "plugin")} bumped)` : "";
          summaryParts.push(`Updated ${updatedCount} ${En(updatedCount, "marketplace")}${bumpedSuffix}`);
        }
        if (removedCount > 0) summaryParts.push(`Removed ${removedCount} ${En(removedCount, "marketplace")}`);
        if (summaryParts.length > 0) {
          let summaryMessage = `${Ze.tick} ${summaryParts.join(", ")}`;
          if (inDetailsView) setDetailsResult(summaryMessage);else {
            if (!mountedRef.current) return;
            setResult(summaryMessage), pendingNavTimeoutRef.current?.(), pendingNavTimeoutRef.current = timers.setTimeout(() => setViewState({
              type: "menu"
            }), 2000);
          }
        } else if (!inDetailsView) {
          if (!mountedRef.current) return;
          setViewState({
            type: "menu"
          });
        }
      } catch (applyError) {
        let message = Se(applyError);
        if (!mountedRef.current) return;
        setErrorMessage(message), setError(message);
      } finally {
        if (mountedRef.current) setProcessing(false), setUpdateProgress(null);
      }
    },
    confirmRemove = async () => {
      if (!selectedMarketplace) return;
      let updatedRows = marketplaces.map(mp => mp.name === selectedMarketplace.name ? {
        ...mp,
        pendingRemove: true
      } : mp);
      setMarketplaces(updatedRows), await applyChanges(updatedRows);
    },
    getDetailMenuOptions = mp => {
      if (!mp) return [];
      let options = [{
        label: `Browse plugins (${mp.pluginCount ?? 0})`,
        value: "browse"
      }, {
        label: "Update marketplace",
        secondaryLabel: mp.lastUpdated ? `(last updated ${new Date(mp.lastUpdated).toLocaleDateString()})` : undefined,
        value: "update"
      }];
      if (!uDe()) options.push({
        label: mp.autoUpdate ? "Disable auto-update" : "Enable auto-update",
        value: "toggle-auto-update"
      });
      return options.push({
        label: "Remove marketplace",
        value: "remove"
      }), options;
    },
    toggleAutoUpdate = async mp => {
      let nextAutoUpdate = !mp.autoUpdate;
      try {
        await Wel(mp.name, nextAutoUpdate), setMarketplaces(prev => prev.map(row => row.name === mp.name ? {
          ...row,
          autoUpdate: nextAutoUpdate
        } : row)), setSelectedMarketplace(prev => prev ? {
          ...prev,
          autoUpdate: nextAutoUpdate
        } : prev);
      } catch (toggleError) {
        setErrorMessage(toggleError instanceof Error ? toggleError.message : "Failed to update setting");
      }
    };
  Ir("confirm:no", () => {
    pendingNavTimeoutRef.current?.(), setViewMode("list"), setDetailFocusIndex(0);
  }, {
    context: "Confirmation",
    isActive: !processing && (viewMode === "details" || viewMode === "confirm-remove")
  }), Ir("confirm:no", () => {
    pendingNavTimeoutRef.current?.(), setMarketplaces(prev => prev.map(mp => ({
      ...mp,
      pendingUpdate: false,
      pendingRemove: false
    }))), setSelectedIndex(0);
  }, {
    context: "Confirmation",
    isActive: !processing && viewMode === "list" && hasPendingActions()
  }), Ir("confirm:no", () => {
    setViewState({
      type: "menu"
    });
  }, {
    context: "Confirmation",
    isActive: !processing && viewMode === "list" && !hasPendingActions()
  }), Wo({
    "select:previous": () => setSelectedIndex(prev => Math.max(0, prev - 1)),
    "select:next": () => {
      let listLength = marketplaces.length + 1;
      setSelectedIndex(prev => Math.min(listLength - 1, prev + 1));
    },
    "select:accept": () => {
      pendingNavTimeoutRef.current?.();
      let marketplaceIndex = selectedIndex - 1;
      if (selectedIndex === 0) setViewState({
        type: "add-marketplace"
      });else if (hasPendingActions()) applyChanges();else {
        let mp = marketplaces[marketplaceIndex];
        if (mp) setSelectedMarketplace(mp), setViewMode("details"), setDetailFocusIndex(0);
      }
    }
  }, {
    context: "Select",
    isActive: !processing && viewMode === "list"
  });
  function handleListKeyDown(event) {
    if (event.ctrl || event.meta || processing) return;
    let marketplaceIndex = selectedIndex - 1;
    if ((event.key === "u" || event.key === "U") && marketplaceIndex >= 0) event.preventDefault(), pendingNavTimeoutRef.current?.(), setMarketplaces(prev => prev.map((mp, i) => i === marketplaceIndex ? {
      ...mp,
      pendingUpdate: !mp.pendingUpdate,
      pendingRemove: mp.pendingUpdate ? mp.pendingRemove : false
    } : mp));else if ((event.key === "d" || event.key === "D") && marketplaceIndex >= 0) {
      let mp = marketplaces[marketplaceIndex];
      if (mp) event.preventDefault(), setSelectedMarketplace(mp), pendingNavTimeoutRef.current?.(), setViewMode("confirm-remove");
    }
  }
  Wo({
    "select:previous": () => setDetailFocusIndex(prev => Math.max(0, prev - 1)),
    "select:next": () => {
      let options = getDetailMenuOptions(selectedMarketplace);
      setDetailFocusIndex(prev => Math.min(options.length - 1, prev + 1));
    },
    "select:accept": () => {
      if (pendingNavTimeoutRef.current?.(), !selectedMarketplace) return;
      let option = getDetailMenuOptions(selectedMarketplace)[detailFocusIndex];
      if (option?.value === "browse") setViewState({
        type: "browse-marketplace",
        targetMarketplace: selectedMarketplace.name
      });else if (option?.value === "update") {
        let updatedRows = marketplaces.map(mp => mp.name === selectedMarketplace.name ? {
          ...mp,
          pendingUpdate: true
        } : mp);
        setMarketplaces(updatedRows), applyChanges(updatedRows);
      } else if (option?.value === "toggle-auto-update") toggleAutoUpdate(selectedMarketplace);else if (option?.value === "remove") setViewMode("confirm-remove");
    }
  }, {
    context: "Select",
    isActive: !processing && viewMode === "details"
  });
  function handleConfirmRemoveKeyDown(event) {
    if (event.ctrl || event.meta || processing) return;
    if (event.key === "y" || event.key === "Y") event.preventDefault(), pendingNavTimeoutRef.current?.(), confirmRemove();else if (event.key === "n" || event.key === "N") event.preventDefault(), pendingNavTimeoutRef.current?.(), setViewMode("list"), setSelectedMarketplace(null);
  }
  if (loading) return j8.createElement(w, null, "Loading marketplaces\u2026");
  if (marketplaces.length === 0) return j8.createElement(B, {
    flexDirection: "column"
  }, j8.createElement(B, {
    marginBottom: 1
  }, j8.createElement(w, {
    bold: true
  }, "Manage marketplaces")), j8.createElement(B, {
    flexDirection: "row",
    gap: 1
  }, j8.createElement(w, {
    color: "suggestion"
  }, Ze.pointer, " +"), j8.createElement(w, {
    bold: true,
    color: "suggestion"
  }, "Add Marketplace")), j8.createElement(B, {
    marginTop: 1
  }, j8.createElement(w, {
    dimColor: true,
    italic: true
  }, exitState.pending ? j8.createElement(j8.Fragment, null, "Press ", exitState.keyName, " again to go back") : j8.createElement(hn, null, j8.createElement(ur, {
    action: "select:accept",
    context: "Select",
    fallback: "Enter",
    description: "select"
  }), j8.createElement(ur, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "go back"
  })))));
  if (viewMode === "confirm-remove" && selectedMarketplace) {
    let installedCount = selectedMarketplace.installedPlugins.length;
    return j8.createElement(B, {
      flexDirection: "column",
      tabIndex: 0,
      autoFocus: true,
      onKeyDown: handleConfirmRemoveKeyDown
    }, j8.createElement(w, {
      bold: true,
      color: "warning"
    }, "Remove marketplace ", j8.createElement(w, {
      italic: true
    }, selectedMarketplace.name), "?"), j8.createElement(B, {
      flexDirection: "column"
    }, installedCount > 0 && j8.createElement(B, {
      marginTop: 1
    }, j8.createElement(w, {
      color: "warning"
    }, "This will also uninstall ", installedCount, " ", En(installedCount, "plugin"), " from this marketplace:")), selectedMarketplace.installedPlugins.length > 0 && j8.createElement(B, {
      flexDirection: "column",
      marginTop: 1,
      marginLeft: 2
    }, selectedMarketplace.installedPlugins.map(plugin => j8.createElement(lS, {
      key: plugin.name
    }, j8.createElement(w, {
      dimColor: true
    }, plugin.name)))), j8.createElement(B, {
      marginTop: 1
    }, j8.createElement(w, null, "Press ", j8.createElement(w, {
      bold: true
    }, "y"), " to confirm or ", j8.createElement(w, {
      bold: true
    }, "n"), " to cancel"))));
  }
  if (viewMode === "details" && selectedMarketplace) {
    let isBusy = selectedMarketplace.pendingUpdate || processing,
      options = getDetailMenuOptions(selectedMarketplace);
    return j8.createElement(B, {
      flexDirection: "column"
    }, j8.createElement(w, {
      bold: true
    }, selectedMarketplace.name), j8.createElement(w, {
      dimColor: true
    }, selectedMarketplace.source), j8.createElement(B, {
      marginTop: 1
    }, j8.createElement(w, null, selectedMarketplace.pluginCount || 0, " available", " ", En(selectedMarketplace.pluginCount || 0, "plugin"))), selectedMarketplace.installedPlugins.length > 0 && j8.createElement(B, {
      flexDirection: "column",
      marginTop: 1
    }, j8.createElement(w, {
      bold: true
    }, "Installed plugins (", selectedMarketplace.installedPlugins.length, "):"), j8.createElement(B, {
      flexDirection: "column",
      marginLeft: 1
    }, selectedMarketplace.installedPlugins.map(plugin => j8.createElement(lS, {
      key: plugin.name
    }, plugin.name, `
`, j8.createElement(w, {
      dimColor: true
    }, plugin.manifest.description))))), isBusy && j8.createElement(B, {
      marginTop: 1,
      flexDirection: "column"
    }, j8.createElement(w, {
      color: "claude"
    }, "Updating marketplace\u2026"), updateProgress && j8.createElement(w, {
      dimColor: true
    }, updateProgress)), !isBusy && detailsResult && j8.createElement(B, {
      marginTop: 1
    }, j8.createElement(w, {
      color: "claude"
    }, detailsResult)), !isBusy && errorMessage && j8.createElement(B, {
      marginTop: 1
    }, j8.createElement(Za, {
      error: errorMessage
    })), !isBusy && j8.createElement(B, {
      flexDirection: "column",
      marginTop: 1
    }, options.map((option, optionIndex) => {
      if (!option) return null;
      return j8.createElement(lC, {
        key: option.value,
        isFocused: optionIndex === detailFocusIndex
      }, option.label, option.secondaryLabel && j8.createElement(w, {
        dimColor: true
      }, " ", option.secondaryLabel));
    })), !isBusy && !uDe() && selectedMarketplace.autoUpdate && j8.createElement(B, {
      marginTop: 1
    }, j8.createElement(w, {
      dimColor: true
    }, "Auto-update enabled. Claude Code will automatically update this marketplace and its installed plugins.")), j8.createElement(B, {
      marginTop: 1
    }, j8.createElement(w, {
      dimColor: true,
      italic: true
    }, isBusy ? j8.createElement(j8.Fragment, null, "Please wait\u2026") : j8.createElement(hn, null, j8.createElement(ur, {
      action: "select:accept",
      context: "Select",
      fallback: "Enter",
      description: "select"
    }), j8.createElement(ur, {
      action: "confirm:no",
      context: "Confirmation",
      fallback: "Esc",
      description: "go back"
    })))));
  }
  let {
    updateCount: updateCount,
    removeCount: removeCount
  } = getPendingCounts();
  return j8.createElement(B, {
    flexDirection: "column",
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: handleListKeyDown
  }, j8.createElement(B, {
    marginBottom: 1
  }, j8.createElement(w, {
    bold: true
  }, "Manage marketplaces")), j8.createElement(B, {
    flexDirection: "row",
    gap: 1,
    marginBottom: 1
  }, j8.createElement(w, {
    color: selectedIndex === 0 ? "suggestion" : undefined
  }, selectedIndex === 0 ? Ze.pointer : " ", " +"), j8.createElement(w, {
    bold: true,
    color: selectedIndex === 0 ? "suggestion" : undefined
  }, "Add Marketplace")), j8.createElement(B, {
    flexDirection: "column"
  }, marketplaces.map((mp, index) => {
    let isFocused = index + 1 === selectedIndex,
      badges = [];
    if (mp.pendingUpdate) badges.push("UPDATE");
    if (mp.pendingRemove) badges.push("REMOVE");
    return j8.createElement(B, {
      key: mp.name,
      flexDirection: "row",
      gap: 1,
      marginBottom: 1
    }, j8.createElement(w, {
      color: isFocused ? "suggestion" : undefined
    }, isFocused ? Ze.pointer : " ", " ", mp.pendingRemove ? Ze.cross : Ze.bullet), j8.createElement(B, {
      flexDirection: "column",
      flexGrow: 1
    }, j8.createElement(B, {
      flexDirection: "row",
      gap: 1
    }, j8.createElement(w, {
      bold: true,
      strikethrough: mp.pendingRemove,
      dimColor: mp.pendingRemove
    }, mp.name === "claude-plugins-official" && j8.createElement(w, {
      color: "claude"
    }, "\u273B "), mp.name, mp.name === "claude-plugins-official" && j8.createElement(w, {
      color: "claude"
    }, " \u273B")), badges.length > 0 && j8.createElement(w, {
      color: "warning"
    }, "[", badges.join(", "), "]")), j8.createElement(w, {
      dimColor: true
    }, mp.source), j8.createElement(w, {
      dimColor: true
    }, mp.pluginCount !== undefined && j8.createElement(j8.Fragment, null, mp.pluginCount, " available"), mp.installedPlugins.length > 0 && j8.createElement(j8.Fragment, null, " \u2022 ", mp.installedPlugins.length, " installed"), mp.lastUpdated && j8.createElement(j8.Fragment, null, " ", "\u2022 Updated", " ", new Date(mp.lastUpdated).toLocaleDateString()))));
  })), hasPendingActions() && j8.createElement(B, {
    marginTop: 1,
    flexDirection: "column"
  }, j8.createElement(w, null, j8.createElement(w, {
    bold: true
  }, "Pending changes:"), " ", j8.createElement(w, {
    dimColor: true
  }, j8.createElement(ur, {
    action: "select:accept",
    context: "Select",
    fallback: "Enter",
    description: "apply"
  }))), updateCount > 0 && j8.createElement(lS, null, "Update ", updateCount, " ", En(updateCount, "marketplace")), removeCount > 0 && j8.createElement(lS, {
    color: "warning"
  }, "Remove ", removeCount, " ", En(removeCount, "marketplace"))), processing && j8.createElement(B, {
    marginTop: 1
  }, j8.createElement(w, {
    color: "claude"
  }, "Processing changes\u2026")), errorMessage && j8.createElement(B, {
    marginTop: 1
  }, j8.createElement(Za, {
    error: errorMessage
  })), j8.createElement(ManageMarketplacesFooter, {
    exitState: exitState,
    hasPendingActions: hasPendingActions()
  }));
}
function ManageMarketplacesFooter(props) {
  let memoCache = O44.c(18),
    {
      exitState: exitState,
      hasPendingActions: hasPendingActions
    } = props;
  if (exitState.pending) {
    let backHint;
    if (memoCache[0] !== exitState.keyName) backHint = j8.createElement(B, {
      marginTop: 1
    }, j8.createElement(w, {
      dimColor: true,
      italic: true
    }, "Press ", exitState.keyName, " again to go back")), memoCache[0] = exitState.keyName, memoCache[1] = backHint;else backHint = memoCache[1];
    return backHint;
  }
  let applyHint;
  if (memoCache[2] !== hasPendingActions) applyHint = hasPendingActions && j8.createElement(ur, {
    action: "select:accept",
    context: "Select",
    fallback: "Enter",
    description: "apply changes"
  }), memoCache[2] = hasPendingActions, memoCache[3] = applyHint;else applyHint = memoCache[3];
  let selectHint;
  if (memoCache[4] !== hasPendingActions) selectHint = !hasPendingActions && j8.createElement(ur, {
    action: "select:accept",
    context: "Select",
    fallback: "Enter",
    description: "select"
  }), memoCache[4] = hasPendingActions, memoCache[5] = selectHint;else selectHint = memoCache[5];
  let updateChordHint;
  if (memoCache[6] !== hasPendingActions) updateChordHint = !hasPendingActions && j8.createElement(lt, {
    chord: "u",
    action: "update"
  }), memoCache[6] = hasPendingActions, memoCache[7] = updateChordHint;else updateChordHint = memoCache[7];
  let removeChordHint;
  if (memoCache[8] !== hasPendingActions) removeChordHint = !hasPendingActions && j8.createElement(lt, {
    chord: "d",
    action: "remove"
  }), memoCache[8] = hasPendingActions, memoCache[9] = removeChordHint;else removeChordHint = memoCache[9];
  let backDescription = hasPendingActions ? "cancel" : "go back",
    backHint;
  if (memoCache[10] !== backDescription) backHint = j8.createElement(ur, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: backDescription
  }), memoCache[10] = backDescription, memoCache[11] = backHint;else backHint = memoCache[11];
  let footer;
  if (memoCache[12] !== applyHint || memoCache[13] !== selectHint || memoCache[14] !== updateChordHint || memoCache[15] !== removeChordHint || memoCache[16] !== backHint) footer = j8.createElement(B, {
    marginTop: 1
  }, j8.createElement(w, {
    dimColor: true,
    italic: true
  }, j8.createElement(hn, null, applyHint, selectHint, updateChordHint, removeChordHint, backHint))), memoCache[12] = applyHint, memoCache[13] = selectHint, memoCache[14] = updateChordHint, memoCache[15] = removeChordHint, memoCache[16] = backHint, memoCache[17] = footer;else footer = memoCache[17];
  return footer;
}
var O44, j8, _y;
var z44 = b(() => {
  pi();
  Ct();
  Ec();
  Lz();
  qs();
  C_();
  ts();
  xie();
  Je();
  _s();
  nr();
  St();
  D6();
  R_e();
  cS();
  b5n();
  mg();
  nk();
  Er();
  fr();
  O44 = L(nt(), 1), j8 = L(Te(), 1), _y = L(Te(), 1);
});

export {ManageMarketplaces as Jml,ManageMarketplacesFooter as UYp,O44 as Yml,j8 as cr,_y as cM,z44 as Xml};
