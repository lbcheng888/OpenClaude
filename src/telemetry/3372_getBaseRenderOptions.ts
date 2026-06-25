// @ts-nocheck
import {ft as pt,b} from "../../runtime.ts";
import {nt as rt} from "../../vendor/m127.ts";
import {handleStreamGoneErrors as tGe,LP as iO} from "../../vendor/m232.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {aO as b1,IA as gv} from "./2225_names.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {fD as eP,y8 as F8} from "./2039_CLAUDE_AX_SCREEN_READER.ts";
import {dn as an} from "../config/0137_namespace.ts";
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
export {IG6 as _Ln,getOrCreateTtyStream as utp,getBaseRenderOptions,fsModule as L_a,ttyModule as M_a,ttyStreamCache as HIe,THH as qee};
