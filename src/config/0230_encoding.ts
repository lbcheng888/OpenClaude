// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {lt as w_} from "../session/0132_sent.ts";
import {qe as FH} from "./0236_setHasFormattedOutput.ts";
/** Noop Disposable singleton returned when slow-op tracing is disabled. */
function getNoopDisposable(): Disposable {
  return noopDisposable;
}

/**
 * Traced JSON.stringify — wraps JSON.stringify with a slow-op perf span.
 * @param value The value to serialize.
 * @param replacer Optional replacer argument (Array or function).
 * @param space Optional space argument for pretty-printing.
 */
function bH(value: unknown, replacer?: ((key: string, value: unknown) => unknown) | (string | number)[] | null, space?: string | number): string {
  using _span = slowOpTracer`JSON.stringify(${value})`;
  return JSON.stringify(value, replacer as any, space);
}

/**
 * Serialize a value as a JSONL (newline-delimited JSON) line.
 * @param value The value to serialize.
 */
function xEq(value: unknown): string {
  return JSON.stringify(value) + `\n`;
}

/**
 * Join an array of values into a JSONL string (one JSON object per line).
 * @param items The array of values to serialize.
 */
function uEq(items: unknown[]): string {
  using _span = slowOpTracer`jsonlJoin(${items.length})`;
  let result = "";
  for (let i = 0; i < items.length; i++) result += JSON.stringify(items[i]) + `\n`;
  return result;
}

/**
 * Parse a JSON string. Thin wrapper over JSON.parse for import consistency.
 * @param text The JSON string to parse.
 */
function OjH(text: string): unknown {
  return JSON.parse(text);
}

/**
 * Traced structuredClone — wraps structuredClone with a slow-op perf span.
 * @param value The value to deep-clone.
 * @param options Optional structuredClone options (e.g. transfer list).
 */
function _S<T>(value: T, options?: StructuredSerializeOptions): T {
  using _span = slowOpTracer`structuredClone(${value})`;
  return structuredClone(value, options);
}

/**
 * fs.writeFileSync with optional fsync flush.
 * When options.flush is true, opens the file, writes, calls fsyncSync, then closes.
 * @param path  File path to write.
 * @param data  Data to write.
 * @param options Write options; the extra `flush` boolean triggers fsync.
 */
function TjH(path: string, data: string | NodeJS.ArrayBufferView, options: (Parameters<typeof import("fs").writeFileSync>[2] & {
  flush?: boolean;
}) | null | undefined): void {
  using _span = slowOpTracer`fs.writeFileSync(${path}, ${data})`;
  if (options !== null && typeof options === "object" && "flush" in options && options.flush === !0) {
    let encoding = typeof options === "object" && "encoding" in options ? options.encoding : void 0,
      mode = typeof options === "object" && "mode" in options ? options.mode : void 0,
      fd: number | undefined;
    try {
      fd = fs.openSync(path, "w", mode), fs.writeFileSync(fd, data, {
        encoding: encoding ?? void 0
      }), fs.fsyncSync(fd);
    } finally {
      if (fd !== void 0) fs.closeSync(fd);
    }
  } else fs.writeFileSync(path, data, options);
}
var fs: typeof import("fs"),
  slowOpThresholdMs: number,
  noopDisposable: Disposable,
  slowOpTracer: (strings: TemplateStringsArray, ...values: unknown[]) => Disposable,
  /** JSON.parse with optional reviver, traced with a slow-op perf span. */
  d_ = (text: string, reviver?: (key: string, value: unknown) => unknown): unknown => {
    using _span = slowOpTracer`JSON.parse(${text})`;
    return typeof reviver > "u" ? JSON.parse(text) : JSON.parse(text, reviver);
  };

/** Lazy module initializer. Configures fs, slowOpThresholdMs, noopDisposable, and slowOpTracer. */
var H6 = L(() => {
  w_();
  FH();
  fs = require("fs"), slowOpThresholdMs = (() => {
    let envVal = process.env.CLAUDE_CODE_SLOW_OPERATION_THRESHOLD_MS;
    if (envVal !== void 0) {
      let ms = Number(envVal);
      if (!Number.isNaN(ms) && ms >= 0) return ms;
    }
    return 1 / 0;
  })(), noopDisposable = {
    [Symbol.dispose]() {}
  };
  slowOpTracer = getNoopDisposable;
});
export {getNoopDisposable as Gkc,bH as TeamDeleteToolName,xEq as Y8o,uEq as J8o,OjH as Zbe,_S as IN,TjH as eEe,fs as ape,slowOpThresholdMs as hpf,noopDisposable as Wkc,slowOpTracer as $g,d_ as qt,H6 as tn};
