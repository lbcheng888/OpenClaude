// @ts-nocheck
import {JTt as bgt,PP as pO,YL as MM} from "../../vendor/m123.ts";
import {b} from "../../runtime.ts";
/** Reads the CLAUDE_CODE_REMOTE_SESSION_ID env var and derives a session id from it. */
function Egt() {
  let remoteSessionId = process.env.CLAUDE_CODE_REMOTE_SESSION_ID?.trim();
  return remoteSessionId ? bgt(remoteSessionId, s2o) : null;
}
/** Parses a resume-argument (jsonl file path, plain session UUID, or URL) into a session descriptor. */
function etr(resumeArg: any) {
  if (resumeArg.toLowerCase().endsWith(".jsonl")) return {
    sessionId: o2o.randomUUID(),
    ingressUrl: null,
    isUrl: !1,
    jsonlFile: resumeArg,
    isJsonlFile: !0
  };
  if (pO(resumeArg)) return {
    sessionId: resumeArg,
    ingressUrl: null,
    isUrl: !1,
    jsonlFile: null,
    isJsonlFile: !1
  };
  try {
    let parsedUrl = new URL(resumeArg);
    return {
      sessionId: Egt() ?? bgt(parsedUrl.href, s2o),
      ingressUrl: parsedUrl.href,
      isUrl: !0,
      jsonlFile: null,
      isJsonlFile: !1
    };
  } catch {}
  return null;
}
var o2o: any,
  s2o = "3ab19d7e-9f35-45c2-926e-75e271cc60b3";
var SKt = b(() => {
  MM();
  o2o = require("crypto");
});
export {Egt as XTt,etr as Csr,o2o as Bqo,s2o as Uqo,SKt as YYt};
