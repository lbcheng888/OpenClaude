// @ts-nocheck
import {hasAnthropicApiKeyAuth as iz6,Ao as Mq} from "../config/2031_withOAuthRefreshLock.ts";
import {je as oH} from "../../vendor/m577.ts";
import {t$t as KI_,$Ma as TSK} from "../tui/3947_runPostLoginHooks.ts";
import {b as L} from "../../runtime.ts";
import {Lr as _q} from "../../vendor/m578.ts";
// Restored from obfuscated Claude Code 2.1.177.
// 1:1 reverse-engineering: only renames, types, and doc comments were added.
// Behavior, control flow, operators (incl. !0/!1), string literals, and all
// cross-module / property references are preserved exactly.

// --- External (cross-module) symbols, kept by their recovered/minified names ---

/** Lazy-module init wrapper (ESM-chunk lazy-init pattern). */
declare function L(init: () => void): () => void;

/** Env/config accessor object (process.env wrapper with typed keys). */
declare const oH: {
  DISABLE_LOGIN_COMMAND: boolean | string | undefined;
  [key: string]: unknown;
};

/**
 * Returns `true` when the user already has a stored Anthropic API key/auth
 * credential — used to change the login command description to "Switch accounts"
 * rather than "Sign in".
 *
 * Recovered name: `hasAnthropicApiKeyAuth` (module: auth/credentials).
 */
declare function iz6(): boolean;

/** Lazy init thunk for the login UI module (tui/4108_runPostLoginHooks). */
declare function KI_(): void;

/**
 * Module namespace object for the login UI module, populated after `KI_()`.
 * Contains: `runPostLoginHooks`, `call`, `Login`.
 */
declare const TSK: object;

/** Lazy init thunk for the OAuth/credential module (config/2192). */
declare function Mq(): void;

/** Lazy init thunk for the env/config module (sets up `oH`). */
declare function _q(): void;

// --- Module exports ---

/**
 * Factory that returns the login slash-command descriptor.
 *
 * The description is computed lazily via a getter so it reflects whether the
 * user is already signed in at the moment the command palette renders.
 */
var m94 = (): {
  type: "local-jsx";
  name: string;
  description: string;
  isEnabled: () => boolean;
  load: () => Promise<typeof TSK>;
} => ({
  type: "local-jsx",
  name: "login",
  get description() {
    return iz6() ? "Switch Anthropic accounts" : "Sign in with your Anthropic account";
  },
  isEnabled: () => !oH.DISABLE_LOGIN_COMMAND,
  load: () => Promise.resolve().then(() => (KI_(), TSK))
});

/** Module init thunk: initialises the OAuth/credential module and env config. */
var p94 = L(() => {
  Mq();
  _q();
});

export {m94 as wdl,p94 as Rdl};
