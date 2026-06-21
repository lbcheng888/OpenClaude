// @ts-nocheck
import {logForDebugging as N,qe as FH} from "./0234_setHasFormattedOutput.ts";
import {_We as OQH,sn as A6} from "./0047_namespace.ts";
import {b as L} from "../../runtime.ts";
import {ta as c7,wn as V6} from "../../vendor/m45.ts";
import {ws as M9,jt as Q_} from "../../vendor/m228.ts";
import {fs as T9} from "../api/0459_getOauthConfig.ts";
/**
 * CA certificate store loading and caching for outbound TLS connections.
 * Reads CLAUDE_CODE_CERT_STORE env var and CLI flags to determine which
 * certificate stores (bundled, system) to load, then caches the result.
 */

/** Parses CLAUDE_CODE_CERT_STORE env var and CLI flags to determine which cert stores to use. */
function parseCertStores(): string[] {
  let certStoreEnv = process.env.CLAUDE_CODE_CERT_STORE;
  if (certStoreEnv) {
    let stores: string[] = [];
    for (let item of certStoreEnv.split(",")) {
      let storeName = item.trim().toLowerCase();
      if (storeName === "bundled" || storeName === "system") {
        if (!stores.includes(storeName)) stores.push(storeName);
      } else if (storeName) N(`CA certs: unrecognized CLAUDE_CODE_CERT_STORE source '${storeName}', ignoring`, {
        level: "warn"
      });
    }
    return stores.length > 0 ? stores : defaultCertStores;
  }
  if (OQH("--use-system-ca") || OQH("--use-openssl-ca")) return ["system"];
  return defaultCertStores;
}

/** Clears the CA certificates cache, forcing a reload on next access. */
function clearCACertsCache(): void {
  RF.cache?.clear?.(), N("Cleared CA certificates cache");
}

var defaultCertStores: string[], RF: ReturnType<typeof V6>;
var ZlH = L(() => {
  c7();
  FH();
  A6();
  M9();
  defaultCertStores = ["bundled", "system"];
  RF = V6(() => {
    let certStores = parseCertStores(),
      extraCertsPath = process.env.NODE_EXTRA_CA_CERTS,
      includeBundled = certStores.includes("bundled"),
      includeSystem = certStores.includes("system");
    N(`CA certs: stores=${certStores.join(",")}, extraCertsPath=${extraCertsPath}`);
    let tls = require("tls"),
      getSystemCACerts = tls.getCACertificates;
    if (!includeBundled && includeSystem && !getSystemCACerts) {
      N("CA certs: stores=system but system CA API unavailable, deferring to runtime");
      return;
    }
    let collectedCerts: string[] = [];
    if (includeBundled) collectedCerts.push(...tls.rootCertificates), N(`CA certs: Loaded ${tls.rootCertificates.length} bundled root certificates`);
    if (includeSystem) try {
      let systemCerts = getSystemCACerts?.("system");
      if (systemCerts && systemCerts.length > 0) collectedCerts.push(...systemCerts), N(`CA certs: Loaded ${systemCerts.length} system CA certificates`);else if (N(`CA certs: system store ${getSystemCACerts ? "returned empty" : "unavailable"}`), !includeBundled) collectedCerts.push(...tls.rootCertificates);
    } catch (err) {
      if (N(`CA certs: Failed to load system CA certificates: ${err}`, {
        level: "error"
      }), !includeBundled) collectedCerts.push(...tls.rootCertificates);
    }
    if (extraCertsPath) try {
      let fileContent = Q_().readFileSync(extraCertsPath, {
        encoding: "utf8"
      });
      collectedCerts.push(fileContent), N(`CA certs: Appended extra certificates from NODE_EXTRA_CA_CERTS (${extraCertsPath})`);
    } catch (err) {
      N(`CA certs: Failed to read NODE_EXTRA_CA_CERTS file (${extraCertsPath}): ${err}`, {
        level: "error"
      });
    }
    return collectedCerts.length > 0 ? T9(collectedCerts) : void 0;
  });
});

export {parseCertStores as cZc,clearCACertsCache as wrs,defaultCertStores as vrs,RF as S8,ZlH as AKe};
