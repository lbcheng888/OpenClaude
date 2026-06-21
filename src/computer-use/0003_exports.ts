// @ts-nocheck
import {X as s} from "../../runtime.ts";
/**
 * Module 0003 — native computer-use input addon loader.
 *
 * Registers the `computer-use-input.node` native addon (keyboard/mouse input
 * injection on macOS) as a lazily-required CommonJS module via the esbuild/Bun
 * bundle `__commonJS` helper `s`.  The result (`_kq`) is imported by other
 * modules in the computer-use subsystem (e.g. `3205_unhideComputerUseApps.ts`)
 * to access the native input API.
 *
 * Cross-module names (`s`, `_kq`) are kept minified to preserve linkage.
 */

/** Lazily-loaded `computer-use-input.node` native addon module factory. */
var _kq = s((exports: NodeJS.Dict<unknown>, module: { exports: unknown }) => {
  module.exports = require(globalThis.__ocNative("computer-use-input.node"));
});

export {_kq as gBo};
