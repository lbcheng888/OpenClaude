// @ts-nocheck
import {useClock as As} from "../../vendor/m2442.ts";
import {$m,l9,bft,sne,rcl,dS} from "../config/4460_source.ts";
import {loadAllPlugins as BC,path as Eg} from "../agent/4467_resolvePluginRoot.ts";
import {nne,v8e,Sft,KY,dTe} from "../../vendor/m4457.ts";
import {Gpe,bk} from "../agent/0731_level.ts";
import {zn} from "../api/0465_getOauthConfig.ts";
import {getSettingsForSource as An,ao,br} from "../config/0745_updateSettingsForSource.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Two,K7n} from "../telemetry/4709_scope.ts";
import {zh,c6} from "../../vendor/m4456.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {shouldSkipPluginAutoupdate as RPe,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Or,Oo,ss} from "../../vendor/m2553.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {cS,Rj} from "../../vendor/m3188.ts";
import {Ba,I_} from "../../vendor/m2584.ts";
import {bE,Pie} from "../../vendor/m2566.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * ManageMarketplaces TUI view — lists plugin marketplaces, lets the user
 * browse/update/remove them, toggle auto-update, and apply pending changes.
 *
 * View modes: "list" | "details" | "confirm-remove".
 */
function $bl({
  setViewState: setViewState,
  error: error,
  setError: setError,
  setResult: setResult,
  exitState: exitState,
  onManageComplete: onManageComplete,
  targetMarketplace: targetMarketplace,
  action: action
}) {
  let [marketplaces, setMarketplaces] = vL.useState([]),
    [loading, setLoading] = vL.useState(!0),
    [selectedIndex, setSelectedIndex] = vL.useState(0),
    [processing, setProcessing] = vL.useState(!1),
    [errorMessage, setErrorMessage] = vL.useState(null),
    [detailsResult, setDetailsResult] = vL.useState(null),
    [updateProgress, setUpdateProgress] = vL.useState(null),
    [viewMode, setViewMode] = vL.useState("list"),
    [selectedMarketplace, setSelectedMarketplace] = vL.useState(null),
    [detailFocusIndex, setDetailFocusIndex] = vL.useState(0),
    autoNavDoneRef = vL.useRef(!1),
    timers = As(),
    pendingNavTimeoutRef = vL.useRef(void 0),
    mountedRef = vL.useRef(!0);
  vL.useEffect(() => () => {
    mountedRef.current = !1, pendingNavTimeoutRef.current?.();
  }, []), vL.useEffect(() => {
    async function loadMarketplaces() {
      try {
        let installedMcp = await $m(),
          {
            enabled: enabledPlugins,
            disabled: disabledPlugins
          } = await BC(),
          allPlugins = [...enabledPlugins, ...disabledPlugins],
          {
            marketplaces: loadedMarketplaces,
            failures: loadFailures
          } = await nne(installedMcp),
          marketplaceSettings = l9(),
          rows = [];
        for (let {
          name: mpName,
          config: mpConfig,
          data: mpData
        } of loadedMarketplaces) {
          let mpInstalled = allPlugins.filter(plugin => plugin.source.endsWith(`@${mpName}`));
          rows.push({
            name: mpName,
            source: v8e(mpConfig.source),
            lastUpdated: mpConfig.lastUpdated,
            pluginCount: mpData?.plugins.length,
            installedPlugins: mpInstalled,
            pendingUpdate: !1,
            pendingRemove: !1,
            autoUpdate: Gpe(mpName, mpConfig, marketplaceSettings[mpName]?.autoUpdate)
          });
        }
        rows.sort((a, b) => {
          if (a.name === "claude-plugin-directory") return -1;
          if (b.name === "claude-plugin-directory") return 1;
          return a.name.localeCompare(b.name);
        }), setMarketplaces(rows);
        let loadedCount = zn(loadedMarketplaces, mp => mp.data !== null),
          loadWarning = Sft(loadFailures, loadedCount);
        if (loadWarning) if (loadWarning.type === "warning") setErrorMessage(loadWarning.message);else throw Error(loadWarning.message);
        if (targetMarketplace && !autoNavDoneRef.current && !error) {
          autoNavDoneRef.current = !0;
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
        setLoading(!1);
      }
    }
    loadMarketplaces();
  }, [targetMarketplace, action, error]);
  let hasPendingActions = () => marketplaces.some(mp => mp.pendingUpdate || mp.pendingRemove),
    getPendingCounts = () => {
      let updateCount = zn(marketplaces, mp => mp.pendingUpdate),
        removeCount = zn(marketplaces, mp => mp.pendingRemove);
      return {
        updateCount: updateCount,
        removeCount: removeCount
      };
    },
    applyChanges = async overrideMarketplaces => {
      let toApply = overrideMarketplaces || marketplaces,
        inDetailsView = viewMode === "details";
      setProcessing(!0), setErrorMessage(null), setDetailsResult(null), setUpdateProgress(null);
      try {
        let userSettings = An("userSettings"),
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
                let pluginKey = KY(plugin.name, mp.name);
                enabledPlugins[pluginKey] = !1;
              }
              ao("userSettings", {
                enabledPlugins: enabledPlugins
              });
            }
            await bft(mp.name), removedCount++, W("tengu_marketplace_removed", {
              marketplace_name: mp.name,
              plugins_uninstalled: mp.installedPlugins.length
            });
            continue;
          }
          if (mp.pendingUpdate) await sne(mp.name, progress => {
            setUpdateProgress(progress);
          }), updatedCount++, updatedNames.add(mp.name.toLowerCase()), W("tengu_marketplace_updated", {
            marketplace_name: mp.name
          });
        }
        let bumpedPluginCount = 0;
        if (updatedNames.size > 0) {
          let {
            updated: bumpedPlugins
          } = await Two(updatedNames);
          bumpedPluginCount = bumpedPlugins.length;
        }
        if (zh(), await onManageComplete(), !mountedRef.current) return;
        let installedMcp = await $m(),
          {
            enabled: enabledPlugins,
            disabled: disabledPlugins
          } = await BC();
        if (!mountedRef.current) return;
        let allPlugins = [...enabledPlugins, ...disabledPlugins],
          {
            marketplaces: loadedMarketplaces
          } = await nne(installedMcp);
        if (!mountedRef.current) return;
        let marketplaceSettings = l9(),
          rows = [];
        for (let {
          name: mpName,
          config: mpConfig,
          data: mpData
        } of loadedMarketplaces) {
          let mpInstalled = allPlugins.filter(plugin => plugin.source.endsWith(`@${mpName}`));
          rows.push({
            name: mpName,
            source: v8e(mpConfig.source),
            lastUpdated: mpConfig.lastUpdated,
            pluginCount: mpData?.plugins.length,
            installedPlugins: mpInstalled,
            pendingUpdate: !1,
            pendingRemove: !1,
            autoUpdate: Gpe(mpName, mpConfig, marketplaceSettings[mpName]?.autoUpdate)
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
          let bumpedSuffix = bumpedPluginCount > 0 ? ` (${bumpedPluginCount} ${Sn(bumpedPluginCount, "plugin")} bumped)` : "";
          summaryParts.push(`Updated ${updatedCount} ${Sn(updatedCount, "marketplace")}${bumpedSuffix}`);
        }
        if (removedCount > 0) summaryParts.push(`Removed ${removedCount} ${Sn(removedCount, "marketplace")}`);
        if (summaryParts.length > 0) {
          let summaryMessage = `${Xe.tick} ${summaryParts.join(", ")}`;
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
        let message = Ce(applyError);
        if (!mountedRef.current) return;
        setErrorMessage(message), setError(message);
      } finally {
        if (mountedRef.current) setProcessing(!1), setUpdateProgress(null);
      }
    },
    confirmRemove = async () => {
      if (!selectedMarketplace) return;
      let updatedRows = marketplaces.map(mp => mp.name === selectedMarketplace.name ? {
        ...mp,
        pendingRemove: !0
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
        secondaryLabel: mp.lastUpdated ? `(last updated ${new Date(mp.lastUpdated).toLocaleDateString()})` : void 0,
        value: "update"
      }];
      if (!RPe()) options.push({
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
        await rcl(mp.name, nextAutoUpdate), setMarketplaces(prev => prev.map(row => row.name === mp.name ? {
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
  Or("confirm:no", () => {
    pendingNavTimeoutRef.current?.(), setViewMode("list"), setDetailFocusIndex(0);
  }, {
    context: "Confirmation",
    isActive: !processing && (viewMode === "details" || viewMode === "confirm-remove")
  }), Or("confirm:no", () => {
    pendingNavTimeoutRef.current?.(), setMarketplaces(prev => prev.map(mp => ({
      ...mp,
      pendingUpdate: !1,
      pendingRemove: !1
    }))), setSelectedIndex(0);
  }, {
    context: "Confirmation",
    isActive: !processing && viewMode === "list" && hasPendingActions()
  }), Or("confirm:no", () => {
    setViewState({
      type: "menu"
    });
  }, {
    context: "Confirmation",
    isActive: !processing && viewMode === "list" && !hasPendingActions()
  }), Oo({
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
      pendingRemove: mp.pendingUpdate ? mp.pendingRemove : !1
    } : mp));else if ((event.key === "d" || event.key === "D") && marketplaceIndex >= 0) {
      let mp = marketplaces[marketplaceIndex];
      if (mp) event.preventDefault(), setSelectedMarketplace(mp), pendingNavTimeoutRef.current?.(), setViewMode("confirm-remove");
    }
  }
  Oo({
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
          pendingUpdate: !0
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
  if (loading) return Ms.jsx(v, {
    children: "Loading marketplaces…"
  });
  if (marketplaces.length === 0) return Ms.jsxs($, {
    flexDirection: "column",
    children: [Ms.jsx($, {
      marginBottom: 1,
      children: Ms.jsx(v, {
        bold: !0,
        children: "Manage marketplaces"
      })
    }), Ms.jsxs($, {
      flexDirection: "row",
      gap: 1,
      children: [Ms.jsxs(v, {
        color: "suggestion",
        children: [Xe.pointer, " +"]
      }), Ms.jsx(v, {
        bold: !0,
        color: "suggestion",
        children: "Add Marketplace"
      })]
    }), Ms.jsx($, {
      marginTop: 1,
      children: Ms.jsx(v, {
        dimColor: !0,
        italic: !0,
        children: exitState.pending ? Ms.jsxs(Ms.Fragment, {
          children: ["Press ", exitState.keyName, " again to go back"]
        }) : Ms.jsxs(bn, {
          children: [Ms.jsx(dr, {
            action: "select:accept",
            context: "Select",
            fallback: "Enter",
            description: "select"
          }), Ms.jsx(dr, {
            action: "confirm:no",
            context: "Confirmation",
            fallback: "Esc",
            description: "go back"
          })]
        })
      })
    })]
  });
  if (viewMode === "confirm-remove" && selectedMarketplace) {
    let installedCount = selectedMarketplace.installedPlugins.length;
    return Ms.jsxs($, {
      flexDirection: "column",
      tabIndex: 0,
      autoFocus: !0,
      onKeyDown: handleConfirmRemoveKeyDown,
      children: [Ms.jsxs(v, {
        bold: !0,
        color: "warning",
        children: ["Remove marketplace ", Ms.jsx(v, {
          italic: !0,
          children: selectedMarketplace.name
        }), "?"]
      }), Ms.jsxs($, {
        flexDirection: "column",
        children: [installedCount > 0 && Ms.jsx($, {
          marginTop: 1,
          children: Ms.jsxs(v, {
            color: "warning",
            children: ["This will also uninstall ", installedCount, " ", Sn(installedCount, "plugin"), " from this marketplace:"]
          })
        }), selectedMarketplace.installedPlugins.length > 0 && Ms.jsx($, {
          flexDirection: "column",
          marginTop: 1,
          marginLeft: 2,
          children: selectedMarketplace.installedPlugins.map(plugin => Ms.jsx(cS, {
            children: Ms.jsx(v, {
              dimColor: !0,
              children: plugin.name
            })
          }, plugin.name))
        }), Ms.jsx($, {
          marginTop: 1,
          children: Ms.jsxs(v, {
            children: ["Press ", Ms.jsx(v, {
              bold: !0,
              children: "y"
            }), " to confirm or ", Ms.jsx(v, {
              bold: !0,
              children: "n"
            }), " to cancel"]
          })
        })]
      })]
    });
  }
  if (viewMode === "details" && selectedMarketplace) {
    let isBusy = selectedMarketplace.pendingUpdate || processing,
      options = getDetailMenuOptions(selectedMarketplace);
    return Ms.jsxs($, {
      flexDirection: "column",
      children: [Ms.jsx(v, {
        bold: !0,
        children: selectedMarketplace.name
      }), Ms.jsx(v, {
        dimColor: !0,
        children: selectedMarketplace.source
      }), Ms.jsx($, {
        marginTop: 1,
        children: Ms.jsxs(v, {
          children: [selectedMarketplace.pluginCount || 0, " available", " ", Sn(selectedMarketplace.pluginCount || 0, "plugin")]
        })
      }), selectedMarketplace.installedPlugins.length > 0 && Ms.jsxs($, {
        flexDirection: "column",
        marginTop: 1,
        children: [Ms.jsxs(v, {
          bold: !0,
          children: ["Installed plugins (", selectedMarketplace.installedPlugins.length, "):"]
        }), Ms.jsx($, {
          flexDirection: "column",
          marginLeft: 1,
          children: selectedMarketplace.installedPlugins.map(plugin => Ms.jsxs(cS, {
            children: [plugin.name, `
`, Ms.jsx(v, {
              dimColor: !0,
              children: plugin.manifest.description
            })]
          }, plugin.name))
        })]
      }), isBusy && Ms.jsxs($, {
        marginTop: 1,
        flexDirection: "column",
        children: [Ms.jsx(v, {
          color: "claude",
          children: "Updating marketplace…"
        }), updateProgress && Ms.jsx(v, {
          dimColor: !0,
          children: updateProgress
        })]
      }), !isBusy && detailsResult && Ms.jsx($, {
        marginTop: 1,
        children: Ms.jsx(v, {
          color: "claude",
          children: detailsResult
        })
      }), !isBusy && errorMessage && Ms.jsx($, {
        marginTop: 1,
        children: Ms.jsx(Ba, {
          error: errorMessage
        })
      }), !isBusy && Ms.jsx($, {
        flexDirection: "column",
        marginTop: 1,
        children: options.map((option, optionIndex) => {
          if (!option) return null;
          return Ms.jsxs(bE, {
            isFocused: optionIndex === detailFocusIndex,
            children: [option.label, option.secondaryLabel && Ms.jsxs(v, {
              dimColor: !0,
              children: [" ", option.secondaryLabel]
            })]
          }, option.value);
        })
      }), !isBusy && !RPe() && selectedMarketplace.autoUpdate && Ms.jsx($, {
        marginTop: 1,
        children: Ms.jsx(v, {
          dimColor: !0,
          children: "Auto-update enabled. Claude Code will automatically update this marketplace and its installed plugins."
        })
      }), Ms.jsx($, {
        marginTop: 1,
        children: Ms.jsx(v, {
          dimColor: !0,
          italic: !0,
          children: isBusy ? Ms.jsx(Ms.Fragment, {
            children: "Please wait…"
          }) : Ms.jsxs(bn, {
            children: [Ms.jsx(dr, {
              action: "select:accept",
              context: "Select",
              fallback: "Enter",
              description: "select"
            }), Ms.jsx(dr, {
              action: "confirm:no",
              context: "Confirmation",
              fallback: "Esc",
              description: "go back"
            })]
          })
        })
      })]
    });
  }
  let {
    updateCount: updateCount,
    removeCount: removeCount
  } = getPendingCounts();
  return Ms.jsxs($, {
    flexDirection: "column",
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: handleListKeyDown,
    children: [Ms.jsx($, {
      marginBottom: 1,
      children: Ms.jsx(v, {
        bold: !0,
        children: "Manage marketplaces"
      })
    }), Ms.jsxs($, {
      flexDirection: "row",
      gap: 1,
      marginBottom: 1,
      children: [Ms.jsxs(v, {
        color: selectedIndex === 0 ? "suggestion" : void 0,
        children: [selectedIndex === 0 ? Xe.pointer : " ", " +"]
      }), Ms.jsx(v, {
        bold: !0,
        color: selectedIndex === 0 ? "suggestion" : void 0,
        children: "Add Marketplace"
      })]
    }), Ms.jsx($, {
      flexDirection: "column",
      children: marketplaces.map((mp, index) => {
        let isFocused = index + 1 === selectedIndex,
          badges = [];
        if (mp.pendingUpdate) badges.push("UPDATE");
        if (mp.pendingRemove) badges.push("REMOVE");
        return Ms.jsxs($, {
          flexDirection: "row",
          gap: 1,
          marginBottom: 1,
          children: [Ms.jsxs(v, {
            color: isFocused ? "suggestion" : void 0,
            children: [isFocused ? Xe.pointer : " ", " ", mp.pendingRemove ? Xe.cross : Xe.bullet]
          }), Ms.jsxs($, {
            flexDirection: "column",
            flexGrow: 1,
            children: [Ms.jsxs($, {
              flexDirection: "row",
              gap: 1,
              children: [Ms.jsxs(v, {
                bold: !0,
                strikethrough: mp.pendingRemove,
                dimColor: mp.pendingRemove,
                children: [mp.name === "claude-plugins-official" && Ms.jsx(v, {
                  color: "claude",
                  children: "✻ "
                }), mp.name, mp.name === "claude-plugins-official" && Ms.jsx(v, {
                  color: "claude",
                  children: " ✻"
                })]
              }), badges.length > 0 && Ms.jsxs(v, {
                color: "warning",
                children: ["[", badges.join(", "), "]"]
              })]
            }), Ms.jsx(v, {
              dimColor: !0,
              children: mp.source
            }), Ms.jsxs(v, {
              dimColor: !0,
              children: [mp.pluginCount !== void 0 && Ms.jsxs(Ms.Fragment, {
                children: [mp.pluginCount, " available"]
              }), mp.installedPlugins.length > 0 && Ms.jsxs(Ms.Fragment, {
                children: [" • ", mp.installedPlugins.length, " installed"]
              }), mp.lastUpdated && Ms.jsxs(Ms.Fragment, {
                children: [" ", "• Updated", " ", new Date(mp.lastUpdated).toLocaleDateString()]
              })]
            })]
          })]
        }, mp.name);
      })
    }), hasPendingActions() && Ms.jsxs($, {
      marginTop: 1,
      flexDirection: "column",
      children: [Ms.jsxs(v, {
        children: [Ms.jsx(v, {
          bold: !0,
          children: "Pending changes:"
        }), " ", Ms.jsx(v, {
          dimColor: !0,
          children: Ms.jsx(dr, {
            action: "select:accept",
            context: "Select",
            fallback: "Enter",
            description: "apply"
          })
        })]
      }), updateCount > 0 && Ms.jsxs(cS, {
        children: ["Update ", updateCount, " ", Sn(updateCount, "marketplace")]
      }), removeCount > 0 && Ms.jsxs(cS, {
        color: "warning",
        children: ["Remove ", removeCount, " ", Sn(removeCount, "marketplace")]
      })]
    }), processing && Ms.jsx($, {
      marginTop: 1,
      children: Ms.jsx(v, {
        color: "claude",
        children: "Processing changes…"
      })
    }), errorMessage && Ms.jsx($, {
      marginTop: 1,
      children: Ms.jsx(Ba, {
        error: errorMessage
      })
    }), Ms.jsx(qom, {
      exitState: exitState,
      hasPendingActions: hasPendingActions()
    })]
  });
}
/**
 * Footer hints for the ManageMarketplaces list view.
 * Uses a React-compiler memo cache to avoid re-rendering hint nodes.
 */
function qom(props) {
  let memoCache = Ubl.c(18),
    {
      exitState: exitState,
      hasPendingActions: hasPendingActions
    } = props;
  if (exitState.pending) {
    let backHint;
    if (memoCache[0] !== exitState.keyName) backHint = Ms.jsx($, {
      marginTop: 1,
      children: Ms.jsxs(v, {
        dimColor: !0,
        italic: !0,
        children: ["Press ", exitState.keyName, " again to go back"]
      })
    }), memoCache[0] = exitState.keyName, memoCache[1] = backHint;else backHint = memoCache[1];
    return backHint;
  }
  let applyHint;
  if (memoCache[2] !== hasPendingActions) applyHint = hasPendingActions && Ms.jsx(dr, {
    action: "select:accept",
    context: "Select",
    fallback: "Enter",
    description: "apply changes"
  }), memoCache[2] = hasPendingActions, memoCache[3] = applyHint;else applyHint = memoCache[3];
  let selectHint;
  if (memoCache[4] !== hasPendingActions) selectHint = !hasPendingActions && Ms.jsx(dr, {
    action: "select:accept",
    context: "Select",
    fallback: "Enter",
    description: "select"
  }), memoCache[4] = hasPendingActions, memoCache[5] = selectHint;else selectHint = memoCache[5];
  let updateChordHint;
  if (memoCache[6] !== hasPendingActions) updateChordHint = !hasPendingActions && Ms.jsx(at, {
    chord: "u",
    action: "update"
  }), memoCache[6] = hasPendingActions, memoCache[7] = updateChordHint;else updateChordHint = memoCache[7];
  let removeChordHint;
  if (memoCache[8] !== hasPendingActions) removeChordHint = !hasPendingActions && Ms.jsx(at, {
    chord: "d",
    action: "remove"
  }), memoCache[8] = hasPendingActions, memoCache[9] = removeChordHint;else removeChordHint = memoCache[9];
  let backDescription = hasPendingActions ? "cancel" : "go back",
    backHint;
  if (memoCache[10] !== backDescription) backHint = Ms.jsx(dr, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: backDescription
  }), memoCache[10] = backDescription, memoCache[11] = backHint;else backHint = memoCache[11];
  let footer;
  if (memoCache[12] !== applyHint || memoCache[13] !== selectHint || memoCache[14] !== updateChordHint || memoCache[15] !== removeChordHint || memoCache[16] !== backHint) footer = Ms.jsx($, {
    marginTop: 1,
    children: Ms.jsx(v, {
      dimColor: !0,
      italic: !0,
      children: Ms.jsxs(bn, {
        children: [applyHint, selectHint, updateChordHint, removeChordHint, backHint]
      })
    })
  }), memoCache[12] = applyHint, memoCache[13] = selectHint, memoCache[14] = updateChordHint, memoCache[15] = removeChordHint, memoCache[16] = backHint, memoCache[17] = footer;else footer = memoCache[17];
  return footer;
}
var Ubl, vL, Ms;
var qbl = b(() => {
  Zs();
  kt();
  uc();
  Rj();
  Is();
  I_();
  Wo();
  Pie();
  je();
  ss();
  tr();
  Ct();
  c6();
  dTe();
  dS();
  K7n();
  Eg();
  bk();
  br();
  lr();
  Ubl = x(tt(), 1), vL = x(et(), 1), Ms = x(oe(), 1);
});
export {$bl,qom,Ubl,vL,Ms,qbl};
