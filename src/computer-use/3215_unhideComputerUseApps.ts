// @ts-nocheck
import {Vna as Ita} from "../../vendor/m3213.ts";
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {$Hn as oHn,$Kr as V7r} from "../../vendor/m3199.ts";
import {execFileNoThrow as Bn,oa} from "../../vendor/m684.ts";
import {sleep as Fn,withTimeout as lu} from "../telemetry/1483_withTimeout.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {u9 as Y$,Uee as xee,XHn as fHn} from "./3211_level.ts";
import {dfi as tmi,yNr as I1r,w_n as Bgn,wfe as lfe} from "./2193_iTerm_app.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {ozr as cKr,QHn as AHn} from "../../vendor/m3211.ts";
import {aot as $rt} from "../../vendor/m3206.ts";
// @ts-nocheck
function Uz() {
  if (SCREENSHOT_TIMEOUT_MS) return SCREENSHOT_TIMEOUT_MS;
  let e = Ita();
  if (!e.isSupported) throw Error("@ant/computer-use-input is not supported on this platform");
  return SCREENSHOT_TIMEOUT_MS = e;
}
var SCREENSHOT_TIMEOUT_MS;
var MOUSE_SETTLE_MS = {};
pt(MOUSE_SETTLE_MS, {
  unhideComputerUseApps: () => pasteViaClipboard,
  createCliExecutor: () => withHeldKeys
});
function getInputBackend(e, t, n) {
  let r = Math.round(e * n),
    o = Math.round(t * n);
  return oHn(r, o, V7r);
}
async function fKr() {
  let {
    stdout: e,
    code: t
  } = await Bn("pbpaste", [], {
    useCwd: false
  });
  if (t !== 0) throw Error(`pbpaste exited with code ${t}`);
  return e;
}
async function AKr(e) {
  let {
    code: t
  } = await Bn("pbcopy", [], {
    input: e,
    useCwd: false
  });
  if (t !== 0) throw Error(`pbcopy exited with code ${t}`);
}
function scaledDimensions(width) {
  if (width.length !== 1) return false;
  let t = width[0].toLowerCase();
  return t === "escape" || t === "esc";
}
async function readClipboardText(e, t, n) {
  await e.moveMouse(t, n, false), await Fn(hKr);
}
async function writeClipboardText(text, t) {
  let n;
  while ((n = t.pop()) !== undefined) try {
    await text.key(n, "release");
  } catch {}
}
async function isEscapeKey(keys, t, n) {
  let r = [];
  try {
    for (let o of t) await keys.key(o, "press"), r.push(o);
    return await n();
  } finally {
    await writeClipboardText(keys, r);
  }
}
async function moveMouseAndSettle(backend, x) {
  let n;
  try {
    n = await fKr();
  } catch {
    v("[computer-use] pbpaste before paste failed; proceeding without restore");
  }
  try {
    if (await AKr(x), (await fKr()) !== x) throw Error("Clipboard write did not round-trip.");
    await backend.keys(["command", "v"]), await Fn(100);
  } finally {
    if (typeof n === "string") try {
      await AKr(n);
    } catch {
      v("[computer-use] clipboard restore after paste failed");
    }
  }
}
async function releaseHeldKeys(backend, heldKeys, n, r) {
  if (!r) {
    await readClipboardText(backend, heldKeys, n);
    return;
  }
  let o = await backend.mouseLocation(),
    s = heldKeys - o.x,
    i = n - o.y,
    a = Math.hypot(s, i);
  if (a < 1) return;
  let l = Math.min(a / 2000, 0.5);
  if (l < 0.03) {
    await readClipboardText(backend, heldKeys, n);
    return;
  }
  let c = 60,
    u = 1000 / c,
    d = Math.floor(l * c);
  for (let p = 1; p <= d; p++) {
    let m = p / d,
      f = 1 - Math.pow(1 - m, 3);
    if (await backend.moveMouse(Math.round(o.x + s * f), Math.round(o.y + i * f), false), p < d) await Fn(u);
  }
  await Fn(hKr);
}
function withHeldKeys(backend) {
  let t = Y$(),
    {
      getMouseAnimationEnabled: n,
      getHideBeforeActionEnabled: r
    } = backend,
    o = tmi(),
    s = o ?? I1r,
    i = a => o === null ? [...a] : a.filter(l => l !== o);
  return v(o ? `[computer-use] terminal ${o} \u2192 surrogate host (hide-exempt, activate-skip, screenshot-excluded)` : "[computer-use] terminal not detected; falling back to sentinel host"), {
    capabilities: {
      ...Bgn,
      hostBundleId: I1r
    },
    async prepareForAction(a, l) {
      if (!r()) return [];
      return xee(async () => {
        try {
          let c = await t.apps.prepareDisplay(a, s, l);
          if (c.activated) v(`[computer-use] prepareForAction: activated ${c.activated}`);
          return c.hidden;
        } catch (c) {
          return v(`[computer-use] prepareForAction failed; continuing to action: ${Se(c)}`, {
            level: "warn"
          }), [];
        }
      });
    },
    async previewHideSet(a, l) {
      return t.apps.previewHideSet([...a, s], l);
    },
    async getDisplaySize(a) {
      return t.display.getSize(a);
    },
    async listDisplays() {
      return t.display.listAll();
    },
    async findWindowDisplays(a) {
      return t.apps.findWindowDisplays(a);
    },
    async resolvePrepareCapture(a) {
      let l = t.display.getSize(a.preferredDisplayId),
        [c, u] = getInputBackend(l.width, l.height, l.scaleFactor);
      return xee(() => t.resolvePrepareCapture(i(a.allowedBundleIds), s, pKr, c, u, a.preferredDisplayId, a.autoResolve, a.doHide));
    },
    async screenshot(a) {
      let l = t.display.getSize(a.displayId),
        [c, u] = getInputBackend(l.width, l.height, l.scaleFactor);
      return lu(t.screenshot.captureExcluding(i(a.allowedBundleIds), pKr, c, u, a.displayId), Dta, "CU screenshot backstop");
    },
    async zoom(a, l, c) {
      let u = t.display.getSize(c),
        [d, p] = getInputBackend(a.w, a.h, u.scaleFactor);
      return lu(t.screenshot.captureRegion(i(l), a.x, a.y, a.w, a.h, d, p, pKr, c), Dta, "CU zoom backstop");
    },
    async key(a, l) {
      let c = Uz(),
        u = a.split("+").filter(m => m.length > 0),
        d = scaledDimensions(u),
        p = l ?? 1;
      await xee(async () => {
        for (let m = 0; m < p; m++) {
          if (m > 0) await Fn(8);
          if (d) cKr();
          await c.keys(u);
        }
      });
    },
    async holdKey(a, l) {
      let c = Uz(),
        u = [],
        d = false;
      try {
        await xee(async () => {
          for (let p of a) {
            if (d) return;
            if (scaledDimensions([p])) cKr();
            await c.key(p, "press"), u.push(p);
          }
        }), await Fn(l);
      } finally {
        d = true, await xee(() => writeClipboardText(c, u));
      }
    },
    async type(a, l) {
      let c = Uz();
      if (l.viaClipboard) {
        await xee(() => moveMouseAndSettle(c, a));
        return;
      }
      await c.typeText(a);
    },
    readClipboard: fKr,
    writeClipboard: AKr,
    async moveMouse(a, l) {
      await readClipboardText(Uz(), a, l);
    },
    async click(a, l, c, u, d) {
      let p = Uz();
      if (await readClipboardText(p, a, l), d && d.length > 0) await xee(() => isEscapeKey(p, d, () => p.mouseButton(c, "click", u)));else await p.mouseButton(c, "click", u);
    },
    async mouseDown() {
      await Uz().mouseButton("left", "press");
    },
    async mouseUp() {
      await Uz().mouseButton("left", "release");
    },
    async getCursorPosition() {
      return Uz().mouseLocation();
    },
    async drag(a, l) {
      let c = Uz();
      if (a !== undefined) await readClipboardText(c, a.x, a.y);
      await c.mouseButton("left", "press"), await Fn(hKr);
      try {
        await releaseHeldKeys(c, l.x, l.y, n());
      } finally {
        await c.mouseButton("left", "release");
      }
    },
    async scroll(a, l, c, u) {
      let d = Uz();
      if (await readClipboardText(d, a, l), u !== 0) await d.mouseScroll(u, "vertical");
      if (c !== 0) await d.mouseScroll(c, "horizontal");
    },
    async getFrontmostApp() {
      let a = Uz().getFrontmostAppInfo();
      if (!a || !a.bundleId) return null;
      return {
        bundleId: a.bundleId,
        displayName: a.appName
      };
    },
    async appUnderPoint(a, l) {
      return t.apps.appUnderPoint(a, l);
    },
    async listInstalledApps() {
      return xee(() => t.apps.listInstalled());
    },
    async getAppIcon(a) {
      return t.apps.iconDataUrl(a) ?? undefined;
    },
    async listRunningApps() {
      return t.apps.listRunning();
    },
    async openApp(a) {
      await t.apps.open(a);
    }
  };
}
async function pasteViaClipboard(backend) {
  if (backend.length === 0) return;
  await Y$().apps.unhide([...backend]);
}
var pKr = 0.75,
  Dta = 5000,
  hKr = 50;
var Nc8 = b(() => {
  $rt();
  je();
  St();
  oa();
  lfe();
  fHn();
  AHn();
});

export {Uz as Zz,SCREENSHOT_TIMEOUT_MS as izr,MOUSE_SETTLE_MS as Jna,getInputBackend as lzr,fKr as czr,AKr as uzr,scaledDimensions as zna,readClipboardText as dot,writeClipboardText as Yna,isEscapeKey as tqd,moveMouseAndSettle as nqd,releaseHeldKeys as rqd,withHeldKeys as createCliExecutor,pasteViaClipboard as unhideComputerUseApps,pKr as azr,Dta as Kna,hKr as dzr,Nc8 as mzr};
