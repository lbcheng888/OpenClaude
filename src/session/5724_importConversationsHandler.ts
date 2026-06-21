// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {qZ as nt,O5 as yg,jZ as it} from "../../vendor/m2510.ts";
import {ZO as xN,V4 as Dp} from "../telemetry/2512_error_name.ts";
import {qt as d_,Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {Oae as NWH,H$e as xk_} from "../../vendor/m3137.ts";
import {N2 as XI,$b as Qf,QT as Ij} from "../../vendor/m642.ts";
import {Q8t as YU_,Cxo as QMq} from "../../vendor/m5097.ts";
import {bgt as zj6,MM as PC} from "../../vendor/m126.ts";
import {st as q_} from "../../vendor/m5.ts";
import {Fs as p9,qU as Vu} from "../../vendor/m5131.ts";
import {sn as A6} from "../config/0047_namespace.ts";
/*
 * session/5679_importConversationsHandler.ts - session/transcript restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 */
var dH1 = {};
j_(dH1, {
  importConversationsHandler: (): any => importConversationsHandler,
  importConversations: (): any => importConversations
});
function VQ_(H: any): any {
  return H.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 128) || "file";
}
async function NQ_(H: any, _: any): Promise<any> {
  return Ma.writeFile(H, _, {
    mode: 384,
    flag: "wx"
  }).then((): any => !0, (q: any): any => {
    if (q.code !== "EEXIST") throw q;
    return !1;
  });
}
function CyT(H: any): any {
  return H.length >= 5 && H[0] === 37 && H[1] === 80 && H[2] === 68 && H[3] === 70 && H[4] === 45;
}
function byT(H: any, _: any): any {
  let q = H.content.find((T: any): any => T.type === "text")?.text ?? H.text,
    K = (H.attachments ?? []).map((T: any): any => `

<file name="${T.file_name}">
${T.extracted_content}
</file>`).join("");
  return (_.length > 0 ? `${_.join(`
`)}
` : "") + q + K;
}
async function IyT(H: any, cwd: any, sessionId: any, K: any): Promise<any> {
  let O = {
    parentUuid: H.parent_message_uuid ?? null,
    isSidechain: !1,
    uuid: H.uuid,
    timestamp: H.created_at,
    cwd: cwd,
    userType: "external",
    sessionId: sessionId,
    version: "claude-export-import"
  };
  if (H.sender === "human") {
    let z = [],
      $ = [];
    for (let w of H.files ?? []) {
      let f = K[w.file_uuid];
      if (!f) continue;
      let mediaType = nt(Buffer.from(f));
      if (mediaType) try {
        let {
          block: block
        } = await xN({
          data: Buffer.from(f),
          mediaType: mediaType,
          limits: yg
        });
        z.push(block);
      } catch {
        let J = `${w.file_uuid}-${VQ_(w.file_name)}`;
        $.push(`@"${kU.join(cwd, "files", J)}"`);
      } else if (CyT(f)) z.push({
        type: "document",
        source: {
          type: "base64",
          media_type: "application/pdf",
          data: Buffer.from(f).toString("base64")
        }
      });else {
        let J = `${w.file_uuid}-${VQ_(w.file_name)}`;
        $.push(`@"${kU.join(cwd, "files", J)}"`);
      }
    }
    let text = byT(H, $),
      content = z.length > 0 ? text.trim().length > 0 ? [...z, {
        type: "text",
        text: text
      }] : z : text;
    return {
      ...O,
      type: "user",
      message: {
        role: "user",
        content: content
      }
    };
  }
  let T = H.content.filter((z: any): any => z.type === "text" && typeof z.text === "string").map((z: any): any => ({
    type: "text",
    text: z.text,
    citations: []
  }));
  return {
    ...O,
    type: "assistant",
    requestId: void 0,
    message: {
      id: H.uuid,
      type: "message",
      role: "assistant",
      model: "claude-export-import",
      content: T.length > 0 ? T : [{
        type: "text",
        text: H.text,
        citations: []
      }],
      container: null,
      context_management: null,
      stop_details: null,
      stop_reason: "end_turn",
      stop_sequence: null,
      usage: {
        input_tokens: 0,
        output_tokens: 0,
        cache_creation_input_tokens: 0,
        cache_read_input_tokens: 0,
        cache_creation: null,
        server_tool_use: null,
        service_tier: null,
        inference_geo: null,
        iterations: null,
        speed: null
      }
    }
  };
}
function xyT(H: any, _: any): any {
  let q = [];
  if (H.conversations.length !== _.conversations + _.skipped) q.push(`conversations: manifest=${H.conversations.length} imported=${_.conversations + _.skipped}`);
  let K = H.conversations.reduce((T: any, z: any): any => T + z.message_count, 0);
  if (K !== _.messages) q.push(`messages: manifest=${K} imported=${_.messages}`);
  if (H.projects.length !== _.projects) q.push(`projects: manifest=${H.projects.length} imported=${_.projects}`);
  let O = H.projects.reduce((T: any, z: any): any => T + z.doc_count, 0);
  if (O !== _.docs) q.push(`docs: manifest=${O} imported=${_.docs}`);
  return q;
}
async function uyT(H: any): Promise<any> {
  let {
    size: size
  } = await Ma.stat(H);
  if (size > gH1) throw Error(`export file is ${size} bytes; refusing to read more than ${gH1}`);
  if (!H.endsWith(".zip")) return {
    ...d_(await Ma.readFile(H, "utf8")),
    files: {}
  };
  let q = await NWH(await Ma.readFile(H)),
    K = new TextDecoder(),
    O = (z: any): any => {
      let $ = q[z];
      if (!$) throw Error(`export zip missing ${z}`);
      return d_(K.decode($));
    },
    files = {};
  for (let [z, $] of Object.entries(q)) {
    if (!z.startsWith("files/")) continue;
    let Y = kU.basename(z);
    if (Y.length === 0 || !QH1.test(Y)) continue;
    files[Y] = $;
  }
  return {
    manifest: O("manifest.json"),
    conversations: O("conversations.json"),
    projects: O("projects.json"),
    files: files
  };
}
async function importConversations(H: any, _: any): Promise<any> {
  let q = await uyT(H),
    K = XI(_.cwd),
    O = {
      conversations: 0,
      skipped: 0,
      messages: 0,
      projects: 0,
      docs: 0,
      files: 0,
      manifestDiff: [],
      jsonlPaths: [],
      titles: [],
      projectList: q.projects.map((Y: any): any => ({
        uuid: Y.uuid,
        name: Y.name,
        dirName: `${YU_(Y.name) || "project"}-${Y.uuid}`
      })),
      conversationProjects: {}
    };
  if (!_.dryRun) await Ma.mkdir(K, {
    recursive: !0,
    mode: 448
  }), await Ma.mkdir(kU.join(_.cwd, "projects"), {
    recursive: !0,
    mode: 448
  }), await Ma.mkdir(kU.join(_.cwd, "files"), {
    recursive: !0,
    mode: 448
  });
  let T = (Y: any): any => {
      let A = Y.name.trim();
      if (A && A !== "New conversation") return A;
      return Y.chat_messages.find((f: any): any => f.sender === "human")?.text.trim().slice(0, 60) || "Untitled";
    },
    z = {};
  for (let Y of q.conversations) for (let A of Y.chat_messages) for (let w of A.files ?? []) z[w.file_uuid] = w.file_name;
  for (let Y of q.conversations) {
    let A = zj6(Y.uuid, SyT),
      w = await Promise.all(Y.chat_messages.map((J: any): any => IyT(J, _.cwd, A, q.files))),
      f = w.map((J: any): any => bH(J)).join(`
`) + (w.length ? `
` : ""),
      j = kU.join(K, `${A}.jsonl`);
    if (O.jsonlPaths.push(j), O.titles.push(T(Y)), O.conversationProjects[A] = Y.project_uuid ?? null, O.messages += w.length, !_.dryRun) {
      if (!(await NQ_(j, f))) {
        O.skipped += 1;
        continue;
      }
    }
    O.conversations += 1;
  }
  let $ = new Set();
  for (let Y of q.projects) {
    let A = `${YU_(Y.name) || "project"}-${Y.uuid}`;
    if (!QH1.test(A)) continue;
    let w = kU.join(_.cwd, "projects", A);
    if (!_.dryRun) await Ma.mkdir(w, {
      recursive: !0,
      mode: 448
    });
    let f = Y.prompt_template?.trim();
    if (f && !_.dryRun) await NQ_(kU.join(w, "CLAUDE.md"), f);
    for (let j of Y.docs) {
      let J = VQ_(j.filename ?? ""),
        D = /[a-zA-Z0-9]/.test(J) ? J : "untitled.md";
      if (O.docs += 1, !_.dryRun) await NQ_(kU.join(w, D), j.content ?? "");
    }
    for (let j of Y.files ?? []) {
      let J = q.files[j.file_uuid];
      if (!J) continue;
      if ($.add(j.file_uuid), O.files += 1, !_.dryRun) await NQ_(kU.join(w, VQ_(j.file_name)), J);
    }
    O.projects += 1;
  }
  for (let [Y, A] of Object.entries(q.files)) {
    if ($.has(Y)) continue;
    let w = z[Y],
      f = w ? `${Y}-${VQ_(w)}` : Y;
    if (!_.dryRun) await NQ_(kU.join(_.cwd, "files", f), A);
    O.files += 1;
  }
  return O.manifestDiff = xyT(q.manifest, O), O;
}
async function importConversationsHandler(H: any, _: any): Promise<any> {
  if (!q_(process.env.CLAUDE_IMPORT_CONVERSATIONS)) return p9("import-conversations is not enabled");
  if (!_.cwd) return p9("--cwd is required");
  let cwd = await Qf(_.cwd),
    K = await importConversations(H, {
      cwd: cwd,
      dryRun: _.dryRun
    }),
    O = _.dryRun ? "[dry-run] " : "";
  if (process.stdout.write(`${O}imported: conversations=${K.conversations} skipped=${K.skipped} messages=${K.messages} projects=${K.projects} docs=${K.docs} files=${K.files}
`), await new Promise((T: any): any => process.stdout.write(bH({
    sessionIds: K.jsonlPaths.map((z: any): any => kU.basename(z, ".jsonl")),
    titles: K.titles,
    jsonlPaths: K.jsonlPaths,
    cwd: cwd,
    projects: K.projectList,
    conversationProjects: K.conversationProjects,
    counts: {
      conversations: K.conversations,
      projects: K.projects,
      files: K.files,
      docs: K.docs,
      skipped: K.skipped
    }
  }) + `
`, T)), K.manifestDiff.length > 0) process.stderr.write(`manifest mismatch:
  ` + K.manifestDiff.join(`
  `) + `
`), process.exit(1);
  process.exit(0);
}
var Ma,
  kU,
  SyT = "5f3a2c5e-6b8f-4b27-9c0e-2d7f1a9b3c44",
  QH1,
  gH1 = 1073741824;
var lH1 = L((): any => {
  QMq();
  it();
  xk_();
  A6();
  Dp();
  Ij();
  H6();
  PC();
  Vu();
  Ma = require("fs/promises"), kU = require("path"), QH1 = /^[a-zA-Z0-9_-]+$/;
});

export {dH1 as Jcc,VQ_ as MVt,NQ_ as LVt,CyT as Uqm,byT as $qm,IyT as qqm,xyT as jqm,uyT as Wqm,importConversations,importConversationsHandler,Ma as lX,kU as Sj,SyT as Fqm,QH1 as zcc,gH1 as Kcc,lH1 as Xcc};
