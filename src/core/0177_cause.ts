// @ts-nocheck
import {b} from "../../runtime.ts";
import {Qde as Wde,ma as Ia,Zde as Gde,qp as xm,Qs as mi,Xr as Yr} from "../../vendor/m137.ts";
import {Flr as cor,fXt as Lzt,mXt as Ozt} from "../../vendor/m175.ts";
import {npe as zde} from "../../vendor/m170.ts";
import {Nlr as lor,Llr as ior} from "../../vendor/m174.ts";
import {FU as g2} from "./0152_event.ts";
function N$o(e) {
  return e.type === "tool_use" || e.type === "server_tool_use" || e.type === "mcp_tool_use";
}
function B$o(e) {}
var NV,
  dSe,
  oGe,
  $_t,
  Mzt,
  q_t,
  j_t,
  Nzt,
  W_t,
  Yde,
  G_t,
  Bzt,
  Fzt,
  _Le,
  Uzt,
  $zt,
  V_t,
  uor,
  O$o,
  qzt,
  dor,
  por,
  mor,
  L$o,
  M$o = "__json_buf",
  K_t;
var F$o = b(() => {
  Wde();
  cor();
  zde();
  Lzt();
  lor();
  K_t = class K_t {
    constructor(e, t) {
      NV.add(this), this.messages = [], this.receivedMessages = [], dSe.set(this, void 0), oGe.set(this, null), this.controller = new AbortController(), $_t.set(this, void 0), Mzt.set(this, () => {}), q_t.set(this, () => {}), j_t.set(this, void 0), Nzt.set(this, () => {}), W_t.set(this, () => {}), Yde.set(this, {}), G_t.set(this, !1), Bzt.set(this, !1), Fzt.set(this, !1), _Le.set(this, !1), Uzt.set(this, void 0), $zt.set(this, void 0), V_t.set(this, void 0), qzt.set(this, n => {
        if (Ia(this, Bzt, !0, "f"), Gde(n)) n = new xm();
        if (n instanceof xm) return Ia(this, Fzt, !0, "f"), this._emit("abort", n);
        if (n instanceof mi) return this._emit("error", n);
        if (n instanceof Error) {
          let r = new mi(n.message);
          return r.cause = n, this._emit("error", r);
        }
        return this._emit("error", new mi(String(n)));
      }), Ia(this, $_t, new Promise((n, r) => {
        Ia(this, Mzt, n, "f"), Ia(this, q_t, r, "f");
      }), "f"), Ia(this, j_t, new Promise((n, r) => {
        Ia(this, Nzt, n, "f"), Ia(this, W_t, r, "f");
      }), "f"), Yr(this, $_t, "f").catch(() => {}), Yr(this, j_t, "f").catch(() => {}), Ia(this, oGe, e, "f"), Ia(this, V_t, t?.logger ?? console, "f");
    }
    get response() {
      return Yr(this, Uzt, "f");
    }
    get request_id() {
      return Yr(this, $zt, "f");
    }
    async withResponse() {
      Ia(this, _Le, !0, "f");
      let e = await Yr(this, $_t, "f");
      if (!e) throw Error("Could not resolve a `Response` object");
      return {
        data: this,
        response: e,
        request_id: e.headers.get("request-id")
      };
    }
    static fromReadableStream(e) {
      let t = new K_t(null);
      return t._run(() => t._fromReadableStream(e)), t;
    }
    static createMessage(e, t, n, {
      logger: r
    } = {}) {
      let o = new K_t(t, {
        logger: r
      });
      for (let s of t.messages) o._addMessageParam(s);
      return Ia(o, oGe, {
        ...t,
        stream: !0
      }, "f"), o._run(() => o._createMessage(e, {
        ...t,
        stream: !0
      }, {
        ...n,
        headers: {
          ...n?.headers,
          "X-Stainless-Helper-Method": "stream"
        }
      })), o;
    }
    _run(e) {
      e().then(() => {
        this._emitFinal(), this._emit("end");
      }, Yr(this, qzt, "f"));
    }
    _addMessageParam(e) {
      this.messages.push(e);
    }
    _addMessage(e, t = !0) {
      if (this.receivedMessages.push(e), t) this._emit("message", e);
    }
    async _createMessage(e, t, n) {
      let r = n?.signal,
        o;
      if (r) {
        if (r.aborted) this.controller.abort();
        o = this.controller.abort.bind(this.controller), r.addEventListener("abort", o);
      }
      try {
        Yr(this, NV, "m", dor).call(this);
        let {
          response: s,
          data: i
        } = await e.create({
          ...t,
          stream: !0
        }, {
          ...n,
          signal: this.controller.signal
        }).withResponse();
        this._connected(s);
        for await (let a of i) Yr(this, NV, "m", por).call(this, a);
        if (i.controller.signal?.aborted) throw new xm();
        Yr(this, NV, "m", mor).call(this);
      } finally {
        if (r && o) r.removeEventListener("abort", o);
      }
    }
    _connected(e) {
      if (this.ended) return;
      Ia(this, Uzt, e, "f"), Ia(this, $zt, e?.headers.get("request-id"), "f"), Yr(this, Mzt, "f").call(this, e), this._emit("connect");
    }
    get ended() {
      return Yr(this, G_t, "f");
    }
    get errored() {
      return Yr(this, Bzt, "f");
    }
    get aborted() {
      return Yr(this, Fzt, "f");
    }
    abort() {
      this.controller.abort();
    }
    on(e, t) {
      return (Yr(this, Yde, "f")[e] || (Yr(this, Yde, "f")[e] = [])).push({
        listener: t
      }), this;
    }
    off(e, t) {
      let n = Yr(this, Yde, "f")[e];
      if (!n) return this;
      let r = n.findIndex(o => o.listener === t);
      if (r >= 0) n.splice(r, 1);
      return this;
    }
    once(e, t) {
      return (Yr(this, Yde, "f")[e] || (Yr(this, Yde, "f")[e] = [])).push({
        listener: t,
        once: !0
      }), this;
    }
    emitted(e) {
      return new Promise((t, n) => {
        if (Ia(this, _Le, !0, "f"), e !== "error") this.once("error", n);
        this.once(e, t);
      });
    }
    async done() {
      Ia(this, _Le, !0, "f"), await Yr(this, j_t, "f");
    }
    get currentMessage() {
      return Yr(this, dSe, "f");
    }
    async finalMessage() {
      return await this.done(), Yr(this, NV, "m", uor).call(this);
    }
    async finalText() {
      return await this.done(), Yr(this, NV, "m", O$o).call(this);
    }
    _emit(e, ...t) {
      if (Yr(this, G_t, "f")) return;
      if (e === "end") Ia(this, G_t, !0, "f"), Yr(this, Nzt, "f").call(this);
      let n = Yr(this, Yde, "f")[e];
      if (n) Yr(this, Yde, "f")[e] = n.filter(r => !r.once), n.forEach(({
        listener: r
      }) => r(...t));
      if (e === "abort") {
        let r = t[0];
        if (!Yr(this, _Le, "f") && !n?.length) Promise.reject(r);
        Yr(this, q_t, "f").call(this, r), Yr(this, W_t, "f").call(this, r), this._emit("end");
        return;
      }
      if (e === "error") {
        let r = t[0];
        if (!Yr(this, _Le, "f") && !n?.length) Promise.reject(r);
        Yr(this, q_t, "f").call(this, r), Yr(this, W_t, "f").call(this, r), this._emit("end");
      }
    }
    _emitFinal() {
      if (this.receivedMessages.at(-1)) this._emit("finalMessage", Yr(this, NV, "m", uor).call(this));
    }
    async _fromReadableStream(e, t) {
      let n = t?.signal,
        r;
      if (n) {
        if (n.aborted) this.controller.abort();
        r = this.controller.abort.bind(this.controller), n.addEventListener("abort", r);
      }
      try {
        Yr(this, NV, "m", dor).call(this), this._connected(null);
        let o = g2.fromReadableStream(e, this.controller);
        for await (let s of o) Yr(this, NV, "m", por).call(this, s);
        if (o.controller.signal?.aborted) throw new xm();
        Yr(this, NV, "m", mor).call(this);
      } finally {
        if (n && r) n.removeEventListener("abort", r);
      }
    }
    [(dSe = new WeakMap(), oGe = new WeakMap(), $_t = new WeakMap(), Mzt = new WeakMap(), q_t = new WeakMap(), j_t = new WeakMap(), Nzt = new WeakMap(), W_t = new WeakMap(), Yde = new WeakMap(), G_t = new WeakMap(), Bzt = new WeakMap(), Fzt = new WeakMap(), _Le = new WeakMap(), Uzt = new WeakMap(), $zt = new WeakMap(), V_t = new WeakMap(), qzt = new WeakMap(), NV = new WeakSet(), uor = function () {
      if (this.receivedMessages.length === 0) throw new mi("stream ended without producing a Message with role=assistant");
      return this.receivedMessages.at(-1);
    }, O$o = function () {
      if (this.receivedMessages.length === 0) throw new mi("stream ended without producing a Message with role=assistant");
      let t = this.receivedMessages.at(-1).content.filter(n => n.type === "text").map(n => n.text);
      if (t.length === 0) throw new mi("stream ended without producing a content block with type=text");
      return t.join(" ");
    }, dor = function () {
      if (this.ended) return;
      Ia(this, dSe, void 0, "f");
    }, por = function (t) {
      if (this.ended) return;
      let n = Yr(this, NV, "m", L$o).call(this, t);
      switch (this._emit("streamEvent", t, n), t.type) {
        case "content_block_delta":
          {
            let r = n.content.at(-1);
            switch (t.delta.type) {
              case "text_delta":
                {
                  if (r.type === "text") this._emit("text", t.delta.text, r.text || "");
                  break;
                }
              case "citations_delta":
                {
                  if (r.type === "text") this._emit("citation", t.delta.citation, r.citations ?? []);
                  break;
                }
              case "input_json_delta":
                {
                  if (N$o(r) && r.input) this._emit("inputJson", t.delta.partial_json, r.input);
                  break;
                }
              case "thinking_delta":
                {
                  if (r.type === "thinking") this._emit("thinking", t.delta.thinking, r.thinking);
                  break;
                }
              case "signature_delta":
                {
                  if (r.type === "thinking") this._emit("signature", r.signature);
                  break;
                }
              case "compaction_delta":
                {
                  if (r.type === "compaction" && r.content) this._emit("compaction", r.content);
                  break;
                }
              default:
                B$o(t.delta);
            }
            break;
          }
        case "message_stop":
          {
            this._addMessageParam(n), this._addMessage(ior(n, Yr(this, oGe, "f"), {
              logger: Yr(this, V_t, "f")
            }), !0);
            break;
          }
        case "content_block_stop":
          {
            this._emit("contentBlock", n.content.at(-1));
            break;
          }
        case "message_start":
          {
            Ia(this, dSe, n, "f");
            break;
          }
        case "content_block_start":
        case "message_delta":
          break;
      }
    }, mor = function () {
      if (this.ended) throw new mi("stream has ended, this shouldn't happen");
      let t = Yr(this, dSe, "f");
      if (!t) throw new mi("request ended without sending any chunks");
      return Ia(this, dSe, void 0, "f"), ior(t, Yr(this, oGe, "f"), {
        logger: Yr(this, V_t, "f")
      });
    }, L$o = function (t) {
      let n = Yr(this, dSe, "f");
      if (t.type === "message_start") {
        if (n) throw new mi(`Unexpected event order, got ${t.type} before receiving "message_stop"`);
        return t.message;
      }
      if (!n) throw new mi(`Unexpected event order, got ${t.type} before "message_start"`);
      switch (t.type) {
        case "message_stop":
          return n;
        case "message_delta":
          if (n.container = t.delta.container, n.stop_reason = t.delta.stop_reason, n.stop_sequence = t.delta.stop_sequence, n.usage.output_tokens = t.usage.output_tokens, n.context_management = t.context_management, t.usage.input_tokens != null) n.usage.input_tokens = t.usage.input_tokens;
          if (t.usage.cache_creation_input_tokens != null) n.usage.cache_creation_input_tokens = t.usage.cache_creation_input_tokens;
          if (t.usage.cache_read_input_tokens != null) n.usage.cache_read_input_tokens = t.usage.cache_read_input_tokens;
          if (t.usage.server_tool_use != null) n.usage.server_tool_use = t.usage.server_tool_use;
          if (t.usage.iterations != null) n.usage.iterations = t.usage.iterations;
          return n;
        case "content_block_start":
          return n.content.push(t.content_block), n;
        case "content_block_delta":
          {
            let r = n.content.at(t.index);
            switch (t.delta.type) {
              case "text_delta":
                {
                  if (r?.type === "text") n.content[t.index] = {
                    ...r,
                    text: (r.text || "") + t.delta.text
                  };
                  break;
                }
              case "citations_delta":
                {
                  if (r?.type === "text") n.content[t.index] = {
                    ...r,
                    citations: [...(r.citations ?? []), t.delta.citation]
                  };
                  break;
                }
              case "input_json_delta":
                {
                  if (r && N$o(r)) {
                    let o = r[M$o] || "";
                    o += t.delta.partial_json;
                    let s = {
                      ...r
                    };
                    if (Object.defineProperty(s, M$o, {
                      value: o,
                      enumerable: !1,
                      writable: !0
                    }), o) try {
                      s.input = Ozt(o);
                    } catch (i) {
                      let a = new mi(`Unable to parse tool parameter JSON from model. Please retry your request or adjust your prompt. Error: ${i}. JSON: ${o}`);
                      Yr(this, qzt, "f").call(this, a);
                    }
                    n.content[t.index] = s;
                  }
                  break;
                }
              case "thinking_delta":
                {
                  if (r?.type === "thinking") n.content[t.index] = {
                    ...r,
                    thinking: r.thinking + t.delta.thinking
                  };
                  break;
                }
              case "signature_delta":
                {
                  if (r?.type === "thinking") n.content[t.index] = {
                    ...r,
                    signature: t.delta.signature
                  };
                  break;
                }
              case "compaction_delta":
                {
                  if (r?.type === "compaction") n.content[t.index] = {
                    ...r,
                    content: (r.content || "") + t.delta.content
                  };
                  break;
                }
              default:
                B$o(t.delta);
            }
            return n;
          }
        case "content_block_stop":
          return n;
      }
    }, Symbol.asyncIterator)]() {
      let e = [],
        t = [],
        n = !1;
      return this.on("streamEvent", r => {
        let o = t.shift();
        if (o) o.resolve(r);else e.push(r);
      }), this.on("end", () => {
        n = !0;
        for (let r of t) r.resolve(void 0);
        t.length = 0;
      }), this.on("abort", r => {
        n = !0;
        for (let o of t) o.reject(r);
        t.length = 0;
      }), this.on("error", r => {
        n = !0;
        for (let o of t) o.reject(r);
        t.length = 0;
      }), {
        next: async () => {
          if (!e.length) {
            if (n) return {
              value: void 0,
              done: !0
            };
            return new Promise((o, s) => t.push({
              resolve: o,
              reject: s
            })).then(o => o ? {
              value: o,
              done: !1
            } : {
              value: void 0,
              done: !0
            });
          }
          return {
            value: e.shift(),
            done: !1
          };
        },
        return: async () => (this.abort(), {
          value: void 0,
          done: !0
        })
      };
    }
    toReadableStream() {
      return new g2(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
    }
  };
});
export {N$o as k5o,B$o as H5o,NV as aK,dSe as Kbe,oGe as e7e,$_t as hbt,Mzt as hXt,q_t as gbt,j_t as _bt,Nzt as gXt,W_t as ybt,Yde as rpe,G_t as Tbt,Bzt as _Xt,Fzt as yXt,_Le as pMe,Uzt as TXt,$zt as SXt,V_t as Sbt,uor as Blr,O$o as R5o,qzt as bXt,dor as Ulr,por as $lr,mor as qlr,L$o as v5o,M$o as w5o,K_t as bbt,F$o as I5o};
