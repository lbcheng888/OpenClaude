// @ts-nocheck
import {navigator} from "../../vendor/m527.ts";
import {Qs as ui,YH as hH} from "../../vendor/m137.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
var Eyq = ms => new Promise(resolve => setTimeout(resolve, ms));
var ld = "0.94.0";
function TK1() {
  if (typeof Deno < "u" && Deno.build != null) return "deno";
  if (typeof EdgeRuntime < "u") return "edge";
  if (Object.prototype.toString.call(typeof globalThis.process < "u" ? globalThis.process : 0) === "[object process]") return "node";
  return "unknown";
}
function $K1() {
  if (typeof navigator > "u" || !navigator) return null;
  let matchers = [{
    key: "edge",
    pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
  }, {
    key: "ie",
    pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
  }, {
    key: "ie",
    pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/
  }, {
    key: "chrome",
    pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
  }, {
    key: "firefox",
    pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
  }, {
    key: "safari",
    pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/
  }];
  for (let {
    key: browserKey,
    pattern: regex
  } of matchers) {
    let match = regex.exec(navigator.userAgent);
    if (match) {
      let major = match[1] || 0,
        minor = match[2] || 0,
        patch = match[3] || 0;
      return {
        browser: browserKey,
        version: `${major}.${minor}.${patch}`
      };
    }
  }
  return null;
}
var Iyq = () => typeof window < "u" && typeof window.document < "u" && typeof navigator < "u",
  zK1 = () => {
    let runtime = TK1();
    if (runtime === "deno") return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": ld,
      "X-Stainless-OS": Cyq(Deno.build.os),
      "X-Stainless-Arch": Syq(Deno.build.arch),
      "X-Stainless-Runtime": "deno",
      "X-Stainless-Runtime-Version": typeof Deno.version === "string" ? Deno.version : Deno.version?.deno ?? "unknown"
    };
    if (typeof EdgeRuntime < "u") return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": ld,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": `other:${EdgeRuntime}`,
      "X-Stainless-Runtime": "edge",
      "X-Stainless-Runtime-Version": globalThis.process.version
    };
    if (runtime === "node") return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": ld,
      "X-Stainless-OS": Cyq(globalThis.process.platform ?? "unknown"),
      "X-Stainless-Arch": Syq(globalThis.process.arch ?? "unknown"),
      "X-Stainless-Runtime": "node",
      "X-Stainless-Runtime-Version": globalThis.process.version ?? "unknown"
    };
    let browserInfo = $K1();
    if (browserInfo) return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": ld,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": "unknown",
      "X-Stainless-Runtime": `browser:${browserInfo.browser}`,
      "X-Stainless-Runtime-Version": browserInfo.version
    };
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": ld,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": "unknown",
      "X-Stainless-Runtime": "unknown",
      "X-Stainless-Runtime-Version": "unknown"
    };
  },
  Syq = arch => {
    if (arch === "x32") return "x32";
    if (arch === "x86_64" || arch === "x64") return "x64";
    if (arch === "arm") return "arm";
    if (arch === "aarch64" || arch === "arm64") return "arm64";
    if (arch) return `other:${arch}`;
    return "unknown";
  },
  Cyq = os => {
    if (os = os.toLowerCase(), os.includes("ios")) return "iOS";
    if (os === "android") return "Android";
    if (os === "darwin") return "MacOS";
    if (os === "win32") return "Windows";
    if (os === "freebsd") return "FreeBSD";
    if (os === "openbsd") return "OpenBSD";
    if (os === "linux") return "Linux";
    if (os) return `Other:${os}`;
    return "Unknown";
  },
  byq,
  TY_ = () => byq ?? (byq = zK1());
var nd_ = () => {};
function xyq() {
  if (typeof fetch < "u") return fetch;
  throw Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new Anthropic({ fetch })` or polyfill the global, `globalThis.fetch = fetch`");
}
function Je6(...args) {
  let ReadableStreamCtor = globalThis.ReadableStream;
  if (typeof ReadableStreamCtor > "u") throw Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  return new ReadableStreamCtor(...args);
}
function id_(iterable) {
  let iterator = Symbol.asyncIterator in iterable ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]();
  return Je6({
    start() {},
    async pull(controller) {
      let {
        done: done,
        value: value
      } = await iterator.next();
      if (done) controller.close();else controller.enqueue(value);
    },
    async cancel() {
      await iterator.return?.();
    }
  });
}
function zY_(stream) {
  if (stream[Symbol.asyncIterator]) return stream;
  let reader = stream.getReader();
  return {
    async next() {
      try {
        let result = await reader.read();
        if (result?.done) reader.releaseLock();
        return result;
      } catch (err) {
        throw reader.releaseLock(), err;
      }
    },
    async return() {
      let cancelled = reader.cancel();
      return reader.releaseLock(), await cancelled, {
        done: true,
        value: undefined
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
async function uyq(streamLike) {
  if (streamLike === null || typeof streamLike !== "object") return;
  if (streamLike[Symbol.asyncIterator]) {
    await streamLike[Symbol.asyncIterator]().return?.();
    return;
  }
  let reader = streamLike.getReader(),
    cancelled = reader.cancel();
  reader.releaseLock(), await cancelled;
}
var myq = ({
  headers: headers,
  body: body
}) => ({
  bodyHeaders: {
    "content-type": "application/json"
  },
  body: JSON.stringify(body)
});
function pyq(query) {
  return Object.entries(query).filter(([key, value]) => typeof value < "u").map(([key, value]) => {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    if (value === null) return `${encodeURIComponent(key)}=`;
    throw new ui(`Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
  }).join("&");
}
var De6 = b(() => {
  hH();
});
export {Eyq as B6o,ld as initSessionMetadataPersistence,TK1 as dvc,$K1 as mvc,Iyq as W6o,zK1 as pvc,Syq as U6o,Cyq as $6o,byq as q6o,TY_ as JSt,nd_ as KJt,xyq as G6o,Je6 as olr,id_ as zJt,zY_ as XSt,uyq as V6o,myq as K6o,pyq as z6o,De6 as slr};
