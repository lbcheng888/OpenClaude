// @ts-nocheck
import {b as L} from "../../runtime.ts";
// @ts-nocheck
function getCommandName(cmd) {
  return cmd.userFacingName?.() ?? cmd.name;
}
function isCommandEnabled(cmd) {
  return cmd.isEnabled?.() ?? true;
}
function LGH(cmd, ctx) {
  let immediateVal = cmd?.immediate;
  return typeof immediateVal === "function" ? immediateVal(ctx) : immediateVal === true;
}
function O4_(input, commands, {
  maxEditDistance: maxDist = 1
} = {}) {
  let allNames = commands.flatMap(cmd => [cmd.name, ...(cmd.aliases ?? [])]),
    bestMatch,
    bestScore = maxDist + 1;
  for (let candidate of allNames) {
    if (Math.abs(candidate.length - input.length) > maxDist) continue;
    let dist = computeEditDistance(input, candidate);
    if (dist < bestScore) bestScore = dist, bestMatch = candidate;
  }
  return bestMatch;
}
function computeEditDistance(a, b) {
  if (a === b) return 0;
  let aLen = a.length,
    bLen = b.length,
    dp = Array.from({
      length: aLen + 1
    }, (_, i) => Array.from({
      length: bLen + 1
    }, (_, j) => i === 0 ? j : j === 0 ? i : 0));
  for (let i = 1; i <= aLen; i++) for (let j = 1; j <= bLen; j++) {
    let subCost = a[i - 1] === b[j - 1] ? 0 : 1;
    if (dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + subCost), i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
  }
  return dp[aLen][bLen];
}
async function filterConnectedWithChannel(gen) {
  let result;
  do result = await gen.next(); while (!result.done);
  return result.value;
}
async function* _C6(generators, concurrency = 1 / 0) {
  let makeEntry = gen => {
      let promise = gen.next().then(({
        done: done,
        value: value
      }) => ({
        done: done,
        value: value,
        generator: gen,
        promise: promise
      }));
      return promise;
    },
    pending = [...generators],
    active = new Set();
  while (active.size < concurrency && pending.length > 0) {
    let gen = pending.shift();
    active.add(makeEntry(gen));
  }
  while (active.size > 0) {
    let {
      done: done,
      value: value,
      generator: gen,
      promise: prom
    } = await Promise.race(active);
    if (active.delete(prom), !done) {
      if (active.add(makeEntry(gen)), value !== undefined) yield value;
    } else if (pending.length > 0) {
      let nextGen = pending.shift();
      active.add(makeEntry(nextGen));
    }
  }
}
async function qC6(gen) {
  let results = [];
  for await (let item of gen) results.push(item);
  return results;
}
async function* Qqq(items) {
  for (let item of items) yield item;
}
var JmA;
var qpH = L(() => {
  JmA = Symbol("NO_VALUE");
});

export {getCommandName,isCommandEnabled,LGH as hIe,O4_ as Ict,computeEditDistance as S$t,filterConnectedWithChannel as AFa,_C6 as d2n,qC6 as p2n,Qqq as Jao,JmA as fZg,qpH as gqe};
