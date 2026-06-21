// @ts-nocheck
import {tr as sr,sn as an} from "../config/0047_namespace.ts";
import {getSessionProjectDir as r2,getOriginalCwd as gr,getSessionId as kt,lt as ct} from "../session/0131_sent.ts";
import {b} from "../../runtime.ts";
import {ta as na,wn as bn} from "../../vendor/m45.ts";
import {QT as GT,BS as DS} from "../../vendor/m642.ts";
// @ts-nocheck
function LP4() {
  return SQ6.join(sr(), "projects");
}
function hP4() {
  let e = r2() ?? VP4(gr());
  return SQ6.join(e, `${kt()}.jsonl`);
}
function ZqT(H, t) {
  Y8r.set(H, t);
}
function GqT(H) {
  Y8r.delete(H);
}
function kP4(H) {
  let t = r2() ?? VP4(gr()),
    n = kt(),
    r = Y8r.get(H),
    o = r ? SQ6.join(t, n, "subagents", r) : SQ6.join(t, n, "subagents");
  return SQ6.join(o, `agent-${H}.jsonl`);
}
async function NP4() {
  let e = SQ6.join(r2() ?? VP4(gr()), kt(), "subagents"),
    t;
  try {
    t = await rB_.readdir(e, {
      withFileTypes: true
    });
  } catch {
    return [];
  }
  return t.filter(n => n.isFile() && n.name.startsWith("agent-") && n.name.endsWith(".jsonl")).map(n => n.name.slice(6, -6));
}
function AMq(H, _) {
  let n = {};
  for (let r of Object.values(H)) {
    let o = _[r.id]?.messages;
    if (r.type === "in_process_teammate" && r.identity?.agentId && o && o.length > 0) n[r.identity.agentId] = o;
  }
  return n;
}
var rB_, SQ6, VP4, Y8r;
var ry = b(() => {
  na();
  ct();
  an();
  GT();
  rB_ = require("fs/promises"), SQ6 = require("path");
  VP4 = bn(e => SQ6.join(LP4(), DS(e)));
  Y8r = new Map();
});

export {LP4 as Dz,hP4 as qf,ZqT as _$i,GqT as y$i,kP4 as hP,NP4 as xRn,AMq as T$i,rB_ as g$i,SQ6 as cxe,VP4 as _g,Y8r as U5r,ry};
