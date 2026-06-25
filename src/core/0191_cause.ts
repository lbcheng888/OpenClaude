// @ts-nocheck
import {b} from "../../runtime.ts";
import {Qde as Wde,ma as Ia,Zde as Gde,qp as xm,Qs as mi,Xr as Yr} from "../../vendor/m137.ts";
import {npe as zde} from "../../vendor/m170.ts";
import {fXt as Lzt,Flr as cor,mXt as Ozt} from "../../vendor/m175.ts";
import {rcr as kor,tcr as Ror} from "../../vendor/m189.ts";
import {FU as g2} from "./0152_event.ts";
function J$o(e) {
  return e.type === "tool_use" || e.type === "server_tool_use";
}
function X$o(e) {}
var BV,
  ASe,
  cGe,
  tyt,
  Wzt,
  nyt,
  ryt,
  Gzt,
  oyt,
  Xde,
  syt,
  Vzt,
  Kzt,
  SLe,
  zzt,
  Yzt,
  iyt,
  Hor,
  K$o,
  Ior,
  Dor,
  Por,
  Oor,
  z$o,
  Y$o = "__json_buf",
  ayt;
var Q$o = b(() => {
  Wde();
  zde();
  Lzt();
  cor();
  kor();
  ayt = class ayt {
    constructor(e, t) {
      BV.add(this), this.messages = [], this.receivedMessages = [], ASe.set(this, void 0), cGe.set(this, null), this.controller = new AbortController(), tyt.set(this, void 0), Wzt.set(this, () => {}), nyt.set(this, () => {}), ryt.set(this, void 0), Gzt.set(this, () => {}), oyt.set(this, () => {}), Xde.set(this, {}), syt.set(this, !1), Vzt.set(this, !1), Kzt.set(this, !1), SLe.set(this, !1), zzt.set(this, void 0), Yzt.set(this, void 0), iyt.set(this, void 0), Ior.set(this, n => {
        if (Ia(this, Vzt, !0, "f"), Gde(n)) n = new xm();
        if (n instanceof xm) return Ia(this, Kzt, !0, "f"), this._emit("abort", n);
        if (n instanceof mi) return this._emit("error", n);
        if (n instanceof Error) {
          let r = new mi(n.message);
          return r.cause = n, this._emit("error", r);
        }
        return this._emit("error", new mi(String(n)));
      }), Ia(this, tyt, new Promise((n, r) => {
        Ia(this, Wzt, n, "f"), Ia(this, nyt, r, "f");
      }), "f"), Ia(this, ryt, new Promise((n, r) => {
        Ia(this, Gzt, n, "f"), Ia(this, oyt, r, "f");
      }), "f"), Yr(this, tyt, "f").catch(() => {}), Yr(this, ryt, "f").catch(() => {}), Ia(this, cGe, e, "f"), Ia(this, iyt, t?.logger ?? console, "f");
    }
    get response() {
      return Yr(this, zzt, "f");
    }
    get request_id() {
      return Yr(this, Yzt, "f");
    }
    async withResponse() {
      Ia(this, SLe, !0, "f");
      let e = await Yr(this, tyt, "f");
      if (!e) throw Error("Could not resolve a `Response` object");
      return {
        data: this,
        response: e,
        request_id: e.headers.get("request-id")
      };
    }
    static fromReadableStream(e) {
      let t = new ayt(null);
      return t._run(() => t._fromReadableStream(e)), t;
    }
    static createMessage(e, t, n, {
      logger: r
    } = {}) {
      let o = new ayt(t, {
        logger: r
      });
      for (let s of t.messages) o._addMessageParam(s);
      return Ia(o, cGe, {
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
      }, Yr(this, Ior, "f"));
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
        Yr(this, BV, "m", Dor).call(this);
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
        for await (let a of i) Yr(this, BV, "m", Por).call(this, a);
        if (i.controller.signal?.aborted) throw new xm();
        Yr(this, BV, "m", Oor).call(this);
      } finally {
        if (r && o) r.removeEventListener("abort", o);
      }
    }
    _connected(e) {
      if (this.ended) return;
      Ia(this, zzt, e, "f"), Ia(this, Yzt, e?.headers.get("request-id"), "f"), Yr(this, Wzt, "f").call(this, e), this._emit("connect");
    }
    get ended() {
      return Yr(this, syt, "f");
    }
    get errored() {
      return Yr(this, Vzt, "f");
    }
    get aborted() {
      return Yr(this, Kzt, "f");
    }
    abort() {
      this.controller.abort();
    }
    on(e, t) {
      return (Yr(this, Xde, "f")[e] || (Yr(this, Xde, "f")[e] = [])).push({
        listener: t
      }), this;
    }
    off(e, t) {
      let n = Yr(this, Xde, "f")[e];
      if (!n) return this;
      let r = n.findIndex(o => o.listener === t);
      if (r >= 0) n.splice(r, 1);
      return this;
    }
    once(e, t) {
      return (Yr(this, Xde, "f")[e] || (Yr(this, Xde, "f")[e] = [])).push({
        listener: t,
        once: !0
      }), this;
    }
    emitted(e) {
      return new Promise((t, n) => {
        if (Ia(this, SLe, !0, "f"), e !== "error") this.once("error", n);
        this.once(e, t);
      });
    }
    async done() {
      Ia(this, SLe, !0, "f"), await Yr(this, ryt, "f");
    }
    get currentMessage() {
      return Yr(this, ASe, "f");
    }
    async finalMessage() {
      return await this.done(), Yr(this, BV, "m", Hor).call(this);
    }
    async finalText() {
      return await this.done(), Yr(this, BV, "m", K$o).call(this);
    }
    _emit(e, ...t) {
      if (Yr(this, syt, "f")) return;
      if (e === "end") Ia(this, syt, !0, "f"), Yr(this, Gzt, "f").call(this);
      let n = Yr(this, Xde, "f")[e];
      if (n) Yr(this, Xde, "f")[e] = n.filter(r => !r.once), n.forEach(({
        listener: r
      }) => r(...t));
      if (e === "abort") {
        let r = t[0];
        if (!Yr(this, SLe, "f") && !n?.length) Promise.reject(r);
        Yr(this, nyt, "f").call(this, r), Yr(this, oyt, "f").call(this, r), this._emit("end");
        return;
      }
      if (e === "error") {
        let r = t[0];
        if (!Yr(this, SLe, "f") && !n?.length) Promise.reject(r);
        Yr(this, nyt, "f").call(this, r), Yr(this, oyt, "f").call(this, r), this._emit("end");
      }
    }
    _emitFinal() {
      if (this.receivedMessages.at(-1)) this._emit("finalMessage", Yr(this, BV, "m", Hor).call(this));
    }
    async _fromReadableStream(e, t) {
      let n = t?.signal,
        r;
      if (n) {
        if (n.aborted) this.controller.abort();
        r = this.controller.abort.bind(this.controller), n.addEventListener("abort", r);
      }
      try {
        Yr(this, BV, "m", Dor).call(this), this._connected(null);
        let o = g2.fromReadableStream(e, this.controller);
        for await (let s of o) Yr(this, BV, "m", Por).call(this, s);
        if (o.controller.signal?.aborted) throw new xm();
        Yr(this, BV, "m", Oor).call(this);
      } finally {
        if (n && r) n.removeEventListener("abort", r);
      }
    }
    [(ASe = new WeakMap(), cGe = new WeakMap(), tyt = new WeakMap(), Wzt = new WeakMap(), nyt = new WeakMap(), ryt = new WeakMap(), Gzt = new WeakMap(), oyt = new WeakMap(), Xde = new WeakMap(), syt = new WeakMap(), Vzt = new WeakMap(), Kzt = new WeakMap(), SLe = new WeakMap(), zzt = new WeakMap(), Yzt = new WeakMap(), iyt = new WeakMap(), Ior = new WeakMap(), BV = new WeakSet(), Hor = function () {
      if (this.receivedMessages.length === 0) throw new mi("stream ended without producing a Message with role=assistant");
      return this.receivedMessages.at(-1);
    }, K$o = function () {
      if (this.receivedMessages.length === 0) throw new mi("stream ended without producing a Message with role=assistant");
      let t = this.receivedMessages.at(-1).content.filter(n => n.type === "text").map(n => n.text);
      if (t.length === 0) throw new mi("stream ended without producing a content block with type=text");
      return t.join(" ");
    }, Dor = function () {
      if (this.ended) return;
      Ia(this, ASe, void 0, "f");
    }, Por = function (t) {
      if (this.ended) return;
      let n = Yr(this, BV, "m", z$o).call(this, t);
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
                  if (J$o(r) && r.input) this._emit("inputJson", t.delta.partial_json, r.input);
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
              default:
                X$o(t.delta);
            }
            break;
          }
        case "message_stop":
          {
            this._addMessageParam(n), this._addMessage(Ror(n, Yr(this, cGe, "f"), {
              logger: Yr(this, iyt, "f")
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
            Ia(this, ASe, n, "f");
            break;
          }
        case "content_block_start":
        case "message_delta":
          break;
      }
    }, Oor = function () {
      if (this.ended) throw new mi("stream has ended, this shouldn't happen");
      let t = Yr(this, ASe, "f");
      if (!t) throw new mi("request ended without sending any chunks");
      return Ia(this, ASe, void 0, "f"), Ror(t, Yr(this, cGe, "f"), {
        logger: Yr(this, iyt, "f")
      });
    }, z$o = function (t) {
      let n = Yr(this, ASe, "f");
      if (t.type === "message_start") {
        if (n) throw new mi(`Unexpected event order, got ${t.type} before receiving "message_stop"`);
        return t.message;
      }
      if (!n) throw new mi(`Unexpected event order, got ${t.type} before "message_start"`);
      switch (t.type) {
        case "message_stop":
          return n;
        case "message_delta":
          if (n.stop_reason = t.delta.stop_reason, n.stop_sequence = t.delta.stop_sequence, n.usage.output_tokens = t.usage.output_tokens, t.usage.input_tokens != null) n.usage.input_tokens = t.usage.input_tokens;
          if (t.usage.cache_creation_input_tokens != null) n.usage.cache_creation_input_tokens = t.usage.cache_creation_input_tokens;
          if (t.usage.cache_read_input_tokens != null) n.usage.cache_read_input_tokens = t.usage.cache_read_input_tokens;
          if (t.usage.server_tool_use != null) n.usage.server_tool_use = t.usage.server_tool_use;
          return n;
        case "content_block_start":
          return n.content.push({
            ...t.content_block
          }), n;
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
                  if (r && J$o(r)) {
                    let o = r[Y$o] || "";
                    o += t.delta.partial_json;
                    let s = {
                      ...r
                    };
                    if (Object.defineProperty(s, Y$o, {
                      value: o,
                      enumerable: !1,
                      writable: !0
                    }), o) s.input = Ozt(o);
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
              default:
                X$o(t.delta);
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
export {J$o as $5o,X$o as q5o,BV as lK,ASe as Jbe,cGe as s7e,tyt as Hbt,Wzt as CXt,nyt as Ibt,ryt as xbt,Gzt as AXt,oyt as Dbt,Xde as spe,syt as Pbt,Vzt as RXt,Kzt as vXt,SLe as hMe,zzt as wXt,Yzt as kXt,iyt as Obt,Hor as ocr,K$o as F5o,Ior as scr,Dor as icr,Por as acr,Oor as lcr,z$o as B5o,Y$o as U5o,ayt as Lbt,Q$o as W5o};
