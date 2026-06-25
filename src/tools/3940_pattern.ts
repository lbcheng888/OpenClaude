// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Qr as i8} from "../../vendor/m323.ts";
import {ri as N7,Ks as Y7} from "./2235_userFacingName.ts";
import {xl as v4,Mr as I8} from "../../vendor/m4427.ts";
import {Po as Qq,isTmuxControlMode as u_} from "../../vendor/m638.ts";
import {Ct as G_,In as x6} from "../../vendor/m197.ts";
import {Xl as w1,doe as a8H,KN as IS} from "../config/0651_maxBytes.ts";
import {ps as Z9,Wt as n_} from "../../vendor/m230.ts";
import {xUa as sZK,IUa as aZK} from "../config/3936_baseDir.ts";
import {Tu as Z5,hs as k9,Cje as ElH} from "../../vendor/m649.ts";
import {Xm as S$,checkReadPermissionForTool as eHH} from "../permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {o9e as tbH,TW as CQ} from "../../vendor/m2790.ts";
import {ow as LZ,su as E5,A9r as SB8,XEi as VV7} from "../../vendor/m2257.ts";
import {$Ua as $GK,NUa as KGK,ndo as f8q,FUa as OGK,BUa as TGK,UUa as zGK} from "../core/3939_pattern.ts";
import {ve as yH} from "../../vendor/m461.ts";
import {C as k} from "../../vendor/m321.ts";
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
export {globInputSchema as dHp,globOutputSchema as pHp,$u as getActiveWorktree,globToolModule as r6e};
