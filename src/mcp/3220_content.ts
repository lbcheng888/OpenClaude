// @ts-nocheck
import {oit as Brt,AQr as K7r,PDn as sHn,Zla as Pea} from "../../vendor/m3216.ts";
import {ica as Uea,nca as Mea,RQr as z7r} from "../../vendor/m3218.ts";
import {ODn as iHn,tca as Lea} from "../../vendor/m3217.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function makeErrorResult(e, t) {
  return {
    content: [{
      type: "text",
      text: e
    }],
    isError: true,
    telemetry: t ? {
      error_kind: t
    } : undefined
  };
}
function makeErrorResult_2(text) {
  return {
    content: [{
      type: "text",
      text: text
    }]
  };
}
function makeTextResult(text, t) {
  return {
    content: [{
      type: "text",
      text: JSON.stringify(text)
    }],
    telemetry: t
  };
}
function makeJsonResult(value) {
  if (typeof value === "object" && value !== null) return value;
  return {};
}
function getStringArg(value, t) {
  let n = value[t];
  if (typeof n !== "string") return Error(`"${t}" must be a string.`);
  return n;
}
function getStringArg_2(args, key = "coordinate") {
  let value = args[key];
  if (value === undefined) return Error(`${key} is required`);
  if (!Array.isArray(value) || value.length !== 2) return Error(`${key} must be an array of length 2`);
  let [r, o] = value;
  if (typeof r !== "number" || typeof o !== "number" || r < 0 || o < 0) return Error(`${key} must be a tuple of non-negative numbers`);
  return [r, o];
}
function getCoordinateArg(args, t, n, r, o, s) {
  if (n === "normalized_0_100") return {
    x: Math.round(args / 100 * r.width) + r.originX,
    y: Math.round(t / 100 * r.height) + r.originY
  };
  if (o) return {
    x: Math.round(args * (o.displayWidth / o.width)) + o.originX,
    y: Math.round(t * (o.displayHeight / o.height)) + o.originY
  };
  return s.warn("[computer-use] pixels-mode coordinate received with no prior screenshot; falling back to /scaleFactor. Click may be off if downsample is active."), {
    x: Math.round(args / r.scaleFactor) + r.originX,
    y: Math.round(t / r.scaleFactor) + r.originY
  };
}
function toLogicalPoint(x, y, coordinateMode, display) {
  if (coordinateMode === "normalized_0_100") return {
    xPct: x,
    yPct: y
  };
  if (!display) return {
    xPct: 0,
    yPct: 0
  };
  return {
    xPct: x / display.width * 100,
    yPct: y / display.height * 100
  };
}
function toScreenshotPercent(x, y) {
  let n = x ?? "full";
  if (y === "mouse_position") return true;
  if (y === "keyboard" || y === "mouse_full") return n === "full";
  return n === "click" || n === "full";
}
async function tierPermitsInteraction(tier, kind, n) {
  let r = kind.getClipboardStash?.();
  if (!n) {
    if (r === undefined) return;
    try {
      await tier.executor.writeClipboard(r), kind.onClipboardStashChanged?.(undefined);
    } catch {}
    return;
  }
  if (r === undefined) try {
    let o = await tier.executor.readClipboard();
    kind.onClipboardStashChanged?.(o);
  } catch {
    kind.onClipboardStashChanged?.("");
  }
  try {
    await tier.executor.writeClipboard("");
  } catch {}
}
async function applyClipboardGuard(serverCtx, session, isClickTier, r) {
  if (isClickTier.hideBeforeAction) {
    let l = await serverCtx.executor.prepareForAction(session.allowedApps.map(c => c.bundleId), session.selectedDisplayId);
    if (l.length > 0) session.onAppsHidden?.(l);
  }
  let o = await serverCtx.executor.getFrontmostApp(),
    s = new Map(session.allowedApps.map(l => [l.bundleId, l.tier])),
    i = o ? s.get(o.bundleId) : undefined;
  if (isClickTier.clipboardGuard) await tierPermitsInteraction(serverCtx, session, i === "click");
  if (!o) return null;
  let {
    hostBundleId: a
  } = serverCtx.executor.capabilities;
  if (i !== undefined) {
    if (toScreenshotPercent(i, r)) return null;
    if (i === "read") {
      let l = Brt(o.bundleId, o.displayName) === "browser";
      return makeErrorResult(`"${o.displayName}" is granted at tier "read" \u2014 ` + "visible in screenshots only, no clicks or typing." + (l ? " Use the Claude-in-Chrome MCP for browser interaction (tools named `mcp__Claude_in_Chrome__*`; load via ToolSearch if deferred)." : " No interaction is permitted; ask the user to take any actions in this app themselves.") + RESTRICTION_NOTE, "tier_insufficient");
    }
    if (r === "keyboard") return makeErrorResult(`"${o.displayName}" is granted at tier "click" \u2014 ` + `typing, key presses, and paste require tier "full". The keys would go to this app's text fields or integrated terminal. To type into a different app, click it first to bring it forward. For shell commands, use the Bash tool.` + RESTRICTION_NOTE, "tier_insufficient");
    return makeErrorResult(`"${o.displayName}" is granted at tier "click" \u2014 ` + 'right-click, middle-click, and clicks with modifier keys require tier "full". Right-click opens a context menu with Paste/Cut, and modifier chords fire as keystrokes before the click. Plain left_click is allowed here.' + RESTRICTION_NOTE, "tier_insufficient");
  }
  if (o.bundleId === FINDER_BUNDLE_ID) return null;
  if (o.bundleId === a) {
    if (r !== "keyboard") return null;
    return makeErrorResult("Claude's own window still has keyboard focus. This should not happen after the pre-action defocus. Click on the target application first.", "state_conflict");
  }
  return makeErrorResult(`"${o.displayName}" is not in the allowed applications and is ` + "currently in front. Take a new screenshot \u2014 it may have appeared " + "since your last one.", "app_not_granted");
}
async function checkPointAppGate(serverCtx, session, subGates, kind, o, s) {
  let i = await serverCtx.executor.appUnderPoint(kind, o);
  if (!i) return null;
  if (i.bundleId === FINDER_BUNDLE_ID) return null;
  let a = new Map(session.allowedApps.map(u => [u.bundleId, u.tier]));
  if (!a.has(i.bundleId)) return makeErrorResult(`Click at these coordinates would land on "${i.displayName}", which is not in the allowed applications. Take a fresh screenshot to see the current window layout.`, "app_not_granted");
  let l = a.get(i.bundleId);
  if (subGates.clipboardGuard && l === "click") await tierPermitsInteraction(serverCtx, session, true);
  if (toScreenshotPercent(l, s)) return null;
  if (s === "mouse_full" && l === "click") return makeErrorResult(`Click at these coordinates would land on "${i.displayName}", ` + 'which is granted at tier "click" \u2014 right-click, middle-click, and ' + 'clicks with modifier keys require tier "full" (they can Paste via the context menu or fire modifier-chord keystrokes). Plain left_click is allowed here.' + RESTRICTION_NOTE, "tier_insufficient");
  let c = Brt(i.bundleId, i.displayName) === "browser";
  return makeErrorResult(`Click at these coordinates would land on "${i.displayName}", which is granted at tier "read" (screenshots only, no interaction). ` + (c ? "Use the Claude-in-Chrome MCP for browser interaction." : "Ask the user to take any actions in this app themselves.") + RESTRICTION_NOTE, "tier_insufficient");
}
function checkPointAppGate_2(serverCtx) {
  let t = serverCtx.endsWith("==") ? 2 : serverCtx.endsWith("=") ? 1 : 0;
  return Math.floor(serverCtx.length * 3 / 4) - t;
}
async function base64DecodedSize(base64, t, n, r) {
  let o = await base64.screenshot({
    allowedBundleIds: t,
    displayId: r
  });
  if (checkPointAppGate_2(o.base64) < MIN_SCREENSHOT_BYTES) n.warn(`[computer-use] screenshot implausibly small (${checkPointAppGate_2(o.base64)} bytes decoded), retrying once`), o = await base64.screenshot({
    allowedBundleIds: t,
    displayId: r
  });
  return o;
}
function captureScreenshotWithRetry(executor) {
  try {
    let t = Intl.Segmenter;
    if (typeof t === "function") {
      let n = new t(undefined, {
        granularity: "grapheme"
      });
      return Array.from(n.segment(executor), r => r.segment);
    }
  } catch {}
  return Array.from(executor);
}
function toGraphemes(text) {
  return new Promise(t => setTimeout(t, text));
}
function delay(ms) {
  return ms.split("+").map(t => t.trim()).filter(Boolean);
}
function parseKeyChord() {
  isMouseButtonHeld = false, mouseMovedWhileHeld = false;
}
async function Oc8(e) {
  if (!isMouseButtonHeld) return;
  await e.executor.mouseUp(), isMouseButtonHeld = false, mouseMovedWhileHeld = false;
}
function releaseHeldMouse(serverCtx) {
  return serverCtx === "request_access" || serverCtx === "list_granted_applications";
}
function Tc8(toolName) {
  return BUNDLE_ID_REGEX.test(toolName) && !toolName.includes(" ");
}
function looksLikeBundleId(name, t, n) {
  let r = new Map(),
    o = new Map();
  for (let s of t) o.set(s.bundleId, s), r.set(s.displayName.toLowerCase(), s);
  return name.map(s => {
    let i;
    if (Tc8(s)) i = o.get(s);
    if (!i) i = r.get(s.toLowerCase());
    let a = i?.bundleId,
      l = a ?? (Tc8(s) ? s : undefined);
    return {
      requestedName: s,
      resolved: i,
      isSentinel: a ? Uea.has(a) : false,
      alreadyGranted: a ? n.has(a) : false,
      proposedTier: K7r(l, i?.displayName ?? s)
    };
  });
}
async function resolveRequestedApps(requestedNames, installedApps, grantedBundleIds, r) {
  if (!grantedBundleIds.onPermissionRequest) return makeErrorResult("This session was not wired with a permission handler. Computer control is not available here.", "feature_unavailable");
  if (grantedBundleIds.getTeachModeActive?.()) return makeErrorResult("Cannot request additional permissions during teach mode \u2014 the permission dialog would be hidden. End teach mode (finish the tour or let the turn complete), then call request_access, then start a new tour.", "teach_mode_conflict");
  let o = getStringArg(installedApps, "reason");
  if (o instanceof Error) return makeErrorResult(o.message, "bad_args");
  if (r) {
    let S = {
      requestId: hN_.randomUUID(),
      reason: o,
      apps: [],
      requestedFlags: {},
      screenshotFiltering: requestedNames.executor.capabilities.screenshotFiltering,
      tccState: r
    };
    await grantedBundleIds.onPermissionRequest(S);
    let C = await requestedNames.ensureOsPermissions();
    if (C.granted) return makeErrorResult("macOS Accessibility and Screen Recording are now both granted. " + "Call request_access again immediately \u2014 the next call will show " + "the app selection list.");
    let R = [];
    if (!C.accessibility) R.push("Accessibility");
    if (!C.screenRecording) R.push("Screen Recording");
    return makeErrorResult(`macOS ${R.join(" and ")} permission(s) not yet granted. The permission panel has been shown. Once the user grants the missing permission(s), call request_access again.`, "tcc_not_granted");
  }
  let s = installedApps.apps;
  if (!Array.isArray(s) || !s.every(S => typeof S === "string")) return makeErrorResult('"apps" must be an array of strings.', "bad_args");
  let i = s,
    a = {};
  if (typeof installedApps.clipboardRead === "boolean") a.clipboardRead = installedApps.clipboardRead;
  if (typeof installedApps.clipboardWrite === "boolean") a.clipboardWrite = installedApps.clipboardWrite;
  if (typeof installedApps.systemKeyCombos === "boolean") a.systemKeyCombos = installedApps.systemKeyCombos;
  let {
      needDialog: l,
      skipDialogGrants: c,
      willHide: u,
      tieredApps: d,
      userDenied: p,
      policyDenied: m
    } = await buildWindowLocations(requestedNames, i, grantedBundleIds.allowedApps, new Set(grantedBundleIds.userDeniedBundleIds), grantedBundleIds.selectedDisplayId),
    f = [],
    A = [],
    h = grantedBundleIds.grantFlags;
  if (l.length > 0 || Object.keys(a).length > 0) {
    let S = {
        requestId: hN_.randomUUID(),
        reason: o,
        apps: l,
        requestedFlags: a,
        screenshotFiltering: requestedNames.executor.capabilities.screenshotFiltering,
        ...(u.length > 0 && {
          willHide: u,
          autoUnhideEnabled: requestedNames.getAutoUnhideEnabled()
        })
      },
      C = await grantedBundleIds.onPermissionRequest(S);
    f = C.granted, A = C.denied, h = C.flags;
  }
  let g = [...c, ...f],
    _ = new Set(g.map(S => S.bundleId)),
    y = d.filter(S => _.has(S.bundleId)),
    T = [];
  try {
    T = await handleRequestAccess(requestedNames, g);
  } catch (S) {
    requestedNames.logger.warn(`[computer-use] buildWindowLocations failed: ${String(S)}`);
  }
  return makeTextResult({
    granted: g,
    denied: A,
    ...(m.length > 0 && {
      policyDenied: {
        apps: m,
        guidance: formatUserDeniedGuidance(m)
      }
    }),
    ...(p.length > 0 && {
      userDenied: {
        apps: p,
        guidance: formatTierGuidance(p)
      }
    }),
    ...(y.length > 0 && {
      tierGuidance: planAppAccess(y)
    }),
    screenshotFiltering: requestedNames.executor.capabilities.screenshotFiltering,
    ...(T.length > 0 ? {
      windowLocations: T
    } : {})
  }, {
    granted_count: f.length,
    denied_count: A.length,
    ...formatPolicyDeniedGuidance(y)
  });
}
async function handleRequestAccess(serverCtx, args) {
  if (args.length === 0) return [];
  let n = await serverCtx.executor.listDisplays();
  if (n.length <= 1) return [];
  let r = args.map(l => l.bundleId),
    o = await serverCtx.executor.findWindowDisplays(r),
    s = new Map(n.map(l => [l.displayId, l])),
    i = new Map(o.map(l => [l.bundleId, l.displayIds])),
    a = [];
  for (let l of args) {
    let c = i.get(l.bundleId);
    if (!c || c.length === 0) continue;
    a.push({
      bundleId: l.bundleId,
      displayName: l.displayName,
      displays: c.map(u => {
        let d = s.get(u);
        return {
          id: u,
          label: d?.label,
          isPrimary: d?.isPrimary
        };
      })
    });
  }
  return a;
}
async function buildWindowLocations(serverCtx, grantedApps, n, r, o) {
  let s = new Set(n.map(y => y.bundleId)),
    i = await serverCtx.executor.listInstalledApps(),
    a = looksLikeBundleId(grantedApps, i, s),
    l = [],
    c = [];
  for (let y of a) {
    let T = y.resolved?.displayName ?? y.requestedName;
    if (sHn(y.resolved?.bundleId, T)) l.push({
      requestedName: y.requestedName,
      displayName: T
    });else c.push(y);
  }
  let u = [],
    d = [];
  for (let y of c) if (y.resolved && r.has(y.resolved.bundleId)) u.push({
    requestedName: y.requestedName,
    displayName: y.resolved.displayName
  });else d.push(y);
  let p = [];
  for (let y of d) {
    if (y.proposedTier === "full" || !y.resolved) continue;
    p.push({
      bundleId: y.resolved.bundleId,
      displayName: y.resolved.displayName,
      tier: y.proposedTier
    });
  }
  let m = d.filter(y => y.alreadyGranted),
    f = d.filter(y => !y.alreadyGranted);
  for (let y of f) {
    if (!y.resolved) continue;
    try {
      y.resolved.iconDataUrl = await serverCtx.executor.getAppIcon(y.resolved.path);
    } catch {}
  }
  let A = Date.now(),
    h = m.filter(y => y.resolved).map(y => n.find(S => S.bundleId === y.resolved.bundleId) ?? {
      bundleId: y.resolved.bundleId,
      displayName: y.resolved.displayName,
      grantedAt: A,
      tier: y.proposedTier
    }),
    g = [...n.map(y => y.bundleId), ...d.filter(y => y.resolved).map(y => y.resolved.bundleId)],
    _ = await serverCtx.executor.previewHideSet(g, o);
  return {
    needDialog: f,
    skipDialogGrants: h,
    willHide: _,
    tieredApps: p,
    userDenied: u,
    policyDenied: l
  };
}
function planAppAccess(serverCtx) {
  let t = serverCtx.filter(s => s.tier === "read" && Brt(s.bundleId, s.displayName) === "browser"),
    n = serverCtx.filter(s => s.tier === "read" && Brt(s.bundleId, s.displayName) !== "browser"),
    r = serverCtx.filter(s => s.tier === "click"),
    o = [];
  if (t.length > 0) {
    let s = t.map(i => `"${i.displayName}"`).join(", ");
    o.push(`${s} ${t.length === 1 ? "is a browser" : "are browsers"} \u2014 ` + `granted at tier "read" (visible in screenshots only; no clicks or typing). You can read what's on screen but cannot navigate, click, or type into ${t.length === 1 ? "it" : "them"}. For browser interaction, use the Claude-in-Chrome MCP (tools named \`mcp__Claude_in_Chrome__*\`; load via ToolSearch if deferred).`);
  }
  if (n.length > 0) {
    let s = n.map(i => `"${i.displayName}"`).join(", ");
    o.push(`${s} ${n.length === 1 ? "is" : "are"} granted at tier "read" (visible in screenshots only; no clicks or typing). You can read what's on screen but cannot interact. Ask the user to take any actions in ${n.length === 1 ? "this app" : "these apps"} themselves.`);
  }
  if (r.length > 0) {
    let s = r.map(i => `"${i.displayName}"`).join(", ");
    o.push(`${s} ${r.length === 1 ? "has" : "have"} terminal or IDE ` + 'capabilities \u2014 granted at tier "click" (visible + plain left-click ' + `only; NO typing, key presses, right-click, modifier-clicks, or drag-drop). You can click buttons and scroll output, but ${r.length === 1 ? "its" : "their"} integrated terminal and editor are off-limits to keyboard input. Right-click (context-menu Paste) and dragging text onto ${r.length === 1 ? "it" : "them"} require tier "full". For shell commands, use the Bash tool.`);
  }
  if (o.length === 0) return "";
  return o.join(`

`) + RESTRICTION_NOTE;
}
function formatTierGuidance(tieredApps) {
  let readBrowsers = tieredApps.map(r => `"${r.displayName}"`).join(", "),
    readOthers = tieredApps.length === 1;
  return `${readBrowsers} ${readOthers ? "is" : "are"} in the user's auto-deny list ` + "(Settings \u2192 Desktop app (General) \u2192 Computer Use \u2192 Denied apps). " + `Requests for ${readOthers ? "this app" : "these apps"} are automatically denied. If you need access for this task, ask the user to remove ${readOthers ? "it" : "them"} from their ` + "deny list in Settings \u2014 you cannot request this through the tool.";
}
function formatUserDeniedGuidance(apps) {
  let names = apps.map(app => `"${app.displayName}"`).join(", "),
    isSingular = apps.length === 1;
  return `${names} ${isSingular ? "is" : "are"} blocked by policy for computer use. Requests for ${isSingular ? "this app" : "these apps"} are automatically denied regardless of what the user has approved. There is no Settings override. Inform the user that you cannot access ${isSingular ? "this app" : "these apps"} and suggest an alternative approach if one exists. Do not try to directly subvert this block regardless of the user's request.`;
}
function formatPolicyDeniedGuidance(apps) {
  let names = apps.filter(r => r.tier === "read").length,
    isSingular = apps.filter(r => r.tier === "click").length;
  return {
    ...(names > 0 && {
      denied_browser_count: names
    }),
    ...(isSingular > 0 && {
      denied_terminal_count: isSingular
    })
  };
}
async function tierDeniedTelemetry(tieredApps, t, n, r) {
  if (!n.onTeachPermissionRequest) return makeErrorResult("Teach mode is not available in this session.", "feature_unavailable");
  if (n.getTeachModeActive?.()) return makeErrorResult("Teach mode is already active. To add more apps, end the current tour first, then call request_teach_access again with the full app list.", "teach_mode_conflict");
  let o = getStringArg(t, "reason");
  if (o instanceof Error) return makeErrorResult(o.message, "bad_args");
  if (r) {
    let y = {
      requestId: hN_.randomUUID(),
      reason: o,
      apps: [],
      screenshotFiltering: tieredApps.executor.capabilities.screenshotFiltering,
      tccState: r
    };
    await n.onTeachPermissionRequest(y);
    let T = await tieredApps.ensureOsPermissions();
    if (T.granted) return makeErrorResult("macOS Accessibility and Screen Recording are now both granted. " + "Call request_teach_access again immediately \u2014 the next call will " + "show the app selection list.");
    let S = [];
    if (!T.accessibility) S.push("Accessibility");
    if (!T.screenRecording) S.push("Screen Recording");
    return makeErrorResult(`macOS ${S.join(" and ")} permission(s) not yet granted. The permission panel has been shown. Once the user grants the missing permission(s), call request_teach_access again.`, "tcc_not_granted");
  }
  let s = t.apps;
  if (!Array.isArray(s) || !s.every(y => typeof y === "string")) return makeErrorResult('"apps" must be an array of strings.', "bad_args");
  let i = s,
    {
      needDialog: a,
      skipDialogGrants: l,
      willHide: c,
      tieredApps: u,
      userDenied: d,
      policyDenied: p
    } = await buildWindowLocations(tieredApps, i, n.allowedApps, new Set(n.userDeniedBundleIds), n.selectedDisplayId);
  if (a.length === 0 && l.length === 0) return makeTextResult({
    granted: [],
    denied: [],
    ...(p.length > 0 && {
      policyDenied: {
        apps: p,
        guidance: formatUserDeniedGuidance(p)
      }
    }),
    ...(d.length > 0 && {
      userDenied: {
        apps: d,
        guidance: formatTierGuidance(d)
      }
    }),
    teachModeActive: false,
    screenshotFiltering: tieredApps.executor.capabilities.screenshotFiltering
  }, {
    granted_count: 0,
    denied_count: 0
  });
  let m = {
      requestId: hN_.randomUUID(),
      reason: o,
      apps: a,
      screenshotFiltering: tieredApps.executor.capabilities.screenshotFiltering,
      ...(c.length > 0 && {
        willHide: c,
        autoUnhideEnabled: tieredApps.getAutoUnhideEnabled()
      })
    },
    f = await n.onTeachPermissionRequest(m),
    A = [...l, ...f.granted],
    h = f.userConsented === true && A.length > 0;
  if (h) n.onTeachModeActivated?.();
  let g = new Set(A.map(y => y.bundleId)),
    _ = u.filter(y => g.has(y.bundleId));
  return makeTextResult({
    granted: A,
    denied: f.denied,
    ...(p.length > 0 && {
      policyDenied: {
        apps: p,
        guidance: formatUserDeniedGuidance(p)
      }
    }),
    ...(d.length > 0 && {
      userDenied: {
        apps: d,
        guidance: formatTierGuidance(d)
      }
    }),
    ...(_.length > 0 && {
      tierGuidance: planAppAccess(_)
    }),
    teachModeActive: h,
    screenshotFiltering: tieredApps.executor.capabilities.screenshotFiltering
  }, {
    granted_count: f.granted.length,
    denied_count: f.denied.length,
    ...formatPolicyDeniedGuidance(_)
  });
}
async function handleRequestTeachAccess(serverCtx, args, session, tccState) {
  let o = getStringArg(serverCtx, "explanation");
  if (o instanceof Error) return Error(`${tccState}: ${o.message}`);
  let reason = getStringArg(serverCtx, "next_preview");
  if (reason instanceof Error) return Error(`${tccState}: ${reason.message}`);
  let i = serverCtx.actions;
  if (!Array.isArray(i)) return Error(`${tccState}: "actions" must be an array (empty is allowed).`);
  for (let [l, c] of i.entries()) {
    if (typeof c !== "object" || c === null) return Error(`${tccState}: actions[${l}] must be an object`);
    let u = c.action;
    if (typeof u !== "string") return Error(`${tccState}: actions[${l}].action must be a string`);
    if (!BATCHABLE_ACTIONS.has(u)) return Error(`${tccState}: actions[${l}].action="${u}" is not allowed. Allowed: ${[...BATCHABLE_ACTIONS].join(", ")}.`);
  }
  let requestedNames;
  if (serverCtx.anchor !== undefined) {
    let l = serverCtx.anchor;
    if (!Array.isArray(l) || l.length !== 2 || typeof l[0] !== "number" || typeof l[1] !== "number" || !Number.isFinite(l[0]) || !Number.isFinite(l[1])) return Error(`${tccState}: "anchor" must be a [x, y] number tuple or omitted.`);
    let c = await args.executor.getDisplaySize(session.selectedDisplayId);
    requestedNames = getCoordinateArg(l[0], l[1], session.coordinateMode, c, session.lastScreenshot, args.logger);
  }
  return {
    explanation: o,
    nextPreview: reason,
    anchorLogical: requestedNames,
    actions: i
  };
}
async function validateTeachStep(stepArgs, serverCtx, session, label) {
  if ((await session.onTeachStep({
    explanation: stepArgs.explanation,
    nextPreview: stepArgs.nextPreview,
    anchorLogical: stepArgs.anchorLogical
  })).action === "exit") return await Oc8(serverCtx), {
    kind: "exit"
  };
  if (session.onTeachWorking?.(), stepArgs.actions.length === 0) return {
    kind: "ok",
    results: []
  };
  if (label.hideBeforeAction) {
    let a = await serverCtx.executor.prepareForAction(session.allowedApps.map(l => l.bundleId), session.selectedDisplayId);
    if (a.length > 0) session.onAppsHidden?.(a);
  }
  let s = {
      ...label,
      hideBeforeAction: false,
      pixelValidation: false,
      autoTargetDisplay: false
    },
    actions = [];
  for (let [a, l] of stepArgs.actions.entries()) {
    if (session.isAborted?.()) return await Oc8(serverCtx), {
      kind: "exit"
    };
    if (a > 0) await toGraphemes(10);
    let c = l.action,
      {
        screenshot: u,
        ...d
      } = await firstTextOutput(c, l, serverCtx, session, s),
      p = handleBatch(d),
      m = {
        action: c,
        ok: !d.isError,
        output: p
      };
    if (actions.push(m), d.isError) return await Oc8(serverCtx), {
      kind: "action_error",
      executed: actions.length - 1,
      failed: m,
      remaining: stepArgs.actions.length - actions.length,
      telemetry: d.telemetry
    };
  }
  return {
    kind: "ok",
    results: actions
  };
}
async function runTeachStep(plan, serverCtx, session, subGates) {
  let o = await formatMonitorNote(serverCtx, session, subGates);
  if (o.isError) return makeTextResult(plan);
  return {
    content: [{
      type: "text",
      text: JSON.stringify(plan)
    }, ...o.content],
    screenshot: o.screenshot
  };
}
async function withTeachScreenshot(summary, serverCtx, session, subGates) {
  if (!session.onTeachStep) return makeErrorResult("Teach mode is not active. Call request_teach_access first.", "teach_mode_not_active");
  let o = await handleRequestTeachAccess(serverCtx, summary, session, "teach_step");
  if (o instanceof Error) return makeErrorResult(o.message, "bad_args");
  let s = await validateTeachStep(o, summary, session, subGates);
  if (s.kind === "exit") return makeTextResult({
    exited: true
  });
  if (s.kind === "action_error") return makeTextResult({
    executed: s.executed,
    failed: s.failed,
    remaining: s.remaining
  }, s.telemetry);
  if (o.actions.length === 0) return makeTextResult({
    executed: 0,
    results: []
  });
  return runTeachStep({
    executed: s.results.length,
    results: s.results
  }, summary, session, subGates);
}
async function handleTeachStep(serverCtx, args, session, subGates) {
  if (!session.onTeachStep) return makeErrorResult("Teach mode is not active. Call request_teach_access first.", "teach_mode_not_active");
  let plan = args.steps;
  if (!Array.isArray(plan) || plan.length < 1) return makeErrorResult('"steps" must be a non-empty array.', "bad_args");
  let run = [];
  for (let [c, u] of plan.entries()) {
    if (typeof u !== "object" || u === null) return makeErrorResult(`steps[${c}] must be an object`, "bad_args");
    let d = await handleRequestTeachAccess(u, serverCtx, session, `steps[${c}]`);
    if (d instanceof Error) return makeErrorResult(d.message, "bad_args");
    run.push(d);
  }
  let i = [];
  for (let [c, u] of run.entries()) {
    let d = await validateTeachStep(u, serverCtx, session, subGates);
    if (d.kind === "exit") return makeTextResult({
      exited: true,
      stepsCompleted: c
    });
    if (d.kind === "action_error") return makeTextResult({
      stepsCompleted: c,
      stepFailed: c,
      executed: d.executed,
      failed: d.failed,
      remaining: d.remaining,
      results: i
    }, d.telemetry);
    i.push(d.results);
  }
  let a = run.some(c => c.actions.length > 0),
    l = {
      stepsCompleted: run.length,
      results: i
    };
  if (!a) return makeTextResult(l);
  return runTeachStep(l, serverCtx, session, subGates);
}
async function handleTeachBatch(serverCtx, args) {
  if (args.length === 0) return;
  let n = await serverCtx.executor.listRunningApps(),
    r = new Map(n.map(a => [a.bundleId, a.displayName])),
    o = args.map(a => r.get(a) ?? a),
    s = o.map(a => `"${a}"`).join(", "),
    i = o.length === 1;
  return `${s} ${i ? "was" : "were"} open and got hidden before this screenshot (not in the session allowlist). If a previous action was meant to open ${i ? "it" : "one of them"}, that's why you don't see it \u2014 call ` + `request_access to add ${i ? "it" : "them"} to the allowlist.`;
}
function formatHiddenAppsNote(serverCtx) {
  let t = [...serverCtx].sort((o, s) => o.displayId - s.displayId),
    n = new Map(),
    r = new Map();
  for (let o of t) {
    let s = o.label ?? `display ${o.displayId}`,
      i = (n.get(s) ?? 0) + 1;
    n.set(s, i), r.set(o.displayId, i === 1 ? s : `${s} (${i})`);
  }
  return r;
}
async function buildDisplayLabels(displays, t, n, r) {
  let o;
  try {
    o = await displays.executor.listDisplays();
  } catch (d) {
    displays.logger.warn(`[computer-use] listDisplays failed: ${String(d)}`);
    return;
  }
  if (o.length < 2) return;
  let s = formatHiddenAppsNote(o),
    i = d => s.get(d) ?? `display ${d}`,
    a = i(t),
    l = o.filter(d => d.displayId !== t).map(d => i(d.displayId)),
    c = r ? " Use switch_display to capture a different monitor." : "",
    u = l.length > 0 ? ` Other attached monitors: ${l.map(d => `"${d}"`).join(", ")}.` + c : "";
  if (n === undefined || n === 0) return `This screenshot was taken on monitor "${a}".` + u;
  if (n !== t) {
    let d = i(n);
    return `This screenshot was taken on monitor "${a}", which is different from your previous screenshot (taken on "${d}").` + u;
  }
  return;
}
async function formatMonitorNote(serverCtx, currentDisplayId, previousDisplayId) {
  if (currentDisplayId.allowedApps.length === 0) return makeErrorResult("No applications are granted for this session. Call request_access first.", "allowlist_empty");
  if (previousDisplayId.autoTargetDisplay) {
    let l = currentDisplayId.allowedApps.map(g => g.bundleId),
      c = l.slice().sort().join(","),
      u = c !== currentDisplayId.displayResolvedForApps,
      d = !currentDisplayId.displayPinnedByModel && u,
      p = await serverCtx.executor.resolvePrepareCapture({
        allowedBundleIds: l,
        preferredDisplayId: currentDisplayId.selectedDisplayId,
        autoResolve: d,
        doHide: previousDisplayId.hideBeforeAction
      });
    if (p.captureError === undefined && checkPointAppGate_2(p.base64) < MIN_SCREENSHOT_BYTES) serverCtx.logger.warn(`[computer-use] resolvePrepareCapture result implausibly small (${checkPointAppGate_2(p.base64)} bytes decoded) \u2014 possible transient display state`);
    if (p.displayId !== currentDisplayId.selectedDisplayId) serverCtx.logger.debug(`[computer-use] resolver: preferred=${currentDisplayId.selectedDisplayId} resolved=${p.displayId}`), currentDisplayId.onResolvedDisplayUpdated?.(p.displayId);
    if (d) currentDisplayId.onDisplayResolvedForApps?.(c);
    let m = [];
    if (currentDisplayId.lastScreenshot !== undefined) m = p.hidden;
    if (p.hidden.length > 0) currentDisplayId.onAppsHidden?.(p.hidden);
    if (p.captureError !== undefined) return makeErrorResult(p.captureError, "capture_failed");
    let f = await handleTeachBatch(serverCtx, m),
      A = {
        base64: p.base64,
        width: p.width,
        height: p.height,
        displayWidth: p.displayWidth,
        displayHeight: p.displayHeight,
        displayId: p.displayId,
        originX: p.originX,
        originY: p.originY
      },
      h = await buildDisplayLabels(serverCtx, A.displayId, currentDisplayId.lastScreenshot?.displayId, currentDisplayId.onDisplayPinned !== undefined);
    return {
      content: [...(h ? [{
        type: "text",
        text: h
      }] : []), ...(f ? [{
        type: "text",
        text: f
      }] : []), {
        type: "image",
        data: A.base64,
        mimeType: "image/jpeg"
      }],
      screenshot: A
    };
  }
  let r = [];
  if (previousDisplayId.hideBeforeAction) {
    let l = await serverCtx.executor.prepareForAction(currentDisplayId.allowedApps.map(c => c.bundleId), currentDisplayId.selectedDisplayId);
    if (currentDisplayId.lastScreenshot !== undefined) r = l;
    if (l.length > 0) currentDisplayId.onAppsHidden?.(l);
  }
  let o = currentDisplayId.allowedApps.map(l => l.bundleId),
    s = await base64DecodedSize(serverCtx.executor, o, serverCtx.logger, currentDisplayId.selectedDisplayId),
    i = await handleTeachBatch(serverCtx, r),
    a = await buildDisplayLabels(serverCtx, s.displayId, currentDisplayId.lastScreenshot?.displayId, currentDisplayId.onDisplayPinned !== undefined);
  return {
    content: [...(a ? [{
      type: "text",
      text: a
    }] : []), ...(i ? [{
      type: "text",
      text: i
    }] : []), {
      type: "image",
      data: s.base64,
      mimeType: "image/jpeg"
    }],
    screenshot: s
  };
}
async function captureScreenshotResult(serverCtx, session, subGates) {
  let r = session.region;
  if (!Array.isArray(r) || r.length !== 4) return makeErrorResult("region must be an array of length 4: [x0, y0, x1, y1]", "bad_args");
  let [o, s, i, a] = r;
  if (![o, s, i, a].every(f => typeof f === "number" && f >= 0)) return makeErrorResult("region values must be non-negative numbers", "bad_args");
  if (i <= o) return makeErrorResult("region x1 must be greater than x0", "bad_args");
  if (a <= s) return makeErrorResult("region y1 must be greater than y0", "bad_args");
  let hiddenNote = subGates.lastScreenshot;
  if (!hiddenNote) return makeErrorResult("take a screenshot before zooming (region coords are relative to it)", "state_conflict");
  if (i > hiddenNote.width || a > hiddenNote.height) return makeErrorResult(`region exceeds screenshot bounds (${hiddenNote.width}\xD7${hiddenNote.height})`, "bad_args");
  let c = hiddenNote.displayWidth / hiddenNote.width,
    u = hiddenNote.displayHeight / hiddenNote.height,
    d = {
      x: o * c,
      y: s * u,
      w: (i - o) * c,
      h: (a - s) * u
    },
    p = subGates.allowedApps.map(f => f.bundleId);
  return {
    content: [{
      type: "image",
      data: (await serverCtx.executor.zoom(d, p, hiddenNote.displayId)).base64,
      mimeType: "image/jpeg"
    }]
  };
}
async function handleZoom(serverCtx, args, session, r, o, s) {
  if (isMouseButtonHeld) await serverCtx.executor.mouseUp(), isMouseButtonHeld = false, mouseMovedWhileHeld = false;
  let i = getStringArg_2(args);
  if (i instanceof Error) return makeErrorResult(i.message, "bad_args");
  let [a, l] = i,
    c;
  if (args.text !== undefined) {
    if (typeof args.text !== "string") return makeErrorResult("text must be a string", "bad_args");
    if (iHn(args.text, serverCtx.executor.capabilities.platform) && !session.grantFlags.systemKeyCombos) return makeErrorResult(`The modifier chord "${args.text}" would fire a system shortcut. Request the systemKeyCombos grant flag via request_access, or use only modifier keys (shift, ctrl, alt, cmd) in the text parameter.`, "grant_flag_required");
    c = delay(args.text);
  }
  let u = o !== "left" || c !== undefined && c.length > 0 ? "mouse_full" : "mouse",
    d = await applyClipboardGuard(serverCtx, session, r, u);
  if (d) return d;
  let p = await serverCtx.executor.getDisplaySize(session.selectedDisplayId);
  if (r.pixelValidation) {
    let {
        xPct: h,
        yPct: g
      } = toLogicalPoint(a, l, session.coordinateMode, session.lastScreenshot),
      _ = await Mea(serverCtx.cropRawPatch, session.lastScreenshot, h, g, async () => {
        let y = session.allowedApps.map(T => T.bundleId);
        try {
          return await serverCtx.executor.screenshot({
            allowedBundleIds: y,
            displayId: session.lastScreenshot?.displayId
          });
        } catch {
          return null;
        }
      }, serverCtx.logger);
    if (!_.valid && _.warning) return makeErrorResult_2(_.warning);
  }
  let {
      x: m,
      y: f
    } = getCoordinateArg(a, l, session.coordinateMode, p, session.lastScreenshot, serverCtx.logger),
    A = await checkPointAppGate(serverCtx, session, r, m, f, u);
  if (A) return A;
  return await serverCtx.executor.click(m, f, o, s, c), makeErrorResult_2("Clicked.");
}
async function handleClick(serverCtx, args, session, subGates) {
  let o = getStringArg(args, "text");
  if (o instanceof Error) return makeErrorResult(o.message, "bad_args");
  let s = await applyClipboardGuard(serverCtx, session, subGates, "keyboard");
  if (s) return s;
  if (o.includes(`
`) && session.grantFlags.clipboardWrite && subGates.clipboardPasteMultiline) return await serverCtx.executor.type(o, {
    viaClipboard: true
  }), makeErrorResult_2("Typed (via clipboard).");
  let a = captureScreenshotWithRetry(o);
  for (let [l, c] of a.entries()) {
    if (session.isAborted?.()) return makeErrorResult(`Typing aborted after ${l} of ${a.length} graphemes (user interrupt).`);
    if (await toGraphemes(KEYSTROKE_DELAY_MS), c === `
` || c === "\r" || c === `\r
`) await serverCtx.executor.key("return");else if (c === "\t") await serverCtx.executor.key("tab");else await serverCtx.executor.type(c, {
      viaClipboard: false
    });
  }
  return makeErrorResult_2(`Typed ${a.length} grapheme(s).`);
}
async function handleType(serverCtx, args, session, subGates) {
  let text = getStringArg(args, "text");
  if (text instanceof Error) return makeErrorResult("text is required", "bad_args");
  let gate;
  if (args.repeat !== undefined) {
    if (typeof args.repeat !== "number" || !Number.isInteger(args.repeat) || args.repeat < 1) return makeErrorResult("repeat must be a positive integer", "bad_args");
    if (args.repeat > 100) return makeErrorResult("repeat exceeds maximum of 100", "bad_args");
    gate = args.repeat;
  }
  if (iHn(text, serverCtx.executor.capabilities.platform) && !session.grantFlags.systemKeyCombos) return makeErrorResult(`"${text}" is a system-level shortcut. Request the \`systemKeyCombos\` grant via request_access to use it.`, "grant_flag_required");
  let graphemes = await applyClipboardGuard(serverCtx, session, subGates, "keyboard");
  if (graphemes) return graphemes;
  return await serverCtx.executor.key(text, gate), makeErrorResult_2("Key pressed.");
}
async function handleKey(serverCtx, args, session, subGates) {
  let text = getStringArg_2(args);
  if (text instanceof Error) return makeErrorResult(text.message, "bad_args");
  let [s, i] = text,
    a = args.scroll_direction;
  if (a !== "up" && a !== "down" && a !== "left" && a !== "right") return makeErrorResult("scroll_direction must be 'up', 'down', 'left', or 'right'", "bad_args");
  let gate = args.scroll_amount;
  if (typeof gate !== "number" || !Number.isInteger(gate) || gate < 0) return makeErrorResult("scroll_amount must be a non-negative int", "bad_args");
  if (gate > 100) return makeErrorResult("scroll_amount exceeds maximum of 100", "bad_args");
  let c = a === "left" ? -gate : a === "right" ? gate : 0,
    u = a === "up" ? -gate : a === "down" ? gate : 0,
    d = await applyClipboardGuard(serverCtx, session, subGates, "mouse");
  if (d) return d;
  let p = await serverCtx.executor.getDisplaySize(session.selectedDisplayId),
    {
      x: m,
      y: f
    } = getCoordinateArg(s, i, session.coordinateMode, p, session.lastScreenshot, serverCtx.logger),
    A = await checkPointAppGate(serverCtx, session, subGates, m, f, isMouseButtonHeld ? "mouse_full" : "mouse");
  if (A) return A;
  if (isMouseButtonHeld) mouseMovedWhileHeld = true;
  return await serverCtx.executor.scroll(m, f, c, u), makeErrorResult_2("Scrolled.");
}
async function handleScroll(serverCtx, args, session, subGates) {
  if (isMouseButtonHeld) await serverCtx.executor.mouseUp(), isMouseButtonHeld = false, mouseMovedWhileHeld = false;
  let o = getStringArg_2(args, "coordinate");
  if (o instanceof Error) return makeErrorResult(o.message, "bad_args");
  let direction = o,
    direction_2;
  if (args.start_coordinate !== undefined) {
    let f = getStringArg_2(args, "start_coordinate");
    if (f instanceof Error) return makeErrorResult(f.message, "bad_args");
    direction_2 = f;
  }
  let a = await applyClipboardGuard(serverCtx, session, subGates, "mouse");
  if (a) return a;
  let dx = await serverCtx.executor.getDisplaySize(session.selectedDisplayId),
    dy = direction_2 === undefined ? undefined : getCoordinateArg(direction_2[0], direction_2[1], session.coordinateMode, dx, session.lastScreenshot, serverCtx.logger),
    gate = getCoordinateArg(direction[0], direction[1], session.coordinateMode, dx, session.lastScreenshot, serverCtx.logger),
    d = dy ?? (await serverCtx.executor.getCursorPosition()),
    display = await checkPointAppGate(serverCtx, session, subGates, d.x, d.y, "mouse");
  if (display) return display;
  let pointGate = await checkPointAppGate(serverCtx, session, subGates, gate.x, gate.y, "mouse_full");
  if (pointGate) return pointGate;
  return await serverCtx.executor.drag(dy, gate), makeErrorResult_2("Dragged.");
}
async function handleDrag(serverCtx, args, session, subGates) {
  let o = getStringArg_2(args);
  if (o instanceof Error) return makeErrorResult(o.message, "bad_args");
  let [s, i] = o,
    end = await applyClipboardGuard(serverCtx, session, subGates, isMouseButtonHeld ? "mouse" : "mouse_position");
  if (end) return end;
  let c = await serverCtx.executor.getDisplaySize(session.selectedDisplayId),
    {
      x: u,
      y: d
    } = getCoordinateArg(s, i, session.coordinateMode, c, session.lastScreenshot, serverCtx.logger);
  if (isMouseButtonHeld) {
    let p = await checkPointAppGate(serverCtx, session, subGates, u, d, "mouse_full");
    if (p) return p;
  }
  if (await serverCtx.executor.moveMouse(u, d), isMouseButtonHeld) mouseMovedWhileHeld = true;
  return makeErrorResult_2("Moved.");
}
async function handleMouseMove(serverCtx, args, session) {
  let r = getStringArg(args, "app");
  if (r instanceof Error) return makeErrorResult(r.message, "bad_args");
  let o = new Set(session.allowedApps.map(i => i.bundleId)),
    s;
  if (Tc8(r) && o.has(r)) s = r;else s = session.allowedApps.find(a => a.displayName.toLowerCase() === r.toLowerCase())?.bundleId;
  if (!s || !o.has(s)) return makeErrorResult(`"${r}" is not granted for this session. Call request_access first.`, "app_not_granted");
  if (await serverCtx.executor.openApp(s), session.onDisplayPinned !== undefined) {
    let i = 1;
    try {
      i = (await serverCtx.executor.listDisplays()).length;
    } catch {}
    if (i >= 2) return makeErrorResult_2(`Opened "${r}". If it isn't visible in the next screenshot, it may ` + "have opened on a different monitor \u2014 use switch_display to check.");
  }
  return makeErrorResult_2(`Opened "${r}".`);
}
async function handleOpenApplication(serverCtx, args, session) {
  let appArg = getStringArg(args, "display");
  if (appArg instanceof Error) return makeErrorResult(appArg.message, "bad_args");
  if (!session.onDisplayPinned) return makeErrorResult("Display switching is not available in this session.", "feature_unavailable");
  if (appArg.toLowerCase() === "auto") return session.onDisplayPinned(undefined), makeErrorResult_2("Returned to automatic monitor selection. Call screenshot to continue.");
  let o;
  try {
    o = await serverCtx.executor.listDisplays();
  } catch (l) {
    return makeErrorResult(`Failed to enumerate displays: ${String(l)}`, "display_error");
  }
  if (o.length < 2) return makeErrorResult("Only one monitor is connected. There is nothing to switch to.", "bad_args");
  let s = formatHiddenAppsNote(o),
    i = appArg.toLowerCase(),
    a = o.find(l => s.get(l.displayId)?.toLowerCase() === i);
  if (!a) {
    let l = o.map(c => `"${s.get(c.displayId)}"`).join(", ");
    return makeErrorResult(`No monitor named "${appArg}" is connected. Available monitors: ${l}.`, "bad_args");
  }
  return session.onDisplayPinned(a.displayId), makeErrorResult_2(`Switched to monitor "${s.get(a.displayId)}". Call screenshot to see it.`);
}
function handleSwitchDisplay(serverCtx) {
  return makeTextResult({
    allowedApps: serverCtx.allowedApps,
    grantFlags: serverCtx.grantFlags
  });
}
async function handleListGrantedApplications(session, t, n) {
  if (!t.grantFlags.clipboardRead) return makeErrorResult("Clipboard read is not granted. Request `clipboardRead` via request_access.", "grant_flag_required");
  if (n.clipboardGuard) {
    let o = await session.executor.getFrontmostApp(),
      s = new Map(t.allowedApps.map(a => [a.bundleId, a.tier])),
      i = o ? s.get(o.bundleId) : undefined;
    await tierPermitsInteraction(session, t, i === "click");
  }
  let r = await session.executor.readClipboard();
  return makeTextResult({
    text: r
  });
}
async function handleReadClipboard(serverCtx, session, subGates, r) {
  if (!subGates.grantFlags.clipboardWrite) return makeErrorResult("Clipboard write is not granted. Request `clipboardWrite` via request_access.", "grant_flag_required");
  let o = getStringArg(session, "text");
  if (o instanceof Error) return makeErrorResult(o.message, "bad_args");
  if (r.clipboardGuard) {
    let s = await serverCtx.executor.getFrontmostApp(),
      i = new Map(subGates.allowedApps.map(l => [l.bundleId, l.tier])),
      a = s ? i.get(s.bundleId) : undefined;
    if (s && a === "click") return makeErrorResult(`"${s.displayName}" is a tier-"click" app and currently frontmost. write_clipboard is blocked because the next action ` + "would clear the clipboard anyway \u2014 a UI Paste button in this " + 'app cannot be used to inject text. Bring a tier-"full" app forward before writing to the clipboard.' + RESTRICTION_NOTE, "tier_insufficient");
    await tierPermitsInteraction(serverCtx, subGates, a === "click");
  }
  return await serverCtx.executor.writeClipboard(o), makeErrorResult_2("Clipboard written.");
}
async function handleWriteClipboard(serverCtx) {
  let t = serverCtx.duration;
  if (typeof t !== "number" || !Number.isFinite(t)) return makeErrorResult("duration must be a number", "bad_args");
  if (t < 0) return makeErrorResult("duration must be non-negative", "bad_args");
  if (t > 100) return makeErrorResult("duration is too long. Duration is in seconds.", "bad_args");
  return await toGraphemes(t * 1000), makeErrorResult_2(`Waited ${t}s.`);
}
async function handleWait(args, t) {
  let n = await args.executor.getCursorPosition(),
    r = t.lastScreenshot;
  if (r) {
    let o = n.x - r.originX,
      s = n.y - r.originY;
    if (o < 0 || o > r.displayWidth || s < 0 || s > r.displayHeight) return makeTextResult({
      x: n.x,
      y: n.y,
      coordinateSpace: "logical_points",
      note: "cursor is on a different monitor than your last screenshot; take a fresh screenshot"
    });
    let i = Math.round(o * (r.width / r.displayWidth)),
      a = Math.round(s * (r.height / r.displayHeight));
    return makeTextResult({
      x: i,
      y: a,
      coordinateSpace: "image_pixels"
    });
  }
  return makeTextResult({
    x: n.x,
    y: n.y,
    coordinateSpace: "logical_points",
    note: "take a screenshot first for image-pixel coordinates"
  });
}
async function handleCursorPosition(serverCtx, session, n, r) {
  let o = getStringArg(session, "text");
  if (o instanceof Error) return makeErrorResult(o.message, "bad_args");
  let s = session.duration;
  if (typeof s !== "number" || !Number.isFinite(s)) return makeErrorResult("duration must be a number", "bad_args");
  if (s < 0) return makeErrorResult("duration must be non-negative", "bad_args");
  if (s > 100) return makeErrorResult("duration is too long. Duration is in seconds.", "bad_args");
  if (iHn(o, serverCtx.executor.capabilities.platform) && !n.grantFlags.systemKeyCombos) return makeErrorResult(`"${o}" is a system-level shortcut. Request the \`systemKeyCombos\` grant via request_access to use it.`, "grant_flag_required");
  let i = await applyClipboardGuard(serverCtx, n, r, "keyboard");
  if (i) return i;
  let a = delay(o);
  return await serverCtx.executor.holdKey(a, s * 1000), makeErrorResult_2("Key held.");
}
async function handleHoldKey(serverCtx, args, session) {
  if (isMouseButtonHeld) return makeErrorResult("mouse button already held, call left_mouse_up first", "state_conflict");
  let r = await applyClipboardGuard(serverCtx, args, session, "mouse");
  if (r) return r;
  let o = await serverCtx.executor.getCursorPosition(),
    s = await checkPointAppGate(serverCtx, args, session, o.x, o.y, "mouse");
  if (s) return s;
  return await serverCtx.executor.mouseDown(), isMouseButtonHeld = true, mouseMovedWhileHeld = false, makeErrorResult_2("Mouse button pressed.");
}
async function handleLeftMouseDown(serverCtx, session, subGates) {
  let r = async a => (await serverCtx.executor.mouseUp(), isMouseButtonHeld = false, mouseMovedWhileHeld = false, a),
    frontmostGate = await applyClipboardGuard(serverCtx, session, subGates, "mouse");
  if (frontmostGate) return r(frontmostGate);
  let cursor = await serverCtx.executor.getCursorPosition(),
    pointGate = await checkPointAppGate(serverCtx, session, subGates, cursor.x, cursor.y, mouseMovedWhileHeld ? "mouse_full" : "mouse");
  if (pointGate) return r(pointGate);
  return await serverCtx.executor.mouseUp(), isMouseButtonHeld = false, mouseMovedWhileHeld = false, makeErrorResult_2("Mouse button released.");
}
async function handleLeftMouseUp(serverCtx, session, subGates, r) {
  let o = session.actions;
  if (!Array.isArray(o) || o.length === 0) return makeErrorResult("actions must be a non-empty array", "bad_args");
  for (let [a, l] of o.entries()) {
    if (typeof l !== "object" || l === null) return makeErrorResult(`actions[${a}] must be an object`, "bad_args");
    let c = l.action;
    if (typeof c !== "string") return makeErrorResult(`actions[${a}].action must be a string`, "bad_args");
    if (!BATCHABLE_ACTIONS.has(c)) return makeErrorResult(`actions[${a}].action="${c}" is not allowed in a batch. Allowed: ${[...BATCHABLE_ACTIONS].join(", ")}.`, "bad_args");
  }
  if (r.hideBeforeAction) {
    let a = await serverCtx.executor.prepareForAction(subGates.allowedApps.map(l => l.bundleId), subGates.selectedDisplayId);
    if (a.length > 0) subGates.onAppsHidden?.(a);
  }
  let s = {
      ...r,
      hideBeforeAction: false,
      pixelValidation: false,
      autoTargetDisplay: false
    },
    i = [];
  for (let [a, l] of o.entries()) {
    if (subGates.isAborted?.()) return await Oc8(serverCtx), makeErrorResult(`Batch aborted after ${i.length} of ${o.length} actions (user interrupt).`);
    if (a > 0) await toGraphemes(10);
    let c = l,
      u = c.action,
      {
        screenshot: d,
        ...p
      } = await firstTextOutput(u, c, serverCtx, subGates, s),
      m = handleBatch(p),
      f = {
        action: u,
        ok: !p.isError,
        output: m
      };
    if (i.push(f), p.isError) return await Oc8(serverCtx), makeTextResult({
      completed: i.slice(0, -1),
      failed: f,
      remaining: o.length - i.length
    }, p.telemetry);
  }
  return makeTextResult({
    completed: i
  });
}
function handleBatch(serverCtx) {
  let t = serverCtx.content[0];
  return t && t.type === "text" ? t.text : "";
}
async function firstTextOutput(result, t, n, r, o) {
  switch (result) {
    case "screenshot":
      return formatMonitorNote(n, r, o);
    case "zoom":
      return captureScreenshotResult(n, t, r);
    case "left_click":
      return handleZoom(n, t, r, o, "left", 1);
    case "double_click":
      return handleZoom(n, t, r, o, "left", 2);
    case "triple_click":
      return handleZoom(n, t, r, o, "left", 3);
    case "right_click":
      return handleZoom(n, t, r, o, "right", 1);
    case "middle_click":
      return handleZoom(n, t, r, o, "middle", 1);
    case "type":
      return handleClick(n, t, r, o);
    case "key":
      return handleType(n, t, r, o);
    case "scroll":
      return handleKey(n, t, r, o);
    case "left_click_drag":
      return handleScroll(n, t, r, o);
    case "mouse_move":
      return handleDrag(n, t, r, o);
    case "wait":
      return handleWriteClipboard(t);
    case "cursor_position":
      return handleWait(n, r);
    case "hold_key":
      return handleCursorPosition(n, t, r, o);
    case "left_mouse_down":
      return handleHoldKey(n, r, o);
    case "left_mouse_up":
      return handleLeftMouseDown(n, r, o);
    case "open_application":
      return handleMouseMove(n, t, r);
    case "switch_display":
      return handleOpenApplication(n, t, r);
    case "list_granted_applications":
      return handleSwitchDisplay(r);
    case "read_clipboard":
      return handleListGrantedApplications(n, r, o);
    case "write_clipboard":
      return handleReadClipboard(n, t, r, o);
    case "computer_batch":
      return handleLeftMouseUp(n, t, r, o);
    default:
      return makeErrorResult(`Unknown tool "${result}".`, "bad_args");
  }
}
async function dispatchAction(toolName, args, serverCtx, session) {
  let {
      logger: o,
      serverName: s
    } = toolName,
    i = new Set(session.userDeniedBundleIds),
    a = session.allowedApps.some(f => f.tier === undefined || i.has(f.bundleId) || sHn(f.bundleId, f.displayName)) ? {
      ...session,
      allowedApps: session.allowedApps.filter(f => !i.has(f.bundleId)).filter(f => !sHn(f.bundleId, f.displayName)).map(f => f.tier !== undefined ? f : {
        ...f,
        tier: K7r(f.bundleId, f.displayName)
      })
    } : session;
  if (toolName.isDisabled()) return makeErrorResult("Computer control is disabled in Settings. Enable it and try again.", "other");
  let l = await toolName.ensureOsPermissions(),
    c;
  if (!l.granted) {
    if (args !== "request_access" && args !== "request_teach_access") return makeErrorResult("Accessibility and Screen Recording permissions are required. Call request_access to show the permission panel.", "tcc_not_granted");
    c = {
      accessibility: l.accessibility,
      screenRecording: l.screenRecording
    };
  }
  let u = releaseHeldMouse(args),
    d = a.checkCuLock?.();
  if (d) {
    if (d.holder !== undefined && !d.isSelf) return makeErrorResult("Another Claude session is currently using the computer. Wait for the user to acknowledge it is finished (stop button in the Claude window), or find a non-computer-use approach if one is readily apparent.", "cu_lock_held");
    if (d.holder === undefined && !u) a.acquireCuLock?.(), parseKeyChord();
  }
  let p = toolName.getSubGates(),
    m = makeJsonResult(serverCtx);
  o.silly(`[${s}] tool=${args} args=${JSON.stringify(m).slice(0, 200)}`);
  try {
    if (args === "request_access") return await resolveRequestedApps(toolName, m, a, c);
    if (args === "request_teach_access") return await tierDeniedTelemetry(toolName, m, a, c);
    if (args === "teach_step") return await withTeachScreenshot(toolName, m, a, p);
    if (args === "teach_batch") return await handleTeachStep(toolName, m, a, p);
    return await firstTextOutput(args, m, toolName, a, p);
  } catch (f) {
    let A = f instanceof Error ? f.message : String(f);
    return o.error(`[${s}] tool=${args} threw: ${A}`, f), makeErrorResult(`Tool "${args}" failed: ${A}`, "executor_threw");
  }
}
var hN_,
  FINDER_BUNDLE_ID = "com.apple.finder",
  RESTRICTION_NOTE,
  MIN_SCREENSHOT_BYTES = 1024,
  KEYSTROKE_DELAY_MS = 8,
  isMouseButtonHeld = false,
  mouseMovedWhileHeld = false,
  BUNDLE_ID_REGEX,
  BATCHABLE_ACTIONS;
var zo7 = b(() => {
  Pea();
  Lea();
  z7r();
  hN_ = require("crypto");
  RESTRICTION_NOTE = " Do not attempt to work around this restriction \u2014 never use AppleScript, " + "System Events, shell commands, or any other method to send clicks or keystrokes to this app.";
  BUNDLE_ID_REGEX = /^[A-Za-z0-9][\w.-]*\.[A-Za-z0-9][\w.-]*$/;
  BATCHABLE_ACTIONS = new Set(["key", "type", "mouse_move", "left_click", "left_click_drag", "right_click", "middle_click", "double_click", "triple_click", "scroll", "hold_key", "screenshot", "cursor_position", "left_mouse_down", "left_mouse_up", "wait"]);
});
export {makeErrorResult as ua,makeErrorResult_2 as w1,makeTextResult as v1,makeJsonResult as ejd,getStringArg as Vae,getStringArg_2 as IFt,getCoordinateArg as sit,toLogicalPoint as tjd,toScreenshotPercent as dca,tierPermitsInteraction as NDn,applyClipboardGuard as zge,checkPointAppGate as s3e,checkPointAppGate_2 as LDn,base64DecodedSize as njd,captureScreenshotWithRetry as ojd,toGraphemes as FDn,delay as mca,parseKeyChord as HQr,Oc8 as kFt,releaseHeldMouse as IQr,Tc8 as vQr,looksLikeBundleId as ijd,resolveRequestedApps as ajd,handleRequestAccess as ljd,buildWindowLocations as fca,planAppAccess as hca,formatTierGuidance as wQr,formatUserDeniedGuidance as kQr,formatPolicyDeniedGuidance as gca,tierDeniedTelemetry as cjd,handleRequestTeachAccess as _ca,validateTeachStep as yca,runTeachStep as Tca,withTeachScreenshot as ujd,handleTeachStep as djd,handleTeachBatch as lca,formatHiddenAppsNote as Sca,buildDisplayLabels as cca,formatMonitorNote as bca,captureScreenshotResult as pjd,handleZoom as wFt,handleClick as mjd,handleType as fjd,handleKey as hjd,handleScroll as gjd,handleDrag as _jd,handleMouseMove as yjd,handleOpenApplication as Tjd,handleSwitchDisplay as Sjd,handleListGrantedApplications as bjd,handleReadClipboard as Ejd,handleWriteClipboard as Cjd,handleWait as Ajd,handleCursorPosition as Rjd,handleHoldKey as vjd,handleLeftMouseDown as wjd,handleLeftMouseUp as kjd,handleBatch as Eca,firstTextOutput as xQr,dispatchAction as Cca,hN_ as HFt,FINDER_BUNDLE_ID as uca,RESTRICTION_NOTE as o3e,MIN_SCREENSHOT_BYTES as pca,KEYSTROKE_DELAY_MS as rjd,isMouseButtonHeld as buildSystemPrompt,mouseMovedWhileHeld as Gae,BUNDLE_ID_REGEX as sjd,BATCHABLE_ACTIONS as MDn,zo7 as Aca};
