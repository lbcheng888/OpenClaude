// @ts-nocheck
import {_o as Dq,bt as L_} from "../../vendor/m195.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {Ora as Ga7,yot as X6_} from "../../vendor/m3223.ts";
import {Oe as IH,Ie as vH,ln as M6} from "./0594_feature_name.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {b as L} from "../../runtime.ts";
// LSP diagnostic severity mapping and publishDiagnostics handler registration.
// Subsystem: telemetry / LSP diagnostics delivery (tengu_lsp_diagnostics_* events).

// ---------------------------------------------------------------------------
// Types (inferred from usage)
// ---------------------------------------------------------------------------

interface LspPosition {
  line: number;
  character: number;
}

interface LspRange {
  start: LspPosition;
  end: LspPosition;
}

/** Raw LSP diagnostic as received from the server. */
interface LspDiagnostic {
  message: string;
  severity: number;
  range: LspRange;
  source?: string;
  code?: number | string | null;
}

/** Raw LSP publishDiagnostics params. */
interface PublishDiagnosticsParams {
  uri: string;
  version?: number;
  diagnostics: LspDiagnostic[];
}

/** Normalized diagnostic entry used internally. */
interface NormalizedDiagnostic {
  message: string;
  severity: string;
  range: LspRange;
  source?: string;
  code?: string;
}

/** Normalized diagnostics file entry. */
interface DiagnosticsFile {
  uri: string;
  diagnostics: NormalizedDiagnostic[];
}

/** Per-server error tracking state for consecutive failures. */
interface ServerErrorState {
  count: number;
  lastError: string;
}

/** Registration error entry for one LSP server. */
interface RegistrationError {
  serverName: string;
  error: string;
}

/** Return value of qt7 — summary of handler registration across all servers. */
interface DiagnosticsRegistrationResult {
  totalServers: number;
  successCount: number;
  registrationErrors: RegistrationError[];
  diagnosticFailures: Map<string, ServerErrorState>;
}

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

/**
 * Converts an LSP diagnostic severity integer (1-4) to its human-readable name.
 * Defaults to "Error" for unknown values.
 */
function DS3(severityCode: number): string {
  switch (severityCode) {
    case 1:
      return "Error";
    case 2:
      return "Warning";
    case 3:
      return "Info";
    case 4:
      return "Hint";
    default:
      return "Error";
  }
}

/**
 * Normalizes a raw LSP publishDiagnostics params object into the internal
 * DiagnosticsFile format, converting file:// URIs to local paths.
 */
function MS3(params: PublishDiagnosticsParams): DiagnosticsFile[] {
  let filePath: string;
  try {
    filePath = params.uri.startsWith("file://") ? _t7.fileURLToPath(params.uri) : params.uri;
  } catch (err) {
    let normalizedErr = Dq(err);
    N(`Failed to convert URI to file path: ${params.uri}. Error: ${normalizedErr.message}. Using original URI as fallback.`, {
      level: "error"
    }), filePath = params.uri;
  }
  let normalizedDiagnostics = params.diagnostics.map(diag => ({
    message: diag.message,
    severity: DS3(diag.severity),
    range: {
      start: {
        line: diag.range.start.line,
        character: diag.range.start.character
      },
      end: {
        line: diag.range.end.line,
        character: diag.range.end.character
      }
    },
    source: diag.source,
    code: diag.code !== void 0 && diag.code !== null ? String(diag.code) : void 0
  }));
  return [{
    uri: filePath,
    diagnostics: normalizedDiagnostics
  }];
}

/**
 * Registers `textDocument/publishDiagnostics` notification handlers on every
 * active LSP server returned by `mcpClient.getAllServers()`.  Emits telemetry
 * events for disabled/failed servers and returns a registration summary.
 */
function qt7(mcpClient: {
  getAllServers(): Map<string, any>;
  getDocumentVersion(uri: string): number | undefined;
}): DiagnosticsRegistrationResult {
  let servers = mcpClient.getAllServers(),
    registrationErrors: RegistrationError[] = [],
    successCount = 0,
    diagnosticFailures = new Map<string, ServerErrorState>(),
    disabledCount = 0;
  for (let [serverName, serverInstance] of servers.entries()) try {
    if (serverInstance?.config?.diagnostics === !1) {
      N(`Diagnostics disabled for ${serverName}, skipping`), disabledCount++;
      continue;
    }
    if (!serverInstance || typeof serverInstance.onNotification !== "function") {
      let reason = !serverInstance ? "Server instance is null/undefined" : "Server instance has no onNotification method";
      registrationErrors.push({
        serverName: serverName,
        error: reason
      });
      let registrationErr = Error(`${reason} for ${serverName}`);
      EH(registrationErr), N(`Skipping handler registration for ${serverName}: ${reason}`);
      continue;
    }
    serverInstance.onNotification("textDocument/publishDiagnostics", (notifParams: unknown) => {
      N(`[PASSIVE DIAGNOSTICS] Handler invoked for ${serverName}! Params type: ${typeof notifParams}`);
      try {
        if (!notifParams || typeof notifParams !== "object" || !("uri" in notifParams) || !("diagnostics" in notifParams)) {
          N(`LSP server ${serverName} sent invalid diagnostic params (missing uri or diagnostics): ${bH(notifParams)}`, {
            level: "error"
          });
          return;
        }
        let typedParams = notifParams as PublishDiagnosticsParams;
        if (N(`Received diagnostics from ${serverName}: ${typedParams.diagnostics.length} diagnostic(s) for ${typedParams.uri}`), typedParams.version !== void 0) {
          let currentVersion = mcpClient.getDocumentVersion(typedParams.uri);
          if (currentVersion !== void 0 && typedParams.version < currentVersion) {
            N(`LSP Diagnostics: Dropping stale publishDiagnostics from ${serverName} for ${typedParams.uri} (server v${typedParams.version} < current v${currentVersion})`);
            return;
          }
        }
        let diagnosticFiles = MS3(typedParams),
          firstFile = diagnosticFiles[0];
        if (!firstFile || diagnosticFiles.length === 0 || firstFile.diagnostics.length === 0) {
          N(`Skipping empty diagnostics from ${serverName} for ${typedParams.uri}`);
          return;
        }
        try {
          Ga7({
            serverName: serverName,
            files: diagnosticFiles
          }), N(`LSP Diagnostics: Registered ${diagnosticFiles.length} diagnostic file(s) from ${serverName} for async delivery`), diagnosticFailures.delete(serverName);
        } catch (registerErr) {
          let normalizedRegisterErr = Dq(registerErr);
          EH(normalizedRegisterErr), N(`Error registering LSP diagnostics from ${serverName}: URI: ${typedParams.uri}, Diagnostic count: ${firstFile.diagnostics.length}, Error: ${normalizedRegisterErr.message}`);
          let serverState = diagnosticFailures.get(serverName) || {
            count: 0,
            lastError: ""
          };
          if (serverState.count++, serverState.lastError = normalizedRegisterErr.message, diagnosticFailures.set(serverName, serverState), serverState.count >= 3) N(`WARNING: LSP diagnostic handler for ${serverName} has failed ${serverState.count} times consecutively. Last error: ${serverState.lastError}. This may indicate a problem with the LSP server or diagnostic processing. Check logs for details.`);
        }
      } catch (outerErr) {
        let normalizedOuterErr = Dq(outerErr);
        N(`Unexpected error processing diagnostics from ${serverName}: ${normalizedOuterErr.message}`, {
          level: "error"
        });
        let serverState = diagnosticFailures.get(serverName) || {
          count: 0,
          lastError: ""
        };
        if (serverState.count++, serverState.lastError = normalizedOuterErr.message, diagnosticFailures.set(serverName, serverState), serverState.count >= 3) N(`WARNING: LSP diagnostic handler for ${serverName} has failed ${serverState.count} times consecutively. Last error: ${serverState.lastError}. This may indicate a problem with the LSP server or diagnostic processing. Check logs for details.`);
      }
    }), N(`Registered diagnostics handler for ${serverName}`), successCount++;
  } catch (handlerErr) {
    let normalizedHandlerErr = Dq(handlerErr);
    registrationErrors.push({
      serverName: serverName,
      error: normalizedHandlerErr.message
    }), N(`Failed to register diagnostics handler for ${serverName}: Error: ${normalizedHandlerErr.message}`, {
      level: "error"
    }), IH("lsp_diagnostics_register", "lsp_diagnostics_register_failed");
  }
  let totalServers = servers.size;
  if (disabledCount > 0) c("tengu_lsp_diagnostics_disabled", {
    disabled_count: disabledCount,
    total_servers: totalServers
  });
  if (registrationErrors.length > 0) {
    let failedList = registrationErrors.map(entry => `${entry.serverName} (${entry.error})`).join(", ");
    N(`LSP notification handler registration: ${successCount}/${totalServers} succeeded. Failed servers: ${failedList}. Diagnostics from failed servers will not be delivered.`, {
      level: "error"
    });
  } else N(`LSP notification handlers registered successfully for all ${totalServers} server(s)`), vH("lsp_diagnostics_register");
  return {
    totalServers: totalServers,
    successCount: successCount,
    registrationErrors: registrationErrors,
    diagnosticFailures: diagnosticFailures
  };
}

var _t7: typeof import("url");
var Kt7 = L(() => {
  FH();
  L_();
  S6();
  H6();
  M6();
  y_();
  X6_();
  _t7 = require("url");
});

export {DS3 as N6d,MS3 as B6d,qt7 as hsa,_t7 as Asa,Kt7 as gsa};
