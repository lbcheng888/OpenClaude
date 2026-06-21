// @ts-nocheck
import {mi as ui,Wde as xde,SH as hH,Ia,es as ns,Gde as kde,Yr as Jr} from "../../vendor/m135.ts";
import {uSe as zTe,E$o as A2o,Nrr as Xnr} from "../../vendor/m148.ts";
import {E_t as Jgt,krr as jnr} from "./0138_key.ts";
import {QWe as MWe} from "../../vendor/m140.ts";
import {b} from "../../runtime.ts";
import {lSe as VTe,pzt as EKt} from "../../vendor/m136.ts";
import {v_t as Qgt,serializeToolResult as gH} from "../../vendor/m141.ts";
// @ts-nocheck
async function* iterSSEMessages(response, controller) {
  if (!response.body) {
    if (controller.abort(), typeof globalThis.navigator < "u" && globalThis.navigator.product === "ReactNative") throw new ui("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api");
    throw new ui("Attempted to iterate over a response with no body");
  }
  let sseDecoder = new SSEDecoder(),
    lineDecoder = new zTe(),
    byteIterator = Jgt(response.body);
  for await (let lineChunk of iterLineChunks(byteIterator)) for (let line of lineDecoder.decode(lineChunk)) {
    let message = sseDecoder.decode(line);
    if (message) yield message;
  }
  for (let line of lineDecoder.flush()) {
    let message = sseDecoder.decode(line);
    if (message) yield message;
  }
}
async function* iterLineChunks(byteSource) {
  let buffer = new Uint8Array();
  for await (let chunk of byteSource) {
    if (chunk == null) continue;
    let bytes = chunk instanceof ArrayBuffer ? new Uint8Array(chunk) : typeof chunk === "string" ? MWe(chunk) : chunk,
      merged = new Uint8Array(buffer.length + bytes.length);
    merged.set(buffer), merged.set(bytes, buffer.length), buffer = merged;
    let lineBreakIndex;
    while ((lineBreakIndex = A2o(buffer)) !== -1) yield buffer.slice(0, lineBreakIndex), buffer = buffer.slice(lineBreakIndex);
  }
  if (buffer.length > 0) yield buffer;
}
class SSEDecoder {
  constructor() {
    this.event = null, this.data = [], this.chunks = [];
  }
  decode(e) {
    if (e.endsWith("\r")) e = e.substring(0, e.length - 1);
    if (!e) {
      if (!this.event && !this.data.length) return null;
      let o = {
        event: this.event,
        data: this.data.join(`
`),
        raw: this.chunks
      };
      return this.event = null, this.data = [], this.chunks = [], o;
    }
    if (this.chunks.push(e), e.startsWith(":")) return null;
    let [t, n, r] = partitionAtDelimiter(e, ":");
    if (r.startsWith(" ")) r = r.substring(1);
    if (t === "event") this.event = r;else if (t === "data") this.data.push(r);
    return null;
  }
}
function partitionAtDelimiter(text, delimiter) {
  let index = text.indexOf(delimiter);
  if (index !== -1) return [text.substring(0, index), delimiter, text.substring(index + delimiter.length)];
  return [text, "", ""];
}
var fY_, tb;
var Le6 = b(() => {
  xde();
  hH();
  Xnr();
  VTe();
  Qgt();
  hH();
  tb = class tb {
    constructor(e, t, n) {
      this.iterator = e, fY_.set(this, undefined), this.controller = t, Ia(this, fY_, n, "f");
    }
    static fromSSEResponse(e, t, n) {
      let r = false,
        o = n ? gH(n) : console;
      async function* s() {
        if (r) throw new ui("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
        r = true;
        let i = false;
        try {
          for await (let a of iterSSEMessages(e, t)) {
            if (a.event === "completion") try {
              yield JSON.parse(a.data);
            } catch (l) {
              throw o.error("Could not parse message into JSON:", a.data), o.error("From chunk:", a.raw), l;
            }
            if (a.event === "message_start" || a.event === "message_delta" || a.event === "message_stop" || a.event === "content_block_start" || a.event === "content_block_delta" || a.event === "content_block_stop" || a.event === "message" || a.event === "user.message" || a.event === "user.interrupt" || a.event === "user.tool_confirmation" || a.event === "user.custom_tool_result" || a.event === "agent.message" || a.event === "agent.thinking" || a.event === "agent.tool_use" || a.event === "agent.tool_result" || a.event === "agent.mcp_tool_use" || a.event === "agent.mcp_tool_result" || a.event === "agent.custom_tool_use" || a.event === "agent.thread_context_compacted" || a.event === "session.status_running" || a.event === "session.status_idle" || a.event === "session.status_rescheduled" || a.event === "session.status_terminated" || a.event === "session.error" || a.event === "session.deleted" || a.event === "span.model_request_start" || a.event === "span.model_request_end") try {
              yield JSON.parse(a.data);
            } catch (l) {
              throw o.error("Could not parse message into JSON:", a.data), o.error("From chunk:", a.raw), l;
            }
            if (a.event === "ping") continue;
            if (a.event === "error") {
              let l = EKt(a.data) ?? a.data,
                c = l?.error?.type;
              throw new ns(undefined, l, undefined, e.headers, c);
            }
          }
          i = true;
        } catch (a) {
          if (kde(a)) return;
          throw a;
        } finally {
          if (!i) t.abort();
        }
      }
      return new tb(s, t, n);
    }
    static fromReadableStream(iterator, controller, client) {
      let r = false;
      async function* o() {
        let i = new zTe(),
          a = Jgt(iterator);
        for await (let l of a) for (let c of i.decode(l)) yield c;
        for (let l of i.flush()) yield l;
      }
      async function* s() {
        if (r) throw new ui("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
        r = true;
        let i = false;
        try {
          for await (let a of o()) {
            if (i) continue;
            if (a) yield JSON.parse(a);
          }
          i = true;
        } catch (a) {
          if (kde(a)) return;
          throw a;
        } finally {
          if (!i) controller.abort();
        }
      }
      return new tb(s, controller, client);
    }
    [(fY_ = new WeakMap(), Symbol.asyncIterator)]() {
      return this.iterator();
    }
    tee() {
      let e = [],
        t = [],
        n = this.iterator(),
        r = o => ({
          next: () => {
            if (o.length === 0) {
              let s = n.next();
              e.push(s), t.push(s);
            }
            return o.shift();
          }
        });
      return [new tb(() => r(e), this.controller, Jr(this, fY_, "f")), new tb(() => r(t), this.controller, Jr(this, fY_, "f"))];
    }
    toReadableStream() {
      let e = this,
        t;
      return jnr({
        async start() {
          t = e[Symbol.asyncIterator]();
        },
        async pull(n) {
          try {
            let {
              value: r,
              done: o
            } = await t.next();
            if (o) return n.close();
            let s = MWe(JSON.stringify(r) + `
`);
            n.enqueue(s);
          } catch (r) {
            n.error(r);
          }
        },
        async cancel() {
          await t.return?.();
        }
      });
    }
  };
});

export {iterSSEMessages as Shc,iterLineChunks as bhc,SSEDecoder as C$o,partitionAtDelimiter as Ehc,fY_ as x_t,tb as g2,Le6 as Brr};
