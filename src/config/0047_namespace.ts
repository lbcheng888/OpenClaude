// @ts-nocheck
import {st as rt} from "../../vendor/m5.ts";
import {b} from "../../runtime.ts";
import {Rde as gde} from "../../vendor/m6.ts";
import {ta as na,wn as bn} from "../../vendor/m45.ts";
// @ts-nocheck
function GTe() {
  return $e6.join(Y8(), "teams");
}
function PWe(e) {
  let t = process.env.NODE_OPTIONS;
  if (!t) return false;
  return t.split(/\s+/).includes(e);
}
function TV(e, t) {
  if (e === undefined) return t;
  let n = parseInt(e, 10);
  return Number.isNaN(n) ? t : n;
}
function DUo(e) {
  if (e !== undefined) return e;
  let t = process.env.CLAUDE_CODE_MAX_TURNS?.trim();
  if (!t) return;
  let n = Number(t);
  if (!Number.isInteger(n) || n <= 0) throw Error(`CLAUDE_CODE_MAX_TURNS must be a positive integer; got "${t}"`);
  return n;
}
function SKt(e) {
  let t = process.argv.indexOf("--");
  return (t === -1 ? process.argv : process.argv.slice(0, t)).includes(e);
}
function rfH() {
  return rt(process.env.CLAUDE_CODE_SIMPLE) || SKt("--bare");
}
function OQH() {
  return rt(process.env.CLAUDE_CODE_SAFE_MODE) || SKt("--safe-mode");
}
function cd() {
  return SKt("--safe-mode") ? "restart without --safe-mode" : "unset CLAUDE_CODE_SAFE_MODE";
}
function Ryq() {
  return SKt("--bare") ? "restart without --bare" : "unset CLAUDE_CODE_SIMPLE";
}
function cd_(flag) {
  let separatorIndex = {};
  if (flag) for (let n of flag) {
    let [r, ...o] = n.split("=");
    if (!r || o.length === 0) throw Error(`Invalid environment variable format: ${n}, environment variables should be added as: -e KEY1=value1 -e KEY2=value2`);
    separatorIndex[r] = o.join("=");
  }
  return separatorIndex;
}
function MO() {
  return process.env.CLOUD_ML_REGION || "us-east5";
}
function C4(e) {
  switch (e) {
    case "global":
      return "https://aiplatform.googleapis.com";
    case "us":
    case "eu":
      return `https://aiplatform.${e}.rep.googleapis.com`;
    default:
      return `https://${e}-aiplatform.googleapis.com`;
  }
}
function RM() {
  return rt(process.env.CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR);
}
function Lyq() {
  return false;
}
function hyq() {
  return false;
}
function Qd_() {
  return {
    namespace: undefined,
    cluster: undefined
  };
}
function TQH(scope) {
  if (scope) {
    let t = qK1.find(([n]) => scope.startsWith(n));
    if (t) return process.env[t[1]] || MO();
  }
  return MO();
}
var Gyq, $e6, Y8, Ye6, qK1;
var A6 = b(() => {
  gde();
  na();
  gde();
  Gyq = require("os"), $e6 = require("path"), Y8 = bn(() => (process.env.CLAUDE_CONFIG_DIR ?? $e6.join(Gyq.homedir(), ".claude")).normalize("NFC"), () => process.env.CLAUDE_CONFIG_DIR);
  Ye6 = bn(() => rt(process.env.CLAUDE_CODE_SUPERVISED));
  qK1 = [["claude-fable-5", "VERTEX_REGION_CLAUDE_FABLE_5"], ["claude-haiku-4-5", "VERTEX_REGION_CLAUDE_HAIKU_4_5"], ["claude-3-5-haiku", "VERTEX_REGION_CLAUDE_3_5_HAIKU"], ["claude-3-5-sonnet", "VERTEX_REGION_CLAUDE_3_5_SONNET"], ["claude-3-7-sonnet", "VERTEX_REGION_CLAUDE_3_7_SONNET"], ["claude-opus-4-8", "VERTEX_REGION_CLAUDE_4_8_OPUS"], ["claude-opus-4-7", "VERTEX_REGION_CLAUDE_4_7_OPUS"], ["claude-opus-4-6", "VERTEX_REGION_CLAUDE_4_6_OPUS"], ["claude-opus-4-5", "VERTEX_REGION_CLAUDE_4_5_OPUS"], ["claude-opus-4-1", "VERTEX_REGION_CLAUDE_4_1_OPUS"], ["claude-opus-4", "VERTEX_REGION_CLAUDE_4_0_OPUS"], ["claude-sonnet-4-6", "VERTEX_REGION_CLAUDE_4_6_SONNET"], ["claude-sonnet-4-5", "VERTEX_REGION_CLAUDE_4_5_SONNET"], ["claude-sonnet-4", "VERTEX_REGION_CLAUDE_4_0_SONNET"]];
});

export {GTe,PWe as _We,TV as RV,DUo as gFo,SKt as q7t,rfH as dp,OQH as Bl,cd as KE,Ryq as _Fo,cd_ as yFo,MO as $7t,C4 as yWe,RM as TFo,Lyq as YC,hyq as Wj,Qd_ as SFo,TQH as yre,Gyq as hFo,$e6 as Oer,Y8 as tr,Ye6 as Ler,qK1 as Upc,A6 as sn};
