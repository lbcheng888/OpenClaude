// @ts-nocheck
import {getUseCoworkPlugins as B$_,lt as w_} from "../session/0132_sent.ts";
import {nt as q_} from "../../vendor/m127.ts";
import {R4 as Iv,tge as $7H} from "../../vendor/m2687.ts";
import {or as Y8,dn as A6} from "./0137_namespace.ts";
import {Wt as Q_,ps as M9} from "../../vendor/m230.ts";
import {Jo as $7,Ce as GH,Ct as L_} from "../../vendor/m197.ts";
import {formatFileSize as f4,Xo as H9} from "../../vendor/m240.ts";
import {logForDebugging as N,qe as FH} from "./0236_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
// ─── cross-module names kept as-is (linkage must not change) ───────────────
// B$_  = getUseCoworkPlugins   (0128_esm_w_.js)
// q_   = parseBooleanEnvVar    (0124_esm_oVq.js)
// Y8   = getConfigDir          (0133_esm_A6.js)
// Iv   = expandTildePath       (2669_esm_$7H.js)
// Q_   = getSandboxedFs        (0227_esm_M9.js)
// f4   = formatFileSize        (0236_esm_H9.js)
// $7   = isFilesystemError     (0194_esm_L_.js)
// N    = logForDebugging       (0232_esm_FH.js)
// GH   = getErrorMessage       (0194_esm_L_.js)
// L    = lazyInit              (runtime)
// j_   = defineExports         (runtime)
// ─── module init deps (kept as-is) ────────────────────────────────────────
// w_(), FH(), A6(), L_(), H9(), M9(), $7H()  — lazy module initializers

/** Returns either the cowork-plugins or regular plugins directory name. */
function getPluginDirName(): string {
  if (B$_()) return GL7;
  if (q_(process.env.CLAUDE_CODE_USE_COWORK_PLUGINS)) return GL7;
  return lT3;
}

/** Returns the resolved plugin cache directory path. */
function getPluginCacheDir(): string {
  let cacheDir: string | undefined = process.env.CLAUDE_CODE_PLUGIN_CACHE_DIR;
  if (cacheDir) return Iv(cacheDir);
  return LeH.join(Y8(), getPluginDirName());
}

/** Returns an array of plugin seed directory paths from the environment. */
function getPluginSeedDirs(): string[] {
  let seedDir: string | undefined = process.env.CLAUDE_CODE_PLUGIN_SEED_DIR;
  if (!seedDir) return [];
  return seedDir.split(LeH.delimiter).filter(Boolean).map(Iv);
}

/** Sanitizes a plugin ID for use as a filesystem path component. */
function sanitizePluginId(pluginId: string): string {
  return pluginId.replace(/[^a-zA-Z0-9\-_]/g, "-");
}

/** Returns the data directory path for the given plugin ID (not necessarily created). */
function getPluginDataDirPath(pluginId: string): string {
  return LeH.join(getPluginCacheDir(), "data", sanitizePluginId(pluginId));
}

/** Creates the data directory for the given plugin ID and returns its path. */
function ensurePluginDataDir(pluginId: string): string {
  let dataDir = getPluginDataDirPath(pluginId);
  return Q_().mkdirSync(dataDir), dataDir;
}

/** Returns the total size of the plugin data directory, or null if empty/missing. */
async function getPluginDataDirSize(pluginId: string): Promise<{
  bytes: number;
  human: string;
} | null> {
  let dataDir = getPluginDataDirPath(pluginId),
    totalBytes = 0,
    walkDir = async (dirPath: string): Promise<void> => {
      for (let entry of (await ReH.readdir(dirPath, {
        withFileTypes: !0
      })) as Dirent[]) {
        let entryPath = LeH.join(dirPath, entry.name);
        if (entry.isDirectory()) await walkDir(entryPath);else try {
          totalBytes += (await ReH.stat(entryPath)).size;
        } catch {}
      }
    };
  try {
    await walkDir(dataDir);
  } catch (err: unknown) {
    if ($7(err)) return null;
    throw err;
  }
  if (totalBytes === 0) return null;
  return {
    bytes: totalBytes,
    human: f4(totalBytes)
  };
}

/** Recursively deletes the data directory for the given plugin ID. */
async function deletePluginDataDir(pluginId: string): Promise<void> {
  let dataDir = getPluginDataDirPath(pluginId);
  try {
    await ReH.rm(dataDir, {
      recursive: !0,
      force: !0
    });
  } catch (err: unknown) {
    N(`Failed to delete plugin data dir ${dataDir}: ${GH(err)}`, {
      level: "warn"
    });
  }
}
var ReH: typeof import("fs/promises"),
  LeH: typeof import("path"),
  lT3 = "plugins",
  GL7 = "cowork_plugins";
var xv = L(() => {
  w_();
  FH();
  A6();
  L_();
  H9();
  M9();
  $7H();
  ReH = require("fs/promises"), LeH = require("path");
});
export {getPluginDirName as oPd,getPluginCacheDir as hw,getPluginSeedDirs as iae,sanitizePluginId as sPd,getPluginDataDirPath as eMt,ensurePluginDataDir as aae,getPluginDataDirSize as S9i,deletePluginDataDir as krt,ReH as vrt,LeH as wrt,lT3 as rPd,GL7 as T9i,xv as a1};
