// @ts-nocheck
import {ube as tjH,JT as Cj,QT as Ij} from "../../vendor/m642.ts";
import {qt as d_,Xt as H6} from "../config/0228_encoding.ts";
import {BRo as OMq,FRo as TMq,URo as zMq} from "../session/5069_parentUuid.ts";
import {b as L} from "../../runtime.ts";
/*
 * agent/5052_withFileTypes.ts - Agent workflow and helper restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal names are retained where local usage does not verify a safer semantic name.
 */
// FIXME: unverified name
async function LP4(H: any, _: any): Promise<any> {
  let q = await tjH(H, _);
  if (!q) return null;
  let K = q.filePath.replace(/\.jsonl$/, "");
  return SQ6.join(K, "subagents");
}
// FIXME: unverified name
async function hP4(H: any): Promise<any> {
  let _ = [];
  async function q(K: any): Promise<any> {
    let O;
    try {
      O = await rB_.readdir(K, {
        withFileTypes: !0
      });
    } catch {
      return;
    }
    for (let T of O) if (T.isFile() && T.name.startsWith("agent-") && T.name.endsWith(".jsonl")) {
      let z = T.name.slice(6, -6);
      _.push({
        agentId: z,
        filePath: SQ6.join(K, T.name)
      });
    } else if (T.isDirectory()) await q(SQ6.join(K, T.name));
  }
  return await q(H), _;
}
// FIXME: unverified name
function ZqT(H: any): any {
  let _ = [],
    q = 10,
    K = H.length,
    O = 0;
  while (O < K) {
    let T = H.indexOf(10, O);
    if (T === -1) T = K;
    let z = O;
    while (z < T && H[z] <= 32) z++;
    if (O = T + 1, z >= T) continue;
    let $ = H.toString("utf-8", z, T);
    try {
      let Y = d_($),
        A = Y.type;
      if ((A === "user" || A === "assistant") && typeof Y.uuid === "string") _.push(Y);
    } catch {}
  }
  return _;
}
// FIXME: unverified name
function GqT(H: any): any {
  if (H.length === 0) return [];
  let _ = new Map();
  for (let z of H) _.set(z.uuid, z);
  let q = H.findLast((z: any): any => z.type === "user" || z.type === "assistant");
  if (!q) return [];
  let K = [],
    O = new Set(),
    T = q;
  while (T) {
    if (O.has(T.uuid)) break;
    O.add(T.uuid), K.push(T), T = T.parentUuid ? _.get(T.parentUuid) : void 0;
  }
  return K.reverse(), K;
}
// FIXME: unverified name
async function kP4(H: any, _: any): Promise<any> {
  if (!Cj(H)) return [];
  let q = await LP4(H, _?.dir);
  if (!q) return [];
  return (await hP4(q)).map((O: any): any => O.agentId);
}
// FIXME: unverified name
async function NP4(H: any, _: any, q: any): Promise<any> {
  if (!Cj(H)) return [];
  if (!_) return [];
  let K = await LP4(H, q?.dir);
  if (!K) return [];
  let T = (await hP4(K)).find((Y: any): any => Y.agentId === _);
  if (!T) return [];
  let z;
  try {
    z = await rB_.readFile(T.filePath);
  } catch {
    return [];
  }
  let $;
  try {
    let Y = T.filePath.replace(/\.jsonl$/, ".meta.json");
    $ = d_(await rB_.readFile(Y, "utf-8")).toolUseId;
  } catch {}
  return AMq(z, q, $);
}
// FIXME: unverified name
function AMq(H: any, _: any, q: any): any {
  if (H.length === 0) return [];
  let K = ZqT(H),
    T = GqT(K).filter((z: any): any => z.type === "user" || z.type === "assistant").map((z: any): any => OMq(z, q));
  return TMq(T, _);
}
var rB_, SQ6;
var VP4 = L((): any => {
  zMq();
  Ij();
  H6();
  rB_ = require("fs/promises"), SQ6 = require("path");
});
export {LP4 as m0l,hP4 as f0l,ZqT as dpm,GqT as ppm,kP4 as A0l,NP4 as h0l,AMq as jRo,rB_ as B8t,SQ6 as p7n,VP4 as g0l};
