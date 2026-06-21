// @ts-nocheck
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {_o as Dq,bt as L_} from "../../vendor/m195.ts";
import {b as L} from "../../runtime.ts";
/**
 * Message listener registry for completed LLM turns.
 *
 * After each assistant turn finishes, `ydK` (notifyMessageListeners) is called
 * with the full message context so that registered callbacks can observe the
 * conversation state (e.g. for logging, analytics, or side-effects).
 *
 * `DkO` holds the list of registered listeners.
 * `vdK` is the lazy module initializer.
 */

/** Shape of the payload delivered to every registered message listener. */
interface MessageListenerPayload {
  messages: unknown;
  systemPrompt: unknown;
  userContext: unknown;
  systemContext: unknown;
  toolUseContext: unknown;
  querySource: unknown;
}

/** Callback signature for an entry in the `DkO` listener registry. */
type MessageListener = (payload: MessageListenerPayload) => Promise<void> | void;

/**
 * Notify all registered message listeners after a completed assistant turn.
 *
 * Iterates `DkO` and calls each listener with the turn context. Errors from
 * individual listeners are swallowed via `EH(Dq(err))` and do not propagate.
 */
async function ydK(
  messages: unknown,
  systemPrompt: unknown,
  userContext: unknown,
  systemContext: unknown,
  toolUseContext: unknown,
  querySource: unknown,
): Promise<void> {
  let payload: MessageListenerPayload = {
    messages: messages,
    systemPrompt: systemPrompt,
    userContext: userContext,
    systemContext: systemContext,
    toolUseContext: toolUseContext,
    querySource: querySource,
  };
  for (let listener of DkO) try {
    await listener(payload);
  } catch (err) {
    EH(Dq(err));
  }
}

/** Registry of active message listener callbacks populated during module init. */
var DkO: MessageListener[];

/** Lazy module initializer — wires dependencies and seeds `DkO` as an empty array. */
var vdK = L(() => {
  L_();
  S6();
  DkO = [];
});

export {ydK as gQa,DkO as Z2p,vdK as _Qa};
