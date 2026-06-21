// @ts-nocheck
import {fs as O9} from "../api/0459_getOauthConfig.ts";
import {execFileNoThrowWithCwd as Q8,oa as a7} from "../../vendor/m684.ts";
import {logForDebugging as N,qe as gH} from "../config/0234_setHasFormattedOutput.ts";
import {Lpo as R5q,EWa as vUK,CWa as EUK,wWa as CUK,Mpo as L5q,RWa as bUK,xWa as IUK,kWa as xUK,HWa as uUK} from "../../vendor/m4251.ts";
import {b as L,M as x} from "../../runtime.ts";
import {Xr as i8} from "../../vendor/m321.ts";
import {Kae as VKH,_sa as N_K,Iot as h8_,ysa as V_K,mke as S0H} from "../../vendor/m3247.ts";
import {Ri as N7,pi as Y7} from "./2227_userFacingName.ts";
import {Ql as v4,Fr as I8} from "../../vendor/m4405.ts";
import {Go as Qq,Pt as u_} from "../../vendor/m632.ts";
import {bt as G_,Pn as x6,_o as Dq} from "../../vendor/m195.ts";
import {ws as Z9,jt as n_} from "../../vendor/m228.ts";
import {Rn as C6,De as CH} from "../session/0615_length.ts";
import {Iu as Z5,Ds as k9} from "../../vendor/m643.ts";
import {nA as S$,checkReadPermissionForTool as eHH} from "../permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {DWa as pUK,IWa as mUK} from "../../vendor/m4252.ts";
import {$Wa as nUK,NWa as QUK,BWa as cUK,FWa as dUK,UWa as lUK} from "../core/4255_operation.ts";
import {we as yH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
import {Glt as VK_,Vso as s6q} from "../../vendor/m3908.ts";
// @ts-nocheck
function buildLspRequest(input, absoluteFilePath) {
  let fileUri = oUK.pathToFileURL(absoluteFilePath).href,
    position = {
      line: input.line - 1,
      character: input.character - 1
    };
  switch (input.operation) {
    case "goToDefinition":
      return {
        method: "textDocument/definition",
        params: {
          textDocument: {
            uri: fileUri
          },
          position: position
        }
      };
    case "findReferences":
      return {
        method: "textDocument/references",
        params: {
          textDocument: {
            uri: fileUri
          },
          position: position,
          context: {
            includeDeclaration: true
          }
        }
      };
    case "hover":
      return {
        method: "textDocument/hover",
        params: {
          textDocument: {
            uri: fileUri
          },
          position: position
        }
      };
    case "documentSymbol":
      return {
        method: "textDocument/documentSymbol",
        params: {
          textDocument: {
            uri: fileUri
          }
        }
      };
    case "workspaceSymbol":
      return {
        method: "workspace/symbol",
        params: {
          query: input.query ?? ""
        }
      };
    case "goToImplementation":
      return {
        method: "textDocument/implementation",
        params: {
          textDocument: {
            uri: fileUri
          },
          position: position
        }
      };
    case "prepareCallHierarchy":
      return {
        method: "textDocument/prepareCallHierarchy",
        params: {
          textDocument: {
            uri: fileUri
          },
          position: position
        }
      };
    case "incomingCalls":
      return {
        method: "textDocument/prepareCallHierarchy",
        params: {
          textDocument: {
            uri: fileUri
          },
          position: position
        }
      };
    case "outgoingCalls":
      return {
        method: "textDocument/prepareCallHierarchy",
        params: {
          textDocument: {
            uri: fileUri
          },
          position: position
        }
      };
  }
}
function countDocumentSymbols(symbols) {
  let total = symbols.length;
  for (let sym of symbols) if (sym.children && sym.children.length > 0) total += countDocumentSymbols(sym.children);
  return total;
}
function countUniqueFiles(locations) {
  return new Set(locations.map(loc => loc.uri)).size;
}
function fileUriToLocalPath(uri) {
  let path = uri.replace(/^file:\/\//, "");
  if (/^\/[A-Za-z]:/.test(path)) path = path.slice(1);
  try {
    path = decodeURIComponent(path);
  } catch {}
  return path;
}
async function filterGitIgnoredLocations(locations, cwd) {
  if (locations.length === 0) return locations;
  let uriToPathMap = new Map();
  for (let loc of locations) if (loc.uri && !uriToPathMap.has(loc.uri)) uriToPathMap.set(loc.uri, fileUriToLocalPath(loc.uri));
  let allPaths = O9(uriToPathMap.values());
  if (allPaths.length === 0) return locations;
  let ignoredPaths = new Set(),
    batchSize = 50;
  for (let i = 0; i < allPaths.length; i += batchSize) {
    let batch = allPaths.slice(i, i + batchSize),
      result = await Q8("git", ["check-ignore", ...batch], {
        cwd: cwd,
        preserveOutputOnError: false,
        timeout: 5000
      });
    if (result.code === 0 && result.stdout) for (let line of result.stdout.split(`
`)) {
      let trimmed = line.trim();
      if (trimmed) ignoredPaths.add(trimmed);
    }
  }
  if (ignoredPaths.size === 0) return locations;
  return locations.filter(loc => {
    let localPath = uriToPathMap.get(loc.uri);
    return !localPath || !ignoredPaths.has(localPath);
  });
}
function isLocationLink(loc) {
  return "targetUri" in loc;
}
function normalizeLocation(loc) {
  if (isLocationLink(loc)) return {
    uri: loc.targetUri,
    range: loc.targetSelectionRange || loc.targetRange
  };
  return loc;
}
function formatLspResult(operation, rawResult, filePath) {
  switch (operation) {
    case "goToDefinition":
      {
        let locations = (Array.isArray(rawResult) ? rawResult : rawResult ? [rawResult] : []).map(normalizeLocation),
          missing = locations.filter(loc => !loc || !loc.uri);
        if (missing.length > 0) N(`LSP server returned ${missing.length} location(s) with undefined URI for goToDefinition on ${filePath}. This indicates malformed data from the LSP server.`, {
          level: "error"
        });
        let valid = locations.filter(loc => loc && loc.uri);
        return {
          formatted: R5q(rawResult, filePath),
          resultCount: valid.length,
          fileCount: countUniqueFiles(valid)
        };
      }
    case "findReferences":
      {
        let locs = rawResult || [],
          missing = locs.filter(loc => !loc || !loc.uri);
        if (missing.length > 0) N(`LSP server returned ${missing.length} location(s) with undefined URI for findReferences on ${filePath}. This indicates malformed data from the LSP server.`, {
          level: "error"
        });
        let valid = locs.filter(loc => loc && loc.uri);
        return {
          formatted: vUK(rawResult, filePath),
          resultCount: valid.length,
          fileCount: countUniqueFiles(valid)
        };
      }
    case "hover":
      return {
        formatted: EUK(rawResult, filePath),
        resultCount: rawResult ? 1 : 0,
        fileCount: rawResult ? 1 : 0
      };
    case "documentSymbol":
      {
        let syms = rawResult || [],
          count = syms.length > 0 && syms[0] && "range" in syms[0] ? countDocumentSymbols(syms) : syms.length;
        return {
          formatted: CUK(rawResult, filePath),
          resultCount: count,
          fileCount: syms.length > 0 ? 1 : 0
        };
      }
    case "workspaceSymbol":
      {
        let syms = rawResult || [],
          missing = syms.filter(s => !s || !s.location || !s.location.uri);
        if (missing.length > 0) N(`LSP server returned ${missing.length} symbol(s) with undefined location URI for workspaceSymbol on ${filePath}. This indicates malformed data from the LSP server.`, {
          level: "error"
        });
        let valid = syms.filter(s => s && s.location && s.location.uri),
          locs = valid.map(s => s.location);
        return {
          formatted: L5q(rawResult, filePath),
          resultCount: valid.length,
          fileCount: countUniqueFiles(locs)
        };
      }
    case "goToImplementation":
      {
        let locations = (Array.isArray(rawResult) ? rawResult : rawResult ? [rawResult] : []).map(normalizeLocation),
          missing = locations.filter(loc => !loc || !loc.uri);
        if (missing.length > 0) N(`LSP server returned ${missing.length} location(s) with undefined URI for goToImplementation on ${filePath}. This indicates malformed data from the LSP server.`, {
          level: "error"
        });
        let valid = locations.filter(loc => loc && loc.uri);
        return {
          formatted: R5q(rawResult, filePath),
          resultCount: valid.length,
          fileCount: countUniqueFiles(valid)
        };
      }
    case "prepareCallHierarchy":
      {
        let items = rawResult || [];
        return {
          formatted: bUK(rawResult, filePath),
          resultCount: items.length,
          fileCount: items.length > 0 ? countCallHierarchyFiles(items) : 0
        };
      }
    case "incomingCalls":
      {
        let items = rawResult || [];
        return {
          formatted: IUK(rawResult, filePath),
          resultCount: items.length,
          fileCount: items.length > 0 ? countIncomingCallFiles(items) : 0
        };
      }
    case "outgoingCalls":
      {
        let items = rawResult || [];
        return {
          formatted: xUK(rawResult, filePath),
          resultCount: items.length,
          fileCount: items.length > 0 ? countOutgoingCallFiles(items) : 0
        };
      }
  }
}
function countCallHierarchyFiles(items) {
  let uris = items.map(item => item.uri).filter(uri => uri);
  return new Set(uris).size;
}
function countIncomingCallFiles(items) {
  let uris = items.map(item => item.from?.uri).filter(uri => uri);
  return new Set(uris).size;
}
function countOutgoingCallFiles(items) {
  let uris = items.map(item => item.to?.uri).filter(uri => uri);
  return new Set(uris).size;
}
var rUK,
  h5q,
  oUK,
  CGO = 1e7,
  bGO,
  IGO,
  k5q;
var sUK = L(() => {
  i8();
  VKH();
  N7();
  v4();
  Qq();
  gH();
  G_();
  a7();
  Z9();
  C6();
  Z5();
  S$();
  uUK();
  pUK();
  nUK();
  rUK = require("fs/promises"), h5q = x(require("path")), oUK = require("url"), bGO = yH(() => k.strictObject({
    operation: k.enum(["goToDefinition", "findReferences", "hover", "documentSymbol", "workspaceSymbol", "goToImplementation", "prepareCallHierarchy", "incomingCalls", "outgoingCalls"]).describe("The LSP operation to perform"),
    filePath: k.string().describe("The absolute or relative path to the file"),
    line: k.number().int().positive().describe("The line number (1-based, as shown in editors)"),
    character: k.number().int().positive().describe("The character offset (1-based, as shown in editors)"),
    query: k.string().optional().describe("The symbol name or partial name to search for (workspaceSymbol only). Most language servers return no results for an empty query, so always provide it when using workspaceSymbol.")
  })), IGO = yH(() => k.object({
    operation: k.enum(["goToDefinition", "findReferences", "hover", "documentSymbol", "workspaceSymbol", "goToImplementation", "prepareCallHierarchy", "incomingCalls", "outgoingCalls"]).describe("The LSP operation that was performed"),
    result: k.string().describe("The formatted result of the LSP operation"),
    filePath: k.string().describe("The file path the operation was performed on"),
    resultCount: k.number().int().nonnegative().optional().describe("Number of results (definitions, references, symbols)"),
    fileCount: k.number().int().nonnegative().optional().describe("Number of files containing results")
  })), k5q = Y7({
    name: VK_,
    searchHint: "code intelligence (definitions, references, symbols, hover)",
    maxResultSizeChars: 1e5,
    isLsp: true,
    async description() {
      return s6q;
    },
    userFacingName: QUK,
    shouldDefer: true,
    isEnabled() {
      return N_K();
    },
    get inputSchema() {
      return bGO();
    },
    get outputSchema() {
      return IGO();
    },
    isConcurrencySafe() {
      return true;
    },
    isReadOnly() {
      return true;
    },
    ruleContentField: "filePath",
    getPath({
      filePath: H
    }) {
      return k9(H);
    },
    async validateInput(H) {
      let _ = mUK().safeParse(H);
      if (!_.success) return {
        result: false,
        message: `Invalid input: ${_.error.message}`,
        errorCode: 3
      };
      let q = n_(),
        K = k9(H.filePath);
      if (K.startsWith("\\\\") || K.startsWith("//")) return {
        result: true
      };
      let O;
      try {
        O = await q.stat(K);
      } catch (T) {
        if (x6(T)) return {
          result: false,
          message: `File does not exist: ${H.filePath}`,
          errorCode: 1
        };
        let z = Dq(T);
        return N(`Failed to access file stats for LSP operation on ${H.filePath}: ${z.message}`, {
          level: "error"
        }), {
          result: false,
          message: `Cannot access file: ${H.filePath}. ${z.message}`,
          errorCode: 4
        };
      }
      if (!O.isFile()) return {
        result: false,
        message: `Path is not a file: ${H.filePath}`,
        errorCode: 2
      };
      return {
        result: true
      };
    },
    async checkPermissions(H, _) {
      return eHH(k5q, H, I8(_));
    },
    async prompt() {
      return s6q;
    },
    renderToolUseMessage: cUK,
    renderToolUseErrorMessage: dUK,
    renderToolResultMessage: lUK,
    async call(H, _) {
      let q = k9(H.filePath),
        K = u_();
      if (h8_().status === "pending") await V_K();
      let T = S0H();
      if (!T) return CH(Error("LSP server manager not initialized when tool was called")), {
        data: {
          operation: H.operation,
          result: "LSP server manager not initialized. This may indicate a startup issue.",
          filePath: H.filePath
        }
      };
      let {
        method: z,
        params: $
      } = buildLspRequest(H, q);
      try {
        if (!T.isFileOpen(q)) {
          let J = await rUK.open(q, "r");
          try {
            let D = await J.stat();
            if (D.size > CGO) return {
              data: {
                operation: H.operation,
                result: `File too large for LSP analysis (${Math.ceil(D.size / 1e6)}MB exceeds 10MB limit)`,
                filePath: H.filePath
              }
            };
            let M = await J.readFile({
              encoding: "utf-8"
            });
            await T.openFile(q, M);
          } finally {
            await J.close();
          }
        }
        let Y = await T.sendRequest(q, z, $);
        if (Y === undefined) return N(`No LSP server available for file type ${h5q.extname(q)} for operation ${H.operation} on file ${H.filePath}`), {
          data: {
            operation: H.operation,
            result: `No LSP server available for file type: ${h5q.extname(q)}`,
            filePath: H.filePath
          }
        };
        if (H.operation === "incomingCalls" || H.operation === "outgoingCalls") {
          let J = Y;
          if (!J || J.length === 0) return {
            data: {
              operation: H.operation,
              result: "No call hierarchy item found at this position",
              filePath: H.filePath,
              resultCount: 0,
              fileCount: 0
            }
          };
          let D = H.operation === "incomingCalls" ? "callHierarchy/incomingCalls" : "callHierarchy/outgoingCalls";
          if (Y = await T.sendRequest(q, D, {
            item: J[0]
          }), Y === undefined) N(`LSP server returned undefined for ${D} on ${H.filePath}`);
        }
        if (Y && Array.isArray(Y) && (H.operation === "findReferences" || H.operation === "goToDefinition" || H.operation === "goToImplementation" || H.operation === "workspaceSymbol")) if (H.operation === "workspaceSymbol") {
          let J = Y,
            D = J.filter(P => P?.location?.uri).map(P => P.location),
            M = await filterGitIgnoredLocations(D, K),
            X = new Set(M.map(P => P.uri));
          Y = J.filter(P => !P?.location?.uri || X.has(P.location.uri));
        } else {
          let J = Y.map(normalizeLocation),
            D = await filterGitIgnoredLocations(J, K),
            M = new Set(D.map(X => X.uri));
          Y = Y.filter(X => {
            let P = normalizeLocation(X);
            return !P.uri || M.has(P.uri);
          });
        }
        let {
          formatted: A,
          resultCount: w,
          fileCount: f
        } = formatLspResult(H.operation, Y, K);
        return {
          data: {
            operation: H.operation,
            result: A,
            filePath: H.filePath,
            resultCount: w,
            fileCount: f
          }
        };
      } catch (Y) {
        let w = Dq(Y).message;
        return N(`LSP tool request failed for ${H.operation} on ${H.filePath}: ${w}`, {
          level: "error"
        }), {
          data: {
            operation: H.operation,
            result: `Error performing ${H.operation}: ${w}`,
            filePath: H.filePath
          }
        };
      }
    },
    mapToolResultToToolResultBlockParam(H, _) {
      return {
        tool_use_id: _,
        type: "tool_result",
        content: H.result
      };
    }
  });
});

export {buildLspRequest as LOp,countDocumentSymbols as GWa,countUniqueFiles as Z3n,fileUriToLocalPath as MOp,filterGitIgnoredLocations as qWa,isLocationLink as NOp,normalizeLocation as e4n,formatLspResult as BOp,countCallHierarchyFiles as FOp,countIncomingCallFiles as UOp,countOutgoingCallFiles as $Op,rUK as jWa,h5q as Npo,oUK as WWa,CGO as DOp,bGO as POp,IGO as OOp,k5q as Bpo,sUK as VWa};
