// @ts-nocheck
import {X as s} from "../../runtime.ts";
// Native Node.js addon loader for the macOS Swift-based computer-use subsystem.
//
// `computerUseSwiftNativeAddon` is the lazy CommonJS module wrapper for the
// prebuilt binary `computer-use-swift.node`.  `s` is the bundle's shared
// esbuild module-init helper (cross-module; resolves at runtime):
//   s = (factory, cache) => () => (cache || factory((cache = {exports:{}}).exports, cache), cache.exports)
// It runs the factory once and memoizes `module.exports`.
//
// The addon exposes the native macOS GUI-control API (screen capture,
// accessibility tree queries, synthetic input events, etc.) implemented in
// Swift and compiled to a platform-specific `.node` binary that ships bundled
// inside the Bun executable at `/$bunfs/root/computer-use-swift.node`.
//
// @returns the native addon's exported object (via module.exports).
var computerUseSwiftNativeAddon = s(
  (_exports: Record<string, unknown>, module: { exports: unknown }) => {
    module.exports = require(globalThis.__ocNative("computer-use-swift.node"));
  }
);

export {computerUseSwiftNativeAddon as hBo};
