// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Xr as i8} from "../../vendor/m321.ts";
import {Ri as N7,pi as Y7} from "./2227_userFacingName.ts";
import {Ql as v4,Fr as I8} from "../../vendor/m4405.ts";
import {Go as Qq,Pt as u_} from "../../vendor/m632.ts";
import {bt as G_,Pn as x6} from "../../vendor/m195.ts";
import {mc as w1,moe as a8H,CB as IS} from "../config/0645_maxBytes.ts";
import {ws as Z9,jt as n_} from "../../vendor/m228.ts";
import {cLa as sZK,lLa as aZK} from "../config/3916_baseDir.ts";
import {Iu as Z5,Ds as k9,w7e as ElH} from "../../vendor/m643.ts";
import {nA as S$,checkReadPermissionForTool as eHH} from "../permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {X2e as tbH,oW as CQ} from "../../vendor/m2778.ts";
import {VR as LZ,yu as E5,KBr as SB8,Jhi as VV7} from "../../vendor/m2249.ts";
import {yLa as $GK,ALa as KGK,lio as f8q,hLa as OGK,gLa as TGK,_La as zGK} from "../tui/3919_pattern.ts";
import {we as yH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
// @ts-nocheck
var globInputSchema, globOutputSchema, $u;
var globToolModule = L(() => {
  i8();
  N7();
  v4();
  Qq();
  G_();
  w1();
  Z9();
  sZK();
  Z5();
  S$();
  tbH();
  LZ();
  $GK();
  globInputSchema = yH(() => k.strictObject({
    pattern: k.string().describe("The glob pattern to match files against"),
    path: k.string().optional().describe('The directory to search in. If not specified, the current working directory will be used. IMPORTANT: Omit this field to use the default directory. DO NOT enter "undefined" or "null" - simply omit it for the default behavior. Must be a valid directory path if provided.')
  })), globOutputSchema = yH(() => k.object({
    durationMs: k.number().describe("Time taken to execute the search in milliseconds"),
    numFiles: k.number().describe("Total number of files found"),
    filenames: k.array(k.string()).describe("Array of file paths that match the pattern"),
    truncated: k.boolean().describe("Whether results were truncated (limited to 100 files)")
  })), $u = Y7({
    name: E5,
    searchHint: "find files by name pattern or wildcard",
    maxResultSizeChars: 1e5,
    async description() {
      return SB8;
    },
    userFacingName: KGK,
    getToolUseSummary: f8q,
    getActivityDescription(H) {
      let _ = f8q(H);
      return _ ? `Finding ${_}` : "Finding files";
    },
    get inputSchema() {
      return globInputSchema();
    },
    get outputSchema() {
      return globOutputSchema();
    },
    isConcurrencySafe() {
      return true;
    },
    isReadOnly() {
      return true;
    },
    toAutoClassifierInput(H) {
      return H.pattern;
    },
    isSearchOrReadCommand() {
      return {
        isSearch: true,
        isRead: false
      };
    },
    ruleContentField: "path",
    getPath({
      path: H
    }) {
      return H ? k9(H) : u_();
    },
    async preparePermissionMatcher({
      pattern: H
    }) {
      return _ => CQ(_, H);
    },
    async validateInput({
      path: H
    }) {
      if (H) {
        let _ = n_(),
          q = k9(H);
        if (q.startsWith("\\\\") || q.startsWith("//")) return {
          result: true
        };
        let K;
        try {
          K = await _.stat(q);
        } catch (O) {
          if (x6(O)) {
            let T = await a8H(q),
              z = `Directory does not exist: ${H}. ${IS} ${u_()}.`;
            if (T) z += ` Did you mean ${T}?`;
            return {
              result: false,
              message: z,
              errorCode: 1
            };
          }
          throw O;
        }
        if (!K.isDirectory()) return {
          result: false,
          message: `Path is not a directory: ${H}`,
          errorCode: 2
        };
      }
      return {
        result: true
      };
    },
    async checkPermissions(H, _) {
      return eHH($u, H, I8(_));
    },
    async prompt({
      model: H
    }) {
      return VV7(H);
    },
    renderToolUseMessage: OGK,
    renderToolUseErrorMessage: TGK,
    renderToolResultMessage: zGK,
    extractSearchText({
      filenames: H
    }) {
      return H.join(`
`);
    },
    async call(H, _) {
      let {
          abortController: q,
          globLimits: K
        } = _,
        O = Date.now(),
        T = K?.maxResults ?? 100,
        {
          files: z,
          truncated: $
        } = await aZK(H.pattern, $u.getPath(H), {
          limit: T,
          offset: 0
        }, q.signal, I8(_)),
        Y = z.map(ElH);
      return {
        data: {
          filenames: Y,
          durationMs: Date.now() - O,
          numFiles: Y.length,
          truncated: $
        }
      };
    },
    mapToolResultToToolResultBlockParam(H, _) {
      if (H.filenames.length === 0) return {
        tool_use_id: _,
        type: "tool_result",
        content: "No files found"
      };
      return {
        tool_use_id: _,
        type: "tool_result",
        content: [...H.filenames, ...(H.truncated ? ["(Results are truncated. Consider using a more specific path or pattern.)"] : [])].join(`
`)
      };
    }
  });
});

export {globInputSchema as KTp,globOutputSchema as zTp,$u as T9,globToolModule as $4e};
