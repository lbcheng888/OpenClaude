// @ts-nocheck
import {or as sr,dn as an} from "../config/0137_namespace.ts";
import {getSessionProjectDir as r2,getOriginalCwd as gr,getSessionId as kt,lt as ct} from "../session/0132_sent.ts";
import {b} from "../../runtime.ts";
import {Wi as na,Hn as bn} from "../../vendor/m100.ts";
import {VT as GT,NS as DS} from "../../vendor/m648.ts";
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
export {LP4 as aj,hP4 as Nm,ZqT as c8i,GqT as u8i,kP4 as jk,NP4 as mIn,AMq as d8i,rB_ as l8i,SQ6 as Yke,VP4 as Cg,Y8r as Tzr,ry as D_};
