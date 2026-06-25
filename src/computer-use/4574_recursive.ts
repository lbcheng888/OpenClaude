// @ts-nocheck
import {hE,resolveToolAlias as UR} from "../config/2229_observed_uid.ts";
import {ghl,hhl} from "../../vendor/m4572.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {execFileNoThrowWithCwd as Wr,Ii} from "../../vendor/m690.ts";
import {unt,iOt} from "../../vendor/m2522.ts";
import {b} from "../../runtime.ts";
/**
 * Screenshot-to-clipboard support for the computer-use surface.
 *
 * Renders ANSI terminal output to a PNG, persists it to a temp file under the
 * screenshots directory, then copies that PNG image onto the OS clipboard using
 * a platform-specific mechanism (osascript / xclip / PowerShell). Telemetry is
 * emitted via He/xe (clipboard_write success/failure) and errors are reported
 * through Ie.
 */

/**
 * Render the given ANSI content to a PNG, write it to a temp file, and copy the
 * image to the system clipboard.
 *
 * @param ansiContent - ANSI-encoded terminal text to rasterize.
 * @param renderOptions - Options forwarded to the ansiToPng renderer.
 * @returns A result describing whether the clipboard copy succeeded.
 */
async function yhl(
  ansiContent: string,
  renderOptions: unknown
): Promise<{ success: boolean; message: string }> {
  try {
    let screenshotsDir = SRo.join(hE(), "screenshots");
    await Jft.mkdir(screenshotsDir, {
      recursive: !0,
      mode: 448
    });
    let pngPath = SRo.join(screenshotsDir, `screenshot-${Date.now()}.png`),
      {
        ansiToPng: renderAnsiToPng
      } = await Promise.resolve().then(() => (ghl(), hhl)),
      pngBuffer = renderAnsiToPng(ansiContent, renderOptions);
    await Jft.writeFile(pngPath, pngBuffer);
    let copyResult: { success: boolean; message: string };
    try {
      copyResult = await tZp(pngPath);
    } catch (copyError) {
      return Ie(copyError), xe("clipboard_write", "copy_failed"), {
        success: !1,
        message: `Failed to copy screenshot: ${copyError instanceof Error ? copyError.message : "Unknown error"}`
      };
    } finally {
      await Jft.unlink(pngPath).catch(() => {});
    }
    if (copyResult.success) He("clipboard_write");else xe("clipboard_write", "copy_failed");
    return copyResult;
  } catch (renderError) {
    return Ie(renderError), xe("clipboard_write", "render_failed"), {
      success: !1,
      message: `Failed to copy screenshot: ${renderError instanceof Error ? renderError.message : "Unknown error"}`
    };
  }
}

/**
 * Copy a PNG file at the given path to the system clipboard, dispatching on the
 * current platform (macOS, Linux, Windows).
 *
 * @param pngPath - Absolute path to the PNG file to copy.
 * @returns A result describing whether the platform-specific copy succeeded.
 */
async function tZp(
  pngPath: string
): Promise<{ success: boolean; message: string }> {
  let platform = Yt();
  if (platform === "macos") {
    let appleScript = `set the clipboard to (read (POSIX file "${pngPath.replaceAll("\\", "\\\\").replaceAll('"', "\\\"")}") as \xABclass PNGf\xBB)`,
      osascriptResult = await Wr("osascript", ["-e", appleScript], {
        timeout: 5000
      });
    if (osascriptResult.code === 0) return {
      success: !0,
      message: "Screenshot copied to clipboard"
    };
    return {
      success: !1,
      message: `Failed to copy to clipboard: ${osascriptResult.stderr}`
    };
  }
  if (platform === "linux") {
    if ((await nZp("xclip", ["-selection", "clipboard", "-t", "image/png", "-i", pngPath])) === 0) return {
      success: !0,
      message: "Screenshot copied to clipboard"
    };
    return {
      success: !1,
      message: "Failed to copy to clipboard. Please install xclip: sudo apt install xclip"
    };
  }
  if (platform === "windows") {
    let powerShellScript = `Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Clipboard]::SetImage([System.Drawing.Image]::FromFile(${unt(pngPath, "the screenshot temp path (override with CLAUDE_CODE_TMPDIR)")}))`,
      powerShellResult = await Wr("powershell", ["-NoProfile", "-Command", powerShellScript], {
        timeout: 5000
      });
    if (powerShellResult.code === 0) return {
      success: !0,
      message: "Screenshot copied to clipboard"
    };
    return {
      success: !1,
      message: `Failed to copy to clipboard: ${powerShellResult.stderr}`
    };
  }
  return {
    success: !1,
    message: `Screenshot to clipboard is not supported on ${platform}`
  };
}

/**
 * Spawn a detached child process and resolve with its exit code, or null if the
 * spawn fails, errors, or times out (the process is SIGKILLed after `timeoutMs`).
 *
 * @param command - Executable to run.
 * @param args - Arguments passed to the executable.
 * @param timeoutMs - Milliseconds before the process is killed (default 5000).
 * @returns The process exit code, or null on failure/timeout.
 */
function nZp(
  command: string,
  args: readonly string[],
  timeoutMs: number = 5000
): Promise<number | null> {
  return new Promise(resolve => {
    let child: import("child_process").ChildProcess;
    try {
      child = _hl.spawn(command, args, {
        cwd: void 0,
        detached: !0,
        stdio: "ignore",
        windowsHide: !0
      });
    } catch {
      resolve(null);
      return;
    }
    let settled = !1;
    function settle(exitCode: number | null) {
      if (settled) return;
      settled = !0, clearTimeout(killTimer), resolve(exitCode);
    }
    let killTimer = setTimeout(() => {
      child.kill("SIGKILL"), settle(null);
    }, timeoutMs);
    child.once("exit", exitCode => settle(exitCode)), child.once("error", () => settle(null)), child.unref();
  });
}
var _hl: typeof import("child_process"),
  Jft: typeof import("fs/promises"),
  SRo: typeof import("path");
var Thl = b(() => {
  mn();
  Ii();
  vn();
  Es();
  iOt();
  UR();
  _hl = require("child_process"), Jft = require("fs/promises"), SRo = require("path");
});

export {yhl,tZp,nZp,_hl,Jft,SRo,Thl};
