// @ts-nocheck
import {Yt as r_,Es as u9} from "../../vendor/m641.ts";
import {logEvent as c,kt as v_} from "../../vendor/m132.ts";
import {Ne as dH} from "../../vendor/m583.ts";
import {logForDebugging as y,qe as UH} from "../config/0236_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
import {Ir as l8} from "../../vendor/m584.ts";
// @ts-nocheck
function isInternalBuildEnvironment() {
  let scriptPath = process.argv[1] || "",
    execPath = process.execPath || process.argv[0] || "";
  if (r_() === "windows") scriptPath = scriptPath.split($$_.win32.sep).join($$_.posix.sep), execPath = execPath.split($$_.win32.sep).join($$_.posix.sep);
  let pathsToCheck = [scriptPath, execPath],
    internalBuildPrefixes = ["/build-ant/", "/build-external/", "/build-external-native/", "/build-ant-native/"];
  return pathsToCheck.some(p => internalBuildPrefixes.some(prefix => p.includes(prefix)));
}
function isKnownInternalWarning(warningName, warningMessage) {
  let combined = `${warningName}: ${warningMessage}`;
  return warningMessageFilters.some(pattern => pattern.test(combined));
}
function installWarningListener() {
  let warningCountByKey = new Map();
  if (!isInternalBuildEnvironment()) process.removeAllListeners("warning");
  let onWarning = warningObj => {
    try {
      if (uyq.types.isProxy(warningObj) || !uyq.types.isNativeError(warningObj)) return;
      let msgDescriptor = Object.getOwnPropertyDescriptor(warningObj, "message"),
        message = msgDescriptor && typeof msgDescriptor.value === "string" ? msgDescriptor.value : "",
        nameDescriptor = Object.getOwnPropertyDescriptor(warningObj, "name"),
        name = nameDescriptor && typeof nameDescriptor.value === "string" ? nameDescriptor.value : "Error",
        dedupeKey = `${name}: ${message.slice(0, 50)}`,
        currentCount = warningCountByKey.get(dedupeKey) || 0;
      if (warningCountByKey.has(dedupeKey) || warningCountByKey.size < MAX_WARNING_DEDUPE_ENTRIES) warningCountByKey.set(dedupeKey, currentCount + 1);
      let isInternal = isKnownInternalWarning(name, message);
      if (c("tengu_node_warning", {
        is_internal: isInternal ? 1 : 0,
        occurrence_count: currentCount + 1,
        classname: name,
        ...false
      }), dH.CLAUDE_DEBUG) y(`${isInternal ? "[Internal Warning]" : "[Warning]"} ${name}: ${message}`, {
        level: "warn"
      });
    } catch {}
  };
  return process.on("warning", onWarning), {
    uninstall() {
      process.removeListener("warning", onWarning);
    }
  };
}
var $$_,
  uyq,
  MAX_WARNING_DEDUPE_ENTRIES = 1000,
  warningMessageFilters;
var warningListenerLazyInit = L(() => {
  v_();
  UH();
  l8();
  u9();
  $$_ = require("path"), uyq = require("util");
  warningMessageFilters = [/MaxListenersExceededWarning.*AbortSignal/, /MaxListenersExceededWarning.*EventTarget/];
});
export {isInternalBuildEnvironment as tKm,isKnownInternalWarning as rKm,installWarningListener as ppc,$$_ as Wyt,uyq as U2o,MAX_WARNING_DEDUPE_ENTRIES as eKm,warningMessageFilters as nKm,warningListenerLazyInit as mpc};
