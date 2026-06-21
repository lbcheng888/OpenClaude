// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {st as rt} from "../../vendor/m5.ts";
import {handleStreamGoneErrors as tGe,fO as iO} from "../../vendor/m230.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {D1 as b1,Cv as gv} from "./2217_names.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {tP as eP,r5 as F8} from "./2034_CLAUDE_AX_SCREEN_READER.ts";
import {sn as an} from "../config/0047_namespace.ts";
// @ts-nocheck
var IG6 = {};
pt(IG6, {
  getBaseRenderOptions: () => getBaseRenderOptions
});
function getOrCreateTtyStream() {
  if (ttyStreamCache !== null) return ttyStreamCache;
  if (process.stdin.isTTY) {
    ttyStreamCache = undefined;
    return;
  }
  if (rt(false)) {
    ttyStreamCache = undefined;
    return;
  }
  if (process.argv.includes("mcp")) {
    ttyStreamCache = undefined;
    return;
  }
  try {
    let fd = fsModule.openSync("/dev/tty", "r"),
      stream = new ttyModule.ReadStream(fd);
    return tGe(stream), stream.on("error", err => {
      j("tengu_tty_stream_error", b1(err)), v(`/dev/tty stream error: ${err}`, {
        level: "debug"
      });
    }), stream.isTTY = true, ttyStreamCache = stream, ttyStreamCache;
  } catch (err) {
    v(`Could not open /dev/tty for stdin override: ${err}`, {
      level: "error"
    }), ttyStreamCache = undefined;
    return;
  }
}
function getBaseRenderOptions(exitOnCtrlC = false) {
  let ttyStream = getOrCreateTtyStream(),
    options = {
      exitOnCtrlC: exitOnCtrlC
    };
  if (ttyStream) options.stdin = ttyStream;
  return options.isScreenReaderEnabled = eP(), options;
}
var fsModule,
  ttyModule,
  ttyStreamCache = null;
var THH = b(() => {
  Ct();
  je();
  an();
  gv();
  iO();
  F8();
  fsModule = require("fs"), ttyModule = require("tty");
});

export {IG6 as CDn,getOrCreateTtyStream as EGd,getBaseRenderOptions,fsModule as Tua,ttyModule as Sua,ttyStreamCache as qke,THH as zee};
