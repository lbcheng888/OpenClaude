// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {gs as $9,sh as t$} from "../../vendor/m2589.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {we as kH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
var ckK = {};
j_(ckK, {
  isChannelsEnabled: () => isChannelsEnabled,
  isChannelAllowlisted: () => isChannelAllowlisted,
  getChannelAllowlist: () => getChannelAllowlist
});

/** Returns the current channel allowlist from config (tengu_harbor_ledger). */
function getChannelAllowlist(): Array<{ marketplace: string; plugin: string }> {
  let rawValue = Y_("tengu_harbor_ledger", []),
    parseResult = hYO().safeParse(rawValue);
  return parseResult.success ? parseResult.data : [];
}

/** Returns whether the channels (harbor) feature flag is enabled. */
function isChannelsEnabled(): boolean {
  return Y_("tengu_harbor", !1);
}

/** Returns true if the given plugin descriptor's marketplace+name pair is in the allowlist. */
function isChannelAllowlisted(pluginDescriptor: unknown): boolean {
  if (!pluginDescriptor) return !1;
  let {
    name: pluginName,
    marketplace: marketplaceName
  } = $9(pluginDescriptor);
  if (!marketplaceName) return !1;
  return getChannelAllowlist().some(entry => entry.plugin === pluginName && entry.marketplace === marketplaceName);
}

/** Lazy-initialized Zod schema for the channel allowlist: array of {marketplace, plugin}. */
var hYO: () => { safeParse: (val: unknown) => { success: true; data: Array<{ marketplace: string; plugin: string }> } | { success: false } };
var bK_ = L(() => {
  a8();
  t$();
  o6();
  hYO = kH(() => k.array(k.object({
    marketplace: k.string(),
    plugin: k.string()
  })));
});

export {ckK as Wqa,getChannelAllowlist,isChannelsEnabled,isChannelAllowlisted,hYO as $Ip,bK_ as xut};
