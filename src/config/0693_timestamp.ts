// @ts-nocheck
import {Wt as jt,ps as bs} from "../../vendor/m230.ts";
import {TeamDeleteToolName as Oe,tn as Xt} from "./0230_encoding.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function logDiagnosticEntry(level, event, data) {
  let filePath = getDiagnosticsFilePath();
  if (!filePath) return;
  let entry = {
      timestamp: new Date().toISOString(),
      level: level,
      event: event,
      data: data ?? {}
    },
    fs = jt(),
    line = Oe(entry) + `
`;
  try {
    fs.appendFileSync(filePath, line);
  } catch {
    try {
      fs.mkdirSync(pathModule.dirname(filePath)), fs.appendFileSync(filePath, line);
    } catch {}
  }
}
function getDiagnosticsFilePath() {
  return process.env.CLAUDE_CODE_DIAGNOSTICS_FILE;
}
async function trackDiagnosticEvent(name, fn, getMetadata) {
  let startTime = Date.now();
  logDiagnosticEntry("info", `${name}_started`);
  try {
    let result = await fn(),
      extraData = getMetadata ? getMetadata(result) : {};
    return logDiagnosticEntry("info", `${name}_completed`, {
      duration_ms: Date.now() - startTime,
      ...extraData
    }), result;
  } catch (err) {
    throw logDiagnosticEntry("error", `${name}_failed`, {
      duration_ms: Date.now() - startTime
    }), err;
  }
}
var pathModule;
var L$ = b(() => {
  bs();
  Xt();
  pathModule = require("path");
});
export {logDiagnosticEntry as wn,getDiagnosticsFilePath as Fiu,trackDiagnosticEvent as Oje,pathModule as fis,L$ as pf};
