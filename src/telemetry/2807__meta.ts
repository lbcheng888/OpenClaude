// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {$f as Wf,HF as EF} from "../core/2683_HF.ts";
import {Lki as kxi,V4 as P4} from "./2512_error_name.ts";
import {u$e as q2e,Z5 as M5} from "../api/4416_type.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {TSe as oSe,dr as fr} from "../../vendor/m231.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function gRn() {
  let e = process.env.MAX_MCP_OUTPUT_TOKENS;
  if (e) {
    let r = parseInt(e, 10);
    if (Number.isFinite(r) && r > 0) return r;
  }
  let n = ut("tengu_velvet_ibis", {})?.mcp_tool;
  if (typeof n === "number" && Number.isFinite(n) && n > 0) return n;
  return BRd;
}
function ynt(e) {
  if (!e || typeof e === "string" || !Array.isArray(e)) return e;
  let t = e,
    n = false;
  for (let r of t) if (r.type === "text" && "_meta" in r && r._meta) {
    n = true;
    break;
  }
  if (!n) return e;
  return t.map(r => {
    if (r.type === "text" && "_meta" in r && r._meta) {
      let {
        _meta: o,
        ...s
      } = r;
      return s;
    }
    return r;
  });
}
function G$i(e) {
  return e.type === "text";
}
function getMaxMcpOutputTokens(e) {
  return e.type === "image";
}
function stripMetaFromContentBlocks(content) {
  if (!content) return 0;
  if (typeof content === "string") return Wf(content);
  if (!Array.isArray(content)) return 0;
  return content.reduce((t, n) => {
    if (G$i(n)) return t + Wf(n.text);else if (getMaxMcpOutputTokens(n)) return t + W$i;
    return t;
  }, 0);
}
function isTextBlock() {
  return gRn() * 4;
}
function isImageBlock() {
  return `

[OUTPUT TRUNCATED - exceeded ${gRn()} token limit]

The tool output was truncated. If this MCP server provides pagination or filtering tools, use them to retrieve specific portions of the data. If pagination is not available, inform the user that you are working with truncated output and results may be incomplete.`;
}
async function estimateContentTokens(content, t) {
  let n = [],
    r = 0;
  for (let o of content) if (G$i(o)) {
    let s = t - r;
    if (s <= 0) break;
    if (o.text.length <= s) n.push(o), r += o.text.length;else {
      let i = {
        type: "text",
        text: o.text.slice(0, s)
      };
      if (o._meta) i._meta = o._meta;
      n.push(i);
      break;
    }
  } else if (getMaxMcpOutputTokens(o)) {
    let s = W$i * 4;
    if (r + s <= t) n.push(o), r += s;else {
      let i = t - r;
      if (i > 0) {
        let a = Math.floor(i * 0.75);
        try {
          let l = await kxi(o, a);
          if (n.push(l), l.source.type === "base64") r += l.source.data.length;else r += s;
        } catch {}
      }
    }
  } else n.push(o);
  return n;
}
async function getMaxMcpOutputChars(e) {
  if (!e) return false;
  if (stripMetaFromContentBlocks(e) <= gRn() * NRd) return false;
  try {
    let r = await q2e(typeof e === "string" ? [{
      role: "user",
      content: e
    }] : [{
      role: "user",
      content: e
    }], []);
    return !!(r && r > gRn());
  } catch (n) {
    return Ie(n), false;
  }
}
async function getMcpTruncationNotice(e) {
  if (!e) return e;
  let t = isTextBlock(),
    n = isImageBlock();
  if (typeof e === "string") return oSe(e, t) + n;else {
    let r = await estimateContentTokens(e, t);
    return r.push({
      type: "text",
      text: n
    }), r;
  }
}
async function truncateContentBlocks(blocks) {
  if (!(await getMaxMcpOutputChars(blocks))) return blocks;
  return await getMcpTruncationNotice(blocks);
}
var NRd = 0.5,
  W$i = 1600,
  BRd = 25000;
var Qh_ = b(() => {
  Yn();
  EF();
  M5();
  P4();
  wn();
  fr();
});

export {gRn as txn,ynt as Nnt,G$i as n3i,getMaxMcpOutputTokens as r3i,stripMetaFromContentBlocks as dLt,isTextBlock as lHd,isImageBlock as cHd,estimateContentTokens as uHd,getMaxMcpOutputChars as IWr,getMcpTruncationNotice as dHd,truncateContentBlocks as pLt,NRd as iHd,W$i as t3i,BRd as aHd,Qh_ as mLt};
