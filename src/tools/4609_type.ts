// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {lt as w_} from "../session/0131_sent.ts";
import {tA as Bz} from "../config/2201_tA.ts";
import {Dul as aq4,Iul as oq4} from "../telemetry/4608_call.ts";
// Module: tools/4586_type — `/toggle-memory` slash-command descriptor.
//
// Declares and exports the `toggle-memory` local slash-command object.
// This command is always hidden (`isHidden: false` would expose it, but
// `isEnabled` returns `!1` unconditionally — the feature is disabled by
// default at definition time and enabled only when the runtime config
// permits it).  The actual implementation (call handler) lives in the
// companion module `telemetry/4585_call` (`oq4` namespace), which is
// lazy-loaded via `aq4()`.
//
// 1:1 reverse-engineering: only internal symbols were renamed, types
// added, and doc comments inserted.  All logic, control flow, operators
// (!0/!1), string literals, and cross-module references are preserved
// EXACTLY.
//
// Cross-module symbols kept verbatim (defined in other bundle chunks):
//   `L`   — lazy module-initializer factory (esbuild __esm wrapper)
//   `j_`  — namespace export helper (__export)
//   `w_`  — module init loader (config/core subsystem)
//   `Bz`  — module init loader (memory/config subsystem, 2197_Bz)
//   `aq4` — lazy module initializer for telemetry/4585_call (toggle handler)
//   `oq4` — namespace export object for telemetry/4585_call (`call` export)

/** Lazy module-initializer factory (esbuild `__esm`). */
declare function L(init: () => void): () => void;

/** Namespace export helper (esbuild `__export`). */
declare function j_(target: object, exports: Record<string, () => unknown>): void;

/** Module dependency init: config/core subsystem. */
declare function w_(): void;

/** Module dependency init: memory/config subsystem (2197_Bz). */
declare function Bz(): void;

/** Lazy initializer for telemetry/4585_call (toggle-memory call handler). */
declare function aq4(): void;

/** Namespace object exported by telemetry/4585_call. */
declare const oq4: { call: (...args: unknown[]) => unknown };

// ---------------------------------------------------------------------------
// Slash-command descriptor interface
// ---------------------------------------------------------------------------

/** A `local` slash-command: executes a plain async `call` function. */
interface LocalSlashCommand {
  type: "local";
  name: string;
  description: string;
  isEnabled: () => boolean;
  isHidden: boolean;
  supportsNonInteractive: boolean;
  thinClientDispatch: string;
  /** Lazily loads the call namespace for this command. */
  load: () => Promise<{ call: (...args: unknown[]) => unknown }>;
  userFacingName(): string;
}

// ---------------------------------------------------------------------------
// Module-level slash-command descriptor variables
// ---------------------------------------------------------------------------

/**
 * The `/toggle-memory` slash-command descriptor.
 * Always disabled at the descriptor level (`isEnabled` returns `!1`);
 * gating logic lives in the runtime config layer.
 */
var RUO: LocalSlashCommand;

/**
 * Re-export alias for `RUO` (the toggle-memory descriptor).
 * `SYq` is the name used by cross-module consumers that import this descriptor.
 */
var SYq: LocalSlashCommand;

// ---------------------------------------------------------------------------
// Lazy module initializer
// ---------------------------------------------------------------------------

/** Lazy module initializer: populates the toggle-memory slash-command descriptor. */
var sq4 = L(() => {
  w_();
  Bz();
  RUO = {
    type: "local",
    name: "toggle-memory",
    description: "Toggle automemory off/on for this session",
    isEnabled: () => !1,
    isHidden: !1,
    supportsNonInteractive: !1,
    thinClientDispatch: "post-text",
    load: () => Promise.resolve().then(() => (aq4(), oq4)),
    userFacingName() {
      return "toggle-memory";
    }
  }, SYq = RUO;
});

export {RUO as OKp,SYq as sSo,sq4 as Pul};
