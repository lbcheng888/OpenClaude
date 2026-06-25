// @ts-nocheck
import {N5 as RF,mYe as ZlH} from "./0750_level.ts";
import {logForDebugging as N,qe as FH} from "./0236_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
import {Wi as c7,Hn as V6} from "../../vendor/m100.ts";
import {ps as M9,Wt as Q_} from "../../vendor/m230.ts";
/**
 * IP-address / CIDR utilities and mTLS (mutual-TLS) HTTPS agent configuration.
 *
 * Exports (via the `El` lazy-init block):
 *  - `NO8`  – Test whether a host IP falls inside a CIDR network.
 *  - `S8H`  – Return the flat mTLS options object (cert / key / ca).
 *  - `GlH`  – Return the mTLS options wrapped under a `tls` key.
 *  - `Tsq`  – Clear the mTLS config + HTTPS-agent memoisation caches.
 *  - `zsq`  – Warn when NODE_EXTRA_CA_CERTS is set alongside a custom cert.
 *  - `El`   – Module lazy initializer (sets up `LI` and `VO8` memoised getters).
 */

// ---------------------------------------------------------------------------
// IP-address / CIDR helpers (pure, no I/O)
// ---------------------------------------------------------------------------

/**
 * Return `true` when the IP address `hostAddr` falls inside the CIDR network
 * `cidrNetwork` (e.g. `"192.168.0.0/16"`).
 *
 * Supports both IPv4 and IPv6.  The host address may carry an IPv6 zone ID.
 * IPv6-mapped IPv4 addresses are normalised before comparison.
 *
 * @param hostAddr    - IP address string (IPv4 or IPv6, possibly with zone).
 * @param cidrNetwork - CIDR notation string (address + "/" + prefix length).
 */
function NO8(hostAddr: string, cidrNetwork: string): boolean {
  let slashPos = cidrNetwork.lastIndexOf("/");
  if (slashPos < 0) return !1;
  let networkAddr = cidrNetwork.slice(0, slashPos),
    prefixStr = cidrNetwork.slice(slashPos + 1);
  if (!/^\d+$/.test(prefixStr)) return !1;
  let prefixLen = parseInt(prefixStr, 10),
    networkParsed = parseIpAddress(networkAddr);
  if (!networkParsed) return !1;
  if (networkParsed.zone) return !1;
  let hostParsed = parseIpAddress(hostAddr);
  if (!hostParsed) return !1;
  let hostBytes = normalizeIpv6MappedIpv4(hostParsed.bytes),
    networkBytes = networkParsed.bytes;
  if (hostBytes.length !== networkBytes.length) return !1;
  let maxBits = networkBytes.length * 8;
  if (prefixLen < 0 || prefixLen > maxBits) return !1;
  return matchesPrefixBits(hostBytes, networkBytes, prefixLen);
}

/**
 * Compare the first `prefixLen` bits of two equal-length byte arrays.
 *
 * Returns `true` when all prefix bits are identical.
 *
 * @param hostBytes    - Byte array for the host address.
 * @param networkBytes - Byte array for the network address.
 * @param prefixLen    - Number of leading bits to compare.
 */
function matchesPrefixBits(hostBytes: Uint8Array, networkBytes: Uint8Array, prefixLen: number): boolean {
  let fullBytes = prefixLen >> 3;
  for (let i = 0; i < fullBytes; i++) if (hostBytes[i] !== networkBytes[i]) return !1;
  let remainingBits = prefixLen & 7;
  if (remainingBits === 0) return !0;
  let mask = 255 << 8 - remainingBits & 255;
  return ((hostBytes[fullBytes] ?? 0) & mask) === ((networkBytes[fullBytes] ?? 0) & mask);
}

/**
 * If `bytes` is a 16-byte IPv6-mapped IPv4 address (`::ffff:x.x.x.x`),
 * return the last 4 bytes (the embedded IPv4 address).  Otherwise return
 * `bytes` unchanged.
 *
 * @param bytes - Raw IP address byte array (4 or 16 bytes).
 */
function normalizeIpv6MappedIpv4(bytes: Uint8Array): Uint8Array {
  if (bytes.length !== 16) return bytes;
  for (let i = 0; i < 10; i++) if (bytes[i] !== 0) return bytes;
  if (bytes[10] !== 255 || bytes[11] !== 255) return bytes;
  return bytes.slice(12);
}

/** Parsed representation of an IP address. */
interface ParsedIpAddress {
  bytes: Uint8Array;
  /** IPv6 zone ID (empty string for IPv4 or zone-less IPv6). */
  zone: string;
}

/**
 * Parse an IP address string into a `ParsedIpAddress` object.
 *
 * Accepts:
 *  - IPv4 dotted-decimal (`"1.2.3.4"`)
 *  - IPv6 with optional zone ID (`"fe80::1%eth0"`)
 *
 * Returns `null` for any invalid input.
 *
 * @param addr - IP address string.
 */
function parseIpAddress(addr: string): ParsedIpAddress | null {
  if (addr === "") return null;
  let zone = "",
    addrWithoutZone = addr,
    percentPos = addr.indexOf("%");
  if (percentPos >= 0) zone = addr.slice(percentPos + 1), addrWithoutZone = addr.slice(0, percentPos);
  if (addrWithoutZone.includes(":")) {
    let ipv6Bytes = parseIpv6(addrWithoutZone);
    return ipv6Bytes ? {
      bytes: ipv6Bytes,
      zone: zone
    } : null;
  }
  if (zone) return null;
  let ipv4Bytes = parseIpv4(addrWithoutZone);
  return ipv4Bytes ? {
    bytes: ipv4Bytes,
    zone: ""
  } : null;
}

/**
 * Parse an IPv4 dotted-decimal string into a 4-byte `Uint8Array`.
 *
 * Returns `null` for invalid input (wrong number of octets, out-of-range
 * values, leading zeros, etc.).
 *
 * @param addr - IPv4 string such as `"192.168.1.1"`.
 */
function parseIpv4(addr: string): Uint8Array | null {
  let octets = addr.split(".");
  if (octets.length !== 4) return null;
  let bytes = new Uint8Array(4);
  for (let i = 0; i < 4; i++) {
    let octet = octets[i];
    if (octet === void 0 || octet === "" || !/^\d{1,3}$/.test(octet)) return null;
    if (octet.length > 1 && octet.startsWith("0")) return null;
    let value = parseInt(octet, 10);
    if (value > 255) return null;
    bytes[i] = value;
  }
  return bytes;
}

/**
 * Parse an IPv6 address string (without zone ID) into a 16-byte `Uint8Array`.
 *
 * Supports:
 *  - Full form (`"2001:db8::1"`)
 *  - `::` compressed notation
 *  - IPv4-mapped suffix (`"::ffff:192.0.2.1"`)
 *
 * Returns `null` on any parse error.
 *
 * @param addr - IPv6 address string (no zone suffix, no brackets).
 */
function parseIpv6(addr: string): Uint8Array | null {
  let ipv4Suffix: Uint8Array | null = null,
    addrToParse = addr,
    lastColon = addr.lastIndexOf(":");
  if (lastColon >= 0 && addr.slice(lastColon + 1).includes(".")) {
    if (ipv4Suffix = parseIpv4(addr.slice(lastColon + 1)), !ipv4Suffix) return null;
    addrToParse = addr.slice(0, lastColon + 1);
  }
  let parts = addrToParse.split("::");
  if (parts.length > 2) return null;
  let groups: number[] = [],
    parseHexGroups = (segment: string, trailingColon: boolean): number[] | null => {
      if (segment === "") return [];
      let tokens = segment.split(":"),
        result: number[] = [];
      for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (token === "" && trailingColon && i === tokens.length - 1) continue;
        if (token === void 0 || token === "" || !/^[0-9a-fA-F]{1,4}$/.test(token)) return null;
        result.push(parseInt(token, 16));
      }
      return result;
    };
  if (parts.length === 1) {
    let segment = parts[0] ?? "",
      parsed = parseHexGroups(segment, ipv4Suffix !== null);
    if (!parsed) return null;
    groups.push(...parsed);
    let expectedGroups = ipv4Suffix ? 6 : 8;
    if (groups.length !== expectedGroups) return null;
  } else {
    let leftSegment = parts[0] ?? "",
      rightSegment = parts[1] ?? "",
      leftGroups = parseHexGroups(leftSegment, !1),
      rightGroups = parseHexGroups(rightSegment, ipv4Suffix !== null);
    if (!leftGroups || !rightGroups) return null;
    let ipv4GroupCount = ipv4Suffix ? 2 : 0,
      zeroGroupCount = 8 - leftGroups.length - rightGroups.length - ipv4GroupCount;
    if (zeroGroupCount < 1) return null;
    groups.push(...leftGroups);
    for (let i = 0; i < zeroGroupCount; i++) groups.push(0);
    if (groups.push(...rightGroups), groups.length + ipv4GroupCount !== 8) return null;
  }
  let result = new Uint8Array(16);
  for (let i = 0; i < groups.length; i++) {
    let group = groups[i];
    if (group === void 0) return null;
    result[i * 2] = group >> 8 & 255, result[i * 2 + 1] = group & 255;
  }
  if (ipv4Suffix) result[12] = ipv4Suffix[0] ?? 0, result[13] = ipv4Suffix[1] ?? 0, result[14] = ipv4Suffix[2] ?? 0, result[15] = ipv4Suffix[3] ?? 0;
  return result;
}

// ---------------------------------------------------------------------------
// No-op module-init placeholder
// ---------------------------------------------------------------------------

/** No-op lazy initializer — placeholder for a module with no setup logic. */
var Ksq = () => {};

// ---------------------------------------------------------------------------
// mTLS helper functions
// ---------------------------------------------------------------------------

/** Options accepted by `https.Agent` / TLS for a client certificate. */
interface MtlsOptions {
  cert?: string;
  key?: string;
  passphrase?: string;
  ca?: string[];
}

/**
 * Return the flat mTLS configuration object (cert, key, optional passphrase,
 * optional CA bundle) or `undefined` when no mTLS environment variables are set.
 */
function S8H(): MtlsOptions | undefined {
  let clientCertOptions = LI(),
    caCerts = RF();
  if (!clientCertOptions && !caCerts) return;
  return {
    ...clientCertOptions,
    ...(caCerts && {
      ca: caCerts
    })
  };
}

/**
 * Return an object with a single `tls` key containing the mTLS options, or an
 * empty object when no mTLS environment variables are set.
 *
 * Suitable for spreading into a `fetch`/agent options bag.
 */
function GlH(): {
  tls?: MtlsOptions;
} {
  let clientCertOptions = LI(),
    caCerts = RF();
  if (!clientCertOptions && !caCerts) return {};
  return {
    tls: {
      ...clientCertOptions,
      ...(caCerts && {
        ca: caCerts
      })
    }
  };
}

/**
 * Invalidate the memoisation caches for both the client-cert options (`LI`)
 * and the pre-built HTTPS agent (`VO8`).
 */
function Tsq(): void {
  LI.cache.clear?.(), VO8.cache.clear?.(), N("Cleared mTLS configuration cache");
}

/**
 * Log a notice when `NODE_EXTRA_CA_CERTS` is set, reminding the operator that
 * Node.js appends those certificates automatically on top of the built-in CAs.
 *
 * Only emits the notice when at least one custom mTLS env var is configured.
 */
function zsq(): void {
  if (!LI()) return;
  if (process.env.NODE_EXTRA_CA_CERTS) N("NODE_EXTRA_CA_CERTS detected - Node.js will automatically append to built-in CAs");
}

// ---------------------------------------------------------------------------
// Module-level lazy state
// ---------------------------------------------------------------------------

/** The `https` built-in module (imported inside the lazy initializer). */
var Osq: typeof import("https");

/**
 * Memoised getter that reads `CLAUDE_CODE_CLIENT_CERT`, `CLAUDE_CODE_CLIENT_KEY`,
 * and `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE` from the environment and returns a
 * partial `https.Agent` options object, or `undefined` when none are set.
 */
var LI: (() => MtlsOptions | undefined) & {
  cache?: Map<unknown, unknown>;
};

/**
 * Memoised getter that combines the client-cert options from `LI` with the CA
 * bundle from `RF` and returns a fully-configured `https.Agent`, or `undefined`
 * when no mTLS config is present.
 */
var VO8: (() => import("https").Agent | undefined) & {
  cache?: Map<unknown, unknown>;
};

// ---------------------------------------------------------------------------
// Lazy module initializer
// ---------------------------------------------------------------------------

var El = L(() => {
  c7();
  ZlH();
  FH();
  M9();
  Osq = require("https"), LI = V6(() => {
    let opts: MtlsOptions = {};
    if (process.env.CLAUDE_CODE_CLIENT_CERT) try {
      opts.cert = Q_().readFileSync(process.env.CLAUDE_CODE_CLIENT_CERT, {
        encoding: "utf8"
      }), N("mTLS: Loaded client certificate from CLAUDE_CODE_CLIENT_CERT");
    } catch (err) {
      N(`mTLS: Failed to load client certificate: ${err}`, {
        level: "error"
      });
    }
    if (process.env.CLAUDE_CODE_CLIENT_KEY) try {
      opts.key = Q_().readFileSync(process.env.CLAUDE_CODE_CLIENT_KEY, {
        encoding: "utf8"
      }), N("mTLS: Loaded client key from CLAUDE_CODE_CLIENT_KEY");
    } catch (err) {
      N(`mTLS: Failed to load client key: ${err}`, {
        level: "error"
      });
    }
    if (process.env.CLAUDE_CODE_CLIENT_KEY_PASSPHRASE) opts.passphrase = process.env.CLAUDE_CODE_CLIENT_KEY_PASSPHRASE, N("mTLS: Using client key passphrase");
    if (Object.keys(opts).length === 0) return;
    return opts;
  }), VO8 = V6(() => {
    let clientCertOptions = LI(),
      caCerts = RF();
    if (!clientCertOptions && !caCerts) return;
    let agentOpts = {
      ...clientCertOptions,
      ...(caCerts && {
        ca: caCerts
      }),
      keepAlive: !0
    };
    return N("mTLS: Creating HTTPS agent with custom certificates"), new Osq.Agent(agentOpts);
  });
});
export {NO8 as Ebr,matchesPrefixBits as vcu,normalizeIpv6MappedIpv4 as wcu,parseIpAddress as bcs,parseIpv4 as Ecs,parseIpv6 as kcu,Ksq as Cbr,S8H as woe,GlH as fYe,Tsq as Acs,zsq as Rcs,Osq as Ccs,LI as u2,VO8 as Abr,El as zK};
