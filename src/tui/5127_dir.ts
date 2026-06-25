// @ts-nocheck
import {rGe,TVt} from "../../vendor/m5125.ts";
import {_6,hPe} from "../../vendor/m4606.ts";
import {VI,dne} from "../../vendor/m4605.ts";
import {bJn,SJn,EJn} from "../../vendor/m5123.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {bgSupervisorNoun as wy,fC} from "../config/2212_shouldShowLaunchComposer.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {R4,tge} from "../../vendor/m2687.ts";
import {isPathTrusted as Dft,setPathTrusted as a8t,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {T0e,G$t} from "../../vendor/m3833.ts";
import {b,x} from "../../runtime.ts";
import {lt} from "../session/0132_sent.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/*
 * tui/5127_dir.tsx - React/Ink terminal UI restoration (Remote Control server management).
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal names are retained where local usage does not verify a safer semantic name.
 */
// FIXME: unverified name
/** Load the list of configured remote-control servers, annotated with whether the background worker is running. */
async function TUl(): Promise<any> {
  let configResult = await rGe(_6());
  if (!configResult.ok) return [];
  let servers = configResult.config.remoteControl ?? [],
    isRunning = (await VI()) !== null;
  return servers.map((server: any): any => ({
    dir: server.dir,
    name: server.name ?? iSe.basename(server.dir),
    spawnMode: server.spawnMode ?? "same-dir",
    isRunning: isRunning
  }));
}
// FIXME: unverified name
/** Detail view for a single remote-control server: restart / remove / back actions. */
function SUl(props: any): any {
  let cache = xDo.c(41),
    {
      server: server,
      onBack: onBack,
      onDone: onDone,
      refresh: refresh
    } = props,
    [busy, setBusy] = oGe.useState(!1),
    [confirmingRemove, setConfirmingRemove] = oGe.useState(!1),
    handleAction;
  if (cache[0] !== busy || cache[1] !== onDone || cache[2] !== refresh || cache[3] !== server.dir) handleAction = async function (action: any): Promise<any> {
    if (busy) return;
    setBusy(!0);
    try {
      if (action === "remove") await bJn(server.dir), await refresh(), onDone(`Removed remote-control server for ${server.dir}.`, {
        display: "system"
      });else onDone("The background server picks up config changes automatically — no restart needed.", {
        display: "system"
      });
    } catch (err) {
      let error = err;
      Ie(error), onDone(`Action failed: ${Ce(error)}`, {
        display: "system"
      });
    }
  }, cache[0] = busy, cache[1] = onDone, cache[2] = refresh, cache[3] = server.dir, cache[4] = handleAction;else handleAction = cache[4];
  let runAction = handleAction;
  if (confirmingRemove) {
    let dir = server.dir,
      supervisorNoun;
    if (cache[5] === Symbol.for("react.memo_cache_sentinel")) supervisorNoun = wy(), cache[5] = supervisorNoun;else supervisorNoun = cache[5];
    let removeSubtitle = `Stop serving ${dir} to claude.ai. The ${supervisorNoun} will stop the worker on its next reconcile.`,
      onCancelRemove;
    if (cache[6] === Symbol.for("react.memo_cache_sentinel")) onCancelRemove = () => setConfirmingRemove(!1), cache[6] = onCancelRemove;else onCancelRemove = cache[6];
    let onConfirmRemove;
    if (cache[7] !== runAction) onConfirmRemove = () => void runAction("remove"), cache[7] = runAction, cache[8] = onConfirmRemove;else onConfirmRemove = cache[8];
    let onDialogCancel;
    if (cache[9] === Symbol.for("react.memo_cache_sentinel")) onDialogCancel = () => setConfirmingRemove(!1), cache[9] = onDialogCancel;else onDialogCancel = cache[9];
    let confirmButtons;
    if (cache[10] !== onConfirmRemove) confirmButtons = M6.jsx(Bl, {
      cancelFirst: !0,
      focus: "cancel",
      confirmLabel: "Yes, remove",
      cancelLabel: "No, cancel",
      onConfirm: onConfirmRemove,
      onCancel: onDialogCancel
    }), cache[10] = onConfirmRemove, cache[11] = confirmButtons;else confirmButtons = cache[11];
    let removeDialog;
    if (cache[12] !== removeSubtitle || cache[13] !== confirmButtons) removeDialog = M6.jsx(Jn, {
      title: "Remove server?",
      subtitle: removeSubtitle,
      onCancel: onCancelRemove,
      color: "error",
      children: confirmButtons
    }), cache[12] = removeSubtitle, cache[13] = confirmButtons, cache[14] = removeDialog;else removeDialog = cache[14];
    return removeDialog;
  }
  let menuOptions;
  if (cache[15] === Symbol.for("react.memo_cache_sentinel")) menuOptions = [{
    label: `Restart ${wy()}`,
    value: "restart"
  }, {
    label: "Remove",
    value: "remove"
  }, {
    label: "Back",
    value: "back"
  }], cache[15] = menuOptions;else menuOptions = cache[15];
  let options = menuOptions,
    dirRow;
  if (cache[16] !== server.dir) dirRow = M6.jsxs(v, {
    dimColor: !0,
    children: ["Directory ", server.dir]
  }), cache[16] = server.dir, cache[17] = dirRow;else dirRow = cache[17];
  let spawnModeRow;
  if (cache[18] !== server.spawnMode) spawnModeRow = M6.jsxs(v, {
    dimColor: !0,
    children: ["Spawn mode ", server.spawnMode]
  }), cache[18] = server.spawnMode, cache[19] = spawnModeRow;else spawnModeRow = cache[19];
  let statusKind = server.isRunning ? "success" : "pending",
    statusIcon;
  if (cache[20] !== statusKind) statusIcon = M6.jsx(bs, {
    status: statusKind,
    withSpace: !0
  }), cache[20] = statusKind, cache[21] = statusIcon;else statusIcon = cache[21];
  let statusLabel = server.isRunning ? "running" : "not running",
    statusRow;
  if (cache[22] !== statusIcon || cache[23] !== statusLabel) statusRow = M6.jsxs(v, {
    dimColor: !0,
    children: ["Status", "     ", statusIcon, statusLabel]
  }), cache[22] = statusIcon, cache[23] = statusLabel, cache[24] = statusRow;else statusRow = cache[24];
  let infoBox;
  if (cache[25] !== dirRow || cache[26] !== spawnModeRow || cache[27] !== statusRow) infoBox = M6.jsxs($, {
    flexDirection: "column",
    marginBottom: 1,
    children: [dirRow, spawnModeRow, statusRow]
  }), cache[25] = dirRow, cache[26] = spawnModeRow, cache[27] = statusRow, cache[28] = infoBox;else infoBox = cache[28];
  let onMenuChange;
  if (cache[29] !== onBack || cache[30] !== runAction) onMenuChange = (value: any): any => {
    if (value === "back") return onBack();
    if (value === "remove") return setConfirmingRemove(!0);
    runAction(value);
  }, cache[29] = onBack, cache[30] = runAction, cache[31] = onMenuChange;else onMenuChange = cache[31];
  let menu;
  if (cache[32] !== busy || cache[33] !== onBack || cache[34] !== onMenuChange) menu = M6.jsx(hr, {
    options: options,
    isDisabled: busy,
    onChange: onMenuChange,
    onCancel: onBack
  }), cache[32] = busy, cache[33] = onBack, cache[34] = onMenuChange, cache[35] = menu;else menu = cache[35];
  let view;
  if (cache[36] !== onBack || cache[37] !== server.name || cache[38] !== menu || cache[39] !== infoBox) view = M6.jsxs(Jn, {
    title: server.name,
    onCancel: onBack,
    children: [infoBox, menu]
  }), cache[36] = onBack, cache[37] = server.name, cache[38] = menu, cache[39] = infoBox, cache[40] = view;else view = cache[40];
  return view;
}
// FIXME: unverified name
/** Form view for creating a new remote-control server, with directory-trust gating. */
function bUl(props: any): any {
  let cache = xDo.c(48),
    {
      defaultDir: defaultDir,
      onCancel: onCancel,
      onAdded: onAdded
    } = props,
    defaultName;
  if (cache[0] !== defaultDir) defaultName = iSe.basename(defaultDir), cache[0] = defaultDir, cache[1] = defaultName;else defaultName = cache[1];
  let initialValues;
  if (cache[2] !== defaultDir || cache[3] !== defaultName) initialValues = {
    dir: defaultDir,
    name: defaultName,
    spawnMode: "same-dir"
  }, cache[2] = defaultDir, cache[3] = defaultName, cache[4] = initialValues;else initialValues = cache[4];
  let [values, setValues] = oGe.useState(initialValues),
    [nameEdited, setNameEdited] = oGe.useState(!1),
    [pendingTrustDir, setPendingTrustDir] = oGe.useState(null),
    [submitting, setSubmitting] = oGe.useState(!1),
    handleChange;
  if (cache[5] !== defaultDir || cache[6] !== nameEdited) handleChange = function (key: any, value: any): any {
    if (key === "name") setNameEdited(!0);
    setValues((prev: any): any => {
      if (prev[key] === value) return prev;
      let next = {
        ...prev,
        [key]: value
      };
      if (key === "dir" && !nameEdited) next.name = iSe.basename(iSe.resolve(R4(value.trim() || defaultDir)));
      return next;
    });
  }, cache[5] = defaultDir, cache[6] = nameEdited, cache[7] = handleChange;else handleChange = cache[7];
  let onChange = handleChange,
    resolvedDir;
  if (cache[8] !== defaultDir || cache[9] !== values.dir) resolvedDir = iSe.resolve(R4(values.dir?.trim() || defaultDir)), cache[8] = defaultDir, cache[9] = values.dir, cache[10] = resolvedDir;else resolvedDir = cache[10];
  let targetDir = resolvedDir,
    dirHint;
  if (cache[11] !== defaultDir) dirHint = (input: any): any => {
    let candidate = iSe.resolve(R4(input.trim() || defaultDir));
    return Dft(candidate) ? "Available on claude.ai/code and the Claude mobile app." : `${candidate} is not yet trusted — you'll be asked to trust it on submit.`;
  }, cache[11] = defaultDir, cache[12] = dirHint;else dirHint = cache[12];
  let dirField;
  if (cache[13] !== defaultDir || cache[14] !== dirHint) dirField = {
    type: "text",
    key: "dir",
    label: "Directory",
    placeholder: defaultDir,
    required: !0,
    hint: dirHint
  }, cache[13] = defaultDir, cache[14] = dirHint, cache[15] = dirField;else dirField = cache[15];
  let nameField;
  if (cache[16] !== nameEdited) nameField = {
    type: "text",
    key: "name",
    label: "Name",
    hint: () => nameEdited ? "Shown in the claude.ai session picker." : "Auto-generated from the directory name."
  }, cache[16] = nameEdited, cache[17] = nameField;else nameField = cache[17];
  let spawnModeField;
  if (cache[18] === Symbol.for("react.memo_cache_sentinel")) spawnModeField = {
    type: "select",
    key: "spawnMode",
    label: "Spawn mode",
    options: [{
      label: "same-dir",
      value: "same-dir"
    }, {
      label: "worktree",
      value: "worktree"
    }],
    hint: eCm
  }, cache[18] = spawnModeField;else spawnModeField = cache[18];
  let fieldList;
  if (cache[19] !== dirField || cache[20] !== nameField) fieldList = [dirField, nameField, spawnModeField], cache[19] = dirField, cache[20] = nameField, cache[21] = fieldList;else fieldList = cache[21];
  let fields = fieldList,
    submitServer;
  if (cache[22] !== onAdded || cache[23] !== onCancel || cache[24] !== values.name || cache[25] !== values.spawnMode) submitServer = async function (dir: any): Promise<any> {
    setSubmitting(!0);
    let name = values.name?.trim() || iSe.basename(dir),
      spawnMode = values.spawnMode ?? "same-dir";
    try {
      await SJn({
        dir: dir,
        name: name,
        spawnMode: spawnMode
      }), onAdded(dir, void 0);
    } catch (err) {
      Ie(err), setSubmitting(!1), onCancel();
    }
  }, cache[22] = onAdded, cache[23] = onCancel, cache[24] = values.name, cache[25] = values.spawnMode, cache[26] = submitServer;else submitServer = cache[26];
  let addServer = submitServer,
    handleSubmit;
  if (cache[27] !== submitting || cache[28] !== addServer || cache[29] !== targetDir) handleSubmit = function (): any {
    if (submitting) return;
    if (!Dft(targetDir)) {
      setPendingTrustDir(targetDir);
      return;
    }
    addServer(targetDir);
  }, cache[27] = submitting, cache[28] = addServer, cache[29] = targetDir, cache[30] = handleSubmit;else handleSubmit = cache[30];
  let onSubmit = handleSubmit;
  if (pendingTrustDir !== null) {
    let trustSubtitle = `${pendingTrustDir} hasn't been trusted yet. Trusting allows Claude to read and execute files there.`,
      onCancelTrust;
    if (cache[31] === Symbol.for("react.memo_cache_sentinel")) onCancelTrust = () => setPendingTrustDir(null), cache[31] = onCancelTrust;else onCancelTrust = cache[31];
    let onConfirmTrust;
    if (cache[32] !== addServer || cache[33] !== pendingTrustDir) onConfirmTrust = () => {
      a8t(pendingTrustDir), setPendingTrustDir(null), addServer(pendingTrustDir);
    }, cache[32] = addServer, cache[33] = pendingTrustDir, cache[34] = onConfirmTrust;else onConfirmTrust = cache[34];
    let onDialogCancelTrust;
    if (cache[35] === Symbol.for("react.memo_cache_sentinel")) onDialogCancelTrust = () => setPendingTrustDir(null), cache[35] = onDialogCancelTrust;else onDialogCancelTrust = cache[35];
    let trustButtons;
    if (cache[36] !== onConfirmTrust) trustButtons = M6.jsx(Bl, {
      cancelFirst: !0,
      focus: "cancel",
      confirmLabel: "Yes, trust and add server",
      cancelLabel: "No, go back",
      onConfirm: onConfirmTrust,
      onCancel: onDialogCancelTrust
    }), cache[36] = onConfirmTrust, cache[37] = trustButtons;else trustButtons = cache[37];
    let trustDialog;
    if (cache[38] !== trustSubtitle || cache[39] !== trustButtons) trustDialog = M6.jsx(Jn, {
      title: "Trust this directory?",
      subtitle: trustSubtitle,
      onCancel: onCancelTrust,
      children: trustButtons
    }), cache[38] = trustSubtitle, cache[39] = trustButtons, cache[40] = trustDialog;else trustDialog = cache[40];
    return trustDialog;
  }
  let submitLabel = submitting ? "Adding…" : "Add server",
    form;
  if (cache[41] !== fields || cache[42] !== onSubmit || cache[43] !== onCancel || cache[44] !== onChange || cache[45] !== submitLabel || cache[46] !== values) form = M6.jsx(T0e, {
    title: "New Remote Control server",
    subtitle: "Make a directory available on claude.ai/code and the Claude mobile app",
    fields: fields,
    values: values,
    onChange: onChange,
    onSubmit: onSubmit,
    onCancel: onCancel,
    submitLabel: submitLabel
  }), cache[41] = fields, cache[42] = onSubmit, cache[43] = onCancel, cache[44] = onChange, cache[45] = submitLabel, cache[46] = values, cache[47] = form;else form = cache[47];
  return form;
}
// FIXME: unverified name
/** Hint text describing the selected spawn mode. */
function eCm(mode: any): any {
  return mode === "worktree" ? "Each session gets its own git worktree (requires a git repo)." : "All sessions share the directory.";
}
var xDo, iSe, oGe, M6;
var EUl = b(() => {
  lt();
  fC();
  Ol();
  d_();
  di();
  G$t();
  ff();
  TVt();
  dne();
  hPe();
  EJn();
  je();
  tr();
  Ct();
  vn();
  tge();
  xDo = x(tt(), 1), iSe = require("path"), oGe = x(et(), 1), M6 = x(oe(), 1);
});

export {TUl,SUl,bUl,eCm,xDo,iSe,oGe,M6,EUl};
