// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {_t,uo} from "../../vendor/m2468.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {openInChrome as NOt,CLAUDE_IN_CHROME_MCP_SERVER_NAME as ED,bO} from "../mcp/2592_trackClaudeInChromeTabId.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {isChromeExtensionInstalled as Tue,kTe} from "../permissions/4676_shouldSuppressChromeOffer.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {lMl,uMl} from "../tui/5026_chromeClient.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {Sx,fne} from "../../vendor/m4618.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {isClaudeAISubscriber as Eo,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {Ne} from "../../vendor/m583.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "../config/0137_namespace.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var pMl = {};
ft(pMl, {
  call: () => call
});
/**
 * Claude in Chrome settings dialog (React component).
 *
 * Renders the "Claude in Chrome (beta)" panel: connection status, extension
 * status, paired browser name, and a menu of actions (install extension,
 * reconnect, manage permissions, toggle default-enabled, select browser).
 *
 * Uses the React compiler memo cache (`dMl.c(47)` -> `memoCache`).
 */
function iym(props) {
  let memoCache = dMl.c(47),
    {
      onDone,
      isExtensionInstalled,
      configEnabled,
      isClaudeAISubscriber,
      isWSL
    } = props,
    mcpClients = _t(pym),
    [menuKey, setMenuKey] = Lgt.useState(0),
    [defaultEnabled, setDefaultEnabled] = Lgt.useState(configEnabled ?? !1),
    [showReconnectHint, setShowReconnectHint] = Lgt.useState(!1),
    [extensionInstalled, setExtensionInstalled] = Lgt.useState(isExtensionInstalled),
    [view, setView] = Lgt.useState("menu"),
    fullscreenWithTTY;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) fullscreenWithTTY = !1, memoCache[0] = fullscreenWithTTY;else fullscreenWithTTY = memoCache[0];
  let isFullscreen = fullscreenWithTTY,
    foundClient;
  if (memoCache[1] !== mcpClients) foundClient = mcpClients.find(dym), memoCache[1] = mcpClients, memoCache[2] = foundClient;else foundClient = memoCache[2];
  let chromeClient = foundClient,
    isConnected = chromeClient !== void 0,
    pairedName;
  if (memoCache[3] === Symbol.for("react.memo_cache_sentinel")) pairedName = Ot().chromeExtension?.pairedDeviceName, memoCache[3] = pairedName;else pairedName = memoCache[3];
  let pairedDeviceName = pairedName,
    openUrlFn;
  if (memoCache[4] === Symbol.for("react.memo_cache_sentinel")) openUrlFn = function (url) {
    if (isFullscreen) Zl(url);else NOt(url).catch(Ie);
  }, memoCache[4] = openUrlFn;else openUrlFn = memoCache[4];
  let openUrl = openUrlFn,
    handleSelectFn;
  if (memoCache[5] !== defaultEnabled) handleSelectFn = function (action) {
    e: switch (action) {
      case "install-extension":
        {
          setMenuKey(uym), setShowReconnectHint(!0), openUrl(rym);
          break e;
        }
      case "reconnect":
        {
          setMenuKey(cym), Tue().then(installed => {
            if (setExtensionInstalled(installed), installed) setShowReconnectHint(!1);
          }).catch(Ie), openUrl(sym);
          break e;
        }
      case "manage-permissions":
        {
          setMenuKey(lym), openUrl(oym);
          break e;
        }
      case "toggle-default":
        {
          let next = !defaultEnabled;
          hn(prev => ({
            ...prev,
            claudeInChromeDefaultEnabled: next
          })), setDefaultEnabled(next);
          break e;
        }
      case "select-browser":
        setView("select-browser");
    }
  }, memoCache[5] = defaultEnabled, memoCache[6] = handleSelectFn;else handleSelectFn = memoCache[6];
  let handleSelect = handleSelectFn,
    menuOptions;
  if (memoCache[7] !== defaultEnabled || memoCache[8] !== isConnected || memoCache[9] !== extensionInstalled) {
    menuOptions = [];
    let requiresExtensionSuffix = extensionInstalled ? "" : " (requires extension)";
    if (!extensionInstalled && !isFullscreen) {
      let installOption;
      if (memoCache[11] === Symbol.for("react.memo_cache_sentinel")) installOption = {
        label: "Install Chrome extension",
        value: "install-extension"
      }, memoCache[11] = installOption;else installOption = memoCache[11];
      menuOptions.push(installOption);
    }
    if (isConnected) {
      let selectBrowserOption;
      if (memoCache[12] === Symbol.for("react.memo_cache_sentinel")) selectBrowserOption = {
        label: "Select browser…",
        value: "select-browser"
      }, memoCache[12] = selectBrowserOption;else selectBrowserOption = memoCache[12];
      menuOptions.push(selectBrowserOption);
    }
    let managePermissionsLabel;
    if (memoCache[13] === Symbol.for("react.memo_cache_sentinel")) managePermissionsLabel = $f.jsx(v, {
      children: "Manage permissions"
    }), memoCache[13] = managePermissionsLabel;else managePermissionsLabel = memoCache[13];
    let managePermissionsOption;
    if (memoCache[14] !== requiresExtensionSuffix) managePermissionsOption = {
      label: $f.jsxs($f.Fragment, {
        children: [managePermissionsLabel, $f.jsx(v, {
          dimColor: !0,
          children: requiresExtensionSuffix
        })]
      }),
      value: "manage-permissions"
    }, memoCache[14] = requiresExtensionSuffix, memoCache[15] = managePermissionsOption;else managePermissionsOption = memoCache[15];
    let reconnectLabel;
    if (memoCache[16] === Symbol.for("react.memo_cache_sentinel")) reconnectLabel = $f.jsx(v, {
      children: "Reconnect extension"
    }), memoCache[16] = reconnectLabel;else reconnectLabel = memoCache[16];
    let reconnectOption;
    if (memoCache[17] !== requiresExtensionSuffix) reconnectOption = {
      label: $f.jsxs($f.Fragment, {
        children: [reconnectLabel, $f.jsx(v, {
          dimColor: !0,
          children: requiresExtensionSuffix
        })]
      }),
      value: "reconnect"
    }, memoCache[17] = requiresExtensionSuffix, memoCache[18] = reconnectOption;else reconnectOption = memoCache[18];
    let defaultEnabledLabel = `Enabled by default: ${defaultEnabled ? "Yes" : "No"}`,
      toggleDefaultOption;
    if (memoCache[19] !== defaultEnabledLabel) toggleDefaultOption = {
      label: defaultEnabledLabel,
      value: "toggle-default"
    }, memoCache[19] = defaultEnabledLabel, memoCache[20] = toggleDefaultOption;else toggleDefaultOption = memoCache[20];
    menuOptions.push(managePermissionsOption, reconnectOption, toggleDefaultOption), memoCache[7] = defaultEnabled, memoCache[8] = isConnected, memoCache[9] = extensionInstalled, memoCache[10] = menuOptions;
  } else menuOptions = memoCache[10];
  let unsupported = isWSL || !isClaudeAISubscriber,
    handleCancelFn;
  if (memoCache[21] !== onDone) handleCancelFn = () => onDone(), memoCache[21] = onDone, memoCache[22] = handleCancelFn;else handleCancelFn = memoCache[22];
  let introText;
  if (memoCache[23] === Symbol.for("react.memo_cache_sentinel")) introText = $f.jsx(v, {
    children: "Claude in Chrome works with the Chrome extension to let you control your browser directly from Claude Code. Navigate websites, fill forms, capture screenshots, record GIFs, and debug with console logs and network requests."
  }), memoCache[23] = introText;else introText = memoCache[23];
  let wslWarning;
  if (memoCache[24] !== isWSL) wslWarning = isWSL && $f.jsx(v, {
    color: "error",
    children: "Claude in Chrome is not supported in WSL at this time."
  }), memoCache[24] = isWSL, memoCache[25] = wslWarning;else wslWarning = memoCache[25];
  let subscriberWarning;
  if (memoCache[26] !== isClaudeAISubscriber) subscriberWarning = !isClaudeAISubscriber && $f.jsx(v, {
    color: "error",
    children: "Claude in Chrome requires a claude.ai subscription."
  }), memoCache[26] = isClaudeAISubscriber, memoCache[27] = subscriberWarning;else subscriberWarning = memoCache[27];
  let body;
  if (memoCache[28] !== chromeClient || memoCache[29] !== handleSelect || memoCache[30] !== isConnected || memoCache[31] !== unsupported || memoCache[32] !== extensionInstalled || memoCache[33] !== onDone || memoCache[34] !== menuOptions || memoCache[35] !== menuKey || memoCache[36] !== showReconnectHint || memoCache[37] !== view) body = !unsupported && $f.jsxs($f.Fragment, {
    children: [!isFullscreen && $f.jsxs($, {
      flexDirection: "column",
      children: [$f.jsxs(v, {
        children: ["Status:", " ", isConnected ? $f.jsx(v, {
          color: "success",
          children: "Enabled"
        }) : $f.jsx(v, {
          color: "inactive",
          children: "Disabled"
        })]
      }), $f.jsxs(v, {
        children: ["Extension:", " ", extensionInstalled ? $f.jsx(v, {
          color: "success",
          children: "Installed"
        }) : $f.jsx(v, {
          color: "warning",
          children: "Not detected"
        })]
      }), isConnected && pairedDeviceName ? $f.jsxs(v, {
        children: ["Browser: ", $f.jsx(v, {
          color: "success",
          children: pairedDeviceName
        })]
      }) : null]
    }), view === "select-browser" && chromeClient ? $f.jsx(lMl, {
      chromeClient: chromeClient,
      onDone: selected => {
        if (setView("menu"), setMenuKey(aym), selected) onDone(selected);
      }
    }) : $f.jsx(hr, {
      options: menuOptions,
      onChange: handleSelect,
      hideIndexes: !0
    }, menuKey), showReconnectHint && $f.jsxs(v, {
      color: "warning",
      children: ["Once installed, select ", '"Reconnect extension"', " to connect."]
    }), $f.jsxs(v, {
      children: [$f.jsx(v, {
        dimColor: !0,
        children: "Usage: "
      }), $f.jsx(v, {
        children: "claude --chrome"
      }), $f.jsx(v, {
        dimColor: !0,
        children: " or "
      }), $f.jsx(v, {
        children: "claude --no-chrome"
      })]
    }), $f.jsx(v, {
      dimColor: !0,
      children: "Site-level permissions are inherited from the Chrome extension. Manage permissions in the Chrome extension settings to control which sites Claude can browse, click, and type on."
    })]
  }), memoCache[28] = chromeClient, memoCache[29] = handleSelect, memoCache[30] = isConnected, memoCache[31] = unsupported, memoCache[32] = extensionInstalled, memoCache[33] = onDone, memoCache[34] = menuOptions, memoCache[35] = menuKey, memoCache[36] = showReconnectHint, memoCache[37] = view, memoCache[38] = body;else body = memoCache[38];
  let docsLink;
  if (memoCache[39] === Symbol.for("react.memo_cache_sentinel")) docsLink = $f.jsx(Sx, {
    url: "https://code.claude.com/docs/en/chrome"
  }), memoCache[39] = docsLink;else docsLink = memoCache[39];
  let content;
  if (memoCache[40] !== body || memoCache[41] !== wslWarning || memoCache[42] !== subscriberWarning) content = $f.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [introText, wslWarning, subscriberWarning, body, docsLink]
  }), memoCache[40] = body, memoCache[41] = wslWarning, memoCache[42] = subscriberWarning, memoCache[43] = content;else content = memoCache[43];
  let dialog;
  if (memoCache[44] !== content || memoCache[45] !== handleCancelFn) dialog = $f.jsx(Jn, {
    title: "Claude in Chrome (beta)",
    onCancel: handleCancelFn,
    color: "chromeYellow",
    children: content
  }), memoCache[44] = content, memoCache[45] = handleCancelFn, memoCache[46] = dialog;else dialog = memoCache[46];
  return dialog;
}
/** Menu-key bumper used after returning from the select-browser view. */
function aym(key) {
  return key + 1;
}
/** Menu-key bumper used when navigating to manage-permissions. */
function lym(key) {
  return key + 1;
}
/** Menu-key bumper used when triggering a reconnect. */
function cym(key) {
  return key + 1;
}
/** Menu-key bumper used when triggering install-extension. */
function uym(key) {
  return key + 1;
}
/** Predicate: matches the connected Claude-in-Chrome MCP client. */
function dym(client) {
  return client.name === ED && client.type === "connected";
}
/** Selector: extracts the MCP clients list from store state. */
function pym(state) {
  return state.mcp.clients;
}
var dMl,
  Lgt,
  $f,
  rym = "https://claude.ai/chrome",
  oym = "https://clau.de/chrome/permissions",
  sym = "https://clau.de/chrome/reconnect",
  /**
   * Entry point: detects the Chrome extension, reads global config / subscriber
   * status / WSL environment, then renders the settings dialog.
   */
  call = async function (onDone) {
    let extensionInstalled = await Tue().catch(err => (A(`[Claude in Chrome] Extension detection failed: ${err instanceof Error ? err.message : String(err)}`, {
        level: "error"
      }), !1)),
      config = Ot(),
      isSubscriber = Eo(),
      isWSL = Ne.isWslEnvironment();
    return $f.jsx(iym, {
      onDone: onDone,
      isExtensionInstalled: extensionInstalled,
      configEnabled: config.claudeInChromeDefaultEnabled,
      isClaudeAISubscriber: isSubscriber,
      isWSL: isWSL
    });
  };
var mMl = b(() => {
  Ol();
  di();
  fne();
  je();
  uo();
  lo();
  Jg();
  bO();
  kTe();
  tr();
  qe();
  Ir();
  dn();
  vn();
  uMl();
  dMl = x(tt(), 1), Lgt = x(et(), 1), $f = x(oe(), 1);
});
export {pMl,iym,aym,lym,cym,uym,dym,pym,dMl,Lgt,$f,rym,oym,sym,call as mym,mMl};
